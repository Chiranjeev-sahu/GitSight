from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import requests
from urllib.parse import urlparse
from typing import TypedDict, List, Dict, Any, Optional 
import json 
import base64 
import google.generativeai as genai

load_dotenv()
app = FastAPI()

GITHUB_PAT = os.getenv("GITHUB_PAT")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") 

if GEMINI_API_KEY:
   genai.configure(api_key=GEMINI_API_KEY)
   print("Gemini API Key configured.")
else:
    print("CRITICAL: GEMINI_API_KEY not found. AI analysis will be skipped.")

if not GITHUB_PAT:
    print("ERROR: GITHUB_PAT not found. GitHub API calls may fail.")

HEADERS = { 
    "Authorization": f"token {GITHUB_PAT}",
    "Accept": "application/vnd.github.v3+json"
}

# Helper Functions
def parse_github_url(url: str) -> tuple[str, str] | None:
    try:
        parsed_url = urlparse(url)
        if parsed_url.hostname not in ["github.com", "www.github.com"]:
            return None
        path_parts = parsed_url.path.strip("/").split("/")
        if len(path_parts) >= 2:
            owner = path_parts[0]
            repo = path_parts[1].replace(".git", "") 
            return owner, repo
        return None
    except Exception:
        return None



def format_file_tree_for_display(file_tree_data: Optional[Dict[str, Any]], limit: int = 100) -> str:
    """
    Formats the file tree into a more human-readable string, limited by number of items.
    This is a simplified representation.
    """
    if not file_tree_data or not file_tree_data.get("tree"):
        return "File tree data not available or empty."

    paths = [item["path"] for item in file_tree_data["tree"] if "path" in item]
    
    if not paths:
        return "No file paths found in tree data."

    # Simple indented list for now. A true tree structure would be more complex.
    display_items = []
    count = 0
    for path in sorted(paths): # Sort for consistency
        if count < limit:
            indent_level = path.count('/')
            indent = "  " * indent_level
            display_items.append(f"{indent}└── {os.path.basename(path)}")
            count += 1
        else:
            display_items.append(f"... and {len(paths) - limit} more files/directories.")
            break
    return "\n".join(display_items)



# Pydantic Models & TypedDicts
class RepoRequest(BaseModel):
    repo_url: str



class RawDataResponseType(TypedDict):
    input_url: str
    parsed_owner: str
    parsed_repo_name: str
    repo_details: Optional[Dict[str, Any]] 
    readme_details: Optional[Dict[str, Any]] 
    languages: Optional[Dict[str, Any]]   
    file_tree: Optional[Dict[str, Any]]    
    errors: List[str] 



class AiAnalysisResponse(BaseModel): 
    repository_name: str
    owner: str
    project_purpose_summary: str
    deduced_technology_stack: Dict[str, Any]
    # for  chart 
    language_stats: Optional[Dict[str, int]] # {"Python": 10137, "HTML": 4768}
    #  for roadmap
    reading_roadmap_suggestion: Optional[str]
    #  For file tree
    file_structure_display: Optional[str]
    raw_github_errors: List[str]
    ai_call_errors: Optional[str] = None




# Function to prepare context for AI
def prepare_ai_prompt_context(raw_data: RawDataResponseType, owner: str, repo_name: str) -> str:
    context_parts = []

    context_parts.append(f"Analyze the following GitHub repository data for '{owner}/{repo_name}'.")
    context_parts.append("Please provide your analysis in the following format, using these exact headings:")
    context_parts.append("## Project Purpose Summary ##")
    context_parts.append("(Your summary here)")
    context_parts.append("\n## Deduced Technology Stack ##")
    context_parts.append("Frontend: (List technologies or 'N/A')")
    context_parts.append("Backend: (List technologies or 'N/A')")
    context_parts.append("Database: (List technologies or 'N/A')")
    context_parts.append("Key Libraries/Tools: (List or 'N/A')")
    #for roadmap
    context_parts.append("\n## Suggested Reading Roadmap ##")
    context_parts.append("(Suggest 2-3 key files or directories a new developer should look at first to understand the project structure and entry points. Be concise.)")
    
    context_parts.append("\n--- REPOSITORY INFORMATION (Context for your analysis)")

    if raw_data.get("repo_details"):
        details = raw_data["repo_details"]
        context_parts.append(f"Name: {details.get('name', repo_name)}")
        context_parts.append(f"Description: {details.get('description', 'N/A')}")
        context_parts.append(f"Primary Language: {details.get('language', 'N/A')}")
        context_parts.append(f"Stars: {details.get('stargazers_count', 'N/A')}")
    else:
        context_parts.append(f"Name: {repo_name}")
        context_parts.append("Description: Could not fetch repository details.")

    context_parts.append("\n--- README CONTENT")
    readme_content_decoded = "README not found or content unavailable."
    if raw_data.get("readme_details"):
        readme_data = raw_data["readme_details"]
        if readme_data.get("content_base64"):
            try:
                readme_content_decoded = base64.b64decode(readme_data["content_base64"]).decode('utf-8')
                if len(readme_content_decoded) > 2500: # Slightly reduced for more space for roadmap
                    readme_content_decoded = readme_content_decoded[:2500] + "\n... (README truncated)"
            except Exception as e:
                readme_content_decoded = f"Error decoding README: {e}"
        elif readme_data.get("message"): 
             readme_content_decoded = readme_data["message"]
    context_parts.append(readme_content_decoded)

    context_parts.append("\n--- LANGUAGES DETECTED (Bytes)")
    if raw_data.get("languages"):
        context_parts.append(json.dumps(raw_data["languages"], indent=2))
    else:
        context_parts.append("Language data not available.")

    context_parts.append("\n--- FILE STRUCTURE (Selected Paths)")
    file_paths_str = "File tree not available."
    if raw_data.get("file_tree") and raw_data["file_tree"].get("tree"):
        paths = [item["path"] for item in raw_data["file_tree"]["tree"] if "path" in item]
        if paths:
            limit = 70 # Slightly reduced for roadmap
            if len(paths) > limit:
                file_paths_str = "\n".join(paths[:limit]) + f"\n... and {len(paths) - limit} more files."
            else:
                file_paths_str = "\n".join(paths)
    context_parts.append(file_paths_str)
    
    context_parts.append("\n--- END OF CONTEXT")
    context_parts.append("Now, provide your analysis using the specified format and headings:")

    return "\n".join(context_parts)




#  parse AI response
def parse_ai_response(ai_text: str) -> tuple[str, Dict[str, Any], str]:
    purpose_summary = "Could not parse purpose summary."
    tech_stack = {"raw_text": ai_text, "parsed_error": "Could not parse tech stack."}
    roadmap_suggestion = "Could not parse roadmap suggestion." # NEW

    summary_heading = "## Project Purpose Summary ##"
    tech_stack_heading = "## Deduced Technology Stack ##"
    roadmap_heading = "## Suggested Reading Roadmap ##" 



    # Find start indices of each section
    summary_start_idx = ai_text.find(summary_heading)
    tech_stack_start_idx = ai_text.find(tech_stack_heading)
    roadmap_start_idx = ai_text.find(roadmap_heading)



    # Extract Summary
    if summary_start_idx != -1:
        content_start = summary_start_idx + len(summary_heading)
        end_delimiters = [tech_stack_start_idx, roadmap_start_idx]
        actual_end_idx = len(ai_text)
        for delimiter_idx in sorted(d for d in end_delimiters if d != -1 and d > content_start): 
            actual_end_idx = delimiter_idx
            break
        purpose_summary = ai_text[content_start:actual_end_idx].strip()



    # Extract Tech Stack
    if tech_stack_start_idx != -1:
        content_start = tech_stack_start_idx + len(tech_stack_heading)
        end_delimiters = [roadmap_start_idx] #roadmap comes after tech stack now
        actual_end_idx = len(ai_text)
        for delimiter_idx in sorted(d for d in end_delimiters if d != -1 and d > content_start):
            actual_end_idx = delimiter_idx
            break
        tech_stack_text_block = ai_text[content_start:actual_end_idx].strip()
        
        parsed_stack = {"raw_text_block": tech_stack_text_block}
        lines = tech_stack_text_block.split('\n')

        current_category = None
        for line in lines:
            line_stripped = line.strip()
            if not line_stripped: continue
            categories = ["Frontend:", "Backend:", "Database:", "Key Libraries/Tools:"]
            matched_category = False
            for cat_prefix in categories:
                if line_stripped.startswith(cat_prefix):
                    current_category = cat_prefix[:-1] # remove colon
                    parsed_stack[current_category] = line_stripped.replace(cat_prefix, "").strip()
                    matched_category = True
                    break
            if not matched_category and current_category and line_stripped:
                 if isinstance(parsed_stack.get(current_category), str):
                     parsed_stack[current_category] += " " + line_stripped 
                 else: 
                     parsed_stack[current_category] = line_stripped
        tech_stack = parsed_stack


    # roadmap Suggestion 
    if roadmap_start_idx != -1:
        content_start = roadmap_start_idx + len(roadmap_heading)

        roadmap_suggestion = ai_text[content_start:].strip()
        
    return purpose_summary, tech_stack, roadmap_suggestion


# API Endpoint
@app.post("/api/analyze-repo/", response_model=AiAnalysisResponse) 
async def analyze_repository(request: RepoRequest):
    repo_url = request.repo_url
    ai_call_error_message: Optional[str] = None
    
    parsed_info = parse_github_url(repo_url)
    if not parsed_info:
        raise HTTPException(status_code=400, detail="Invalid GitHub repository URL format.")
    
    owner, repo_name = parsed_info
    
    raw_data_responses: RawDataResponseType = {
        "input_url": repo_url, "parsed_owner": owner, "parsed_repo_name": repo_name,
        "repo_details": None, "readme_details": None, "languages": None, 
        "file_tree": None, "errors": [] 
    }





    # GitHub API Calls 

    # 1. Repo Details
    repo_details_url = f"https://api.github.com/repos/{owner}/{repo_name}"
    try:
        response = requests.get(repo_details_url, headers=HEADERS)
        response.raise_for_status(); raw_data_responses["repo_details"] = response.json()
    except Exception as e: raw_data_responses["errors"].append(f"Err RepoDetails: {e}")


    # 2. README
    readme_url = f"https://api.github.com/repos/{owner}/{repo_name}/readme"
    try:
        response = requests.get(readme_url, headers=HEADERS)
        if response.status_code == 404: raw_data_responses["readme_details"] = {"message": "No README", "content_base64": None}
        else: response.raise_for_status(); raw_data_responses["readme_details"] = response.json()
    except Exception as e: raw_data_responses["errors"].append(f"Err README: {e}")


    # 3. Languages
    languages_url = f"https://api.github.com/repos/{owner}/{repo_name}/languages"
    try:
        response = requests.get(languages_url, headers=HEADERS)
        response.raise_for_status(); raw_data_responses["languages"] = response.json()
    except Exception as e: raw_data_responses["errors"].append(f"Err Languages: {e}")


    # 4. File Tree
    default_branch = "main" 
    if raw_data_responses["repo_details"] and isinstance(raw_data_responses["repo_details"], dict) and "default_branch" in raw_data_responses["repo_details"]:
        val = raw_data_responses["repo_details"]["default_branch"]
        if isinstance(val, str): default_branch = val
    tree_url = f"https://api.github.com/repos/{owner}/{repo_name}/git/trees/{default_branch}?recursive=1"
    try:
        response = requests.get(tree_url, headers=HEADERS)
        response.raise_for_status(); raw_data_responses["file_tree"] = response.json()
    except Exception as e: raw_data_responses["errors"].append(f"Err FileTree: {e}")


    # Prepare context for AI
    prompt_text = prepare_ai_prompt_context(raw_data_responses, owner, repo_name)
    
    ai_purpose_summary = "AI analysis skipped or failed."
    ai_tech_stack = {"error": "AI analysis skipped or failed."}
    ai_roadmap_suggestion = "AI roadmap suggestion skipped or failed." 

    if GEMINI_API_KEY and len(raw_data_responses["errors"]) < 3:
        try:
            print(f"\n--- SENDING PROMPT TO GEMINI (Length: {len(prompt_text)} chars)")
            model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')
            generation_config = {"temperature": 0.6, "max_output_tokens": 3000}
            
            gemini_response = model.generate_content(prompt_text, generation_config=generation_config)
            full_ai_text = getattr(gemini_response, 'text', None) or "".join(p.text for p in getattr(gemini_response, 'parts', []))
            
            if full_ai_text:
                print(f"\n--- RAW AI RESPONSE\n{full_ai_text}\n----------------------\n")
                ai_purpose_summary, ai_tech_stack, ai_roadmap_suggestion = parse_ai_response(full_ai_text) # Updated
            else:
                ai_call_error_message = "Gemini response was empty."
                print(ai_call_error_message); print("Full Gemini Response object:", gemini_response)

        except Exception as e:
            error_msg = f"Error during Gemini API call or processing: {e}"
            print(error_msg); raw_data_responses["errors"].append(f"Gemini AI Error: {str(e)}")
            ai_call_error_message = str(e)
    else:
        if not GEMINI_API_KEY: msg = "AI analysis skipped: GEMINI_API_KEY not set."
        else: msg = "AI analysis skipped due to too many GitHub fetch errors."
        print(msg); raw_data_responses["errors"].append(msg); ai_call_error_message = msg

    
    file_structure_for_display = format_file_tree_for_display(raw_data_responses.get("file_tree"))

    return AiAnalysisResponse(
        repository_name=repo_name,
        owner=owner,
        project_purpose_summary=ai_purpose_summary,
        deduced_technology_stack=ai_tech_stack,
        language_stats=raw_data_responses.get("languages"), 
        reading_roadmap_suggestion=ai_roadmap_suggestion, 
        file_structure_display=file_structure_for_display, 
        raw_github_errors=raw_data_responses["errors"],
        ai_call_errors=ai_call_error_message
    )
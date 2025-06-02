import google.generativeai as genai
import os
import json
import base64
from dotenv import load_dotenv

load_dotenv() 

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY not found. Please set it in your .env file.")
    exit()

genai.configure(api_key=GEMINI_API_KEY)

#  load saved JSON data 
def load_repo_data(owner, repo_name):
    data_dir = f"output_data/{owner}_{repo_name}" 
    loaded_data = {}
    files_to_load = {
        "repo_details": "repo_details.json",
        "readme_details": "readme_details.json",
        "languages": "languages.json",
        "file_tree": "file_tree.json"
    }
    for key, filename in files_to_load.items():
        try:
            with open(os.path.join(data_dir, filename), "r") as f:
                loaded_data[key] = json.load(f)
        except FileNotFoundError:
            print(f"Warning: {filename} not found in {data_dir}")
            loaded_data[key] = None
        except json.JSONDecodeError:
            print(f"Warning: Could not decode JSON from {filename}")
            loaded_data[key] = None
    return loaded_data




#  Main part 
if __name__ == "__main__":
    test_owner = "ayush-that"
    test_repo = "Apple-Calculator-Using-Computer-Vision"

    repo_data = load_repo_data(test_owner, test_repo)

    if not repo_data.get("repo_details"): # check if data loaded
        print(f"Could not load core data for {test_owner}/{test_repo}. Exiting.")
        exit()

    #  1. Prepare the full, unfiltered prompt (initial test) 
   

    readme_content_decoded = "No README content available."
    if repo_data.get("readme_details") and repo_data["readme_details"].get("content_base64"):
        try:
            readme_content_decoded = base64.b64decode(repo_data["readme_details"]["content_base64"]).decode('utf-8')
        except Exception as e:
            readme_content_decoded = f"Error decoding README: {e}"

    # For the file tree, sending the whole JSON is too much. Let's just send paths for now.
    file_paths_str = "File tree not available or too large to display initially."
    if repo_data.get("file_tree") and repo_data["file_tree"].get("tree"):
        paths = [item["path"] for item in repo_data["file_tree"]["tree"] if "path" in item]
        if paths:
             # Limit to first N paths to avoid overly long prompt for this initial test
            file_paths_str = "\n".join(paths[:50]) # Send first 50 paths
            if len(paths) > 50:
                file_paths_str += "\n... and more files."


    # Construct the initial verbose prompt
    full_prompt_text = f"""
    Analyze the following GitHub repository data.
    Please provide a concise summary of the project's purpose and its primary technology stack.

    Repository Name: {repo_data.get("repo_details", {}).get("name", "N/A")}
    Description: {repo_data.get("repo_details", {}).get("description", "N/A")}
    Primary Language: {repo_data.get("repo_details", {}).get("language", "N/A")}
    Stars: {repo_data.get("repo_details", {}).get("stargazers_count", "N/A")}
    Forks: {repo_data.get("repo_details", {}).get("forks_count", "N/A")}

    README Content:
    
    {readme_content_decoded[:2000]} 
     
    (README truncated to first 2000 characters for this test)

    Languages Detected (bytes):
    
    {json.dumps(repo_data.get("languages", {}), indent=2)}
    

    File Structure (selected paths):
    
    {file_paths_str}
    

    Based on ALL the information above, provide:
    1. Project Purpose Summary:
    2. Deduced Technology Stack (Frontend, Backend, Database, Key Libraries/Tools):
    """
   


    print(" CONSTRUCTED PROMPT (PARTIAL) ")
    print(full_prompt_text[:1000] + "\n...\n" + full_prompt_text[-500:]) # Print a snippet
    print(f"\nApproximate prompt length (characters): {len(full_prompt_text)}")
    print("--\n")

   
    try:
        
        generation_config = {
          "temperature": 0.7, # Controls randomness: 0.0 = deterministic, 1.0 = more random
          "top_p": 1,
          "top_k": 1,
          "max_output_tokens": 2048, # Max tokens the model should generate in response
        }
        safety_settings = [ # Example, adjust as needed or start without
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]

        model = genai.GenerativeModel(model_name='gemini-2.5-flash-preview-05-20', generation_config=generation_config,safety_settings=safety_settings)

        print(f"Sending prompt to Gemini model: {model.model_name}...")
        response = model.generate_content(full_prompt_text)

        #  Process the response 
        # The structure of 'response' can vary slightly.
        if hasattr(response, 'text') and response.text:
            ai_summary = response.text
        elif response.parts:
            ai_summary = "".join(part.text for part in response.parts)
        else:
            ai_summary = "No text found in response."
            print("Full AI Response object:", response)


        print("\n GEMINI AI RESPONSE ")
        print(ai_summary)
        print("\n")

        if hasattr(response, 'usage_metadata'):
            print("Usage Metadata:", response.usage_metadata)


    except Exception as e:
        print(f"Error calling Gemini API: {e}")
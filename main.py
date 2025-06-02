from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import requests
from urllib.parse import urlparse
from typing import TypedDict, List, Dict, Any, Optional 
import json # Make sure this is uncommented for file writing

load_dotenv()
app = FastAPI()

GITHUB_PAT = os.getenv("GITHUB_PAT")
if not GITHUB_PAT:
    print("ERROR: GITHUB_PAT not found in environment variables. Please set it in .env file.")
    # Consider how to handle this more gracefully in a production app

HEADERS = {
    "Authorization": f"token {GITHUB_PAT}",
    "Accept": "application/vnd.github.v3+json"
}

# Parses a GitHub URL to extract owner and repo name.Returns (owner, repo) or None if parsing fails.
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
    
#models for parsing
# Pydantic Model for Request Body 
class RepoRequest(BaseModel):
    repo_url: str

# Define the structure of your response dictionary
class RawDataResponseType(TypedDict):
    input_url: str
    parsed_owner: str
    parsed_repo_name: str
    repo_details: Optional[Dict[str, Any]] 
    readme_details: Optional[Dict[str, Any]] 
    languages: Optional[Dict[str, Any]]    
    file_tree: Optional[Dict[str, Any]]    
    errors: List[str] 

#API Endpoint 
@app.post("/api/save-repo-data/")
async def save_repo_data_locally(request: RepoRequest):
    repo_url = request.repo_url
    
    parsed_info = parse_github_url(repo_url)
    if not parsed_info:
        raise HTTPException(status_code=400, detail="Invalid GitHub repository URL format.")
    
    owner, repo_name = parsed_info

    output_dir = f"output_data/{owner}_{repo_name}"
    os.makedirs(output_dir, exist_ok=True) 
    
    raw_data_responses: RawDataResponseType = {
        "input_url": repo_url,
        "parsed_owner": owner,
        "parsed_repo_name": repo_name,
        "repo_details": None,
        "readme_details": None,
        "languages": None,
        "file_tree": None,
        "errors": [] 
    }

    #  1. Fetch Repository Details (includes name) 
    repo_details_url = f"https://api.github.com/repos/{owner}/{repo_name}"
    try:
        response_repo_details = requests.get(repo_details_url, headers=HEADERS)
        response_repo_details.raise_for_status() 

        data_repo_details = response_repo_details.json()

        raw_data_responses["repo_details"] = data_repo_details

        with open(os.path.join(output_dir, "repo_details.json"), "w") as f:
            json.dump(data_repo_details, f, indent=4)

    except requests.exceptions.HTTPError as e:
        
        error_detail = f"GitHub API Error (Repo Details): {e.response.status_code} - {e.response.text}"
        raw_data_responses["errors"].append(error_detail)

    except requests.exceptions.RequestException as e:

        error_detail = f"Network Error (Repo Details): {e}"
        raw_data_responses["errors"].append(error_detail)


    #  2. Fetch README Details     
    readme_url = f"https://api.github.com/repos/{owner}/{repo_name}/readme"
    try:
        response_readme = requests.get(readme_url, headers=HEADERS)
        #if no readme
        if response_readme.status_code == 404:

            data_readme = {"message": "No README found", "content_base64": None}

            raw_data_responses["readme_details"] = data_readme

            with open(os.path.join(output_dir, "readme_details.json"), "w") as f:
                json.dump(data_readme, f, indent=4)

        #if readme present
        else:
            response_readme.raise_for_status()

            data_readme = response_readme.json()

            raw_data_responses["readme_details"] = data_readme
            with open(os.path.join(output_dir, "readme_details.json"), "w") as f:
                json.dump(data_readme, f, indent=4)

    except requests.exceptions.HTTPError as e:
        error_detail = f"GitHub API Error (README): {e.response.status_code} - {e.response.text}"
        raw_data_responses["errors"].append(error_detail)
    except requests.exceptions.RequestException as e:
        error_detail = f"Network Error (README): {e}"
        raw_data_responses["errors"].append(error_detail)


    #  3. Fetch Languages 
    languages_url = f"https://api.github.com/repos/{owner}/{repo_name}/languages"
    try:
        response_languages = requests.get(languages_url, headers=HEADERS)
        response_languages.raise_for_status()
        data_languages = response_languages.json()
        raw_data_responses["languages"] = data_languages
        with open(os.path.join(output_dir, "languages.json"), "w") as f:
            json.dump(data_languages, f, indent=4)
    except requests.exceptions.HTTPError as e:
        error_detail = f"GitHub API Error (Languages): {e.response.status_code} - {e.response.text}"
        raw_data_responses["errors"].append(error_detail)
    except requests.exceptions.RequestException as e:
        error_detail = f"Network Error (Languages): {e}"
        raw_data_responses["errors"].append(error_detail)


    #  4. Fetch File Structure
    default_branch = "main" 
    if raw_data_responses["repo_details"] and isinstance(raw_data_responses["repo_details"], dict) and "default_branch" in raw_data_responses["repo_details"]:

        default_branch_value = raw_data_responses["repo_details"]["default_branch"]

        if isinstance(default_branch_value, str):
             default_branch = default_branch_value
    
    tree_url = f"https://api.github.com/repos/{owner}/{repo_name}/git/trees/{default_branch}?recursive=1"

    try:
        response_tree = requests.get(tree_url, headers=HEADERS)

        response_tree.raise_for_status()

        data_tree = response_tree.json()

        raw_data_responses["file_tree"] = data_tree
        with open(os.path.join(output_dir, "file_tree.json"), "w") as f:
            json.dump(data_tree, f, indent=4)

    except requests.exceptions.HTTPError as e:
        error_detail = f"GitHub API Error (File Tree): {e.response.status_code} - {e.response.text}"
        raw_data_responses["errors"].append(error_detail)
    except requests.exceptions.RequestException as e:
        error_detail = f"Network Error (File Tree): {e}"
        raw_data_responses["errors"].append(error_detail)

    # Log errors to a file
    if raw_data_responses["errors"]:
        with open(os.path.join(output_dir, "errors.log"), "w") as f:
            for err_message in raw_data_responses["errors"]:
                f.write(err_message + "\n")

    # message indicating success or failure, and where files are
    if not raw_data_responses["errors"]:
        return {"message": f"Data fetched and saved to {output_dir}", "output_directory": output_dir, "data_summary": raw_data_responses}
    else:
        return {"message": f"Some errors occurred during data fetching. Check {output_dir}/errors.log", "output_directory": output_dir, "data_summary": raw_data_responses}
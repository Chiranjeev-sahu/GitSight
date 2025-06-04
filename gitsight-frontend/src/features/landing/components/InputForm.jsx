import React from "react";
import "./InputForm.css"; 


function InputForm({ repoUrl, onUrlChange, onSubmit, isLoading }) {
  const internalHandleSubmit = (event) => {
    event.preventDefault(); 
    if (onSubmit && !isLoading) {
        onSubmit(repoUrl); 
    }
  };

  return (
    <form className="repo-input-form" onSubmit={internalHandleSubmit}>
      <label htmlFor="repo-url-input">Enter repo link:</label>
      <input
        type="url"
        id="repo-url-input"
        placeholder="https://github.com/{owner}/{repo}"
        value={repoUrl}
        onChange={onUrlChange}
        disabled={isLoading}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
}

export default InputForm;
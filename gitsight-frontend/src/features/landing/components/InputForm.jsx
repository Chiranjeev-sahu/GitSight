import React from "react";
import "./InputForm.css";

function InputForm({ repoUrl, onUrlChange, onSubmit, isLoading }) { // Example props
  // This component will:
  // - Contain the URL input field and submit button.
  // - Be a controlled component (value and onChange from props).
  // - Handle form submission and call an onSubmit prop.
  // - Disable button when isLoading is true.
  return (
    <form className="repo-input-form" /* onSubmit={onSubmit} */ >
      <label htmlFor="repo-url-input">Enter repo link:</label>
      <input
        type="url"
        id="repo-url-input"
        placeholder="https://github.com/owner/repo"
        /* value={repoUrl} */
        /* onChange={onUrlChange} */
        required
      />
      <button type="submit" /* disabled={isLoading} */>
        {/* {isLoading ? "Analyzing..." : "Analyze"} */}
        Analyze
      </button>
      <p style={{fontSize: "0.8em", opacity: 0.7}}>InputForm Component</p>
    </form>
  );
}

export default InputForm;

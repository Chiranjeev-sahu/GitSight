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
      <label htmlFor="repo-url-input">Have a Repo You Want To Summarize?</label>
      <div className="input-wrapper">
        <input
          type="url"
          id="repo-url-input"
          placeholder="Enter Repository Link here...."
          value={repoUrl}
          onChange={onUrlChange}
          disabled={isLoading}
          required
          className="repo-url-input"  
        />
        <button type="submit" disabled={isLoading}>
          Analyze
        </button>
      </div>
      <div className="example-container">
        <span className="example-text">
          Example: https://github.com/<span className="owner-highlight">{'{owner}'}</span>/<span className="repo-highlight">{'{repo}'}</span>
        </span>
      </div>
    </form>
  );
}

export default InputForm;
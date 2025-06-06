import React from "react";
import "./FileStructureDisplay.css";

function FileStructureDisplay({ fileTreeString }) { 
  return (
    <section className="file-categorization-section">
      <h3>File Structure</h3>
      <pre className="file-tree-code-block">
        {fileTreeString || "File structure information not available."}
      </pre>
    </section>
  );
}

export default FileStructureDisplay;

import React from "react";
// import FileCategoryBox from "../../../components/FileCategoryBox/FileCategoryBox"; // If global
import "./FileStructureDisplay.css";

function FileStructureDisplay({ fileTreeString }) { // Example prop
  
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

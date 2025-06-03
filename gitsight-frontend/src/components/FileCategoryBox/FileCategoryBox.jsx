import React from "react";
import "./FileCategoryBox.css";

function FileCategoryBox({ title, files }) { // Example props
  // This component will:
  // - Be a reusable box to display lists of files for a category (server, client, etc.).
  // - Take title and an array of file strings/objects as props.
  return (
    <div className="file-category-box">
      <h3>{title || "File Category"}</h3>
      {/* Logic to display files list */}
      <p>FileCategoryBox: Reusable for file lists.</p>
    </div>
  );
}

export default FileCategoryBox;

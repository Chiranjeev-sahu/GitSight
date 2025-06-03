import React from "react";
import "./LanguagesDisplay.css";

function LanguagesDisplay({ languages }) { // Expects languages object/array
  // This component will:
  // - Display the list of languages and their usage (e.g., percentages or byte counts).
  // - This might be simple text before a chart component is implemented.
  return (
    <div className="languages-display">
      <h4>Languages:</h4>
      {/* Logic to iterate and display languages data */}
      <pre>{JSON.stringify(languages, null, 2)}</pre>
    </div>
  );
}

export default LanguagesDisplay;

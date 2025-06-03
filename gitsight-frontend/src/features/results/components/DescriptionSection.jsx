import React from "react";
import "./DescriptionSection.css";

function DescriptionSection({ summary }) { // Expects "summary" prop
  // This component will:
  // - Display the project purpose summary.
  return (
    <section className="description-section">
      <h3>Project Purpose Summary</h3>
      <p>{summary || "Summary not available."}</p>
    </section>
  );
}

export default DescriptionSection;

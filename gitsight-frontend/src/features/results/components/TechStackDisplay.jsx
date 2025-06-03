import React from "react";
import "./TechStackDisplay.css";

function TechStackDisplay({ techStack }) { // Expects techStack object
  // This component will:
  // - Display the categorized technology stack (Frontend, Backend, DB, Tools).
  // - Might use smaller "badge" components for individual technologies.
  return (
    <div className="tech-stack-display">
      <h4>Technology Stack:</h4>
      {/* Logic to iterate and display techStack data */}
      <pre>{JSON.stringify(techStack, null, 2)}</pre>
    </div>
  );
}

export default TechStackDisplay;

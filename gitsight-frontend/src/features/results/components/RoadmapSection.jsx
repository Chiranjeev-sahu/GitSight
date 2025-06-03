import React from "react";
import "./RoadmapSection.css";

function RoadmapSection({ roadmap }) { // Expects roadmap string
  // This component will:
  // - Display the AI-suggested reading roadmap.
  return (
    <section className="roadmap-section">
      <h3>Suggested Reading Roadmap</h3>
      <pre style={{whiteSpace: "pre-wrap"}}>{roadmap || "Roadmap not available."}</pre>
    </section>
  );
}

export default RoadmapSection;

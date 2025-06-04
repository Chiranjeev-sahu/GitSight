import React from 'react';
import './RoadmapSection.css'; 

function RoadmapSection({ roadmap }) {
  

  if (!roadmap) {
    return (
      <section className="roadmap-section card-style">
        <h3>Suggested Reading Roadmap</h3>
        <p>Roadmap suggestion not available.</p>
      </section>
    );
  }

  // Split the roadmap string into individual steps based on the newline character followed by a number and a period (e.g., "1.", "2.")
  // This handles cases where the AI might not put a newline before the next step
  
  const stepsRaw = roadmap.split(/\n(?=\d+\.\s*`)/); 

  const parsedSteps = stepsRaw.map(stepString => {
    const parts = stepString.split('--->'); 
    if (parts.length >= 2) {
      const titlePart = parts[0].trim(); 
      const descriptionPart = parts.slice(1).join('--->').trim(); // Join back if '--->' was in description
      return {
        id: titlePart, // Use the title part as a key, assuming it's unique enough for now
        title: titlePart,
        description: descriptionPart
      };
    }
    return { id: stepString, title: stepString, description: '' }; // Fallback if '--->' is not found
  }).filter(step => step.title); // Filter out any empty steps that might result from split

  if (parsedSteps.length === 0) {
    return (
      <section className="roadmap-section card-style">
        <h3>Suggested Reading Roadmap</h3>
        <p>Could not parse roadmap steps. Raw data:</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{roadmap}</pre>
      </section>
    );
  }

  return (
    <section className="roadmap-section card-style">
      <h3>Suggested Reading Roadmap</h3>
      <div className="roadmap-steps-container"> 
        {parsedSteps.map((step, index) => (
          <div key={step.id || index} className="roadmap-step-box">
            {/* This is where you'd later have the box and arrow connecting to the next */}
            <div className="step-content">
              <strong className="step-title">{step.title}</strong>
              {step.description && <p className="step-description">{step.description}</p>}
            </div>
            {index < parsedSteps.length - 1 && (
              <div className="roadmap-arrow">
                <span>↓</span> 
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default RoadmapSection;
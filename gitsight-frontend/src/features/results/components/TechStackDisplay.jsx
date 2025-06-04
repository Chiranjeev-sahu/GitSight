// src/features/results/components/TechStackDisplay.jsx
import React from 'react';
import './TechStackDisplay.css'; // Create this file

function TechStackDisplay({ techStack }) {

  if (!techStack || Object.keys(techStack).length === 0) {
    return (
      <div className="tech-stack-display">
        <h4>Technology Stack:</h4>
        <p>Technology stack information not available.</p>
      </div>
    );
  }

  // Filter out keys we don't want to display directly as categories
  const displayableCategories = Object.entries(techStack).filter(
    ([key, value]) => key !== 'raw_text_block' && key !== 'parsed_error' && key !== 'raw_text' // Add any other keys to exclude
  );

  if (displayableCategories.length === 0) {
     return (
      <div className="tech-stack-display">
        <h4>Technology Stack:</h4>
        <p>No specific technology categories found to display.</p>
      </div>
    );
  }

  return (
    <div className="tech-stack-display card-style"> {/* Optional: common card styling */}
      <h4>Technology Stack</h4>
      <ul className="tech-stack-list">
        {displayableCategories.map(([category, technologies]) => (
          <li key={category} className="tech-stack-item">
            <strong className="tech-category-title">{category}:</strong> 
            <span className="tech-list"> {typeof technologies === 'string' ? technologies : JSON.stringify(technologies)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TechStackDisplay;
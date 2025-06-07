import './TechStackDisplay.css';

function TechStackDisplay({ techStack }) {
  if (!techStack || Object.keys(techStack).length === 0) {
    return (
      <div className="tech-stack-display">
        <h4>Technology Stack:</h4>
        <p>Technology stack information not available.</p>
      </div>
    );
  }

  const displayableCategories = Object.entries(techStack).filter(
    ([key, value]) => key !== 'raw_text_block' && key !== 'parsed_error' && key !== 'raw_text'
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
    <div className="tech-stack-display">
      <h4>Technology Stack</h4>
      <div className="tech-stack-container">
        {displayableCategories.map(([category, technologies]) => (
          <div key={category} className="tech-stack-category">
            <strong className="tech-category-title">{category}:</strong>
            <span className="tech-list">
              {typeof technologies === 'string' ? technologies : technologies.join(', ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechStackDisplay;
import React from 'react';
import './LanguagesDisplay.css';

function LanguagesDisplay({ languages }) {
  if (!languages || typeof languages !== 'object' || Object.keys(languages).length === 0) {
    return (
      <div className="languages-display">
        <h4>Language Breakdown</h4>
        <p>Language usage information not available.</p>
      </div>
    );
  }

  return (
    <div className="languages-display">
      <h4>Language Breakdown</h4>
      <div className="languages-grid">
        {Object.keys(languages).map(language => (
          <div key={language} className="language-item">
            {language}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguagesDisplay;
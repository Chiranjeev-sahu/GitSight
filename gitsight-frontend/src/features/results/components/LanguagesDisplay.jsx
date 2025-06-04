// src/features/results/components/LanguagesDisplay.jsx
import React from 'react';
import LanguageChartSection from './LanguageChartSection'; // It will render this
import './LanguagesDisplay.css';

function LanguagesDisplay({ languages }) {
  // This component will display a list of languages and their usage,
  // and then render the LanguageChartSection.

  if (!languages || typeof languages !== 'object' || Object.keys(languages).length === 0) {
    return (
      <div className="languages-summary card-style">
        <h4>Language Usage:</h4>
        <p>Language usage information not available.</p>
      </div>
    );
  }

  return (
    <div className="languages-summary card-style">
      <h4>Language Breakdown (Bytes)</h4>
      <ul className="languages-list-textual">
        {Object.entries(languages).map(([language, bytes]) => {
          const numericBytes = typeof bytes === 'number' ? bytes : 0;
          return (
            <li key={language} className="language-item-textual">
              <strong className="language-name">{language}:</strong>
              <span className="language-bytes"> {numericBytes.toLocaleString()} bytes</span>
            </li>
          );
        })}
      </ul>
      
      {/* Now render the chart section, passing the same language data */}
      <LanguageChartSection languagesData={languages} /> {/* Changed prop name for clarity */}
    </div>
  );
}

export default LanguagesDisplay;
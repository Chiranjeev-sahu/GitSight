// src/features/results/components/LanguageChartSection.jsx
import React from 'react';
import './LanguageChartSection.css'; // Create this file

function LanguageChartSection({ languagesData }) { // Renamed prop
  // This component will:
  // - Calculate percentages for language usage.
  // - Display these percentages (textually for now).
  // - Eventually, render a visual chart using this data.

  if (!languagesData || typeof languagesData !== 'object' || Object.keys(languagesData).length === 0) {
    return (
      <div className="language-chart-section">
        {/* <h5>Distribution Chart:</h5> */}
        <p>No data available for chart.</p>
      </div>
    );
  }

  // Calculate the total bytes
  const totalBytes = Object.values(languagesData).reduce((accumulator, currentBytes) => {
    return accumulator + (typeof currentBytes === 'number' ? currentBytes : 0);
  }, 0);

  if (totalBytes === 0) {
      return (
        <div className="language-chart-section">
            {/* <h5>Distribution Chart:</h5> */}
            <p>No quantifiable language data to display chart.</p>
        </div>
      )
  }

  // Prepare data for a chart (array of objects is common for charting libraries)
  const chartDataForDisplay = Object.entries(languagesData).map(([name, bytes]) => {
    const numericBytes = typeof bytes === 'number' ? bytes : 0;
    const percentage = (numericBytes / totalBytes) * 100;
    return {
      name: name,
      bytes: numericBytes,
      percentage: parseFloat(percentage.toFixed(1)) // Store as number for potential charting
    };
  }).sort((a, b) => b.percentage - a.percentage); // Sort by percentage descending

  return (
    <div className="language-chart-section card-style"> {/* Added card-style for consistency */}
      <h4>Language Distribution (Chart Placeholder)</h4>
      
      {/* Placeholder for where a charting library (e.g., Chart.js, Recharts, Nivo)
          would render its canvas or SVG element.
          For now, we can list the percentages or do a very simple CSS bar.
      */}
      <div className="chart-placeholder-area">
        {chartDataForDisplay.map(lang => (
          <div key={lang.name} className="language-bar-item">
            <span className="language-bar-label">{lang.name} ({lang.percentage}%):</span>
            {/* Simple CSS Bar (very basic example) */}
            <div className="bar-container">
              <div 
                className="bar" 
                style={{ width: `${lang.percentage}%`, backgroundColor: '#007bff' }}
              >
                
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default LanguageChartSection;
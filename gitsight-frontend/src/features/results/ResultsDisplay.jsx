// src/features/results/ResultsDisplay.jsx
import React from 'react';
import './ResultsDisplay.css'; // Create this CSS file
import DescriptionSection from './components/DescriptionSection'
import TechAndLanguagesSection from './components/TechAndLanguagesSection'
import FileStructureDisplay from './components/FileStructureDisplay';
import RoadmmapSection from './components/RoadmapSection'
function ResultsDisplay({ results, onReset }) { // Added onReset prop
  if (!results) {
    return <p>Loading results or no data to display...</p>;
  }

  return (
    <div className="results-display">
      <h2>Analysis for: {results?.owner}/{results?.repository_name}</h2>
      {/* <p>ResultsDisplay: Shows all analysis sections (placeholder).</p> */}
      {/* 
        Future child components:
        <DescriptionSection summary={results?.project_purpose_summary} />
        <TechAndLanguagesSection tech={results?.deduced_technology_stack} languages={results?.language_stats} />
        ... etc. ...
      */}
      <DescriptionSection summary={results?.project_purpose_summary} />


      <TechAndLanguagesSection tech={results?.deduced_technology_stack} languages={results?.language_stats} />


      <FileStructureDisplay fileTreeString={results?.file_structure_display}/>


      <RoadmmapSection roadmap={results?.reading_roadmap_suggestion}/>
      {results?.raw_github_errors?.length > 0 && (
        <div className="error-log"> 
          <h3>GitHub Fetch Errors:</h3>
          <ul>
            {results.raw_github_errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
      {results?.ai_call_errors && (
        <div className="error-log"> 
          <h3>AI Call Error:</h3>
          <p>{results.ai_call_errors}</p>
        </div>
      )}

      <button onClick={onReset} className="reset-button"> 
        Analyze Another Repository
      </button>
    </div>
  );
}

export default ResultsDisplay;
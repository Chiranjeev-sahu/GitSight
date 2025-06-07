import React, { useState, useEffect, useRef } from 'react';
import './ResultsDisplay.css';
import DescriptionSection from './components/DescriptionSection';
import TechStackDisplay from "./components/TechStackDisplay";
import LanguagesDisplay from './components/LanguagesDisplay';
import LanguageChartSection from './components/LanguageChartSection';
import FileStructureDisplay from './components/FileStructureDisplay';
import RoadmmapSection from './components/RoadmapSection';

function ResultsDisplay({ results, onReset }) {
  const [isMounted, setIsMounted] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    const mountTimeout = setTimeout(() => {
      setIsMounted(true);
      if (resultsRef.current) {
        resultsRef.current.classList.add('results-display-enter');
      }
    }, 50);

    return () => clearTimeout(mountTimeout);
  }, []);

  if (!results) {
    return <p>Loading results or no data to display...</p>;
  }

  return (
    <div ref={resultsRef} className={`results-display-container ${isMounted ? 'results-display-enter' : ''}`}>
      <h2>Analysis for: {results?.owner}/{results?.repository_name}</h2>

      <div className="parent">
        <div className="div1 card-style">
          <DescriptionSection summary={results?.project_purpose_summary} />
        </div>
        <div className="div2 card-style">
          <TechStackDisplay techStack={results?.deduced_technology_stack} />
        </div>
        <div className="div3 card-style">
          <FileStructureDisplay fileTreeString={results?.file_structure_display} />
        </div>
        <div className="div4 card-style">
          <RoadmmapSection roadmap={results?.reading_roadmap_suggestion} />
        </div>
        <div className="div5 card-style">
          <LanguagesDisplay languages={results?.language_stats} />
        </div>
        <div className="div6 card-style">
          <LanguageChartSection languagesData={results?.language_stats} />
        </div>
      </div>

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
import React from "react";
// Import section components
// import DescriptionSection from "./components/DescriptionSection";
// import TechAndLanguagesSection from "./components/TechAndLanguagesSection";
// import FileCategorizationSection from "./components/FileCategorizationSection";
// import LanguageChartSection from "./components/LanguageChartSection";
// import RoadmapSection from "./components/RoadmapSection";
import "./ResultsDisplay.css";

function ResultsDisplay({ results }) { // Expects "results" prop
  // This component will:
  // - Be the main container for all analysis results.
  // - Receive the full analysis data object as a prop.
  // - Render various section components, passing relevant parts of the data to them.
  if (!results) return <p>Loading results or no data to display...</p>;
  return (
    <div className="results-display">
      <h2>Analysis for: {results?.owner}/{results?.repository_name}</h2>
      <p>ResultsDisplay: Shows all analysis sections.</p>
      {/* <DescriptionSection summary={results?.project_purpose_summary} /> */}
      {/* <TechAndLanguagesSection tech={results?.deduced_technology_stack} languages={results?.language_stats} /> */}
      {/* <FileCategorizationSection fileCategories={...} /> */}
      {/* <LanguageChartSection chartData={results?.language_stats} /> */}
      {/* <RoadmapSection roadmap={results?.reading_roadmap_suggestion} /> */}
      {results?.raw_github_errors?.length > 0 && (
        <div><h3>GitHub Errors:</h3><ul>{results.raw_github_errors.map((e, i) => <li key={i}>{e}</li>)}</ul></div>
      )}
      {results?.ai_call_errors && <div><h3>AI Error:</h3><p>{results.ai_call_errors}</p></div>}
    </div>
  );
}

export default ResultsDisplay;

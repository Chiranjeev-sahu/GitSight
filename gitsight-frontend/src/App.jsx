import React, { useState } from 'react';

// Import your main feature components
import LandingPage from './features/landing/LandingPage';
import LoadingOverlay from './features/loading/LoadingOverlay';
import ResultsDisplay from './features/results/ResultsDisplay';

import './App.css';

function App() {
  
  const [repoUrlInput, setRepoUrlInput] = useState('');//current text in the input field.

  // main view: 'landing', 'loading', or 'results'.
  const [currentView, setCurrentView] = useState('landing');

  // stores data fetched from the backend
  const [analysisResults, setAnalysisResults] = useState(null);

  // error message to display to the user
  const [error, setError] = useState(null);


  /**
   * Updates the 'repoUrlInput' state as the user types in the input field.
   * Passed as a prop to InputForm (via LandingPage).
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleUrlInputChange = (event) => {
    // TODO: Implement - setRepoUrlInput(event.target.value);
    console.log("handleUrlInputChange called with value:", event.target.value);
  };

  /**
   * Initiates the repository analysis process when the form is submitted.
   * Passed as a prop to InputForm (via LandingPage).
   * Handles setting loading states, making the API call, and processing the response.
   * @param {string} urlToAnalyze - The GitHub repository URL to analyze.
   */
  const handleAnalyzeSubmit = async (urlToAnalyze) => {
    // TODO: Implement -
    // 1. Set currentView to 'loading', clear errors/results.
    // 2. Make API call to backend.
    // 3. On success: set analysisResults, set currentView to 'results'.
    // 4. On failure: set error, potentially set currentView back to 'landing' or an 'error' view.
    console.log("handleAnalyzeSubmit called with URL:", urlToAnalyze);
    setCurrentView('loading'); // Example: directly set to loading
    // Simulate API call
    setTimeout(() => {
        // Simulate success for now
        setAnalysisResults({ /* ... some mock data ... */ repository_name: urlToAnalyze.split('/').pop() });
        setCurrentView('results');
        // Or simulate error:
        // setError("Simulated API error!");
        // setCurrentView('landing');
    }, 2000);
  };

  /**
   * Resets the application state to return to the initial landing page view.
   * Can be passed to ResultsDisplay or an error component.
   */
  const handleResetApp = () => {
    // TODO: Implement -
    // 1. Set repoUrlInput to ''.
    // 2. Set currentView to 'landing'.
    // 3. Set analysisResults to null.
    // 4. Set error to null.
    console.log("handleResetApp called");
    setCurrentView('landing');
    setRepoUrlInput('');
    setAnalysisResults(null);
    setError(null);
  };


  // === JSX RENDER ===
  return (
    <div className="app-container">

      {/* conditional rendering of landing page,loading results */}

      {currentView === 'landing' && (
        <LandingPage
          // Props for the InputForm within LandingPage:
          initialRepoUrl={repoUrlInput}      // The current value for the input field
          onUrlChange={handleUrlInputChange} // Function to update repoUrlInput when user types
          onFormSubmit={handleAnalyzeSubmit} // Function to call when the form is submitted
          isLoading={false}                  // Landing page itself isn't "loading" in the API sense here
                                             // (the 'loading' view handles the API loading state)
          // Prop to display any error messages directly on the landing page:
          errorMessage={error}
        />
      )}

      {currentView === 'loading' && (
        <LoadingOverlay/>
      )}

      {currentView === 'results' && analysisResults && ( 
        <ResultsDisplay results={analysisResults} onReset={handleResetApp}/>
      )}

    </div>
  );
}

export default App;
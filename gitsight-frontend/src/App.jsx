// src/App.jsx
import React, { useState } from 'react';
import LandingPage from './features/landing/LandingPage';
import LoadingOverlay from './features/loading/LoadingOverlay';
import ResultsDisplay from './features/results/ResultsDisplay';
import './App.css';


const API_BASE_URL = 'http://127.0.0.1:8000'; 

function App() {
  const [repoUrlInput, setRepoUrlInput] = useState('');
  const [currentView, setCurrentView] = useState('landing');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);

  //url input handling
  const handleUrlInputChange = (event) => {
    setRepoUrlInput(event.target.value);
    // console.log("Input changed to:", event.target.value);
  };

  //handling the submit
  const handleAnalyzeSubmit = async (urlToAnalyze) => { 
    if (!urlToAnalyze || urlToAnalyze.trim() === '') {
        setError("Please enter a GitHub repository URL.");
        return; 
    }
    console.log("App.jsx: handleAnalyzeSubmit called with URL:", urlToAnalyze);
    
    setCurrentView('loading');
    setError(null); 
    setAnalysisResults(null); 

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze-repo/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Accept': 'application/json'
        },
        body: JSON.stringify({ repo_url: urlToAnalyze }),
      });

      
      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.detail) {
            if (Array.isArray(errorData.detail) && errorData.detail[0] && errorData.detail[0].msg) {
              errorMessage = `Validation Error: ${errorData.detail[0].msg} for field ${errorData.detail[0].loc.join('.')}`;
            } else if (typeof errorData.detail === 'string') {
              errorMessage = errorData.detail;
            } else {
               errorMessage = JSON.stringify(errorData);
            }
          }
        } catch (e) {
          console.warn("Could not parse error response JSON from backend:", e);
        }
        throw new Error(errorMessage);
      }

      // parse the json data
      const data = await response.json();
      
      console.log("App.jsx: API call successful. Data received:", data);
      setAnalysisResults(data);
      setCurrentView('results');

    } catch (err) {
      console.error("App.jsx: Error during analysis fetch:", err);
      setError(err.message || "Failed to fetch analysis. Check network or server status.");
      setCurrentView('landing'); // Or an 'error' view if you prefer
    }
  };

  
  const handleResetApp = () => {
    console.log("App.jsx: handleResetApp called");
    setCurrentView('landing');
    setRepoUrlInput('');
    setAnalysisResults(null);
    setError(null);
  };

  return (
    <div className="app-container">



      {currentView === 'landing' && (
        <LandingPage
          initialRepoUrl={repoUrlInput}
          onUrlChange={handleUrlInputChange}
          onAnalyzeRepoRequest={handleAnalyzeSubmit} 
          isLoading={currentView === 'loading'}
          errorMessage={error} 
        />
      )}


      {currentView === 'loading' && <LoadingOverlay />}



      {currentView === 'results' && analysisResults && (
        <ResultsDisplay results={analysisResults} onReset={handleResetApp} />
      )}

      
    </div>
  );
}
export default App;
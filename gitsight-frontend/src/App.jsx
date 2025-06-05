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

  const handleAnalyzeSubmit = async (urlToAnalyze) => {
    if (!urlToAnalyze || urlToAnalyze.trim() === '') {
      setError("Please enter a GitHub repository URL.");
      return;
    }
    console.log("App.jsx: handleAnalyzeSubmit called with URL:", urlToAnalyze);
    
    setCurrentView('loading');
    setError(null);
    setAnalysisResults(null);

    // --- DUMMY API CALL SIMULATION ---
    console.log("App.jsx: SIMULATING API call and AI processing for:", urlToAnalyze);
    await new Promise(resolve => setTimeout(resolve, 8000)); // Simulate a longer 8-second delay to see loader

    // Simulate a successful response with your full data structure
    // (You can copy the full mock data object from our previous discussion here)
    const mockDataFromBackend = { 
      repository_name: urlToAnalyze.split('/').pop() || "Test Repo",
      owner: urlToAnalyze.split('/')[urlToAnalyze.split('/').length - 2] || "Test Owner",
      project_purpose_summary: "This is a detailed AI summary explaining the project's goals, target audience, and the problems it solves based on the fetched repository data. It's designed to be insightful and comprehensive.",
      deduced_technology_stack: {
        "raw_text_block": "Frontend: React, CSS Modules, Vite\nBackend: Python, FastAPI, Uvicorn\nDatabase: None\nKey Libraries/Tools: Requests, Pydantic, google-generativeai, react-router",
        "Frontend": "React, CSS Modules, Vite",
        "Backend": "Python, FastAPI, Uvicorn",
        "Database": "Potentially None or in-memory for session data",
        "Key Libraries/Tools": "Requests (Python), Pydantic (Python), google-generativeai (Python), dotenv"
      },
      language_stats: {
        "JavaScript": 75000,
        "Python": 55000,
        "HTML": 5000,
        "CSS": 8000
      },
      reading_roadmap_suggestion: "1.  `src/App.jsx`---> Main application orchestrator, state management.\n2.  `src/features/results/ResultsDisplay.jsx`---> How all analysis data is presented.\n3.  `main.py` (backend)---> Understand the API endpoint logic and data fetching from GitHub/AI.",
      file_structure_display: "gitsight-frontend/\n├── src/\n│   ├── App.jsx\n│   ├── features/\n│   │   ├── landing/\n│   │   └── results/\n│   └── main.jsx\n└── ... (other project files)",
      raw_github_errors: [],
      ai_call_errors: null
    };

    // Simulate sometimes an error occurs (uncomment to test error display)
    // if (Math.random() > 0.7) {
    //   console.error("App.jsx: SIMULATED API/AI Error");
    //   setError("Simulated error: AI analysis failed after fetching data.");
    //   setCurrentView('landing'); // Or an 'error' view
    //   return; // Exit before setting results
    // }

    console.log("App.jsx: Simulated API call successful. Data:", mockDataFromBackend);
    setAnalysisResults(mockDataFromBackend);
    setCurrentView('results');
    // --- END OF DUMMY API CALL SIMULATION ---
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
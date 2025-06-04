// src/features/landing/LandingPage.jsx
import React from 'react';
import InputForm from './components/InputForm';
import logoImage from '../../assets/logo.png';
import './LandingPage.css';

function LandingPage({ initialRepoUrl, onUrlChange, onAnalyzeRepoRequest, isLoading, errorMessage }) {
  return (
    <main className="landing-page-container">
      {/* This div will act as our "top bar" for logo and site name */}
      <div className="landing-page-header">
        <img src={logoImage} alt="Gitsight Logo" className="header-logo" />
        <span className="header-site-name">GitSight</span> {/* Using span for more flexible styling with logo */}
      </div>

      {/* This div will contain the main hero content: tagline and input form */}
      <div className="hero-content-area">
        <h1 className="hero-tagline">
  Unlock instant understanding of any GitHub repository with <span className="highlight">AI-powered</span> summaries.
</h1>
        
        {errorMessage && <p className="landing-error">{errorMessage}</p>} 

        <InputForm 
          repoUrl={initialRepoUrl}
          onUrlChange={onUrlChange}
          onSubmit={onAnalyzeRepoRequest}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}

export default LandingPage;
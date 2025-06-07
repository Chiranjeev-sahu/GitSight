import InputForm from './components/InputForm';
import logoImage from '../../assets/logo.png';
import Header from './components/Header';
import './LandingPage.css';

function LandingPage({ initialRepoUrl, onUrlChange, onAnalyzeRepoRequest, isLoading, errorMessage }) {
  return (
    <main className="landing-page-container">
      <div className="landing-page-header">
          <Header/>
      </div>

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
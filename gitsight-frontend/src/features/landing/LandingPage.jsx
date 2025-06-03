import React from "react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import "./LandingPage.css";

function LandingPage({ onSubmit }) { // Expects onSubmit prop from App
  // This component will:
  // - Group the Header, tagline, and InputForm for the initial view.
  // - Pass the onSubmit prop to InputForm or handle submission here.
  return (
    <div className="landing-page">
      <Header />
      <p className="tagline">Your go-to AI tool for summarizing GitHub Repos</p>
      <InputForm /* onSubmit={onSubmit} */ />
      <p style={{marginTop: "20px", fontSize: "0.8em", opacity: 0.7}}>LandingPage Main Component</p>
    </div>
  );
}

export default LandingPage;

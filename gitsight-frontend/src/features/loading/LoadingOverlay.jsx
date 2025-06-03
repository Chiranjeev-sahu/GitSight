import React from "react";
// import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation"; // If global
// import LoadingAnimation from "./components/LoadingAnimation"; // If local to feature
import "./LoadingOverlay.css";

function LoadingOverlay() {
  // This component will:
  // - Be a full-screen overlay shown during API calls.
  // - Contain the LoadingAnimation component.
  // - Manage the "curtains up" transition to reveal results.
  return (
    <div className="loading-overlay">
      {/* <LoadingAnimation /> */}
      <p>LoadingOverlay: Full-screen loader view.</p>
    </div>
  );
}

export default LoadingOverlay;

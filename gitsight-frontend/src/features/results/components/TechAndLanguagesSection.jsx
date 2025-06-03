import React from "react";
// import TechStackDisplay from "./TechStackDisplay";
// import LanguagesDisplay from "./LanguagesDisplay";
import "./TechAndLanguagesSection.css";

function TechAndLanguagesSection({ tech, languages }) { // Expects props
  // This component will:
  // - Group and display the tech stack and language information.
  // - Might render TechStackDisplay and LanguagesDisplay as children.
  return (
    <section className="tech-languages-section">
      <h3>Technologies & Languages Used</h3>
      {/* <TechStackDisplay techStack={tech} /> */}
      {/* <LanguagesDisplay languages={languages} /> */}
      <p>TechAndLanguagesSection: Shows tech stack and languages.</p>
    </section>
  );
}

export default TechAndLanguagesSection;

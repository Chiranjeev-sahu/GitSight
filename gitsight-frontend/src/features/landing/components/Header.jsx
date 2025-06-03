import React from "react";
import logo from "../../../assets/logo.png"; // Adjusted path
import "./Header.css";

function Header() {
  // This component will:
  // - Display the "Gitsight" title and logo.
  return (
    <header className="site-header">
      <img src={logo} alt="Gitsight Logo" className="logo" />
      <h1>Gitsight</h1>
    </header>
  );
}

export default Header;

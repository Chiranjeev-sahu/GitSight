import React from "react";
import logoImage from '../../../assets/logo.png'; // Assuming correct relative path
import "./Header.css";

function Header() {
  return (
    <div className="header-class">
      <header className="site-header">
        <img src={logoImage} alt="Gitsight Logo" className="logo" />
        <h1>Gitsight</h1>
      </header>
    </div>
  );
}
export default Header;
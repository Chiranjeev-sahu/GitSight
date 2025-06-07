import logoImage from '../../../assets/logo.png';
import twitterlogo from '../../../assets/twitter.png';
import githubLogo from '../../../assets/github.png';
import "./Header.css";

function Header() {
  return (
    <div className="header-class">
      <header className="site-header">
        <div className="left">
          <img src={logoImage} alt="Gitsight Logo" className="logo" />
          <h1>GitSight</h1>
        </div>
        <div className="right">
          <a href="https://github.com/Chiranjeev-sahu/GitSight"><img src={githubLogo} alt="github-logo" /></a>
          <a href="https://x.com/_V0YD"><img src={twitterlogo} alt="twitter-logo" className='twitter-logo' /></a>
        </div>
      </header>
    </div>
  );
}
export default Header;
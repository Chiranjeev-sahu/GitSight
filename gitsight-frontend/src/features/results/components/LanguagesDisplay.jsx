import './LanguagesDisplay.css';

function LanguagesDisplay({ languages }) {
  if (!languages || typeof languages !== 'object' || Object.keys(languages).length === 0) {
    return (
      <div className="languages-display">
        <h4>Language Breakdown</h4>
        <p>Language usage information not available.</p>
      </div>
    );
  }

  const getLanguageLogoUrl = (language) => {
    const langKey = language.toLowerCase();
    
    const deviconMap = {
      javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      html: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      css: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      'c++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      c: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      'c#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      csharp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      go: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      rust: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
      php: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      ruby: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
      swift: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
      kotlin: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      dart: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
      shell: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
      bash: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
      powershell: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg',
      sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      r: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
      matlab: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg',
      scala: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg',
      perl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg',
      lua: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg',
      haskell: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg',
      clojure: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clojure/clojure-original.svg',
      erlang: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/erlang/erlang-original.svg',
      elixir: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg',
      dockerfile: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      yaml: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yaml/yaml-original.svg',
      json: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg',
      xml: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg',
      markdown: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
      vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      svelte: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
      flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      unity: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
      django: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
      flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
      express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      sass: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      less: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg',
      webpack: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
      vite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg'
    };

    return deviconMap[langKey];
  };

  const getLanguageLogo = (language) => {
    const langKey = language.toLowerCase();
    
    const logoUrl = getLanguageLogoUrl(langKey);
    if (logoUrl) return logoUrl;
    
    switch (langKey) {
      case 'js':
        return getLanguageLogoUrl('javascript');
      case 'ts':
        return getLanguageLogoUrl('typescript');
      case 'py':
        return getLanguageLogoUrl('python');
      case 'html5':
        return getLanguageLogoUrl('html');
      case 'css3':
        return getLanguageLogoUrl('css');
      case 'reactjs':
      case 'react.js':
        return getLanguageLogoUrl('react');
      case 'vuejs':
      case 'vue.js':
        return getLanguageLogoUrl('vue');
      case 'nodejs':
      case 'node.js':
      case 'node':
        return getLanguageLogoUrl('nodejs');
      case 'c++':
      case 'cxx':
        return getLanguageLogoUrl('cpp');
      case 'c#':
        return getLanguageLogoUrl('csharp');
      case 'golang':
        return getLanguageLogoUrl('go');
      case 'dockerfile':
      case 'docker':
        return getLanguageLogoUrl('dockerfile');
      default:
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${langKey}/${langKey}-original.svg`;
    }
  };

  const languageNames = Object.keys(languages).sort(); 

  return (
    <>
    <h4>Language Breakdown</h4>
    <div className="languages-display">
      <div className="languages-grid">
        {languageNames.map(name => (
          <div key={name} className="language-item">
            <div className="language-icon">
              {getLanguageLogo(name) ? (
                <img 
                  src={getLanguageLogo(name)}
                  alt={`${name} logo`}
                  className="language-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'inline';
                  }}
                />
              ) : null}
              <span className="language-fallback" style={{ display: 'none' }}>
                📄
              </span>
            </div>
            <span className="language-name">{name}</span>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default LanguagesDisplay;
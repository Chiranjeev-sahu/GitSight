import './LanguageChartSection.css';

function assign_language_colors(language_stats) {
  const languageColors = {};
  const colorChoices = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b',
    '#ef4444', '#10b981', '#3b82f6', '#f472b6', '#22d3ee', '#a3e635', '#fb923c', '#c084fc',
    '#38bdf8', '#4ade80', '#facc15', '#fb7185', '#34d399', '#60a5fa', '#a78bfa', '#fbbf24'
  ];

  function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; 
    }
    return Math.abs(hash);
  }

  const languages = Object.keys(language_stats).sort();
  
  const availableColors = [...colorChoices];
  const usedColors = new Set();

  for (const language of languages) {
    const hash = simpleHash(language);
    let colorIndex = hash % availableColors.length;
    
    if (usedColors.size >= colorChoices.length) {
      languageColors[language] = colorChoices[colorIndex % colorChoices.length];
    } else {
      // Find an unused color
      while (usedColors.has(availableColors[colorIndex])) {
        colorIndex = (colorIndex + 1) % availableColors.length;
      }
      
      const selectedColor = availableColors[colorIndex];
      languageColors[language] = selectedColor;
      usedColors.add(selectedColor);
    }
  }

  return languageColors;
}

function LanguageChartSection({ languagesData }) {
  if (!languagesData || typeof languagesData !== 'object' || Object.keys(languagesData).length === 0) {
    return (
      <div className="card">
        <h3 className="card-title">Language Distribution</h3>
        <p>No data available for chart.</p>
      </div>
    );
  }

  const totalBytes = Object.values(languagesData).reduce((acc, bytes) => acc + (typeof bytes === 'number' ? bytes : 0), 0);

  if (totalBytes === 0) {
    return (
      <div className="card">
        <h3 className="card-title">Language Distribution</h3>
        <p>No quantifiable language data to display chart.</p>
      </div>
    );
  }

  const chartData = Object.entries(languagesData).map(([name, bytes]) => {
    const numericBytes = typeof bytes === 'number' ? bytes : 0;
    const percentage = (numericBytes / totalBytes) * 100;
    return {
      name: name,
      bytes: numericBytes,
      percentage: parseFloat(percentage.toFixed(1)),
    };
  }).sort((a, b) => b.percentage - a.percentage);

  const languageColors = assign_language_colors(languagesData);

  return (
    <div className="card">
      <h3 className="card-title">Language Distribution</h3>
      <div className="chart-container">
        {chartData.map((lang, index) => (
          <div key={index} className="chart-bar-container">
            <div className="chart-label">
              <span>{lang.name} ({lang.percentage}%)</span>
            </div>
            <div className="chart-bar-background">
              <div 
                className="chart-bar"
                style={{ 
                  width: `${lang.percentage}%`,
                  backgroundColor: languageColors[lang.name],
                  animationDelay: `${index * 0.2}s`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageChartSection;

import React, { useState, useEffect, useMemo} from 'react';
import './LoadingOverlay.css'
const LoadingOverlay = () => { 
  const [currentText, setCurrentText] = useState('fetching');
  const [textsToCycle] = useState(['fetching', 'analyzing', 'summarizing']); 
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % textsToCycle.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [textsToCycle.length]);
  useEffect(() => {
    setCurrentText(textsToCycle[textIndex]);
  }, [textIndex, textsToCycle]);


  const createShootingStars = useMemo(() => {
    const numberOfStars = 12;
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      const left = (i + 1) * (100 / (numberOfStars + 1));
      const duration = 1.5 + Math.random() * 1.5; 
      const delay = Math.random() * 5;  

      stars.push(
        <div
          key={`star-${i}`}
          className="shooting-star"
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return stars;
  }, []);

  return (
    
    <div className="loading-overlay-from-component"> 
      

      {createShootingStars}

      <div className="centered-content-wrapper">
        <div className="text-container">
          <div className="text-wrapper">
            <div className="text active">
              {currentText}
            </div>
          </div>
          <div className="jumping-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay; // Export with the name App.jsx expects
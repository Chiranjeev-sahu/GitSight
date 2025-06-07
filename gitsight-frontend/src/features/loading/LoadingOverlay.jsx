import React, { useState, useEffect, useMemo, useRef } from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
  const [isMounted, setIsMounted] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const mountTimeout = setTimeout(() => {
      setIsMounted(true);
    }, 50);

    return () => clearTimeout(mountTimeout);
  }, []);

  const [currentText, setCurrentText] = useState('fetching');
  const [textsToCycle] = useState(['fetching', 'analyzing', 'summarizing']);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex(prevIndex => {
        // Stop at the last index instead of cycling back to 0
        if (prevIndex < textsToCycle.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex; // Stay at the last index
      });
    }, 2000);
    return () => clearInterval(intervalId);
  }, [textsToCycle.length]); // Add textsToCycle.length as dependency

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
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    return stars;
  }, []);

  return (
    <div ref={overlayRef} className={`loading-overlay-from-component ${isMounted ? 'loading-overlay-enter' : ''}`}>
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

export default LoadingOverlay;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './All.css';

const All = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="not-found-container">
      {/* Animated background gradient */}
      <div className="gradient-bg"></div>
      
      {/* Floating orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Main content */}
      <div className="not-found-content">
        <div className="error-code-wrapper">
          <h1 className="error-code">404</h1>
          <div className="glitch" data-text="404">404</div>
        </div>

        <div className="error-text">
          <h2 className="error-title">Page Lost in Space</h2>
          <p className="error-description">
            Oops! It seems you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="error-actions">
          
          <button 
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            <span className="btn-text">Go Back</span>
          </button>
        </div>

        {/* Decorative elements */}
        <div className="starfield">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default All;
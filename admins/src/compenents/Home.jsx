import React, { useState, useEffect } from 'react';
import './UploadChoicePage.css';
import { useNavigate } from "react-router";
import config from '../config';

const Home = () => {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null);
  const check_login = async () => {
    const res = await fetch(`${config.API_BASE_URL}/readcookie`, {
      method: "POST",
      credentials: 'include',
    })
    const response=await res.json()
    if (response.success==true){
      navigate('/')
    }
    else{
      navigate('/login')
    }
  }
  useEffect(() => {
    async function loged(){
      await check_login()
    }
    loged()
  }, [])

  return (
    <div className="upload-choice-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">📤 Upload Portal</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="page-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Share Your <span className="gradient-text">Achievements</span>
            </h1>
            <p className="hero-subtitle">
              Choose what you want to upload and showcase your work to the world
            </p>
          </div>
        </section>

        {/* Choice Cards Section */}
        <section className="choice-section">
          <div className="choice-container">
            {/* Certificate Card */}
            <div
              className={`choice-card certificate-card ${hoveredCard === 'certificate' ? 'hovered' : ''
                }`}
              onMouseEnter={() => setHoveredCard('certificate')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header">
                <div className="card-icon">📜</div>
                <h2>Upload Certificate</h2>
              </div>

              <div className="card-content">
                <p className="card-description">
                  Share your certifications, achievements, and professional credentials
                </p>

                <div className="features-list">
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Certificate Title</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Issuer/Provider Info</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Date Received</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Certificate Image</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Color Theme</span>
                  </div>
                </div>
              </div>

              <button className="card-button" onClick={() => navigate('/certificate')}>
                Upload Certificate
                <span className="arrow">→</span>
              </button>
            </div>

            {/* Project Card */}
            <div
              className={`choice-card project-card ${hoveredCard === 'project' ? 'hovered' : ''
                }`}
              onMouseEnter={() => setHoveredCard('project')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header">
                <div className="card-icon">🚀</div>
                <h2>Upload Project</h2>
              </div>

              <div className="card-content">
                <p className="card-description">
                  Showcase your amazing projects and demonstrate your technical skills
                </p>

                <div className="features-list">
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Project Title</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Detailed Description</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Technology Tags</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Project Image</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span>Project Link</span>
                  </div>
                </div>
              </div>

              <button className="card-button" onClick={() => navigate('/project')}>
                Upload Project
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </section>


      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Upload Portal. Share your achievements with the world.</p>
      </footer>
    </div>
  );
};

export default Home;
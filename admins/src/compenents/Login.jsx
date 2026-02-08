import React, { useState } from 'react';
import './Loginpage.css';
import config from '../config';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(async() => {
      const loginData = {
        email: formData.email,
        password: formData.password,
        rememberMe: rememberMe,
        loginTime: new Date().toISOString()
      };

      console.log('Login Data:', loginData);

      await fetch(`${config.API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials:'include',
        body: JSON.stringify(loginData)
       })

      setSuccess(true);

      setTimeout(() => {
        setFormData({
          email: '',
          password: '',
        });
        setSuccess(false);
        
      }, 2000);
      setLoading(false);
      navigate('/')
    }, 1500);
  };

  return (
    <div className="login-page-wrapper">
      {/* Animated Background */}
      <div className="login-bg-animation">
        <div className="login-gradient-blob login-blob-primary"></div>
        <div className="login-gradient-blob login-blob-secondary"></div>
        <div className="login-gradient-blob login-blob-tertiary"></div>
      </div>

      {/* Main Content */}
      <div className="login-main-layout">
        {/* Left Section - Branding */}
        <div className="login-sidebar-section">
          <div className="login-brand-section">
            <div className="login-logo-container">
              <span className="login-logo-icon">📤</span>
            </div>
            <h1 className="login-brand-title">Upload Portal</h1>
            <p className="login-brand-subtitle">
              Share your projects and certificates with the world
            </p>
          </div>

          <div className="login-features-container">
            <div className="login-feature-item">
              <div className="login-feature-icon-box">🚀</div>
              <div className="login-feature-info">
                <h4 className="login-feature-name">Quick Upload</h4>
                <p className="login-feature-text">Share your projects in minutes</p>
              </div>
            </div>

            <div className="login-feature-item">
              <div className="login-feature-icon-box">📜</div>
              <div className="login-feature-info">
                <h4 className="login-feature-name">Showcase Certs</h4>
                <p className="login-feature-text">Display your achievements</p>
              </div>
            </div>

            <div className="login-feature-item">
              <div className="login-feature-icon-box">🌟</div>
              <div className="login-feature-info">
                <h4 className="login-feature-name">Professional Design</h4>
                <p className="login-feature-text">Beautiful showcase</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            {success ? (
              <div className="login-success-state">
                <div className="login-success-icon">✓</div>
                <h2 className="login-success-heading">Login Successful!</h2>
                <p className="login-success-text">Redirecting to your dashboard...</p>
              </div>
            ) : (
              <>
                <div className="login-form-header">
                  <h2 className="login-form-heading">Welcome Back</h2>
                  <p className="login-form-desc">Sign in to continue to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                  {/* Email Field */}
                  <div className="login-field">
                    <label htmlFor="email" className="login-field-label">Email Address</label>
                    <div className="login-input-container">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        disabled={loading}
                        className={`login-input ${errors.email ? 'login-input-error' : ''}`}
                      />
                      <span className="login-input-icon-left">✉️</span>
                    </div>
                    {errors.email && (
                      <span className="login-error-msg">{errors.email}</span>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="login-field">
                    <div className="login-label-with-link">
                      <label htmlFor="password" className="login-field-label">Password</label>
                      <a href="#forgot" className="login-forgot-link">
                        Forgot password?
                      </a>
                    </div>
                    <div className="login-input-container">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        disabled={loading}
                        className={`login-input ${errors.password ? 'login-input-error' : ''}`}
                      />
                      <button
                        type="button"
                        className="login-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="login-error-msg">{errors.password}</span>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="login-checkbox">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading}
                    />
                    <label htmlFor="remember" className="login-checkbox-label">Remember me for 30 days</label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="login-submit-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="login-spinner"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
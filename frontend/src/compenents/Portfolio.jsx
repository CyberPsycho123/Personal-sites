import { useState, useEffect } from 'react';
import './Portfolio.css';
import { useLocation } from 'react-router-dom';

const Portfolio = ({ certificates, projects }) => {
  const { pathname } = useLocation()
  const person_name = pathname.replace("/", "").toUpperCase();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [name, setname] = useState("porfolio")
  const [mail, setmail] = useState("")
  const [phone_no, setno] = useState("")
  const [github, sethub] = useState("#")
  const [linkedin, setlink] = useState("#")
  const [location, setlock] = useState("")
  const [textcolor, setcolor] = useState("blueviolet")
  const [role, setrole] = useState("")
  const [about, setabout] = useState("")
  const [resume, setresume] = useState("")
  const [roledesc, setdesc] = useState("")


  const person_names = ["BRITTO", "BILAL", "ABHISHEK", "DEVADATH", "AKASH", "ADHIL", "VAISHNAV"]

  const role_description = [
    { name: 'BRITTO BINOY', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "", email: "", phone: "", location: "", about: "", color: 'blue' },
    { name: 'MOHAMMED BILAL', resume: "", github: "https://github.com/CyberPsycho123", linked: "https://www.linkedin.com/in/mohammed-bilal-1b9776329/", role: "Aspiring CyberSecurity Engineer", roledesc: "I am an aspiring Cybersecurity Engineer specializing in Application Security, bringing a strong foundational background in Web Development.", email: "bilu02491@gmail.com", phone: "8089355690", location: "Perinthalmana,Kerala", about: "My name is Mohammed Bilal. I’m currently studying Cybersecurity and building practical skills in development. I work with MERN and Django for web applications, and React Native for mobile applications. My first career goal is to start as either a Software Engineer or an Application Security Engineer — ideally in a role where I can build, learn, and grow. Eventually, I want to move deeper into AppSec, especially mobile security, but I’m equally open to software engineering roles right now because both fields help me grow my technical foundation. I’m adaptable, I learn fast, and I’m focused on gaining hands-on experience.In terms of skills, I work with the MERN stack and Django for web development, and I use React Native for mobile app development. I have experience with databases like MongoDB and SQL, and I’ve deployed projects on platforms like Render and Vercel. I’m also learning Cybersecurity, which helps me understand how applications behave from a security perspective. For experience, I’ve built multiple personal projects to improve my skills — for example, web applications with authentication and data handling, and basic mobile applications with React Native. These projects helped me understand real workflows like frontend-backend communication, databases, and deploying applications. My focus right now is to gain industry experience as either a Software Engineer or an AppSec Engineer.", color: 'blueviolet' },
    { name: 'ABHISHEK TV', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "", email: "", phone: "", location: "", about: "", color: 'red' },
    { name: 'MS DEVADATHAN', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "", email: "", phone: "", location: "", about: "", color: 'green' },
    { name: 'AKASH BOBAN', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "", email: "", phone: "", location: "", about: "", color: 'chocolate' },
    { name: 'ADHIL KB', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "", email: "", phone: "", location: "", about: "", color: 'brown' },
    { name: 'VAISHNAV MANOJ', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "", email: "", phone: "", location: "", about: "", color: 'orange' }
  ]

  useEffect(() => {

    for (let i = 0; i < person_names.length; i++) {
      if (person_names[i] == person_name) {
        setname(role_description[i].name)
        setrole(role_description[i].role)
        setdesc(role_description[i].roledesc)
        setlock(role_description[i].location)
        setno(role_description[i].phone)
        setmail(role_description[i].email)
        setabout(role_description[i].about)
        sethub(role_description[i].github)
        setlink(role_description[i].linked)
        setresume(role_description[i].resume)
        setcolor(role_description[i].color)
      }
    }



  }, [pathname])


  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text" style={{ color: textcolor }}>{name}</span>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links */}
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
            <li><a href="#certificates" onClick={() => setMobileMenuOpen(false)}>Certificates</a></li>
            <li><a href="#contact" className="cta-button" style={{ backgroundColor: textcolor }} onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text" style={{ color: textcolor }}>{name}</span>
            </h1>
            <p className="hero-subtitle" style={{ color: textcolor }}>
              {role}
            </p>
            <p className="hero-description">
              {roledesc}
            </p>
            <div className="hero-buttons">
              {resume && <button className="btn btn-primary" style={{ background: textcolor }} onClick={() => {
                const url = `/display/${resume}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}>View My Resume</button>}
            </div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-container">
          <h2 className="section-title" style={{ color: textcolor }}>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              {about}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="projects-container">
          {!!projects.length && (
            <h2 className="section-title" style={{ color: textcolor }}>
              Featured Projects
            </h2>
          )}
          <div className="projects-grid">
            {projects?.map((project) => (
              <div key={project._id} className="project-card">
                <div className="project-image" style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover' }}></div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <a href={project.gitlink} target='_blank' className="project-link" style={{ color: textcolor }}>View Project →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="certificates">
        <div className="certificates-container">
          {!!certificates.length && (
            <h2 className="section-title" style={{ color: textcolor }}>
              Certifications & Achievements
            </h2>
          )}
          <div className="certificates-grid">
            {certificates?.map((cert) => (
              <div key={cert._id} className="certificate-card" onClick={() => window.open(cert.pdf, '_blank', 'noopener,noreferrer')}>
                <div className="certificate-image" style={{ backgroundImage: `url(${cert.image})`, backgroundSize: 'cover' }}>
                </div>
                <div className="certificate-info">
                  <h3>{cert.title}</h3>
                  <p className="issuer">{cert.provider}</p>
                  <p className="date" style={{ color: textcolor }}>{cert.Date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <h2 className="section-title" style={{ color: textcolor }}>Let's Work Together</h2>
          <p className="contact-subtitle">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>{mail}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>+91 {phone_no}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>{location}</p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href={linkedin} target='_blank' className="social-link">LinkedIn</a>
              <a href={github} target='_blank' className="social-link">GitHub</a>
              <a href="#" className="social-link">Portfolio</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 {name.toLowerCase()}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
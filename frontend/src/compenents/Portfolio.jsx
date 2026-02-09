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



  const role_description = [
    { name: 'BRITTO BINOY', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "", email: "", phone: "", location: "", about: "", color: 'blue' },
    { name: 'MOHAMMED BILAL', resume: "", github: "https://github.com/CyberPsycho123", linked: "https://www.linkedin.com/in/mohammed-bilal-1b9776329/", role: "Aspiring CyberSecurity Engineer", roledesc: "I am an aspiring Cybersecurity Engineer specializing in Application Security, bringing a strong foundational background in Web Development.", email: "bilu02491@gmail.com", phone: "8089355690", location: "Perinthalmana,Kerala", about: "My name is Mohammed Bilal. I’m currently studying Cybersecurity and building practical skills in development. I work with MERN and Django for web applications, and React Native for mobile applications. My first career goal is to start as either a Software Engineer or an Application Security Engineer — ideally in a role where I can build, learn, and grow. Eventually, I want to move deeper into AppSec, especially mobile security, but I’m equally open to software engineering roles right now because both fields help me grow my technical foundation. I’m adaptable, I learn fast, and I’m focused on gaining hands-on experience.In terms of skills, I work with the MERN stack and Django for web development, and I use React Native for mobile app development. I have experience with databases like MongoDB and SQL, and I’ve deployed projects on platforms like Render and Vercel. I’m also learning Cybersecurity, which helps me understand how applications behave from a security perspective. For experience, I’ve built multiple personal projects to improve my skills — for example, web applications with authentication and data handling, and basic mobile applications with React Native. These projects helped me understand real workflows like frontend-backend communication, databases, and deploying applications. My focus right now is to gain industry experience as either a Software Engineer or an AppSec Engineer.", color: 'blueviolet' },
    { name: 'ABHISHEK TV', resume: "", github: "#", linked: "https://www.linkedin.com/in/abhishek-t-v-1a0230324/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", role: "Aspiring CyberSecurity Engineer", roledesc: "Applying in Ethical Hacking Skilled in penetration testing to identify security weaknesses and improve system defenses.", email: "abhishekvinayakumar@gmail.com", phone: "6282887474", location: "Thrissur,Kerala", about: "Hi, I’m Abhishek, a student with a strong interest in Cyber security.I’m currently studying B.tech in Cyber security.I enjoy learning new things, working on projects, and improving my skills through hands-on experience. I’m especially interested in Ethical Hacking.Outside of academics, I like Football.I’m always open to learning opportunities, collaborations, and new challenges.", color: 'red' },
    { name: 'MS DEVADATHAN', resume: "", github: "https://github.com/devadathking", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "Specializing Network Security interested in securing networks by monitoring traffic, preventing intrusions, configuring firewalls, and protecting data from unauthorized access.", email: "msdevadathan.cy24@jecc.ac.in", phone: "8921561282", location: "Shoranur,palakkad,kerala", about: "Hello, my name is m s Devadathan I am a 2nd year B.Tech student specializing in Cyber Security. I have a strong interest in understanding how systems and networks are protected from cyber threats. I am currently learning about network security, ethical hacking, and basic programming, and I’m eager to improve my skills through practical projects and hands-on experience.", color: 'green' },
    { name: 'AKASH BOBAN', resume: "", github: "https://github.com/akash45-bit", linked: "https://www.linkedin.com/in/akash-boban-a1ab42314/", role: "Aspiring CyberSecurity Engineer", roledesc: "Specialising in penetration testing to identify security weaknesses and improve system defenses", email: " akashboban10@gmail.com ", phone: "9074539182", location: "Kerala, Thrissur 680751", about: "I am Akash Boban, a B.Tech student at Jyothi Engineering College, specializing in Cybersecurity. I am passionate about technology and digital security and always eager to learn new skills in protecting systems and data", color: 'chocolate' },
    { name: 'ADHIL KB', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "", email: "", phone: "", location: "", about: "", color: 'brown' },
    { name: 'VAISHNAV MANOJ', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "", email: "", phone: "", location: "", about: "", color: 'orange' },
    { name: 'NIDHIN T SUNNY', resume: "", github: "#", linked: "https://www.linkedin.com/in/nidhin-t-sunny-867071332/", role: "Aspiring CyberSecurity Engineer", roledesc: "Specializing Network Security interested in securing networks by monitoring traffic, preventing intrusions, configuring firewalls, and protecting data from unauthorized access", email: "nidhinsunny2006@gmail.com", phone: "9496179212", location: "Thrissur,kerala", about: "Hi, I’m Nidhin T Sunny, a Cybersecurity student passionate about securing digital systems and understanding modern security technologies. I’m focused on learning and building skills to grow as a cybersecurity professional", color: 'indigo' },
    { name: 'KARTHIKA C VALSAN', resume: "", github: "https://github.com/karthikacvalsan", linked: "https://www.linkedin.com/in/karthika-c-669095302", role: "Aspiring CyberSecurity Engineer", roledesc: "Specialising in Cybersecurity Analyst for Monitoring systems, analyzing threats, responding to incidents, and maintaining organizational security policies.", email: "karthikacvalsan412@gmail.com", phone: "9074029201", location: "Palakkad,kerala", about: "I’m , a cybersecurity student who enjoys exploring technology and solving real-world problems. I am passionate about learning how systems work and how to make them more secure and efficient.My interests include programming, system fundamentals, and cybersecurity concepts. I work with tools like Python, C/C++, and Linux while continuously improving my technical and analytical skills through hands-on practice.I believe consistent learning and practical experience are the keys to growth, and I am focused on developing myself into a capable professional ready for future challenges in the tech industry.", color: 'greenyellow' },
    { name: 'ATHUL KRISHNA', resume: "", github: "#", linked: "https://www.linkedin.com/in/athul-krishna-m-b-494169338/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", role: "Aspiring CyberSecurity Engineer", roledesc: "Specialising in penetration testing to identify security weaknesses and improve system defenses", email: "athulkrishnamb.cy24@jecc.ac.in", phone: "7907050975", location: "ATTATHARA, KUNDANNUR P O,680590, THRISSUR, KERALA", about: "Aspiring Cyber Security Engineer and current B.Tech student. I am at a stage in my journey where I am eager to transition from classroom theory to high-impact professional environments. With a focus on engineering secure systems and a relentless drive to stay ahead of emerging threats, I am seeking an opportunity that challenges my technical skills and allows me to contribute to the safety of the global digital infrastructure. Ready to put in the work, adapt quickly, and grow alongside a forward-thinking security team.", color: 'orangered' },
    { name: 'HRIDHYA NANDAN', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "Specialising in penetration testing to identify security weaknesses and improve system defenses", email: "hridhyanandan2006@gmail.com", phone: "6282919104", location: "pattambi, palakkad", about: "I am a passionate Cyber Security student currently pursuing my B.Tech in Cyber Security at jyothi Engineering College. With a strong academic foundation from my Plus Two qualification, I have developed a deep interest in digital security, ethical hacking, and protecting systems from cyber threats.I am driven by curiosity and continuous learning, always working to improve my technical skills in areas such as network security, cyber defense, and secure computing. My goal is to grow into a skilled cyber security professional who contributes to building safe, reliable, and secure digital environments for individuals and organizations.I believe cyber security is not just a career, but a responsibility to protect the digital world.", color: '#FB607F' },
    { name: 'JOYAL GEORGE JOSEPH', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "Specializing Network Security interested in securing networks by monitoring traffic, preventing intrusions, configuring firewalls, and protecting data from unauthorized access.", email: "joyalkodiantharajoseph@gmail.com", phone: "7559915845", location: "Kottayam, Kerala ", about: "JOYAL GEORGE JOSEPH STUDYING IN JYOTHI ENGINEERING COLLEGE CYBERSECURITY ASPIRANTS", color: 'violet' },
    { name: 'ASHIK BENY', resume: "", github: "#", linked: "#", role: "Aspiring CyberSecurity Engineer", roledesc: "Specialising in Cybersecurity Analyst for Monitoring systems, analyzing threats, responding to incidents, and maintaining organizational security policies.", email: "ashikbenny.cy24@jecc.ac.in", phone: "9037279135", location: "Trissur,Kerala", about: "My name is Ashik Benny, and I am a student who is interested in learning new concepts and improving my skills. I am currently pursuing my studies with a focus on subjects like database management systems, operating systems, and computer-related technologies. I enjoy understanding how technology works in real life and how it can solve everyday problems. I consider myself a responsible and motivated student who likes to complete tasks on time and work well with others. Apart from academics, I try to stay curious and open to new ideas, which helps me grow both personally and academical", color: '#FFBF00' },
  ]

  useEffect(() => {
    if (person_name == "BRITTO") {
      setname(role_description[0].name)
      setrole(role_description[0].role)
      setdesc(role_description[0].roledesc)
      setlock(role_description[0].location)
      setno(role_description[0].phone)
      setmail(role_description[0].email)
      setabout(role_description[0].about)
      sethub(role_description[0].github)
      setlink(role_description[0].linked)
      setresume(role_description[0].resume)
      setcolor(role_description[0].color)
    }
    else if (person_name == "BILAL") {
      setname(role_description[1].name)
      setrole(role_description[1].role)
      setdesc(role_description[1].roledesc)
      setlock(role_description[1].location)
      setno(role_description[1].phone)
      setmail(role_description[1].email)
      setabout(role_description[1].about)
      sethub(role_description[1].github)
      setlink(role_description[1].linked)
      setresume(role_description[1].resume)
      setcolor(role_description[1].color)
    }

    else if (person_name == "ABHISHEK") {
      setname(role_description[2].name)
      setrole(role_description[2].role)
      setdesc(role_description[2].roledesc)
      setlock(role_description[2].location)
      setno(role_description[2].phone)
      setmail(role_description[2].email)
      setabout(role_description[2].about)
      sethub(role_description[2].github)
      setlink(role_description[2].linked)
      setresume(role_description[2].resume)
      setcolor(role_description[2].color)
    }

    else if (person_name == "DEVADATH") {
      setname(role_description[3].name)
      setrole(role_description[3].role)
      setdesc(role_description[3].roledesc)
      setlock(role_description[3].location)
      setno(role_description[3].phone)
      setmail(role_description[3].email)
      setabout(role_description[3].about)
      sethub(role_description[3].github)
      setlink(role_description[3].linked)
      setresume(role_description[3].resume)
      setcolor(role_description[3].color)
    }
    else if (person_name == "AKASH") {
      setname(role_description[4].name)
      setrole(role_description[4].role)
      setdesc(role_description[4].roledesc)
      setlock(role_description[4].location)
      setno(role_description[4].phone)
      setmail(role_description[4].email)
      setabout(role_description[4].about)
      sethub(role_description[4].github)
      setlink(role_description[4].linked)
      setresume(role_description[4].resume)
      setcolor(role_description[4].color)
    }
    else if (person_name == "ADHIL") {
      setname(role_description[5].name)
      setrole(role_description[5].role)
      setdesc(role_description[5].roledesc)
      setlock(role_description[5].location)
      setno(role_description[5].phone)
      setmail(role_description[5].email)
      setabout(role_description[5].about)
      sethub(role_description[5].github)
      setlink(role_description[5].linked)
      setresume(role_description[5].resume)
      setcolor(role_description[5].color)
    }
    else if (person_name == "VAISHNAV") {
      setname(role_description[6].name)
      setrole(role_description[6].role)
      setdesc(role_description[6].roledesc)
      setlock(role_description[6].location)
      setno(role_description[6].phone)
      setmail(role_description[6].email)
      setabout(role_description[6].about)
      sethub(role_description[6].github)
      setlink(role_description[6].linked)
      setresume(role_description[6].resume)
      setcolor(role_description[6].color)
    }
    else if (person_name == "NIDHIN") {
      setname(role_description[7].name)
      setrole(role_description[7].role)
      setdesc(role_description[7].roledesc)
      setlock(role_description[7].location)
      setno(role_description[7].phone)
      setmail(role_description[7].email)
      setabout(role_description[7].about)
      sethub(role_description[7].github)
      setlink(role_description[7].linked)
      setresume(role_description[7].resume)
      setcolor(role_description[7].color)
    }
    else if (person_name == "KARTHIKA") {
      setname(role_description[8].name)
      setrole(role_description[8].role)
      setdesc(role_description[8].roledesc)
      setlock(role_description[8].location)
      setno(role_description[8].phone)
      setmail(role_description[8].email)
      setabout(role_description[8].about)
      sethub(role_description[8].github)
      setlink(role_description[8].linked)
      setresume(role_description[8].resume)
      setcolor(role_description[8].color)
    }
    else if (person_name == "ATHUL") {
      setname(role_description[9].name)
      setrole(role_description[9].role)
      setdesc(role_description[9].roledesc)
      setlock(role_description[9].location)
      setno(role_description[9].phone)
      setmail(role_description[9].email)
      setabout(role_description[9].about)
      sethub(role_description[9].github)
      setlink(role_description[9].linked)
      setresume(role_description[9].resume)
      setcolor(role_description[9].color)
    }
    else if (person_name == "HRIDHYA") {
      setname(role_description[10].name)
      setrole(role_description[10].role)
      setdesc(role_description[10].roledesc)
      setlock(role_description[10].location)
      setno(role_description[10].phone)
      setmail(role_description[10].email)
      setabout(role_description[10].about)
      sethub(role_description[10].github)
      setlink(role_description[10].linked)
      setresume(role_description[10].resume)
      setcolor(role_description[10].color)
    }
    else if (person_name == "JOYAL") {
      setname(role_description[11].name)
      setrole(role_description[11].role)
      setdesc(role_description[11].roledesc)
      setlock(role_description[11].location)
      setno(role_description[11].phone)
      setmail(role_description[11].email)
      setabout(role_description[11].about)
      sethub(role_description[11].github)
      setlink(role_description[11].linked)
      setresume(role_description[11].resume)
      setcolor(role_description[11].color)
    }
    else if (person_name == "ASHIK") {
      setname(role_description[12].name)
      setrole(role_description[12].role)
      setdesc(role_description[12].roledesc)
      setlock(role_description[12].location)
      setno(role_description[12].phone)
      setmail(role_description[12].email)
      setabout(role_description[12].about)
      sethub(role_description[12].github)
      setlink(role_description[12].linked)
      setresume(role_description[12].resume)
      setcolor(role_description[12].color)
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
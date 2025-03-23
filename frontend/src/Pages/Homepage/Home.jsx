import React, { useState } from 'react';
import './Home.css';
import { FaMicrophone, FaBook, FaChartLine, FaQuestionCircle } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
   <>
    <nav className="navbar">
      <h1 className="logo">HireReady</h1>
      <ul className="nav-links hide">
        <li><a href="#">Home</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>

    <header className="hero">
      <h2>Prepare Smarter for Job Interviews</h2>
      <p>Experience AI-driven voice interviews, personalized learning, and performance tracking to enhance your interview readiness.</p>
      <button className="cta-button">
        <NavLink to='/user' className="navlink-btn">Get Started</NavLink>
      </button>
    </header>

    <section className="about">
      <h2>About AI-InterviewPro</h2>
      <p>
        AI-InterviewPro is an advanced AI-powered platform that helps job seekers prepare effectively for interviews.
        Our AI-driven voice interviews simulate real-life job interviews and provide instant feedback to enhance
        performance. We offer personalized learning resources tailored to individual strengths and weaknesses,
        along with performance tracking and improvement recommendations.
      </p>
    </section>

    <h2 className="section-title">Our Features</h2>
    <section className="features">
      <div className="feature-card">
        <FaMicrophone className="icon" />
        <h3>AI Mock Interviews</h3>
        <p>Simulate real-world job interviews with AI-powered voice interaction.</p>
        <button><NavLink to='/interview' className="Navlink">Explore</NavLink></button>
      </div>
      <div className="feature-card">
        <FaBook className="icon" />
        <h3>Personalized Learning</h3>
        <p>Get AI-generated study material tailored to your needs.</p>
        <button><NavLink to='/articles' className="Navlink">Explore</NavLink></button>
      </div>
      <div className="feature-card">
        <FaChartLine className="icon" />
        <h3>Practice By Quiz</h3>
        <p>AI based quiz for the practice with topic</p>
        <button><NavLink to='/mock' className="Navlink">Explore</NavLink></button>
      </div>
    </section>

    <section className="faq">
      <h2><FaQuestionCircle /> Frequently Asked Questions</h2>
      <div className="faq-item" onClick={() => toggleFAQ(1)}>
        <h3 className="faq-question">How does AI Mock Interview work?</h3>
        {openFAQ === 1 && <p className="faq-answer">The AI asks interview questions based on your field and experience. It evaluates your responses and provides feedback.</p>}
      </div>
      <div className="faq-item" onClick={() => toggleFAQ(2)}>
        <h3 className="faq-question">Is this platform free?</h3>
        {openFAQ === 2 && <p className="faq-answer">We offer both free and premium plans. The free plan includes basic interview practice, while premium users get advanced features.</p>}
      </div>
      <div className="faq-item" onClick={() => toggleFAQ(3)}>
        <h3 className="faq-question">Can I track my performance?</h3>
        {openFAQ === 3 && <p className="faq-answer">Yes! Our platform tracks your progress and suggests improvements based on past interviews.</p>}
      </div>
    </section>

    <section className="contact">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>

    <footer className="footer">
      <p>&copy; 2025 AI-InterviewPro. All Rights Reserved.</p>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </footer>
   </>
  )
}

export default Home;

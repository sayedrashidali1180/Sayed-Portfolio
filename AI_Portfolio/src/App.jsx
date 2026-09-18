import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'
import SnakeGame from './SnakeGame'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Rashid AI. Ask me about Sayed Rashid Ali's skills, projects, education, certificates, or achievements."
    }
  ])
  const [loading, setLoading] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const sendMessage = async () => {
    if (!message.trim() || loading) return

    const userMessage = message.trim()

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: userMessage
      }
    ])

    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/chat',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            message: userMessage
          })
        }
      )

      if (!response.ok) {
        throw new Error('Server error')
      }

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            data.reply ||
            'Sorry, I could not generate a response.'
        }
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            'Sorry, I could not connect to the AI server. Please make sure the FastAPI server and Ollama are running.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // =====================================================
  // EMAILJS CONTACT FORM
  // =====================================================

  const handleContactSubmit = async (event) => {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)

    const templateParams = {
      user_name: formData.get('name'),
      user_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    }

    try {
      await emailjs.send(
        'service_fpel1io',
        'template_wo1mul8',
        templateParams,
        '0icco0cG0WXV1dZWW'
      )

      alert('Message sent successfully! I will get back to you soon.')
      form.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      alert('Failed to send the message. Please try again.')
    }
  }

  return (
    <div className="portfolio">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar-wrapper">

        <nav className="navbar">

          <a
            href="#home"
            className="logo"
            onClick={closeMenu}
          >
            RASHID
          </a>


          <ul
            className={`nav-links ${
              menuOpen ? 'active' : ''
            }`}
          >

            <li>
              <a
                href="#home"
                onClick={closeMenu}
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#about"
                onClick={closeMenu}
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#skills"
                onClick={closeMenu}
              >
                Skills
              </a>
            </li>

            <li>
              <a
                href="#playground"
                onClick={closeMenu}
              >
                Play
              </a>
            </li>

            <li>
              <a
                href="#projects"
                onClick={closeMenu}
              >
                Projects
              </a>
            </li>

            <li>
              <a
                href="#certificates"
                onClick={closeMenu}
              >
                Certificates
              </a>
            </li>

            <li>
              <a
                href="#contact"
                onClick={closeMenu}
              >
                Contact
              </a>
            </li>

          </ul>


          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

        </nav>

      </header>


      <main>

        {/* =====================================================
            HOME / HERO
        ===================================================== */}

        <section
          id="home"
          className="hero"
        >

          <div className="hero-background-name">
            RASHID
          </div>


          <div className="hero-inner">


            {/* HERO TEXT */}

            <div className="hero-left">

              <div className="hero-label">
                PORTFOLIO 2026
              </div>


              <div className="hero-intro">

                <p className="hero-small-text">
                  HELLO, I'M
                </p>

                <h1>
                  Sayed
                  <br />
                  Rashid Ali
                </h1>

              </div>


              <div className="hero-role">

                <h2>
                  Data Analyst
                  <br />
                  & Full Stack Developer
                </h2>

                <p>
                  Turning data into insights and ideas
                  into practical digital solutions.
                </p>

              </div>


              <div className="hero-buttons">

                <a
                  href="#projects"
                  className="hero-button primary-button"
                >
                  View Projects
                  <span>→</span>
                </a>


                <a
                  href="#contact"
                  className="hero-button secondary-button"
                >
                  Contact Me
                </a>

              </div>

            </div>


            {/* HERO IMAGE */}

            <div className="hero-center">

              <div className="hero-image-glow"></div>

              <img
                src="/photo/rashid-portrait.png"
                alt="Sayed Rashid Ali"
                className="hero-photo"
              />

            </div>


            {/* HERO RIGHT */}

            <div className="hero-right">

              <div className="hero-status">

                <span className="status-circle"></span>

                <span>
                  OPEN TO
                  <br />
                  OPPORTUNITIES
                </span>

              </div>


              <div className="hero-short-info">

                <p>
                  Computer Science
                  <br />
                  & Engineering
                </p>

                <span>
                  Chennai, Tamil Nadu
                </span>

              </div>

            </div>

          </div>


          {/* SOCIAL LINKS */}

          <div className="hero-socials">

            <a
              href="https://www.linkedin.com/in/sayed-rashid-ali-8a3383392/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>


            <a
              href="https://github.com/sayedrashidali1180"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GH
            </a>


            <a
              href="mailto:sayedrashidalicse180@gmail.com"
              aria-label="Email"
            >
              @
            </a>

          </div>


          <a
            href="#about"
            className="scroll-indicator"
          >
            <span></span>
            Scroll Down
          </a>

        </section>



        {/* =====================================================
            ABOUT
        ===================================================== */}

        <section
          id="about"
          className="about-section"
        >

          <div className="about-wrapper">


            {/* LEFT */}

            <div className="about-visual">

              <div className="about-tag">
                ABOUT ME
              </div>


              <div className="about-name-outline">
                ABOUT
              </div>


              <div className="about-image-container">

                <img
                  src="/photo/rashid-portrait.png"
                  alt="Sayed Rashid Ali"
                  className="about-photo"
                />

              </div>

            </div>


            {/* RIGHT */}

            <div className="about-content">

              <h2>
                Full Stack Developer
                <br />
                <span>& Data Analyst</span>
              </h2>


              <p className="about-description">

                I am Sayed Rashid Ali, a Computer Science
                and Engineering student with a strong interest
                in full-stack development and data analytics.

              </p>


              <p className="about-description">

                I work with React, Node.js, Python, SQL,
                PostgreSQL and Power BI to build practical
                web applications and data-driven solutions.

              </p>


              <div className="what-i-do">

                <h3>
                  What I Do
                </h3>


                <div className="what-grid">

                  <div className="what-card">

                    <div className="what-icon">
                      ◫
                    </div>

                    <p>
                      Build full-stack
                      web applications
                    </p>

                  </div>


                  <div className="what-card">

                    <div className="what-icon">
                      ◉
                    </div>

                    <p>
                      Analyze and visualize
                      business data
                    </p>

                  </div>


                  <div className="what-card">

                    <div className="what-icon">
                      &lt;/&gt;
                    </div>

                    <p>
                      Develop REST APIs
                      and backend systems
                    </p>

                  </div>


                  <div className="what-card">

                    <div className="what-icon">
                      ↗
                    </div>

                    <p>
                      Create interactive
                      dashboards
                    </p>

                  </div>

                </div>

              </div>


              {/* STATS */}

              <div className="about-stats">

                <div className="stat-card">

                  <strong>
                    3
                  </strong>

                  <span>
                    Projects Built
                  </span>

                </div>


                <div className="stat-card">

                  <strong>
                    9,994
                  </strong>

                  <span>
                    Sales Records Analyzed
                  </span>

                </div>


                <div className="stat-card">

                  <strong>
                    Top 50
                  </strong>

                  <span>
                    Hackathon Finalist
                  </span>

                </div>

              </div>


              <div className="about-interests">

                <h3>
                  My Interests
                </h3>


                <div className="interest-list">

                  <span>Data Analytics</span>

                  <span>Full Stack Development</span>

                  <span>Business Intelligence</span>

                  <span>Cloud Deployment</span>

                  <span>AI Applications</span>

                </div>

              </div>


              <p className="opportunity-text">

                Open to opportunities in Data Analytics,
                Full Stack Development and Software Development.

              </p>


              <div className="about-actions">

                <a
                  href="/resume/rashid.pdf"
                  download="Sayed_Rashid_Ali_Resume.pdf"
                  className="resume-button"
                >
                  ↓ Download Resume
                </a>


                <a
                  href="/resume/rashid.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-button view-resume-button"
                >
                  View Resume
                </a>

              </div>

            </div>

          </div>

        </section>



        {/* =====================================================
            SKILLS
        ===================================================== */}

        <section
          id="skills"
          className="skills-section"
        >

          <div className="section-heading">

            <span>
              MY TOOLKIT
            </span>

            <h2>
              Technical Skills
            </h2>

            <div className="heading-line"></div>

          </div>


          <div className="skills-wrapper">


            {/* SKILL IMAGE */}

            <div className="skills-image-container">

              <img
                src="/photo/rashid-portrait.png"
                alt="Sayed Rashid Ali"
                className="skills-photo"
              />

              <div className="skills-image-text">
                SKILLS
              </div>

            </div>


            {/* SKILLS CONTENT */}

            <div className="skills-content">


              <div className="skills-top-grid">


                {/* PROGRAMMING */}

                <div className="skills-category">

                  <div className="category-icon">
                    &lt;/&gt;
                  </div>

                  <h3>
                    Programming
                    & Databases
                  </h3>

                  <ul>

                    <li>
                      Python
                    </li>

                    <li>
                      JavaScript
                    </li>

                    <li>
                      SQL
                    </li>

                    <li>
                      MongoDB
                    </li>

                    <li>
                      PostgreSQL
                    </li>

                  </ul>

                </div>


                {/* FRAMEWORKS */}

                <div className="skills-category">

                  <div className="category-icon">
                    ⚙
                  </div>

                  <h3>
                    Frameworks
                    & Libraries
                  </h3>

                  <ul>

                    <li>
                      React.js
                    </li>

                    <li>
                      Node.js
                    </li>

                    <li>
                      Express.js
                    </li>

                    <li>
                      Pandas
                    </li>

                  </ul>

                </div>

              </div>


              {/* TOOLS */}

              <div className="skills-category tools-category">

                <div className="category-icon">
                  ◫
                </div>

                <h3>
                  Tools & Platforms
                </h3>


                <div className="tools-list">

                  <span>Docker</span>

                  <span>Git</span>

                  <span>GitLab</span>

                  <span>Firebase</span>

                  <span>Vercel</span>

                  <span>Render</span>

                  <span>Power BI</span>

                  <span>Socket.io</span>

                </div>

              </div>


              {/* OTHER */}

              <div className="skills-category other-skills-category">

                <div className="category-icon">
                  ↗
                </div>

                <h3>
                  Other Technical Skills
                </h3>


                <div className="other-skills-list">

                  <span>
                    REST APIs
                  </span>

                  <span>
                    Authentication Systems
                  </span>

                  <span>
                    Cloud Integration
                  </span>

                  <span>
                    Data Analysis
                  </span>

                  <span>
                    Dashboard Development
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* =====================================================
            PLAYGROUND / SNAKE GAME
        ===================================================== */}

        <section
          id="playground"
          className="playground-section"
        >

          <div className="section-heading">

            <span>
              TAKE A BREAK
            </span>

            <h2>
              Python Playground
            </h2>

            <div className="heading-line"></div>

          </div>


          <div className="playground-wrapper">

            <SnakeGame />

          </div>

        </section>



        {/* =====================================================
            PROJECTS
        ===================================================== */}

        <section
          id="projects"
          className="projects-section"
        >

          <div className="section-heading">

            <span>
              SELECTED WORK
            </span>

            <h2>
              Projects
            </h2>

            <div className="heading-line"></div>

          </div>


          <div className="projects-grid">


            {/* SALES ANALYTICS */}

            <article className="project-card-new">

              <div className="project-image-new">

                <img
                  src="/photo/sales-dashboard.png"
                  alt="Sales Performance Analytics Dashboard"
                  loading="lazy"
                />

              </div>


              <div className="project-content-new">

                <span className="project-number">
                  01
                </span>


                <h3>
                  Sales Performance Analytics Dashboard
                </h3>


                <p>

                  An end-to-end data analytics project
                  analyzing 9,994 sales records using Python,
                  Pandas, PostgreSQL and Power BI.

                </p>


                <div className="project-tags-new">

                  <span>
                    Python
                  </span>

                  <span>
                    Pandas
                  </span>

                  <span>
                    PostgreSQL
                  </span>

                  <span>
                    Power BI
                  </span>

                </div>


                <a
                  href="/photo/sales-dashboard.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-view-link"
                >
                  View Dashboard →
                </a>

              </div>

            </article>



            {/* CUSTOMER CHURN & RETENTION ANALYTICS */}

            <article className="project-card-new">

              <div className="project-image-new">

                <img
                  src="/photo/customer-churn.png"
                  alt="Customer Churn & Retention Analytics"
                  loading="lazy"
                />

              </div>


              <div className="project-content-new">

                <span className="project-number">
                  02
                </span>


                <h3>
                  Customer Churn & Retention Analytics
                </h3>


                <p>

                  Analyzed a telecom company's customer base
                  (7,043 accounts) to understand why customers
                  leave and where revenue is most at risk,
                  finding a 26.54% churn rate and $139,130.85
                  in monthly revenue at risk.

                </p>


                <div className="project-tags-new">

                  <span>
                    Python
                  </span>

                  <span>
                    Power BI
                  </span>

                  <span>
                    DAX
                  </span>

                  <span>
                    Excel
                  </span>

                </div>


                <a
                  href="/photo/customer-churn.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-view-link"
                >
                  View Dashboard →
                </a>

              </div>

            </article>



            {/* SAHIDEPLOY */}

            <article className="project-card-new">

              <div className="project-image-new">

                <img
                  src="/photo/sahideploy.png"
                  alt="SahiDeploy"
                  loading="lazy"
                />

              </div>


              <div className="project-content-new">

                <span className="project-number">
                  03
                </span>


                <h3>
                  SahiDeploy
                </h3>


                <p>

                  A full-stack cloud deployment platform
                  featuring secure role-based access,
                  automation, real-time monitoring and
                  cloud deployment.

                </p>


                <div className="project-tags-new">

                  <span>
                    React
                  </span>

                  <span>
                    Node.js
                  </span>

                  <span>
                    PostgreSQL
                  </span>

                  <span>
                    Docker
                  </span>

                </div>


                <a
                  href="https://sahideploy.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-view-link"
                >
                  View Project →
                </a>

              </div>

            </article>



            {/* STUDENT LED INITIATIVE */}

            <article className="project-card-new">

              <div className="project-image-new">

                <img
                  src="/photo/student-project.png"
                  alt="Student-Led-Initiative"
                  loading="lazy"
                />

              </div>


              <div className="project-content-new">

                <span className="project-number">
                  04
                </span>


                <h3>
                  Student-Led-Initiative
                </h3>


                <p>

                  A technology-driven web and mobile platform
                  designed to empower students to fundraise for
                  children suffering from blood cancer.

                </p>


                <div className="project-tags-new">

                  <span>
                    Donation Tracking
                  </span>

                  <span>
                    Transparency
                  </span>

                  <span>
                    Dashboards
                  </span>

                </div>


                <a
                  href="https://studentledinitiative-frontend.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-view-link"
                >
                  View Project →
                </a>

              </div>

            </article>

          </div>

        </section>



        {/* =====================================================
            EDUCATION & ACHIEVEMENT
        ===================================================== */}

        <section className="education-section">

          <div className="education-wrapper">


            <div className="education-column">

              <span className="section-mini-title">
                EDUCATION
              </span>


              <h2>
                Academic Background
              </h2>


              <div className="education-card">

                <span>
                  2022 — 2026
                </span>

                <h3>
                  B.E. Computer Science
                  & Engineering
                </h3>

                <p>
                  Sathyabama University
                </p>

                <small>
                  Chennai, Tamil Nadu
                </small>

              </div>


              <div className="education-card">

                <span>
                  2020 — 2022
                </span>

                <h3>
                  Higher Secondary Certificate
                </h3>

                <p>
                  Silli College, Silli
                </p>

              </div>

            </div>


            <div className="achievement-column">

              <span className="section-mini-title">
                ACHIEVEMENT
              </span>


              <h2>
                Hackathon Achievement
              </h2>


              <div className="achievement-card">

                <div className="achievement-number">
                  TOP
                  <strong>50</strong>
                </div>


                <div>

                  <h3>
                    Techxecelerate
                    National Hackathon
                  </h3>

                  <p>
                    BITS Pilani, Hyderabad
                  </p>

                  <span>
                    Qualified through 3 rounds among
                    2,000+ participants nationwide.
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* =====================================================
            CERTIFICATES
        ===================================================== */}

        <section
          id="certificates"
          className="certificates-section"
        >

          <div className="section-heading">

            <span>
              LEARNING & EXPERIENCE
            </span>

            <h2>
              Certificates
            </h2>

            <div className="heading-line"></div>

          </div>


          <div className="certificates-wrapper">


            <article className="certificate-card-new">

              <span className="certificate-number">
                01
              </span>


              <div>

                <span className="certificate-label">
                  FORAGE · JANUARY 2026
                </span>


                <h3>
                  Project Manager Job Simulation
                </h3>


                <p>
                  Completed practical tasks involving
                  KPI development and project dashboard
                  management.
                </p>


                <strong>
                  Forage
                </strong>


                <a
                  href="https://www.theforage.com/completion-certificates/YtWaumzWHmKiqP63y/zSefEeEKvojiQqiaH_YtWaumzWHmKiqP63y_6956072d39ff7eaad93addcc_1767278937384_completion_certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-view-link"
                >
                  View Certificate →
                </a>

              </div>

            </article>



            <article className="certificate-card-new">

              <span className="certificate-number">
                02
              </span>


              <div>

                <span className="certificate-label">
                  DELOITTE · FORAGE · JANUARY 2026
                </span>


                <h3>
                  Data Analytics Job Simulation
                </h3>


                <p>
                  Completed practical tasks related to
                  data analysis and forensic technology.
                </p>


                <strong>
                  Deloitte — Forage
                </strong>


                <a
                  href="https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6956072d39ff7eaad93addcc_1767332831450_completion_certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-view-link"
                >
                  View Certificate →
                </a>

              </div>

            </article>

          </div>

        </section>



        {/* =====================================================
            CONTACT
        ===================================================== */}

        <section
          id="contact"
          className="contact-section-new"
        >

          <div className="contact-wrapper">


            {/* LEFT */}

            <div className="contact-left">

              <span className="contact-label">
                CONTACT ME
              </span>


              <div className="contact-large-text">
                LET'S
                <br />
                TALK
              </div>


              <h2>
                Let's Build Something Meaningful
              </h2>


              <p>
                Have a project, opportunity or idea in mind?
                I'd love to hear from you.
              </p>


              <div className="contact-links-new">


                <a
                  href="mailto:sayedrashidalicse180@gmail.com"
                  className="contact-link-card"
                >

                  <div className="contact-link-icon">
                    @
                  </div>


                  <div>

                    <span>
                      EMAIL
                    </span>

                    <h3>
                      Say Hello
                    </h3>

                    <p>
                      Contact me directly
                    </p>

                  </div>

                </a>



                <a
                  href="https://www.linkedin.com/in/sayed-rashid-ali-8a3383392/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-card"
                >

                  <div className="contact-link-icon">
                    in
                  </div>


                  <div>

                    <span>
                      LINKEDIN
                    </span>

                    <h3>
                      Connect
                    </h3>

                    <p>
                      Professional Profile
                    </p>

                  </div>

                </a>



                <a
                  href="https://github.com/sayedrashidali1180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-card"
                >

                  <div className="contact-link-icon">
                    &lt;/&gt;
                  </div>


                  <div>

                    <span>
                      GITHUB
                    </span>

                    <h3>
                      Explore Code
                    </h3>

                    <p>
                      Projects & Repositories
                    </p>

                  </div>

                </a>

              </div>


              <div className="availability-contact">

                <span></span>

                Available for opportunities

              </div>

            </div>


            {/* RIGHT CONTACT FORM */}

            <form
              className="contact-form"
              onSubmit={handleContactSubmit}
            >

              <label>
                Your Name

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />

              </label>


              <label>
                Email Address

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />

              </label>


              <label>
                Subject

                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  required
                />

              </label>


              <label>
                Message

                <textarea
                  name="message"
                  placeholder="Write your message..."
                  required
                ></textarea>

              </label>


              <button
                type="submit"
                className="send-message-button"
              >
                Send Message
                <span>→</span>
              </button>

            </form>

          </div>

        </section>

      </main>



      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <div className="footer-wrapper">

          <p>
            © 2026 Sayed Rashid Ali.
            All rights reserved.
          </p>


          <div className="footer-links">

            <a href="#home">
              Home
            </a>

            <a href="#about">
              About
            </a>

            <a href="#skills">
              Skills
            </a>

            <a href="#projects">
              Projects
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>

        </div>

      </footer>



      {/* =====================================================
          AI PORTFOLIO ASSISTANT
      ===================================================== */}

      <div className="ai-chat">


        {chatOpen && (

          <div className="ai-chat-window">


            {/* HEADER */}

            <div className="ai-chat-header">

              <div>

                <strong>
                  Rashid AI
                </strong>

                <span>
                  Portfolio Assistant
                </span>

              </div>


              <button
                className="ai-close"
                onClick={() =>
                  setChatOpen(false)
                }
                aria-label="Close AI assistant"
              >
                ✕
              </button>

            </div>


            {/* MESSAGES */}

            <div className="ai-chat-messages">

              {messages.map(
                (msg, index) => (

                  <div
                    key={index}
                    className={`ai-message ${msg.role}`}
                  >
                    {msg.text}
                  </div>

                )
              )}


              {loading && (

                <div className="ai-message assistant thinking-message">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              )}

            </div>


            {/* INPUT */}

            <div className="ai-chat-input">

              <input
                type="text"
                placeholder="Ask about my portfolio..."
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={(event) => {

                  if (
                    event.key === 'Enter'
                  ) {
                    sendMessage()
                  }

                }}
                disabled={loading}
              />


              <button
                onClick={sendMessage}
                disabled={
                  loading ||
                  !message.trim()
                }
                aria-label="Send message"
              >
                ➤
              </button>

            </div>

          </div>

        )}


        {/* AI BUTTON */}

        <button
          className="ai-chat-button"
          onClick={() =>
            setChatOpen(!chatOpen)
          }
          aria-label="Open AI Portfolio Assistant"
        >

          {chatOpen ? '✕' : 'AI'}

        </button>

      </div>

    </div>
  )
}

export default App
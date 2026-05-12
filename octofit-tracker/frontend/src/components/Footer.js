import React from 'react';

function Footer() {
  const techStack = {
    frontend: [
      { name: 'React', version: '19.2.6' },
      { name: 'Bootstrap', version: '5.3.8' },
      { name: 'React Router DOM', version: '7.15.0' },
    ],
    backend: [
      { name: 'Django', version: '4.1.7' },
      { name: 'Django REST Framework', version: '3.14.0' },
      { name: 'MongoDB', version: 'via Djongo' },
      { name: 'Python', version: '3.x' },
    ],
    tools: [
      { name: 'Git', description: 'Version control' },
      { name: 'GitHub', description: 'Repository hosting' },
      { name: 'npm', description: 'Package management' },
    ],
  };

  return (
    <footer className="octo-footer mt-5 mt-lg-6 py-5 border-top">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="octo-footer-section">
              <h3 className="h5 fw-semibold mb-3">Frontend Stack</h3>
              <div className="tech-list">
                {techStack.frontend.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <span className="tech-name">{tech.name}</span>
                    <span className="tech-version">{tech.version}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="octo-footer-section">
              <h3 className="h5 fw-semibold mb-3">Backend Stack</h3>
              <div className="tech-list">
                {techStack.backend.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <span className="tech-name">{tech.name}</span>
                    <span className="tech-version">{tech.version}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="octo-footer-section">
              <h3 className="h5 fw-semibold mb-3">Tools & Services</h3>
              <div className="tech-list">
                {techStack.tools.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <span className="tech-name">{tech.name}</span>
                    <span className="tech-description">{tech.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <p className="text-secondary small mb-0">
              © 2026 OctoFit Tracker. Built with React, Bootstrap, Django, and MongoDB.
            </p>
          </div>
          <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
            <p className="text-secondary small mb-0">
              A modern fitness tracking dashboard for teams and individuals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

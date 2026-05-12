import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  const sections = [
    {
      title: 'Users',
      description: 'Manage athlete profiles and reach them quickly with linked contact details.',
      path: '/users',
      buttonLabel: 'Open users',
    },
    {
      title: 'Teams',
      description: 'Review team rosters and track collaboration across shared fitness goals.',
      path: '/teams',
      buttonLabel: 'Open teams',
    },
    {
      title: 'Activities',
      description: 'Inspect recent activity logs using the same table and modal experience.',
      path: '/activities',
      buttonLabel: 'Open activities',
    },
    {
      title: 'Leaderboard',
      description: 'See who is leading the competition and compare scores with one glance.',
      path: '/leaderboard',
      buttonLabel: 'Open leaderboard',
    },
    {
      title: 'Workouts',
      description: 'Explore workout suggestions and training plans in a consistent layout.',
      path: '/workouts',
      buttonLabel: 'Open workouts',
    },
  ];

  return (
    <main className="octo-home container py-4 py-lg-5">
      <section className="card octo-hero border-0 shadow-sm overflow-hidden">
        <div className="card-body p-4 p-lg-5">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-7">
              <span className="badge rounded-pill text-bg-light text-primary mb-3">OctoFit Tracker</span>
              <h1 className="display-4 fw-semibold mb-3">A cleaner Bootstrap dashboard for fitness operations.</h1>
              <p className="lead text-white-50 mb-4">
                Track users, teams, activities, leaderboards, and workouts with a consistent navigation system,
                card layout, form controls, table structure, and modal details flow.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <NavLink className="btn btn-light btn-lg" to="/activities">
                  Explore activity data
                </NavLink>
                <NavLink className="btn btn-outline-light btn-lg" to="/leaderboard">
                  View standings
                </NavLink>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="card octo-hero-panel border-0 shadow-lg">
                <div className="card-body p-4">
                  <h2 className="h4 mb-3">What changed</h2>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">Bootstrap navbar and navigation links</li>
                    <li className="list-group-item px-0">Shared form, card, table, and modal pattern</li>
                    <li className="list-group-item px-0">Consistent row actions and endpoint links</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 mt-lg-5">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <div>
            <h2 className="h1 mb-1">Tracker sections</h2>
            <p className="text-secondary mb-0">Every area now uses the same Bootstrap visual language.</p>
          </div>
          <NavLink className="btn btn-outline-primary" to="/users">
            Start with users
          </NavLink>
        </div>
        <div className="row g-4">
          {sections.map((section) => (
            <div className="col-12 col-md-6 col-xl-4" key={section.path}>
              <div className="card h-100 octo-section-card border-0 shadow-sm">
                <div className="card-body p-4 d-flex flex-column">
                  <h3 className="h4 mb-3">{section.title}</h3>
                  <p className="text-secondary flex-grow-1">{section.description}</p>
                  <NavLink className="btn btn-primary mt-2 align-self-start" to={section.path}>
                    {section.buttonLabel}
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function App() {
  const navClassName = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
  const logoSrc = `${process.env.PUBLIC_URL}/octofitapp-small.png`;

  return (
    <div className="octo-app-shell">
      <nav className="navbar navbar-expand-lg octo-navbar py-3">
        <div className="container d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-start align-items-lg-center">
          <NavLink className="navbar-brand fw-semibold fs-3 d-inline-flex align-items-center gap-3" to="/">
            <img className="octo-brand-logo" src={logoSrc} alt="OctoFit Tracker logo" />
            <span className="octo-brand-text">
              <span className="d-block">OctoFit Tracker</span>
              <small className="octo-brand-tagline">Fitness tracking command center</small>
            </span>
          </NavLink>
          <div className="navbar-nav ms-lg-auto flex-row flex-wrap gap-2 gap-lg-1">
            <NavLink className={navClassName} to="/users">
              Users
            </NavLink>
            <NavLink className={navClassName} to="/teams">
              Teams
            </NavLink>
            <NavLink className={navClassName} to="/activities">
              Activities
            </NavLink>
            <NavLink className={navClassName} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={navClassName} to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;

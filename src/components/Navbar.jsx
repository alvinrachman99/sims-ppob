import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/website_assets/Logo.png'

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={logo}></img> <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>SIMS PPOB</span>
          </Link>
          
          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/topup" style={
                  ({isActive}) => ({
                    color: isActive ? 'red' : '',
                    fontWeight: 600,
                  })
                }>
                  Top Up
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/transaction" style={
                  ({isActive}) => ({
                    color: isActive ? 'red' : '',
                    fontWeight: 600,
                  })
                }>
                  Transaction
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/akun" style={
                  ({isActive}) => ({
                    color: isActive ? 'red' : '',
                    fontWeight: 600,
                  })
                }>
                  Akun
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

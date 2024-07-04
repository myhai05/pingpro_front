import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Auth/logout';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#f8f8f8'
};

const navStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  gap: '15px'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333'
};

const logoutContainerStyle = {
  marginLeft: 'auto'
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Mon Application</h1>
      <nav>
        <ul style={navStyle}>
          <li><Link to="/" style={linkStyle}>Accueil</Link></li>
          <li><Link to="/offer-form" style={linkStyle}>Nouvelle offre</Link></li>
          <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
        </ul>
      </nav>
      <div style={logoutContainerStyle}>
        <Logout />
      </div>
    </header>
  );
};

export default Header;
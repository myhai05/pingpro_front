import React from 'react';
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
          <li><a href="/" style={linkStyle}>Accueil</a></li>
          <li><a href="/about" style={linkStyle}>À Propos</a></li>
          <li><a href="/contact" style={linkStyle}>Contact</a></li>
        </ul>
      </nav>
      <div style={logoutContainerStyle}>
        <Logout />
      </div>
    </header>
  );
};

export default Header;
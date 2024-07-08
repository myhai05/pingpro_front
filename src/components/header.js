import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Context/authContext';
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
  const { user } = useContext(AuthContext);  // Utiliser le contexte pour obtenir l'utilisateur

  return (
    <header style={headerStyle}>
      <Link to={user ? "/private" : "/"} style={{ ...linkStyle, fontSize: '24px', fontWeight: 'bold' }}>
        PingPro
      </Link>
      <nav>
        <ul style={navStyle}>
          {user ? (
            <>
              {user.role === 'admin' && (
                <li><Link to="/offer-form" style={linkStyle}>Nouvelle offre</Link></li>
              )}
              <li><Link to="/private" style={linkStyle}>Espace privé</Link></li>
              <li><Link to="/upload-form" style={linkStyle}>Poster</Link></li>
              <div style={logoutContainerStyle}>
                <Logout />
              </div>
            </>
          ) : (
            <>
              <li><Link to="/login" style={linkStyle}>Se connecter</Link></li>
              <li><Link to="/register" style={linkStyle}>S'inscrire</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Context/authContext';
import Logout from './Auth/logout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  const { user } = useContext(AuthContext); // Utiliser le contexte pour obtenir l'utilisateur

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#B227C2' }}>
      <Container style={{ backgroundColor: '#86398F' }}>
        <Navbar.Brand as={Link} to={user ? "/user-account" : "/"} style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
          PingPro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/dashboard" style={{ color: 'white' }}>Dashboard</Nav.Link>
                )}
                <Nav.Link as={Link} to="/private" style={{ color: 'white' }}>Espace privé</Nav.Link>
                <Nav.Link as={Link} to="/upload-form" style={{ color: 'white' }}>Transmettre une vidéo</Nav.Link>
                <Nav.Link as={Link} to="/user-account" style={{ color: 'white' }}>Mon compte</Nav.Link>
              </>
            ) : null}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <Nav.Link as="div" style={{ color: 'white' }}>
                <Logout />
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Se connecter</Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: 'white' }}>S'inscrire</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;




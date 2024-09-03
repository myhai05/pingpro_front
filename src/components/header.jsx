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
    <Navbar expand="sm" style={{ backgroundColor: '#B227C2' }}>
      <Container className="d-flex align-items-center rounded-2 p-3 " style={{ backgroundColor: '#86398F', height: '80%' }}>
        <Navbar.Brand as={Link} to={"/"} style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
          PingPro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ?
              <>
                {user.role === 'admin' ?
                  <>
                    <Nav.Link as={Link} to="/dashboard" style={{ color: 'white' }}>Admin</Nav.Link>
                    <Logout />
                  </>
                  :
                  <>
                    <Nav.Link as={Link} to="/private" style={{ color: 'white' }}>Espace privé</Nav.Link>
                    <Nav.Link as={Link} to="/upload-form" style={{ color: 'white' }}>Transmettre une vidéo</Nav.Link>
                    <Logout />
                  </>
                }
              </>
              :
              <>
                <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Se connecter</Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: 'white' }}>S'inscrire</Nav.Link>
              </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;




import React, { useState } from 'react';
import UsersList from './usersList'; 
import OfferList from './offerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import NotifiedUsers from './notifitedUsers';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(<OfferList />);

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <Row className="flex-grow-1">
        <Col xs={12} md={3} className="sidebar">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab(<OfferList />)}
              >
                Offres
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab(<UsersList />)}
              >
                Liste de utilisateurs
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab(<NotifiedUsers />)}
              >
                Notifications
              </button>
            </li>
          </ul>
        </Col>
        <Col  xs={12} md={9} className="content">
          {activeTab}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;


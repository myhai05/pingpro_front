import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const OfferList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/offers/get-offers`);
        setOffers(response.data);
      } catch (err) {
        console.log('Failed to fetch offers', err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div >
      {offers.map((offer) => (
        <Card className="post-cards-container">
          <Card.Title>{offer.title}</Card.Title>
          <Card.Text>{offer.description}</Card.Text>
          <Card.Text>{offer.price}</Card.Text>
          <Button variant="primary">Supprimer</Button>
        </Card>
      ))}
      <Link to="/offer-form" className="linkStyle">Nouvelle offre</Link>
    </div>
  );
};

export default OfferList;

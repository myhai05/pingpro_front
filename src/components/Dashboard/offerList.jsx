import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import { Link } from 'react-router-dom';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/offers/get-offers`);
        setOffers(response.data);
      } catch (err) {
        setError('Failed to fetch offers');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Handle different states
  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = (
      <ul>
        {offers.map((offer) => (
          <li key={offer._id}>{offer.title}</li> // Adaptez à vos données
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2>Offers</h2>
      <Link to="/offer-form" className="linkStyle">Nouvelle offre</Link>
      {content}
    </div>
  );
};

export default OfferList;

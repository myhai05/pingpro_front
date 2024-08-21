import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const OfferFetcher = ({ children }) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/offers/get-offers`);
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  // Clone and pass the offers prop to children
  return React.Children.map(children, child =>
    React.cloneElement(child, { offers })
  );
};

OfferFetcher.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OfferFetcher;

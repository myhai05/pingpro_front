import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageContainer from '../Display/imageContainer';
import { AuthContext } from '../Context/authContext';

const OfferFetcher = () => {
  const [offers, setOffers] = useState([]);

  const { user } = useContext(AuthContext); // Accédez à l'état d'authentification 

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

  return (
    <Container>
      <ImageContainer />
      <h2 style={{ color: '#0D0D0D' }}>Nos offres :</h2>
      <div className="row">
        {offers.map((offer) => (
          <div key={offer._id} className="col-md-4 mb-3">
            <Link to={user ? "/offers" : "/login"} style={{ textDecoration: 'none' }}> {/* Condition pour le lien */}
              <div className="card shadow-sm h-100" style={{ backgroundColor: '#FF820D' }}>
                <div className="card-header" style={{ backgroundColor: '#FF820D' }}>
                  <h5 className="card-title" style={{ color: '#0D0D0D' }}>{offer.title}</h5>
                </div>
                <div className="card-body text-secondary" style={{ color: '#0D0D0D' }}>
                  <p className="card-text" style={{ color: '#0D0D0D' }}>{offer.description}</p>
                  <p className="card-text" style={{ color: '#0D0D0D' }}>Prix : {offer.price} €</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default OfferFetcher;

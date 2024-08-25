import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageContainer from '../components/Display/imageContainer';
import PropTypes from 'prop-types';

const Home = ({ offers }) => {
  if (!Array.isArray(offers) || offers.length === 0) {
    return <p>No offers available.</p>;
  }

  return (
    <Container>
      <ImageContainer />
      <h2 style={{ color: '#0D0D0D' }}>Nos offres :</h2>
      <div className="row">
        {offers.map((offer) => (
          <div key={offer._id} className="col-md-4 mb-3">
            <Link to="/login" style={{ textDecoration: 'none' }}>
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

Home.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Home;

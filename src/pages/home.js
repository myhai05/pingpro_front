import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';


const Home = ({ offers }) => {
  return (
    <div>
      {/* Affichage des offres */}
      <h2>Offres disponibles :</h2>
      <div className="offer-list">
        {offers.map((offer) => (
          <Link key={offer._id} to="/login">
            <div className="offer-card">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <p>Prix : {offer.price} €</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;


  
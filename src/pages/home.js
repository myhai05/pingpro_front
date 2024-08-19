import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'; // Importation du container Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageContainer from '../components/Display/imageContainer';

const Home = ({ offers }) => {
  return (
    <Container> {/* Utilisation du container Bootstrap */}
      <ImageContainer />
      <h2 style={{ color: '#0D0D0D' }}>Nos offres :</h2> {/* Couleur du texte */}
      <div className="row">
        {offers.map((offer) => (
          <div key={offer._id} className="col-md-4 mb-3">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <div className="card shadow-sm h-100" style={{ backgroundColor: '#FF820D' }}> {/* Fond orange */}
                <div className="card-header" style={{ backgroundColor: '#FF820D' }}> {/* Fond orange */}
                  <h5 className="card-title" style={{ color: '#0D0D0D' }}>{offer.title}</h5> {/* Couleur du texte */}
                </div>
                <div className="card-body text-secondary" style={{ color: '#0D0D0D' }}> {/* Couleur du texte */}
                  <p className="card-text" style={{ color: '#0D0D0D' }} >{offer.description}</p>
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

export default Home;





  
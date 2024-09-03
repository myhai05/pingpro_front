import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Assurez-vous d'importer votre fichier CSS

function ImageContainer() {
  return (
    <div className="container-fluid text-center bg-light" style={{ position: 'relative' }}>
      <img
        src="../../sport-6923973_1920.jpg"
        alt="tennis_de_table"
        className="img-fluid rounded"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="overlay-text-container position-absolute top-50 start-50 translate-middle">
        <div className="overlay-text">
          "Amenez votre jeu à un niveau supérieur!"
        </div>
      </div>
    </div>
  );
}

export default ImageContainer;

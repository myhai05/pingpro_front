import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageContainer() {
  return (
    <div className="container-fluid text-center bg-light" style={{ position: 'relative' }}>
      <img
        src="../../sport-6923973_1920.jpg"
        alt="tennis_de_table"
        className="img-fluid rounded"
        style={{ width: '100%', height: 'auto' }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        "Amenez votre jeu à un niveau supérieur!"
      </div>
    </div>
  );
}

export default ImageContainer;


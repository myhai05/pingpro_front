import React, { useState } from 'react';
import axios from 'axios';
import './addOfferForm.css'; // Import the CSS file

const AddOfferForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [validityMonths, setValidityMonths] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/offers/add-offer`,
        { title, description, price, validityMonths },
        {
          withCredentials: true // Include cookies in the request
        }
      );

      if (response.status === 200) {
        alert('Offre ajoutée avec succès');
        setTitle('');
        setDescription('');
        setPrice('');
        setValidityMonths('');
      } else {
        alert('Erreur lors de l\'ajout de l\'offre');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'offre', error);
      alert('Erreur lors de l\'ajout de l\'offre');
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter une Nouvelle Offre</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre de l'offre</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description de l'offre</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="validityMonths">Durée de validité (en mois)</label>
          <input
            type="number"
            id="validityMonths"
            name="validityMonths"
            value={validityMonths}
            onChange={(e) => setValidityMonths(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Ajouter l'Offre</button>
        </div>
      </form>
    </div>
  );
};

export default AddOfferForm;


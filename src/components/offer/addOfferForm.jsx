import React, { useState } from 'react';
import axios from 'axios';

const AddOfferForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
    //const tokenValue = token ? token.split('=')[1] : '';

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/add-offer`,
        { title, description, price },
        {
            withCredentials: true // Cela permet d'inclure les cookies dans la requête
          }
      );

      if (response.status === 200) {
        alert('Offre ajoutée avec succès');
        setTitle('');
        setDescription('');
        setPrice('');
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
          <button type="submit">Ajouter l'Offre</button>
        </div>
      </form>
    </div>
  );
};

export default AddOfferForm;
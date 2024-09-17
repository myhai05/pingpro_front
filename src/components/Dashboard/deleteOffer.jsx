import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import PropTypes from 'prop-types';

const DeleteOffer = ({ offerId, onDelete }) => {
  
    const deleteOffer = async () => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}api/offers/delete-offer/${offerId}`);
        onDelete();
      } catch (error) {
        console.log('Erreure pendant la suppression: ',error);
      };
    };

  return (
    <Button onClick={deleteOffer} className='w-auto'>Supprimer</Button>
  )
}

// Validation des props avec PropTypes
DeleteOffer.propTypes = {
  offerId: PropTypes.string.isRequired, // offerId doit être une chaîne de caractères et est requis
  onDelete: PropTypes.func.isRequired,  // onDelete doit être une fonction et est requis
};

export default DeleteOffer;

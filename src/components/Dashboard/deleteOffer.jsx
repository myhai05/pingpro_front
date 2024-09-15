import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';


const DeleteOffer = ({ offerId, onDelete }) => {
  
    const deleteOffer = async () => {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}api/offers/delete-offer/${offerId}`);
        onDelete();
      } catch (error) {
        console.log('Erreure pendant la suppression: ',error);
      };
    };

  return (
    <Button onClick={deleteOffer} className='w-auto'>Supprimer</Button>
  )
}

export default DeleteOffer;

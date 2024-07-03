import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importer Axios

const OfferFetcher = ({ children }) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}api/offers/get-offers`, 
            {
          withCredentials: true, // Pour inclure les cookies dans la requête
        });
        if (response.status === 200) {
          setOffers(response.data); // Met à jour l'état des offres avec les données reçues depuis le backend
        } else {
          console.error('Erreur lors de la récupération des offres:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
      }
    };

    fetchOffers();
  }, []); // Effectue la requête une seule fois au chargement du composant

  // Rendre les enfants (composant Home) avec les offres récupérées comme props
  return React.cloneElement(children, { offers });
};

export default OfferFetcher;

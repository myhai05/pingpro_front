import axios from 'axios';

export const creditDeduct = async (userId, credits) => {
    try {
      // Déduire un crédit avant d'envoyer la requête
      const updatedCredits = credits - 1;
  
      await axios.post(`${process.env.REACT_APP_API_URL}api/deduct-credit`, {
        userId: userId,
        credits: updatedCredits, // Utilisez la valeur mise à jour ici
      });
    } catch (err) {
      console.log(err);
    }
  };
  


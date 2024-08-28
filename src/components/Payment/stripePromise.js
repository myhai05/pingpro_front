import React, { useState, useContext} from "react";
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";



const stripePromise = loadStripe('pk_test_51PbH9pLLtIydrNlAxa7LnYkDXw0FudnSTRIEsdVpdktSONB1ktdwDpQCMQlmowzIGU9kePqWVlFxcMMOywrDJDLP00hOszgx7C'); // Remplacez par votre clé publique Stripe

const Payment = ({ offers, onPaymentSuccess }) => {

  
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCheckout = async () => {
    if (!selectedOffer) {
      alert("Veuillez sélectionner une offre.");
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/payment/create-checkout-session`, { amount: selectedOffer.price * 100,  offerId: selectedOffer._id, userId: user.userId });
       console.log(user);
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error('Erreur lors de la redirection vers Checkout:', error);
      } else {
        // Mettre à jour l'état de l'utilisateur après le paiement réussi
        setUser({ username: 'exampleUser', email: 'example@example.com' }); // Exemple de mise à jour de l'utilisateur
        navigate('/private'); // Rediriger vers la page privée après le paiement
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session Checkout:', error);
    } finally {
      setLoading(false);
    }
  };
  
    return (
      <div>
        <h3>Choisissez une offre</h3>
        <ul>
          {offers.map((offer) => (
            <div key={offer.id} className="col-md-4 mb-3">
              <button onClick={() => setSelectedOffer(offer)}>{offer.title} - ${offer.price}</button>
              </div> 
          ))}
        </ul>
        {selectedOffer && (
          <div>
          <p>Offre sélectionnée: {selectedOffer.title} - ${selectedOffer.price}</p>
          <button onClick={handleCheckout} disabled={loading}>
            {loading ? 'Chargement...' : 'Payer avec Stripe Checkout'}
          </button>
        </div>
        )}
      </div>
    );
  };
  
  export default Payment;
/*
   */
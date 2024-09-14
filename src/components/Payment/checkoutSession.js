import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PbH9pLLtIydrNlAxa7LnYkDXw0FudnSTRIEsdVpdktSONB1ktdwDpQCMQlmowzIGU9kePqWVlFxcMMOywrDJDLP00hOszgx7C'); // Remplacez par votre clé publique Stripe

export const handleCheckout = async (offer, user) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/payment/create-checkout-session`, {
      amount: offer.price * 100,
      offerId: offer._id,
      userId: user.userId
    });

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (error) {
      console.error('Erreur lors de la redirection vers Checkout:', error);
    }
  } catch (error) {
    console.error('Erreur lors de la création de la session Checkout:', error);
  }
};

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';


const NotificationButton = () => {
    const { user, setUser } = useContext(AuthContext);
    const userId = user ? user.userId : null;

    const [credits, setCredits] = useState(0);

    useEffect(() => {

        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/${user.userId}`);
                setCredits(response.data.credits);
                console.log(credits);
            } catch (error) {
                console.error('Error fetching credits:', error);
            }
        };

        if (user) {
            fetchUserInfo();
        }
    }, [user]);

    const sendNotification = async () => {
        const confirmSend = window.confirm("Are you sure you want to send a notification? This will cost you 1 credit.");

        if (confirmSend && credits > 0) {
            try {
                // Envoyer la notification
                const response = await axios.post(`${process.env.REACT_APP_API_URL}api/post/send-notification`, {
                    userId,
                });

                console.log(response.data);

                // Déduire un crédit après confirmation

                const newCredits = credits - 1;
                setCredits(newCredits);

                // Mettre à jour le backend avec le nouveau solde
                await axios.post(`${process.env.REACT_APP_API_URL}api/deduct-credit`, {
                    userId: user.userId,
                    credits: newCredits,
                });

            } catch (error) {
                console.error('Error sending notification:', error);
            }
        }
    };

    return (
        <button onClick={sendNotification} disabled={!user || credits <= 0}>
            Send Notification
        </button>
    );
};

export default NotificationButton;

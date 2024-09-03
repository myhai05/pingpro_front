import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import Button from 'react-bootstrap/Button';
import { creditDeduct } from './creditDeduct';
import { fetchUserInfos } from '../User/fetchUserInfos';


const NotificationButton = () => {
    const { user } = useContext(AuthContext);
    const userId = user.userId;
    const [credits, setCredits] = useState(0);

    useEffect(() => {
        const userInfo = async () => {
            try {
                const response = await fetchUserInfos(user.userId);
                setCredits(response.credits);
            } catch (error) {
                console.log(error);
            }
        }
        userInfo();
    }, [user]);

    const sendNotification = async () => {
        const confirmSend = window.confirm("L'envoi d'une notification va vous couter 1 credit!");

        if (confirmSend && credits > 0) {
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}api/post/send-notification`, {
                    userId,
                });
                await creditDeduct(userId, credits);
                setCredits(credits - 1);
            } catch (error) {
                console.error('Error sending notification:', error);
            }
        }
    };

    return (
        <Button variant="primary" onClick={sendNotification} disabled={credits <= 0}>
            Notifier
        </Button>
    );
};

export default NotificationButton;

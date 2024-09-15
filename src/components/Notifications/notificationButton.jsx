import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/authContext';
import Button from 'react-bootstrap/Button';
import { creditDeduct } from './creditDeduct';
import { fetchUserInfos } from '../User/fetchUserInfos';
import { io } from 'socket.io-client';



const NotificationButton = () => {
    const { user } = useContext(AuthContext);
    const userId = user.userId;
    const [credits, setCredits] = useState(0);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize socket connection
        const socketInstance = io(process.env.REACT_APP_API_URL, { withCredentials: false });
        setSocket(socketInstance);
        // Clean up on component unmount
        return () => { if (socketInstance) { socketInstance.disconnect(); }
        };
    }, []);

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
    }, [user.userId]);

    const sendNotification = async () => {
        const confirmSend = window.confirm("L'envoi d'une notification va vous coûter 1 crédit!");

        if (confirmSend && credits > 0 && socket) {
            try {
                socket.emit('notification', { userId });
                await creditDeduct(userId, credits);
                setCredits(credits - 1);
            } catch (error) {
                console.error('Error sending notification:', error);
            }
        }
    };

    return (
        <>  <Button className='w-auto m-2' variant="warning" onClick={sendNotification} disabled={credits <= 0}> Notifier </Button>
            <p>Vos crédits: {credits}</p>
        </>
    );
};

export default NotificationButton;

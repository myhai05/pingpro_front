import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL);

    socket.current.on('notification', (data) => {
        console.log('Notification received:', data); // Visualiser les données reçues
      setNotifications((prevNotifications) => [...prevNotifications, data.userId]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((userId, index) => (
          <li key={index}>User {userId} sent a notification</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
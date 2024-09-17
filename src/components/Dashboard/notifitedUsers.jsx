import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import VideosList from '../Videos/videosList';
import io from 'socket.io-client';


const NotifitedUsers = () => {
  const [users, setUsers] = useState([]);
  const [showNotifiedUsers, setShowNotifiedUsers] = useState(true);
  const [userId, setUserId] = useState(null);

useEffect(() => {
  const socketInstance = io(process.env.REACT_APP_API_URL, { withCredentials: true, transports: ['websocket'] });

  socketInstance.on('notifications', (data) => {
    setUsers(data);
    socketInstance.emit('notifications_received');
  });
  return () => { if (socketInstance) { socketInstance.disconnect(); }
};
}, []);

    const onSelectUser = (userId) => {
      setUserId(userId);
      setShowNotifiedUsers(false);
    }
    const onHandleBack = () => {
      setShowNotifiedUsers(true);
    }

    return (
      <div>
        <h3>Nouvelles notifications</h3>
        {showNotifiedUsers ? (
          users.map((userId) => (
            <button
              key={userId.data.userId}
              type="button"
              onClick={() => onSelectUser(userId.data.userId)}
              style={{ all: 'unset', cursor: 'pointer' }}
            >
              User {userId.data.userId}
            </button>
          ))
        ) : (
          <VideosList userId={userId} onBack={onHandleBack} />
        )}
      </div>
    );
  };
    NotifitedUsers.propTypes = {
      onSelectUser: PropTypes.func.isRequired,  // onSelectUser doit être une fonction et est requis
    };


    export default NotifitedUsers;
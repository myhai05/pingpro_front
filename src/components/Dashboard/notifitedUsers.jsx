import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import VideosList from './videosList';


const NotifitedUsers = () => {
  const [users, setUsers] = useState([]);
  const [showNotifiedUsers, setShowNotifiedUsers] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchNotifiedUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/post/get-notifications`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching notified users:', error);
      }
    };

    fetchNotifiedUsers();
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
          <button key={userId}
            type="button"
            onClick={() => onSelectUser(userId)}
            style={{ all: 'unset', cursor: 'pointer' }}
          >
            User {userId}
          </button>
        ))
      ) : (
        <VideosList userId={userId} onBack={onHandleBack}/>
      )
      }
    </div>
  );
};

NotifitedUsers.propTypes = {
  onSelectUser: PropTypes.func.isRequired,  // onSelectUser doit être une fonction et est requis
};

export default NotifitedUsers;
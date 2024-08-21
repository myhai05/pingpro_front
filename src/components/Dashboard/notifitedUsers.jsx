import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const NotifitedUsers = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchNotifiedUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/post/get-notifications`);
        console.log(response);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching notified users:', error);
      }
    };

    fetchNotifiedUsers();
  }, []);

  return (
    <div>
      <h3>Users who sent notifications</h3>
      <ul>
      {users.map((userId) => (
        <li key={userId}>
          <button 
            type="button" 
            onClick={() => onSelectUser(userId)} 
            style={{ all: 'unset', cursor: 'pointer' }}
          >
            User {userId}
          </button>
        </li>
      ))}
    </ul>
    </div>
  );
};

NotifitedUsers.propTypes = {
  onSelectUser: PropTypes.func.isRequired,  // onSelectUser doit être une fonction et est requis
};

export default NotifitedUsers;
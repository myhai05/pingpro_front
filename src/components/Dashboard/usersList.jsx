import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './dashboard.css';
import VideosList from './videosList';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showvideos, setShowvideos] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/get-users`);
        setUsers(response.data);
      } catch (err) {
        console.log('Failed to fetch users', err);
      }
    };

    fetchUsers();
  }, []);

  const onHandleClick = (userId) => {
    setShowvideos(false);  // Mettre à jour l'utilisateur sélectionné
    setSelectedUserId(userId);
  };

  const onHandleBack = () => {
     setShowvideos(true);
  }
  return (
    <div>
      {showvideos ? (<div className="user-cards-container">
        {users.map((user) => (
          <button
            key={user._id}
            className="user-card"
            type="button"
            onClick={() => onHandleClick(user._id)}  // Passer l'ID de l'utilisateur
          >
            <h3>{user.lastName} {user.firstName}</h3>
            <p>{user.email}</p>
          </button>
        ))}
      </div>
       ) : (
        <div>
          <VideosList userId={selectedUserId} onBack={onHandleBack} />
        </div>)}
    </div>
  );
};

UsersList.propTypes = {
  onSelectUser: PropTypes.func, // Définir onSelectUser comme optionnel
};

export default UsersList;

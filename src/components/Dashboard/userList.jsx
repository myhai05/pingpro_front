import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Importer PropTypes
import './dashboard.css'; // Assuming you'll add some CSS for styling

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/get-users`);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Déclaration des variables d'état pour le rendu
  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = (
      <div className="user-cards-container">
        {users.map((user) => (
          <button 
            key={user._id} 
            className="user-card"
            onClick={() => onSelectUser(user._id)}
            type="button"
          >
            <h3>{user.lastName} {user.firstName}</h3>
            <p>{user.email}</p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Users</h2>
      {content}
    </div>
  );
};

// Ajouter la validation des props
UserList.propTypes = {
  onSelectUser: PropTypes.func.isRequired, // Définir onSelectUser comme une fonction requise
};

export default UserList;

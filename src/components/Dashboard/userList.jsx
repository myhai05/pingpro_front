// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  return (
    <div>
      <h2>Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="user-cards-container">
          {users.map((user) => (
            <div 
              key={user._id} 
              className="user-card" 
              onClick={() => onSelectUser(user._id)}
            >
              <h3>{user.lastName} {user.firstName}</h3>
              <p>{user.email}</p>
              {/* Add more user details if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;

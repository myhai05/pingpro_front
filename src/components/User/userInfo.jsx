import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const [credits, setCredits] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/${user.userId}`);
        setCredits(response.data.credits);
        setFirstName(response.data.firstName);
        setProfilePicture(response.data.picture);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  return (
    <div className="text-center">
      <h3>Bonjour {firstName}</h3>
      <h3>Your Credit Balance: {credits}</h3>
      {profilePicture && (
        <div className="profile-picture-container">
          <img 
            src={`${process.env.REACT_APP_API_URL}${profilePicture}`} 
            alt={`${firstName}'s profile`} 
            className="img-fluid rounded-circle" 
            style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
          />
        </div>
      )}
      <div className="mt-3">
        {/* Link to the edit profile form */}
        <Link to="/edit-profile" className="btn btn-secondary">Edit Profile</Link>
      </div>
    </div>
  );
};

export default UserInfo;

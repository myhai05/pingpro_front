import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from '../Context/authContext';
import {fetchUserInfos} from './fetchUserInfos';

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const [credits, setCredits] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await fetchUserInfos(user.userId);
        console.log(response);
        setCredits(response.credits);
        setFirstName(response.firstName);
        setProfilePicture(response.picture);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (user) {
      userInfo();
    }
  }, [user]);

  return (
    <div className="text-center mt-5">
      <h3>Bonjour {firstName}</h3>
      <h3>Vos crédits: {credits}</h3>
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
        <Link to="/edit-profile" className="btn btn-secondary">Mettre à jour</Link>
      </div>
    </div>
  );
};

export default UserInfo;

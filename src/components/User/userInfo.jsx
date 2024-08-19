import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const [credits, setCredits] = useState(0);
  const [firstName, setFirstName] = useState(0);
  

  useEffect(() => {
    console.log(user);
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/${user.userId}`);
        setCredits(response.data.credits);
        setFirstName(response.data.firstName);
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    if (user) {
        fetchUserInfo();
    }
  }, [user]);

  return (
    <div>
      <h3>Bonjour {firstName}</h3>
      <h3>Your Credit Balance: {credits}</h3>
    </div>
  );
};

export default UserInfo;

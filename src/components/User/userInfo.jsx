import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const [credits, setCredits] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); // State for profile picture
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/${user.userId}`);
        setCredits(response.data.credits);
        setFirstName(response.data.firstName);
        setProfilePicture(response.data.picture); // Assuming the 'picture' field has the path relative to public
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/upload/${user.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfilePicture(response.data.picture); // Update profile picture with the new one
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div className="text-center">
      <h3>Bonjour {firstName}</h3>
      <h3>Your Credit Balance: {credits}</h3>
      {profilePicture && (
        <div className="profile-picture-container">
          <img 
            src={profilePicture} 
            alt={`${firstName}'s profile`} 
            className="img-fluid rounded-circle" 
            style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
          />
        </div>
      )}
      <div className="mt-3">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload} className="btn btn-primary mt-2">Upload Photo</button>
      </div>
    </div>
  );
};

export default UserInfo;

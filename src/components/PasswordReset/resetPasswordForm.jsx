import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Permet de récupérer les paramètres d'URL


const ResetPasswordForm = () => {

  const { token } = useParams(); // Récupère le paramètre `token` de l'URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/reset-password/${token}`, {
        newPassword,
      });
      if (response.status === 200) {
        navigate('/login'); // Rediriger vers la page privée après une réinitialisation réussi 
      }

      setMessage(response.data.message);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage('Password reset failed');
      console.error('Password reset error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordForm;

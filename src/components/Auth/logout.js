import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import Button from 'react-bootstrap/Button';


const Logout = () => {

  const { setUser } = useContext(AuthContext);

  const logout = async () => {
    try {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/logout`,
        withCredentials: true,
      });

      setUser(null);
    } catch (err) {
      console.log(err);

      window.location = "/";
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={logout}>Quitter</Button>
    </div>
  );
};

export default Logout;
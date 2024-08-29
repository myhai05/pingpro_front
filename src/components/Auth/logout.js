import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';


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
      <button onClick={logout}>Quitter</button>
    </div>
  );
};

export default Logout;
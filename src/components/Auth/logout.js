import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const removeCookie = (key) => {
    if (typeof window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    try {
      await axios({
        method: "get",   
        url: `${process.env.REACT_APP_API_URL}/api/logout`,
        withCredentials: true,
      });
      
      removeCookie("jwt");
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
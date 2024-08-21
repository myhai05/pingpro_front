import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authContext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
    console.log(user);
  return user ? children : <Navigate to="/login" />;
};

  // Validation des props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

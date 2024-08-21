import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Création d'un contexte d'authentification
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // État pour stocker l'utilisateur

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Requête pour obtenir le jeton d'authentification
        const res = await axios.get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true });
        console.log(res);
        setUser(res.data.responseData);  // Mise à jour de l'état utilisateur avec les données reçues
      } catch (err) {
        console.log("No token");  // Gestion des erreurs
      }
    };
    fetchToken();  // Appel de la fonction de récupération du jeton
  }, []);  // useEffect s'exécute une seule fois après le montage du composant

  // Utilisation de useMemo pour mémoriser la valeur passée au fournisseur de contexte
  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Validation des props avec PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };


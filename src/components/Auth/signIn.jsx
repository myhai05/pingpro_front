import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const ConnexionSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Requis'),
  password: Yup.string().min(6, 'Mot de passe trop court!').required('Requis'),
});

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState(null); // Remplacez `alert` par `errorMessage`
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/login`, values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const userData = response.data.responseData;
        setUser(userData);

        if (userData.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
      
    } catch (error) {
      console.error('Erreur:', error.response.data);
      setErrorMessage(error.response.data); // Définir le message d'erreur
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-80">
      <div className="col-md-3 h-">
        <h2>Connexion</h2>
        {errorMessage && <div role="alert">{errorMessage}</div>} {/* Affichage du message d'erreur dans le DOM */}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={ConnexionSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" className="input" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <Field type="password" id="password" name="password" className="input" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <div className="forgot-password-link">
                <Link to="/request-pass">Mot de passe oublié</Link>
              </div>
              <button type="submit" disabled={isSubmitting}>
                Se connecter
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;

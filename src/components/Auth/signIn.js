import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import './signIn.css';

const ConnexionSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Requis'),
  password: Yup.string()
    .min(6, 'Mot de passe trop court!')
    .required('Requis'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
      
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/login`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      
      if (response.status === 200) {
        console.log(response);
        setUser(response.data.responseData);
        alert('Connexion réussie !');
        navigate('/offers');
      } else {
        throw new Error('Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la connexion.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1>Connexion</h1>
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
              <Field type="email" name="email" className="input" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <Field type="password" name="password" className="input" />
              <ErrorMessage name="password" component="div" className="error-message" />
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
  );
};

export default SignIn;

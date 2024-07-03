import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/login`,
        values, // `values` object contains email and motDePasse
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include credentials for CORS
        }
      );
      // Check response status
      if (response.status === 200) {
        // Handle successful login
        alert('Connexion réussie !');
        navigate('/private'); // Redirige vers la page d'accueil
      } else {
        throw new Error('Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la connexion.');
    } finally {
      setSubmitting(false); // Reset submitting state regardless of success or failure
    }
  };

  return (
    <div>
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
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Mot de passe</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
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
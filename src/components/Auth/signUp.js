import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './signUp.css'; // Import the CSS file

const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Trop court !')
    .max(50, 'Trop long !')
    .required('Requis'),
  lastName: Yup.string()
    .min(2, 'Trop court !')
    .max(50, 'Trop long !')
    .required('Requis'),
  email: Yup.string()
    .email('Email invalide')
    .required('Requis'),
  password: Yup.string()
    .min(6, 'Mot de passe trop court !')
    .required('Requis'),
  accepteCGU: Yup.boolean()
    .oneOf([true], 'Vous devez accepter les CGU')
    .required('Requis')
});

const SignUp = () => {

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/register`, values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('Inscription réussie ! Un email de vérification a été envoyé!');
        resetForm(); // Réinitialiser le formulaire après succès
      } else {
        throw new Error('Erreur lors de l\'inscription');
      }

      setSubmitting(false);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'inscription.');
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1>Inscription</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          accepteCGU: false,
        }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {formikProps => (
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <Field type="text" name="firstName" className="input" />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nom</label>
              <Field type="text" name="lastName" className="input" />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>
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
            <div className="form-group">
              <Field type="checkbox" name="accepteCGU" className="checkbox" />
              <label htmlFor="accepteCGU">J'accepte les CGU</label>
              <ErrorMessage name="accepteCGU" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={formikProps.isSubmitting}>
              S'inscrire
            </button>
            <button type="reset" onClick={() => formikProps.resetForm()}>Reset</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;

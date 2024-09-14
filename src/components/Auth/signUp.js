import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Trop court !')
    .max(25, 'Trop long !')
    .matches(/^[a-zA-ZÀ-ÿ '-]+$/, 'Caractères non valides')
    .required('Requis'),
  
  lastName: Yup.string()
    .min(2, 'Trop court !')
    .max(25, 'Trop long !')
    .matches(/^[a-zA-ZÀ-ÿ '-]+$/, 'Caractères non valides')
    .required('Requis'),
  
  email: Yup.string()
    .email('Email invalide')
    .required('Requis'),
  
  password: Yup.string()
    .min(6, 'Mot de passe trop court !')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.'
    )
    .required('Requis'),
  
  accepteCGU: Yup.boolean()
    .oneOf([true], 'Vous devez accepter les CGU')
    .required('Requis')
});


const SignUp = () => {
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/register`, values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('Inscription réussie ! Un email de vérification a été envoyé!');
      } 
     
    } catch (error) {
      console.error('Erreur:', error);
      setServerError(error.response.data); // Stocker le message d'erreur du serveur
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-60">
      <div className="col-md-3 m-4">
        <h2>Inscription</h2>
        {serverError && <div className="text-danger mb-5">{serverError}</div>} {/* Afficher le message d'erreur */}
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
                <Field type="text" id="firstName" name="firstName" className="input" />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <Field type="text" id="lastName" name="lastName" className="input" />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </div>
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
              <div className="form-group">
                <Field type="checkbox" id="checkbox" name="accepteCGU" className="checkbox" />
                <label htmlFor="accepteCGU">J'accepte les CGU</label>
                <ErrorMessage name="accepteCGU" component="div" className="text-danger" />
              </div>
              <button type="submit" className="w-5 m-2" disabled={formikProps.isSubmitting}>
                S'inscrire
              </button>
              <button type="reset" className="w-5 m-2" onClick={() => formikProps.resetForm()}>Reset</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;

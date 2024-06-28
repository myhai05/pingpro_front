import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
    <div>
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
            <div>
              <label htmlFor="firstName">Prénom</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </div>
            <div>
              <label htmlFor="lastName">Nom</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>
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
            <div>
              <Field type="checkbox" name="accepteCGU" />
              <label htmlFor="accepteCGU">J'accepte les CGU</label>
              <ErrorMessage name="accepteCGU" component="div" />
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
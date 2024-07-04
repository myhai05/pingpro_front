import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Auth/signIn';
import SignUp from './Auth/signUp';
import Logout from './Auth/logout';
import Home from '../pages/home';
import RequestResetForm from './PasswordReset/requestResetForm';
import Private from './private';
import ResetPasswordForm from './PasswordReset/resetPasswordForm';
import AddOfferForm from './offer/addOfferForm';
import OfferFetcher from './offer/offerFetchers';
import Header from './header.js';
import { AuthProvider } from '../components/Context/authContext.js';


const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />  {/* Le Header est maintenant toujours affiché */}
          <Routes>
            <Route path="/" element={<OfferFetcher><Home /></OfferFetcher>} />
            <Route path="/private" element={<Private />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          
            <Route path="/request-pass" element={<RequestResetForm />} /> 
            <Route path='/reset-form/:token' element={<ResetPasswordForm />} />  
            <Route path='/offer-form' element={<AddOfferForm />} />  
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
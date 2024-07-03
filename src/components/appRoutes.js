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


const AppRoutes = () => {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/private" element={<Private />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/request-pass" element={<RequestResetForm />} /> 
            <Route path='/reset-form/:token' element={<ResetPasswordForm />} />  
            <Route path='/offer-form' element={<AddOfferForm />} />  
          </Routes>
        </div>
      </Router>
    );
  };

export default AppRoutes;
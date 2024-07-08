import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import PrivateRoute from './Context/privateRoutes.js';
import VideoUploadForm from './Videos/videoUploadForm.jsx';


const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />  {/* Le Header est maintenant toujours affiché */}
          <Routes>
            <Route path="/" element={<OfferFetcher><Home /></OfferFetcher>} />
            <Route path="/private" element={
              <PrivateRoute>
                <Private />
              </PrivateRoute>
            } />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/request-pass" element={<RequestResetForm />} /> 
          
            <Route path="/logout" element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            } />

            <Route path='/reset-form/:token' element={
              <PrivateRoute>
                <ResetPasswordForm />
              </PrivateRoute>
            } />  
            <Route path='/offer-form' element={
              <PrivateRoute>
                <AddOfferForm />
              </PrivateRoute>
            } />
            <Route path='/upload-form' element={
              <PrivateRoute>
                <VideoUploadForm />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/login" />} />  {/* Redirection des routes non définies */}  
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
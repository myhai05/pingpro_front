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
import Header from './header.jsx';
import PrivateRoute from './Context/privateRoutes.js';
import VideoUploadForm from './Videos/videoUploadForm.jsx';
import PaymentSuccess from './Payment/paymentSuccess.js';
import PaymentCancel from './Payment/payementCancel.js';
import Payment from './Payment/stripePromise.js';
import Footer from './footer.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import UserInfo from './User/userInfo.jsx';


const AppRoutes = () => {

  
  return (
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<OfferFetcher><Home /></OfferFetcher>} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/request-pass" element={<RequestResetForm />} /> 
            <Route path='/reset-form/:token' element={<ResetPasswordForm />} />
          
            <Route path="/logout" element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            } />            
            <Route path="/private" element={
              <PrivateRoute>
                <Private />
              </PrivateRoute>
            } />            
            <Route path='/offer-form' element={
              <PrivateRoute>
                <AddOfferForm />
              </PrivateRoute>
            } />
            <Route path='/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path='/upload-form' element={
              <PrivateRoute>
                <VideoUploadForm />
              </PrivateRoute>
            } />
            <Route path='/user-account' element={
              <PrivateRoute>
                <UserInfo />
              </PrivateRoute>
            } />
            <Route path="/success" element={<PaymentSuccess />} />  {/* Ajoutez cette ligne */}
            <Route path="/cancel" element={<PaymentCancel />} />  {/* Ajoutez cette ligne */}
            <Route path="/offers" element={<OfferFetcher><Payment /></OfferFetcher>} />
            <Route path="*" element={<Navigate to="/login" />} />  {/* Redirection des routes non définies */}  
          </Routes>
          <Footer />
        </div>
      </Router>
  );
};

export default AppRoutes;
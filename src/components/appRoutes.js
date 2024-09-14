import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './Auth/signIn.jsx';
import SignUp from './Auth/signUp';
import Logout from './Auth/logout';
import RequestResetForm from './PasswordReset/requestResetForm';
import Private from './private';
import ResetPasswordForm from './PasswordReset/resetPasswordForm';
import AddOfferForm from './offer/addOfferForm';
import Home from '../pages/home.js';
import Header from './header.jsx';
import VideoUploadForm from './Videos/videoUploadForm.jsx';
import PaymentSuccess from './Payment/paymentSuccess.js';
import PaymentCancel from './Payment/payementCancel.js';
import Footer from './footer.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import EditProfile from './User/editProfile.jsx';
import Mentions from './mentions.jsx';


const AppRoutes = () => {

  
  return (
      <Router>
      
          <Header />
          <main className="flex-grow-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/request-pass" element={<RequestResetForm />} /> 
            <Route path='/reset-form/:token' element={<ResetPasswordForm />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path="/logout" element={<Logout />} />            
            <Route path="/private" element={<Private />} />            
            <Route path='/offer-form' element={<AddOfferForm />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/upload-form' element={<VideoUploadForm />} />
            <Route path="/success" element={<PaymentSuccess />} /> 
            <Route path="/cancel" element={<PaymentCancel />} />  
            <Route path="/mentions" element={<Mentions />} />
            <Route path="*" element={<Navigate to="/login" />} />   
          </Routes>
          </main>
          <Footer />
      </Router>
  );
};

export default AppRoutes;
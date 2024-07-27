import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import AppRoutes from './components/appRoutes';
import { AuthProvider, AuthContext } from './components/Context/authContext';

function App() {

  

  return (
    <AuthProvider >   
       <AppRoutes />
    </AuthProvider>
  );
}

export default App;

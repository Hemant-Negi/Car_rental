// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CarDetails from './components/cardetails.js';
import CarInsert from './components/carInsert';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<CarDetails />} />
        <Route path="/carinsert" element={<CarInsert />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>

  );
}

export default App;

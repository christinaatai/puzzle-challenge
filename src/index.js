// src/index.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import App from './App';
import LandingPage from './components/LandingPage/LandingPage';
import ProblemPage from './components/ProblemPage/ProblemPage';
import './index.css';

// needed because there was an error in the browser
import { createRoot } from 'react-dom/client';

const AppWrapper = () => {  
  return (
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/problem1" element={<ProblemPage />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </React.StrictMode>
  </Router>
  );
  };

// Use createRoot from react-dom/client
const reactRoot = createRoot(document.getElementById('root'));

reactRoot.render(
  <TransitionGroup>
    <CSSTransition key={window.location.key} classNames="fade" timeout={500}>
      <AppWrapper />
    </CSSTransition>
  </TransitionGroup>
);
    

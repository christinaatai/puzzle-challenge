import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import ProblemPage from './components/ProblemPage/ProblemPage';

function App() {
  return (
    <Router>
      <Routes>
      
      <h1>Your Escape Room Game - src/App.js</h1>
      <Route path="/" element={<ProblemPage />} />
      <LandingPage />
      {/* Add other components as needed */}
      </Routes>
    </Router>
  );
}

export default App;

// src/components/LandingPage/LandingPage.js
// A collection of UX/design themed puzzles and problems

import React, { useState, useEffect } from 'react';
import Problem1 from '../Problems/Problem1';
import Problem2 from '../Problems/Problem2';
import Problem3 from '../Problems/Problem3';
import HomePage from '../HomePage/HomePage';
import Confetti from 'react-confetti';
import { colorThemes } from '../../config/themes';
import { useSpring, animated } from '@react-spring/web';

import './LandingPage.css';

const NavRippleButton = ({ onClick, children, className }) => {
  const [ripples, setRipples] = React.useState([]);

  const addRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples(prevRipples => [...prevRipples, newRipple]);
  };

  React.useEffect(() => {
    const timeouts = ripples.map(ripple => {
      return setTimeout(() => {
        setRipples(prevRipples => prevRipples.filter(r => r.id !== ripple.id));
      }, 1000);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [ripples]);

  return (
    <button
      onClick={(e) => {
        addRipple(e);
        if (onClick) onClick(e);
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}
    </button>
  );
};

const LandingPage = ({ handleProblemCompletion = () => {} }) => {
  const [selectedProblem, setSelectedProblem] = React.useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [solvedProblems, setSolvedProblems] = React.useState(() => {
    const saved = localStorage.getItem('solvedProblems');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(() => {
    const saved = localStorage.getItem('correctAnswers');
    return saved ? JSON.parse(saved) : {
      problem1: '',
      problem2: '',
      problem3: ''
    };
  });
  const [selectedTheme, setSelectedTheme] = React.useState(() => {
    const saved = localStorage.getItem('selectedTheme');
    return saved ? parseInt(saved) : 0;
  });

  const handleThemeChange = (themeIndex) => {
    setSelectedTheme(themeIndex);
    localStorage.setItem('selectedTheme', themeIndex.toString());
  };

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setIsMenuOpen(false);
  };

  const handleCompletion = (problemId, answer) => {
    handleProblemCompletion();
    const newSolvedProblems = new Set([...solvedProblems, problemId]);
    setSolvedProblems(newSolvedProblems);
    localStorage.setItem('solvedProblems', JSON.stringify([...newSolvedProblems]));
    
    const newCorrectAnswers = {
      ...correctAnswers,
      [problemId]: answer
    };
    setCorrectAnswers(newCorrectAnswers);
    localStorage.setItem('correctAnswers', JSON.stringify(newCorrectAnswers));
    
    if (newSolvedProblems.size === 3) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  };

  const handleOutsideClick = (e) => {
    if (isMenuOpen && e.target.classList.contains('landing-page-container')) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const renderContent = () => {
    switch(selectedProblem) {
      case 'home':
        return <HomePage />;
      case 'problem1':
        return (
          <Problem1 
            handleProblemCompletion={(answer) => handleCompletion('problem1', answer)}
            isSolved={solvedProblems.has('problem1')}
            savedAnswer={correctAnswers.problem1}
            themeColors={colorThemes[selectedTheme]}
          />
        );
      case 'problem2':
        return (
          <Problem2 
            handleProblemCompletion={(answer) => handleCompletion('problem2', answer)}
            isSolved={solvedProblems.has('problem2')}
            savedAnswer={correctAnswers.problem2}
            themeColors={colorThemes[selectedTheme]}
          />
        );
      case 'problem3':
        return (
          <Problem3 
            handleProblemCompletion={(answer) => handleCompletion('problem3', answer)}
            isSolved={solvedProblems.has('problem3')}
            savedAnswer={correctAnswers.problem3}
            themeColors={colorThemes[selectedTheme]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`landing-page-container bg-gradient-to-b min-h-screen overflow-hidden ${isMenuOpen ? 'menu-open' : ''}`}
      onClick={handleOutsideClick}
      style={{ 
        backgroundImage: `linear-gradient(to bottom, ${colorThemes[selectedTheme].from}, ${colorThemes[selectedTheme].to})` 
      }}
    >
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 p-6 z-50 flex justify-end items-center">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="rounded text-3xl border border-solid rounded-full pb-1 pl-4 pr-4 w-16 font-light"
          style={{ borderColor: `${colorThemes[selectedTheme].active}80` }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
          run={true}
          gravity={0.2}
          wind={0.05}
          opacity={0.8}
          tweenDuration={10000}
          initialVelocityX={5}
          initialVelocityY={-10}
          colors={[
            '#f44336', '#e91e63', '#9c27b0', '#673ab7',
            '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
          ]}
          confettiSource={{
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: 0
          }}
        />
      )}
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className={`
          fixed top-0 left-0 right-0 bottom-0 md:left-12 md:right-auto rounded-none md:rounded-xl
          w-full md:w-64 bg-[${colorThemes[selectedTheme].from}] md:bg-[#FDFDFD]/30
          shadow-[0_0_15px_rgba(255,255,255,0.05)] md:shadow-[0_0_15px_rgba(0,0,0,0.1)] md:p-4 md:my-12
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} md:opacity-100 md:visible
          transition-opacity duration-150 ease-in-out md:transition-none z-40
          flex items-center justify-center md:block
          md:max-h-[calc(100vh-6rem)]
          md:overflow-y-auto
        `}>
          <nav className="flex flex-col justify-center md:justify-between h-full w-full max-w-sm">
            <div className="">
              <NavRippleButton 
                className={`w-full p-2 py-4 md:py-2 text-center md:text-left rounded flex items-center justify-center md:justify-start text-2xl md:text-base font-medium ${selectedProblem === 'home' ? 'md:bg-white/40' : 'md:hover:bg-white/20'}`}
                onClick={() => handleProblemSelect('home')}
              >
                Home
              </NavRippleButton>
              <div className="border-t-0 md:border-t-2 my-2" style={{ borderColor: colorThemes[selectedTheme].from }}></div>
              <NavRippleButton 
                className={`w-full p-2 py-4 mb-2 md:py-2 text-center md:text-left rounded flex items-center justify-center md:justify-between text-2xl md:text-base font-medium ${selectedProblem === 'problem1' ? 'md:bg-white/40' : 'md:hover:bg-white/20'}`}
                onClick={() => handleProblemSelect('problem1')}
              >
                Problem 1
                {solvedProblems.has('problem1') && <span className="px-2" style={{ color: colorThemes[selectedTheme].active }}>✓</span>}
              </NavRippleButton>
              <NavRippleButton 
                className={`w-full p-2 py-4 mb-2 md:py-2 text-center md:text-left rounded flex items-center justify-center md:justify-between text-2xl md:text-base font-medium ${selectedProblem === 'problem2' ? 'md:bg-white/40' : 'md:hover:bg-white/20'}`}
                onClick={() => handleProblemSelect('problem2')}
              >
                Problem 2
                {solvedProblems.has('problem2') && <span className="pr-2 pl-4" style={{ color: colorThemes[selectedTheme].active }}>✓</span>}
              </NavRippleButton>
              <NavRippleButton 
                className={`w-full p-2 py-4 mb-2 md:py-2 text-center md:text-left rounded flex items-center justify-center md:justify-between text-2xl md:text-base font-medium ${selectedProblem === 'problem3' ? 'md:bg-white/40' : 'md:hover:bg-white/20'}`}
                onClick={() => handleProblemSelect('problem3')}
              >
                Problem 3
                {solvedProblems.has('problem3') && <span className="mr-2" style={{ color: colorThemes[selectedTheme].active }}>✓</span>}
              </NavRippleButton>
            </div>
            <div className="my-12 md:mb-4 md:mt-auto border md:border-0 rounded-lg p-4 md:p-0 bg-[rgba(0,0,0,0.05)] md:bg-transparent" style={{ borderColor: `${colorThemes[selectedTheme].active}60` }}>
              <div className="flex justify-evenly px-2">
                {colorThemes.map((theme, index) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeChange(index)}
                    className="rounded-full hover:ring-2 ring-white/50 transition-all border-2 border-white transform hover:scale-110"
                  >
                    <div 
                      className="w-8 h-8 md:w-8 md:h-8 rounded-full" 
                      style={{ 
                        backgroundImage: `linear-gradient(to bottom, ${theme.from}, ${theme.to})` 
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
        <div className="flex-1 p-4 md:p-8 mt-20 md:mt-12 md:mr-12 md:mb-12 md:ml-80 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

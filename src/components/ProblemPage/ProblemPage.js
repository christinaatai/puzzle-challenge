import React from 'react';
import { useTrail, animated, useSpring } from '@react-spring/web';
import { colorThemes } from '../../config/themes';
import { checkAnswer } from '../../utils/answerCheck';

const RippleButton = ({ onClick, children, style, className }) => {
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
      style={style}
    >
      <span className="relative z-10">{children}</span>
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

const AccordionContent = ({ isOpen, children }) => {
  const contentAnimation = useSpring({
    from: { height: 0, opacity: 0 },
    to: { 
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
    },
    config: { tension: 250, friction: 32 }
  });

  return (
    <animated.div 
      className="overflow-hidden"
      style={contentAnimation}
    >
      <div className="px-7 py-4">
        {children}
      </div>
    </animated.div>
  );
};

const AccordionHeader = ({ isOpen, onClick, title }) => {
  const arrowAnimation = useSpring({
    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
  });

  return (
    <button 
      className="w-full text-left font-medium focus:outline-none flex items-center"
      onClick={onClick}
    >
      <animated.span style={arrowAnimation} className="mr-2">
        ›
      </animated.span>
      {title}
    </button>
  );
};

const StaggeredContent = ({ isVisible, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(10px)',
    config: { mass: 1, tension: 200, friction: 20 },
    delay: 100
  });

  return trail.map((style, index) => (
    <animated.div key={index} style={style}>
      {items[index]}
    </animated.div>
  ));
};

const ProblemPage = ({ 
  problemNumber,
  title,
  encodedAnswer,
  children,
  hint,
  handleProblemCompletion = () => {},
  isSolved = false,
  savedAnswer = '',
  themeColors = colorThemes[0], // Add themeColors prop with default
}) => {
  const [activeTab, setActiveTab] = React.useState('problem');
  const [answer, setAnswer] = React.useState(savedAnswer);
  const [error, setError] = React.useState('');
  const [errorKey, setErrorKey] = React.useState(0);
  const [shouldAnimate, setShouldAnimate] = React.useState(false);
  const [successKey, setSuccessKey] = React.useState(0);
  const [activeHint, setActiveHint] = React.useState(null);
  const [openHints, setOpenHints] = React.useState(new Set());

  const messageAnimation = useSpring({
    from: { 
      opacity: 0, 
      transform: 'translateX(-10px)',
    },
    to: { 
      opacity: 1, 
      transform: 'translateX(0px)',
    },
    reset: shouldAnimate,
    config: { tension: 280, friction: 24 }
  });

  React.useEffect(() => {
    if (savedAnswer) {
      setAnswer(savedAnswer);
    }
  }, [savedAnswer]);

  const handleSubmit = () => {
    if (checkAnswer(answer, encodedAnswer)) {
      handleProblemCompletion(answer);
      setError('');
      setSuccessKey(prev => prev + 1);
      setShouldAnimate(true);
      setTimeout(() => setShouldAnimate(false), 100);
    } else {
      setError('Incorrect answer. Please try again.');
      setErrorKey(prev => prev + 1);
      setShouldAnimate(true);
      setTimeout(() => setShouldAnimate(false), 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const groups = [
    [{ type: 'header' }],
    [{ type: 'content' }],
    [{ type: 'input' }]
  ];

  const trails = groups.map(group => 
    useTrail(group.length, {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0px)' },
      config: { mass: 1, tension: 220, friction: 24 },
      delay: 100 * groups.indexOf(group)
    })
  );

  const toggleHint = (hintId) => {
    setOpenHints(prev => {
      const newSet = new Set(prev);
      if (newSet.has(hintId)) {
        newSet.delete(hintId);
      } else {
        newSet.add(hintId);
      }
      return newSet;
    });
  };

  return (
    <div className="px-4 md:pl-16">
      {trails[0].map((style) => (
        <animated.div key="header" style={{ ...style, willChange: 'transform, opacity' }}>
          <h3 className="font-mono font-thin" style={{ color: themeColors.text }}>
            Problem {problemNumber.toString().padStart(2, '0')}
          </h3>
          <div className="flex flex-row justify-between items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold font-syne">{title}</h1>
            <div className="inline-flex rounded-lg bg-white/30 p-1">
              <button 
                className={`px-4 py-2 rounded-lg font-medium font-light`}
                style={{
                  backgroundColor: activeTab === 'problem' ? `${themeColors.active}90` : 'transparent',
                  color: activeTab === 'problem' ? 'white' : '#332E3690'
                }}
                onClick={() => setActiveTab('problem')}
              >
                Problem
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium font-light`}
                style={{
                  backgroundColor: activeTab === 'hint' ? `${themeColors.active}90` : 'transparent',
                  color: activeTab === 'hint' ? 'white' : '#332E3690'
                }}
                onClick={() => setActiveTab('hint')}
              >
                Hint
              </button>
            </div>
          </div>
        </animated.div>
      ))}

      {activeTab === 'problem' ? (
        <>
          {trails[1].map((style) => (
            <animated.div key="content" style={{ ...style, willChange: 'transform, opacity' }}>
              <br />
              <div className="font-light text-lg">{children}</div>
              <br />
            </animated.div>
          ))}
          {trails[2].map((style) => (
            <animated.div key="input" style={{ ...style, willChange: 'transform, opacity' }}>
              <div className="mt-4">
                <div className="relative flex">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-white/50 text-[#332E36] px-3 py-2 rounded rounded-r-none focus:outline-none focus:ring-2 font-medium"
                    style={{ 
                      '--tw-ring-color': themeColors.accent 
                    }}
                    placeholder="Enter your answer"
                  />
                  <RippleButton
                    onClick={handleSubmit}
                    className="absolute right-0 h-full text-white px-4 py-2 rounded-r transition-colors"
                    style={{ 
                      backgroundColor: themeColors.active,
                      ':hover': { backgroundColor: themeColors.accent }
                    }}
                  >
                    →
                  </RippleButton>
                </div>
                {error && (
                  <animated.p
                    key={errorKey}
                    className="text-red-500 mt-2"
                    style={messageAnimation}
                  >
                    {error}
                  </animated.p>
                )}
                {isSolved && (
                  <animated.p
                    key={successKey}
                    className="text-green-500 mt-2 font-medium"
                    style={messageAnimation}
                  >
                    Correct! Well done!
                  </animated.p>
                )}
              </div>
            </animated.div>
          ))}
        </>
      ) : (
        <div className="space-y-4">
          <div className="font-light text-lg">
            {hint || "No hint available for this problem."}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemPage;

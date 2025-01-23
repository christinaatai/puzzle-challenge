import React from 'react';
import ProblemPage from '../ProblemPage/ProblemPage';
import { useSpring, animated } from '@react-spring/web';
import ObfuscatedAnswer from '../ObfuscatedAnswer';
import problem2Image from '../../images/Frame 2.png';

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

const Problem2 = ({ handleProblemCompletion, isSolved, savedAnswer, themeColors }) => {
  const [openHints, setOpenHints] = React.useState(new Set());

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
    <ProblemPage
      problemNumber={2}
      title="eat with your eyes"
      encodedAnswer="c3Bsb3RjaA=="
      handleProblemCompletion={handleProblemCompletion}
      isSolved={isSolved}
      savedAnswer={savedAnswer}
      themeColors={themeColors}
      hint={
        <div className="space-y-4">
          <p className="text-lg pt-4">Here are some hints to help you solve this puzzle:</p>
          <div className="space-y-2">
            <div className="border rounded p-2" style={{ borderColor: `${themeColors.active}80` }}>
              <button 
                className="w-full text-left font-medium focus:outline-none text-lg"
                onClick={() => toggleHint('hint1')}
              >
                🔍 Hint 1
              </button>
              <AccordionContent isOpen={openHints.has('hint1')}>
                <div className="text-lg">Modern browsers support 140 named colors.</div>
              </AccordionContent>
            </div>

            <div className="border rounded p-2" style={{ borderColor: `${themeColors.active}80` }}>
              <button
                className="w-full text-left font-medium focus:outline-none"
                onClick={() => toggleHint('hint2')}
              >
                🔍 Hint 2
              </button>
              <AccordionContent isOpen={openHints.has('hint2')}>
                Use the first letter of each color name to get the answer.
              </AccordionContent>
            </div>

            <div className="border rounded p-2" style={{ borderColor: `${themeColors.active}80` }}>
              <button
                className="w-full text-left font-medium focus:outline-none"
                onClick={() => toggleHint('solution')}
              >
                ⭐ Solution
              </button>
              <AccordionContent isOpen={openHints.has('solution')}>
                After finding the color name that is used for each item, use the first letter of each color name to get the answer.
                <br />
                <br />
                salmon
                <br />
                lime
                <br />
                orange
                <br />
                tomato
                <br />
                chocolate
                <br />
                honeydew
                <br />
                <br />

                <span className="relative">
                  Answer: <ObfuscatedAnswer encodedAnswer="c3Bsb3RjaA==" />
                </span>
              </AccordionContent>
            </div>
          </div>
        </div>
      }
    >
      <div>
        <img src={problem2Image} alt="Problem 2 visual" className="w-full rounded-lg" />
      </div>
    </ProblemPage>
  );
};

export default Problem2;
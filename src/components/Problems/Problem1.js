import React from 'react';
import ProblemPage from '../ProblemPage/ProblemPage';
import { useSpring, animated } from '@react-spring/web';
import ObfuscatedAnswer from '../ObfuscatedAnswer';

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

const Problem1 = ({ handleProblemCompletion, isSolved, savedAnswer, themeColors }) => {
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
      problemNumber={1}
      title="-family"
      encodedAnswer="aGl0Y2g="
      handleProblemCompletion={handleProblemCompletion}
      isSolved={isSolved}
      savedAnswer={savedAnswer}
      themeColors={themeColors}
      hint={
        <div className="space-y-4">
          <br />
          <p>Here are some hints to help you solve this puzzle:</p>
          <div className="space-y-2">
            <div className="border rounded p-2" style={{ borderColor: `${themeColors.active}80` }}>
              <button 
                className="w-full text-left font-medium focus:outline-none"
                onClick={() => toggleHint('hint1')}
              >
                🔍 Hint 1
              </button>
              <AccordionContent isOpen={openHints.has('hint1')}>
                <span style={{ fontFamily: 'Helvetica' }}>nyc subway signage</span>
                <br />
                <span style={{ fontFamily: 'Impact' }}>memes</span>
                <br />
                <span style={{ fontFamily: 'Times New Roman' }}>scientific journals</span>
                <br />
                <span style={{ fontFamily: 'Courier' }}>film script</span>
                <br />
                <span style={{ fontFamily: 'Highway Gothic' }}>stop sign</span>
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
                Each item uses an iconic font.
              </AccordionContent>
            </div>

            <div className="border rounded p-2" style={{ borderColor: `${themeColors.active}80` }}>
              <button
                className="w-full text-left font-medium focus:outline-none"
                onClick={() => toggleHint('hint3')}
              >
                🔍 Hint 3
              </button>
              <AccordionContent isOpen={openHints.has('hint3')}>
                Use the first letter of each font name to get the answer.
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
                After finding the font name that is used for each item, use the first letter of each font name to get the answer.
                <br />
                <br />
                nyc subway signage → helvetica
                <br />
                memes → impact
                <br />
                scientific journals → times new roman
                <br />
                film script → courier
                <br />
                stop sign → highway gothic
                <br />
                <br />
                <span className="relative">
                  Answer: <ObfuscatedAnswer encodedAnswer="aGl0Y2g=" />
                </span>
              </AccordionContent>
            </div>
          </div>
        </div>
      }
    >
      <div>
        <p>nyc subway signage</p>
        <p>meme</p>
        <p>scientific journal</p>
        <p>film script</p>
        <p>stop sign</p>
      </div>
    </ProblemPage>
  );
};

export default Problem1; 
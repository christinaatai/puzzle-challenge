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

const Problem3 = ({ handleProblemCompletion, isSolved, savedAnswer, themeColors }) => {
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
      problemNumber={3}
      title="accessible for all?"
      encodedAnswer="cHJvZHVjZQ=="
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
                <div className="text-lg">Each term refers to one of the 12 Web Content Accessibility Guidelines (WCAG).</div>
              </AccordionContent>
            </div>

            <div className="border rounded p-2" style={{ borderColor: `${themeColors.active}80` }}>
              <button
                className="w-full text-lg text-left font-medium focus:outline-none"
                onClick={() => toggleHint('hint2')}
              >
                🔍 Hint 2
              </button>
              <AccordionContent isOpen={openHints.has('hint2')}>
                <div className="text-lg">Each guideline has a number in the format (x.x). Both numbers are important.</div>
              </AccordionContent>
            </div>

            <div className="border rounded p-2" style={{ borderColor: `${themeColors.active}80` }}>
              <button
                className="w-full text-lg text-left font-medium focus:outline-none"
                onClick={() => toggleHint('hint3')}
              >
                🔍 Hint 3
              </button>
              <AccordionContent isOpen={openHints.has('hint3')}>
                <div className="text-lg">The first number refers to one of the four main principles.</div>
              </AccordionContent>
            </div>

            <div className="border rounded p-2" style={{ borderColor: `${themeColors.active}80` }}>
              <button
                className="w-full text-lg text-left font-medium focus:outline-none"
                onClick={() => toggleHint('hint4')}
              >
                🔍 Hint 4
              </button>
              <AccordionContent isOpen={openHints.has('hint4')}>
                <div className="text-lg">The second number indicates which letter to take from the principle's name.</div>
              </AccordionContent>
            </div>

            <div className="border rounded p-2" style={{ borderColor: `${themeColors.active}80` }}>
              <button
                className="w-full text-lg text-left font-medium focus:outline-none"
                onClick={() => toggleHint('solution')}
              >
                ⭐ Solution
              </button>
              <AccordionContent isOpen={openHints.has('solution')}>
                <div className="text-lg">
                  Each guideline has a number in the format (x.y).
                  <br /><br />
                  Use the first number to select one of the four main accessibility principles:
                  1 = Perceivable, 2 = Operable, 3 = Understandable, 4 = Robust.
                  <br/><br/>
                  Then, use the second number to pick a letter from that principle's name (e.g., 1 = first letter, 2 = second letter, and so on). Combine the letters from all the guidelines to find the answer.

                  <br />

                  provide text alternative → (1.1) → <span className="font-bold">P</span>erceivable
                  <br />
                  compatibility → (4.1) → <span className="font-bold">R</span>obust
                  <br />
                  keyboard accessible → (2.1) → <span className="font-bold">O</span>perable
                  <br />
                  input assistance → (3.3) → Un<span className="font-bold">d</span>erstandable
                  <br />
                  readable → (3.1) → <span className="font-bold">U</span>nderstandable               
                  <br />
                  distinguishable → (1.4) → Per<span className="font-bold">c</span>eivable
                  <br />
                  seizures → (2.3) → Op<span className="font-bold">e</span>rable               
                  <br />
                  <br />
                  <span className="relative">
                    Answer: <ObfuscatedAnswer encodedAnswer="cHJvZHVjZQ==" />
                  </span>
                </div>
              </AccordionContent>
            </div>
          </div>
        </div>
      }
    >
      <div>
        <p>provide text alternative</p>
        <p>compatibility</p>
        <p>keyboard accessible</p>
        <p>input assistance</p>
        <p>readable</p>
        <p>distinguishable</p>
        <p>seizures</p>
      </div>
    </ProblemPage>
  );
};

export default Problem3; 
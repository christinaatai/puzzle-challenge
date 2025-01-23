import React from 'react';
import { useTrail, animated } from '@react-spring/web';

const HomePage = () => {
  const items = [
    {
      type: 'title',
      content: 'Welcome to the Puzzle Challenge'
    },
    {
      type: 'section',
      title: 'How to Play',
      content: (
        <ul className="space-y-3">
          <li>🧩 Select problems from the navigation menu on the left</li>
          <li>🤔 Each problem presents a unique UX/design-themed puzzle to solve</li>
          <li>✍️ Enter your answer in the input field</li>
          <li>✅ Correct answers will be marked with a checkmark in the menu</li>
        </ul>
      )
    },
    {
      type: 'section',
      title: 'Getting Started',
      content: (
        <>
          <p className="mb-4">
            Click on "Problem 1" in the navigation menu to begin your journey. 
            Each problem can be solved independently, so feel free to tackle them in any order.
          </p>
          <p>
            Need help? Each problem has a hint tab that can give you additional clues.
          </p>
        </>
      )
    }
  ];

  const trail = useTrail(items.length, {
    from: { opacity: 0, transform: 'translateY(15px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 220, friction: 24 }
  });

  return (
    <div className="max-w-2xl px-4 sm:px-12 mx-auto md:pl-12 md:pr-12 md:pr-0">
      {trail.map((style, index) => {
        const item = items[index];
        return (
          <animated.div key={index} style={{ ...style, willChange: 'transform, opacity' }}>
            {item.type === 'title' ? (
              <h1 className="text-4xl font-bold font-syne mb-6">{item.content}</h1>
            ) : (
              <div className={`bg-white/20 rounded-lg p-6 ${index < items.length - 1 ? 'mb-8' : 'pb-12'}`}>
                <h2 className="text-2xl font-semibold font-syne mb-4">{item.title}</h2>
                {item.content}
              </div>
            )}
          </animated.div>
        );
      })}
    </div>
  );
};

export default HomePage; 
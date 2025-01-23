import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const ObfuscatedAnswer = ({ encodedAnswer }) => {
  const [isRevealed, setIsRevealed] = React.useState(false);
  
  const decodedAnswer = React.useMemo(() => {
    return atob(encodedAnswer);
  }, [encodedAnswer]);

  const textAnimation = useSpring({
    backgroundColor: isRevealed ? 'transparent' : '#4B5563',
    color: isRevealed ? 'black' : '#4B5563',
    config: { tension: 200, friction: 20 }
  });

  return (
    <span 
      className="inline-block font-bold px-1 cursor-pointer transition-all duration-150"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <animated.span style={textAnimation}>
        {decodedAnswer}
      </animated.span>
    </span>
  );
};

export default ObfuscatedAnswer; 
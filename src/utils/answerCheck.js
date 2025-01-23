const encodeAnswer = (answer) => {
  return btoa(answer.toLowerCase().trim());
};

const checkAnswer = (userAnswer, encodedCorrectAnswer) => {
  return encodeAnswer(userAnswer) === encodedCorrectAnswer;
};

// For generating encoded answers during development
const getEncodedAnswer = (answer) => {
  console.log(`Encoded answer for "${answer}": ${encodeAnswer(answer)}`);
  return encodeAnswer(answer);
};

export { checkAnswer, getEncodedAnswer }; 
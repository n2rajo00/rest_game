import React, { useEffect, useState } from 'react';

//https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/ base for quiz


export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch data from database here
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();

        // Map the fetched data to match existing question structure
        const mappedQuestions = data.map((product) => ({
          questionText: product.productName,
          answerOptions: [
            {
              answerText: 'Option 1',
              isCorrect: product.id === 10,
              imageURL: `http://localhost:3001/${product.imageUrl}`,
            },
            {
              answerText: 'Option 2',
              isCorrect: product.id === 11,
              imageURL: `http://localhost:3001/${product.imageUrl}`,
            },
            {
              answerText: 'Option 3',
              isCorrect: product.id === 12,
              imageURL: `http://localhost:3001/${product.imageUrl}`,
            },
          ],
        }));

        // Set the mapped questions in the state
        setQuestions(mappedQuestions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>
              {!questions.length
                ? 'Loading question...'
                : questions[currentQuestion].questionText}
            </div>
          </div>
          <div className='answer-section'>
            {questions.length > 0 &&
              questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <div key={index} className='option-container'>
                  <button
                    className='option-button'
                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                    style={{
                      backgroundImage: `url(${answerOption.imageURL})`,
                    }}
                  >
                    {answerOption.answerText}
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
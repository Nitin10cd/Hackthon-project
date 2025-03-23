import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { topic } = location.state || {};

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!topic) {
        console.error("Error: Topic is missing!");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post("http://localhost:3000/api/interview/makeQuiz", { topic: topic });
        if (response.data.success) {
          setQuizData(response.data.quiz);
        } else {
          console.error("Error fetching quiz:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topic]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (quizData.length > 0 && selectedOption === quizData[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedOption(null);
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  if (loading) {
    return <div className="quiz-container">Loading quiz...</div>;
  }

  if (!topic) {
    return <div className="quiz-container">Error: No topic provided!</div>;
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score">
          You scored {score} out of {quizData.length}!
        </div>
      ) : quizData.length > 0 ? (
        <div>
          <h2 className="question">{quizData[currentQuestion].question}</h2>
          <div className="options">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`option-btn ${selectedOption === option ? "selected" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
          <button onClick={handleNextQuestion} disabled={!selectedOption} className="next-btn">
            {currentQuestion + 1 < quizData.length ? "Next Question" : "Finish Quiz"}
          </button>
        </div>
      ) : (
        <div>No quiz data available.</div>
      )}
    </div>
  );
};

export default Quiz;

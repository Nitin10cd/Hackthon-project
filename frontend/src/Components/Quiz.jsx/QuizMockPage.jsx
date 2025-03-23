import React, { useEffect, useState } from "react";
import mockArr from "../../Pages/MockPage/api";
import "../../Pages/MockPage/Mockpage.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const QuizMockPage = () => {
  const [mocks, setMocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // If fetching from API, replace this with an async function
    setMocks(mockArr);
  }, []);

  const handleMockClick = (mock) => {
    navigate("/quiz", { state: { topic: mock.name } }); // Navigate to Quiz with topic
  };

  return (
    <div className="mockpage-container">
      <h1 className="mockpage-title">AI Interview Preparation</h1>
      <div className="mockpage-grid">
        {mocks.length > 0 ? (
          mocks.map((mock) => (
            <div key={mock.id || mock.name} className="mock-card">
              <img
                src={mock.image}
                alt={`Interview for ${mock.name}`}
                className="mock-image"
              />
              <h2 className="mock-name">{mock.name}</h2>
              <p className="mock-description">{mock.description}</p>
              <NavLink 
              to="/quiz" 
              state={{ topic: mock.name }} 
              className="mock-link"
              role="button"
              aria-label={`Proceed to ${mock.name} Quiz`}
            >
              Start
            </NavLink>
            </div>
          ))
        ) : (
          <p className="loading-message">Loading interview mocks...</p>
        )}
      </div>
    </div>
  );
};

export default QuizMockPage;

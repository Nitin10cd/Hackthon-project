import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Articles.css";

const TopicPage = ({ topic }) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/ai/generate-question", { topic });
      
      if (!res.data || !res.data.content) {
        throw new Error("Invalid API response: Missing content field.");
      }

      setQuestions(res.data.content);
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  useEffect(() => {
    if (topic) {
      fetchQuestions();
    }
  }, [topic]);

  return (
    <div className="topic-container">
      {questions.map((que, index) => (
        <div key={index} className="question-card">
          <h2>Question - {que.question}</h2>
          <p ><span style={{"color": "#ffcc00"}}>Answer</span> - {que.answer}</p>
          <p>Explanation - {que.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default TopicPage;

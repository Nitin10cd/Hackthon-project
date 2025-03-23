import React, { useState } from 'react';
import Article from './Article';
import "./Articles.css";

const ArticlePage = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const topics = ["MERN Stack", "DSA", "System Design", "HR Questions"];

  return (
    <div className="article-page">
      <header className="article-header">
        <h1>Start Preparation with AI</h1>
        <p>Choose a topic to get started and prepare efficiently with AI.</p>
      </header>

      <div className="topic-buttons">
        {topics.map((topic, index) => (
          <button key={index} className="topic-button" onClick={() => setSelectedTopic(topic)}>
            {topic}
          </button>
        ))}
      </div>

      <Article selectedTopic={selectedTopic} />
    </div>
  );
};

export default ArticlePage;

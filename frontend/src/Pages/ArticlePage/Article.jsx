import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopicPage from './TopicPage';
import "./Articles.css";

const Article = ({ selectedTopic }) => {
  const [loading, setLoading] = useState(false);
  const [articleData, setArticleData] = useState(null);
  const [click, setClick] = useState(false);

  const GetArticle = async () => {
    if (!selectedTopic) return;

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/ai/generate-content', { topic: selectedTopic });

      if (!res.data.success || !res.data.content) {
        throw new Error("Invalid API response: Missing required fields.");
      }

      setArticleData(res.data.content);
    } catch (error) {
      console.error('Error fetching article:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetArticle();
  }, [selectedTopic]);

  return (
    <div className="article-container">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {selectedTopic ? (
            <>
              <h2>{articleData?.title}</h2>
              <h3>{articleData?.description}</h3>
              <button onClick={() => setClick(!click)} className="generate-button">
                Generate Mock Test Questions
              </button>
              {click && <TopicPage topic={selectedTopic} />}
            </>
          ) : (
            <div className="article-placeholder">
              <h2>Start Your Learning Journey</h2>
              <p>Please select a topic to start learning with AI.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Article;

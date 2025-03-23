import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./Context/AppContext";
import Home from "./Pages/Homepage/Home";
import Loginpopup from "./Components/SingInSignUp/Loginpopup";
import Question from "./Components/MockTest/Quesion";
import Mockpage from "./Pages/MockPage/Mockpage";
import InterviewReport from "./Testing/OneTest";
import Quiz from "./Components/Quiz.jsx/Quiz";
import QuizMockPage from "./Components/Quiz.jsx/QuizMockPage";
import ArticlePage from "./Pages/ArticlePage/ArticlePage";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Loginpopup />} />
          <Route path="/mock-test" element={<Question />} />
          <Route path="/mock" element={<QuizMockPage />} />  
          <Route path="/interview" element={<Mockpage />} />
          <Route path="/report" element={<InterviewReport />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/articles" element = {<ArticlePage/>}/>
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;


/**
 * 
 * import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Article from './Pages/Article'
import { Route, Routes } from 'react-router-dom'
import TopicPage from './Pages/TopicPage'

function App() {
 
  const [selecttopic, setselecttopic] = useState('');
  const topics = ["MernStack", "DSA", "System Design", "HR Questions"];
  const handleTopic = (topic) => {
    setselecttopic(topic);

  }

  return (
    <div className=''>
      <div className=" ">
        <div className="text-center mb-8">
          <img src='src/assets/20190225_header.jpg' className='w-full h-96 rounded-2xl mb-3'/>
          <h1 className="text-4xl font-bold  mb-6">Start Preparation With AI</h1>
          <p className="text-lg text-gray-600 mb-12">Choose a topic to get started and prepare efficiently with the power of AI.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {
              topics.map((topic, indx) => (
                <button
                  key={indx}
                  className="p-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleTopic(topic)}
                >
                  {topic}
                </button>
              ))
            }
          </div>
        </div>
        <Article selectedtopic={selecttopic} />
      </div>



    </div>


  )
}

export default App
 */
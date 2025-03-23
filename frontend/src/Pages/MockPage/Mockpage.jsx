import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Mockpage.css";
import mockArr from "./api";

const Mockpage = () => {
  const [mocks, setMocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMocks(mockArr); 
  }, []);

  const handleMockClick = (mock) => {
    navigate(`/mock/${mock.id}`, { state: { mock } }); 
  };

  return (
    <>

    <div className="mockpage-container">
    <button className="home-btn" onClick={()=> {navigate('/home')}}>Back to Home</button>
      <h1 className="mockpage-title">AI Interview Preparation</h1>
      <div className="mockpage-grid">
        {mocks.map((mock) => (
          <div key={mock.id || mock.name} className="mock-card">
            <img src={mock.image} alt={`Interview for ${mock.name}`} className="mock-image" />
            <h2 className="mock-name">{mock.name}</h2>
            <p className="mock-description">{mock.description}</p>
            <NavLink 
              to="/mock-test" 
              state={{ field: mock.name }} 
              className="mock-link"
              role="button"
              aria-label={`Proceed to ${mock.name} interview`}
            >
              Start
            </NavLink>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Mockpage;

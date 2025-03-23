import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Radar } from "react-chartjs-2";
import { 
  Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, 
  RadialLinearScale, PointElement, LineElement, Filler 
} from "chart.js";
import "./InterviewReport.css";
import { useAppContext } from "../Context/AppContext";

ChartJS.register(
  BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, 
  RadialLinearScale, PointElement, LineElement, Filler
);

const InterviewReport = () => {
  const { reportData, setReportData } = useAppContext();
  const navigate = useNavigate();

  if (!reportData || Object.keys(reportData).length === 0) {
    return <p className="report-loading">Loading report...</p>;
  }
  
  useEffect(() => {
    setReportData(JSON.parse(reportData.slice(7, -4)));
  }, []);

  const techLabels = Object.keys(reportData?.["Technologies Perfection"] || {}).filter(
    (tech) => reportData["Technologies Perfection"][tech] !== null
  );
  const techData = techLabels.map((tech) => reportData["Technologies Perfection"][tech]);

  return (
    <div className="report-container">
      <h2 className="report-title">Interview Performance Report</h2>

      <div className="report-section">
        <h3 className="report-subtitle">Tone Analysis</h3>
        <p><strong>Speaking Tone:</strong> {reportData?.Tone?.join(", ") || "No data available"}</p>
      </div>

      <div className="report-section">
        <h3 className="report-subtitle">Proficiency Ratings</h3>
        <Bar 
          data={{
            labels: Object.keys(reportData?.Proficiency || {}),
            datasets: [{
              label: "Proficiency (out of 10)",
              data: Object.values(reportData?.Proficiency || {}),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            }]
          }}
          options={{ responsive: true, scales: { y: { beginAtZero: true, max: 10 } } }}
        />
      </div>

      <div className="report-section">
        <h3 className="report-subtitle">Technology Expertise</h3>
        <Radar 
          data={{
            labels: techLabels,
            datasets: [{
              label: "Skill Level (out of 10)",
              data: techData,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
            }]
          }}
          options={{ responsive: true, scales: { r: { min: 0, max: 10 } } }}
        />
      </div>

      <div className="report-section">
        <h3 className="report-subtitle">Key Takeaways</h3>
        <div className="report-list-container">
          <div>
            <h4 className="report-list-title">👍 Strengths</h4>
            <ul className="report-list">
              {reportData?.["Good Points"]?.length > 0 ? 
                reportData["Good Points"].map((point, index) => <li key={index}>✅ {point}</li>) 
                : <li>No strengths available</li>}
            </ul>
          </div>
          <div>
            <h4 className="report-list-title">⚠️ Weaknesses</h4>
            <ul className="report-list">
              {reportData?.["Weak Points"]?.length > 0 ? 
                reportData["Weak Points"].map((point, index) => <li key={index}>❌ {point}</li>) 
                : <li>No weaknesses available</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h3 className="report-subtitle">Improvement Areas</h3>
        <ul className="report-list">
          {reportData?.["Area of Improve"]?.length > 0 ? 
            reportData["Area of Improve"].map((point, index) => <li key={index}>🔹 {point}</li>) 
            : <li>No improvement areas available</li>}
        </ul>
      </div>

      <div className="report-section">
        <h3 className="report-subtitle">Overall Rating</h3>
        <p className="report-rating">⭐ {reportData?.Rating ?? "N/A"}/10</p>
      </div>

      <div className="report-section report-button-container">
        <button className="report-home-button" onClick={() => navigate("/home")}>Go to Home</button>
      </div>
    </div>
  );
};

export default InterviewReport;

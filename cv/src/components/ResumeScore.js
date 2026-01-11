import React, { useState, useEffect } from 'react';
import { calculateResumeScore, checkResumeLength } from '../utils/resumeScoring';
import './ResumeScore.css';

function ResumeScore({ cvData, profession }) {
  const [scoreData, setScoreData] = useState(null);
  const [lengthData, setLengthData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const score = calculateResumeScore(cvData, profession);
    const length = checkResumeLength(cvData);
    setScoreData(score);
    setLengthData(length);
  }, [cvData, profession]);

  if (!scoreData) return null;

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return '#48bb78';
    if (percentage >= 70) return '#f6ad55';
    if (percentage >= 50) return '#ed8936';
    return '#fc8181';
  };

  const getFeedbackIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'suggestion': return '💡';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="resume-score-container">
      <div className="score-header">
        <h3>Resume Score</h3>
        <button
          className="toggle-details-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      <div className="score-circle-container">
        <div
          className="score-circle"
          style={{
            background: `conic-gradient(${getScoreColor(scoreData.percentage)} ${scoreData.percentage * 3.6}deg, #e2e8f0 0deg)`
          }}
        >
          <div className="score-inner">
            <div className="score-number">{scoreData.percentage}</div>
            <div className="score-grade">Grade: {scoreData.grade}</div>
          </div>
        </div>
      </div>

      <div className="score-breakdown">
        <div className="score-category">
          <span className="category-label">Completeness</span>
          <div className="score-bar">
            <div
              className="score-bar-fill"
              style={{
                width: `${(scoreData.scores.completeness / 30) * 100}%`,
                background: getScoreColor((scoreData.scores.completeness / 30) * 100)
              }}
            ></div>
          </div>
          <span className="category-score">{scoreData.scores.completeness}/30</span>
        </div>

        <div className="score-category">
          <span className="category-label">ATS Compatible</span>
          <div className="score-bar">
            <div
              className="score-bar-fill"
              style={{
                width: `${(scoreData.scores.atsCompatibility / 25) * 100}%`,
                background: getScoreColor((scoreData.scores.atsCompatibility / 25) * 100)
              }}
            ></div>
          </div>
          <span className="category-score">{scoreData.scores.atsCompatibility}/25</span>
        </div>

        <div className="score-category">
          <span className="category-label">Content Quality</span>
          <div className="score-bar">
            <div
              className="score-bar-fill"
              style={{
                width: `${(scoreData.scores.contentQuality / 25) * 100}%`,
                background: getScoreColor((scoreData.scores.contentQuality / 25) * 100)
              }}
            ></div>
          </div>
          <span className="category-score">{scoreData.scores.contentQuality}/25</span>
        </div>

        <div className="score-category">
          <span className="category-label">Formatting</span>
          <div className="score-bar">
            <div
              className="score-bar-fill"
              style={{
                width: `${(scoreData.scores.formatting / 10) * 100}%`,
                background: getScoreColor((scoreData.scores.formatting / 10) * 100)
              }}
            ></div>
          </div>
          <span className="category-score">{scoreData.scores.formatting}/10</span>
        </div>

        <div className="score-category">
          <span className="category-label">Keywords</span>
          <div className="score-bar">
            <div
              className="score-bar-fill"
              style={{
                width: `${(scoreData.scores.keywords / 10) * 100}%`,
                background: getScoreColor((scoreData.scores.keywords / 10) * 100)
              }}
            ></div>
          </div>
          <span className="category-score">{scoreData.scores.keywords}/10</span>
        </div>
      </div>

      {lengthData && (
        <div className="length-info">
          <div className="length-stat">
            <span className="stat-icon">📝</span>
            <div>
              <div className="stat-number">{lengthData.wordCount}</div>
              <div className="stat-label">Words</div>
            </div>
          </div>
          <div className="length-feedback">
            {lengthData.ideal ? '✅' : '⚠️'} {lengthData.feedback}
          </div>
        </div>
      )}

      {showDetails && (
        <div className="score-feedback">
          <h4>Detailed Feedback</h4>
          {scoreData.feedback.map((item, index) => (
            <div key={index} className={`feedback-item ${item.type}`}>
              <span className="feedback-icon">{getFeedbackIcon(item.type)}</span>
              <div className="feedback-content">
                <div className="feedback-category">{item.category}</div>
                <div className="feedback-message">{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumeScore;

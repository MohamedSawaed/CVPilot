import React from 'react';
import './SuggestionBox.css';

function SuggestionBox({ suggestions }) {
  const getIcon = (type) => {
    switch (type) {
      case 'tip':
        return '💡';
      case 'warning':
        return '⚠️';
      case 'suggestion':
        return '✨';
      case 'success':
        return '✅';
      default:
        return 'ℹ️';
    }
  };

  const getClassName = (type) => {
    return `suggestion-item ${type}`;
  };

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="suggestion-box">
      <h4>Smart Suggestions</h4>
      {suggestions.map((suggestion, index) => (
        <div key={index} className={getClassName(suggestion.type)}>
          <span className="suggestion-icon">{getIcon(suggestion.type)}</span>
          <p>{suggestion.message}</p>
        </div>
      ))}
    </div>
  );
}

export default SuggestionBox;

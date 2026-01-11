import React, { useState } from 'react';
import {
  FaLightbulb,
  FaMagic,
  FaChartLine,
  FaExpandAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCopy
} from 'react-icons/fa';
import './ContentAssistant.css';

function ContentAssistant({
  type,
  content,
  onApplySuggestion,
  professionId,
  userProfile
}) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleApply = (text) => {
    if (onApplySuggestion) {
      onApplySuggestion(text);
    }
  };

  // Import functions dynamically based on type
  const {
    analyzeContent,
    expandBulletPoint,
    generateSummary,
    suggestActionVerbs,
    generateAchievementExamples,
    suggestSkills
  } = require('../utils/contentEnhancer');

  const renderAnalysis = () => {
    if (!content || content.trim().length === 0) {
      return (
        <div className="assistant-empty">
          <FaLightbulb className="empty-icon" />
          <p>Start typing to get AI-powered suggestions</p>
        </div>
      );
    }

    const analysis = analyzeContent(content);

    return (
      <div className="analysis-container">
        <div className="score-section">
          <div className="score-circle" style={{
            background: analysis.score >= 80 ? '#48bb78' : analysis.score >= 60 ? '#ed8936' : '#f56565'
          }}>
            <span className="score-number">{analysis.score}</span>
            <span className="score-label">Score</span>
          </div>
          <div className="score-info">
            <h4>Content Quality</h4>
            <p>{analysis.score >= 80 ? 'Excellent!' : analysis.score >= 60 ? 'Good, room for improvement' : 'Needs work'}</p>
          </div>
        </div>

        {analysis.strengths.length > 0 && (
          <div className="analysis-section strengths">
            <h4><FaCheckCircle /> Strengths</h4>
            <ul>
              {analysis.strengths.map((strength, idx) => (
                <li key={idx}>{strength}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.issues.length > 0 && (
          <div className="analysis-section issues">
            <h4><FaExclamationTriangle /> Issues</h4>
            <ul>
              {analysis.issues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.suggestions.length > 0 && (
          <div className="analysis-section suggestions">
            <h4><FaLightbulb /> Suggestions</h4>
            <ul>
              {analysis.suggestions.map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action verbs suggestions */}
        <div className="verb-suggestions">
          <h4>Suggested Action Verbs:</h4>
          <div className="verb-chips">
            {suggestActionVerbs(content).slice(0, 8).map((verb, idx) => (
              <button
                key={idx}
                className="verb-chip"
                onClick={() => handleApply(verb + ' ' + content)}
                title="Click to use this verb"
              >
                {verb}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderExpansions = () => {
    if (!content || content.trim().length === 0) {
      return (
        <div className="assistant-empty">
          <FaExpandAlt className="empty-icon" />
          <p>Add content to see expansion suggestions</p>
        </div>
      );
    }

    const expansions = expandBulletPoint(content, professionId, userProfile?.currentRole);

    return (
      <div className="expansions-container">
        <div className="expansion-intro">
          <FaMagic />
          <p>Here are professional expansions of your bullet point:</p>
        </div>

        {expansions.map((expansion, idx) => (
          <div key={idx} className="expansion-card">
            <div className="expansion-header">
              <span className={`expansion-badge ${expansion.level}`}>
                {expansion.level}
              </span>
              <span className="expansion-rationale">{expansion.rationale}</span>
            </div>
            <div className="expansion-text">
              {expansion.text}
            </div>
            {expansion.needsInput && (
              <div className="expansion-inputs">
                <small>💡 Fill in: {expansion.needsInput.join(', ')}</small>
              </div>
            )}
            <div className="expansion-actions">
              <button
                className="btn-copy"
                onClick={() => handleCopy(expansion.text, idx)}
              >
                {copiedIndex === idx ? <><FaCheckCircle /> Copied!</> : <><FaCopy /> Copy</>}
              </button>
              <button
                className="btn-apply"
                onClick={() => handleApply(expansion.text)}
              >
                <FaMagic /> Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSummaries = () => {
    const summaries = generateSummary(userProfile);

    return (
      <div className="summaries-container">
        <div className="summary-intro">
          <FaLightbulb />
          <p>Choose a professional summary style that fits your brand:</p>
        </div>

        {summaries.map((summary, idx) => (
          <div key={idx} className="summary-card">
            <div className="summary-header">
              <h4>{summary.style}</h4>
              <span className="summary-best-for">{summary.bestFor}</span>
            </div>
            <div className="summary-text">
              {summary.text}
            </div>
            <div className="summary-actions">
              <button
                className="btn-copy"
                onClick={() => handleCopy(summary.text, `summary-${idx}`)}
              >
                {copiedIndex === `summary-${idx}` ? <><FaCheckCircle /> Copied!</> : <><FaCopy /> Copy</>}
              </button>
              <button
                className="btn-apply"
                onClick={() => handleApply(summary.text)}
              >
                <FaMagic /> Use This
              </button>
            </div>
          </div>
        ))}

        <div className="summary-tip">
          <FaLightbulb />
          <p>💡 <strong>Tip:</strong> Replace [placeholders] with your specific achievements, skills, and goals for a personalized summary.</p>
        </div>
      </div>
    );
  };

  const renderExamples = () => {
    const examples = generateAchievementExamples(professionId);

    return (
      <div className="examples-container">
        <div className="examples-intro">
          <FaChartLine />
          <p>Example achievements from top {userProfile?.profession?.name || 'professionals'}:</p>
        </div>

        {examples.map((example, idx) => (
          <div key={idx} className="example-card">
            <div className="example-text">
              <span className="example-bullet">•</span>
              {example}
            </div>
            <div className="example-actions">
              <button
                className="btn-copy"
                onClick={() => handleCopy(example, `example-${idx}`)}
              >
                {copiedIndex === `example-${idx}` ? <FaCheckCircle /> : <FaCopy />}
              </button>
            </div>
          </div>
        ))}

        <div className="examples-tip">
          <FaLightbulb />
          <p>💡 Use these as inspiration and adapt them to your own experiences and metrics.</p>
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    const currentSkills = content ? content.split(',').map(s => s.trim()) : [];
    const suggestions = suggestSkills(professionId, currentSkills);

    return (
      <div className="skills-container">
        <div className="skills-intro">
          <FaChartLine />
          <p>Relevant skills for {userProfile?.profession?.name || 'your profession'}:</p>
        </div>

        <div className="skills-grid">
          {suggestions.slice(0, 15).map((skill, idx) => (
            <button
              key={idx}
              className="skill-chip"
              onClick={() => {
                const newSkills = content ? content + ', ' + skill : skill;
                handleApply(newSkills);
              }}
            >
              {skill}
            </button>
          ))}
        </div>

        {suggestions.length === 0 && (
          <div className="skills-empty">
            <p>Great! You've covered all suggested skills for your profession.</p>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (type) {
      case 'summary':
        return activeTab === 'analysis' ? renderAnalysis() : renderSummaries();
      case 'experience':
      case 'achievement':
      case 'project':
        return activeTab === 'analysis' ? renderAnalysis() : activeTab === 'expand' ? renderExpansions() : renderExamples();
      case 'skills':
        return renderSkills();
      default:
        return renderAnalysis();
    }
  };

  const getTabs = () => {
    switch (type) {
      case 'summary':
        return [
          { id: 'analysis', label: 'Analysis', icon: FaChartLine },
          { id: 'templates', label: 'Templates', icon: FaMagic }
        ];
      case 'experience':
      case 'achievement':
      case 'project':
        return [
          { id: 'analysis', label: 'Analysis', icon: FaChartLine },
          { id: 'expand', label: 'Expand', icon: FaExpandAlt },
          { id: 'examples', label: 'Examples', icon: FaLightbulb }
        ];
      case 'skills':
        return [];
      default:
        return [{ id: 'analysis', label: 'Analysis', icon: FaChartLine }];
    }
  };

  const tabs = getTabs();

  return (
    <div className="content-assistant">
      <div className="assistant-header">
        <FaMagic className="assistant-icon" />
        <h3>AI Writing Assistant</h3>
      </div>

      {tabs.length > 0 && (
        <div className="assistant-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="assistant-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default ContentAssistant;

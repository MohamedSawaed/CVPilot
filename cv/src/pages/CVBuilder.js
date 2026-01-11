import React, { useState, useEffect } from 'react';
import { sectionDefinitions } from '../data/templates';
import SuggestionBox from '../components/SuggestionBox';
import CVPreview from '../components/CVPreview';
import './CVBuilder.css';

function CVBuilder({ profession, userProfile }) {
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technicalSkills: [],
      softSkills: [],
      languages: []
    },
    certifications: [],
    projects: [],
    achievements: [],
    publications: [],
    licenses: [],
    portfolio: []
  });

  const [currentSection, setCurrentSection] = useState('personalInfo');
  const [showPreview, setShowPreview] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const sections = profession.sections;

  const handleFieldChange = (section, field, value, index = null) => {
    setCvData(prev => {
      const newData = { ...prev };

      if (index !== null) {
        const newArray = [...newData[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        newData[section] = newArray;
      } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
        newData[section] = { ...newData[section], [field]: value };
      } else {
        newData[section] = value;
      }

      return newData;
    });

    setCurrentField(field);
    generateSuggestions(section, field, value);
  };

  const generateSuggestions = (section, field, value) => {
    const tips = profession.tips[section];
    const newSuggestions = [];

    if (section === 'summary' && value.length < 50) {
      newSuggestions.push({
        type: 'warning',
        message: 'Professional summaries should be at least 2-3 sentences. Consider elaborating on your key strengths.'
      });
    }

    if (section === 'summary' && tips) {
      newSuggestions.push({
        type: 'tip',
        message: tips
      });
    }

    if (section === 'experience' && field === 'description' && value.length > 0) {
      if (!value.match(/\d+/)) {
        newSuggestions.push({
          type: 'suggestion',
          message: 'Try to include quantifiable achievements (numbers, percentages, metrics) to make your impact clear.'
        });
      }
      if (value.split('\n').length < 2) {
        newSuggestions.push({
          type: 'tip',
          message: 'Use bullet points to list your key responsibilities and achievements.'
        });
      }
    }

    if (section === 'education' && tips) {
      newSuggestions.push({
        type: 'tip',
        message: tips
      });
    }

    if (section === 'skills') {
      const suggested = profession.suggestedSkills;
      if (suggested && suggested.length > 0) {
        newSuggestions.push({
          type: 'suggestion',
          message: `Suggested skills for ${profession.name}s: ${suggested.join(', ')}`
        });
      }
    }

    setSuggestions(newSuggestions);
  };

  const addArrayItem = (section) => {
    setCvData(prev => ({
      ...prev,
      [section]: [...prev[section], {}]
    }));
  };

  const removeArrayItem = (section, index) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const renderPersonalInfoSection = () => (
    <div className="form-section">
      <h3>Personal Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            value={cvData.personalInfo.fullName}
            onChange={(e) => handleFieldChange('personalInfo', 'fullName', e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={cvData.personalInfo.email}
            onChange={(e) => handleFieldChange('personalInfo', 'email', e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            value={cvData.personalInfo.phone}
            onChange={(e) => handleFieldChange('personalInfo', 'phone', e.target.value)}
            placeholder="+1 234 567 8900"
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={cvData.personalInfo.location}
            onChange={(e) => handleFieldChange('personalInfo', 'location', e.target.value)}
            placeholder="New York, NY"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            value={cvData.personalInfo.linkedin}
            onChange={(e) => handleFieldChange('personalInfo', 'linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="form-group">
          <label>Website/Portfolio</label>
          <input
            type="url"
            value={cvData.personalInfo.website}
            onChange={(e) => handleFieldChange('personalInfo', 'website', e.target.value)}
            placeholder="www.johndoe.com"
          />
        </div>
      </div>
    </div>
  );

  const renderSummarySection = () => (
    <div className="form-section">
      <h3>Professional Summary</h3>
      <div className="form-group">
        <label>Write a compelling summary of your professional background *</label>
        <textarea
          value={cvData.summary}
          onChange={(e) => handleFieldChange('summary', null, e.target.value)}
          onFocus={() => generateSuggestions('summary', 'summary', cvData.summary)}
          placeholder={`Example: Dedicated ${profession.name} with ${userProfile.yearsInField}+ years of experience...`}
          rows="6"
        />
        <div className="char-count">{cvData.summary.length} characters</div>
      </div>
    </div>
  );

  const renderExperienceSection = () => (
    <div className="form-section">
      <h3>Work Experience</h3>
      {cvData.experience.map((exp, index) => (
        <div key={index} className="repeatable-item">
          <div className="item-header">
            <h4>Position {index + 1}</h4>
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeArrayItem('experience', index)}
            >
              Remove
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                value={exp.jobTitle || ''}
                onChange={(e) => handleFieldChange('experience', 'jobTitle', e.target.value, index)}
                placeholder="Senior Software Engineer"
              />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => handleFieldChange('experience', 'company', e.target.value, index)}
                placeholder="Tech Corp"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={exp.location || ''}
                onChange={(e) => handleFieldChange('experience', 'location', e.target.value, index)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="month"
                value={exp.startDate || ''}
                onChange={(e) => handleFieldChange('experience', 'startDate', e.target.value, index)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={exp.endDate || ''}
                onChange={(e) => handleFieldChange('experience', 'endDate', e.target.value, index)}
                disabled={exp.current}
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={exp.current || false}
                  onChange={(e) => handleFieldChange('experience', 'current', e.target.checked, index)}
                />
                Currently working here
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Description & Achievements *</label>
            <textarea
              value={exp.description || ''}
              onChange={(e) => handleFieldChange('experience', 'description', e.target.value, index)}
              onFocus={() => generateSuggestions('experience', 'description', exp.description || '')}
              placeholder="• Led a team of 5 developers&#10;• Increased system performance by 40%&#10;• Implemented CI/CD pipeline"
              rows="5"
            />
          </div>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addArrayItem('experience')}>
        + Add Experience
      </button>
    </div>
  );

  const renderEducationSection = () => (
    <div className="form-section">
      <h3>Education</h3>
      {cvData.education.map((edu, index) => (
        <div key={index} className="repeatable-item">
          <div className="item-header">
            <h4>Education {index + 1}</h4>
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeArrayItem('education', index)}
            >
              Remove
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => handleFieldChange('education', 'degree', e.target.value, index)}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>
            <div className="form-group">
              <label>Institution *</label>
              <input
                type="text"
                value={edu.institution || ''}
                onChange={(e) => handleFieldChange('education', 'institution', e.target.value, index)}
                placeholder="Stanford University"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={edu.location || ''}
                onChange={(e) => handleFieldChange('education', 'location', e.target.value, index)}
                placeholder="Stanford, CA"
              />
            </div>
            <div className="form-group">
              <label>Graduation Date</label>
              <input
                type="month"
                value={edu.graduationDate || ''}
                onChange={(e) => handleFieldChange('education', 'graduationDate', e.target.value, index)}
              />
            </div>
            <div className="form-group">
              <label>GPA (Optional)</label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => handleFieldChange('education', 'gpa', e.target.value, index)}
                placeholder="3.8/4.0"
              />
            </div>
            <div className="form-group">
              <label>Honors (Optional)</label>
              <input
                type="text"
                value={edu.honors || ''}
                onChange={(e) => handleFieldChange('education', 'honors', e.target.value, index)}
                placeholder="Summa Cum Laude"
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addArrayItem('education')}>
        + Add Education
      </button>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="form-section">
      <h3>Skills</h3>
      <div className="form-group">
        <label>Technical Skills</label>
        <input
          type="text"
          value={cvData.skills.technicalSkills.join(', ')}
          onChange={(e) => handleFieldChange('skills', 'technicalSkills', e.target.value.split(',').map(s => s.trim()))}
          onFocus={() => generateSuggestions('skills', 'technicalSkills', '')}
          placeholder="JavaScript, Python, React, Node.js"
        />
        <small>Separate skills with commas</small>
      </div>
      <div className="form-group">
        <label>Soft Skills</label>
        <input
          type="text"
          value={cvData.skills.softSkills.join(', ')}
          onChange={(e) => handleFieldChange('skills', 'softSkills', e.target.value.split(',').map(s => s.trim()))}
          placeholder="Leadership, Communication, Problem Solving"
        />
        <small>Separate skills with commas</small>
      </div>
      <div className="form-group">
        <label>Languages</label>
        <input
          type="text"
          value={cvData.skills.languages.join(', ')}
          onChange={(e) => handleFieldChange('skills', 'languages', e.target.value.split(',').map(s => s.trim()))}
          placeholder="English (Native), Spanish (Fluent)"
        />
        <small>Separate languages with commas</small>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'personalInfo':
        return renderPersonalInfoSection();
      case 'summary':
        return renderSummarySection();
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      case 'skills':
        return renderSkillsSection();
      default:
        return <div>Section coming soon...</div>;
    }
  };

  const goToNextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
      setSuggestions([]);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
      setSuggestions([]);
    }
  };

  return (
    <div className="cv-builder">
      <div className="builder-header">
        <h2>{profession.icon} Building Your {profession.name} Resume</h2>
        <button className="preview-toggle" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      <div className={`builder-content ${showPreview ? 'with-preview' : ''}`}>
        <div className="builder-main">
          <div className="section-navigation">
            {sections.map((section, index) => (
              <button
                key={section}
                className={`section-nav-btn ${currentSection === section ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSection(section);
                  setSuggestions([]);
                }}
              >
                <span className="section-number">{index + 1}</span>
                <span className="section-name">
                  {sectionDefinitions[section]?.title || section}
                </span>
              </button>
            ))}
          </div>

          <div className="form-container">
            {renderCurrentSection()}

            {suggestions.length > 0 && (
              <SuggestionBox suggestions={suggestions} />
            )}

            <div className="form-navigation">
              <button
                type="button"
                className="nav-btn secondary"
                onClick={goToPreviousSection}
                disabled={sections.indexOf(currentSection) === 0}
              >
                ← Previous
              </button>
              <button
                type="button"
                className="nav-btn primary"
                onClick={goToNextSection}
                disabled={sections.indexOf(currentSection) === sections.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {showPreview && (
          <div className="preview-panel">
            <CVPreview cvData={cvData} profession={profession} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CVBuilder;

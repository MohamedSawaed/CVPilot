import React from 'react';
import './CVPreview.css';

function CVPreview({ cvData, profession }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderPersonalInfo = () => {
    const { fullName, email, phone, location, linkedin, website } = cvData.personalInfo;

    return (
      <div className="preview-header">
        <h1 className="preview-name">{fullName || 'Your Name'}</h1>
        <div className="preview-contact">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {location && <span>{location}</span>}
        </div>
        <div className="preview-links">
          {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {website && <a href={website} target="_blank" rel="noopener noreferrer">Portfolio</a>}
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    if (!cvData.summary) return null;

    return (
      <div className="preview-section">
        <h2 className="section-title">Professional Summary</h2>
        <p className="summary-text">{cvData.summary}</p>
      </div>
    );
  };

  const renderExperience = () => {
    if (!cvData.experience || cvData.experience.length === 0) return null;

    return (
      <div className="preview-section">
        <h2 className="section-title">Work Experience</h2>
        {cvData.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div>
                <h3 className="job-title">{exp.jobTitle}</h3>
                <p className="company">{exp.company}{exp.location && `, ${exp.location}`}</p>
              </div>
              <p className="date-range">
                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
              </p>
            </div>
            {exp.description && (
              <div className="description">
                {exp.description.split('\n').map((line, i) => (
                  line.trim() && <p key={i}>{line}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEducation = () => {
    if (!cvData.education || cvData.education.length === 0) return null;

    return (
      <div className="preview-section">
        <h2 className="section-title">Education</h2>
        {cvData.education.map((edu, index) => (
          <div key={index} className="education-item">
            <div className="education-header">
              <div>
                <h3 className="degree">{edu.degree}</h3>
                <p className="institution">{edu.institution}{edu.location && `, ${edu.location}`}</p>
              </div>
              <p className="date-range">{formatDate(edu.graduationDate)}</p>
            </div>
            {(edu.gpa || edu.honors) && (
              <div className="education-details">
                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                {edu.honors && <span>{edu.honors}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    const { technicalSkills, softSkills, languages } = cvData.skills;
    const hasSkills = technicalSkills?.length > 0 || softSkills?.length > 0 || languages?.length > 0;

    if (!hasSkills) return null;

    return (
      <div className="preview-section">
        <h2 className="section-title">Skills</h2>
        {technicalSkills?.length > 0 && (
          <div className="skills-group">
            <strong>Technical:</strong> {technicalSkills.filter(s => s).join(' • ')}
          </div>
        )}
        {softSkills?.length > 0 && (
          <div className="skills-group">
            <strong>Soft Skills:</strong> {softSkills.filter(s => s).join(' • ')}
          </div>
        )}
        {languages?.length > 0 && (
          <div className="skills-group">
            <strong>Languages:</strong> {languages.filter(s => s).join(' • ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="cv-preview">
      <div className="preview-actions">
        <button className="preview-action-btn" onClick={() => window.print()}>
          🖨️ Print
        </button>
        <button className="preview-action-btn">
          📥 Download PDF
        </button>
      </div>

      <div className="preview-document">
        {renderPersonalInfo()}
        {renderSummary()}
        {renderExperience()}
        {renderEducation()}
        {renderSkills()}

        {(!cvData.personalInfo.fullName && !cvData.summary && cvData.experience.length === 0) && (
          <div className="preview-placeholder">
            <p>Your resume preview will appear here as you fill in the information.</p>
            <span className="placeholder-icon">{profession.icon}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CVPreview;

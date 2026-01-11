import React from 'react';
import './CVPreviewModern.css';

function CVPreviewModern({ cvData, profession }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="cv-preview-modern" id="cv-preview-modern">
      <div className="modern-header">
        <div className="modern-header-main">
          <h1>{cvData.personalInfo.fullName || 'Your Name'}</h1>
          <div className="modern-title">{profession.name}</div>
        </div>
        <div className="modern-contact">
          {cvData.personalInfo.email && (
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              {cvData.personalInfo.email}
            </div>
          )}
          {cvData.personalInfo.phone && (
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              {cvData.personalInfo.phone}
            </div>
          )}
          {cvData.personalInfo.location && (
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              {cvData.personalInfo.location}
            </div>
          )}
          {cvData.personalInfo.linkedin && (
            <div className="contact-item">
              <span className="contact-icon">💼</span>
              <a href={cvData.personalInfo.linkedin}>LinkedIn</a>
            </div>
          )}
        </div>
      </div>

      {cvData.summary && (
        <div className="modern-section">
          <h2 className="modern-section-title">About Me</h2>
          <p className="modern-summary">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience && cvData.experience.length > 0 && (
        <div className="modern-section">
          <h2 className="modern-section-title">Experience</h2>
          {cvData.experience.map((exp, index) => (
            <div key={index} className="modern-experience-item">
              <div className="modern-exp-header">
                <div>
                  <h3 className="modern-job-title">{exp.jobTitle}</h3>
                  <div className="modern-company">{exp.company}</div>
                </div>
                <div className="modern-date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
              {exp.description && (
                <div className="modern-description">
                  {exp.description.split('\n').map((line, i) => (
                    line.trim() && <p key={i}>{line.replace(/^[•\-\*]\s*/, '')}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {cvData.education && cvData.education.length > 0 && (
        <div className="modern-section">
          <h2 className="modern-section-title">Education</h2>
          {cvData.education.map((edu, index) => (
            <div key={index} className="modern-education-item">
              <div className="modern-edu-header">
                <div>
                  <h3 className="modern-degree">{edu.degree}</h3>
                  <div className="modern-institution">{edu.institution}</div>
                </div>
                <div className="modern-date">{formatDate(edu.graduationDate)}</div>
              </div>
              {(edu.gpa || edu.honors) && (
                <div className="modern-edu-details">
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  {edu.honors && <span>{edu.honors}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {(cvData.skills.technicalSkills?.filter(s => s).length > 0 ||
        cvData.skills.softSkills?.filter(s => s).length > 0) && (
        <div className="modern-section">
          <h2 className="modern-section-title">Skills</h2>
          <div className="modern-skills-grid">
            {cvData.skills.technicalSkills?.filter(s => s).map((skill, index) => (
              <span key={index} className="modern-skill-tag technical">{skill}</span>
            ))}
            {cvData.skills.softSkills?.filter(s => s).map((skill, index) => (
              <span key={index} className="modern-skill-tag soft">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CVPreviewModern;

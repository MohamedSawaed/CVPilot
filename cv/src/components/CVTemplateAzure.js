import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './CVTemplateAzure.css';

/**
 * Azure Template - Professional blue gradient with modern layout
 * Best for: Business professionals, Consultants, Corporate roles
 */
function CVTemplateAzure({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  const r = (text) => text;

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    return (
      <div className="azure-header">
        <div className="azure-header-content">
          <h1 className="azure-name">{r(info.fullName) || r('Your Name')}</h1>
          {info.headline && <div className="azure-headline">{r(info.headline)}</div>}
          <div className="azure-contact-row">
            {info.email && <span className="azure-contact-item">{r(info.email)}</span>}
            {info.phone && <span className="azure-contact-item">{r(info.phone)}</span>}
            {info.location && <span className="azure-contact-item">{r(info.location)}</span>}
            {info.linkedin && <span className="azure-contact-item">{r(info.linkedin)}</span>}
            {info.website && <span className="azure-contact-item">{r(info.website)}</span>}
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    // Skills and languages go in sidebar
    if (sectionKey === 'skills' || sectionKey === 'languages') {
      return null;
    }

    return (
      <div key={sectionKey} className="azure-section">
        <h2 className="azure-section-title">{r(t(sectionKey))}</h2>
        <div className="azure-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <p className="azure-summary">{r(data) || r('Your professional summary goes here...')}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="azure-exp-item">
            <div className="azure-timeline-dot"></div>
            <div className="azure-exp-content">
              <div className="azure-item-header">
                <div className="azure-item-title-group">
                  <h3 className="azure-exp-title">{r(exp.jobTitle)}</h3>
                  <div className="azure-exp-company">{r(exp.company)}{exp.location && ` • ${r(exp.location)}`}</div>
                </div>
                <span className="azure-item-date">
                  {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
                </span>
              </div>
              {exp.description && <p className="azure-exp-description">{r(exp.description)}</p>}
            </div>
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="azure-edu-item">
            <div className="azure-timeline-dot"></div>
            <div className="azure-edu-content">
              <div className="azure-item-header">
                <div className="azure-item-title-group">
                  <h3 className="azure-edu-degree">{r(edu.degree)}</h3>
                  <div className="azure-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
                </div>
                <span className="azure-item-date">{r(edu.graduationDate)}</span>
              </div>
              {edu.gpa && <div className="azure-edu-gpa">GPA: {r(edu.gpa)}</div>}
            </div>
          </div>
        ));

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="azure-cert-item">
            <div className="azure-item-header">
              <h3 className="azure-cert-name">{r(cert.name)}</h3>
              <span className="azure-item-date">{r(cert.date)}</span>
            </div>
            <div className="azure-cert-issuer">{r(cert.issuer)}</div>
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="azure-project-item">
            <div className="azure-item-header">
              <h3 className="azure-project-name">{r(project.name)}</h3>
              <span className="azure-item-date">{r(project.date)}</span>
            </div>
            {project.description && <p className="azure-project-description">{r(project.description)}</p>}
            {project.technologies && (
              <div className="azure-project-tech">
                {project.technologies.split(',').map((tech, i) => (
                  <span key={i} className="azure-tech-tag">{tech.trim()}</span>
                ))}
              </div>
            )}
          </div>
        ));

      case 'achievements':
        return (
          <ul className="azure-achievements-list">
            {(data || []).map((achievement, idx) => (
              <li key={idx} className="azure-achievement-item">
                {r(achievement.description || achievement)}
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  const renderSidebar = () => {
    const skillsData = cvData.skills || {};
    const allSkills = [];
    if (skillsData.technical) allSkills.push(...skillsData.technical);
    if (skillsData.soft) allSkills.push(...skillsData.soft);
    if (skillsData.languages) allSkills.push(...skillsData.languages);
    if (Array.isArray(cvData.skills)) allSkills.push(...cvData.skills);

    const languages = cvData.languages || [];

    return (
      <div className="azure-sidebar">
        {allSkills.length > 0 && (
          <div className="azure-sidebar-section">
            <h3 className="azure-sidebar-title">{r(t('skills'))}</h3>
            <div className="azure-skills-list">
              {allSkills.map((skill, idx) => (
                <span key={idx} className="azure-skill-tag">{r(skill.name || skill)}</span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="azure-sidebar-section">
            <h3 className="azure-sidebar-title">{r(t('languages'))}</h3>
            <div className="azure-languages-list">
              {languages.map((lang, idx) => (
                <div key={idx} className="azure-language-item">
                  <span className="azure-language-name">{r(lang.language)}</span>
                  <span className="azure-language-level">{r(lang.proficiency)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`azure-cv-container ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {renderPersonalInfo()}
      <div className="azure-body">
        <div className="azure-main">
          {sections.filter(s => s !== 'skills' && s !== 'languages').map(sectionKey => renderSection(sectionKey))}
        </div>
        {renderSidebar()}
      </div>
    </div>
  );
}

export default CVTemplateAzure;

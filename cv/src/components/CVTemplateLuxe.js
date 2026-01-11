import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './CVTemplateLuxe.css';

/**
 * Luxe Template - Premium gold & black luxury design
 * Best for: Executives, Luxury brands, High-end professionals
 */
function CVTemplateLuxe({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  const r = (text) => text;

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    return (
      <div className="luxe-header">
        <div className="luxe-gold-line top"></div>
        <div className="luxe-header-content">
          <h1 className="luxe-name">{r(info.fullName) || r('Your Name')}</h1>
          {info.headline && <div className="luxe-headline">{r(info.headline)}</div>}
          <div className="luxe-divider">
            <span className="luxe-diamond">◆</span>
          </div>
          <div className="luxe-contact-row">
            {info.email && <span className="luxe-contact-item">{r(info.email)}</span>}
            {info.phone && <span className="luxe-contact-item">{r(info.phone)}</span>}
            {info.location && <span className="luxe-contact-item">{r(info.location)}</span>}
            {info.linkedin && <span className="luxe-contact-item">{r(info.linkedin)}</span>}
            {info.website && <span className="luxe-contact-item">{r(info.website)}</span>}
          </div>
        </div>
        <div className="luxe-gold-line bottom"></div>
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="luxe-section">
        <div className="luxe-section-header">
          <div className="luxe-section-line"></div>
          <h2 className="luxe-section-title">{r(t(sectionKey))}</h2>
          <div className="luxe-section-line right"></div>
        </div>
        <div className="luxe-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <p className="luxe-summary">{r(data) || r('Your professional summary goes here...')}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="luxe-exp-item">
            <div className="luxe-item-header">
              <div className="luxe-item-title-group">
                <h3 className="luxe-exp-title">{r(exp.jobTitle)}</h3>
                <div className="luxe-exp-company">{r(exp.company)}{exp.location && ` • ${r(exp.location)}`}</div>
              </div>
              <span className="luxe-item-date">
                {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
              </span>
            </div>
            {exp.description && <p className="luxe-exp-description">{r(exp.description)}</p>}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="luxe-edu-item">
            <div className="luxe-item-header">
              <div className="luxe-item-title-group">
                <h3 className="luxe-edu-degree">{r(edu.degree)}</h3>
                <div className="luxe-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
              </div>
              <span className="luxe-item-date">{r(edu.graduationDate)}</span>
            </div>
            {edu.gpa && <div className="luxe-edu-gpa">GPA: {r(edu.gpa)}</div>}
          </div>
        ));

      case 'skills':
        const skillsData = data || {};
        const allSkills = [];
        if (skillsData.technical) allSkills.push(...skillsData.technical);
        if (skillsData.soft) allSkills.push(...skillsData.soft);
        if (skillsData.languages) allSkills.push(...skillsData.languages);
        if (Array.isArray(data)) allSkills.push(...data);

        return (
          <div className="luxe-skills-grid">
            {allSkills.map((skill, idx) => (
              <span key={idx} className="luxe-skill-tag">{r(skill.name || skill)}</span>
            ))}
          </div>
        );

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="luxe-cert-item">
            <div className="luxe-item-header">
              <h3 className="luxe-cert-name">{r(cert.name)}</h3>
              <span className="luxe-item-date">{r(cert.date)}</span>
            </div>
            <div className="luxe-cert-issuer">{r(cert.issuer)}</div>
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="luxe-project-item">
            <div className="luxe-item-header">
              <h3 className="luxe-project-name">{r(project.name)}</h3>
              <span className="luxe-item-date">{r(project.date)}</span>
            </div>
            {project.description && <p className="luxe-project-description">{r(project.description)}</p>}
            {project.technologies && (
              <div className="luxe-project-tech">
                {project.technologies.split(',').map((tech, i) => (
                  <span key={i} className="luxe-tech-tag">{tech.trim()}</span>
                ))}
              </div>
            )}
          </div>
        ));

      case 'languages':
        return (
          <div className="luxe-languages-grid">
            {(data || []).map((lang, idx) => (
              <div key={idx} className="luxe-language-item">
                <span className="luxe-language-name">{r(lang.language)}</span>
                <span className="luxe-language-level">{r(lang.proficiency)}</span>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <ul className="luxe-achievements-list">
            {(data || []).map((achievement, idx) => (
              <li key={idx} className="luxe-achievement-item">
                <span className="luxe-diamond-bullet">◆</span>
                {r(achievement.description || achievement)}
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`luxe-cv-container ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {renderPersonalInfo()}
      <div className="luxe-body">
        {sections.map(sectionKey => renderSection(sectionKey))}
      </div>
    </div>
  );
}

export default CVTemplateLuxe;

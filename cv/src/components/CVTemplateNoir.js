import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { renderDescriptionAsBullets } from '../utils/templateHelpers';
import './CVTemplateNoir.css';

/**
 * Noir Template - Dark sophisticated design with silver accents
 * Best for: Creative directors, Artists, Premium industries
 */
function CVTemplateNoir({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  const r = (text) => text;

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    return (
      <div className="noir-header">
        <div className="noir-accent-line"></div>
        <div className="noir-header-content">
          <h1 className="noir-name">{r(info.fullName) || r('Your Name')}</h1>
          {info.headline && <div className="noir-headline">{r(info.headline)}</div>}
          <div className="noir-divider"></div>
          <div className="noir-contact-row">
            {info.email && <span className="noir-contact-item">{r(info.email)}</span>}
            {info.phone && <span className="noir-contact-item">{r(info.phone)}</span>}
            {info.location && <span className="noir-contact-item">{r(info.location)}</span>}
            {info.linkedin && <span className="noir-contact-item">{r(info.linkedin)}</span>}
            {info.website && <span className="noir-contact-item">{r(info.website)}</span>}
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="noir-section">
        <div className="noir-section-header">
          <div className="noir-section-line"></div>
          <h2 className="noir-section-title">{r(t(sectionKey))}</h2>
          <div className="noir-section-line right"></div>
        </div>
        <div className="noir-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <p className="noir-summary">{r(data) || r('Your professional summary goes here...')}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="noir-exp-item">
            <div className="noir-item-header">
              <div className="noir-item-title-group">
                <h3 className="noir-exp-title">{r(exp.jobTitle)}</h3>
                <div className="noir-exp-company">{r(exp.company)}{exp.location && ` • ${r(exp.location)}`}</div>
              </div>
              <span className="noir-item-date">
                {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
              </span>
            </div>
            {renderDescriptionAsBullets(exp.description, 'noir-exp-bullets', r)}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="noir-edu-item">
            <div className="noir-item-header">
              <div className="noir-item-title-group">
                <h3 className="noir-edu-degree">{r(edu.degree)}</h3>
                <div className="noir-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
              </div>
              <span className="noir-item-date">{r(edu.graduationDate)}</span>
            </div>
            {edu.gpa && <div className="noir-edu-gpa">GPA: {r(edu.gpa)}</div>}
          </div>
        ));

      case 'skills':
        const skillsData = data || {};
        const skillsByCategory = {};

        if (skillsData.technical) {
          skillsByCategory['Technical'] = skillsData.technical;
        }
        if (skillsData.soft) {
          skillsByCategory['Soft Skills'] = skillsData.soft;
        }
        if (skillsData.languages) {
          skillsByCategory['Languages'] = skillsData.languages;
        }
        if (Array.isArray(data)) {
          skillsByCategory['Skills'] = data;
        }

        return (
          <div className="noir-skills-container">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category} className="noir-skill-category">
                <div className="noir-skill-category-name">{category}</div>
                <div className="noir-skill-tags">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="noir-skill-tag">{r(skill.name || skill)}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="noir-cert-item">
            <div className="noir-item-header">
              <h3 className="noir-cert-name">{r(cert.name)}</h3>
              <span className="noir-item-date">{r(cert.date)}</span>
            </div>
            <div className="noir-cert-issuer">{r(cert.issuer)}</div>
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="noir-project-item">
            <div className="noir-item-header">
              <h3 className="noir-project-name">{r(project.name)}</h3>
              <span className="noir-item-date">{r(project.date)}</span>
            </div>
            {project.description && <p className="noir-project-description">{r(project.description)}</p>}
            {project.technologies && (
              <div className="noir-project-tech">
                {project.technologies.split(',').map((tech, i) => (
                  <span key={i} className="noir-tech-tag">{tech.trim()}</span>
                ))}
              </div>
            )}
          </div>
        ));

      case 'languages':
        return (
          <div className="noir-languages-grid">
            {(data || []).map((lang, idx) => (
              <div key={idx} className="noir-language-item">
                <span className="noir-language-name">{r(lang.language)}</span>
                <span className="noir-language-level">{r(lang.proficiency)}</span>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <ul className="noir-achievements-list">
            {(data || []).map((achievement, idx) => (
              <li key={idx} className="noir-achievement-item">
                <span className="noir-diamond-bullet">◆</span>
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
    <div className={`noir-cv-container ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {renderPersonalInfo()}
      <div className="noir-body">
        {sections.map(sectionKey => renderSection(sectionKey))}
      </div>
    </div>
  );
}

export default CVTemplateNoir;

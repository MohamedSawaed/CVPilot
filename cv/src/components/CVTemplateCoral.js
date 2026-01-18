import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { renderDescriptionAsBullets } from '../utils/templateHelpers';
import './CVTemplateCoral.css';

/**
 * Coral Template - Warm elegant design with soft coral tones
 * Best for: HR professionals, Healthcare, Education, Hospitality
 */
function CVTemplateCoral({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  const r = (text) => text;

  const getSectionIcon = (sectionKey) => {
    const icons = {
      summary: '"',
      experience: '💼',
      education: '🎓',
      skills: '⚡',
      certifications: '🏆',
      projects: '🚀',
      achievements: '★',
      volunteering: '❤',
      languages: '🌐',
      interests: '○',
      additionalInfo: '◉',
      references: '📋'
    };
    return icons[sectionKey] || '◆';
  };

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    return (
      <div className="coral-header">
        <div className="coral-header-content">
          <h1 className="coral-name">{r(info.fullName) || r('Your Name')}</h1>
          {info.headline && <div className="coral-headline">{r(info.headline)}</div>}
          <div className="coral-contact-row">
            {info.email && (
              <span className="coral-contact-item">
                <span className="coral-contact-icon">✉</span>
                {r(info.email)}
              </span>
            )}
            {info.phone && (
              <span className="coral-contact-item">
                <span className="coral-contact-icon">☎</span>
                {r(info.phone)}
              </span>
            )}
            {info.location && (
              <span className="coral-contact-item">
                <span className="coral-contact-icon">◆</span>
                {r(info.location)}
              </span>
            )}
            {info.linkedin && (
              <span className="coral-contact-item">
                <span className="coral-contact-icon">◈</span>
                {r(info.linkedin)}
              </span>
            )}
            {info.website && (
              <span className="coral-contact-item">
                <span className="coral-contact-icon">◇</span>
                {r(info.website)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="coral-section">
        <div className="coral-section-header">
          <div className="coral-section-icon">{getSectionIcon(sectionKey)}</div>
          <h2 className="coral-section-title">{r(t(sectionKey))}</h2>
          <div className="coral-section-line"></div>
        </div>
        <div className="coral-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return (
          <div className="coral-summary-box">
            <p className="coral-summary">{r(data) || r('Your professional summary goes here...')}</p>
          </div>
        );

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="coral-exp-item">
            <div className="coral-item-header">
              <div className="coral-item-title-group">
                <h3 className="coral-exp-title">{r(exp.jobTitle)}</h3>
                <div className="coral-exp-company">{r(exp.company)}{exp.location && ` • ${r(exp.location)}`}</div>
              </div>
              <span className="coral-item-date">
                {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
              </span>
            </div>
            {renderDescriptionAsBullets(exp.description, 'coral-exp-bullets', r)}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="coral-edu-item">
            <div className="coral-item-header">
              <div className="coral-item-title-group">
                <h3 className="coral-edu-degree">{r(edu.degree)}</h3>
                <div className="coral-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
              </div>
              <span className="coral-item-date">{r(edu.graduationDate)}</span>
            </div>
            {edu.gpa && <div className="coral-edu-gpa">GPA: {r(edu.gpa)}</div>}
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
          <div className="coral-skills-container">
            {allSkills.map((skill, idx) => (
              <span key={idx} className={`coral-skill-tag ${idx < 3 ? 'highlight' : ''}`}>
                {r(skill.name || skill)}
              </span>
            ))}
          </div>
        );

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="coral-cert-item">
            <div className="coral-item-header">
              <div className="coral-cert-info">
                <h3 className="coral-cert-name">{r(cert.name)}</h3>
                <div className="coral-cert-issuer">{r(cert.issuer)}</div>
              </div>
              <span className="coral-item-date">{r(cert.date)}</span>
            </div>
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="coral-project-item">
            <div className="coral-item-header">
              <div className="coral-project-title-group">
                <h3 className="coral-project-name">{r(project.name)}</h3>
                {project.technologies && (
                  <div className="coral-project-tech">
                    {project.technologies.split(',').map((tech, i) => (
                      <span key={i} className="coral-tech-tag">{tech.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
              <span className="coral-item-date">{r(project.date)}</span>
            </div>
            {project.description && <p className="coral-project-description">{r(project.description)}</p>}
          </div>
        ));

      case 'languages':
        return (
          <div className="coral-languages-container">
            {(data || []).map((lang, idx) => (
              <div key={idx} className="coral-language-item">
                <span className="coral-language-name">{r(lang.language)}</span>
                <span className="coral-language-level">{r(lang.proficiency)}</span>
                <div className="coral-language-bar">
                  <div
                    className="coral-language-bar-fill"
                    style={{ width: getLanguageLevelPercent(lang.proficiency) }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <ul className="coral-achievements-list">
            {(data || []).map((achievement, idx) => (
              <li key={idx} className="coral-achievement-item">
                <span className="coral-diamond-bullet">◆</span>
                {r(achievement.description || achievement)}
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  const getLanguageLevelPercent = (level) => {
    const levels = {
      'native': '100%',
      'fluent': '95%',
      'advanced': '85%',
      'intermediate': '65%',
      'basic': '40%',
      'beginner': '25%',
      'اللغة الأم': '100%',
      'طلاقة': '95%',
      'متقدم': '85%',
      'متوسط': '65%',
      'مبتدئ': '25%'
    };
    return levels[level?.toLowerCase()] || '50%';
  };

  return (
    <div className={`coral-cv-container ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {renderPersonalInfo()}
      <div className="coral-body">
        {sections.map(sectionKey => renderSection(sectionKey))}
      </div>
    </div>
  );
}

export default CVTemplateCoral;

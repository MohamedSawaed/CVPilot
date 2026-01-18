import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { renderDescriptionAsBullets } from '../utils/templateHelpers';
import './CVTemplateClassic.css';

/**
 * Classic Template - Traditional, professional black & white design
 * Best for: Corporate, Finance, Legal, Government, Academia
 */
function CVTemplateClassic({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  // Simple pass-through - no reshaping needed for screen display
  // Arabic text displays correctly in modern browsers
  const r = (text) => text;

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    return (
      <div className="classic-header">
        <h1 className="classic-name">{r(info.fullName) || r('YOUR NAME')}</h1>
        <div className="classic-contact-line">
          {info.email && <span>{r(info.email)}</span>}
          {info.phone && <span> • {r(info.phone)}</span>}
          {info.location && <span> • {r(info.location)}</span>}
        </div>
        {(info.linkedin || info.website) && (
          <div className="classic-links-line">
            {info.linkedin && <span>{r('LinkedIn')}: {info.linkedin}</span>}
            {info.website && info.linkedin && <span> • </span>}
            {info.website && <span>{r('Portfolio')}: {info.website}</span>}
          </div>
        )}
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="classic-section">
        <h2 className="classic-section-title">{r(t(sectionKey)).toUpperCase()}</h2>
        <div className="classic-section-divider"></div>
        <div className="classic-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <p className="classic-summary">{r(data) || r('Your professional summary...')}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="classic-exp-item">
            <div className="classic-exp-header">
              <strong className="classic-exp-title">{r(exp.jobTitle)}</strong>
              <span className="classic-exp-date">
                {r(exp.startDate)} – {exp.current ? r(t('present')) : r(exp.endDate)}
              </span>
            </div>
            <div className="classic-exp-company">{r(exp.company)}{exp.location && `, ${r(exp.location)}`}</div>
            {renderDescriptionAsBullets(exp.description, 'classic-exp-bullets', r)}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="classic-edu-item">
            <div className="classic-edu-header">
              <strong className="classic-edu-degree">{r(edu.degree)}</strong>
              <span className="classic-edu-date">{r(edu.graduationDate)}</span>
            </div>
            <div className="classic-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
            {edu.honors && <div className="classic-edu-honors">{r('Honors')}: {r(edu.honors)}</div>}
            {edu.gpa && <div className="classic-edu-gpa">{r('GPA')}: {r(edu.gpa)}</div>}
          </div>
        ));

      case 'skills':
        // Support both new and old skills format
        const skillItems = data?.items || [];
        const hasOldFormat = data?.technicalSkills || data?.softSkills || data?.languages;

        if (skillItems.length > 0) {
          // New format with proficiency levels
          const categoryLabels = {
            technical: r(t('technicalSkills')),
            soft: r(t('softSkills')),
            languages: r(t('languages')),
            tools: r(t('toolsSoftware')),
            frameworks: r(t('frameworksLibraries'))
          };

          const categories = {};
          skillItems.forEach(skill => {
            if (!categories[skill.category]) {
              categories[skill.category] = [];
            }
            categories[skill.category].push(skill);
          });

          const getProficiencyStars = (proficiency) => {
            const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4, master: 5 };
            return levels[proficiency] || 2;
          };

          return (
            <div className="classic-skills">
              {Object.entries(categories).map(([category, skills]) => (
                <div key={category} className="classic-skill-group">
                  <strong>{categoryLabels[category] || r(category)}:</strong>
                  <div className="classic-skill-tags">
                    {skills.map(skill => (
                      <span
                        key={skill.id}
                        className={`classic-skill-tag proficiency-${skill.proficiency}`}
                        title={`${r(skill.name)} - ${r(skill.proficiency)}`}
                      >
                        {r(skill.name)}
                        {skill.proficiency !== 'intermediate' && (
                          <span className="skill-stars">
                            {' '}{'★'.repeat(getProficiencyStars(skill.proficiency))}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        } else if (hasOldFormat) {
          // Old format fallback
          return (
            <div className="classic-skills">
              {data?.technicalSkills?.length > 0 && (
                <div className="classic-skill-row">
                  <strong>{r(t('technicalSkills'))}:</strong> {data.technicalSkills.map(s => r(s)).join(', ')}
                </div>
              )}
              {data?.softSkills?.length > 0 && (
                <div className="classic-skill-row">
                  <strong>{r(t('professionalSkills'))}:</strong> {data.softSkills.map(s => r(s)).join(', ')}
                </div>
              )}
              {data?.languages?.length > 0 && (
                <div className="classic-skill-row">
                  <strong>{r(t('languages'))}:</strong> {data.languages.map(s => r(s)).join(', ')}
                </div>
              )}
            </div>
          );
        }
        return null;

      default:
        if (Array.isArray(data)) {
          return data.map((item, idx) => (
            <div key={idx} className="classic-generic-item">
              <div className="classic-item-header">
                <strong>{r(item.title || item.achievement || item.projectName || item.certification)}</strong>
                {item.date && <span>{r(item.date)}</span>}
              </div>
              {item.issuer && <div className="classic-item-meta">{r(item.issuer)}</div>}
              {item.description && <p className="classic-item-description">{r(item.description)}</p>}
            </div>
          ));
        }
        return <p>{r(JSON.stringify(data))}</p>;
    }
  };

  // Define font based on language
  const fontFamily = isRTL
    ? "'Cairo', 'Noto Sans Hebrew', -apple-system, BlinkMacSystemFont, sans-serif"
    : "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const containerStyle = {
    fontFamily: fontFamily,
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left'
  };

  return (
    <div
      className={`cv-template-classic ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={containerStyle}
    >
      {renderPersonalInfo()}
      <div className="classic-body">
        {sections.filter(s => s !== 'personalInfo').map(renderSection)}
      </div>
    </div>
  );
}

export default CVTemplateClassic;

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { renderDescriptionAsBullets } from '../utils/templateHelpers';
import './CVTemplateElegant.css';

/**
 * Elegant Template - Sophisticated gradient design with purple-rose theme
 * Best for: Creative professionals, Marketing, Design, Modern industries
 */
function CVTemplateElegant({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  const r = (text) => text;

  const getSectionIcon = (sectionKey) => {
    const icons = {
      summary: '◆',
      experience: '◈',
      education: '◇',
      skills: '✦',
      certifications: '✧',
      projects: '❖',
      achievements: '★',
      volunteering: '♥',
      languages: '◎',
      interests: '○',
      additionalInfo: '◉',
      references: '●'
    };
    return icons[sectionKey] || '◆';
  };

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    return (
      <div className="elegant-header">
        <div className="elegant-header-content">
          <h1 className="elegant-name">{r(info.fullName) || r('Your Name')}</h1>
          {info.headline && <div className="elegant-headline">{r(info.headline)}</div>}
          <div className="elegant-contact-row">
            {info.email && <span className="elegant-contact-item">{r(info.email)}</span>}
            {info.phone && <span className="elegant-contact-item">{r(info.phone)}</span>}
            {info.location && <span className="elegant-contact-item">{r(info.location)}</span>}
            {info.linkedin && <span className="elegant-contact-item">{r(info.linkedin)}</span>}
            {info.website && <span className="elegant-contact-item">{r(info.website)}</span>}
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="elegant-section">
        <h2 className="elegant-section-title">
          <span className="elegant-section-icon">{getSectionIcon(sectionKey)}</span>
          {r(t(sectionKey))}
        </h2>
        <div className="elegant-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <p className="elegant-summary">{r(data) || r('Your professional summary goes here...')}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="elegant-exp-item">
            <div className="elegant-item-header">
              <div className="elegant-item-title-group">
                <h3 className="elegant-exp-title">{r(exp.jobTitle)}</h3>
              </div>
              <span className="elegant-item-date">
                {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
              </span>
            </div>
            <div className="elegant-exp-company">{r(exp.company)}{exp.location && ` • ${r(exp.location)}`}</div>
            {renderDescriptionAsBullets(exp.description, 'elegant-exp-bullets', r, isRTL)}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="elegant-edu-item">
            <div className="elegant-item-header">
              <div className="elegant-item-title-group">
                <h3 className="elegant-edu-degree">{r(edu.degree)}</h3>
              </div>
              <span className="elegant-item-date">{r(edu.graduationDate)}</span>
            </div>
            <div className="elegant-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
            {(edu.gpa || edu.honors) && (
              <div className="elegant-edu-details">
                {edu.gpa && `GPA: ${r(edu.gpa)}`}
                {edu.gpa && edu.honors && ' • '}
                {edu.honors && r(edu.honors)}
              </div>
            )}
          </div>
        ));

      case 'skills':
        const skillItems = data?.items || [];
        const hasOldFormat = data?.technicalSkills || data?.softSkills;

        if (skillItems.length > 0) {
          const categories = {};
          skillItems.forEach(skill => {
            const cat = skill.category || 'other';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(skill);
          });

          return (
            <div className="elegant-skills-grid">
              {Object.entries(categories).map(([category, skills]) => (
                <div key={category} className="elegant-skill-category">
                  <div className="elegant-skill-category-title">{r(t(category + 'Skills') || category)}</div>
                  <div className="elegant-skills-list">
                    {skills.map((skill, i) => (
                      <span key={skill.id || i} className="elegant-skill-tag">{r(skill.name)}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        } else if (hasOldFormat) {
          return (
            <div className="elegant-skills-grid">
              {data?.technicalSkills?.length > 0 && (
                <div className="elegant-skill-category">
                  <div className="elegant-skill-category-title">{r(t('technicalSkills'))}</div>
                  <div className="elegant-skills-list">
                    {data.technicalSkills.map((s, i) => (
                      <span key={i} className="elegant-skill-tag">{r(s)}</span>
                    ))}
                  </div>
                </div>
              )}
              {data?.softSkills?.length > 0 && (
                <div className="elegant-skill-category">
                  <div className="elegant-skill-category-title">{r(t('softSkills'))}</div>
                  <div className="elegant-skills-list">
                    {data.softSkills.map((s, i) => (
                      <span key={i} className="elegant-skill-tag">{r(s)}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }
        return null;

      case 'languages':
        return (
          <div className="elegant-lang-row">
            {(data || []).map((lang, idx) => (
              <div key={idx} className="elegant-lang-item">
                <span className="elegant-lang-name">{r(lang.language || lang.name)}</span>
                {lang.proficiency && <span className="elegant-lang-level">{r(lang.proficiency)}</span>}
              </div>
            ))}
          </div>
        );

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="elegant-project-item">
            <div className="elegant-item-header">
              <div className="elegant-item-title-group">
                <h4 className="elegant-item-title">{r(project.projectName || project.title || project.name)}</h4>
              </div>
              {project.date && <span className="elegant-item-date">{r(project.date)}</span>}
            </div>
            {project.technologies && <div className="elegant-project-tech">{r(project.technologies)}</div>}
            {project.description && <p className="elegant-item-description">{r(project.description)}</p>}
          </div>
        ));

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="elegant-generic-item">
            <div className="elegant-item-header">
              <div className="elegant-item-title-group">
                <h4 className="elegant-item-title">{r(cert.certification || cert.title || cert.name)}</h4>
              </div>
              {cert.date && <span className="elegant-item-date">{r(cert.date)}</span>}
            </div>
            {cert.issuer && <div className="elegant-item-meta">{r(cert.issuer)}</div>}
          </div>
        ));

      case 'achievements':
        return (data || []).map((achievement, idx) => (
          <div key={idx} className="elegant-generic-item">
            <div className="elegant-item-header">
              <div className="elegant-item-title-group">
                <h4 className="elegant-item-title">{r(achievement.achievement || achievement.title)}</h4>
              </div>
              {achievement.date && <span className="elegant-item-date">{r(achievement.date)}</span>}
            </div>
            {achievement.description && <p className="elegant-item-description">{r(achievement.description)}</p>}
          </div>
        ));

      case 'volunteering':
        return (data || []).map((vol, idx) => (
          <div key={idx} className="elegant-generic-item">
            <div className="elegant-item-header">
              <div className="elegant-item-title-group">
                <h4 className="elegant-item-title">{r(vol.role || vol.title)}</h4>
              </div>
              <span className="elegant-item-date">
                {r(vol.startDate)} — {vol.current ? r(t('present')) : r(vol.endDate)}
              </span>
            </div>
            <div className="elegant-item-meta">{r(vol.organization)}</div>
            {vol.description && <p className="elegant-item-description">{r(vol.description)}</p>}
          </div>
        ));

      case 'references':
        return (
          <div className="elegant-ref-grid">
            {(data || []).map((ref, idx) => (
              <div key={idx} className="elegant-ref-item">
                <div className="elegant-ref-name">{r(ref.name)}</div>
                {ref.title && <div className="elegant-ref-title">{r(ref.title)}{ref.company && ` at ${r(ref.company)}`}</div>}
                {(ref.email || ref.phone) && (
                  <div className="elegant-ref-contact">
                    {ref.email}{ref.email && ref.phone && ' • '}{ref.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'interests':
        return (
          <div className="elegant-tags">
            {(data || []).map((interest, idx) => {
              const name = typeof interest === 'string' ? interest : (interest.name || interest.interest);
              return <span key={idx} className="elegant-tag">{r(name)}</span>;
            })}
          </div>
        );

      default:
        if (Array.isArray(data)) {
          return data.map((item, idx) => (
            <div key={idx} className="elegant-generic-item">
              <h4 className="elegant-item-title">{r(item.title || item.name || '')}</h4>
              {item.description && <p className="elegant-item-description">{r(item.description)}</p>}
            </div>
          ));
        }
        if (typeof data === 'string') {
          return <p className="elegant-info-text">{r(data)}</p>;
        }
        return null;
    }
  };

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
      className={`cv-template-elegant ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={containerStyle}
    >
      {renderPersonalInfo()}
      <div className="elegant-body">
        {sections.filter(s => s !== 'personalInfo').map(renderSection)}
      </div>
    </div>
  );
}

export default CVTemplateElegant;

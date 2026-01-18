import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { renderDescriptionAsBullets } from '../utils/templateHelpers';
import './CVTemplateExecutive.css';

/**
 * Executive Template - Luxury premium design with navy & gold
 * Best for: Executives, Directors, C-Suite, Senior Leaders
 */
function CVTemplateExecutive({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  const r = (text) => text;

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    return (
      <div className="exec-header">
        <div className="exec-header-gold-bar"></div>
        <div className="exec-header-content">
          <h1 className="exec-name">{r(info.fullName) || r('Your Name')}</h1>
          {info.headline && <div className="exec-headline">{r(info.headline)}</div>}
          <div className="exec-contact">
            {info.email && <span className="exec-contact-item">{r(info.email)}</span>}
            {info.phone && <><span className="exec-divider">|</span><span className="exec-contact-item">{r(info.phone)}</span></>}
            {info.location && <><span className="exec-divider">|</span><span className="exec-contact-item">{r(info.location)}</span></>}
            {info.linkedin && <><span className="exec-divider">|</span><span className="exec-contact-item">{r(info.linkedin)}</span></>}
          </div>
        </div>
        <div className="exec-header-gold-line"></div>
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="exec-section">
        <div className="exec-section-header">
          <h2 className="exec-section-title">{r(t(sectionKey))}</h2>
          <div className="exec-section-line"></div>
        </div>
        <div className="exec-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <p className="exec-summary">{r(data) || r('Your professional summary goes here...')}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="exec-exp-item">
            <div className="exec-item-header">
              <div className="exec-item-title-group">
                <h3 className="exec-exp-title">{r(exp.jobTitle)}</h3>
                <div className="exec-exp-company">{r(exp.company)}{exp.location && ` — ${r(exp.location)}`}</div>
              </div>
              <span className="exec-item-date">
                {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
              </span>
            </div>
            {renderDescriptionAsBullets(exp.description, 'exec-exp-bullets', r)}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="exec-edu-item">
            <div className="exec-item-header">
              <div className="exec-item-title-group">
                <h3 className="exec-edu-degree">{r(edu.degree)}</h3>
                <div className="exec-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
              </div>
              <span className="exec-item-date">{r(edu.graduationDate)}</span>
            </div>
            {(edu.gpa || edu.honors) && (
              <div className="exec-edu-details">
                {edu.gpa && `GPA: ${r(edu.gpa)}`}
                {edu.gpa && edu.honors && ' | '}
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
            <div className="exec-skills-grid">
              {Object.entries(categories).map(([category, skills]) => (
                <div key={category} className="exec-skill-category">
                  <div className="exec-skill-category-title">{r(t(category + 'Skills') || category)}</div>
                  <div className="exec-skills-list">
                    {skills.map(skill => r(skill.name)).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          );
        } else if (hasOldFormat) {
          return (
            <div className="exec-skills-grid">
              {data?.technicalSkills?.length > 0 && (
                <div className="exec-skill-category">
                  <div className="exec-skill-category-title">{r(t('technicalSkills'))}</div>
                  <div className="exec-skills-list">{data.technicalSkills.map(s => r(s)).join(' • ')}</div>
                </div>
              )}
              {data?.softSkills?.length > 0 && (
                <div className="exec-skill-category">
                  <div className="exec-skill-category-title">{r(t('softSkills'))}</div>
                  <div className="exec-skills-list">{data.softSkills.map(s => r(s)).join(' • ')}</div>
                </div>
              )}
            </div>
          );
        }
        return null;

      case 'languages':
        return (
          <div className="exec-lang-grid">
            {(data || []).map((lang, idx) => (
              <div key={idx} className="exec-lang-item">
                <div className="exec-lang-name">{r(lang.language || lang.name)}</div>
                {lang.proficiency && <div className="exec-lang-level">{r(lang.proficiency)}</div>}
              </div>
            ))}
          </div>
        );

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="exec-generic-item">
            <div className="exec-item-header">
              <div className="exec-item-title-group">
                <h4 className="exec-item-title">{r(cert.certification || cert.title || cert.name)}</h4>
                {cert.issuer && <div className="exec-item-meta">{r(cert.issuer)}</div>}
              </div>
              {cert.date && <span className="exec-item-date">{r(cert.date)}</span>}
            </div>
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="exec-generic-item">
            <div className="exec-item-header">
              <div className="exec-item-title-group">
                <h4 className="exec-item-title">{r(project.projectName || project.title || project.name)}</h4>
                {project.technologies && <div className="exec-item-meta">{r(project.technologies)}</div>}
              </div>
              {project.date && <span className="exec-item-date">{r(project.date)}</span>}
            </div>
            {project.description && <p className="exec-item-description">{r(project.description)}</p>}
          </div>
        ));

      case 'achievements':
        return (data || []).map((achievement, idx) => (
          <div key={idx} className="exec-generic-item">
            <div className="exec-item-header">
              <div className="exec-item-title-group">
                <h4 className="exec-item-title">{r(achievement.achievement || achievement.title)}</h4>
              </div>
              {achievement.date && <span className="exec-item-date">{r(achievement.date)}</span>}
            </div>
            {achievement.description && <p className="exec-item-description">{r(achievement.description)}</p>}
          </div>
        ));

      case 'volunteering':
        return (data || []).map((vol, idx) => (
          <div key={idx} className="exec-generic-item">
            <div className="exec-item-header">
              <div className="exec-item-title-group">
                <h4 className="exec-item-title">{r(vol.role || vol.title)}</h4>
                <div className="exec-item-meta">{r(vol.organization)}</div>
              </div>
              <span className="exec-item-date">
                {r(vol.startDate)} — {vol.current ? r(t('present')) : r(vol.endDate)}
              </span>
            </div>
            {vol.description && <p className="exec-item-description">{r(vol.description)}</p>}
          </div>
        ));

      case 'references':
        return (
          <div className="exec-ref-grid">
            {(data || []).map((ref, idx) => (
              <div key={idx} className="exec-ref-item">
                <div className="exec-ref-name">{r(ref.name)}</div>
                {ref.title && <div className="exec-ref-title">{r(ref.title)}{ref.company && `, ${r(ref.company)}`}</div>}
                {(ref.email || ref.phone) && (
                  <div className="exec-ref-contact">
                    {ref.email}{ref.email && ref.phone && ' | '}{ref.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'interests':
        return (
          <div className="exec-tags-container">
            {(data || []).map((interest, idx) => {
              const name = typeof interest === 'string' ? interest : (interest.name || interest.interest);
              return <span key={idx} className="exec-tag">{r(name)}</span>;
            })}
          </div>
        );

      default:
        if (Array.isArray(data)) {
          return data.map((item, idx) => (
            <div key={idx} className="exec-generic-item">
              <h4 className="exec-item-title">{r(item.title || item.name || '')}</h4>
              {item.description && <p className="exec-item-description">{r(item.description)}</p>}
            </div>
          ));
        }
        if (typeof data === 'string') {
          return <p className="exec-info-text">{r(data)}</p>;
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
      className={`cv-template-executive ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={containerStyle}
    >
      {renderPersonalInfo()}
      <div className="exec-body">
        {sections.filter(s => s !== 'personalInfo').map(renderSection)}
      </div>
    </div>
  );
}

export default CVTemplateExecutive;

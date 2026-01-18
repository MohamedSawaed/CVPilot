import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { renderDescriptionAsBullets } from '../utils/templateHelpers';
import './CVTemplateMinimal.css';

/**
 * Minimal Template - Clean whitespace design with Swiss typography
 * Best for: Designers, Architects, Minimalists, Creatives
 */
function CVTemplateMinimal({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  const r = (text) => text;

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    const contactItems = [
      info.email,
      info.phone,
      info.location,
      info.linkedin,
      info.website
    ].filter(Boolean);

    return (
      <div className="min-header">
        <h1 className="min-name">{r(info.fullName) || r('Your Name')}</h1>
        {info.headline && <div className="min-headline">{r(info.headline)}</div>}
        <div className="min-contact">
          {contactItems.map((item, idx) => (
            <span key={idx} className="min-contact-item">{r(item)}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="min-section">
        <h2 className="min-section-title">{r(t(sectionKey))}</h2>
        <div className="min-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <p className="min-summary">{r(data) || r('Your professional summary goes here...')}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="min-exp-item">
            <div className="min-item-header">
              <div className="min-item-title-group">
                <h3 className="min-exp-title">{r(exp.jobTitle)}</h3>
              </div>
              <span className="min-item-date">
                {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
              </span>
            </div>
            <div className="min-exp-company">{r(exp.company)}{exp.location && ` — ${r(exp.location)}`}</div>
            {renderDescriptionAsBullets(exp.description, 'min-exp-bullets', r, isRTL)}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="min-edu-item">
            <div className="min-item-header">
              <div className="min-item-title-group">
                <h3 className="min-edu-degree">{r(edu.degree)}</h3>
              </div>
              <span className="min-item-date">{r(edu.graduationDate)}</span>
            </div>
            <div className="min-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
            {(edu.gpa || edu.honors) && (
              <div className="min-edu-details">
                {edu.gpa && `GPA: ${r(edu.gpa)}`}
                {edu.gpa && edu.honors && ' · '}
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
            <div className="min-skills-row">
              {Object.entries(categories).map(([category, skills]) => (
                <div key={category} className="min-skill-category">
                  <div className="min-skill-category-title">{r(t(category + 'Skills') || category)}</div>
                  <div className="min-skills-list">
                    {skills.map(skill => r(skill.name)).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          );
        } else if (hasOldFormat) {
          return (
            <div className="min-skills-row">
              {data?.technicalSkills?.length > 0 && (
                <div className="min-skill-category">
                  <div className="min-skill-category-title">{r(t('technicalSkills'))}</div>
                  <div className="min-skills-list">{data.technicalSkills.map(s => r(s)).join(', ')}</div>
                </div>
              )}
              {data?.softSkills?.length > 0 && (
                <div className="min-skill-category">
                  <div className="min-skill-category-title">{r(t('softSkills'))}</div>
                  <div className="min-skills-list">{data.softSkills.map(s => r(s)).join(', ')}</div>
                </div>
              )}
            </div>
          );
        }
        return null;

      case 'languages':
        return (
          <div className="min-lang-row">
            {(data || []).map((lang, idx) => (
              <div key={idx} className="min-lang-item">
                <span className="min-lang-name">{r(lang.language || lang.name)}</span>
                {lang.proficiency && <span className="min-lang-level">{r(lang.proficiency)}</span>}
              </div>
            ))}
          </div>
        );

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="min-generic-item">
            <div className="min-item-header">
              <div className="min-item-title-group">
                <h4 className="min-item-title">{r(cert.certification || cert.title || cert.name)}</h4>
              </div>
              {cert.date && <span className="min-item-date">{r(cert.date)}</span>}
            </div>
            {cert.issuer && <div className="min-item-meta">{r(cert.issuer)}</div>}
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="min-generic-item">
            <div className="min-item-header">
              <div className="min-item-title-group">
                <h4 className="min-item-title">{r(project.projectName || project.title || project.name)}</h4>
              </div>
              {project.date && <span className="min-item-date">{r(project.date)}</span>}
            </div>
            {project.technologies && <div className="min-item-meta">{r(project.technologies)}</div>}
            {project.description && <p className="min-item-description">{r(project.description)}</p>}
          </div>
        ));

      case 'achievements':
        return (data || []).map((achievement, idx) => (
          <div key={idx} className="min-generic-item">
            <div className="min-item-header">
              <div className="min-item-title-group">
                <h4 className="min-item-title">{r(achievement.achievement || achievement.title)}</h4>
              </div>
              {achievement.date && <span className="min-item-date">{r(achievement.date)}</span>}
            </div>
            {achievement.description && <p className="min-item-description">{r(achievement.description)}</p>}
          </div>
        ));

      case 'volunteering':
        return (data || []).map((vol, idx) => (
          <div key={idx} className="min-generic-item">
            <div className="min-item-header">
              <div className="min-item-title-group">
                <h4 className="min-item-title">{r(vol.role || vol.title)}</h4>
              </div>
              <span className="min-item-date">
                {r(vol.startDate)} — {vol.current ? r(t('present')) : r(vol.endDate)}
              </span>
            </div>
            <div className="min-item-meta">{r(vol.organization)}</div>
            {vol.description && <p className="min-item-description">{r(vol.description)}</p>}
          </div>
        ));

      case 'references':
        return (
          <div className="min-ref-row">
            {(data || []).map((ref, idx) => (
              <div key={idx} className="min-ref-item">
                <div className="min-ref-name">{r(ref.name)}</div>
                {ref.title && <div className="min-ref-title">{r(ref.title)}{ref.company && `, ${r(ref.company)}`}</div>}
                {(ref.email || ref.phone) && (
                  <div className="min-ref-contact">
                    {ref.email}{ref.email && ref.phone && ' · '}{ref.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'interests':
        return (
          <div className="min-tags">
            {(data || []).map((interest, idx) => {
              const name = typeof interest === 'string' ? interest : (interest.name || interest.interest);
              return <span key={idx} className="min-tag">{r(name)}</span>;
            })}
          </div>
        );

      default:
        if (Array.isArray(data)) {
          return data.map((item, idx) => (
            <div key={idx} className="min-generic-item">
              <h4 className="min-item-title">{r(item.title || item.name || '')}</h4>
              {item.description && <p className="min-item-description">{r(item.description)}</p>}
            </div>
          ));
        }
        if (typeof data === 'string') {
          return <p className="min-info-text">{r(data)}</p>;
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
      className={`cv-template-minimal ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={containerStyle}
    >
      {renderPersonalInfo()}
      <div className="min-body">
        {sections.filter(s => s !== 'personalInfo').map(renderSection)}
      </div>
    </div>
  );
}

export default CVTemplateMinimal;

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './CVTemplateBold.css';

/**
 * Bold Template - Striking dark sidebar with vibrant orange accent
 * Best for: Creative Directors, Brand Managers, Visual Artists, Entrepreneurs
 */
function CVTemplateBold({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  const r = (text) => text;

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'CV';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const renderSidebar = () => {
    const info = cvData.personalInfo;
    const skills = cvData.skills;
    const languages = cvData.languages;

    return (
      <div className="bold-sidebar">
        {/* Avatar */}
        <div className="bold-avatar">
          {getInitials(info.fullName)}
        </div>

        {/* Name */}
        <h1 className="bold-name">{r(info.fullName) || r('Your Name')}</h1>
        {info.headline && <div className="bold-headline">{r(info.headline)}</div>}

        {/* Contact */}
        <div className="bold-contact">
          {info.email && (
            <div className="bold-contact-item">
              <span className="bold-contact-icon">@</span>
              <span>{r(info.email)}</span>
            </div>
          )}
          {info.phone && (
            <div className="bold-contact-item">
              <span className="bold-contact-icon">#</span>
              <span>{r(info.phone)}</span>
            </div>
          )}
          {info.location && (
            <div className="bold-contact-item">
              <span className="bold-contact-icon">◎</span>
              <span>{r(info.location)}</span>
            </div>
          )}
          {info.linkedin && (
            <div className="bold-contact-item">
              <span className="bold-contact-icon">in</span>
              <span>{r(info.linkedin.replace(/.*linkedin\.com\/in\//, ''))}</span>
            </div>
          )}
          {info.website && (
            <div className="bold-contact-item">
              <span className="bold-contact-icon">~</span>
              <span>{r(info.website.replace(/https?:\/\//, ''))}</span>
            </div>
          )}
        </div>

        {/* Skills in Sidebar */}
        {skills && (
          <div className="bold-sidebar-section">
            <h3 className="bold-sidebar-title">{t('skills')}</h3>
            {renderSidebarSkills()}
          </div>
        )}

        {/* Languages in Sidebar */}
        {languages && languages.length > 0 && (
          <div className="bold-sidebar-section">
            <h3 className="bold-sidebar-title">{t('languages')}</h3>
            <div className="bold-languages">
              {languages.map((lang, idx) => (
                <div key={idx} className="bold-lang-item">
                  <span className="bold-lang-name">{r(lang.language || lang.name)}</span>
                  {lang.proficiency && (
                    <div className="bold-lang-bar">
                      <div
                        className="bold-lang-fill"
                        style={{ width: getProficiencyWidth(lang.proficiency) }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getProficiencyWidth = (proficiency) => {
    const level = proficiency.toLowerCase();
    if (level.includes('native') || level.includes('fluent') || level.includes('c2')) return '100%';
    if (level.includes('advanced') || level.includes('c1')) return '85%';
    if (level.includes('professional') || level.includes('b2')) return '70%';
    if (level.includes('intermediate') || level.includes('b1')) return '55%';
    if (level.includes('elementary') || level.includes('a2')) return '40%';
    if (level.includes('basic') || level.includes('a1')) return '25%';
    return '60%';
  };

  const renderSidebarSkills = () => {
    const data = cvData.skills;
    const skillItems = data?.items || [];
    const hasOldFormat = data?.technicalSkills || data?.softSkills;

    if (skillItems.length > 0) {
      return (
        <div className="bold-skill-bars">
          {skillItems.slice(0, 8).map((skill, idx) => (
            <div key={skill.id || idx} className="bold-skill-bar-item">
              <div className="bold-skill-name">{r(skill.name)}</div>
              <div className="bold-skill-bar">
                <div className="bold-skill-fill" style={{ width: `${80 + Math.random() * 20}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (hasOldFormat) {
      const allSkills = [...(data.technicalSkills || []), ...(data.softSkills || [])];
      return (
        <div className="bold-skill-bars">
          {allSkills.slice(0, 8).map((skill, idx) => (
            <div key={idx} className="bold-skill-bar-item">
              <div className="bold-skill-name">{r(skill)}</div>
              <div className="bold-skill-bar">
                <div className="bold-skill-fill" style={{ width: `${80 + Math.random() * 20}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderMainContent = () => {
    // Filter out sections that are in sidebar
    const mainSections = sections.filter(s =>
      s !== 'personalInfo' && s !== 'skills' && s !== 'languages'
    );

    return (
      <div className="bold-main">
        {mainSections.map(renderSection)}
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="bold-section">
        <h2 className="bold-section-title">{r(t(sectionKey))}</h2>
        <div className="bold-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <p className="bold-summary">{r(data) || r('Your professional summary goes here...')}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="bold-exp-item">
            <div className="bold-item-header">
              <div className="bold-item-title-group">
                <h3 className="bold-exp-title">{r(exp.jobTitle)}</h3>
                <div className="bold-exp-company">{r(exp.company)}{exp.location && ` • ${r(exp.location)}`}</div>
              </div>
              <span className="bold-item-date">
                {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
              </span>
            </div>
            {exp.description && <p className="bold-exp-description">{r(exp.description)}</p>}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="bold-edu-item">
            <div className="bold-item-header">
              <div className="bold-item-title-group">
                <h3 className="bold-edu-degree">{r(edu.degree)}</h3>
                <div className="bold-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
              </div>
              <span className="bold-item-date">{r(edu.graduationDate)}</span>
            </div>
            {(edu.gpa || edu.honors) && (
              <div className="bold-edu-details">
                {edu.gpa && `GPA: ${r(edu.gpa)}`}
                {edu.gpa && edu.honors && ' • '}
                {edu.honors && r(edu.honors)}
              </div>
            )}
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="bold-project-item">
            <div className="bold-item-header">
              <div className="bold-item-title-group">
                <h4 className="bold-item-title">{r(project.projectName || project.title || project.name)}</h4>
              </div>
              {project.date && <span className="bold-item-date">{r(project.date)}</span>}
            </div>
            {project.technologies && <div className="bold-project-tech">{r(project.technologies)}</div>}
            {project.description && <p className="bold-item-description">{r(project.description)}</p>}
          </div>
        ));

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="bold-generic-item">
            <div className="bold-item-header">
              <div className="bold-item-title-group">
                <h4 className="bold-item-title">{r(cert.certification || cert.title || cert.name)}</h4>
              </div>
              {cert.date && <span className="bold-item-date">{r(cert.date)}</span>}
            </div>
            {cert.issuer && <div className="bold-item-meta">{r(cert.issuer)}</div>}
          </div>
        ));

      case 'achievements':
        return (data || []).map((achievement, idx) => (
          <div key={idx} className="bold-generic-item">
            <div className="bold-item-header">
              <div className="bold-item-title-group">
                <h4 className="bold-item-title">{r(achievement.achievement || achievement.title)}</h4>
              </div>
              {achievement.date && <span className="bold-item-date">{r(achievement.date)}</span>}
            </div>
            {achievement.description && <p className="bold-item-description">{r(achievement.description)}</p>}
          </div>
        ));

      case 'volunteering':
        return (data || []).map((vol, idx) => (
          <div key={idx} className="bold-generic-item">
            <div className="bold-item-header">
              <div className="bold-item-title-group">
                <h4 className="bold-item-title">{r(vol.role || vol.title)}</h4>
              </div>
              <span className="bold-item-date">
                {r(vol.startDate)} — {vol.current ? r(t('present')) : r(vol.endDate)}
              </span>
            </div>
            <div className="bold-item-meta">{r(vol.organization)}</div>
            {vol.description && <p className="bold-item-description">{r(vol.description)}</p>}
          </div>
        ));

      case 'references':
        return (
          <div className="bold-ref-grid">
            {(data || []).map((ref, idx) => (
              <div key={idx} className="bold-ref-item">
                <div className="bold-ref-name">{r(ref.name)}</div>
                {ref.title && <div className="bold-ref-title">{r(ref.title)}{ref.company && ` at ${r(ref.company)}`}</div>}
                {(ref.email || ref.phone) && (
                  <div className="bold-ref-contact">
                    {ref.email}{ref.email && ref.phone && ' • '}{ref.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'interests':
        return (
          <div className="bold-tags">
            {(data || []).map((interest, idx) => {
              const name = typeof interest === 'string' ? interest : (interest.name || interest.interest);
              return <span key={idx} className="bold-tag">{r(name)}</span>;
            })}
          </div>
        );

      default:
        if (Array.isArray(data)) {
          return data.map((item, idx) => (
            <div key={idx} className="bold-generic-item">
              <h4 className="bold-item-title">{r(item.title || item.name || '')}</h4>
              {item.description && <p className="bold-item-description">{r(item.description)}</p>}
            </div>
          ));
        }
        if (typeof data === 'string') {
          return <p className="bold-info-text">{r(data)}</p>;
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
      className={`cv-template-bold ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={containerStyle}
    >
      {renderSidebar()}
      {renderMainContent()}
    </div>
  );
}

export default CVTemplateBold;

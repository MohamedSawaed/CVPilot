import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { renderDescriptionAsBullets } from '../utils/templateHelpers';
import './CVTemplateTech.css';

/**
 * Tech Template - Developer-focused with terminal aesthetics
 * Best for: Developers, Engineers, DevOps, Tech Leads
 */
function CVTemplateTech({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  const r = (text) => text;

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    return (
      <div className="tech-header">
        <div className="tech-header-prompt">$ whoami</div>
        <h1 className="tech-name">
          <span className="tech-prompt-symbol">&gt;</span>
          {r(info.fullName) || r('Your Name')}
        </h1>
        {info.headline && <div className="tech-headline">{r(info.headline)}</div>}
        <div className="tech-contact-row">
          {info.email && (
            <span className="tech-contact-item">
              <span className="tech-contact-icon">@</span> {r(info.email)}
            </span>
          )}
          {info.github && (
            <span className="tech-contact-item tech-link">
              <span className="tech-contact-icon">gh/</span>
              {r(info.github.replace(/.*github\.com\//, ''))}
            </span>
          )}
          {info.linkedin && (
            <span className="tech-contact-item tech-link">
              <span className="tech-contact-icon">in/</span>
              {r(info.linkedin.replace(/.*linkedin\.com\/in\//, ''))}
            </span>
          )}
          {info.website && (
            <span className="tech-contact-item tech-link">
              <span className="tech-contact-icon">~</span>
              {r(info.website.replace(/https?:\/\//, ''))}
            </span>
          )}
        </div>
      </div>
    );
  };

  const getSectionIcon = (sectionKey) => {
    const icons = {
      summary: '#',
      experience: '>',
      education: '$',
      skills: '{',
      certifications: '@',
      projects: '</>',
      achievements: '★',
      volunteering: '♥',
      languages: 'λ',
      interests: '~',
      additionalInfo: '+',
      references: '&'
    };
    return icons[sectionKey] || '•';
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="tech-section">
        <h2 className="tech-section-title">
          <span className="tech-section-icon">{getSectionIcon(sectionKey)}</span>
          {r(t(sectionKey))}
        </h2>
        <div className="tech-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <p className="tech-summary">{r(data) || r('Your professional summary goes here...')}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="tech-exp-item">
            <div className="tech-item-header">
              <div className="tech-item-title-group">
                <h3 className="tech-exp-title">{r(exp.jobTitle)}</h3>
              </div>
              <span className="tech-item-date">
                {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
              </span>
            </div>
            <div className="tech-exp-company">{r(exp.company)}{exp.location && ` @ ${r(exp.location)}`}</div>
            {renderDescriptionAsBullets(exp.description, 'tech-exp-bullets', r, isRTL)}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="tech-edu-item">
            <div className="tech-item-header">
              <div className="tech-item-title-group">
                <h3 className="tech-edu-degree">{r(edu.degree)}</h3>
              </div>
              <span className="tech-item-date">{r(edu.graduationDate)}</span>
            </div>
            <div className="tech-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
            {(edu.gpa || edu.honors) && (
              <div className="tech-edu-details">
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

          return Object.entries(categories).map(([category, skills], idx) => (
            <div key={category} className="tech-skills-block">
              <div className="tech-skills-header">// {r(t(category + 'Skills') || category)}</div>
              <div className="tech-skills-list">
                {skills.map((skill, i) => (
                  <span key={skill.id || i} className={`tech-skill-tag ${i < 3 ? 'primary' : ''}`}>
                    {r(skill.name)}
                  </span>
                ))}
              </div>
            </div>
          ));
        } else if (hasOldFormat) {
          return (
            <>
              {data?.technicalSkills?.length > 0 && (
                <div className="tech-skills-block">
                  <div className="tech-skills-header">// {r(t('technicalSkills'))}</div>
                  <div className="tech-skills-list">
                    {data.technicalSkills.map((s, i) => (
                      <span key={i} className={`tech-skill-tag ${i < 3 ? 'primary' : ''}`}>{r(s)}</span>
                    ))}
                  </div>
                </div>
              )}
              {data?.softSkills?.length > 0 && (
                <div className="tech-skills-block">
                  <div className="tech-skills-header">// {r(t('softSkills'))}</div>
                  <div className="tech-skills-list">
                    {data.softSkills.map((s, i) => (
                      <span key={i} className="tech-skill-tag">{r(s)}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        }
        return null;

      case 'languages':
        return (data || []).map((lang, idx) => (
          <div key={idx} className="tech-lang-item">
            <span className="tech-lang-name">{r(lang.language || lang.name)}</span>
            {lang.proficiency && <span className="tech-lang-level">{r(lang.proficiency)}</span>}
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="tech-project-item">
            <div className="tech-project-header">
              <span className="tech-project-icon">📁</span>
              <span className="tech-project-name">{r(project.projectName || project.title || project.name)}</span>
            </div>
            {project.technologies && <div className="tech-project-tech">{r(project.technologies)}</div>}
            {project.description && <p className="tech-project-description">{r(project.description)}</p>}
          </div>
        ));

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="tech-generic-item">
            <div className="tech-item-header">
              <div className="tech-item-title-group">
                <h4 className="tech-item-title">{r(cert.certification || cert.title || cert.name)}</h4>
              </div>
              {cert.date && <span className="tech-item-date">{r(cert.date)}</span>}
            </div>
            {cert.issuer && <div className="tech-item-meta">{r(cert.issuer)}</div>}
          </div>
        ));

      case 'achievements':
        return (data || []).map((achievement, idx) => (
          <div key={idx} className="tech-generic-item">
            <div className="tech-item-header">
              <div className="tech-item-title-group">
                <h4 className="tech-item-title">{r(achievement.achievement || achievement.title)}</h4>
              </div>
              {achievement.date && <span className="tech-item-date">{r(achievement.date)}</span>}
            </div>
            {achievement.description && <p className="tech-item-description">{r(achievement.description)}</p>}
          </div>
        ));

      case 'volunteering':
        return (data || []).map((vol, idx) => (
          <div key={idx} className="tech-generic-item">
            <div className="tech-item-header">
              <div className="tech-item-title-group">
                <h4 className="tech-item-title">{r(vol.role || vol.title)}</h4>
              </div>
              <span className="tech-item-date">
                {r(vol.startDate)} — {vol.current ? r(t('present')) : r(vol.endDate)}
              </span>
            </div>
            <div className="tech-item-meta">{r(vol.organization)}</div>
            {vol.description && <p className="tech-item-description">{r(vol.description)}</p>}
          </div>
        ));

      case 'references':
        return (data || []).map((ref, idx) => (
          <div key={idx} className="tech-ref-item">
            <div className="tech-ref-name">{r(ref.name)}</div>
            {ref.title && <div className="tech-ref-title">{r(ref.title)}{ref.company && ` @ ${r(ref.company)}`}</div>}
            {(ref.email || ref.phone) && (
              <div className="tech-ref-contact">
                {ref.email}{ref.email && ref.phone && ' | '}{ref.phone}
              </div>
            )}
          </div>
        ));

      case 'interests':
        return (
          <div className="tech-tags">
            {(data || []).map((interest, idx) => {
              const name = typeof interest === 'string' ? interest : (interest.name || interest.interest);
              return <span key={idx} className="tech-tag">{r(name)}</span>;
            })}
          </div>
        );

      default:
        if (Array.isArray(data)) {
          return data.map((item, idx) => (
            <div key={idx} className="tech-generic-item">
              <h4 className="tech-item-title">{r(item.title || item.name || '')}</h4>
              {item.description && <p className="tech-item-description">{r(item.description)}</p>}
            </div>
          ));
        }
        if (typeof data === 'string') {
          return <p className="tech-info-text">{r(data)}</p>;
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
      className={`cv-template-tech ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={containerStyle}
    >
      {renderPersonalInfo()}
      <div className="tech-body">
        {sections.filter(s => s !== 'personalInfo').map(renderSection)}
      </div>
    </div>
  );
}

export default CVTemplateTech;

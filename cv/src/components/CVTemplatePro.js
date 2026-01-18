import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { renderDescriptionAsBullets } from '../utils/templateHelpers';
import './CVTemplatePro.css';

/**
 * Pro Template - Ultimate Two-Column Professional CV
 * Best for: All professionals, Smart layout, Maximum impact
 * Features: Left sidebar with photo/skills/languages, Right main content
 * Full RTL support for Arabic and Hebrew
 */
function CVTemplatePro({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL, language } = useLanguage();

  const r = (text) => text;

  // Sections that go in the sidebar (left in LTR, right in RTL)
  const sidebarSections = ['skills', 'languages', 'certifications', 'interests'];

  // Sections that go in the main area
  const mainSections = ['summary', 'experience', 'education', 'projects', 'achievements', 'volunteering', 'references'];

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    const initials = info.fullName
      ? info.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
      : 'CV';

    return (
      <div className="pro-header">
        <div className="pro-avatar">
          <span className="pro-initials">{initials}</span>
        </div>
        <h1 className="pro-name">{r(info.fullName) || r('Your Name')}</h1>
        {info.headline && <div className="pro-headline">{r(info.headline)}</div>}
        <div className="pro-contact-grid">
          {info.email && (
            <div className="pro-contact-item">
              <span className="pro-contact-icon">✉</span>
              <span>{r(info.email)}</span>
            </div>
          )}
          {info.phone && (
            <div className="pro-contact-item">
              <span className="pro-contact-icon">✆</span>
              <span>{r(info.phone)}</span>
            </div>
          )}
          {info.location && (
            <div className="pro-contact-item">
              <span className="pro-contact-icon">◎</span>
              <span>{r(info.location)}</span>
            </div>
          )}
          {info.linkedin && (
            <div className="pro-contact-item">
              <span className="pro-contact-icon">in</span>
              <span>{r(info.linkedin)}</span>
            </div>
          )}
          {info.website && (
            <div className="pro-contact-item">
              <span className="pro-contact-icon">⌘</span>
              <span>{r(info.website)}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSidebarSection = (sectionKey) => {
    const data = cvData[sectionKey];
    if (!data || (Array.isArray(data) && data.length === 0)) return null;

    return (
      <div key={sectionKey} className="pro-sidebar-section">
        <h3 className="pro-sidebar-title">{r(t(sectionKey))}</h3>
        <div className="pro-sidebar-content">
          {renderSidebarContent(sectionKey, data)}
        </div>
      </div>
    );
  };

  const renderSidebarContent = (sectionKey, data) => {
    switch (sectionKey) {
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

          return Object.entries(categories).map(([category, skills]) => (
            <div key={category} className="pro-skill-category">
              <div className="pro-skill-category-name">{r(t(category + 'Skills') || category)}</div>
              <div className="pro-skill-tags">
                {skills.map((skill, idx) => (
                  <span key={idx} className="pro-skill-tag">{r(skill.name)}</span>
                ))}
              </div>
            </div>
          ));
        } else if (hasOldFormat) {
          return (
            <>
              {data?.technicalSkills?.length > 0 && (
                <div className="pro-skill-category">
                  <div className="pro-skill-category-name">{r(t('technicalSkills'))}</div>
                  <div className="pro-skill-tags">
                    {data.technicalSkills.map((s, idx) => (
                      <span key={idx} className="pro-skill-tag">{r(s)}</span>
                    ))}
                  </div>
                </div>
              )}
              {data?.softSkills?.length > 0 && (
                <div className="pro-skill-category">
                  <div className="pro-skill-category-name">{r(t('softSkills'))}</div>
                  <div className="pro-skill-tags">
                    {data.softSkills.map((s, idx) => (
                      <span key={idx} className="pro-skill-tag">{r(s)}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        } else if (Array.isArray(data)) {
          return (
            <div className="pro-skill-tags">
              {data.map((skill, idx) => (
                <span key={idx} className="pro-skill-tag">{r(typeof skill === 'string' ? skill : skill.name)}</span>
              ))}
            </div>
          );
        }
        return null;

      case 'languages':
        return (
          <div className="pro-languages-list">
            {(data || []).map((lang, idx) => (
              <div key={idx} className="pro-language-item">
                <span className="pro-language-name">{r(lang.language || lang.name)}</span>
                {lang.proficiency && (
                  <span className="pro-language-level">{r(lang.proficiency)}</span>
                )}
              </div>
            ))}
          </div>
        );

      case 'certifications':
        return (
          <div className="pro-cert-list">
            {(data || []).map((cert, idx) => (
              <div key={idx} className="pro-cert-item">
                <div className="pro-cert-name">{r(cert.certification || cert.title || cert.name)}</div>
                {cert.issuer && <div className="pro-cert-issuer">{r(cert.issuer)}</div>}
                {cert.date && <div className="pro-cert-date">{r(cert.date)}</div>}
              </div>
            ))}
          </div>
        );

      case 'interests':
        return (
          <div className="pro-interests-list">
            {(data || []).map((interest, idx) => {
              const name = typeof interest === 'string' ? interest : (interest.name || interest.interest);
              return <span key={idx} className="pro-interest-tag">{r(name)}</span>;
            })}
          </div>
        );

      default:
        return null;
    }
  };

  const renderMainSection = (sectionKey) => {
    const data = cvData[sectionKey];
    if (!data || (Array.isArray(data) && data.length === 0)) return null;
    if (sectionKey === 'summary' && !data) return null;

    return (
      <div key={sectionKey} className="pro-main-section">
        <h2 className="pro-section-title">
          <span className="pro-section-icon">●</span>
          {r(t(sectionKey))}
        </h2>
        <div className="pro-section-content">
          {renderMainContent(sectionKey, data)}
        </div>
      </div>
    );
  };

  const renderMainContent = (sectionKey, data) => {
    switch (sectionKey) {
      case 'summary':
        return <p className="pro-summary-text">{r(data)}</p>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="pro-exp-item">
            <div className="pro-exp-header">
              <div className="pro-exp-title-group">
                <h3 className="pro-exp-title">{r(exp.jobTitle)}</h3>
                <div className="pro-exp-company">{r(exp.company)}{exp.location && ` • ${r(exp.location)}`}</div>
              </div>
              <div className="pro-exp-date">
                {r(exp.startDate)} — {exp.current ? r(t('present')) : r(exp.endDate)}
              </div>
            </div>
            {renderDescriptionAsBullets(exp.description, 'pro-exp-bullets', r, isRTL)}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="pro-edu-item">
            <div className="pro-edu-header">
              <div className="pro-edu-title-group">
                <h3 className="pro-edu-degree">{r(edu.degree)}</h3>
                <div className="pro-edu-school">{r(edu.institution)}{edu.location && `, ${r(edu.location)}`}</div>
              </div>
              <div className="pro-edu-date">{r(edu.graduationDate)}</div>
            </div>
            {(edu.gpa || edu.honors) && (
              <div className="pro-edu-details">
                {edu.gpa && `GPA: ${r(edu.gpa)}`}
                {edu.gpa && edu.honors && ' • '}
                {edu.honors && r(edu.honors)}
              </div>
            )}
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="pro-project-item">
            <div className="pro-project-header">
              <h4 className="pro-project-name">{r(project.projectName || project.title || project.name)}</h4>
              {project.date && <span className="pro-project-date">{r(project.date)}</span>}
            </div>
            {project.technologies && (
              <div className="pro-project-tech">{r(project.technologies)}</div>
            )}
            {project.description && <p className="pro-project-desc">{r(project.description)}</p>}
          </div>
        ));

      case 'achievements':
        return (data || []).map((achievement, idx) => (
          <div key={idx} className="pro-achievement-item">
            <div className="pro-achievement-header">
              <h4 className="pro-achievement-title">{r(achievement.achievement || achievement.title)}</h4>
              {achievement.date && <span className="pro-achievement-date">{r(achievement.date)}</span>}
            </div>
            {achievement.description && <p className="pro-achievement-desc">{r(achievement.description)}</p>}
          </div>
        ));

      case 'volunteering':
        return (data || []).map((vol, idx) => (
          <div key={idx} className="pro-vol-item">
            <div className="pro-vol-header">
              <div className="pro-vol-title-group">
                <h4 className="pro-vol-role">{r(vol.role || vol.title)}</h4>
                <div className="pro-vol-org">{r(vol.organization)}</div>
              </div>
              <div className="pro-vol-date">
                {r(vol.startDate)} — {vol.current ? r(t('present')) : r(vol.endDate)}
              </div>
            </div>
            {vol.description && <p className="pro-vol-desc">{r(vol.description)}</p>}
          </div>
        ));

      case 'references':
        return (
          <div className="pro-ref-grid">
            {(data || []).map((ref, idx) => (
              <div key={idx} className="pro-ref-item">
                <div className="pro-ref-name">{r(ref.name)}</div>
                {ref.title && <div className="pro-ref-title">{r(ref.title)}{ref.company && `, ${r(ref.company)}`}</div>}
                {(ref.email || ref.phone) && (
                  <div className="pro-ref-contact">
                    {ref.email}{ref.email && ref.phone && ' • '}{ref.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        if (Array.isArray(data)) {
          return data.map((item, idx) => (
            <div key={idx} className="pro-generic-item">
              <h4 className="pro-generic-title">{r(item.title || item.name || '')}</h4>
              {item.description && <p className="pro-generic-desc">{r(item.description)}</p>}
            </div>
          ));
        }
        if (typeof data === 'string') {
          return <p className="pro-generic-text">{r(data)}</p>;
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

  // Filter sections based on what's in the sections array
  const activeSidebarSections = sections.filter(s => sidebarSections.includes(s));
  const activeMainSections = sections.filter(s => mainSections.includes(s));

  return (
    <div
      className={`cv-template-pro ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={containerStyle}
    >
      {/* Header spans full width */}
      {renderPersonalInfo()}

      {/* Two-column layout */}
      <div className="pro-body">
        {/* Sidebar - Left in LTR, Right in RTL */}
        <aside className="pro-sidebar">
          {activeSidebarSections.map(renderSidebarSection)}
        </aside>

        {/* Main content - Right in LTR, Left in RTL */}
        <main className="pro-main">
          {activeMainSections.map(renderMainSection)}
        </main>
      </div>
    </div>
  );
}

export default CVTemplatePro;

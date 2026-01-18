import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { renderDescriptionAsBullets } from '../utils/templateHelpers';
import './CVTemplateATS.css';

/**
 * ATS-Friendly Template - Ultra-simple, machine-readable design
 * Best for: Large corporations, ATS systems, online applications
 * Features: No graphics, simple formatting, keyword-optimized
 */
function CVTemplateATS({ cvData, sections, sectionDefinitions }) {
  const { t, isRTL } = useLanguage();

  // Simple pass-through - no reshaping needed for screen display
  // Arabic text displays correctly in modern browsers
  const r = (text) => text;

  const renderPersonalInfo = () => {
    const info = cvData.personalInfo;
    return (
      <div className="ats-header">
        <div className="ats-name">{r(info.fullName) || r('YOUR NAME')}</div>
        <div className="ats-contact">
          {info.email && <div>{r(info.email)}</div>}
          {info.phone && <div>{r(info.phone)}</div>}
          {info.location && <div>{r(info.location)}</div>}
          {info.linkedin && <div>{r('LinkedIn')}: {info.linkedin}</div>}
          {info.website && <div>{r('Portfolio')}: {info.website}</div>}
        </div>
      </div>
    );
  };

  const renderSection = (sectionKey) => {
    const section = sectionDefinitions[sectionKey];
    if (!section) return null;

    return (
      <div key={sectionKey} className="ats-section">
        <div className="ats-section-title">{r(t(sectionKey)).toUpperCase()}</div>
        <div className="ats-section-content">
          {renderSectionContent(sectionKey)}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const data = cvData[sectionKey];

    switch (sectionKey) {
      case 'summary':
        return <div className="ats-summary">{r(data) || r('Professional summary...')}</div>;

      case 'experience':
        return (data || []).map((exp, idx) => (
          <div key={idx} className="ats-item">
            <div className="ats-item-title">{r(exp.jobTitle)}</div>
            <div className="ats-item-company">
              {r(exp.company)}
              {exp.location && ` | ${r(exp.location)}`}
            </div>
            <div className="ats-item-date">
              {r(exp.startDate)} - {exp.current ? r(t('present')) : r(exp.endDate)}
            </div>
            {renderDescriptionAsBullets(exp.description, 'ats-exp-bullets', r)}
          </div>
        ));

      case 'education':
        return (data || []).map((edu, idx) => (
          <div key={idx} className="ats-item">
            <div className="ats-item-title">{r(edu.degree)}</div>
            <div className="ats-item-company">
              {r(edu.institution)}
              {edu.location && ` | ${r(edu.location)}`}
            </div>
            <div className="ats-item-date">{r(edu.graduationDate)}</div>
            {edu.gpa && <div className="ats-item-meta">{r('GPA')}: {r(edu.gpa)}</div>}
            {edu.honors && <div className="ats-item-meta">{r('Honors')}: {r(edu.honors)}</div>}
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
            soft: r(t('professionalSkills')),
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

          const getProficiencyLevel = (proficiency) => {
            const levels = {
              beginner: r(t('beginner')),
              intermediate: r(t('intermediate')),
              advanced: r(t('advanced')),
              expert: r(t('expert')),
              master: r(t('master'))
            };
            return levels[proficiency] || r(t('intermediate'));
          };

          return (
            <div className="ats-skills">
              {Object.entries(categories).map(([category, skills]) => (
                <div key={category} className="ats-skill-section">
                  <div className="ats-skill-label">{categoryLabels[category] || r(category)}:</div>
                  <div className="ats-skill-list">
                    {skills.map((skill, idx) => (
                      <span key={skill.id}>
                        {r(skill.name)} ({getProficiencyLevel(skill.proficiency)})
                        {idx < skills.length - 1 ? ', ' : ''}
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
            <div className="ats-skills">
              {data?.technicalSkills?.length > 0 && (
                <div className="ats-skill-section">
                  <div className="ats-skill-label">{r(t('technicalSkills'))}:</div>
                  <div className="ats-skill-list">{data.technicalSkills.map(s => r(s)).join(', ')}</div>
                </div>
              )}
              {data?.softSkills?.length > 0 && (
                <div className="ats-skill-section">
                  <div className="ats-skill-label">{r(t('professionalSkills'))}:</div>
                  <div className="ats-skill-list">{data.softSkills.map(s => r(s)).join(', ')}</div>
                </div>
              )}
              {data?.languages?.length > 0 && (
                <div className="ats-skill-section">
                  <div className="ats-skill-label">{r(t('languages'))}:</div>
                  <div className="ats-skill-list">{data.languages.map(s => r(s)).join(', ')}</div>
                </div>
              )}
            </div>
          );
        }
        return null;

      case 'certifications':
        return (data || []).map((cert, idx) => (
          <div key={idx} className="ats-item">
            <div className="ats-item-title">{r(cert.certification)}</div>
            {cert.issuer && <div className="ats-item-company">{r(cert.issuer)}</div>}
            {cert.date && <div className="ats-item-date">{r(cert.date)}</div>}
            {cert.credentialId && <div className="ats-item-meta">{r('ID')}: {r(cert.credentialId)}</div>}
          </div>
        ));

      case 'projects':
        return (data || []).map((project, idx) => (
          <div key={idx} className="ats-item">
            <div className="ats-item-title">{r(project.projectName)}</div>
            {project.role && <div className="ats-item-company">{r('Role')}: {r(project.role)}</div>}
            {project.duration && <div className="ats-item-date">{r(project.duration)}</div>}
            {project.technologies && (
              <div className="ats-item-meta">{r('Technologies')}: {r(project.technologies)}</div>
            )}
            {project.description && <div className="ats-item-description">{r(project.description)}</div>}
          </div>
        ));

      case 'achievements':
        return (data || []).map((achievement, idx) => (
          <div key={idx} className="ats-item">
            <div className="ats-item-title">{r(achievement.achievement)}</div>
            {achievement.issuer && <div className="ats-item-company">{r(achievement.issuer)}</div>}
            {achievement.date && <div className="ats-item-date">{r(achievement.date)}</div>}
            {achievement.description && <div className="ats-item-description">{r(achievement.description)}</div>}
          </div>
        ));

      case 'publications':
        return (data || []).map((pub, idx) => (
          <div key={idx} className="ats-item">
            <div className="ats-item-title">{r(pub.title)}</div>
            {pub.publisher && <div className="ats-item-company">{r(pub.publisher)}</div>}
            {pub.date && <div className="ats-item-date">{r(pub.date)}</div>}
            {pub.coAuthors && <div className="ats-item-meta">{r('Co-Authors')}: {r(pub.coAuthors)}</div>}
          </div>
        ));

      case 'licenses':
        return (data || []).map((license, idx) => (
          <div key={idx} className="ats-item">
            <div className="ats-item-title">{r(license.license)}</div>
            {license.issuingAuthority && <div className="ats-item-company">{r(license.issuingAuthority)}</div>}
            {license.licenseNumber && <div className="ats-item-meta">{r('License #')}: {r(license.licenseNumber)}</div>}
            {license.issueDate && <div className="ats-item-date">{r('Issued')}: {r(license.issueDate)}</div>}
            {license.expiryDate && <div className="ats-item-date">{r('Expires')}: {r(license.expiryDate)}</div>}
          </div>
        ));

      case 'portfolio':
        return (data || []).map((item, idx) => (
          <div key={idx} className="ats-item">
            <div className="ats-item-title">{r(item.projectName)}</div>
            {item.client && <div className="ats-item-company">{r('Client')}: {r(item.client)}</div>}
            {item.year && <div className="ats-item-date">{r(item.year)}</div>}
            {item.link && <div className="ats-item-meta">{r('Link')}: {item.link}</div>}
            {item.description && <div className="ats-item-description">{r(item.description)}</div>}
          </div>
        ));

      default:
        return <div>{r(JSON.stringify(data))}</div>;
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
      className={`cv-template-ats ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={containerStyle}
    >
      {renderPersonalInfo()}
      {sections.filter(s => s !== 'personalInfo').map(renderSection)}
    </div>
  );
}

export default CVTemplateATS;

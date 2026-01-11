/**
 * ATS CV TEMPLATE - APPLICANT TRACKING SYSTEM OPTIMIZED
 * ======================================================
 *
 * PURPOSE: Maximum ATS compatibility with clean, parseable structure.
 *          No complex layouts, no columns, no graphics - pure text optimization.
 *
 * DESIGN PHILOSOPHY:
 * - Single column layout for perfect ATS parsing
 * - Standard fonts and simple formatting
 * - Clear section headings with consistent hierarchy
 * - No tables, no columns, no floating elements
 * - Keywords naturally integrated for ATS scoring
 *
 * ARABIC TYPOGRAPHY RULES (CRITICAL):
 * - Titles/Job names: aligned RIGHT
 * - Dates/Durations: aligned LEFT (always!)
 * - Date styling: lighter color, smaller font, direction: ltr
 * - Long dash (—) for date ranges
 * - Use flex-direction: row (explicit) with HTML order swap for RTL
 *
 * PAGE BREAK RULES:
 * - page-break-inside: avoid on sections and items
 * - Section headings never orphaned at page bottom
 */

const { getBaseCSS, t, escapeHtml, formatDateRange } = require('./base');

/**
 * ATS Template CSS - Clean and Parseable
 */
const getATSCSS = (isRTL) => `
  /* ============================================
     ATS TEMPLATE - MAXIMUM COMPATIBILITY
     ============================================ */

  body {
    color: #000000;
    background: #ffffff;
  }

  .cv-container {
    padding: 15mm 18mm;
    max-width: 210mm;
  }

  /* ============================================
     HEADER - Simple and Clean
     ============================================ */
  .ats-header {
    text-align: center;
    margin-bottom: 14pt;
    padding-bottom: 12pt;
    border-bottom: 2pt solid #1a202c;
  }

  .ats-name {
    font-size: 26pt;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 8pt;
    letter-spacing: 0.5pt;
    text-transform: uppercase;
  }

  .ats-headline {
    font-size: 12pt;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 12pt;
  }

  .ats-contact {
    font-size: 10pt;
    color: #2d3748;
    line-height: 1.6;
  }

  .ats-contact-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6pt 8pt;
  }

  .ats-contact-row span::after {
    content: ' | ';
    color: #a0aec0;
  }

  .ats-contact-row span:last-child::after {
    content: '';
  }

  /* ============================================
     SECTIONS - Clear Hierarchy
     ============================================ */
  .ats-section {
    margin-bottom: 12pt;
    page-break-inside: auto;
    break-inside: auto;
    page-break-before: auto;
  }

  .ats-section-title {
    font-size: 12pt;
    font-weight: 700;
    color: #1a202c;
    text-transform: uppercase;
    letter-spacing: 1pt;
    margin-bottom: 8pt;
    padding-bottom: 4pt;
    border-bottom: 1.5pt solid #1a202c;
    page-break-after: avoid;
    break-after: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* ============================================
     ITEM HEADER - ARABIC TYPOGRAPHY RULES
     flex-direction: row EXPLICIT for correct positioning
     RTL: Date first (left), Title second (right)
     LTR: Title first (left), Date second (right)
     ============================================ */
  .ats-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 16pt;
    margin-bottom: 4pt;
  }

  .ats-item-title-group {
    flex: 1;
    min-width: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .ats-item-date {
    font-size: 10pt;
    font-weight: 400;
    color: #4a5568;
    white-space: nowrap;
    direction: ltr;
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  /* ============================================
     EXPERIENCE ITEMS
     ============================================ */
  .ats-exp-item {
    margin-bottom: 10pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .ats-exp-title {
    font-size: 12pt;
    font-weight: 700;
    color: #1a202c;
  }

  .ats-exp-company {
    font-size: 11pt;
    font-weight: 500;
    color: #2d3748;
    margin-bottom: 4pt;
  }

  .ats-exp-location {
    font-size: 10pt;
    color: #718096;
    font-style: italic;
  }

  .ats-exp-description {
    font-size: 10.5pt;
    color: #1a202c;
    line-height: 1.65;
    margin-top: 6pt;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
  }

  .ats-exp-bullets {
    margin-top: 6pt;
    ${isRTL ? 'padding-right: 18pt; padding-left: 0;' : 'padding-left: 18pt; padding-right: 0;'}
  }

  .ats-exp-bullets li {
    font-size: 10.5pt;
    color: #1a202c;
    line-height: 1.55;
    margin-bottom: 4pt;
  }

  /* ============================================
     EDUCATION ITEMS
     ============================================ */
  .ats-edu-item {
    margin-bottom: 8pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .ats-edu-degree {
    font-size: 11.5pt;
    font-weight: 700;
    color: #1a202c;
  }

  .ats-edu-school {
    font-size: 11pt;
    font-weight: 500;
    color: #2d3748;
  }

  .ats-edu-details {
    font-size: 10pt;
    color: #4a5568;
    margin-top: 2pt;
  }

  /* ============================================
     SKILLS - Keyword Optimized (Comma-separated)
     ============================================ */
  .ats-skills-category {
    margin-bottom: 8pt;
  }

  .ats-skills-category-title {
    font-size: 10.5pt;
    font-weight: 700;
    color: #1a202c;
    display: inline;
  }

  .ats-skills-list {
    font-size: 10.5pt;
    color: #2d3748;
    display: inline;
  }

  /* ============================================
     SUMMARY
     ============================================ */
  .ats-summary {
    font-size: 11pt;
    color: #1a202c;
    line-height: 1.7;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     CERTIFICATIONS & GENERIC ITEMS
     ============================================ */
  .ats-cert-item {
    margin-bottom: 6pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .ats-cert-name {
    font-size: 11pt;
    font-weight: 600;
    color: #1a202c;
  }

  .ats-cert-issuer {
    font-size: 10pt;
    color: #4a5568;
  }

  /* ============================================
     PROJECTS
     ============================================ */
  .ats-project-item {
    margin-bottom: 8pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .ats-project-name {
    font-size: 11pt;
    font-weight: 700;
    color: #1a202c;
  }

  .ats-project-tech {
    font-size: 10pt;
    color: #2d3748;
    font-weight: 500;
    margin-top: 2pt;
  }

  .ats-project-description {
    font-size: 10.5pt;
    color: #1a202c;
    line-height: 1.55;
    margin-top: 4pt;
  }

  /* ============================================
     LANGUAGES
     ============================================ */
  .ats-lang-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 6pt;
    padding-bottom: 4pt;
    border-bottom: 1pt solid #e2e8f0;
  }

  .ats-lang-name {
    font-size: 10.5pt;
    font-weight: 600;
    color: #1a202c;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .ats-lang-level {
    font-size: 10pt;
    color: #4a5568;
    direction: ltr;
    text-align: left;
  }

  /* ============================================
     VOLUNTEERING
     ============================================ */
  .ats-vol-item {
    margin-bottom: 8pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .ats-vol-role {
    font-size: 11pt;
    font-weight: 600;
    color: #1a202c;
  }

  .ats-vol-org {
    font-size: 10.5pt;
    color: #2d3748;
  }

  /* ============================================
     REFERENCES
     ============================================ */
  .ats-ref-item {
    margin-bottom: 10pt;
    padding: 10pt;
    background: #f7fafc;
    border-radius: 4pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .ats-ref-name {
    font-size: 11pt;
    font-weight: 600;
    color: #1a202c;
  }

  .ats-ref-title {
    font-size: 10pt;
    color: #4a5568;
  }

  .ats-ref-contact {
    font-size: 9.5pt;
    color: #718096;
    margin-top: 4pt;
  }

  /* ============================================
     ADDITIONAL INFO
     ============================================ */
  .ats-info-text {
    font-size: 10.5pt;
    color: #1a202c;
    line-height: 1.6;
  }

  /* ============================================
     PRINT OPTIMIZATIONS
     ============================================ */
  @media print {
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/**
 * Render skills for ATS (comma-separated for parsing)
 */
const renderATSSkills = (skills, language) => {
  if (!skills) return '';

  const items = skills.items || [];
  const categoryLabels = {
    technical: t('technicalSkills', language),
    soft: t('softSkills', language),
    languages: t('languages', language),
    tools: t('tools', language),
    frameworks: t('frameworks', language),
    other: t('skills', language)
  };

  if (items.length > 0) {
    const categories = {};
    items.forEach(skill => {
      const cat = skill.category || 'other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(skill.name);
    });

    return Object.entries(categories).map(([category, catSkills]) => `
      <div class="ats-skills-category">
        <span class="ats-skills-category-title">${escapeHtml(categoryLabels[category] || category)}: </span>
        <span class="ats-skills-list">${catSkills.map(s => escapeHtml(s)).join(', ')}</span>
      </div>
    `).join('');
  }

  // Legacy format
  let html = '';
  if (skills.technicalSkills?.length > 0) {
    html += `
      <div class="ats-skills-category">
        <span class="ats-skills-category-title">${t('technicalSkills', language)}: </span>
        <span class="ats-skills-list">${skills.technicalSkills.map(s => escapeHtml(s)).join(', ')}</span>
      </div>
    `;
  }
  if (skills.softSkills?.length > 0) {
    html += `
      <div class="ats-skills-category">
        <span class="ats-skills-category-title">${t('softSkills', language)}: </span>
        <span class="ats-skills-list">${skills.softSkills.map(s => escapeHtml(s)).join(', ')}</span>
      </div>
    `;
  }
  return html;
};

// ============================================
// SECTION BUILDER MAP
// ============================================

const getSectionBuilders = (cvData, language, isRTL) => ({
  // Summary Section
  summary: () => {
    if (!cvData.summary) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('summary', language)}</h2>
        <p class="ats-summary">${escapeHtml(cvData.summary)}</p>
      </section>
    `;
  },

  // Experience Section - RTL: Date LEFT, Title RIGHT
  experience: () => {
    if (!cvData.experience?.length) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('experience', language)}</h2>
        ${cvData.experience.map(exp => {
          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);
          // RTL: Date first in HTML (renders LEFT), Title second (renders RIGHT)
          const headerContent = isRTL
            ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>
               <div class="ats-item-title-group">
                 <div class="ats-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>`
            : `<div class="ats-item-title-group">
                 <div class="ats-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>
               <span class="ats-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="ats-exp-item">
              <div class="ats-item-header">
                ${headerContent}
              </div>
              <div class="ats-exp-company">${escapeHtml(exp.company)}${exp.location ? ` <span class="ats-exp-location">— ${escapeHtml(exp.location)}</span>` : ''}</div>
              ${exp.description ? `<p class="ats-exp-description">${escapeHtml(exp.description)}</p>` : ''}
              ${exp.bullets?.length > 0 ? `
                <ul class="ats-exp-bullets">
                  ${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
                </ul>
              ` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Education Section
  education: () => {
    if (!cvData.education?.length) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('education', language)}</h2>
        ${cvData.education.map(edu => {
          const dateStr = edu.graduationDate || edu.endDate || '';
          const headerContent = isRTL
            ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>
               <div class="ats-item-title-group">
                 <div class="ats-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>`
            : `<div class="ats-item-title-group">
                 <div class="ats-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>
               <span class="ats-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="ats-edu-item">
              <div class="ats-item-header">
                ${headerContent}
              </div>
              <div class="ats-edu-school">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa || edu.honors ? `
                <div class="ats-edu-details">
                  ${edu.gpa ? `${t('gpa', language)}: ${escapeHtml(edu.gpa)}` : ''}
                  ${edu.gpa && edu.honors ? ' | ' : ''}
                  ${edu.honors ? escapeHtml(edu.honors) : ''}
                </div>
              ` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Skills Section
  skills: () => {
    const skillsHTML = renderATSSkills(cvData.skills, language);
    if (!skillsHTML) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('skills', language)}</h2>
        ${skillsHTML}
      </section>
    `;
  },

  // Certifications Section
  certifications: () => {
    if (!cvData.certifications?.length) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('certifications', language)}</h2>
        ${cvData.certifications.map(cert => {
          const dateStr = cert.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="ats-item-title-group">
                 <div class="ats-cert-name">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>`
            : `<div class="ats-item-title-group">
                 <div class="ats-cert-name">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>
               ${dateStr ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="ats-cert-item">
              <div class="ats-item-header">
                ${headerContent}
              </div>
              ${cert.issuer ? `<div class="ats-cert-issuer">${escapeHtml(cert.issuer)}</div>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Languages Section
  languages: () => {
    if (!cvData.languages?.length) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('languages', language)}</h2>
        ${cvData.languages.map(lang => {
          const langContent = isRTL
            ? `${lang.proficiency ? `<span class="ats-lang-level">${escapeHtml(lang.proficiency)}</span>` : ''}
               <span class="ats-lang-name">${escapeHtml(lang.language || lang.name)}</span>`
            : `<span class="ats-lang-name">${escapeHtml(lang.language || lang.name)}</span>
               ${lang.proficiency ? `<span class="ats-lang-level">${escapeHtml(lang.proficiency)}</span>` : ''}`;
          return `
            <div class="ats-lang-item">
              ${langContent}
            </div>
          `;
        }).join('')}
      </section>
    `;
  },

  // Projects Section
  projects: () => {
    if (!cvData.projects?.length) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('projects', language)}</h2>
        ${cvData.projects.map(project => {
          const dateStr = project.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="ats-item-title-group">
                 <div class="ats-project-name">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>`
            : `<div class="ats-item-title-group">
                 <div class="ats-project-name">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>
               ${dateStr ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="ats-project-item">
              <div class="ats-item-header">
                ${headerContent}
              </div>
              ${project.technologies ? `<div class="ats-project-tech">${escapeHtml(project.technologies)}</div>` : ''}
              ${project.description ? `<p class="ats-project-description">${escapeHtml(project.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Achievements Section
  achievements: () => {
    if (!cvData.achievements?.length) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('achievements', language)}</h2>
        ${cvData.achievements.map(achievement => {
          const dateStr = achievement.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="ats-item-title-group">
                 <div class="ats-cert-name">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>`
            : `<div class="ats-item-title-group">
                 <div class="ats-cert-name">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>
               ${dateStr ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="ats-cert-item">
              <div class="ats-item-header">
                ${headerContent}
              </div>
              ${achievement.description ? `<p class="ats-project-description">${escapeHtml(achievement.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Volunteering Section
  volunteering: () => {
    if (!cvData.volunteering?.length) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('volunteering', language)}</h2>
        ${cvData.volunteering.map(vol => {
          const dateStr = formatDateRange(vol.startDate, vol.endDate, vol.current, language);
          const headerContent = isRTL
            ? `${dateStr ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="ats-item-title-group">
                 <div class="ats-vol-role">${escapeHtml(vol.role || vol.title)}</div>
               </div>`
            : `<div class="ats-item-title-group">
                 <div class="ats-vol-role">${escapeHtml(vol.role || vol.title)}</div>
               </div>
               ${dateStr ? `<span class="ats-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="ats-vol-item">
              <div class="ats-item-header">
                ${headerContent}
              </div>
              <div class="ats-vol-org">${escapeHtml(vol.organization)}</div>
              ${vol.description ? `<p class="ats-project-description">${escapeHtml(vol.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Interests Section
  interests: () => {
    if (!cvData.interests?.length) return '';
    const items = cvData.interests.map(interest => {
      const name = typeof interest === 'string' ? interest : (interest.name || interest.interest);
      return escapeHtml(name);
    }).join(', ');
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('interests', language)}</h2>
        <p class="ats-info-text">${items}</p>
      </section>
    `;
  },

  // Additional Information Section
  additionalInfo: () => {
    if (!cvData.additionalInfo) return '';
    let content = '';
    if (typeof cvData.additionalInfo === 'string') {
      content = escapeHtml(cvData.additionalInfo);
    } else if (cvData.additionalInfo.items && Array.isArray(cvData.additionalInfo.items)) {
      content = cvData.additionalInfo.items.map(item => escapeHtml(item)).join(', ');
    } else if (cvData.additionalInfo.text) {
      content = escapeHtml(cvData.additionalInfo.text);
    }
    if (!content) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('additionalInfo', language)}</h2>
        <p class="ats-info-text">${content}</p>
      </section>
    `;
  },

  // References Section
  references: () => {
    if (!cvData.references?.length) return '';
    return `
      <section class="ats-section">
        <h2 class="ats-section-title">${t('references', language)}</h2>
        ${cvData.references.map(ref => `
          <article class="ats-ref-item">
            <div class="ats-ref-name">${escapeHtml(ref.name)}</div>
            ${ref.title ? `<div class="ats-ref-title">${escapeHtml(ref.title)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>` : ''}
            ${ref.email || ref.phone ? `
              <div class="ats-ref-contact">
                ${ref.email ? escapeHtml(ref.email) : ''}
                ${ref.email && ref.phone ? ' | ' : ''}
                ${ref.phone ? escapeHtml(ref.phone) : ''}
              </div>
            ` : ''}
          </article>
        `).join('')}
      </section>
    `;
  }
});

/**
 * Generate ATS template HTML
 */
const generateHTML = (cvData, sections, language, isRTL, cairoFontBase64) => {
  const info = cvData.personalInfo || {};

  // Default section order
  const defaultSections = [
    'summary', 'experience', 'education', 'skills',
    'certifications', 'projects', 'achievements',
    'languages', 'volunteering', 'interests',
    'additionalInfo', 'references'
  ];

  const sectionOrder = sections?.length > 0 ? sections : defaultSections;
  const builders = getSectionBuilders(cvData, language, isRTL);

  // Build sections HTML
  const sectionsHTML = sectionOrder
    .map(sectionName => {
      const builder = builders[sectionName];
      return builder ? builder() : '';
    })
    .filter(html => html.trim() !== '')
    .join('\n');

  // Build contact items
  const contactItems = [];
  if (info.email) contactItems.push(escapeHtml(info.email));
  if (info.phone) contactItems.push(escapeHtml(info.phone));
  if (info.location) contactItems.push(escapeHtml(info.location));

  const linkItems = [];
  if (info.linkedin) linkItems.push(escapeHtml(info.linkedin));
  if (info.website) linkItems.push(escapeHtml(info.website));
  if (info.github) linkItems.push(escapeHtml(info.github));

  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=210mm, initial-scale=1.0">
      <title>${escapeHtml(info.fullName || 'CV')} - Resume</title>
      <style>
        ${getBaseCSS(isRTL, cairoFontBase64)}
        ${getATSCSS(isRTL)}
      </style>
    </head>
    <body>
      <div class="cv-container">
        <!-- HEADER -->
        <header class="ats-header">
          <h1 class="ats-name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'YOUR NAME')}</h1>
          ${info.headline ? `<div class="ats-headline">${escapeHtml(info.headline)}</div>` : ''}
          <div class="ats-contact">
            ${contactItems.length > 0 ? `
              <div class="ats-contact-row">
                ${contactItems.map(item => `<span>${item}</span>`).join('')}
              </div>
            ` : ''}
            ${linkItems.length > 0 ? `
              <div class="ats-contact-row" style="margin-top: 4pt;">
                ${linkItems.map(item => `<span>${item}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        </header>

        <!-- SECTIONS -->
        <main>
          ${sectionsHTML}
        </main>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateHTML };

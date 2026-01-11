/**
 * MINIMAL CV TEMPLATE - CLEAN WHITESPACE DESIGN
 * ==============================================
 *
 * PURPOSE: Ultra-clean, typography-focused design with maximum whitespace
 *          and minimal visual clutter. Swiss/Bauhaus inspired.
 *
 * DESIGN PHILOSOPHY:
 * - Extreme whitespace for breathing room
 * - Single accent color (subtle teal)
 * - No borders, no boxes, just type hierarchy
 * - Left-aligned everything (except RTL)
 * - Subtle use of weight and size for hierarchy
 *
 * ARABIC TYPOGRAPHY RULES (CRITICAL):
 * - Titles/Job names: aligned RIGHT
 * - Dates/Durations: aligned LEFT (always!)
 * - flex-direction: row (explicit) with HTML order swap for RTL
 */

const { getBaseCSS, t, escapeHtml, formatDateRange } = require('./base');

const getMinimalCSS = (isRTL) => `
  /* ============================================
     MINIMAL TEMPLATE - SWISS DESIGN
     ============================================ */

  body {
    background: #ffffff;
  }

  .cv-container {
    padding: 24pt 28pt;
    max-width: 210mm;
  }

  /* ============================================
     HEADER - Clean Typography
     ============================================ */
  .min-header {
    margin-bottom: 22pt;
    padding-bottom: 14pt;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .min-name {
    font-size: 32pt;
    font-weight: 300;
    color: #1a1a1a;
    letter-spacing: -1pt;
    margin-bottom: 4pt;
    line-height: 1.1;
  }

  .min-headline {
    font-size: 13pt;
    font-weight: 400;
    color: #0d9488;
    margin-bottom: 18pt;
  }

  .min-contact {
    display: flex;
    flex-wrap: wrap;
    gap: 6pt 20pt;
    font-size: 9.5pt;
    color: #6b7280;
    ${isRTL ? 'flex-direction: row-reverse; justify-content: flex-end;' : ''}
  }

  .min-contact-item {
    position: relative;
  }

  .min-contact-item::after {
    content: '';
    position: absolute;
    ${isRTL ? 'left' : 'right'}: -10pt;
    top: 50%;
    width: 2pt;
    height: 2pt;
    background: #d1d5db;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  .min-contact-item:last-child::after {
    display: none;
  }

  /* ============================================
     SECTIONS
     ============================================ */
  .min-section {
    margin-bottom: 16pt;
    page-break-inside: auto;
    break-inside: auto;
    page-break-before: auto;
  }

  .min-section-title {
    font-size: 9pt;
    font-weight: 600;
    color: #0d9488;
    text-transform: uppercase;
    letter-spacing: 2pt;
    margin-bottom: 10pt;
    text-align: ${isRTL ? 'right' : 'left'};
    page-break-after: avoid;
    break-after: avoid;
  }

  /* ============================================
     ITEM HEADER - ARABIC TYPOGRAPHY
     ============================================ */
  .min-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 20pt;
    margin-bottom: 3pt;
  }

  .min-item-title-group {
    flex: 1;
    min-width: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .min-item-date {
    font-size: 9pt;
    font-weight: 400;
    color: #9ca3af;
    white-space: nowrap;
    direction: ltr;
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  /* ============================================
     EXPERIENCE
     ============================================ */
  .min-exp-item {
    margin-bottom: 12pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .min-exp-title {
    font-size: 12pt;
    font-weight: 500;
    color: #1a1a1a;
  }

  .min-exp-company {
    font-size: 10pt;
    color: #6b7280;
    margin-bottom: 6pt;
  }

  .min-exp-description {
    font-size: 9.5pt;
    color: #4b5563;
    line-height: 1.7;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     EDUCATION
     ============================================ */
  .min-edu-item {
    margin-bottom: 10pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .min-edu-degree {
    font-size: 11pt;
    font-weight: 500;
    color: #1a1a1a;
  }

  .min-edu-school {
    font-size: 10pt;
    color: #6b7280;
  }

  .min-edu-details {
    font-size: 9pt;
    color: #9ca3af;
    margin-top: 2pt;
  }

  /* ============================================
     SUMMARY
     ============================================ */
  .min-summary {
    font-size: 10.5pt;
    color: #4b5563;
    line-height: 1.8;
    text-align: ${isRTL ? 'right' : 'left'};
    max-width: 85%;
    ${isRTL ? 'margin-left: auto;' : ''}
  }

  /* ============================================
     SKILLS
     ============================================ */
  .min-skills-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6pt 24pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .min-skill-category {
    margin-bottom: 6pt;
    min-width: 45%;
  }

  .min-skill-category-title {
    font-size: 9pt;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 4pt;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .min-skills-list {
    font-size: 9pt;
    color: #6b7280;
    line-height: 1.6;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     LANGUAGES
     ============================================ */
  .min-lang-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt 32pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .min-lang-item {
    display: flex;
    align-items: baseline;
    gap: 8pt;
  }

  .min-lang-name {
    font-size: 10pt;
    font-weight: 500;
    color: #1a1a1a;
  }

  .min-lang-level {
    font-size: 9pt;
    color: #0d9488;
  }

  /* ============================================
     GENERIC ITEMS
     ============================================ */
  .min-generic-item {
    margin-bottom: 8pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .min-item-title {
    font-size: 10.5pt;
    font-weight: 500;
    color: #1a1a1a;
  }

  .min-item-meta {
    font-size: 9pt;
    color: #6b7280;
  }

  .min-item-description {
    font-size: 9pt;
    color: #4b5563;
    margin-top: 4pt;
    line-height: 1.6;
  }

  /* ============================================
     REFERENCES
     ============================================ */
  .min-ref-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .min-ref-item {
    min-width: 45%;
  }

  .min-ref-name {
    font-size: 10pt;
    font-weight: 500;
    color: #1a1a1a;
  }

  .min-ref-title {
    font-size: 9pt;
    color: #6b7280;
  }

  .min-ref-contact {
    font-size: 8.5pt;
    color: #9ca3af;
    margin-top: 2pt;
  }

  /* ============================================
     INTERESTS / ADDITIONAL
     ============================================ */
  .min-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .min-tag {
    font-size: 9pt;
    color: #4b5563;
  }

  .min-tag::before {
    content: '—';
    margin-${isRTL ? 'left' : 'right'}: 6pt;
    color: #0d9488;
  }

  .min-info-text {
    font-size: 9.5pt;
    color: #4b5563;
    line-height: 1.6;
  }

  /* ============================================
     PRINT
     ============================================ */
  @media print {
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

const renderMinimalSkills = (skills, language) => {
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

    return `
      <div class="min-skills-row">
        ${Object.entries(categories).map(([category, catSkills]) => `
          <div class="min-skill-category">
            <div class="min-skill-category-title">${escapeHtml(categoryLabels[category] || category)}</div>
            <div class="min-skills-list">${catSkills.map(s => escapeHtml(s)).join(', ')}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  let html = '<div class="min-skills-row">';
  if (skills.technicalSkills?.length > 0) {
    html += `
      <div class="min-skill-category">
        <div class="min-skill-category-title">${t('technicalSkills', language)}</div>
        <div class="min-skills-list">${skills.technicalSkills.map(s => escapeHtml(s)).join(', ')}</div>
      </div>
    `;
  }
  if (skills.softSkills?.length > 0) {
    html += `
      <div class="min-skill-category">
        <div class="min-skill-category-title">${t('softSkills', language)}</div>
        <div class="min-skills-list">${skills.softSkills.map(s => escapeHtml(s)).join(', ')}</div>
      </div>
    `;
  }
  html += '</div>';
  return html;
};

const getSectionBuilders = (cvData, language, isRTL) => ({
  summary: () => {
    if (!cvData.summary) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('summary', language)}</h2>
        <p class="min-summary">${escapeHtml(cvData.summary)}</p>
      </section>
    `;
  },

  experience: () => {
    if (!cvData.experience?.length) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('experience', language)}</h2>
        ${cvData.experience.map(exp => {
          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);
          const headerContent = isRTL
            ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>
               <div class="min-item-title-group">
                 <div class="min-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>`
            : `<div class="min-item-title-group">
                 <div class="min-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>
               <span class="min-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="min-exp-item">
              <div class="min-item-header">
                ${headerContent}
              </div>
              <div class="min-exp-company">${escapeHtml(exp.company)}${exp.location ? ` — ${escapeHtml(exp.location)}` : ''}</div>
              ${exp.description ? `<p class="min-exp-description">${escapeHtml(exp.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  education: () => {
    if (!cvData.education?.length) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('education', language)}</h2>
        ${cvData.education.map(edu => {
          const dateStr = edu.graduationDate || edu.endDate || '';
          const headerContent = isRTL
            ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>
               <div class="min-item-title-group">
                 <div class="min-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>`
            : `<div class="min-item-title-group">
                 <div class="min-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>
               <span class="min-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="min-edu-item">
              <div class="min-item-header">
                ${headerContent}
              </div>
              <div class="min-edu-school">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa || edu.honors ? `
                <div class="min-edu-details">
                  ${edu.gpa ? `${t('gpa', language)}: ${escapeHtml(edu.gpa)}` : ''}
                  ${edu.gpa && edu.honors ? ' · ' : ''}
                  ${edu.honors ? escapeHtml(edu.honors) : ''}
                </div>
              ` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  skills: () => {
    const skillsHTML = renderMinimalSkills(cvData.skills, language);
    if (!skillsHTML) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('skills', language)}</h2>
        ${skillsHTML}
      </section>
    `;
  },

  certifications: () => {
    if (!cvData.certifications?.length) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('certifications', language)}</h2>
        ${cvData.certifications.map(cert => {
          const dateStr = cert.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="min-item-title-group">
                 <div class="min-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>`
            : `<div class="min-item-title-group">
                 <div class="min-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>
               ${dateStr ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="min-generic-item">
              <div class="min-item-header">
                ${headerContent}
              </div>
              ${cert.issuer ? `<div class="min-item-meta">${escapeHtml(cert.issuer)}</div>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  languages: () => {
    if (!cvData.languages?.length) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('languages', language)}</h2>
        <div class="min-lang-row">
          ${cvData.languages.map(lang => `
            <div class="min-lang-item">
              <span class="min-lang-name">${escapeHtml(lang.language || lang.name)}</span>
              ${lang.proficiency ? `<span class="min-lang-level">${escapeHtml(lang.proficiency)}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  projects: () => {
    if (!cvData.projects?.length) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('projects', language)}</h2>
        ${cvData.projects.map(project => {
          const dateStr = project.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="min-item-title-group">
                 <div class="min-item-title">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>`
            : `<div class="min-item-title-group">
                 <div class="min-item-title">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>
               ${dateStr ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="min-generic-item">
              <div class="min-item-header">
                ${headerContent}
              </div>
              ${project.technologies ? `<div class="min-item-meta">${escapeHtml(project.technologies)}</div>` : ''}
              ${project.description ? `<p class="min-item-description">${escapeHtml(project.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  achievements: () => {
    if (!cvData.achievements?.length) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('achievements', language)}</h2>
        ${cvData.achievements.map(achievement => {
          const dateStr = achievement.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="min-item-title-group">
                 <div class="min-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>`
            : `<div class="min-item-title-group">
                 <div class="min-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>
               ${dateStr ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="min-generic-item">
              <div class="min-item-header">
                ${headerContent}
              </div>
              ${achievement.description ? `<p class="min-item-description">${escapeHtml(achievement.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  volunteering: () => {
    if (!cvData.volunteering?.length) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('volunteering', language)}</h2>
        ${cvData.volunteering.map(vol => {
          const dateStr = formatDateRange(vol.startDate, vol.endDate, vol.current, language);
          const headerContent = isRTL
            ? `${dateStr ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="min-item-title-group">
                 <div class="min-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>`
            : `<div class="min-item-title-group">
                 <div class="min-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>
               ${dateStr ? `<span class="min-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="min-generic-item">
              <div class="min-item-header">
                ${headerContent}
              </div>
              <div class="min-item-meta">${escapeHtml(vol.organization)}</div>
              ${vol.description ? `<p class="min-item-description">${escapeHtml(vol.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  interests: () => {
    if (!cvData.interests?.length) return '';
    const items = cvData.interests.map(interest => {
      const name = typeof interest === 'string' ? interest : (interest.name || interest.interest);
      return `<span class="min-tag">${escapeHtml(name)}</span>`;
    }).join('');
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('interests', language)}</h2>
        <div class="min-tags">${items}</div>
      </section>
    `;
  },

  additionalInfo: () => {
    if (!cvData.additionalInfo) return '';
    let content = '';
    if (typeof cvData.additionalInfo === 'string') {
      content = `<p class="min-info-text">${escapeHtml(cvData.additionalInfo)}</p>`;
    } else if (cvData.additionalInfo.items && Array.isArray(cvData.additionalInfo.items)) {
      content = `
        <div class="min-tags">
          ${cvData.additionalInfo.items.map(item => `<span class="min-tag">${escapeHtml(item)}</span>`).join('')}
        </div>
      `;
    } else if (cvData.additionalInfo.text) {
      content = `<p class="min-info-text">${escapeHtml(cvData.additionalInfo.text)}</p>`;
    }
    if (!content) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('additionalInfo', language)}</h2>
        ${content}
      </section>
    `;
  },

  references: () => {
    if (!cvData.references?.length) return '';
    return `
      <section class="min-section">
        <h2 class="min-section-title">${t('references', language)}</h2>
        <div class="min-ref-row">
          ${cvData.references.map(ref => `
            <article class="min-ref-item">
              <div class="min-ref-name">${escapeHtml(ref.name)}</div>
              ${ref.title ? `<div class="min-ref-title">${escapeHtml(ref.title)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>` : ''}
              ${ref.email || ref.phone ? `
                <div class="min-ref-contact">
                  ${ref.email ? escapeHtml(ref.email) : ''}
                  ${ref.email && ref.phone ? ' · ' : ''}
                  ${ref.phone ? escapeHtml(ref.phone) : ''}
                </div>
              ` : ''}
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }
});

const generateHTML = (cvData, sections, language, isRTL, cairoFontBase64) => {
  const info = cvData.personalInfo || {};

  const defaultSections = [
    'summary', 'experience', 'education', 'skills',
    'certifications', 'projects', 'achievements',
    'languages', 'volunteering', 'interests',
    'additionalInfo', 'references'
  ];

  const sectionOrder = sections?.length > 0 ? sections : defaultSections;
  const builders = getSectionBuilders(cvData, language, isRTL);

  const sectionsHTML = sectionOrder
    .map(sectionName => {
      const builder = builders[sectionName];
      return builder ? builder() : '';
    })
    .filter(html => html.trim() !== '')
    .join('\n');

  const contactItems = [];
  if (info.email) contactItems.push(escapeHtml(info.email));
  if (info.phone) contactItems.push(escapeHtml(info.phone));
  if (info.location) contactItems.push(escapeHtml(info.location));
  if (info.linkedin) contactItems.push(escapeHtml(info.linkedin));
  if (info.website) contactItems.push(escapeHtml(info.website));

  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=210mm, initial-scale=1.0">
      <title>${escapeHtml(info.fullName || 'CV')} - Resume</title>
      <style>
        ${getBaseCSS(isRTL, cairoFontBase64)}
        ${getMinimalCSS(isRTL)}
      </style>
    </head>
    <body>
      <div class="cv-container">
        <header class="min-header">
          <h1 class="min-name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'Your Name')}</h1>
          ${info.headline ? `<div class="min-headline">${escapeHtml(info.headline)}</div>` : ''}
          <div class="min-contact">
            ${contactItems.map(item => `<span class="min-contact-item">${item}</span>`).join('')}
          </div>
        </header>
        <main>
          ${sectionsHTML}
        </main>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateHTML };

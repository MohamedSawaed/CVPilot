/**
 * LUXE CV TEMPLATE - GOLD & BLACK PREMIUM
 * ==========================================
 * Ultra-premium design with gold accents on black
 * Perfect for executives and luxury industries
 */

const { getBaseCSS, t, escapeHtml, formatDateRange } = require('./base');

const getLuxeCSS = (isRTL) => `
  /* ============================================
     LUXE TEMPLATE - GOLD & BLACK PREMIUM
     ============================================ */

  body {
    background: #0a0a0a;
  }

  .cv-container {
    background: linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%);
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  .cv-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 180pt;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
    border-bottom: 3pt solid;
    border-image: linear-gradient(90deg, transparent, #d4af37, #f4e4a6, #d4af37, transparent) 1;
  }

  /* ============================================
     HEADER - Luxurious
     ============================================ */
  .luxe-header {
    position: relative;
    z-index: 1;
    padding: 28pt 28pt 22pt;
    text-align: center;
  }

  .luxe-name {
    font-size: 32pt;
    font-weight: 300;
    color: #f4e4a6;
    letter-spacing: 6pt;
    text-transform: uppercase;
    margin-bottom: 8pt;
    text-shadow: 0 2pt 8pt rgba(212, 175, 55, 0.3);
  }

  .luxe-headline {
    font-size: 11pt;
    color: #d4af37;
    font-weight: 400;
    letter-spacing: 3pt;
    text-transform: uppercase;
    margin-bottom: 20pt;
  }

  .luxe-divider {
    width: 80pt;
    height: 1pt;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    margin: 0 auto 16pt;
  }

  .luxe-contact {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8pt 24pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .luxe-contact-item {
    font-size: 9pt;
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    gap: 6pt;
  }

  .luxe-contact-icon {
    color: #d4af37;
    font-size: 8pt;
  }

  /* ============================================
     BODY
     ============================================ */
  .luxe-body {
    padding: 22pt 28pt 26pt;
    position: relative;
    z-index: 1;
  }

  /* ============================================
     SECTIONS
     ============================================ */
  .luxe-section {
    margin-bottom: 16pt;
    page-break-inside: auto;
    break-inside: auto;
    page-break-before: auto;
  }

  .luxe-section-header {
    display: flex;
    align-items: center;
    gap: 12pt;
    margin-bottom: 12pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .luxe-section-line {
    flex: 1;
    height: 1pt;
    background: linear-gradient(${isRTL ? '270deg' : '90deg'}, #d4af37, transparent);
  }

  .luxe-section-title {
    font-size: 11pt;
    font-weight: 400;
    color: #d4af37;
    letter-spacing: 3pt;
    text-transform: uppercase;
    margin: 0;
    white-space: nowrap;
  }

  /* ============================================
     ITEM HEADER - RTL Typography
     ============================================ */
  .luxe-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 16pt;
    margin-bottom: 4pt;
  }

  .luxe-item-title-group {
    flex: 1;
    min-width: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .luxe-item-date {
    font-size: 8.5pt;
    font-weight: 500;
    color: #d4af37;
    white-space: nowrap;
    direction: ltr;
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    padding: 3pt 12pt;
    border: 1pt solid rgba(212, 175, 55, 0.3);
    border-radius: 2pt;
  }

  /* ============================================
     EXPERIENCE
     ============================================ */
  .luxe-exp-item {
    margin-bottom: 12pt;
    padding-${isRTL ? 'right' : 'left'}: 14pt;
    border-${isRTL ? 'right' : 'left'}: 1pt solid rgba(212, 175, 55, 0.4);
    page-break-inside: avoid;
  }

  .luxe-exp-title {
    font-size: 12pt;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 2pt;
  }

  .luxe-exp-company {
    font-size: 10pt;
    color: #d4af37;
    font-weight: 400;
    margin-bottom: 8pt;
  }

  .luxe-exp-description {
    font-size: 9.5pt;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.7;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     EDUCATION
     ============================================ */
  .luxe-edu-item {
    margin-bottom: 10pt;
    padding: 10pt 14pt;
    background: rgba(212, 175, 55, 0.05);
    border: 1pt solid rgba(212, 175, 55, 0.2);
    border-radius: 4pt;
  }

  .luxe-edu-degree {
    font-size: 11pt;
    font-weight: 600;
    color: #ffffff;
  }

  .luxe-edu-school {
    font-size: 9.5pt;
    color: #d4af37;
  }

  .luxe-edu-details {
    font-size: 8.5pt;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 4pt;
  }

  /* ============================================
     SUMMARY
     ============================================ */
  .luxe-summary {
    font-size: 10.5pt;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.85;
    text-align: center;
    font-style: italic;
    padding: 14pt 18pt;
    border-top: 1pt solid rgba(212, 175, 55, 0.3);
    border-bottom: 1pt solid rgba(212, 175, 55, 0.3);
    position: relative;
  }

  .luxe-summary::before,
  .luxe-summary::after {
    content: '✦';
    position: absolute;
    color: #d4af37;
    font-size: 10pt;
  }

  .luxe-summary::before {
    top: -6pt;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a1a;
    padding: 0 8pt;
  }

  /* ============================================
     SKILLS
     ============================================ */
  .luxe-skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8pt;
  }

  .luxe-skill-category {
    padding: 10pt;
    background: rgba(212, 175, 55, 0.03);
    border: 1pt solid rgba(212, 175, 55, 0.15);
    border-radius: 4pt;
  }

  .luxe-skill-category-title {
    font-size: 9pt;
    font-weight: 600;
    color: #d4af37;
    margin-bottom: 8pt;
    text-transform: uppercase;
    letter-spacing: 1pt;
  }

  .luxe-skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .luxe-skill-tag {
    padding: 4pt 10pt;
    background: transparent;
    border: 1pt solid rgba(212, 175, 55, 0.4);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 2pt;
    font-size: 8pt;
  }

  /* ============================================
     LANGUAGES
     ============================================ */
  .luxe-lang-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .luxe-lang-item {
    padding: 8pt 14pt;
    background: rgba(212, 175, 55, 0.05);
    border: 1pt solid rgba(212, 175, 55, 0.2);
    border-radius: 4pt;
    text-align: center;
  }

  .luxe-lang-name {
    font-size: 10pt;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 2pt;
  }

  .luxe-lang-level {
    font-size: 8pt;
    color: #d4af37;
  }

  /* ============================================
     GENERIC ITEMS
     ============================================ */
  .luxe-generic-item {
    margin-bottom: 8pt;
    padding-${isRTL ? 'right' : 'left'}: 10pt;
    border-${isRTL ? 'right' : 'left'}: 1pt solid rgba(212, 175, 55, 0.3);
  }

  .luxe-item-title {
    font-size: 10.5pt;
    font-weight: 600;
    color: #ffffff;
  }

  .luxe-item-meta {
    font-size: 9pt;
    color: #d4af37;
  }

  .luxe-item-description {
    font-size: 9pt;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 4pt;
    line-height: 1.6;
  }

  /* ============================================
     REFERENCES
     ============================================ */
  .luxe-ref-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10pt;
  }

  .luxe-ref-item {
    padding: 10pt;
    border: 1pt solid rgba(212, 175, 55, 0.2);
    border-radius: 4pt;
  }

  .luxe-ref-name {
    font-size: 10pt;
    font-weight: 600;
    color: #ffffff;
  }

  .luxe-ref-title {
    font-size: 8.5pt;
    color: #d4af37;
  }

  .luxe-ref-contact {
    font-size: 8pt;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 4pt;
  }

  /* ============================================
     TAGS
     ============================================ */
  .luxe-tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .luxe-tag {
    padding: 5pt 14pt;
    border: 1pt solid #d4af37;
    color: #d4af37;
    border-radius: 2pt;
    font-size: 8.5pt;
  }

  /* ============================================
     PRINT
     ============================================ */
  @media print {
    .cv-container, .luxe-header, .luxe-summary, .luxe-edu-item, .luxe-skill-category, .luxe-lang-item, .luxe-ref-item {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

const getSectionBuilders = (cvData, language, isRTL) => ({
  summary: () => {
    if (!cvData.summary) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('summary', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        <p class="luxe-summary">${escapeHtml(cvData.summary)}</p>
      </section>
    `;
  },

  experience: () => {
    if (!cvData.experience?.length) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('experience', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        ${cvData.experience.map(exp => {
          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);
          const headerContent = isRTL
            ? `<span class="luxe-item-date">${escapeHtml(dateStr)}</span>
               <div class="luxe-item-title-group">
                 <div class="luxe-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>`
            : `<div class="luxe-item-title-group">
                 <div class="luxe-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>
               <span class="luxe-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="luxe-exp-item">
              <div class="luxe-item-header">${headerContent}</div>
              <div class="luxe-exp-company">${escapeHtml(exp.company)}${exp.location ? ` · ${escapeHtml(exp.location)}` : ''}</div>
              ${exp.description ? `<p class="luxe-exp-description">${escapeHtml(exp.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  education: () => {
    if (!cvData.education?.length) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('education', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        ${cvData.education.map(edu => {
          const dateStr = edu.graduationDate || edu.endDate || '';
          const headerContent = isRTL
            ? `<span class="luxe-item-date">${escapeHtml(dateStr)}</span>
               <div class="luxe-item-title-group"><div class="luxe-edu-degree">${escapeHtml(edu.degree)}</div></div>`
            : `<div class="luxe-item-title-group"><div class="luxe-edu-degree">${escapeHtml(edu.degree)}</div></div>
               <span class="luxe-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="luxe-edu-item">
              <div class="luxe-item-header">${headerContent}</div>
              <div class="luxe-edu-school">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa || edu.honors ? `<div class="luxe-edu-details">${edu.gpa ? `GPA: ${escapeHtml(edu.gpa)}` : ''}${edu.gpa && edu.honors ? ' · ' : ''}${edu.honors || ''}</div>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  skills: () => {
    if (!cvData.skills) return '';
    const items = cvData.skills.items || [];
    const hasOldFormat = cvData.skills.technicalSkills || cvData.skills.softSkills;

    let content = '';
    if (items.length > 0) {
      const categories = {};
      items.forEach(skill => {
        const cat = skill.category || 'other';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(skill);
      });
      content = Object.entries(categories).map(([cat, skills]) => `
        <div class="luxe-skill-category">
          <div class="luxe-skill-category-title">${t(cat + 'Skills', language) || cat}</div>
          <div class="luxe-skills-list">${skills.map(s => `<span class="luxe-skill-tag">${escapeHtml(s.name)}</span>`).join('')}</div>
        </div>
      `).join('');
    } else if (hasOldFormat) {
      content = `
        ${cvData.skills.technicalSkills?.length ? `<div class="luxe-skill-category"><div class="luxe-skill-category-title">${t('technicalSkills', language)}</div><div class="luxe-skills-list">${cvData.skills.technicalSkills.map(s => `<span class="luxe-skill-tag">${escapeHtml(s)}</span>`).join('')}</div></div>` : ''}
        ${cvData.skills.softSkills?.length ? `<div class="luxe-skill-category"><div class="luxe-skill-category-title">${t('softSkills', language)}</div><div class="luxe-skills-list">${cvData.skills.softSkills.map(s => `<span class="luxe-skill-tag">${escapeHtml(s)}</span>`).join('')}</div></div>` : ''}
      `;
    }
    if (!content) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('skills', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        <div class="luxe-skills-grid">${content}</div>
      </section>
    `;
  },

  languages: () => {
    if (!cvData.languages?.length) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('languages', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        <div class="luxe-lang-grid">
          ${cvData.languages.map(lang => `
            <div class="luxe-lang-item">
              <div class="luxe-lang-name">${escapeHtml(lang.language || lang.name)}</div>
              ${lang.proficiency ? `<div class="luxe-lang-level">${escapeHtml(lang.proficiency)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  certifications: () => {
    if (!cvData.certifications?.length) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('certifications', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        ${cvData.certifications.map(cert => {
          const dateStr = cert.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="luxe-item-date">${escapeHtml(dateStr)}</span>` : ''}<div class="luxe-item-title-group"><div class="luxe-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div></div>`
            : `<div class="luxe-item-title-group"><div class="luxe-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div></div>${dateStr ? `<span class="luxe-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `<article class="luxe-generic-item"><div class="luxe-item-header">${headerContent}</div>${cert.issuer ? `<div class="luxe-item-meta">${escapeHtml(cert.issuer)}</div>` : ''}</article>`;
        }).join('')}
      </section>
    `;
  },

  projects: () => {
    if (!cvData.projects?.length) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('projects', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        ${cvData.projects.map(project => `
          <article class="luxe-generic-item">
            <div class="luxe-item-title">${escapeHtml(project.projectName || project.title || project.name)}</div>
            ${project.technologies ? `<div class="luxe-item-meta">${escapeHtml(project.technologies)}</div>` : ''}
            ${project.description ? `<p class="luxe-item-description">${escapeHtml(project.description)}</p>` : ''}
          </article>
        `).join('')}
      </section>
    `;
  },

  achievements: () => {
    if (!cvData.achievements?.length) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('achievements', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        ${cvData.achievements.map(a => `
          <article class="luxe-generic-item">
            <div class="luxe-item-title">${escapeHtml(a.achievement || a.title)}</div>
            ${a.description ? `<p class="luxe-item-description">${escapeHtml(a.description)}</p>` : ''}
          </article>
        `).join('')}
      </section>
    `;
  },

  volunteering: () => {
    if (!cvData.volunteering?.length) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('volunteering', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        ${cvData.volunteering.map(vol => {
          const dateStr = formatDateRange(vol.startDate, vol.endDate, vol.current, language);
          return `
            <article class="luxe-generic-item">
              <div class="luxe-item-header">
                <div class="luxe-item-title-group"><div class="luxe-item-title">${escapeHtml(vol.role || vol.title)}</div></div>
                ${dateStr ? `<span class="luxe-item-date">${escapeHtml(dateStr)}</span>` : ''}
              </div>
              <div class="luxe-item-meta">${escapeHtml(vol.organization)}</div>
              ${vol.description ? `<p class="luxe-item-description">${escapeHtml(vol.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  interests: () => {
    if (!cvData.interests?.length) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('interests', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        <div class="luxe-tags-container">
          ${cvData.interests.map(i => `<span class="luxe-tag">${escapeHtml(typeof i === 'string' ? i : i.name || i.interest)}</span>`).join('')}
        </div>
      </section>
    `;
  },

  additionalInfo: () => {
    if (!cvData.additionalInfo) return '';
    let content = typeof cvData.additionalInfo === 'string' ? `<p class="luxe-item-description">${escapeHtml(cvData.additionalInfo)}</p>` : '';
    if (!content) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('additionalInfo', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        ${content}
      </section>
    `;
  },

  references: () => {
    if (!cvData.references?.length) return '';
    return `
      <section class="luxe-section">
        <div class="luxe-section-header">
          <span class="luxe-section-line"></span>
          <h2 class="luxe-section-title">${t('references', language)}</h2>
          <span class="luxe-section-line"></span>
        </div>
        <div class="luxe-ref-grid">
          ${cvData.references.map(ref => `
            <article class="luxe-ref-item">
              <div class="luxe-ref-name">${escapeHtml(ref.name)}</div>
              ${ref.title ? `<div class="luxe-ref-title">${escapeHtml(ref.title)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>` : ''}
              ${ref.email || ref.phone ? `<div class="luxe-ref-contact">${ref.email || ''}${ref.email && ref.phone ? ' · ' : ''}${ref.phone || ''}</div>` : ''}
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }
});

const generateHTML = (cvData, sections, language, isRTL, cairoFontBase64) => {
  const info = cvData.personalInfo || {};
  const defaultSections = ['summary', 'experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'achievements', 'volunteering', 'interests', 'additionalInfo', 'references'];
  const sectionOrder = sections?.length > 0 ? sections.filter(s => s !== 'personalInfo') : defaultSections;
  const builders = getSectionBuilders(cvData, language, isRTL);
  const sectionsHTML = sectionOrder.map(s => builders[s] ? builders[s]() : '').filter(h => h).join('\n');

  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHtml(info.fullName || 'CV')} - Luxe Resume</title>
      <style>
        ${getBaseCSS(isRTL, cairoFontBase64)}
        ${getLuxeCSS(isRTL)}
      </style>
    </head>
    <body>
      <div class="cv-container">
        <header class="luxe-header">
          <h1 class="luxe-name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'Your Name')}</h1>
          ${info.headline ? `<div class="luxe-headline">${escapeHtml(info.headline)}</div>` : ''}
          <div class="luxe-divider"></div>
          <div class="luxe-contact">
            ${info.email ? `<span class="luxe-contact-item"><span class="luxe-contact-icon">✉</span>${escapeHtml(info.email)}</span>` : ''}
            ${info.phone ? `<span class="luxe-contact-item"><span class="luxe-contact-icon">☎</span>${escapeHtml(info.phone)}</span>` : ''}
            ${info.location ? `<span class="luxe-contact-item"><span class="luxe-contact-icon">◎</span>${escapeHtml(info.location)}</span>` : ''}
            ${info.linkedin ? `<span class="luxe-contact-item"><span class="luxe-contact-icon">in</span>${escapeHtml(info.linkedin)}</span>` : ''}
          </div>
        </header>
        <main class="luxe-body">${sectionsHTML}</main>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateHTML };

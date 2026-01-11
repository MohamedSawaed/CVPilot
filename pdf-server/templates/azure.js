/**
 * AZURE CV TEMPLATE - BLUE GRADIENT PROFESSIONAL
 * ===============================================
 * Modern blue gradient with clean professional lines
 * Perfect for corporate and tech professionals
 */

const { getBaseCSS, t, escapeHtml, formatDateRange } = require('./base');

const getAzureCSS = (isRTL) => `
  /* ============================================
     AZURE TEMPLATE - BLUE GRADIENT
     ============================================ */

  body {
    background: #f0f4f8;
  }

  .cv-container {
    background: white;
    padding: 0;
    overflow: hidden;
  }

  /* ============================================
     HEADER
     ============================================ */
  .azure-header {
    background: linear-gradient(135deg, #0077b6 0%, #0096c7 30%, #00b4d8 70%, #48cae4 100%);
    padding: 24pt 26pt;
    position: relative;
    overflow: hidden;
  }

  .azure-header::before {
    content: '';
    position: absolute;
    top: -50%;
    ${isRTL ? 'left' : 'right'}: -10%;
    width: 200pt;
    height: 200pt;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
  }

  .azure-header::after {
    content: '';
    position: absolute;
    bottom: -30%;
    ${isRTL ? 'right' : 'left'}: -5%;
    width: 150pt;
    height: 150pt;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  }

  .azure-header-content {
    position: relative;
    z-index: 1;
  }

  .azure-name {
    font-size: 28pt;
    font-weight: 700;
    color: white;
    margin-bottom: 6pt;
    letter-spacing: 0.5pt;
    text-shadow: 0 2pt 8pt rgba(0, 0, 0, 0.15);
  }

  .azure-headline {
    font-size: 12pt;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    margin-bottom: 18pt;
  }

  .azure-contact {
    display: flex;
    flex-wrap: wrap;
    gap: 6pt 20pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .azure-contact-item {
    display: flex;
    align-items: center;
    gap: 8pt;
    font-size: 9.5pt;
    color: rgba(255, 255, 255, 0.95);
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .azure-contact-icon {
    width: 22pt;
    height: 22pt;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10pt;
    backdrop-filter: blur(4pt);
  }

  /* ============================================
     BODY
     ============================================ */
  .azure-body {
    display: grid;
    grid-template-columns: 1fr 135pt;
    ${isRTL ? 'direction: rtl;' : ''}
  }

  .azure-main {
    padding: 18pt 20pt;
    border-${isRTL ? 'left' : 'right'}: 1pt solid #e2e8f0;
  }

  .azure-sidebar {
    padding: 18pt 14pt;
    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  }

  /* ============================================
     SECTIONS
     ============================================ */
  .azure-section {
    margin-bottom: 14pt;
    page-break-inside: auto;
    break-inside: auto;
    page-break-before: auto;
  }

  .azure-section-title {
    font-size: 12pt;
    font-weight: 700;
    color: #0077b6;
    margin-bottom: 10pt;
    padding-bottom: 6pt;
    border-bottom: 2pt solid #0077b6;
    display: flex;
    align-items: center;
    gap: 8pt;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .azure-section-icon {
    font-size: 11pt;
    opacity: 0.8;
  }

  /* ============================================
     SIDEBAR SECTIONS
     ============================================ */
  .azure-sidebar-section {
    margin-bottom: 14pt;
  }

  .azure-sidebar-title {
    font-size: 10pt;
    font-weight: 700;
    color: #0077b6;
    margin-bottom: 8pt;
    padding-bottom: 4pt;
    border-bottom: 1pt solid #cbd5e1;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     ITEM HEADER - RTL
     ============================================ */
  .azure-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 14pt;
    margin-bottom: 4pt;
  }

  .azure-item-title-group {
    flex: 1;
    min-width: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .azure-item-date {
    font-size: 8.5pt;
    font-weight: 600;
    color: white;
    white-space: nowrap;
    direction: ltr;
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    padding: 3pt 10pt;
    background: linear-gradient(135deg, #0077b6 0%, #00b4d8 100%);
    border-radius: 10pt;
  }

  /* ============================================
     EXPERIENCE
     ============================================ */
  .azure-exp-item {
    margin-bottom: 10pt;
    padding-${isRTL ? 'right' : 'left'}: 12pt;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #48cae4;
    position: relative;
  }

  .azure-exp-item::before {
    content: '';
    position: absolute;
    ${isRTL ? 'right' : 'left'}: -5pt;
    top: 4pt;
    width: 8pt;
    height: 8pt;
    background: #0077b6;
    border-radius: 50%;
    border: 2pt solid white;
    box-shadow: 0 0 0 2pt #48cae4;
  }

  .azure-exp-title {
    font-size: 11.5pt;
    font-weight: 700;
    color: #1e293b;
  }

  .azure-exp-company {
    font-size: 10pt;
    color: #0077b6;
    font-weight: 600;
    margin-bottom: 6pt;
  }

  .azure-exp-description {
    font-size: 9.5pt;
    color: #475569;
    line-height: 1.65;
  }

  /* ============================================
     EDUCATION
     ============================================ */
  .azure-edu-item {
    margin-bottom: 10pt;
    padding: 10pt 12pt;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 8pt;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #0096c7;
  }

  .azure-edu-degree {
    font-size: 11pt;
    font-weight: 700;
    color: #1e293b;
  }

  .azure-edu-school {
    font-size: 9.5pt;
    color: #0077b6;
    font-weight: 500;
  }

  .azure-edu-details {
    font-size: 8.5pt;
    color: #64748b;
    margin-top: 4pt;
  }

  /* ============================================
     SUMMARY
     ============================================ */
  .azure-summary {
    font-size: 10.5pt;
    color: #475569;
    line-height: 1.75;
    padding: 10pt 14pt;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 10pt;
    border-${isRTL ? 'right' : 'left'}: 4pt solid #0096c7;
  }

  /* ============================================
     SKILLS (Sidebar)
     ============================================ */
  .azure-skill-item {
    margin-bottom: 6pt;
  }

  .azure-skill-name {
    font-size: 9pt;
    color: #334155;
    margin-bottom: 4pt;
    font-weight: 500;
  }

  .azure-skill-bar {
    height: 5pt;
    background: #e2e8f0;
    border-radius: 3pt;
    overflow: hidden;
  }

  .azure-skill-fill {
    height: 100%;
    background: linear-gradient(90deg, #0077b6, #48cae4);
    border-radius: 3pt;
  }

  /* ============================================
     LANGUAGES (Sidebar)
     ============================================ */
  .azure-lang-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6pt;
    padding: 5pt 8pt;
    background: white;
    border-radius: 6pt;
    border: 1pt solid #e2e8f0;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .azure-lang-name {
    font-size: 9pt;
    font-weight: 600;
    color: #334155;
  }

  .azure-lang-level {
    font-size: 7.5pt;
    color: #0077b6;
    font-weight: 500;
  }

  /* ============================================
     GENERIC ITEMS
     ============================================ */
  .azure-generic-item {
    margin-bottom: 8pt;
    padding-${isRTL ? 'right' : 'left'}: 10pt;
    border-${isRTL ? 'right' : 'left'}: 2pt solid #48cae4;
  }

  .azure-item-title {
    font-size: 10.5pt;
    font-weight: 700;
    color: #1e293b;
  }

  .azure-item-meta {
    font-size: 9pt;
    color: #0077b6;
    font-weight: 500;
  }

  .azure-item-description {
    font-size: 9pt;
    color: #475569;
    margin-top: 4pt;
    line-height: 1.55;
  }

  /* ============================================
     REFERENCES
     ============================================ */
  .azure-ref-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8pt;
  }

  .azure-ref-item {
    padding: 8pt 10pt;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 6pt;
  }

  .azure-ref-name {
    font-size: 10pt;
    font-weight: 700;
    color: #1e293b;
  }

  .azure-ref-title {
    font-size: 8.5pt;
    color: #0077b6;
  }

  .azure-ref-contact {
    font-size: 8pt;
    color: #64748b;
    margin-top: 4pt;
  }

  /* ============================================
     TAGS
     ============================================ */
  .azure-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .azure-tag {
    padding: 4pt 10pt;
    background: linear-gradient(135deg, #0077b6, #00b4d8);
    color: white;
    border-radius: 12pt;
    font-size: 8pt;
    font-weight: 500;
  }

  /* ============================================
     PRINT
     ============================================ */
  @media print {
    .azure-header, .azure-sidebar, .azure-edu-item, .azure-summary, .azure-skill-fill, .azure-item-date, .azure-tag, .azure-ref-item {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

const getProficiencyWidth = (proficiency) => {
  const levels = { beginner: '25%', basic: '25%', intermediate: '50%', advanced: '75%', expert: '90%', master: '100%', native: '100%', fluent: '90%', professional: '75%' };
  return levels[proficiency?.toLowerCase()] || '60%';
};

const renderSidebarSkills = (skills, language, isRTL) => {
  if (!skills) return '';
  const items = skills.items || [];
  const allSkills = items.length > 0 ? items : [...(skills.technicalSkills || []), ...(skills.softSkills || [])];
  return allSkills.slice(0, 8).map((skill, i) => `
    <div class="azure-skill-item">
      <div class="azure-skill-name">${escapeHtml(typeof skill === 'string' ? skill : skill.name)}</div>
      <div class="azure-skill-bar">
        <div class="azure-skill-fill" style="width: ${typeof skill === 'object' ? getProficiencyWidth(skill.proficiency) : (70 + i * 5) + '%'}"></div>
      </div>
    </div>
  `).join('');
};

const getSectionBuilders = (cvData, language, isRTL) => ({
  summary: () => {
    if (!cvData.summary) return '';
    return `<section class="azure-section"><h2 class="azure-section-title"><span class="azure-section-icon">◈</span>${t('summary', language)}</h2><p class="azure-summary">${escapeHtml(cvData.summary)}</p></section>`;
  },

  experience: () => {
    if (!cvData.experience?.length) return '';
    return `
      <section class="azure-section">
        <h2 class="azure-section-title"><span class="azure-section-icon">▸</span>${t('experience', language)}</h2>
        ${cvData.experience.map(exp => {
          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);
          const headerContent = isRTL
            ? `<span class="azure-item-date">${escapeHtml(dateStr)}</span><div class="azure-item-title-group"><div class="azure-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div></div>`
            : `<div class="azure-item-title-group"><div class="azure-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div></div><span class="azure-item-date">${escapeHtml(dateStr)}</span>`;
          return `<article class="azure-exp-item"><div class="azure-item-header">${headerContent}</div><div class="azure-exp-company">${escapeHtml(exp.company)}${exp.location ? ` · ${escapeHtml(exp.location)}` : ''}</div>${exp.description ? `<p class="azure-exp-description">${escapeHtml(exp.description)}</p>` : ''}</article>`;
        }).join('')}
      </section>
    `;
  },

  education: () => {
    if (!cvData.education?.length) return '';
    return `
      <section class="azure-section">
        <h2 class="azure-section-title"><span class="azure-section-icon">◆</span>${t('education', language)}</h2>
        ${cvData.education.map(edu => {
          const dateStr = edu.graduationDate || edu.endDate || '';
          const headerContent = isRTL
            ? `<span class="azure-item-date">${escapeHtml(dateStr)}</span><div class="azure-item-title-group"><div class="azure-edu-degree">${escapeHtml(edu.degree)}</div></div>`
            : `<div class="azure-item-title-group"><div class="azure-edu-degree">${escapeHtml(edu.degree)}</div></div><span class="azure-item-date">${escapeHtml(dateStr)}</span>`;
          return `<article class="azure-edu-item"><div class="azure-item-header">${headerContent}</div><div class="azure-edu-school">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>${edu.gpa || edu.honors ? `<div class="azure-edu-details">${edu.gpa ? `GPA: ${escapeHtml(edu.gpa)}` : ''}${edu.gpa && edu.honors ? ' · ' : ''}${edu.honors || ''}</div>` : ''}</article>`;
        }).join('')}
      </section>
    `;
  },

  certifications: () => {
    if (!cvData.certifications?.length) return '';
    return `<section class="azure-section"><h2 class="azure-section-title"><span class="azure-section-icon">✦</span>${t('certifications', language)}</h2>${cvData.certifications.map(cert => `<article class="azure-generic-item"><div class="azure-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>${cert.issuer ? `<div class="azure-item-meta">${escapeHtml(cert.issuer)}</div>` : ''}</article>`).join('')}</section>`;
  },

  projects: () => {
    if (!cvData.projects?.length) return '';
    return `<section class="azure-section"><h2 class="azure-section-title"><span class="azure-section-icon">◉</span>${t('projects', language)}</h2>${cvData.projects.map(p => `<article class="azure-generic-item"><div class="azure-item-title">${escapeHtml(p.projectName || p.title || p.name)}</div>${p.technologies ? `<div class="azure-item-meta">${escapeHtml(p.technologies)}</div>` : ''}${p.description ? `<p class="azure-item-description">${escapeHtml(p.description)}</p>` : ''}</article>`).join('')}</section>`;
  },

  achievements: () => {
    if (!cvData.achievements?.length) return '';
    return `<section class="azure-section"><h2 class="azure-section-title"><span class="azure-section-icon">★</span>${t('achievements', language)}</h2>${cvData.achievements.map(a => `<article class="azure-generic-item"><div class="azure-item-title">${escapeHtml(a.achievement || a.title)}</div>${a.description ? `<p class="azure-item-description">${escapeHtml(a.description)}</p>` : ''}</article>`).join('')}</section>`;
  },

  volunteering: () => {
    if (!cvData.volunteering?.length) return '';
    return `<section class="azure-section"><h2 class="azure-section-title"><span class="azure-section-icon">♡</span>${t('volunteering', language)}</h2>${cvData.volunteering.map(v => `<article class="azure-generic-item"><div class="azure-item-title">${escapeHtml(v.role || v.title)}</div><div class="azure-item-meta">${escapeHtml(v.organization)}</div>${v.description ? `<p class="azure-item-description">${escapeHtml(v.description)}</p>` : ''}</article>`).join('')}</section>`;
  },

  interests: () => {
    if (!cvData.interests?.length) return '';
    return `<section class="azure-section"><h2 class="azure-section-title"><span class="azure-section-icon">✿</span>${t('interests', language)}</h2><div class="azure-tags">${cvData.interests.map(i => `<span class="azure-tag">${escapeHtml(typeof i === 'string' ? i : i.name || i.interest)}</span>`).join('')}</div></section>`;
  },

  references: () => {
    if (!cvData.references?.length) return '';
    return `<section class="azure-section"><h2 class="azure-section-title"><span class="azure-section-icon">◐</span>${t('references', language)}</h2><div class="azure-ref-grid">${cvData.references.map(r => `<article class="azure-ref-item"><div class="azure-ref-name">${escapeHtml(r.name)}</div>${r.title ? `<div class="azure-ref-title">${escapeHtml(r.title)}${r.company ? `, ${escapeHtml(r.company)}` : ''}</div>` : ''}${r.email || r.phone ? `<div class="azure-ref-contact">${r.email || ''}${r.email && r.phone ? ' · ' : ''}${r.phone || ''}</div>` : ''}</article>`).join('')}</div></section>`;
  },

  skills: () => '',
  languages: () => ''
});

const generateHTML = (cvData, sections, language, isRTL, cairoFontBase64) => {
  const info = cvData.personalInfo || {};
  const defaultSections = ['summary', 'experience', 'education', 'certifications', 'projects', 'achievements', 'volunteering', 'interests', 'references'];
  const sectionOrder = sections?.length > 0 ? sections.filter(s => !['personalInfo', 'skills', 'languages'].includes(s)) : defaultSections;
  const builders = getSectionBuilders(cvData, language, isRTL);
  const mainHTML = sectionOrder.map(s => builders[s] ? builders[s]() : '').filter(h => h).join('\n');

  const skillsHTML = renderSidebarSkills(cvData.skills, language, isRTL);
  const langsHTML = cvData.languages?.length ? cvData.languages.map(l => `<div class="azure-lang-item"><span class="azure-lang-name">${escapeHtml(l.language || l.name)}</span>${l.proficiency ? `<span class="azure-lang-level">${escapeHtml(l.proficiency)}</span>` : ''}</div>`).join('') : '';

  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHtml(info.fullName || 'CV')} - Azure Resume</title>
      <style>
        ${getBaseCSS(isRTL, cairoFontBase64)}
        ${getAzureCSS(isRTL)}
      </style>
    </head>
    <body>
      <div class="cv-container">
        <header class="azure-header">
          <div class="azure-header-content">
            <h1 class="azure-name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'Your Name')}</h1>
            ${info.headline ? `<div class="azure-headline">${escapeHtml(info.headline)}</div>` : ''}
            <div class="azure-contact">
              ${info.email ? `<span class="azure-contact-item"><span class="azure-contact-icon">✉</span>${escapeHtml(info.email)}</span>` : ''}
              ${info.phone ? `<span class="azure-contact-item"><span class="azure-contact-icon">☎</span>${escapeHtml(info.phone)}</span>` : ''}
              ${info.location ? `<span class="azure-contact-item"><span class="azure-contact-icon">◎</span>${escapeHtml(info.location)}</span>` : ''}
              ${info.linkedin ? `<span class="azure-contact-item"><span class="azure-contact-icon">in</span>${escapeHtml(info.linkedin)}</span>` : ''}
            </div>
          </div>
        </header>
        <div class="azure-body">
          <main class="azure-main">${mainHTML}</main>
          <aside class="azure-sidebar">
            ${skillsHTML ? `<div class="azure-sidebar-section"><h3 class="azure-sidebar-title">${t('skills', language)}</h3>${skillsHTML}</div>` : ''}
            ${langsHTML ? `<div class="azure-sidebar-section"><h3 class="azure-sidebar-title">${t('languages', language)}</h3>${langsHTML}</div>` : ''}
          </aside>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateHTML };

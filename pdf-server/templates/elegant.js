/**
 * ELEGANT CV TEMPLATE - SOPHISTICATED GRADIENT DESIGN
 * ====================================================
 *
 * PURPOSE: Premium, refined design with elegant purple-rose gradients,
 *          sophisticated typography, and luxurious visual hierarchy.
 *
 * DESIGN PHILOSOPHY:
 * - Stunning purple-to-rose gradient header
 * - Elegant serif + sans-serif typography pairing
 * - Refined spacing with golden ratio proportions
 * - Subtle shadows and depth
 * - Professional yet visually striking
 *
 * ARABIC TYPOGRAPHY RULES (CRITICAL):
 * - Titles/Job names: aligned RIGHT
 * - Dates/Durations: aligned LEFT (always!)
 * - flex-direction: row (explicit) with HTML order swap for RTL
 */

const { getBaseCSS, t, escapeHtml, formatDateRange } = require('./base');

const getElegantCSS = (isRTL) => `
  /* ============================================
     ELEGANT TEMPLATE - SOPHISTICATED DESIGN
     ============================================ */

  body {
    background: #fafafa;
  }

  .cv-container {
    padding: 0;
    background: white;
    box-shadow: 0 4pt 40pt rgba(0, 0, 0, 0.08);
  }

  /* ============================================
     HEADER - Stunning Gradient
     ============================================ */
  .elegant-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 35%, #f093fb 100%);
    color: white;
    padding: 24pt 24pt 20pt;
    position: relative;
    overflow: hidden;
  }

  .elegant-header::before {
    content: '';
    position: absolute;
    top: -50%;
    ${isRTL ? 'left' : 'right'}: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .elegant-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4pt;
    background: linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.8), rgba(255,255,255,0.3));
  }

  .elegant-header-content {
    position: relative;
    z-index: 1;
  }

  .elegant-name {
    font-size: 26pt;
    font-weight: 300;
    letter-spacing: 1pt;
    margin-bottom: 4pt;
    text-shadow: 0 2pt 8pt rgba(0,0,0,0.15);
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .elegant-headline {
    font-size: 11pt;
    font-weight: 400;
    opacity: 0.95;
    margin-bottom: 12pt;
    letter-spacing: 0.5pt;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .elegant-contact-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt 24pt;
    font-size: 9.5pt;
    ${isRTL ? 'flex-direction: row-reverse; justify-content: flex-end;' : ''}
  }

  .elegant-contact-item {
    display: flex;
    align-items: center;
    gap: 6pt;
    opacity: 0.95;
  }

  .elegant-contact-icon {
    width: 16pt;
    height: 16pt;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8pt;
  }

  /* ============================================
     BODY LAYOUT
     ============================================ */
  .elegant-body {
    padding: 18pt 24pt 24pt;
  }

  /* ============================================
     SECTIONS
     ============================================ */
  .elegant-section {
    margin-bottom: 14pt;
    page-break-inside: auto;
    break-inside: auto;
    page-break-before: auto;
  }

  .elegant-section-header {
    display: flex;
    align-items: center;
    gap: 10pt;
    margin-bottom: 10pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .elegant-section-icon {
    width: 32pt;
    height: 32pt;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 8pt;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14pt;
    flex-shrink: 0;
    box-shadow: 0 3pt 10pt rgba(102, 126, 234, 0.3);
  }

  .elegant-section-title {
    font-size: 13pt;
    font-weight: 600;
    color: #2d3748;
    letter-spacing: 0.5pt;
    margin: 0;
    flex: 1;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .elegant-section-line {
    flex: 1;
    height: 1pt;
    background: linear-gradient(${isRTL ? '270deg' : '90deg'}, #667eea 0%, #f093fb 50%, transparent 100%);
  }

  /* ============================================
     ITEM HEADER - ARABIC TYPOGRAPHY
     ============================================ */
  .elegant-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 16pt;
    margin-bottom: 4pt;
  }

  .elegant-item-title-group {
    flex: 1;
    min-width: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .elegant-item-date {
    font-size: 9pt;
    font-weight: 500;
    color: #764ba2;
    white-space: nowrap;
    direction: ltr;
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    padding: 2pt 10pt;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1));
    border-radius: 10pt;
  }

  /* ============================================
     EXPERIENCE
     ============================================ */
  .elegant-exp-item {
    margin-bottom: 10pt;
    padding: 10pt 12pt;
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f9 100%);
    border-radius: 8pt;
    border-${isRTL ? 'right' : 'left'}: 3pt solid;
    border-image: linear-gradient(180deg, #667eea, #f093fb) 1;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .elegant-exp-title {
    font-size: 12pt;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 2pt;
  }

  .elegant-exp-company {
    font-size: 10pt;
    color: #667eea;
    font-weight: 500;
    margin-bottom: 5pt;
  }

  .elegant-exp-description {
    font-size: 10pt;
    color: #4a5568;
    line-height: 1.7;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     EDUCATION
     ============================================ */
  .elegant-edu-item {
    margin-bottom: 8pt;
    padding: 10pt 12pt;
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f9 100%);
    border-radius: 8pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .elegant-edu-degree {
    font-size: 11.5pt;
    font-weight: 600;
    color: #2d3748;
  }

  .elegant-edu-school {
    font-size: 10pt;
    color: #764ba2;
    font-weight: 500;
  }

  .elegant-edu-details {
    font-size: 9pt;
    color: #718096;
    margin-top: 4pt;
  }

  /* ============================================
     SUMMARY
     ============================================ */
  .elegant-summary {
    font-size: 10pt;
    color: #4a5568;
    line-height: 1.6;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
    padding: 12pt 14pt;
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f9 100%);
    border-radius: 10pt;
    position: relative;
  }

  .elegant-summary::before {
    content: '"';
    position: absolute;
    top: 8pt;
    ${isRTL ? 'right' : 'left'}: 12pt;
    font-size: 36pt;
    color: #667eea;
    opacity: 0.3;
    font-family: Georgia, serif;
    line-height: 1;
  }

  /* ============================================
     SKILLS
     ============================================ */
  .elegant-skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .elegant-skill-tag {
    padding: 6pt 14pt;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-radius: 16pt;
    font-size: 9pt;
    font-weight: 500;
    box-shadow: 0 2pt 8pt rgba(102, 126, 234, 0.25);
  }

  .elegant-skill-tag.secondary {
    background: linear-gradient(135deg, #764ba2, #f093fb);
  }

  .elegant-skill-category {
    margin-bottom: 8pt;
  }

  .elegant-skill-category-title {
    font-size: 9pt;
    font-weight: 600;
    color: #667eea;
    margin-bottom: 5pt;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     LANGUAGES
     ============================================ */
  .elegant-lang-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90pt, 1fr));
    gap: 8pt;
  }

  .elegant-lang-item {
    padding: 8pt 10pt;
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f9 100%);
    border-radius: 6pt;
    text-align: center;
  }

  .elegant-lang-name {
    font-size: 10pt;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 2pt;
  }

  .elegant-lang-level {
    font-size: 8.5pt;
    color: #667eea;
    font-weight: 500;
  }

  /* ============================================
     GENERIC ITEMS
     ============================================ */
  .elegant-generic-item {
    margin-bottom: 8pt;
    padding: 8pt 12pt;
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f9 100%);
    border-radius: 6pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .elegant-item-title {
    font-size: 10.5pt;
    font-weight: 600;
    color: #2d3748;
  }

  .elegant-item-meta {
    font-size: 9.5pt;
    color: #667eea;
    font-weight: 500;
  }

  .elegant-item-description {
    font-size: 9.5pt;
    color: #4a5568;
    margin-top: 4pt;
    line-height: 1.6;
  }

  /* ============================================
     REFERENCES
     ============================================ */
  .elegant-ref-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8pt;
  }

  .elegant-ref-item {
    padding: 10pt 12pt;
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f9 100%);
    border-radius: 8pt;
    border-top: 2pt solid;
    border-image: linear-gradient(90deg, #667eea, #f093fb) 1;
    page-break-inside: avoid;
  }

  .elegant-ref-name {
    font-size: 10.5pt;
    font-weight: 600;
    color: #2d3748;
  }

  .elegant-ref-title {
    font-size: 9pt;
    color: #667eea;
  }

  .elegant-ref-contact {
    font-size: 8.5pt;
    color: #718096;
    margin-top: 4pt;
  }

  /* ============================================
     INTERESTS / ADDITIONAL
     ============================================ */
  .elegant-tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .elegant-tag {
    padding: 5pt 12pt;
    background: transparent;
    color: #667eea;
    border: 1.5pt solid #667eea;
    border-radius: 14pt;
    font-size: 9pt;
    font-weight: 500;
  }

  .elegant-info-text {
    font-size: 10pt;
    color: #4a5568;
    line-height: 1.6;
  }

  /* ============================================
     PRINT
     ============================================ */
  @media print {
    .elegant-header {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .elegant-skill-tag, .elegant-section-icon {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

const getSectionIcon = (sectionKey) => {
  const icons = {
    summary: '✦',
    experience: '◈',
    education: '◆',
    skills: '◇',
    certifications: '✧',
    projects: '◉',
    achievements: '★',
    volunteering: '♡',
    languages: '◎',
    interests: '✿',
    additionalInfo: '◌',
    references: '◐'
  };
  return icons[sectionKey] || '•';
};

const renderElegantSkills = (skills, language) => {
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

    return Object.entries(categories).map(([category, catSkills], idx) => `
      <div class="elegant-skill-category">
        <div class="elegant-skill-category-title">${escapeHtml(categoryLabels[category] || category)}</div>
        <div class="elegant-skills-container">
          ${catSkills.map((s, i) => `<span class="elegant-skill-tag ${idx % 2 === 1 ? 'secondary' : ''}">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  let html = '';
  if (skills.technicalSkills?.length > 0) {
    html += `
      <div class="elegant-skill-category">
        <div class="elegant-skill-category-title">${t('technicalSkills', language)}</div>
        <div class="elegant-skills-container">
          ${skills.technicalSkills.map(s => `<span class="elegant-skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  if (skills.softSkills?.length > 0) {
    html += `
      <div class="elegant-skill-category">
        <div class="elegant-skill-category-title">${t('softSkills', language)}</div>
        <div class="elegant-skills-container">
          ${skills.softSkills.map(s => `<span class="elegant-skill-tag secondary">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  return html;
};

const getSectionBuilders = (cvData, language, isRTL) => ({
  summary: () => {
    if (!cvData.summary) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('summary')}</div>
          <h2 class="elegant-section-title">${t('summary', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        <p class="elegant-summary">${escapeHtml(cvData.summary)}</p>
      </section>
    `;
  },

  experience: () => {
    if (!cvData.experience?.length) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('experience')}</div>
          <h2 class="elegant-section-title">${t('experience', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        ${cvData.experience.map(exp => {
          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);
          const headerContent = isRTL
            ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>
               <div class="elegant-item-title-group">
                 <div class="elegant-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>`
            : `<div class="elegant-item-title-group">
                 <div class="elegant-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>
               <span class="elegant-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="elegant-exp-item">
              <div class="elegant-item-header">
                ${headerContent}
              </div>
              <div class="elegant-exp-company">${escapeHtml(exp.company)}${exp.location ? ` · ${escapeHtml(exp.location)}` : ''}</div>
              ${exp.description ? `<p class="elegant-exp-description">${escapeHtml(exp.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  education: () => {
    if (!cvData.education?.length) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('education')}</div>
          <h2 class="elegant-section-title">${t('education', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        ${cvData.education.map(edu => {
          const dateStr = edu.graduationDate || edu.endDate || '';
          const headerContent = isRTL
            ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>
               <div class="elegant-item-title-group">
                 <div class="elegant-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>`
            : `<div class="elegant-item-title-group">
                 <div class="elegant-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>
               <span class="elegant-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="elegant-edu-item">
              <div class="elegant-item-header">
                ${headerContent}
              </div>
              <div class="elegant-edu-school">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa || edu.honors ? `
                <div class="elegant-edu-details">
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
    const skillsHTML = renderElegantSkills(cvData.skills, language);
    if (!skillsHTML) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('skills')}</div>
          <h2 class="elegant-section-title">${t('skills', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        ${skillsHTML}
      </section>
    `;
  },

  languages: () => {
    if (!cvData.languages?.length) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('languages')}</div>
          <h2 class="elegant-section-title">${t('languages', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        <div class="elegant-lang-grid">
          ${cvData.languages.map(lang => `
            <div class="elegant-lang-item">
              <div class="elegant-lang-name">${escapeHtml(lang.language || lang.name)}</div>
              ${lang.proficiency ? `<div class="elegant-lang-level">${escapeHtml(lang.proficiency)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  certifications: () => {
    if (!cvData.certifications?.length) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('certifications')}</div>
          <h2 class="elegant-section-title">${t('certifications', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        ${cvData.certifications.map(cert => {
          const dateStr = cert.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="elegant-item-title-group">
                 <div class="elegant-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>`
            : `<div class="elegant-item-title-group">
                 <div class="elegant-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>
               ${dateStr ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="elegant-generic-item">
              <div class="elegant-item-header">
                ${headerContent}
              </div>
              ${cert.issuer ? `<div class="elegant-item-meta">${escapeHtml(cert.issuer)}</div>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  projects: () => {
    if (!cvData.projects?.length) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('projects')}</div>
          <h2 class="elegant-section-title">${t('projects', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        ${cvData.projects.map(project => {
          const dateStr = project.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="elegant-item-title-group">
                 <div class="elegant-item-title">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>`
            : `<div class="elegant-item-title-group">
                 <div class="elegant-item-title">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>
               ${dateStr ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="elegant-generic-item">
              <div class="elegant-item-header">
                ${headerContent}
              </div>
              ${project.technologies ? `<div class="elegant-item-meta">${escapeHtml(project.technologies)}</div>` : ''}
              ${project.description ? `<p class="elegant-item-description">${escapeHtml(project.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  achievements: () => {
    if (!cvData.achievements?.length) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('achievements')}</div>
          <h2 class="elegant-section-title">${t('achievements', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        ${cvData.achievements.map(achievement => {
          const dateStr = achievement.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="elegant-item-title-group">
                 <div class="elegant-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>`
            : `<div class="elegant-item-title-group">
                 <div class="elegant-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>
               ${dateStr ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="elegant-generic-item">
              <div class="elegant-item-header">
                ${headerContent}
              </div>
              ${achievement.description ? `<p class="elegant-item-description">${escapeHtml(achievement.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  volunteering: () => {
    if (!cvData.volunteering?.length) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('volunteering')}</div>
          <h2 class="elegant-section-title">${t('volunteering', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        ${cvData.volunteering.map(vol => {
          const dateStr = formatDateRange(vol.startDate, vol.endDate, vol.current, language);
          const headerContent = isRTL
            ? `${dateStr ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="elegant-item-title-group">
                 <div class="elegant-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>`
            : `<div class="elegant-item-title-group">
                 <div class="elegant-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>
               ${dateStr ? `<span class="elegant-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="elegant-generic-item">
              <div class="elegant-item-header">
                ${headerContent}
              </div>
              <div class="elegant-item-meta">${escapeHtml(vol.organization)}</div>
              ${vol.description ? `<p class="elegant-item-description">${escapeHtml(vol.description)}</p>` : ''}
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
      return `<span class="elegant-tag">${escapeHtml(name)}</span>`;
    }).join('');
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('interests')}</div>
          <h2 class="elegant-section-title">${t('interests', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        <div class="elegant-tags-container">${items}</div>
      </section>
    `;
  },

  additionalInfo: () => {
    if (!cvData.additionalInfo) return '';
    let content = '';
    if (typeof cvData.additionalInfo === 'string') {
      content = `<p class="elegant-info-text">${escapeHtml(cvData.additionalInfo)}</p>`;
    } else if (cvData.additionalInfo.items && Array.isArray(cvData.additionalInfo.items)) {
      content = `
        <div class="elegant-tags-container">
          ${cvData.additionalInfo.items.map(item => `<span class="elegant-tag">${escapeHtml(item)}</span>`).join('')}
        </div>
      `;
    } else if (cvData.additionalInfo.text) {
      content = `<p class="elegant-info-text">${escapeHtml(cvData.additionalInfo.text)}</p>`;
    }
    if (!content) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('additionalInfo')}</div>
          <h2 class="elegant-section-title">${t('additionalInfo', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        ${content}
      </section>
    `;
  },

  references: () => {
    if (!cvData.references?.length) return '';
    return `
      <section class="elegant-section">
        <div class="elegant-section-header">
          <div class="elegant-section-icon">${getSectionIcon('references')}</div>
          <h2 class="elegant-section-title">${t('references', language)}</h2>
          <div class="elegant-section-line"></div>
        </div>
        <div class="elegant-ref-grid">
          ${cvData.references.map(ref => `
            <article class="elegant-ref-item">
              <div class="elegant-ref-name">${escapeHtml(ref.name)}</div>
              ${ref.title ? `<div class="elegant-ref-title">${escapeHtml(ref.title)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>` : ''}
              ${ref.email || ref.phone ? `
                <div class="elegant-ref-contact">
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

  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=210mm, initial-scale=1.0">
      <title>${escapeHtml(info.fullName || 'CV')} - Elegant Resume</title>
      <style>
        ${getBaseCSS(isRTL, cairoFontBase64)}
        ${getElegantCSS(isRTL)}
      </style>
    </head>
    <body>
      <div class="cv-container">
        <header class="elegant-header">
          <div class="elegant-header-content">
            <h1 class="elegant-name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'Your Name')}</h1>
            ${info.headline ? `<div class="elegant-headline">${escapeHtml(info.headline)}</div>` : ''}
            <div class="elegant-contact-grid">
              ${info.email ? `<span class="elegant-contact-item"><span class="elegant-contact-icon">✉</span>${escapeHtml(info.email)}</span>` : ''}
              ${info.phone ? `<span class="elegant-contact-item"><span class="elegant-contact-icon">☎</span>${escapeHtml(info.phone)}</span>` : ''}
              ${info.location ? `<span class="elegant-contact-item"><span class="elegant-contact-icon">◎</span>${escapeHtml(info.location)}</span>` : ''}
              ${info.linkedin ? `<span class="elegant-contact-item"><span class="elegant-contact-icon">in</span>${escapeHtml(info.linkedin)}</span>` : ''}
              ${info.website ? `<span class="elegant-contact-item"><span class="elegant-contact-icon">◇</span>${escapeHtml(info.website)}</span>` : ''}
            </div>
          </div>
        </header>
        <main class="elegant-body">
          ${sectionsHTML}
        </main>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateHTML };

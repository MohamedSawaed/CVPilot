/**
 * EXECUTIVE CV TEMPLATE - LUXURY PREMIUM DESIGN
 * ==============================================
 *
 * PURPOSE: High-end executive/leadership CV with sophisticated typography,
 *          elegant spacing, and premium visual hierarchy.
 *
 * DESIGN PHILOSOPHY:
 * - Gold/Navy color scheme for executive presence
 * - Generous whitespace and breathing room
 * - Sophisticated serif + sans-serif typography pairing
 * - Subtle decorative elements (no icons, elegant lines)
 * - Premium paper feel
 *
 * ARABIC TYPOGRAPHY RULES (CRITICAL):
 * - Titles/Job names: aligned RIGHT
 * - Dates/Durations: aligned LEFT (always!)
 * - flex-direction: row (explicit) with HTML order swap for RTL
 */

const { getBaseCSS, t, escapeHtml, formatDateRange } = require('./base');

const getExecutiveCSS = (isRTL) => `
  /* ============================================
     EXECUTIVE TEMPLATE - LUXURY DESIGN
     ============================================ */

  body {
    background: #fefefe;
  }

  .cv-container {
    padding: 0;
    background: white;
  }

  /* ============================================
     HEADER - Elegant Navy with Gold Accent
     ============================================ */
  .exec-header {
    background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%);
    color: white;
    padding: 28pt 24pt 24pt;
    position: relative;
    overflow: hidden;
  }

  .exec-header::before {
    content: '';
    position: absolute;
    top: 0;
    ${isRTL ? 'right' : 'left'}: 0;
    width: 6pt;
    height: 100%;
    background: linear-gradient(180deg, #d69e2e, #ecc94b, #d69e2e);
  }

  .exec-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3pt;
    background: linear-gradient(90deg, transparent, #d69e2e 20%, #ecc94b 50%, #d69e2e 80%, transparent);
  }

  .exec-name {
    font-size: 28pt;
    font-weight: 300;
    letter-spacing: 4pt;
    text-transform: uppercase;
    margin-bottom: 6pt;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .exec-headline {
    font-size: 12pt;
    font-weight: 400;
    color: #ecc94b;
    letter-spacing: 2pt;
    text-transform: uppercase;
    margin-bottom: 16pt;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .exec-contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt 20pt;
    font-size: 9.5pt;
    color: rgba(255,255,255,0.9);
    ${isRTL ? 'flex-direction: row-reverse; justify-content: flex-end;' : ''}
  }

  .exec-contact-item {
    display: flex;
    align-items: center;
    gap: 6pt;
  }

  .exec-contact-divider {
    color: #d69e2e;
    font-weight: 300;
  }

  /* ============================================
     BODY LAYOUT
     ============================================ */
  .exec-body {
    padding: 20pt 24pt 24pt;
  }

  /* ============================================
     SECTIONS
     ============================================ */
  .exec-section {
    margin-bottom: 14pt;
    page-break-inside: auto;
    break-inside: auto;
    page-break-before: auto;
  }

  .exec-section-header {
    display: flex;
    align-items: center;
    gap: 10pt;
    margin-bottom: 10pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .exec-section-title {
    font-size: 11pt;
    font-weight: 600;
    color: #1a365d;
    text-transform: uppercase;
    letter-spacing: 2pt;
    white-space: nowrap;
    page-break-after: avoid;
    break-after: avoid;
  }

  .exec-section-line {
    flex: 1;
    height: 1pt;
    background: linear-gradient(${isRTL ? '270deg' : '90deg'}, #d69e2e 0%, transparent 100%);
  }

  /* ============================================
     ITEM HEADER - ARABIC TYPOGRAPHY
     ============================================ */
  .exec-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 16pt;
    margin-bottom: 4pt;
  }

  .exec-item-title-group {
    flex: 1;
    min-width: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .exec-item-date {
    font-size: 9.5pt;
    font-weight: 400;
    color: #718096;
    white-space: nowrap;
    direction: ltr;
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    font-style: italic;
  }

  /* ============================================
     EXPERIENCE
     ============================================ */
  .exec-exp-item {
    margin-bottom: 10pt;
    padding-bottom: 8pt;
    border-bottom: 1pt solid #e8ecf4;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .exec-exp-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .exec-exp-title {
    font-size: 12pt;
    font-weight: 600;
    color: #1a365d;
    margin-bottom: 2pt;
  }

  .exec-exp-company {
    font-size: 10.5pt;
    color: #d69e2e;
    font-weight: 500;
    margin-bottom: 6pt;
  }

  .exec-exp-description {
    font-size: 10pt;
    color: #4a5568;
    line-height: 1.7;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     EDUCATION
     ============================================ */
  .exec-edu-item {
    margin-bottom: 8pt;
    padding-bottom: 6pt;
    border-bottom: 1pt solid #e8ecf4;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .exec-edu-item:last-child {
    border-bottom: none;
  }

  .exec-edu-degree {
    font-size: 11.5pt;
    font-weight: 600;
    color: #1a365d;
  }

  .exec-edu-school {
    font-size: 10pt;
    color: #d69e2e;
    font-weight: 500;
  }

  .exec-edu-details {
    font-size: 9.5pt;
    color: #718096;
    margin-top: 2pt;
    font-style: italic;
  }

  /* ============================================
     SUMMARY
     ============================================ */
  .exec-summary {
    font-size: 10.5pt;
    color: #4a5568;
    line-height: 1.75;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
    padding: 12pt 16pt;
    background: #f8fafc;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #d69e2e;
  }

  /* ============================================
     SKILLS
     ============================================ */
  .exec-skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12pt 24pt;
  }

  .exec-skill-category {
    margin-bottom: 8pt;
  }

  .exec-skill-category-title {
    font-size: 9.5pt;
    font-weight: 600;
    color: #1a365d;
    text-transform: uppercase;
    letter-spacing: 1pt;
    margin-bottom: 6pt;
    border-bottom: 1pt solid #d69e2e;
    padding-bottom: 3pt;
  }

  .exec-skills-list {
    font-size: 9.5pt;
    color: #4a5568;
    line-height: 1.6;
  }

  /* ============================================
     LANGUAGES
     ============================================ */
  .exec-lang-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10pt;
  }

  .exec-lang-item {
    text-align: center;
    padding: 8pt;
    background: #f8fafc;
    border-radius: 4pt;
  }

  .exec-lang-name {
    font-size: 10pt;
    font-weight: 600;
    color: #1a365d;
    margin-bottom: 2pt;
  }

  .exec-lang-level {
    font-size: 8.5pt;
    color: #d69e2e;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
  }

  /* ============================================
     GENERIC ITEMS (Certs, Projects, etc.)
     ============================================ */
  .exec-generic-item {
    margin-bottom: 6pt;
    padding-bottom: 5pt;
    border-bottom: 1pt solid #e8ecf4;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .exec-generic-item:last-child {
    border-bottom: none;
  }

  .exec-item-title {
    font-size: 10.5pt;
    font-weight: 600;
    color: #1a365d;
  }

  .exec-item-meta {
    font-size: 9.5pt;
    color: #d69e2e;
    font-weight: 500;
  }

  .exec-item-description {
    font-size: 9.5pt;
    color: #4a5568;
    margin-top: 4pt;
    line-height: 1.55;
  }

  /* ============================================
     REFERENCES
     ============================================ */
  .exec-ref-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14pt;
  }

  .exec-ref-item {
    padding: 10pt 12pt;
    background: #f8fafc;
    border-radius: 4pt;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #d69e2e;
  }

  .exec-ref-name {
    font-size: 10.5pt;
    font-weight: 600;
    color: #1a365d;
  }

  .exec-ref-title {
    font-size: 9pt;
    color: #d69e2e;
    font-style: italic;
  }

  .exec-ref-contact {
    font-size: 8.5pt;
    color: #718096;
    margin-top: 4pt;
  }

  /* ============================================
     INTERESTS / ADDITIONAL INFO
     ============================================ */
  .exec-tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .exec-tag {
    background: transparent;
    color: #1a365d;
    padding: 4pt 12pt;
    border: 1pt solid #d69e2e;
    font-size: 9pt;
    font-weight: 500;
  }

  .exec-info-text {
    font-size: 10pt;
    color: #4a5568;
    line-height: 1.6;
  }

  /* ============================================
     PRINT
     ============================================ */
  @media print {
    .exec-header {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

const renderExecutiveSkills = (skills, language) => {
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
      <div class="exec-skills-grid">
        ${Object.entries(categories).map(([category, catSkills]) => `
          <div class="exec-skill-category">
            <div class="exec-skill-category-title">${escapeHtml(categoryLabels[category] || category)}</div>
            <div class="exec-skills-list">${catSkills.map(s => escapeHtml(s)).join(' • ')}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  let html = '<div class="exec-skills-grid">';
  if (skills.technicalSkills?.length > 0) {
    html += `
      <div class="exec-skill-category">
        <div class="exec-skill-category-title">${t('technicalSkills', language)}</div>
        <div class="exec-skills-list">${skills.technicalSkills.map(s => escapeHtml(s)).join(' • ')}</div>
      </div>
    `;
  }
  if (skills.softSkills?.length > 0) {
    html += `
      <div class="exec-skill-category">
        <div class="exec-skill-category-title">${t('softSkills', language)}</div>
        <div class="exec-skills-list">${skills.softSkills.map(s => escapeHtml(s)).join(' • ')}</div>
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
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('summary', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        <p class="exec-summary">${escapeHtml(cvData.summary)}</p>
      </section>
    `;
  },

  experience: () => {
    if (!cvData.experience?.length) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('experience', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        ${cvData.experience.map(exp => {
          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);
          const headerContent = isRTL
            ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>
               <div class="exec-item-title-group">
                 <div class="exec-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>`
            : `<div class="exec-item-title-group">
                 <div class="exec-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>
               <span class="exec-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="exec-exp-item">
              <div class="exec-item-header">
                ${headerContent}
              </div>
              <div class="exec-exp-company">${escapeHtml(exp.company)}${exp.location ? ` — ${escapeHtml(exp.location)}` : ''}</div>
              ${exp.description ? `<p class="exec-exp-description">${escapeHtml(exp.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  education: () => {
    if (!cvData.education?.length) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('education', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        ${cvData.education.map(edu => {
          const dateStr = edu.graduationDate || edu.endDate || '';
          const headerContent = isRTL
            ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>
               <div class="exec-item-title-group">
                 <div class="exec-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>`
            : `<div class="exec-item-title-group">
                 <div class="exec-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>
               <span class="exec-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="exec-edu-item">
              <div class="exec-item-header">
                ${headerContent}
              </div>
              <div class="exec-edu-school">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa || edu.honors ? `
                <div class="exec-edu-details">
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

  skills: () => {
    const skillsHTML = renderExecutiveSkills(cvData.skills, language);
    if (!skillsHTML) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('skills', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        ${skillsHTML}
      </section>
    `;
  },

  certifications: () => {
    if (!cvData.certifications?.length) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('certifications', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        ${cvData.certifications.map(cert => {
          const dateStr = cert.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="exec-item-title-group">
                 <div class="exec-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>`
            : `<div class="exec-item-title-group">
                 <div class="exec-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>
               ${dateStr ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="exec-generic-item">
              <div class="exec-item-header">
                ${headerContent}
              </div>
              ${cert.issuer ? `<div class="exec-item-meta">${escapeHtml(cert.issuer)}</div>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  languages: () => {
    if (!cvData.languages?.length) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('languages', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        <div class="exec-lang-grid">
          ${cvData.languages.map(lang => `
            <div class="exec-lang-item">
              <div class="exec-lang-name">${escapeHtml(lang.language || lang.name)}</div>
              ${lang.proficiency ? `<div class="exec-lang-level">${escapeHtml(lang.proficiency)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  projects: () => {
    if (!cvData.projects?.length) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('projects', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        ${cvData.projects.map(project => {
          const dateStr = project.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="exec-item-title-group">
                 <div class="exec-item-title">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>`
            : `<div class="exec-item-title-group">
                 <div class="exec-item-title">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>
               ${dateStr ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="exec-generic-item">
              <div class="exec-item-header">
                ${headerContent}
              </div>
              ${project.technologies ? `<div class="exec-item-meta">${escapeHtml(project.technologies)}</div>` : ''}
              ${project.description ? `<p class="exec-item-description">${escapeHtml(project.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  achievements: () => {
    if (!cvData.achievements?.length) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('achievements', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        ${cvData.achievements.map(achievement => {
          const dateStr = achievement.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="exec-item-title-group">
                 <div class="exec-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>`
            : `<div class="exec-item-title-group">
                 <div class="exec-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>
               ${dateStr ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="exec-generic-item">
              <div class="exec-item-header">
                ${headerContent}
              </div>
              ${achievement.description ? `<p class="exec-item-description">${escapeHtml(achievement.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  volunteering: () => {
    if (!cvData.volunteering?.length) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('volunteering', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        ${cvData.volunteering.map(vol => {
          const dateStr = formatDateRange(vol.startDate, vol.endDate, vol.current, language);
          const headerContent = isRTL
            ? `${dateStr ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="exec-item-title-group">
                 <div class="exec-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>`
            : `<div class="exec-item-title-group">
                 <div class="exec-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>
               ${dateStr ? `<span class="exec-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="exec-generic-item">
              <div class="exec-item-header">
                ${headerContent}
              </div>
              <div class="exec-item-meta">${escapeHtml(vol.organization)}</div>
              ${vol.description ? `<p class="exec-item-description">${escapeHtml(vol.description)}</p>` : ''}
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
      return `<span class="exec-tag">${escapeHtml(name)}</span>`;
    }).join('');
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('interests', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        <div class="exec-tags-container">${items}</div>
      </section>
    `;
  },

  additionalInfo: () => {
    if (!cvData.additionalInfo) return '';
    let content = '';
    if (typeof cvData.additionalInfo === 'string') {
      content = `<p class="exec-info-text">${escapeHtml(cvData.additionalInfo)}</p>`;
    } else if (cvData.additionalInfo.items && Array.isArray(cvData.additionalInfo.items)) {
      content = `
        <div class="exec-tags-container">
          ${cvData.additionalInfo.items.map(item => `<span class="exec-tag">${escapeHtml(item)}</span>`).join('')}
        </div>
      `;
    } else if (cvData.additionalInfo.text) {
      content = `<p class="exec-info-text">${escapeHtml(cvData.additionalInfo.text)}</p>`;
    }
    if (!content) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('additionalInfo', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        ${content}
      </section>
    `;
  },

  references: () => {
    if (!cvData.references?.length) return '';
    return `
      <section class="exec-section">
        <div class="exec-section-header">
          <h2 class="exec-section-title">${t('references', language)}</h2>
          <div class="exec-section-line"></div>
        </div>
        <div class="exec-ref-grid">
          ${cvData.references.map(ref => `
            <article class="exec-ref-item">
              <div class="exec-ref-name">${escapeHtml(ref.name)}</div>
              ${ref.title ? `<div class="exec-ref-title">${escapeHtml(ref.title)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>` : ''}
              ${ref.email || ref.phone ? `
                <div class="exec-ref-contact">
                  ${ref.email ? escapeHtml(ref.email) : ''}
                  ${ref.email && ref.phone ? ' | ' : ''}
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
      <title>${escapeHtml(info.fullName || 'CV')} - Executive Resume</title>
      <style>
        ${getBaseCSS(isRTL, cairoFontBase64)}
        ${getExecutiveCSS(isRTL)}
      </style>
    </head>
    <body>
      <div class="cv-container">
        <header class="exec-header">
          <h1 class="exec-name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'YOUR NAME')}</h1>
          ${info.headline ? `<div class="exec-headline">${escapeHtml(info.headline)}</div>` : ''}
          <div class="exec-contact-row">
            ${contactItems.map((item, i) => `
              ${i > 0 ? '<span class="exec-contact-divider">|</span>' : ''}
              <span class="exec-contact-item">${item}</span>
            `).join('')}
          </div>
        </header>
        <main class="exec-body">
          ${sectionsHTML}
        </main>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateHTML };

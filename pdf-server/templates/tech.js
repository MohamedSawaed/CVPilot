/**
 * TECH CV TEMPLATE - DEVELOPER/ENGINEER FOCUSED
 * ==============================================
 *
 * PURPOSE: Modern tech-industry CV with code-inspired aesthetics,
 *          terminal vibes, and emphasis on technical skills.
 *
 * DESIGN PHILOSOPHY:
 * - Dark mode header with monospace elements
 * - Code-block style for skills
 * - GitHub/terminal inspired aesthetics
 * - Tech color scheme (emerald/cyan accents)
 * - Two-column layout for efficiency
 *
 * ARABIC TYPOGRAPHY RULES (CRITICAL):
 * - Titles/Job names: aligned RIGHT
 * - Dates/Durations: aligned LEFT (always!)
 * - flex-direction: row (explicit) with HTML order swap for RTL
 */

const { getBaseCSS, t, escapeHtml, formatDateRange } = require('./base');

const getTechCSS = (isRTL) => `
  /* ============================================
     TECH TEMPLATE - DEVELOPER FOCUSED
     ============================================ */

  body {
    background: #f8fafc;
  }

  .cv-container {
    padding: 0;
    background: white;
  }

  /* ============================================
     HEADER - Terminal Style
     ============================================ */
  .tech-header {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: white;
    padding: 18pt 20pt;
    position: relative;
  }

  .tech-header::before {
    content: '$ whoami';
    position: absolute;
    top: 8pt;
    ${isRTL ? 'right' : 'left'}: 20pt;
    font-family: 'Courier New', monospace;
    font-size: 8pt;
    color: #10b981;
    opacity: 0.7;
  }

  .tech-name {
    font-size: 24pt;
    font-weight: 700;
    margin-bottom: 4pt;
    margin-top: 6pt;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .tech-name::before {
    content: '>';
    color: #10b981;
    margin-${isRTL ? 'left' : 'right'}: 8pt;
    font-family: 'Courier New', monospace;
  }

  .tech-headline {
    font-size: 11pt;
    color: #22d3ee;
    font-family: 'Courier New', monospace;
    margin-bottom: 14pt;
    text-align: ${isRTL ? 'right' : 'left'};
    ${isRTL ? 'padding-right: 24pt;' : 'padding-left: 24pt;'}
  }

  .tech-contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6pt 16pt;
    font-size: 9pt;
    ${isRTL ? 'flex-direction: row-reverse; justify-content: flex-end;' : ''}
  }

  .tech-contact-item {
    display: flex;
    align-items: center;
    gap: 6pt;
    color: #94a3b8;
  }

  .tech-contact-icon {
    color: #10b981;
    font-family: 'Courier New', monospace;
    font-size: 10pt;
  }

  .tech-contact-link {
    color: #22d3ee;
  }

  /* ============================================
     BODY - Two Column
     ============================================ */
  .tech-body {
    display: flex;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .tech-sidebar {
    width: 70mm;
    background: #f1f5f9;
    padding: 14pt 12pt;
    ${isRTL ? 'border-left: 2pt solid #10b981;' : 'border-right: 2pt solid #10b981;'}
  }

  .tech-main {
    flex: 1;
    padding: 14pt 16pt;
  }

  /* ============================================
     SECTIONS
     ============================================ */
  .tech-section {
    margin-bottom: 12pt;
    page-break-inside: auto;
    break-inside: auto;
    page-break-before: auto;
  }

  .tech-section-title {
    font-size: 10pt;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 1.5pt;
    margin-bottom: 8pt;
    padding-bottom: 4pt;
    border-bottom: 2pt solid #10b981;
    display: flex;
    align-items: center;
    gap: 8pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
    page-break-after: avoid;
    break-after: avoid;
  }

  .tech-section-icon {
    font-family: 'Courier New', monospace;
    color: #10b981;
    font-size: 11pt;
  }

  .tech-sidebar .tech-section-title {
    font-size: 9pt;
    color: #475569;
    border-bottom-color: #cbd5e1;
  }

  /* ============================================
     ITEM HEADER - ARABIC TYPOGRAPHY
     ============================================ */
  .tech-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 14pt;
    margin-bottom: 3pt;
  }

  .tech-item-title-group {
    flex: 1;
    min-width: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .tech-item-date {
    font-size: 8.5pt;
    font-weight: 400;
    color: #64748b;
    white-space: nowrap;
    direction: ltr;
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    font-family: 'Courier New', monospace;
    background: #f1f5f9;
    padding: 2pt 6pt;
    border-radius: 2pt;
  }

  /* ============================================
     EXPERIENCE
     ============================================ */
  .tech-exp-item {
    margin-bottom: 10pt;
    padding-${isRTL ? 'right' : 'left'}: 12pt;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #10b981;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .tech-exp-title {
    font-size: 11pt;
    font-weight: 600;
    color: #0f172a;
  }

  .tech-exp-company {
    font-size: 10pt;
    color: #10b981;
    font-weight: 500;
    margin-bottom: 4pt;
  }

  .tech-exp-description {
    font-size: 9.5pt;
    color: #475569;
    line-height: 1.6;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     EDUCATION
     ============================================ */
  .tech-edu-item {
    margin-bottom: 8pt;
    padding-${isRTL ? 'right' : 'left'}: 12pt;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #22d3ee;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .tech-edu-degree {
    font-size: 10.5pt;
    font-weight: 600;
    color: #0f172a;
  }

  .tech-edu-school {
    font-size: 9.5pt;
    color: #22d3ee;
    font-weight: 500;
  }

  .tech-edu-details {
    font-size: 8.5pt;
    color: #64748b;
    margin-top: 2pt;
  }

  /* ============================================
     SUMMARY
     ============================================ */
  .tech-summary {
    font-size: 10pt;
    color: #475569;
    line-height: 1.7;
    text-align: ${isRTL ? 'right' : 'left'};
    padding: 8pt 10pt;
    background: #f8fafc;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #10b981;
    font-family: inherit;
  }

  /* ============================================
     SKILLS - Code Block Style
     ============================================ */
  .tech-skills-block {
    background: #0f172a;
    border-radius: 4pt;
    padding: 8pt 10pt;
    margin-bottom: 6pt;
  }

  .tech-skills-header {
    font-family: 'Courier New', monospace;
    font-size: 8pt;
    color: #10b981;
    margin-bottom: 6pt;
  }

  .tech-skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .tech-skill-tag {
    background: #1e293b;
    color: #e2e8f0;
    padding: 3pt 8pt;
    border-radius: 3pt;
    font-size: 8pt;
    font-family: 'Courier New', monospace;
    border: 1pt solid #334155;
  }

  .tech-skill-tag.primary {
    border-color: #10b981;
    color: #10b981;
  }

  /* ============================================
     LANGUAGES (Sidebar)
     ============================================ */
  .tech-lang-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8pt;
    padding: 6pt 8pt;
    background: white;
    border-radius: 3pt;
  }

  .tech-lang-name {
    font-size: 9pt;
    font-weight: 600;
    color: #0f172a;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .tech-lang-level {
    font-size: 8pt;
    color: #10b981;
    font-weight: 500;
    font-family: 'Courier New', monospace;
  }

  /* ============================================
     PROJECTS - GitHub Card Style
     ============================================ */
  .tech-project-item {
    margin-bottom: 8pt;
    padding: 8pt 10pt;
    background: #f8fafc;
    border-radius: 4pt;
    border: 1pt solid #e2e8f0;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .tech-project-header {
    display: flex;
    align-items: center;
    gap: 8pt;
    margin-bottom: 4pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .tech-project-icon {
    color: #10b981;
    font-size: 10pt;
  }

  .tech-project-name {
    font-size: 10.5pt;
    font-weight: 600;
    color: #0f172a;
  }

  .tech-project-tech {
    font-size: 8pt;
    color: #22d3ee;
    font-family: 'Courier New', monospace;
    margin-bottom: 4pt;
  }

  .tech-project-description {
    font-size: 9pt;
    color: #64748b;
    line-height: 1.5;
  }

  /* ============================================
     GENERIC ITEMS
     ============================================ */
  .tech-generic-item {
    margin-bottom: 6pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .tech-item-title {
    font-size: 10pt;
    font-weight: 600;
    color: #0f172a;
  }

  .tech-item-meta {
    font-size: 9pt;
    color: #10b981;
  }

  .tech-item-description {
    font-size: 9pt;
    color: #475569;
    margin-top: 3pt;
    line-height: 1.5;
  }

  /* ============================================
     CONTACT IN SIDEBAR
     ============================================ */
  .tech-sidebar-contact {
    margin-bottom: 10pt;
  }

  .tech-sidebar-contact-item {
    display: flex;
    align-items: center;
    gap: 8pt;
    margin-bottom: 6pt;
    font-size: 8.5pt;
    color: #475569;
    ${isRTL ? 'flex-direction: row-reverse; text-align: right;' : ''}
  }

  .tech-sidebar-contact-icon {
    color: #10b981;
    font-family: 'Courier New', monospace;
    font-size: 9pt;
    width: 14pt;
    text-align: center;
  }

  /* ============================================
     REFERENCES
     ============================================ */
  .tech-ref-item {
    margin-bottom: 6pt;
    padding: 6pt 8pt;
    background: #f8fafc;
    border-radius: 4pt;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #10b981;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .tech-ref-name {
    font-size: 10pt;
    font-weight: 600;
    color: #0f172a;
  }

  .tech-ref-title {
    font-size: 9pt;
    color: #10b981;
  }

  .tech-ref-contact {
    font-size: 8pt;
    color: #64748b;
    margin-top: 3pt;
    font-family: 'Courier New', monospace;
  }

  /* ============================================
     INTERESTS / ADDITIONAL
     ============================================ */
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .tech-tag {
    background: #f1f5f9;
    color: #475569;
    padding: 4pt 10pt;
    border-radius: 12pt;
    font-size: 8.5pt;
    border: 1pt solid #e2e8f0;
  }

  .tech-info-text {
    font-size: 9.5pt;
    color: #475569;
    line-height: 1.6;
  }

  /* ============================================
     PRINT
     ============================================ */
  @media print {
    .tech-header, .tech-skills-block {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

const renderTechSkills = (skills, language, isRTL) => {
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
      <div class="tech-skills-block">
        <div class="tech-skills-header">// ${escapeHtml(categoryLabels[category] || category)}</div>
        <div class="tech-skills-list">
          ${catSkills.map((s, i) => `<span class="tech-skill-tag ${i < 3 ? 'primary' : ''}">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  let html = '';
  if (skills.technicalSkills?.length > 0) {
    html += `
      <div class="tech-skills-block">
        <div class="tech-skills-header">// ${t('technicalSkills', language)}</div>
        <div class="tech-skills-list">
          ${skills.technicalSkills.map((s, i) => `<span class="tech-skill-tag ${i < 3 ? 'primary' : ''}">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  if (skills.softSkills?.length > 0) {
    html += `
      <div class="tech-skills-block">
        <div class="tech-skills-header">// ${t('softSkills', language)}</div>
        <div class="tech-skills-list">
          ${skills.softSkills.map(s => `<span class="tech-skill-tag">${escapeHtml(s)}</span>`).join('')}
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
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">#</span>
          ${t('summary', language)}
        </h2>
        <p class="tech-summary">${escapeHtml(cvData.summary)}</p>
      </section>
    `;
  },

  experience: () => {
    if (!cvData.experience?.length) return '';
    return `
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">&gt;</span>
          ${t('experience', language)}
        </h2>
        ${cvData.experience.map(exp => {
          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);
          const headerContent = isRTL
            ? `<span class="tech-item-date">${escapeHtml(dateStr)}</span>
               <div class="tech-item-title-group">
                 <div class="tech-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>`
            : `<div class="tech-item-title-group">
                 <div class="tech-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>
               <span class="tech-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="tech-exp-item">
              <div class="tech-item-header">
                ${headerContent}
              </div>
              <div class="tech-exp-company">${escapeHtml(exp.company)}${exp.location ? ` @ ${escapeHtml(exp.location)}` : ''}</div>
              ${exp.description ? `<p class="tech-exp-description">${escapeHtml(exp.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  education: () => {
    if (!cvData.education?.length) return '';
    return `
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">$</span>
          ${t('education', language)}
        </h2>
        ${cvData.education.map(edu => {
          const dateStr = edu.graduationDate || edu.endDate || '';
          const headerContent = isRTL
            ? `<span class="tech-item-date">${escapeHtml(dateStr)}</span>
               <div class="tech-item-title-group">
                 <div class="tech-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>`
            : `<div class="tech-item-title-group">
                 <div class="tech-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>
               <span class="tech-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="tech-edu-item">
              <div class="tech-item-header">
                ${headerContent}
              </div>
              <div class="tech-edu-school">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa || edu.honors ? `
                <div class="tech-edu-details">
                  ${edu.gpa ? `GPA: ${escapeHtml(edu.gpa)}` : ''}
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

  certifications: () => {
    if (!cvData.certifications?.length) return '';
    return `
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">@</span>
          ${t('certifications', language)}
        </h2>
        ${cvData.certifications.map(cert => {
          const dateStr = cert.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="tech-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="tech-item-title-group">
                 <div class="tech-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>`
            : `<div class="tech-item-title-group">
                 <div class="tech-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>
               ${dateStr ? `<span class="tech-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="tech-generic-item">
              <div class="tech-item-header">
                ${headerContent}
              </div>
              ${cert.issuer ? `<div class="tech-item-meta">${escapeHtml(cert.issuer)}</div>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  projects: () => {
    if (!cvData.projects?.length) return '';
    return `
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">&lt;/&gt;</span>
          ${t('projects', language)}
        </h2>
        ${cvData.projects.map(project => `
          <article class="tech-project-item">
            <div class="tech-project-header">
              <span class="tech-project-icon">📁</span>
              <span class="tech-project-name">${escapeHtml(project.projectName || project.title || project.name)}</span>
            </div>
            ${project.technologies ? `<div class="tech-project-tech">${escapeHtml(project.technologies)}</div>` : ''}
            ${project.description ? `<p class="tech-project-description">${escapeHtml(project.description)}</p>` : ''}
          </article>
        `).join('')}
      </section>
    `;
  },

  achievements: () => {
    if (!cvData.achievements?.length) return '';
    return `
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">★</span>
          ${t('achievements', language)}
        </h2>
        ${cvData.achievements.map(achievement => {
          const dateStr = achievement.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="tech-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="tech-item-title-group">
                 <div class="tech-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>`
            : `<div class="tech-item-title-group">
                 <div class="tech-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>
               ${dateStr ? `<span class="tech-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="tech-generic-item">
              <div class="tech-item-header">
                ${headerContent}
              </div>
              ${achievement.description ? `<p class="tech-item-description">${escapeHtml(achievement.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  volunteering: () => {
    if (!cvData.volunteering?.length) return '';
    return `
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">♥</span>
          ${t('volunteering', language)}
        </h2>
        ${cvData.volunteering.map(vol => {
          const dateStr = formatDateRange(vol.startDate, vol.endDate, vol.current, language);
          const headerContent = isRTL
            ? `${dateStr ? `<span class="tech-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="tech-item-title-group">
                 <div class="tech-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>`
            : `<div class="tech-item-title-group">
                 <div class="tech-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>
               ${dateStr ? `<span class="tech-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="tech-generic-item">
              <div class="tech-item-header">
                ${headerContent}
              </div>
              <div class="tech-item-meta">${escapeHtml(vol.organization)}</div>
              ${vol.description ? `<p class="tech-item-description">${escapeHtml(vol.description)}</p>` : ''}
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
      return `<span class="tech-tag">${escapeHtml(name)}</span>`;
    }).join('');
    return `
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">~</span>
          ${t('interests', language)}
        </h2>
        <div class="tech-tags">${items}</div>
      </section>
    `;
  },

  additionalInfo: () => {
    if (!cvData.additionalInfo) return '';
    let content = '';
    if (typeof cvData.additionalInfo === 'string') {
      content = `<p class="tech-info-text">${escapeHtml(cvData.additionalInfo)}</p>`;
    } else if (cvData.additionalInfo.items && Array.isArray(cvData.additionalInfo.items)) {
      content = `
        <div class="tech-tags">
          ${cvData.additionalInfo.items.map(item => `<span class="tech-tag">${escapeHtml(item)}</span>`).join('')}
        </div>
      `;
    } else if (cvData.additionalInfo.text) {
      content = `<p class="tech-info-text">${escapeHtml(cvData.additionalInfo.text)}</p>`;
    }
    if (!content) return '';
    return `
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">+</span>
          ${t('additionalInfo', language)}
        </h2>
        ${content}
      </section>
    `;
  },

  references: () => {
    if (!cvData.references?.length) return '';
    return `
      <section class="tech-section">
        <h2 class="tech-section-title">
          <span class="tech-section-icon">&amp;</span>
          ${t('references', language)}
        </h2>
        ${cvData.references.map(ref => `
          <article class="tech-ref-item">
            <div class="tech-ref-name">${escapeHtml(ref.name)}</div>
            ${ref.title ? `<div class="tech-ref-title">${escapeHtml(ref.title)}${ref.company ? ` @ ${escapeHtml(ref.company)}` : ''}</div>` : ''}
            ${ref.email || ref.phone ? `
              <div class="tech-ref-contact">
                ${ref.email ? escapeHtml(ref.email) : ''}
                ${ref.email && ref.phone ? ' | ' : ''}
                ${ref.phone ? escapeHtml(ref.phone) : ''}
              </div>
            ` : ''}
          </article>
        `).join('')}
      </section>
    `;
  },

  // These go in sidebar
  skills: () => '',
  languages: () => ''
});

const generateHTML = (cvData, sections, language, isRTL, cairoFontBase64) => {
  const info = cvData.personalInfo || {};

  const defaultSections = [
    'summary', 'experience', 'education',
    'certifications', 'projects', 'achievements',
    'volunteering', 'interests', 'additionalInfo', 'references'
  ];

  const sectionOrder = sections?.length > 0
    ? sections.filter(s => s !== 'skills' && s !== 'languages')
    : defaultSections;

  const builders = getSectionBuilders(cvData, language, isRTL);

  const mainHTML = sectionOrder
    .map(sectionName => {
      const builder = builders[sectionName];
      return builder ? builder() : '';
    })
    .filter(html => html.trim() !== '')
    .join('\n');

  // Sidebar content
  let sidebarHTML = '';

  // Skills in sidebar
  const skillsHTML = renderTechSkills(cvData.skills, language, isRTL);
  if (skillsHTML) {
    sidebarHTML += `
      <section class="tech-section">
        <h2 class="tech-section-title">${t('skills', language)}</h2>
        ${skillsHTML}
      </section>
    `;
  }

  // Languages in sidebar
  if (cvData.languages?.length > 0) {
    sidebarHTML += `
      <section class="tech-section">
        <h2 class="tech-section-title">${t('languages', language)}</h2>
        ${cvData.languages.map(lang => {
          const langContent = isRTL
            ? `<span class="tech-lang-level">${lang.proficiency ? escapeHtml(lang.proficiency) : ''}</span>
               <span class="tech-lang-name">${escapeHtml(lang.language || lang.name)}</span>`
            : `<span class="tech-lang-name">${escapeHtml(lang.language || lang.name)}</span>
               <span class="tech-lang-level">${lang.proficiency ? escapeHtml(lang.proficiency) : ''}</span>`;
          return `
            <div class="tech-lang-item">
              ${langContent}
            </div>
          `;
        }).join('')}
      </section>
    `;
  }

  // Contact in sidebar
  sidebarHTML += `
    <div class="tech-sidebar-contact">
      ${info.email ? `
        <div class="tech-sidebar-contact-item">
          <span class="tech-sidebar-contact-icon">@</span>
          <span>${escapeHtml(info.email)}</span>
        </div>
      ` : ''}
      ${info.phone ? `
        <div class="tech-sidebar-contact-item">
          <span class="tech-sidebar-contact-icon">#</span>
          <span>${escapeHtml(info.phone)}</span>
        </div>
      ` : ''}
      ${info.location ? `
        <div class="tech-sidebar-contact-item">
          <span class="tech-sidebar-contact-icon">&gt;</span>
          <span>${escapeHtml(info.location)}</span>
        </div>
      ` : ''}
      ${info.linkedin ? `
        <div class="tech-sidebar-contact-item">
          <span class="tech-sidebar-contact-icon">in</span>
          <span>${escapeHtml(info.linkedin)}</span>
        </div>
      ` : ''}
      ${info.github ? `
        <div class="tech-sidebar-contact-item">
          <span class="tech-sidebar-contact-icon">gh</span>
          <span>${escapeHtml(info.github)}</span>
        </div>
      ` : ''}
      ${info.website ? `
        <div class="tech-sidebar-contact-item">
          <span class="tech-sidebar-contact-icon">~</span>
          <span>${escapeHtml(info.website)}</span>
        </div>
      ` : ''}
    </div>
  `;

  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=210mm, initial-scale=1.0">
      <title>${escapeHtml(info.fullName || 'CV')} - Developer Resume</title>
      <style>
        ${getBaseCSS(isRTL, cairoFontBase64)}
        ${getTechCSS(isRTL)}
      </style>
    </head>
    <body>
      <div class="cv-container">
        <header class="tech-header">
          <h1 class="tech-name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'Your Name')}</h1>
          ${info.headline ? `<div class="tech-headline">${escapeHtml(info.headline)}</div>` : ''}
          <div class="tech-contact-row">
            ${info.email ? `<span class="tech-contact-item"><span class="tech-contact-icon">@</span> ${escapeHtml(info.email)}</span>` : ''}
            ${info.github ? `<span class="tech-contact-item tech-contact-link"><span class="tech-contact-icon">gh/</span>${escapeHtml(info.github.replace(/.*github\.com\//, ''))}</span>` : ''}
            ${info.linkedin ? `<span class="tech-contact-item tech-contact-link"><span class="tech-contact-icon">in/</span>${escapeHtml(info.linkedin.replace(/.*linkedin\.com\/in\//, ''))}</span>` : ''}
          </div>
        </header>
        <div class="tech-body">
          <aside class="tech-sidebar">
            ${sidebarHTML}
          </aside>
          <main class="tech-main">
            ${mainHTML}
          </main>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateHTML };

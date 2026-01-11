/**
 * CLASSIC CV TEMPLATE - USER-CONTROLLED SECTION ORDER
 * ====================================================
 *
 * PURPOSE: Professional, conservative, human-friendly design with
 *          full user control over section ordering.
 *
 * ARCHITECTURE RULES:
 * 1. Single column layout - maximum ATS compatibility
 * 2. Thin separators between sections
 * 3. Minimal typography hierarchy
 * 4. Each section is SELF-CONTAINED and REORDERABLE
 * 5. Professional black/white with subtle accents
 *
 * SECTION ORDERING:
 * - User controls the exact order of sections
 * - No section is mandatory except Header
 * - Each section renders independently
 * - Layout integrity maintained regardless of order
 *
 * ARABIC TYPOGRAPHY RULES (CRITICAL):
 * - Titles/Job names: aligned RIGHT
 * - Dates/Durations: aligned LEFT
 * - Date styling: smaller font, lighter color, direction: ltr
 * - Long dash (—) for date ranges
 *
 * PAGE BREAK RULES:
 * - page-break-inside: avoid on sections and items
 * - Section headings never orphaned at page bottom
 * - Natural flow to next page when needed
 */

const { getBaseCSS, t, escapeHtml, formatDateRange } = require('./base');

/**
 * Classic template CSS
 * - Traditional, conservative design
 * - Black and white with subtle gray accents
 * - Centered header, single column content
 */
const getClassicCSS = (isRTL) => `
  /* ============================================
     CLASSIC TEMPLATE - PROFESSIONAL & ELEGANT
     ============================================ */

  .cv-container {
    padding: 14mm 16mm;
  }

  /* ============================================
     HEADER - Centered, Elegant
     ============================================ */
  .classic-header {
    text-align: center;
    margin-bottom: 14pt;
    padding-bottom: 10pt;
    border-bottom: 2pt solid #1a1a1a;
  }

  .classic-name {
    font-size: 22pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2pt;
    margin-bottom: 8pt;
    color: #1a1a1a;
  }

  .classic-contact-line {
    font-size: 10pt;
    color: #4a5568;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  /* Bullet separator between contact items */
  .classic-contact-line span::after {
    content: ' \\2022 ';
    margin: 0 6pt;
    color: #a0aec0;
  }

  .classic-contact-line span:last-child::after {
    content: '';
  }

  .classic-links-line {
    font-size: 9pt;
    color: #4a5568;
    margin-top: 6pt;
  }

  /* ============================================
     SECTIONS - INDEPENDENT & REORDERABLE
     Each section is self-contained with consistent
     internal spacing. Order-agnostic design.
     ============================================ */
  .classic-section {
    margin-bottom: 12pt;
    page-break-inside: auto;
    break-inside: auto;
    page-break-before: auto;
  }

  /* Prevent section from starting at very bottom of page */
  .classic-section:not(:first-of-type) {
    page-break-before: auto;
  }

  .classic-section-title {
    font-size: 11pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1pt;
    border-bottom: 1pt solid #1a1a1a;
    padding-bottom: 3pt;
    margin-bottom: 8pt;
    color: #1a1a1a;
    page-break-after: avoid;
    break-after: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* ============================================
     ITEM HEADER LAYOUT - ARABIC TYPOGRAPHY
     ============================================
     CRITICAL RULE FOR ARABIC CVs:
     - Title/Job Name: aligned to RIGHT
     - Date/Duration: aligned to LEFT (always!)

     Implementation:
     - Use flex-direction: row (explicit, not relying on RTL)
     - In RTL: Title first (will be on right), Date second (will be on left)
     - justify-content: space-between pushes them apart
  */
  .classic-item-header {
    display: flex;
    flex-direction: row; /* EXPLICIT: Always left-to-right flex */
    justify-content: space-between;
    align-items: baseline;
    gap: 12pt;
    margin-bottom: 2pt;
    width: 100%;
  }

  .classic-item-title-group {
    flex: 1;
    min-width: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     DATE STYLING - ARABIC TYPOGRAPHY
     ============================================
     - Lighter color (secondary visual weight)
     - Smaller font than title
     - No line wrapping
     - LTR direction (correct number/dash order)
     - Tabular numbers for alignment
     - Always on the LEFT side visually
  */
  .classic-item-date {
    font-size: 9.5pt;
    font-weight: 400;
    color: #718096;
    white-space: nowrap;
    direction: ltr; /* CRITICAL: Ensures correct date format display */
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  /* ============================================
     EXPERIENCE ITEMS
     ============================================ */
  .classic-exp-item {
    margin-bottom: 8pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .classic-exp-title {
    font-size: 11pt;
    font-weight: 700;
    color: #1a1a1a;
  }

  .classic-exp-company {
    font-size: 10pt;
    color: #4a5568;
    font-style: italic;
    margin-bottom: 4pt;
  }

  .classic-exp-description {
    font-size: 10pt;
    color: #2d3748;
    line-height: 1.55;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     EDUCATION ITEMS
     ============================================ */
  .classic-edu-item {
    margin-bottom: 8pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .classic-edu-degree {
    font-size: 11pt;
    font-weight: 700;
    color: #1a1a1a;
  }

  .classic-edu-school {
    font-size: 10pt;
    color: #4a5568;
    font-style: italic;
  }

  .classic-edu-honors {
    font-size: 9.5pt;
    color: #2d3748;
    font-style: italic;
    margin-top: 2pt;
  }

  .classic-edu-gpa {
    font-size: 9.5pt;
    color: #4a5568;
  }

  /* ============================================
     SUMMARY
     ============================================ */
  .classic-summary {
    font-size: 10pt;
    color: #2d3748;
    line-height: 1.65;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     SKILLS
     ============================================ */
  .classic-skills {
    margin-top: 6pt;
  }

  .classic-skill-category {
    margin-bottom: 5pt;
  }

  .classic-skill-category-title {
    font-size: 10pt;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4pt;
  }

  .classic-skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .classic-skill-tag {
    background: #f7fafc;
    color: #2d3748;
    padding: 3pt 8pt;
    border: 1pt solid #e2e8f0;
    border-radius: 3pt;
    font-size: 9pt;
    font-weight: 500;
  }

  /* ============================================
     LANGUAGES (Spoken Languages)
     ============================================ */
  .classic-lang-item {
    display: flex;
    flex-direction: row; /* EXPLICIT: Always left-to-right */
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 6pt;
  }

  .classic-lang-name {
    font-size: 10pt;
    font-weight: 600;
    color: #1a1a1a;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .classic-lang-proficiency {
    font-size: 9.5pt;
    color: #718096;
    direction: ltr;
    text-align: left;
  }

  /* ============================================
     GENERIC ITEMS (Projects, Certs, Achievements, etc.)
     ============================================ */
  .classic-generic-item {
    margin-bottom: 6pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .classic-item-title {
    font-size: 10.5pt;
    font-weight: 600;
    color: #1a1a1a;
  }

  .classic-item-meta {
    font-size: 9.5pt;
    color: #4a5568;
    font-style: italic;
  }

  .classic-item-description {
    font-size: 10pt;
    color: #2d3748;
    margin-top: 3pt;
    line-height: 1.5;
  }

  /* ============================================
     VOLUNTEERING ITEMS
     ============================================ */
  .classic-vol-item {
    margin-bottom: 10pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .classic-vol-role {
    font-size: 10.5pt;
    font-weight: 600;
    color: #1a1a1a;
  }

  .classic-vol-org {
    font-size: 10pt;
    color: #4a5568;
    font-style: italic;
  }

  /* ============================================
     ADDITIONAL INFO / INTERESTS
     ============================================ */
  .classic-info-text {
    font-size: 10pt;
    color: #2d3748;
    line-height: 1.55;
  }

  /* ============================================
     REFERENCES
     ============================================ */
  .classic-ref-item {
    margin-bottom: 10pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .classic-ref-name {
    font-size: 10.5pt;
    font-weight: 600;
    color: #1a1a1a;
  }

  .classic-ref-title {
    font-size: 9.5pt;
    color: #4a5568;
    font-style: italic;
  }

  .classic-ref-contact {
    font-size: 9pt;
    color: #718096;
    margin-top: 2pt;
  }

  /* ============================================
     PRINT OPTIMIZATIONS
     ============================================ */
  @media print {
    .classic-header {
      border-bottom-color: #1a1a1a;
    }

    .classic-section-title {
      border-bottom-color: #1a1a1a;
    }
  }
`;

// ============================================
// SECTION RENDERERS - INDEPENDENT COMPONENTS
// ============================================
// Each renderer is self-contained and produces
// a complete section that can appear anywhere.

/**
 * Render skills for classic template
 */
const renderClassicSkills = (skills, language) => {
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
    // Group by category
    const categories = {};
    items.forEach(skill => {
      const cat = skill.category || 'other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(skill.name);
    });

    return Object.entries(categories).map(([category, catSkills]) => `
      <div class="classic-skill-category">
        <div class="classic-skill-category-title">${escapeHtml(categoryLabels[category] || category)}</div>
        <div class="classic-skills-container">
          ${catSkills.map(s => `<span class="classic-skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Legacy format fallback
  let html = '';
  if (skills.technicalSkills?.length > 0) {
    html += `
      <div class="classic-skill-category">
        <div class="classic-skill-category-title">${t('technicalSkills', language)}</div>
        <div class="classic-skills-container">
          ${skills.technicalSkills.map(s => `<span class="classic-skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  if (skills.softSkills?.length > 0) {
    html += `
      <div class="classic-skill-category">
        <div class="classic-skill-category-title">${t('softSkills', language)}</div>
        <div class="classic-skills-container">
          ${skills.softSkills.map(s => `<span class="classic-skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  if (skills.languages?.length > 0) {
    html += `
      <div class="classic-skill-category">
        <div class="classic-skill-category-title">${t('languages', language)}</div>
        <div class="classic-skills-container">
          ${skills.languages.map(s => `<span class="classic-skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  return html;
};

// ============================================
// SECTION BUILDER MAP
// ============================================
// Maps section names to their renderer functions.
// This enables dynamic section ordering.

const getSectionBuilders = (cvData, language, isRTL) => ({
  // Summary Section
  summary: () => {
    if (!cvData.summary) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('summary', language)}</h2>
        <p class="classic-summary">${escapeHtml(cvData.summary)}</p>
      </section>
    `;
  },

  // Experience Section
  // ARABIC LAYOUT: In RTL, Date appears FIRST in HTML (renders on LEFT), Title SECOND (renders on RIGHT)
  experience: () => {
    if (!cvData.experience?.length) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('experience', language)}</h2>
        ${cvData.experience.map(exp => {
          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);
          // RTL: Date first (left), Title second (right)
          // LTR: Title first (left), Date second (right)
          const headerContent = isRTL
            ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>
               <div class="classic-item-title-group">
                 <span class="classic-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</span>
               </div>`
            : `<div class="classic-item-title-group">
                 <span class="classic-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</span>
               </div>
               <span class="classic-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="classic-exp-item">
              <div class="classic-item-header">
                ${headerContent}
              </div>
              <div class="classic-exp-company">${escapeHtml(exp.company)}${exp.location ? `, ${escapeHtml(exp.location)}` : ''}</div>
              ${exp.description ? `<p class="classic-exp-description">${escapeHtml(exp.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Education Section
  // ARABIC LAYOUT: In RTL, Date on LEFT, Degree on RIGHT
  education: () => {
    if (!cvData.education?.length) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('education', language)}</h2>
        ${cvData.education.map(edu => {
          const dateStr = edu.graduationDate || edu.endDate || '';
          const headerContent = isRTL
            ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>
               <div class="classic-item-title-group">
                 <span class="classic-edu-degree">${escapeHtml(edu.degree)}</span>
               </div>`
            : `<div class="classic-item-title-group">
                 <span class="classic-edu-degree">${escapeHtml(edu.degree)}</span>
               </div>
               <span class="classic-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="classic-edu-item">
              <div class="classic-item-header">
                ${headerContent}
              </div>
              <div class="classic-edu-school">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa ? `<div class="classic-edu-gpa">${t('gpa', language)}: ${escapeHtml(edu.gpa)}</div>` : ''}
              ${edu.honors ? `<div class="classic-edu-honors">${escapeHtml(edu.honors)}</div>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Skills Section
  skills: () => {
    const skillsHTML = renderClassicSkills(cvData.skills, language);
    if (!skillsHTML) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('skills', language)}</h2>
        <div class="classic-skills">${skillsHTML}</div>
      </section>
    `;
  },

  // Certifications Section
  // ARABIC LAYOUT: In RTL, Date on LEFT, Title on RIGHT
  certifications: () => {
    if (!cvData.certifications?.length) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('certifications', language)}</h2>
        ${cvData.certifications.map(cert => {
          const dateStr = cert.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="classic-item-title-group">
                 <span class="classic-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</span>
               </div>`
            : `<div class="classic-item-title-group">
                 <span class="classic-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</span>
               </div>
               ${dateStr ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="classic-generic-item">
              <div class="classic-item-header">
                ${headerContent}
              </div>
              ${cert.issuer ? `<div class="classic-item-meta">${escapeHtml(cert.issuer)}</div>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Languages Section (Spoken Languages)
  // ARABIC LAYOUT: Language name on RIGHT, Proficiency on LEFT
  languages: () => {
    if (!cvData.languages?.length) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('languages', language)}</h2>
        ${cvData.languages.map(lang => {
          const langContent = isRTL
            ? `${lang.proficiency ? `<span class="classic-lang-proficiency">${escapeHtml(lang.proficiency)}</span>` : ''}
               <span class="classic-lang-name">${escapeHtml(lang.language || lang.name)}</span>`
            : `<span class="classic-lang-name">${escapeHtml(lang.language || lang.name)}</span>
               ${lang.proficiency ? `<span class="classic-lang-proficiency">${escapeHtml(lang.proficiency)}</span>` : ''}`;
          return `
            <div class="classic-lang-item">
              ${langContent}
            </div>
          `;
        }).join('')}
      </section>
    `;
  },

  // Projects Section
  // ARABIC LAYOUT: In RTL, Date on LEFT, Title on RIGHT
  projects: () => {
    if (!cvData.projects?.length) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('projects', language)}</h2>
        ${cvData.projects.map(project => {
          const dateStr = project.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="classic-item-title-group">
                 <span class="classic-item-title">${escapeHtml(project.projectName || project.title || project.name)}</span>
               </div>`
            : `<div class="classic-item-title-group">
                 <span class="classic-item-title">${escapeHtml(project.projectName || project.title || project.name)}</span>
               </div>
               ${dateStr ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="classic-generic-item">
              <div class="classic-item-header">
                ${headerContent}
              </div>
              ${project.technologies ? `<div class="classic-item-meta">${escapeHtml(project.technologies)}</div>` : ''}
              ${project.description ? `<p class="classic-item-description">${escapeHtml(project.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Achievements Section
  // ARABIC LAYOUT: In RTL, Date on LEFT, Title on RIGHT
  achievements: () => {
    if (!cvData.achievements?.length) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('achievements', language)}</h2>
        ${cvData.achievements.map(achievement => {
          const dateStr = achievement.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="classic-item-title-group">
                 <span class="classic-item-title">${escapeHtml(achievement.achievement || achievement.title)}</span>
               </div>`
            : `<div class="classic-item-title-group">
                 <span class="classic-item-title">${escapeHtml(achievement.achievement || achievement.title)}</span>
               </div>
               ${dateStr ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="classic-generic-item">
              <div class="classic-item-header">
                ${headerContent}
              </div>
              ${achievement.description ? `<p class="classic-item-description">${escapeHtml(achievement.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  // Volunteering Section
  // ARABIC LAYOUT: In RTL, Date on LEFT, Role on RIGHT
  volunteering: () => {
    if (!cvData.volunteering?.length) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('volunteering', language)}</h2>
        ${cvData.volunteering.map(vol => {
          const dateStr = formatDateRange(vol.startDate, vol.endDate, vol.current, language);
          const headerContent = isRTL
            ? `${dateStr ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="classic-item-title-group">
                 <span class="classic-vol-role">${escapeHtml(vol.role || vol.title)}</span>
               </div>`
            : `<div class="classic-item-title-group">
                 <span class="classic-vol-role">${escapeHtml(vol.role || vol.title)}</span>
               </div>
               ${dateStr ? `<span class="classic-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="classic-vol-item">
              <div class="classic-item-header">
                ${headerContent}
              </div>
              <div class="classic-vol-org">${escapeHtml(vol.organization)}</div>
              ${vol.description ? `<p class="classic-item-description">${escapeHtml(vol.description)}</p>` : ''}
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
      return `<span class="classic-skill-tag">${escapeHtml(name)}</span>`;
    }).join('');
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('interests', language)}</h2>
        <div class="classic-skills-container">${items}</div>
      </section>
    `;
  },

  // Additional Information Section
  additionalInfo: () => {
    if (!cvData.additionalInfo) return '';
    let content = '';
    if (typeof cvData.additionalInfo === 'string') {
      content = `<p class="classic-info-text">${escapeHtml(cvData.additionalInfo)}</p>`;
    } else if (cvData.additionalInfo.items && Array.isArray(cvData.additionalInfo.items)) {
      content = `
        <div class="classic-skills-container">
          ${cvData.additionalInfo.items.map(item => `<span class="classic-skill-tag">${escapeHtml(item)}</span>`).join('')}
        </div>
      `;
    } else if (cvData.additionalInfo.text) {
      content = `<p class="classic-info-text">${escapeHtml(cvData.additionalInfo.text)}</p>`;
    }
    if (!content) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('additionalInfo', language)}</h2>
        ${content}
      </section>
    `;
  },

  // References Section
  references: () => {
    if (!cvData.references?.length) return '';
    return `
      <section class="classic-section">
        <h2 class="classic-section-title">${t('references', language)}</h2>
        ${cvData.references.map(ref => `
          <article class="classic-ref-item">
            <div class="classic-ref-name">${escapeHtml(ref.name)}</div>
            ${ref.title ? `<div class="classic-ref-title">${escapeHtml(ref.title)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>` : ''}
            ${ref.email || ref.phone ? `
              <div class="classic-ref-contact">
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
 * Generate Classic template HTML
 *
 * @param {Object} cvData - The CV data object
 * @param {Array} sections - User-defined section order (e.g., ['summary', 'experience', 'education', 'skills'])
 * @param {string} language - Language code (en, ar, he)
 * @param {boolean} isRTL - Whether the document is RTL
 * @param {string} cairoFontBase64 - Base64 encoded Cairo font (optional)
 */
const generateHTML = (cvData, sections, language, isRTL, cairoFontBase64) => {
  const info = cvData.personalInfo || {};

  // Default section order if none provided
  const defaultSections = [
    'summary', 'experience', 'education', 'skills',
    'certifications', 'languages', 'projects',
    'achievements', 'volunteering', 'interests',
    'additionalInfo', 'references'
  ];

  // Use user-provided sections or default
  const sectionOrder = sections?.length > 0 ? sections : defaultSections;

  // Get section builder functions
  const builders = getSectionBuilders(cvData, language, isRTL);

  // Build sections in user-specified order
  const sectionsHTML = sectionOrder
    .map(sectionName => {
      const builder = builders[sectionName];
      return builder ? builder() : '';
    })
    .filter(html => html.trim() !== '')
    .join('\n');

  // Build complete HTML document
  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=210mm, initial-scale=1.0">
      <title>${escapeHtml(info.fullName || 'CV')} - Resume</title>
      <style>
        ${getBaseCSS(isRTL, cairoFontBase64)}
        ${getClassicCSS(isRTL)}
      </style>
    </head>
    <body>
      <div class="cv-container">
        <!-- HEADER - Always First -->
        <header class="classic-header">
          <h1 class="classic-name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'YOUR NAME')}</h1>
          <div class="classic-contact-line">
            ${info.email ? `<span>${escapeHtml(info.email)}</span>` : ''}
            ${info.phone ? `<span>${escapeHtml(info.phone)}</span>` : ''}
            ${info.location ? `<span>${escapeHtml(info.location)}</span>` : ''}
          </div>
          ${(info.linkedin || info.website || info.github) ? `
            <div class="classic-links-line">
              ${info.linkedin ? `${escapeHtml(info.linkedin)}` : ''}
              ${info.linkedin && (info.website || info.github) ? ' | ' : ''}
              ${info.website ? `${escapeHtml(info.website)}` : ''}
              ${info.website && info.github ? ' | ' : ''}
              ${info.github ? `${escapeHtml(info.github)}` : ''}
            </div>
          ` : ''}
        </header>

        <!-- MAIN CONTENT - User-Controlled Section Order -->
        <main>
          ${sectionsHTML}
        </main>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateHTML };

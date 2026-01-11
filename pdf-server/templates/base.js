/**
 * BASE CSS SYSTEM FOR CV TEMPLATES
 * ================================
 *
 * ARCHITECTURE PRINCIPLES:
 * 1. A4 page size: 210mm × 297mm
 * 2. Safe content area: 180mm × 267mm (15mm margins)
 * 3. Natural document flow - NO absolute positioning for content
 * 4. Page breaks are automatic and content-aware
 * 5. Text NEVER overflows container boundaries
 *
 * ARABIC TYPOGRAPHY RULES (CRITICAL):
 * - In RTL documents: Title on RIGHT, Date on LEFT
 * - Date must have: direction: ltr, white-space: nowrap
 * - Use long dash (—) instead of hyphen (-)
 * - Date styled: lighter color, smaller font, tabular-nums
 *
 * PAGE BREAK RULES:
 * - page-break-inside: avoid on sections, items, and groups
 * - page-break-after: avoid on headings (keep with content)
 * - orphans: 3 / widows: 3 to prevent lonely lines
 * - New page ONLY when content cannot fit remaining space
 */

const getBaseCSS = (isRTL, fontBase64 = null) => `
  /* ============================================
     FONT EMBEDDING
     ============================================ */
  ${fontBase64 ? `
  @font-face {
    font-family: 'Cairo';
    src: url(data:font/truetype;base64,${fontBase64}) format('truetype');
    font-weight: 200 900;
    font-style: normal;
    font-display: block;
  }
  ` : `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
  `}

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

  /* ============================================
     A4 PAGE SETUP - CRITICAL
     All pages must have identical dimensions
     ============================================ */
  @page {
    size: A4;
    margin: 12mm 15mm;
  }

  @page :first {
    margin-top: 0;
  }

  /* ============================================
     CSS RESET - NORMALIZE ALL ELEMENTS
     ============================================ */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* ============================================
     ROOT DOCUMENT SETUP
     ============================================ */
  html {
    font-size: 11pt;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  body {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 0;
    font-family: ${isRTL
      ? "'Cairo', 'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
      : "'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif"};
    font-size: 10.5pt;
    line-height: 1.5;
    color: #1a1a1a;
    background: white;
    direction: ${isRTL ? 'rtl' : 'ltr'};
    text-align: ${isRTL ? 'right' : 'left'};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Force font inheritance */
  h1, h2, h3, h4, h5, h6, p, span, div, li, a {
    font-family: inherit;
  }

  /* ============================================
     MAIN CONTAINER - CONTENT BOUNDARY
     ============================================ */
  .cv-container {
    width: 210mm;
    min-height: 297mm;
    margin: 0;
    padding: 15mm;
    background: white;
    overflow: visible; /* Allow natural flow to next page */
  }

  /* ============================================
     PAGE BREAK CONTROL - CRITICAL RULES
     ============================================

     RULE 1: Sections can break between items (not mid-item)
     RULE 2: Individual items stay together (avoid breaking)
     RULE 3: Headings always stay with their content
     RULE 4: Prevent orphaned/widowed lines
     RULE 5: New page when content exceeds remaining space
  */

  /* Sections allow breaks - but only between items */
  .section {
    page-break-inside: auto;
    break-inside: auto;
    margin-bottom: 10pt;
    page-break-before: auto;
  }

  /* Prevent breaks inside individual items - items stay whole */
  .cv-item,
  .experience-item,
  .education-item,
  .project-item,
  .certification-item,
  .achievement-item,
  .skill-group,
  .reference-item,
  .volunteer-item,
  .language-item {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 6pt;
  }

  /* Keep headings with their content - never orphan a heading */
  h1, h2, h3, h4, h5, h6,
  .section-title,
  .item-title {
    page-break-after: avoid;
    break-after: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Orphan/widow control - minimum 3 lines */
  p, li {
    orphans: 3;
    widows: 3;
  }

  /* Force page break when needed */
  .page-break {
    page-break-before: always;
    break-before: always;
  }

  /* Prevent page break before first section */
  .section:first-of-type {
    page-break-before: avoid;
  }

  /* ============================================
     ARABIC CV ITEM HEADER LAYOUT
     ============================================

     CRITICAL RULE FOR ARABIC CVs:
     - Title/Job Name: aligned to RIGHT
     - Date/Duration: aligned to LEFT

     This is the standard professional Arabic CV convention.
     The date is ALWAYS on the left, even in RTL documents.
  */

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12pt;
    margin-bottom: 3pt;
    width: 100%;
    /* NO flex-direction: row-reverse for RTL - we want title RIGHT, date LEFT */
  }

  .item-header-content {
    flex: 1;
    min-width: 0; /* Allow text to shrink if needed */
    ${isRTL ? 'text-align: right;' : 'text-align: left;'}
  }

  /* ============================================
     DATE STYLING - ARABIC TYPOGRAPHY
     ============================================

     Date presentation requirements:
     - Lighter color (secondary visual weight)
     - Smaller font than title
     - Fixed LEFT alignment (even in RTL)
     - No line wrapping
     - LTR direction for correct number/dash order
     - Tabular numbers for alignment
  */

  .item-date {
    font-size: 9pt;
    font-weight: 400;
    color: #718096;
    white-space: nowrap;
    direction: ltr; /* CRITICAL: Ensures correct date format display */
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    ${isRTL ? 'order: -1;' : ''} /* In RTL, move date to visual left */
  }

  /* ============================================
     TYPOGRAPHY HIERARCHY
     ============================================ */

  /* Name - largest text */
  .cv-name {
    font-size: 22pt;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 6pt;
    color: #1a1a1a;
  }

  /* Job title / headline */
  .cv-headline {
    font-size: 12pt;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 8pt;
  }

  /* Section titles */
  .section-title {
    font-size: 12pt;
    font-weight: 700;
    margin-bottom: 6pt;
    padding-bottom: 3pt;
    color: #2d3748;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
  }

  /* Item titles (job title, degree) - visually dominant */
  .item-title {
    font-size: 11pt;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 2pt;
  }

  /* Item subtitles (company, institution) */
  .item-subtitle {
    font-size: 10pt;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 2pt;
  }

  /* Description text */
  .item-description {
    font-size: 10pt;
    font-weight: 400;
    color: #2d3748;
    line-height: 1.55;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     HEADER SECTION
     ============================================ */
  .cv-header {
    margin-bottom: 12pt;
    padding-bottom: 8pt;
  }

  .contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10pt 16pt;
    font-size: 9.5pt;
    color: #4a5568;
    ${isRTL ? 'flex-direction: row-reverse; justify-content: flex-end;' : 'justify-content: flex-start;'}
  }

  .contact-item {
    display: inline-flex;
    align-items: center;
    gap: 4pt;
  }

  .contact-icon {
    width: 12pt;
    height: 12pt;
    flex-shrink: 0;
  }

  /* ============================================
     FLEX LAYOUTS - RTL AWARE
     ============================================ */
  .flex-row {
    display: flex;
    align-items: flex-start;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  /* For general content rows (NOT item headers) */
  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  /* ============================================
     SKILLS DISPLAY
     ============================================ */
  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 6pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .skill-tag {
    display: inline-block;
    padding: 3pt 8pt;
    font-size: 9pt;
    font-weight: 500;
    border-radius: 3pt;
    background: #f0f4f8;
    color: #2d3748;
  }

  .skill-category {
    margin-bottom: 5pt;
  }

  .skill-category-title {
    font-size: 10pt;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 5pt;
  }

  /* ============================================
     LISTS
     ============================================ */
  ul, ol {
    ${isRTL ? 'padding-right: 16pt; padding-left: 0;' : 'padding-left: 16pt; padding-right: 0;'}
    margin: 4pt 0;
  }

  li {
    font-size: 10pt;
    line-height: 1.5;
    margin-bottom: 3pt;
    color: #2d3748;
  }

  /* ============================================
     LINKS
     ============================================ */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* ============================================
     UTILITY CLASSES
     ============================================ */
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-left { text-align: left; }
  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  .mt-2 { margin-top: 8pt; }
  .mb-2 { margin-bottom: 8pt; }
  .mb-4 { margin-bottom: 16pt; }

  /* ============================================
     PRINT SAFETY - HIDE NON-ESSENTIAL
     ============================================ */
  @media print {
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .cv-container {
      padding: 15mm;
    }
  }
`;

// ============================================
// TRANSLATIONS - MULTI-LANGUAGE SUPPORT
// ============================================
const translations = {
  ar: {
    summary: 'الملخص المهني',
    experience: 'الخبرة العملية',
    education: 'التعليم',
    skills: 'المهارات',
    technicalSkills: 'المهارات التقنية',
    softSkills: 'المهارات الشخصية',
    languages: 'اللغات',
    projects: 'المشاريع',
    certifications: 'الشهادات',
    achievements: 'الإنجازات',
    references: 'المراجع',
    volunteering: 'العمل التطوعي',
    additionalInfo: 'معلومات إضافية',
    interests: 'الاهتمامات',
    publications: 'المنشورات',
    awards: 'الجوائز',
    present: 'حتى الآن',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    location: 'الموقع',
    linkedin: 'لينكدإن',
    website: 'الموقع الإلكتروني',
    github: 'جيت هب',
    honors: 'مرتبة الشرف',
    gpa: 'المعدل التراكمي',
    tools: 'الأدوات',
    frameworks: 'الأطر البرمجية'
  },
  he: {
    summary: 'סיכום מקצועי',
    experience: 'ניסיון תעסוקתי',
    education: 'השכלה',
    skills: 'כישורים',
    technicalSkills: 'כישורים טכניים',
    softSkills: 'כישורים רכים',
    languages: 'שפות',
    projects: 'פרויקטים',
    certifications: 'הסמכות',
    achievements: 'הישגים',
    references: 'המלצות',
    volunteering: 'התנדבות',
    additionalInfo: 'מידע נוסף',
    interests: 'תחומי עניין',
    publications: 'פרסומים',
    awards: 'פרסים',
    present: 'עד היום',
    email: 'דוא"ל',
    phone: 'טלפון',
    location: 'מיקום',
    linkedin: 'לינקדאין',
    website: 'אתר אינטרנט',
    github: 'גיטהאב',
    honors: 'הצטיינות',
    gpa: 'ממוצע',
    tools: 'כלים',
    frameworks: 'מסגרות'
  },
  en: {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    technicalSkills: 'Technical Skills',
    softSkills: 'Soft Skills',
    languages: 'Languages',
    projects: 'Projects',
    certifications: 'Certifications',
    achievements: 'Achievements',
    references: 'References',
    volunteering: 'Volunteering',
    additionalInfo: 'Additional Information',
    interests: 'Interests',
    publications: 'Publications',
    awards: 'Awards',
    present: 'Present',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    linkedin: 'LinkedIn',
    website: 'Website',
    github: 'GitHub',
    honors: 'Honors',
    gpa: 'GPA',
    tools: 'Tools',
    frameworks: 'Frameworks'
  }
};

const t = (key, language) => {
  return translations[language]?.[key] || translations.en[key] || key;
};

// ============================================
// HTML ESCAPE UTILITY
// ============================================
const escapeHtml = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// ============================================
// DATE FORMATTING UTILITY
// ============================================
/**
 * Format date range for CV display
 * Uses long dash (—) instead of hyphen
 * Returns LTR-safe date string
 */
const formatDateRange = (startDate, endDate, isCurrent, language) => {
  const present = translations[language]?.present || 'Present';
  const end = isCurrent ? present : (endDate || '');

  if (startDate && end) {
    return `${startDate} — ${end}`;
  }
  return startDate || end || '';
};

// ============================================
// SECTION BUILDERS - REUSABLE COMPONENTS
// ============================================

/**
 * Build contact row HTML
 */
const buildContactRow = (info, language) => {
  const items = [];

  if (info.email) {
    items.push(`<span class="contact-item">${escapeHtml(info.email)}</span>`);
  }
  if (info.phone) {
    items.push(`<span class="contact-item">${escapeHtml(info.phone)}</span>`);
  }
  if (info.location) {
    items.push(`<span class="contact-item">${escapeHtml(info.location)}</span>`);
  }
  if (info.linkedin) {
    items.push(`<span class="contact-item">${escapeHtml(info.linkedin)}</span>`);
  }
  if (info.website) {
    items.push(`<span class="contact-item">${escapeHtml(info.website)}</span>`);
  }
  if (info.github) {
    items.push(`<span class="contact-item">${escapeHtml(info.github)}</span>`);
  }

  return items.join('\n');
};

/**
 * Build summary section
 */
const buildSummarySection = (summary, language) => {
  if (!summary) return '';

  return `
    <section class="section summary-section">
      <h2 class="section-title">${t('summary', language)}</h2>
      <p class="item-description">${escapeHtml(summary)}</p>
    </section>
  `;
};

/**
 * Build experience section
 * ARABIC LAYOUT: Title on RIGHT, Date on LEFT
 */
const buildExperienceSection = (experience, language, isRTL) => {
  if (!experience || experience.length === 0) return '';

  const items = experience.map(exp => {
    const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);

    return `
      <article class="cv-item experience-item">
        <div class="item-header">
          <div class="item-header-content">
            <h3 class="item-title">${escapeHtml(exp.jobTitle || exp.title)}</h3>
            <div class="item-subtitle">${escapeHtml(exp.company)}</div>
          </div>
          <span class="item-date">${escapeHtml(dateStr)}</span>
        </div>
        ${exp.description ? `<p class="item-description mt-2">${escapeHtml(exp.description)}</p>` : ''}
      </article>
    `;
  }).join('\n');

  return `
    <section class="section experience-section">
      <h2 class="section-title">${t('experience', language)}</h2>
      ${items}
    </section>
  `;
};

/**
 * Build education section
 * ARABIC LAYOUT: Degree on RIGHT, Date on LEFT
 */
const buildEducationSection = (education, language, isRTL) => {
  if (!education || education.length === 0) return '';

  const items = education.map(edu => `
    <article class="cv-item education-item">
      <div class="item-header">
        <div class="item-header-content">
          <h3 class="item-title">${escapeHtml(edu.degree)}</h3>
          <div class="item-subtitle">${escapeHtml(edu.institution)}</div>
        </div>
        <span class="item-date">${escapeHtml(edu.graduationDate || edu.endDate || '')}</span>
      </div>
      ${edu.honors ? `<p class="item-description" style="font-style: italic;">${escapeHtml(edu.honors)}</p>` : ''}
      ${edu.gpa ? `<p class="item-description">${t('gpa', language)}: ${escapeHtml(edu.gpa)}</p>` : ''}
    </article>
  `).join('\n');

  return `
    <section class="section education-section">
      <h2 class="section-title">${t('education', language)}</h2>
      ${items}
    </section>
  `;
};

/**
 * Build skills section
 */
const buildSkillsSection = (skills, language) => {
  if (!skills) return '';

  const items = skills.items || [];
  let html = '';

  if (items.length > 0) {
    // Group by category
    const categories = {};
    items.forEach(skill => {
      const cat = skill.category || 'other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(skill.name);
    });

    const categoryLabels = {
      technical: t('technicalSkills', language),
      soft: t('softSkills', language),
      languages: t('languages', language),
      tools: t('tools', language),
      frameworks: t('frameworks', language),
      other: t('skills', language)
    };

    html = Object.entries(categories).map(([cat, catSkills]) => `
      <div class="skill-category">
        <div class="skill-category-title">${categoryLabels[cat] || cat}</div>
        <div class="skills-container">
          ${catSkills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  } else {
    // Legacy format
    if (skills.technicalSkills?.length > 0) {
      html += `
        <div class="skill-category">
          <div class="skill-category-title">${t('technicalSkills', language)}</div>
          <div class="skills-container">
            ${skills.technicalSkills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      `;
    }
    if (skills.softSkills?.length > 0) {
      html += `
        <div class="skill-category">
          <div class="skill-category-title">${t('softSkills', language)}</div>
          <div class="skills-container">
            ${skills.softSkills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      `;
    }
    if (skills.languages?.length > 0) {
      html += `
        <div class="skill-category">
          <div class="skill-category-title">${t('languages', language)}</div>
          <div class="skills-container">
            ${skills.languages.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      `;
    }
  }

  if (!html) return '';

  return `
    <section class="section skills-section">
      <h2 class="section-title">${t('skills', language)}</h2>
      ${html}
    </section>
  `;
};

/**
 * Build projects section
 */
const buildProjectsSection = (projects, language, isRTL) => {
  if (!projects || projects.length === 0) return '';

  const items = projects.map(proj => `
    <article class="cv-item project-item">
      <div class="item-header">
        <div class="item-header-content">
          <h3 class="item-title">${escapeHtml(proj.projectName || proj.title || proj.name)}</h3>
          ${proj.technologies ? `<div class="item-subtitle">${escapeHtml(proj.technologies)}</div>` : ''}
        </div>
        ${proj.date ? `<span class="item-date">${escapeHtml(proj.date)}</span>` : ''}
      </div>
      ${proj.description ? `<p class="item-description">${escapeHtml(proj.description)}</p>` : ''}
      ${proj.link ? `<p class="item-description"><a href="${escapeHtml(proj.link)}">${escapeHtml(proj.link)}</a></p>` : ''}
    </article>
  `).join('\n');

  return `
    <section class="section projects-section">
      <h2 class="section-title">${t('projects', language)}</h2>
      ${items}
    </section>
  `;
};

/**
 * Build certifications section
 */
const buildCertificationsSection = (certifications, language, isRTL) => {
  if (!certifications || certifications.length === 0) return '';

  const items = certifications.map(cert => `
    <article class="cv-item certification-item">
      <div class="item-header">
        <div class="item-header-content">
          <h3 class="item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</h3>
          ${cert.issuer ? `<div class="item-subtitle">${escapeHtml(cert.issuer)}</div>` : ''}
        </div>
        ${cert.date ? `<span class="item-date">${escapeHtml(cert.date)}</span>` : ''}
      </div>
    </article>
  `).join('\n');

  return `
    <section class="section certifications-section">
      <h2 class="section-title">${t('certifications', language)}</h2>
      ${items}
    </section>
  `;
};

/**
 * Build achievements section
 */
const buildAchievementsSection = (achievements, language, isRTL) => {
  if (!achievements || achievements.length === 0) return '';

  const items = achievements.map(ach => `
    <article class="cv-item achievement-item">
      <div class="item-header">
        <div class="item-header-content">
          <h3 class="item-title">${escapeHtml(ach.achievement || ach.title)}</h3>
        </div>
        ${ach.date ? `<span class="item-date">${escapeHtml(ach.date)}</span>` : ''}
      </div>
      ${ach.description ? `<p class="item-description">${escapeHtml(ach.description)}</p>` : ''}
    </article>
  `).join('\n');

  return `
    <section class="section achievements-section">
      <h2 class="section-title">${t('achievements', language)}</h2>
      ${items}
    </section>
  `;
};

/**
 * Build languages section (spoken languages, not programming)
 * ARABIC LAYOUT: Language on RIGHT, Proficiency on LEFT
 */
const buildLanguagesSection = (languages, language, isRTL) => {
  if (!languages || languages.length === 0) return '';

  const items = languages.map(lang => `
    <article class="cv-item language-item">
      <div class="item-header">
        <div class="item-header-content">
          <h3 class="item-title">${escapeHtml(lang.language || lang.name)}</h3>
        </div>
        ${lang.proficiency ? `<span class="item-date">${escapeHtml(lang.proficiency)}</span>` : ''}
      </div>
    </article>
  `).join('\n');

  return `
    <section class="section languages-section">
      <h2 class="section-title">${t('languages', language)}</h2>
      ${items}
    </section>
  `;
};

/**
 * Build volunteering section
 * ARABIC LAYOUT: Role on RIGHT, Date on LEFT
 */
const buildVolunteeringSection = (volunteering, language, isRTL) => {
  if (!volunteering || volunteering.length === 0) return '';

  const items = volunteering.map(vol => {
    const dateStr = formatDateRange(vol.startDate, vol.endDate, vol.current, language);

    return `
      <article class="cv-item volunteering-item">
        <div class="item-header">
          <div class="item-header-content">
            <h3 class="item-title">${escapeHtml(vol.role || vol.title)}</h3>
            <div class="item-subtitle">${escapeHtml(vol.organization)}</div>
          </div>
          ${dateStr ? `<span class="item-date">${escapeHtml(dateStr)}</span>` : ''}
        </div>
        ${vol.description ? `<p class="item-description mt-2">${escapeHtml(vol.description)}</p>` : ''}
      </article>
    `;
  }).join('\n');

  return `
    <section class="section volunteering-section">
      <h2 class="section-title">${t('volunteering', language)}</h2>
      ${items}
    </section>
  `;
};

/**
 * Build additional information section
 * Flexible section for interests, hobbies, or other info
 */
const buildAdditionalInfoSection = (additionalInfo, language, isRTL) => {
  if (!additionalInfo) return '';

  // Handle string or object format
  let content = '';
  if (typeof additionalInfo === 'string') {
    content = `<p class="item-description">${escapeHtml(additionalInfo)}</p>`;
  } else if (additionalInfo.items && Array.isArray(additionalInfo.items)) {
    content = `
      <div class="skills-container">
        ${additionalInfo.items.map(item => `<span class="skill-tag">${escapeHtml(item)}</span>`).join('')}
      </div>
    `;
  } else if (additionalInfo.text) {
    content = `<p class="item-description">${escapeHtml(additionalInfo.text)}</p>`;
  }

  if (!content) return '';

  return `
    <section class="section additional-info-section">
      <h2 class="section-title">${t('additionalInfo', language)}</h2>
      ${content}
    </section>
  `;
};

/**
 * Build interests section
 */
const buildInterestsSection = (interests, language, isRTL) => {
  if (!interests || interests.length === 0) return '';

  // Handle array of strings or objects
  const items = interests.map(interest => {
    const name = typeof interest === 'string' ? interest : (interest.name || interest.interest);
    return `<span class="skill-tag">${escapeHtml(name)}</span>`;
  }).join('');

  return `
    <section class="section interests-section">
      <h2 class="section-title">${t('interests', language)}</h2>
      <div class="skills-container">
        ${items}
      </div>
    </section>
  `;
};

/**
 * Build references section
 */
const buildReferencesSection = (references, language, isRTL) => {
  if (!references || references.length === 0) return '';

  const items = references.map(ref => `
    <article class="cv-item reference-item">
      <div class="item-header">
        <div class="item-header-content">
          <h3 class="item-title">${escapeHtml(ref.name)}</h3>
          ${ref.title ? `<div class="item-subtitle">${escapeHtml(ref.title)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>` : ''}
        </div>
      </div>
      ${ref.email ? `<p class="item-description">${escapeHtml(ref.email)}</p>` : ''}
      ${ref.phone ? `<p class="item-description">${escapeHtml(ref.phone)}</p>` : ''}
    </article>
  `).join('\n');

  return `
    <section class="section references-section">
      <h2 class="section-title">${t('references', language)}</h2>
      ${items}
    </section>
  `;
};

module.exports = {
  getBaseCSS,
  translations,
  t,
  escapeHtml,
  formatDateRange,
  buildContactRow,
  buildSummarySection,
  buildExperienceSection,
  buildEducationSection,
  buildSkillsSection,
  buildProjectsSection,
  buildCertificationsSection,
  buildAchievementsSection,
  buildLanguagesSection,
  buildVolunteeringSection,
  buildAdditionalInfoSection,
  buildInterestsSection,
  buildReferencesSection
};

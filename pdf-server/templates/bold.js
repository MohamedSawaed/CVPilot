/**
 * BOLD CV TEMPLATE - REFINED ELEGANCE
 * ==========================================
 *
 * PURPOSE: Sophisticated design with refined color palette,
 *          elegant typography, and premium visual presence.
 *
 * DESIGN PHILOSOPHY:
 * - Deep teal/emerald accent colors
 * - Refined, sophisticated typography
 * - Two-column layout with elegant sidebar
 * - Premium visual hierarchy
 * - Professional yet distinctive feel
 *
 * ARABIC TYPOGRAPHY RULES (CRITICAL):
 * - Titles/Job names: aligned RIGHT
 * - Dates/Durations: aligned LEFT (always!)
 * - flex-direction: row (explicit) with HTML order swap for RTL
 */

const { getBaseCSS, t, escapeHtml, formatDateRange } = require('./base');

const getBoldCSS = (isRTL) => `
  /* ============================================
     BOLD TEMPLATE - REFINED ELEGANCE
     ============================================ */

  body {
    background: #fafafa;
  }

  .cv-container {
    padding: 0;
    display: flex;
    min-height: 297mm;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  /* ============================================
     SIDEBAR - Deep Elegant
     ============================================ */
  .bold-sidebar {
    width: 75mm;
    background: linear-gradient(180deg, #1e3a3a 0%, #234545 40%, #2d5a5a 100%);
    color: white;
    padding: 28pt 18pt;
    position: relative;
    overflow: hidden;
  }

  .bold-sidebar::before {
    content: '';
    position: absolute;
    top: 0;
    ${isRTL ? 'right' : 'left'}: 0;
    width: 3pt;
    height: 100%;
    background: linear-gradient(180deg, #64b5a0, #4db6ac, #64b5a0);
  }

  .bold-sidebar::after {
    content: '';
    position: absolute;
    bottom: -30%;
    ${isRTL ? 'left' : 'right'}: -20%;
    width: 120pt;
    height: 120pt;
    background: radial-gradient(circle, rgba(100, 181, 160, 0.08) 0%, transparent 70%);
  }

  /* ============================================
     PROFILE SECTION
     ============================================ */
  .bold-profile {
    text-align: center;
    margin-bottom: 26pt;
    position: relative;
    z-index: 1;
  }

  .bold-avatar {
    width: 68pt;
    height: 68pt;
    background: linear-gradient(135deg, #4db6ac 0%, #64b5a0 50%, #80cbc4 100%);
    border-radius: 50%;
    margin: 0 auto 14pt;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24pt;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    box-shadow: 0 6pt 24pt rgba(77, 182, 172, 0.35);
    border: 3pt solid rgba(255, 255, 255, 0.15);
  }

  .bold-name {
    font-size: 17pt;
    font-weight: 700;
    margin-bottom: 6pt;
    letter-spacing: 0.3pt;
    line-height: 1.2;
  }

  .bold-headline {
    font-size: 9pt;
    color: #80cbc4;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.5pt;
  }

  /* ============================================
     SIDEBAR SECTIONS
     ============================================ */
  .bold-sidebar-section {
    margin-bottom: 20pt;
    position: relative;
    z-index: 1;
  }

  .bold-sidebar-title {
    font-size: 8.5pt;
    font-weight: 600;
    color: #80cbc4;
    text-transform: uppercase;
    letter-spacing: 2pt;
    margin-bottom: 12pt;
    padding-bottom: 8pt;
    border-bottom: 1pt solid rgba(128, 203, 196, 0.3);
    text-align: ${isRTL ? 'right' : 'left'};
  }

  /* Contact in Sidebar */
  .bold-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 10pt;
    margin-bottom: 10pt;
    font-size: 8.5pt;
    color: rgba(255, 255, 255, 0.9);
    ${isRTL ? 'flex-direction: row-reverse; text-align: right;' : ''}
  }

  .bold-contact-icon {
    width: 20pt;
    height: 20pt;
    background: rgba(128, 203, 196, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #80cbc4;
    font-size: 9pt;
    flex-shrink: 0;
  }

  .bold-contact-text {
    word-break: break-word;
    line-height: 1.5;
    padding-top: 2pt;
  }

  /* Skills in Sidebar */
  .bold-skill-item {
    margin-bottom: 12pt;
  }

  .bold-skill-name {
    font-size: 8.5pt;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 5pt;
    display: flex;
    justify-content: space-between;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .bold-skill-bar {
    height: 3pt;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2pt;
    overflow: hidden;
  }

  .bold-skill-fill {
    height: 100%;
    background: linear-gradient(90deg, #4db6ac, #80cbc4);
    border-radius: 2pt;
  }

  /* Languages in Sidebar */
  .bold-lang-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10pt;
    padding: 8pt 10pt;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6pt;
    border-left: 2pt solid #4db6ac;
    ${isRTL ? 'flex-direction: row-reverse; border-left: none; border-right: 2pt solid #4db6ac;' : ''}
  }

  .bold-lang-name {
    font-size: 9pt;
    font-weight: 500;
    color: white;
  }

  .bold-lang-level {
    font-size: 7.5pt;
    color: #80cbc4;
    font-weight: 500;
  }

  /* ============================================
     MAIN CONTENT
     ============================================ */
  .bold-main {
    flex: 1;
    padding: 28pt 24pt;
    background: white;
  }

  /* ============================================
     MAIN SECTIONS
     ============================================ */
  .bold-section {
    margin-bottom: 14pt;
    page-break-inside: auto;
    break-inside: auto;
    page-break-before: auto;
  }

  .bold-section-header {
    display: flex;
    align-items: center;
    gap: 10pt;
    margin-bottom: 10pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .bold-section-icon {
    width: 32pt;
    height: 32pt;
    background: linear-gradient(135deg, #1e3a3a 0%, #2d5a5a 100%);
    border-radius: 8pt;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #80cbc4;
    font-size: 13pt;
    font-weight: 600;
    flex-shrink: 0;
  }

  .bold-section-title {
    font-size: 13pt;
    font-weight: 700;
    color: #1e3a3a;
    letter-spacing: 0.3pt;
    margin: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     ITEM HEADER - ARABIC TYPOGRAPHY
     ============================================ */
  .bold-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 16pt;
    margin-bottom: 4pt;
  }

  .bold-item-title-group {
    flex: 1;
    min-width: 0;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  .bold-item-date {
    font-size: 8pt;
    font-weight: 600;
    color: #1e3a3a;
    white-space: nowrap;
    direction: ltr;
    text-align: left;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    padding: 4pt 12pt;
    background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
    border-radius: 12pt;
  }

  /* ============================================
     EXPERIENCE
     ============================================ */
  .bold-exp-item {
    margin-bottom: 10pt;
    padding-${isRTL ? 'right' : 'left'}: 14pt;
    border-${isRTL ? 'right' : 'left'}: 2pt solid #4db6ac;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .bold-exp-title {
    font-size: 11.5pt;
    font-weight: 700;
    color: #1e3a3a;
    margin-bottom: 2pt;
  }

  .bold-exp-company {
    font-size: 10pt;
    color: #4db6ac;
    font-weight: 600;
    margin-bottom: 8pt;
  }

  .bold-exp-description {
    font-size: 9.5pt;
    color: #4a5568;
    line-height: 1.7;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
  }

  /* ============================================
     EDUCATION
     ============================================ */
  .bold-edu-item {
    margin-bottom: 8pt;
    padding: 10pt 12pt;
    background: linear-gradient(135deg, #f5fafa 0%, #e8f5f3 100%);
    border-radius: 8pt;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #4db6ac;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .bold-edu-degree {
    font-size: 11pt;
    font-weight: 700;
    color: #1e3a3a;
  }

  .bold-edu-school {
    font-size: 9.5pt;
    color: #4db6ac;
    font-weight: 600;
  }

  .bold-edu-details {
    font-size: 8.5pt;
    color: #718096;
    margin-top: 6pt;
  }

  /* ============================================
     SUMMARY
     ============================================ */
  .bold-summary {
    font-size: 10pt;
    color: #4a5568;
    line-height: 1.6;
    text-align: justify;
    text-align-last: ${isRTL ? 'right' : 'left'};
    padding: 12pt 14pt;
    background: linear-gradient(135deg, #f5fafa 0%, #e8f5f3 100%);
    border-radius: 8pt;
    border-${isRTL ? 'right' : 'left'}: 3pt solid #4db6ac;
    position: relative;
  }

  .bold-summary::before {
    content: '"';
    position: absolute;
    top: 8pt;
    ${isRTL ? 'right' : 'left'}: 10pt;
    font-size: 28pt;
    color: #b2dfdb;
    font-family: Georgia, serif;
    line-height: 1;
  }

  /* ============================================
     GENERIC ITEMS
     ============================================ */
  .bold-generic-item {
    margin-bottom: 8pt;
    padding-${isRTL ? 'right' : 'left'}: 12pt;
    border-${isRTL ? 'right' : 'left'}: 2pt solid #80cbc4;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .bold-item-title {
    font-size: 10.5pt;
    font-weight: 700;
    color: #1e3a3a;
  }

  .bold-item-meta {
    font-size: 9pt;
    color: #4db6ac;
    font-weight: 600;
  }

  .bold-item-description {
    font-size: 9pt;
    color: #4a5568;
    margin-top: 6pt;
    line-height: 1.6;
  }

  /* ============================================
     REFERENCES
     ============================================ */
  .bold-ref-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10pt;
  }

  .bold-ref-item {
    padding: 10pt 12pt;
    background: linear-gradient(135deg, #f5fafa 0%, #e8f5f3 100%);
    border-radius: 6pt;
    border-top: 2pt solid #4db6ac;
    page-break-inside: avoid;
  }

  .bold-ref-name {
    font-size: 10pt;
    font-weight: 700;
    color: #1e3a3a;
  }

  .bold-ref-title {
    font-size: 8.5pt;
    color: #4db6ac;
    font-weight: 600;
  }

  .bold-ref-contact {
    font-size: 8pt;
    color: #718096;
    margin-top: 6pt;
  }

  /* ============================================
     INTERESTS / ADDITIONAL
     ============================================ */
  .bold-tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8pt;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }

  .bold-tag {
    padding: 6pt 14pt;
    background: linear-gradient(135deg, #1e3a3a 0%, #2d5a5a 100%);
    color: #80cbc4;
    border-radius: 16pt;
    font-size: 8.5pt;
    font-weight: 500;
  }

  .bold-info-text {
    font-size: 9.5pt;
    color: #4a5568;
    line-height: 1.7;
  }

  /* ============================================
     PRINT
     ============================================ */
  @media print {
    .bold-sidebar {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .bold-avatar, .bold-section-icon, .bold-item-date, .bold-tag, .bold-skill-fill {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getProficiencyWidth = (proficiency) => {
  const levels = {
    'beginner': '25%',
    'basic': '25%',
    'intermediate': '50%',
    'advanced': '75%',
    'expert': '90%',
    'master': '100%',
    'native': '100%',
    'fluent': '90%',
    'professional': '75%',
    'elementary': '25%'
  };
  return levels[proficiency?.toLowerCase()] || '60%';
};

const getSectionIcon = (sectionKey) => {
  const icons = {
    summary: '◈',
    experience: '▸',
    education: '◆',
    certifications: '✦',
    projects: '◉',
    achievements: '★',
    volunteering: '♡',
    interests: '✿',
    additionalInfo: '◌',
    references: '◐'
  };
  return icons[sectionKey] || '•';
};

const renderSidebarSkills = (skills, language, isRTL) => {
  if (!skills) return '';

  const items = skills.items || [];

  if (items.length > 0) {
    return items.slice(0, 8).map(skill => `
      <div class="bold-skill-item">
        <div class="bold-skill-name">
          <span>${escapeHtml(skill.name)}</span>
        </div>
        <div class="bold-skill-bar">
          <div class="bold-skill-fill" style="width: ${getProficiencyWidth(skill.proficiency)}"></div>
        </div>
      </div>
    `).join('');
  }

  const allSkills = [
    ...(skills.technicalSkills || []),
    ...(skills.softSkills || [])
  ];

  return allSkills.slice(0, 8).map((skill, i) => `
    <div class="bold-skill-item">
      <div class="bold-skill-name">
        <span>${escapeHtml(skill)}</span>
      </div>
      <div class="bold-skill-bar">
        <div class="bold-skill-fill" style="width: ${70 + Math.random() * 25}%"></div>
      </div>
    </div>
  `).join('');
};

const getSectionBuilders = (cvData, language, isRTL) => ({
  summary: () => {
    if (!cvData.summary) return '';
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('summary')}</div>
          <h2 class="bold-section-title">${t('summary', language)}</h2>
        </div>
        <p class="bold-summary">${escapeHtml(cvData.summary)}</p>
      </section>
    `;
  },

  experience: () => {
    if (!cvData.experience?.length) return '';
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('experience')}</div>
          <h2 class="bold-section-title">${t('experience', language)}</h2>
        </div>
        ${cvData.experience.map(exp => {
          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current, language);
          const headerContent = isRTL
            ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>
               <div class="bold-item-title-group">
                 <div class="bold-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>`
            : `<div class="bold-item-title-group">
                 <div class="bold-exp-title">${escapeHtml(exp.jobTitle || exp.title)}</div>
               </div>
               <span class="bold-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="bold-exp-item">
              <div class="bold-item-header">
                ${headerContent}
              </div>
              <div class="bold-exp-company">${escapeHtml(exp.company)}${exp.location ? ` | ${escapeHtml(exp.location)}` : ''}</div>
              ${exp.description ? `<p class="bold-exp-description">${escapeHtml(exp.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  education: () => {
    if (!cvData.education?.length) return '';
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('education')}</div>
          <h2 class="bold-section-title">${t('education', language)}</h2>
        </div>
        ${cvData.education.map(edu => {
          const dateStr = edu.graduationDate || edu.endDate || '';
          const headerContent = isRTL
            ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>
               <div class="bold-item-title-group">
                 <div class="bold-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>`
            : `<div class="bold-item-title-group">
                 <div class="bold-edu-degree">${escapeHtml(edu.degree)}</div>
               </div>
               <span class="bold-item-date">${escapeHtml(dateStr)}</span>`;
          return `
            <article class="bold-edu-item">
              <div class="bold-item-header">
                ${headerContent}
              </div>
              <div class="bold-edu-school">${escapeHtml(edu.institution)}${edu.location ? `, ${escapeHtml(edu.location)}` : ''}</div>
              ${edu.gpa || edu.honors ? `
                <div class="bold-edu-details">
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

  certifications: () => {
    if (!cvData.certifications?.length) return '';
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('certifications')}</div>
          <h2 class="bold-section-title">${t('certifications', language)}</h2>
        </div>
        ${cvData.certifications.map(cert => {
          const dateStr = cert.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="bold-item-title-group">
                 <div class="bold-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>`
            : `<div class="bold-item-title-group">
                 <div class="bold-item-title">${escapeHtml(cert.certification || cert.title || cert.name)}</div>
               </div>
               ${dateStr ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="bold-generic-item">
              <div class="bold-item-header">
                ${headerContent}
              </div>
              ${cert.issuer ? `<div class="bold-item-meta">${escapeHtml(cert.issuer)}</div>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  projects: () => {
    if (!cvData.projects?.length) return '';
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('projects')}</div>
          <h2 class="bold-section-title">${t('projects', language)}</h2>
        </div>
        ${cvData.projects.map(project => {
          const dateStr = project.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="bold-item-title-group">
                 <div class="bold-item-title">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>`
            : `<div class="bold-item-title-group">
                 <div class="bold-item-title">${escapeHtml(project.projectName || project.title || project.name)}</div>
               </div>
               ${dateStr ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="bold-generic-item">
              <div class="bold-item-header">
                ${headerContent}
              </div>
              ${project.technologies ? `<div class="bold-item-meta">${escapeHtml(project.technologies)}</div>` : ''}
              ${project.description ? `<p class="bold-item-description">${escapeHtml(project.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  achievements: () => {
    if (!cvData.achievements?.length) return '';
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('achievements')}</div>
          <h2 class="bold-section-title">${t('achievements', language)}</h2>
        </div>
        ${cvData.achievements.map(achievement => {
          const dateStr = achievement.date || '';
          const headerContent = isRTL
            ? `${dateStr ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="bold-item-title-group">
                 <div class="bold-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>`
            : `<div class="bold-item-title-group">
                 <div class="bold-item-title">${escapeHtml(achievement.achievement || achievement.title)}</div>
               </div>
               ${dateStr ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="bold-generic-item">
              <div class="bold-item-header">
                ${headerContent}
              </div>
              ${achievement.description ? `<p class="bold-item-description">${escapeHtml(achievement.description)}</p>` : ''}
            </article>
          `;
        }).join('')}
      </section>
    `;
  },

  volunteering: () => {
    if (!cvData.volunteering?.length) return '';
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('volunteering')}</div>
          <h2 class="bold-section-title">${t('volunteering', language)}</h2>
        </div>
        ${cvData.volunteering.map(vol => {
          const dateStr = formatDateRange(vol.startDate, vol.endDate, vol.current, language);
          const headerContent = isRTL
            ? `${dateStr ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>` : ''}
               <div class="bold-item-title-group">
                 <div class="bold-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>`
            : `<div class="bold-item-title-group">
                 <div class="bold-item-title">${escapeHtml(vol.role || vol.title)}</div>
               </div>
               ${dateStr ? `<span class="bold-item-date">${escapeHtml(dateStr)}</span>` : ''}`;
          return `
            <article class="bold-generic-item">
              <div class="bold-item-header">
                ${headerContent}
              </div>
              <div class="bold-item-meta">${escapeHtml(vol.organization)}</div>
              ${vol.description ? `<p class="bold-item-description">${escapeHtml(vol.description)}</p>` : ''}
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
      return `<span class="bold-tag">${escapeHtml(name)}</span>`;
    }).join('');
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('interests')}</div>
          <h2 class="bold-section-title">${t('interests', language)}</h2>
        </div>
        <div class="bold-tags-container">${items}</div>
      </section>
    `;
  },

  additionalInfo: () => {
    if (!cvData.additionalInfo) return '';
    let content = '';
    if (typeof cvData.additionalInfo === 'string') {
      content = `<p class="bold-info-text">${escapeHtml(cvData.additionalInfo)}</p>`;
    } else if (cvData.additionalInfo.items && Array.isArray(cvData.additionalInfo.items)) {
      content = `
        <div class="bold-tags-container">
          ${cvData.additionalInfo.items.map(item => `<span class="bold-tag">${escapeHtml(item)}</span>`).join('')}
        </div>
      `;
    } else if (cvData.additionalInfo.text) {
      content = `<p class="bold-info-text">${escapeHtml(cvData.additionalInfo.text)}</p>`;
    }
    if (!content) return '';
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('additionalInfo')}</div>
          <h2 class="bold-section-title">${t('additionalInfo', language)}</h2>
        </div>
        ${content}
      </section>
    `;
  },

  references: () => {
    if (!cvData.references?.length) return '';
    return `
      <section class="bold-section">
        <div class="bold-section-header">
          <div class="bold-section-icon">${getSectionIcon('references')}</div>
          <h2 class="bold-section-title">${t('references', language)}</h2>
        </div>
        <div class="bold-ref-grid">
          ${cvData.references.map(ref => `
            <article class="bold-ref-item">
              <div class="bold-ref-name">${escapeHtml(ref.name)}</div>
              ${ref.title ? `<div class="bold-ref-title">${escapeHtml(ref.title)}${ref.company ? `, ${escapeHtml(ref.company)}` : ''}</div>` : ''}
              ${ref.email || ref.phone ? `
                <div class="bold-ref-contact">
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
  },

  // Sidebar sections
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
  let sidebarHTML = `
    <div class="bold-profile">
      <div class="bold-avatar">${getInitials(info.fullName)}</div>
      <h1 class="bold-name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'Your Name')}</h1>
      ${info.headline ? `<div class="bold-headline">${escapeHtml(info.headline)}</div>` : ''}
    </div>
  `;

  // Contact section
  sidebarHTML += `
    <div class="bold-sidebar-section">
      <h3 class="bold-sidebar-title">${t('contact', language) || 'Contact'}</h3>
      ${info.email ? `
        <div class="bold-contact-item">
          <span class="bold-contact-icon">✉</span>
          <span class="bold-contact-text">${escapeHtml(info.email)}</span>
        </div>
      ` : ''}
      ${info.phone ? `
        <div class="bold-contact-item">
          <span class="bold-contact-icon">☎</span>
          <span class="bold-contact-text">${escapeHtml(info.phone)}</span>
        </div>
      ` : ''}
      ${info.location ? `
        <div class="bold-contact-item">
          <span class="bold-contact-icon">◎</span>
          <span class="bold-contact-text">${escapeHtml(info.location)}</span>
        </div>
      ` : ''}
      ${info.linkedin ? `
        <div class="bold-contact-item">
          <span class="bold-contact-icon">in</span>
          <span class="bold-contact-text">${escapeHtml(info.linkedin)}</span>
        </div>
      ` : ''}
      ${info.website ? `
        <div class="bold-contact-item">
          <span class="bold-contact-icon">◇</span>
          <span class="bold-contact-text">${escapeHtml(info.website)}</span>
        </div>
      ` : ''}
    </div>
  `;

  // Skills section
  const skillsHTML = renderSidebarSkills(cvData.skills, language, isRTL);
  if (skillsHTML) {
    sidebarHTML += `
      <div class="bold-sidebar-section">
        <h3 class="bold-sidebar-title">${t('skills', language)}</h3>
        ${skillsHTML}
      </div>
    `;
  }

  // Languages section
  if (cvData.languages?.length > 0) {
    sidebarHTML += `
      <div class="bold-sidebar-section">
        <h3 class="bold-sidebar-title">${t('languages', language)}</h3>
        ${cvData.languages.map(lang => `
          <div class="bold-lang-item">
            <span class="bold-lang-name">${escapeHtml(lang.language || lang.name)}</span>
            ${lang.proficiency ? `<span class="bold-lang-level">${escapeHtml(lang.proficiency)}</span>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=210mm, initial-scale=1.0">
      <title>${escapeHtml(info.fullName || 'CV')} - Refined Resume</title>
      <style>
        ${getBaseCSS(isRTL, cairoFontBase64)}
        ${getBoldCSS(isRTL)}
      </style>
    </head>
    <body>
      <div class="cv-container">
        <aside class="bold-sidebar">
          ${sidebarHTML}
        </aside>
        <main class="bold-main">
          ${mainHTML}
        </main>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateHTML };

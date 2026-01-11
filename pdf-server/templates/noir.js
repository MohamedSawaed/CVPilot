// Noir Template - Dark Sophisticated Design
// Charcoal and silver with elegant typography

function getBaseCSS() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

    /* A4 Page Setup - All pages same dimensions */
    @page {
      size: A4;
      margin: 12mm 15mm;
    }

    @page :first {
      margin-top: 0;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Montserrat', 'Cairo', sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #e8e8e8;
      background: #0a0a0a;
      width: 210mm;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .cv-container {
      width: 210mm;
      min-height: 297mm;
      background: linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #1a1a1a 100%);
      padding: 0;
      position: relative;
      overflow: visible;
    }

    /* Decorative top border */
    .top-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent 0%, #6b6b6b 20%, #a8a8a8 50%, #6b6b6b 80%, transparent 100%);
    }

    /* Header Section */
    .header {
      padding: 35px 45px 25px;
      text-align: center;
      position: relative;
      border-bottom: 1px solid rgba(168, 168, 168, 0.15);
    }

    .header::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #6b6b6b, #a8a8a8, #6b6b6b);
    }

    .name {
      font-family: 'Cormorant Garamond', 'Cairo', serif;
      font-size: 32pt;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 6px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .headline {
      font-size: 11pt;
      font-weight: 300;
      color: #a8a8a8;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    /* Contact Info */
    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 25px;
      font-size: 9pt;
      color: #888;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .contact-icon {
      color: #a8a8a8;
      font-size: 10pt;
    }

    .contact-item a {
      color: #888;
      text-decoration: none;
      transition: color 0.3s;
    }

    .contact-item a:hover {
      color: #a8a8a8;
    }

    /* Main Content */
    .main-content {
      padding: 30px 45px;
    }

    /* Summary Section */
    .summary-section {
      margin-bottom: 20px;
      padding: 18px 22px;
      background: rgba(168, 168, 168, 0.03);
      border-left: 2px solid #6b6b6b;
      border-right: 2px solid #6b6b6b;
    }

    .summary-text {
      font-size: 10.5pt;
      line-height: 1.8;
      color: #c8c8c8;
      text-align: center;
      font-weight: 300;
    }

    /* Section Styles */
    .section {
      margin-bottom: 20px;
      page-break-inside: auto;
      break-inside: auto;
      page-break-before: auto;
    }

    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      gap: 12px;
    }

    .section-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(168, 168, 168, 0.3), transparent);
    }

    .section-line.right {
      background: linear-gradient(90deg, transparent, rgba(168, 168, 168, 0.3));
    }

    .section-title {
      font-family: 'Cormorant Garamond', 'Cairo', serif;
      font-size: 12pt;
      font-weight: 600;
      color: #a8a8a8;
      letter-spacing: 4px;
      text-transform: uppercase;
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Experience Items */
    .experience-item {
      margin-bottom: 14px;
      padding-left: 18px;
      border-left: 1px solid rgba(168, 168, 168, 0.2);
      position: relative;
      page-break-inside: avoid;
    }

    .experience-item::before {
      content: '';
      position: absolute;
      left: -4px;
      top: 5px;
      width: 7px;
      height: 7px;
      background: #0a0a0a;
      border: 1px solid #a8a8a8;
      transform: rotate(45deg);
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
      flex-direction: row;
    }

    .experience-title-group {
      order: 1;
    }

    .experience-date {
      order: 2;
      font-size: 9pt;
      color: #6b6b6b;
      font-weight: 400;
      letter-spacing: 1px;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .experience-title {
      font-size: 11pt;
      font-weight: 600;
      color: #e8e8e8;
      margin-bottom: 3px;
    }

    .experience-company {
      font-size: 10pt;
      color: #a8a8a8;
      font-weight: 400;
    }

    .experience-description {
      font-size: 9.5pt;
      color: #999;
      line-height: 1.6;
      margin-top: 8px;
    }

    .experience-description ul {
      list-style: none;
      padding: 0;
    }

    .experience-description li {
      padding-left: 15px;
      position: relative;
      margin-bottom: 5px;
    }

    .experience-description li::before {
      content: '—';
      position: absolute;
      left: 0;
      color: #6b6b6b;
    }

    /* Education Items */
    .education-item {
      margin-bottom: 12px;
      padding: 12px 16px;
      background: rgba(168, 168, 168, 0.02);
      border: 1px solid rgba(168, 168, 168, 0.1);
      page-break-inside: avoid;
    }

    .education-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: row;
    }

    .education-title-group {
      order: 1;
    }

    .education-date {
      order: 2;
      font-size: 9pt;
      color: #6b6b6b;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .education-degree {
      font-size: 11pt;
      font-weight: 600;
      color: #e8e8e8;
      margin-bottom: 3px;
    }

    .education-school {
      font-size: 10pt;
      color: #a8a8a8;
    }

    .education-details {
      font-size: 9pt;
      color: #888;
      margin-top: 8px;
    }

    /* Skills Section */
    .skills-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .skill-category {
      padding: 10px 12px;
      background: rgba(168, 168, 168, 0.02);
      border: 1px solid rgba(168, 168, 168, 0.08);
    }

    .skill-category-name {
      font-size: 9pt;
      font-weight: 600;
      color: #a8a8a8;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tag {
      font-size: 8.5pt;
      color: #888;
      padding: 4px 10px;
      background: rgba(168, 168, 168, 0.05);
      border: 1px solid rgba(168, 168, 168, 0.15);
    }

    /* Languages */
    .languages-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
    }

    .language-item {
      text-align: center;
      min-width: 100px;
    }

    .language-name {
      font-size: 10pt;
      font-weight: 500;
      color: #e8e8e8;
      margin-bottom: 5px;
    }

    .language-level {
      font-size: 8.5pt;
      color: #6b6b6b;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Certifications */
    .cert-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid rgba(168, 168, 168, 0.08);
      flex-direction: row;
    }

    .cert-item:last-child {
      border-bottom: none;
    }

    .cert-info {
      order: 1;
    }

    .cert-date {
      order: 2;
      font-size: 9pt;
      color: #6b6b6b;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .cert-name {
      font-size: 10pt;
      font-weight: 500;
      color: #e8e8e8;
      margin-bottom: 2px;
    }

    .cert-issuer {
      font-size: 9pt;
      color: #888;
    }

    /* Projects */
    .project-item {
      margin-bottom: 12px;
      padding: 14px;
      background: rgba(168, 168, 168, 0.02);
      border: 1px solid rgba(168, 168, 168, 0.08);
      page-break-inside: avoid;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
      flex-direction: row;
    }

    .project-title-group {
      order: 1;
    }

    .project-date {
      order: 2;
      font-size: 9pt;
      color: #6b6b6b;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .project-name {
      font-size: 11pt;
      font-weight: 600;
      color: #e8e8e8;
    }

    .project-tech {
      font-size: 8.5pt;
      color: #a8a8a8;
      margin-top: 3px;
    }

    .project-description {
      font-size: 9.5pt;
      color: #999;
      line-height: 1.6;
    }

    .project-link {
      display: inline-block;
      margin-top: 10px;
      font-size: 8.5pt;
      color: #a8a8a8;
      text-decoration: none;
      border-bottom: 1px solid rgba(168, 168, 168, 0.3);
    }

    /* Volunteer */
    .volunteer-item {
      margin-bottom: 10px;
      padding-left: 12px;
      border-left: 1px solid rgba(168, 168, 168, 0.15);
      page-break-inside: avoid;
    }

    .volunteer-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: row;
    }

    .volunteer-title-group {
      order: 1;
    }

    .volunteer-date {
      order: 2;
      font-size: 9pt;
      color: #6b6b6b;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .volunteer-role {
      font-size: 10pt;
      font-weight: 500;
      color: #e8e8e8;
    }

    .volunteer-org {
      font-size: 9pt;
      color: #a8a8a8;
    }

    .volunteer-description {
      font-size: 9pt;
      color: #888;
      margin-top: 5px;
    }

    /* References */
    .reference-item {
      padding: 10px 12px;
      background: rgba(168, 168, 168, 0.02);
      border: 1px solid rgba(168, 168, 168, 0.08);
      margin-bottom: 8px;
      page-break-inside: avoid;
    }

    .reference-name {
      font-size: 10pt;
      font-weight: 600;
      color: #e8e8e8;
      margin-bottom: 3px;
    }

    .reference-title {
      font-size: 9pt;
      color: #a8a8a8;
      margin-bottom: 5px;
    }

    .reference-contact {
      font-size: 8.5pt;
      color: #6b6b6b;
    }

    /* Custom Section */
    .custom-content {
      font-size: 10pt;
      color: #999;
      line-height: 1.7;
    }

    /* RTL Support */
    .rtl {
      direction: rtl;
      text-align: right;
    }

    .rtl .experience-header,
    .rtl .education-header,
    .rtl .project-header,
    .rtl .volunteer-header,
    .rtl .cert-item {
      flex-direction: row;
    }

    .rtl .experience-title-group,
    .rtl .education-title-group,
    .rtl .project-title-group,
    .rtl .volunteer-title-group,
    .rtl .cert-info {
      order: 2;
      text-align: right;
    }

    .rtl .experience-date,
    .rtl .education-date,
    .rtl .project-date,
    .rtl .volunteer-date,
    .rtl .cert-date {
      order: 1;
      text-align: left;
    }

    .rtl .experience-item {
      padding-left: 0;
      padding-right: 20px;
      border-left: none;
      border-right: 1px solid rgba(168, 168, 168, 0.2);
    }

    .rtl .experience-item::before {
      left: auto;
      right: -4px;
    }

    .rtl .experience-description li {
      padding-left: 0;
      padding-right: 15px;
    }

    .rtl .experience-description li::before {
      left: auto;
      right: 0;
    }

    .rtl .section-line {
      background: linear-gradient(90deg, transparent, rgba(168, 168, 168, 0.3));
    }

    .rtl .section-line.right {
      background: linear-gradient(90deg, rgba(168, 168, 168, 0.3), transparent);
    }

    .rtl .volunteer-item {
      padding-left: 0;
      padding-right: 15px;
      border-left: none;
      border-right: 1px solid rgba(168, 168, 168, 0.15);
    }

    .rtl .summary-section {
      border-left: 2px solid #6b6b6b;
      border-right: 2px solid #6b6b6b;
    }

    /* Print Styles */
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .cv-container {
        background: linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #1a1a1a 100%) !important;
      }
    }
  `;
}

function formatDateRange(startDate, endDate, language) {
  if (!startDate && !endDate) return '';

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr.toLowerCase() === 'present' || dateStr.toLowerCase() === 'current') {
      return language === 'ar' ? 'الحالي' : 'Present';
    }
    return dateStr;
  };

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (start && end) {
    return `${start} — ${end}`;
  }
  return start || end;
}

function getSectionBuilders(data, language) {
  const isRTL = language === 'ar' || language === 'he';

  return {
    summary: () => {
      if (!data.summary) return '';
      return `
        <div class="summary-section">
          <p class="summary-text">${data.summary}</p>
        </div>
      `;
    },

    experience: () => {
      if (!data.experience || data.experience.length === 0) return '';
      const sectionTitle = language === 'ar' ? 'الخبرة المهنية' : 'Professional Experience';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-line"></div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line right"></div>
          </div>
          ${data.experience.map(exp => `
            <div class="experience-item">
              <div class="experience-header">
                <div class="experience-title-group">
                  <div class="experience-title">${exp.position || exp.title || ''}</div>
                  <div class="experience-company">${exp.company || ''}</div>
                </div>
                <div class="experience-date">${formatDateRange(exp.startDate, exp.endDate, language)}</div>
              </div>
              ${exp.description ? `
                <div class="experience-description">
                  ${Array.isArray(exp.description)
                    ? `<ul>${exp.description.map(item => `<li>${item}</li>`).join('')}</ul>`
                    : `<p>${exp.description}</p>`
                  }
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
    },

    education: () => {
      if (!data.education || data.education.length === 0) return '';
      const sectionTitle = language === 'ar' ? 'التعليم' : 'Education';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-line"></div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line right"></div>
          </div>
          ${data.education.map(edu => `
            <div class="education-item">
              <div class="education-header">
                <div class="education-title-group">
                  <div class="education-degree">${edu.degree || ''}</div>
                  <div class="education-school">${edu.school || edu.institution || ''}</div>
                </div>
                <div class="education-date">${formatDateRange(edu.startDate, edu.endDate, language)}</div>
              </div>
              ${edu.details || edu.gpa || edu.honors ? `
                <div class="education-details">
                  ${edu.gpa ? `GPA: ${edu.gpa}` : ''}
                  ${edu.honors ? ` • ${edu.honors}` : ''}
                  ${edu.details ? `<br>${edu.details}` : ''}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
    },

    skills: () => {
      if (!data.skills) return '';
      const sectionTitle = language === 'ar' ? 'المهارات' : 'Skills';

      // Handle skills as array or object
      let skillsArray = [];
      if (Array.isArray(data.skills)) {
        skillsArray = data.skills;
      } else if (typeof data.skills === 'object') {
        // Skills might be grouped by category like { technical: [...], soft: [...] }
        Object.entries(data.skills).forEach(([category, skills]) => {
          if (Array.isArray(skills)) {
            skills.forEach(skill => {
              skillsArray.push({ name: skill.name || skill, category });
            });
          }
        });
      }

      if (skillsArray.length === 0) return '';

      // Group skills by category
      const skillsByCategory = {};
      skillsArray.forEach(skill => {
        const category = skill.category || (language === 'ar' ? 'عام' : 'General');
        if (!skillsByCategory[category]) {
          skillsByCategory[category] = [];
        }
        skillsByCategory[category].push(skill.name || skill);
      });

      const categories = Object.entries(skillsByCategory);

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-line"></div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line right"></div>
          </div>
          <div class="skills-container">
            ${categories.map(([category, skills]) => `
              <div class="skill-category">
                <div class="skill-category-name">${category}</div>
                <div class="skill-tags">
                  ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    languages: () => {
      if (!data.languages || data.languages.length === 0) return '';
      const sectionTitle = language === 'ar' ? 'اللغات' : 'Languages';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-line"></div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line right"></div>
          </div>
          <div class="languages-container">
            ${data.languages.map(lang => `
              <div class="language-item">
                <div class="language-name">${lang.name || lang.language || ''}</div>
                <div class="language-level">${lang.level || lang.proficiency || ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    certifications: () => {
      if (!data.certifications || data.certifications.length === 0) return '';
      const sectionTitle = language === 'ar' ? 'الشهادات' : 'Certifications';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-line"></div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line right"></div>
          </div>
          ${data.certifications.map(cert => `
            <div class="cert-item">
              <div class="cert-info">
                <div class="cert-name">${cert.name || ''}</div>
                <div class="cert-issuer">${cert.issuer || cert.organization || ''}</div>
              </div>
              <div class="cert-date">${cert.date || cert.year || ''}</div>
            </div>
          `).join('')}
        </div>
      `;
    },

    projects: () => {
      if (!data.projects || data.projects.length === 0) return '';
      const sectionTitle = language === 'ar' ? 'المشاريع' : 'Projects';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-line"></div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line right"></div>
          </div>
          ${data.projects.map(project => `
            <div class="project-item">
              <div class="project-header">
                <div class="project-title-group">
                  <div class="project-name">${project.name || project.title || ''}</div>
                  ${project.technologies ? `<div class="project-tech">${Array.isArray(project.technologies) ? project.technologies.join(' • ') : project.technologies}</div>` : ''}
                </div>
                <div class="project-date">${formatDateRange(project.startDate, project.endDate, language)}</div>
              </div>
              ${project.description ? `<div class="project-description">${project.description}</div>` : ''}
              ${project.link || project.url ? `<a href="${project.link || project.url}" class="project-link">${language === 'ar' ? 'عرض المشروع' : 'View Project'}</a>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    },

    volunteer: () => {
      if (!data.volunteer || data.volunteer.length === 0) return '';
      const sectionTitle = language === 'ar' ? 'العمل التطوعي' : 'Volunteer Experience';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-line"></div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line right"></div>
          </div>
          ${data.volunteer.map(vol => `
            <div class="volunteer-item">
              <div class="volunteer-header">
                <div class="volunteer-title-group">
                  <div class="volunteer-role">${vol.role || vol.position || ''}</div>
                  <div class="volunteer-org">${vol.organization || ''}</div>
                </div>
                <div class="volunteer-date">${formatDateRange(vol.startDate, vol.endDate, language)}</div>
              </div>
              ${vol.description ? `<div class="volunteer-description">${vol.description}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    },

    references: () => {
      if (!data.references || data.references.length === 0) return '';
      const sectionTitle = language === 'ar' ? 'المراجع' : 'References';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-line"></div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line right"></div>
          </div>
          ${data.references.map(ref => `
            <div class="reference-item">
              <div class="reference-name">${ref.name || ''}</div>
              <div class="reference-title">${ref.title || ref.position || ''}${ref.company ? ` • ${ref.company}` : ''}</div>
              <div class="reference-contact">
                ${ref.email ? ref.email : ''}${ref.phone ? ` • ${ref.phone}` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    },

    custom: (section) => {
      if (!section || !section.content) return '';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-line"></div>
            <h2 class="section-title">${section.title || (language === 'ar' ? 'معلومات إضافية' : 'Additional Information')}</h2>
            <div class="section-line right"></div>
          </div>
          <div class="custom-content">${section.content}</div>
        </div>
      `;
    }
  };
}

function generateNoirTemplate(data) {
  const language = data.language || 'en';
  const isRTL = language === 'ar' || language === 'he';

  const sectionBuilders = getSectionBuilders(data, language);

  // Default section order
  const defaultOrder = ['summary', 'experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'volunteer', 'references'];
  const sectionOrder = data.sectionOrder || defaultOrder;

  // Build sections
  let sectionsHTML = '';
  sectionOrder.forEach(sectionId => {
    if (sectionBuilders[sectionId]) {
      sectionsHTML += sectionBuilders[sectionId]();
    } else if (data.customSections && data.customSections[sectionId]) {
      sectionsHTML += sectionBuilders.custom(data.customSections[sectionId]);
    }
  });

  // Contact icons
  const emailIcon = '✉';
  const phoneIcon = '☎';
  const locationIcon = '◆';
  const linkedinIcon = '◈';
  const websiteIcon = '◇';

  return `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.personalInfo?.fullName || data.personalInfo?.name || 'Resume'} - CV</title>
      <style>${getBaseCSS()}</style>
    </head>
    <body>
      <div class="cv-container ${isRTL ? 'rtl' : ''}">
        <div class="top-accent"></div>

        <header class="header">
          <h1 class="name">${data.personalInfo?.fullName || data.personalInfo?.name || ''}</h1>
          ${data.personalInfo?.headline ? `<div class="headline">${data.personalInfo.headline}</div>` : ''}

          <div class="contact-info">
            ${data.personalInfo?.email ? `
              <div class="contact-item">
                <span class="contact-icon">${emailIcon}</span>
                <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a>
              </div>
            ` : ''}
            ${data.personalInfo?.phone ? `
              <div class="contact-item">
                <span class="contact-icon">${phoneIcon}</span>
                <span>${data.personalInfo.phone}</span>
              </div>
            ` : ''}
            ${data.personalInfo?.location ? `
              <div class="contact-item">
                <span class="contact-icon">${locationIcon}</span>
                <span>${data.personalInfo.location}</span>
              </div>
            ` : ''}
            ${data.personalInfo?.linkedin ? `
              <div class="contact-item">
                <span class="contact-icon">${linkedinIcon}</span>
                <a href="${data.personalInfo.linkedin}">${data.personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</a>
              </div>
            ` : ''}
            ${data.personalInfo?.website ? `
              <div class="contact-item">
                <span class="contact-icon">${websiteIcon}</span>
                <a href="${data.personalInfo.website}">${data.personalInfo.website.replace(/^https?:\/\//, '')}</a>
              </div>
            ` : ''}
          </div>
        </header>

        <main class="main-content">
          ${sectionsHTML}
        </main>
      </div>
    </body>
    </html>
  `;
}

// Export as generateHTML for consistency with server.js
function generateHTML(cvData, sections, language, isRTL, cairoFontBase64) {
  // Map the cvData to the format expected by generateNoirTemplate
  const data = {
    ...cvData,
    language,
    sectionOrder: sections
  };
  return generateNoirTemplate(data);
}

module.exports = { generateHTML, generateNoirTemplate };

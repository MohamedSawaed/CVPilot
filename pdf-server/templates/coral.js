// Coral Template - Warm Elegant Design
// Soft coral and cream with sophisticated warmth

function getBaseCSS() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600&display=swap');

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
      font-family: 'Source Sans Pro', 'Cairo', sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #4a3f3f;
      background: #fdfbf9;
      width: 210mm;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .cv-container {
      width: 210mm;
      min-height: 297mm;
      background: linear-gradient(180deg, #fdfbf9 0%, #faf7f4 100%);
      padding: 0;
      position: relative;
      overflow: visible;
    }

    /* Header Section with Coral Accent */
    .header {
      background: linear-gradient(135deg, #e8a598 0%, #dea193 25%, #d4978b 50%, #c98d81 75%, #be8377 100%);
      padding: 35px 45px;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(50%, -50%);
    }

    .header-content {
      position: relative;
      z-index: 1;
    }

    .name {
      font-family: 'Playfair Display', 'Cairo', serif;
      font-size: 30pt;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 2px;
      margin-bottom: 8px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .headline {
      font-size: 12pt;
      font-weight: 300;
      color: rgba(255,255,255,0.9);
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    /* Contact Info */
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      font-size: 9.5pt;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255,255,255,0.95);
    }

    .contact-icon {
      width: 28px;
      height: 28px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11pt;
    }

    .contact-item a {
      color: rgba(255,255,255,0.95);
      text-decoration: none;
    }

    /* Main Content */
    .main-content {
      padding: 30px 45px;
    }

    /* Summary Section */
    .summary-section {
      margin-bottom: 20px;
      padding: 18px 22px;
      background: linear-gradient(135deg, rgba(232, 165, 152, 0.08) 0%, rgba(190, 131, 119, 0.05) 100%);
      border-radius: 10px;
      border-left: 4px solid #d4978b;
      position: relative;
    }

    .summary-section::before {
      content: '"';
      position: absolute;
      top: 10px;
      left: 15px;
      font-family: 'Playfair Display', serif;
      font-size: 40pt;
      color: rgba(212, 151, 139, 0.3);
      line-height: 1;
    }

    .summary-text {
      font-size: 10.5pt;
      line-height: 1.8;
      color: #5a4a4a;
      font-style: italic;
      padding-left: 25px;
    }

    /* Section Styles */
    .section {
      margin-bottom: 18px;
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

    .section-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #e8a598 0%, #d4978b 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14pt;
      box-shadow: 0 4px 12px rgba(212, 151, 139, 0.3);
    }

    .section-title {
      font-family: 'Playfair Display', 'Cairo', serif;
      font-size: 14pt;
      font-weight: 600;
      color: #4a3f3f;
      letter-spacing: 1px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .section-line {
      flex: 1;
      height: 2px;
      background: linear-gradient(90deg, rgba(212, 151, 139, 0.4), transparent);
    }

    /* Experience Items */
    .experience-item {
      margin-bottom: 14px;
      padding: 14px 18px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(74, 63, 63, 0.05);
      border: 1px solid rgba(212, 151, 139, 0.15);
      page-break-inside: avoid;
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      flex-direction: row;
    }

    .experience-title-group {
      order: 1;
    }

    .experience-date {
      order: 2;
      font-size: 9pt;
      color: #ffffff;
      background: linear-gradient(135deg, #d4978b, #c98d81);
      padding: 4px 12px;
      border-radius: 15px;
      font-weight: 500;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .experience-title {
      font-size: 12pt;
      font-weight: 600;
      color: #4a3f3f;
      margin-bottom: 4px;
    }

    .experience-company {
      font-size: 10.5pt;
      color: #c98d81;
      font-weight: 500;
    }

    .experience-description {
      font-size: 9.5pt;
      color: #6a5a5a;
      line-height: 1.7;
    }

    .experience-description ul {
      list-style: none;
      padding: 0;
      margin-top: 10px;
    }

    .experience-description li {
      padding-left: 20px;
      position: relative;
      margin-bottom: 6px;
    }

    .experience-description li::before {
      content: '◆';
      position: absolute;
      left: 0;
      color: #d4978b;
      font-size: 7pt;
      top: 3px;
    }

    /* Education Items */
    .education-item {
      margin-bottom: 12px;
      padding: 12px 16px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(74, 63, 63, 0.04);
      border-left: 3px solid #d4978b;
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
      color: #c98d81;
      font-weight: 500;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .education-degree {
      font-size: 11.5pt;
      font-weight: 600;
      color: #4a3f3f;
      margin-bottom: 3px;
    }

    .education-school {
      font-size: 10pt;
      color: #7a6a6a;
    }

    .education-details {
      font-size: 9pt;
      color: #8a7a7a;
      margin-top: 8px;
      font-style: italic;
    }

    /* Skills Section */
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tag {
      font-size: 9pt;
      color: #4a3f3f;
      padding: 8px 16px;
      background: linear-gradient(135deg, rgba(232, 165, 152, 0.15) 0%, rgba(212, 151, 139, 0.1) 100%);
      border-radius: 20px;
      border: 1px solid rgba(212, 151, 139, 0.25);
      font-weight: 500;
    }

    .skill-tag.highlight {
      background: linear-gradient(135deg, #e8a598, #d4978b);
      color: white;
      border: none;
    }

    /* Languages */
    .languages-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .language-item {
      text-align: center;
      padding: 10px 18px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(74, 63, 63, 0.04);
      min-width: 100px;
    }

    .language-name {
      font-size: 11pt;
      font-weight: 600;
      color: #4a3f3f;
      margin-bottom: 5px;
    }

    .language-level {
      font-size: 9pt;
      color: #c98d81;
      font-weight: 500;
    }

    .language-bar {
      margin-top: 8px;
      height: 4px;
      background: rgba(212, 151, 139, 0.2);
      border-radius: 2px;
      overflow: hidden;
    }

    .language-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #e8a598, #d4978b);
      border-radius: 2px;
    }

    /* Certifications */
    .cert-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      background: #ffffff;
      border-radius: 8px;
      margin-bottom: 8px;
      box-shadow: 0 2px 6px rgba(74, 63, 63, 0.03);
      border: 1px solid rgba(212, 151, 139, 0.12);
      flex-direction: row;
      page-break-inside: avoid;
    }

    .cert-info {
      order: 1;
    }

    .cert-date {
      order: 2;
      font-size: 9pt;
      color: #c98d81;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .cert-name {
      font-size: 10.5pt;
      font-weight: 600;
      color: #4a3f3f;
      margin-bottom: 2px;
    }

    .cert-issuer {
      font-size: 9pt;
      color: #8a7a7a;
    }

    /* Projects */
    .project-item {
      margin-bottom: 12px;
      padding: 14px 18px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(74, 63, 63, 0.05);
      border: 1px solid rgba(212, 151, 139, 0.15);
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
      color: #c98d81;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .project-name {
      font-size: 11.5pt;
      font-weight: 600;
      color: #4a3f3f;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 5px;
    }

    .project-tech-tag {
      font-size: 8pt;
      color: #c98d81;
      background: rgba(212, 151, 139, 0.1);
      padding: 2px 8px;
      border-radius: 10px;
    }

    .project-description {
      font-size: 9.5pt;
      color: #6a5a5a;
      line-height: 1.6;
      margin-top: 10px;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      margin-top: 12px;
      font-size: 9pt;
      color: #d4978b;
      text-decoration: none;
      font-weight: 500;
    }

    .project-link:hover {
      color: #c98d81;
    }

    /* Volunteer */
    .volunteer-item {
      margin-bottom: 10px;
      padding: 12px 16px;
      background: linear-gradient(135deg, rgba(232, 165, 152, 0.05) 0%, transparent 100%);
      border-radius: 8px;
      border-left: 3px solid #d4978b;
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
      color: #c98d81;
      direction: ltr;
      font-variant-numeric: tabular-nums;
    }

    .volunteer-role {
      font-size: 10.5pt;
      font-weight: 600;
      color: #4a3f3f;
    }

    .volunteer-org {
      font-size: 9.5pt;
      color: #8a7a7a;
    }

    .volunteer-description {
      font-size: 9pt;
      color: #7a6a6a;
      margin-top: 8px;
      line-height: 1.6;
    }

    /* References */
    .references-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .reference-item {
      padding: 12px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(74, 63, 63, 0.04);
      page-break-inside: avoid;
    }

    .reference-name {
      font-size: 11pt;
      font-weight: 600;
      color: #4a3f3f;
      margin-bottom: 3px;
    }

    .reference-title {
      font-size: 9.5pt;
      color: #c98d81;
      margin-bottom: 8px;
    }

    .reference-contact {
      font-size: 8.5pt;
      color: #8a7a7a;
    }

    /* Custom Section */
    .custom-content {
      font-size: 10pt;
      color: #5a4a4a;
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

    .rtl .summary-section {
      border-left: none;
      border-right: 4px solid #d4978b;
    }

    .rtl .summary-section::before {
      left: auto;
      right: 15px;
    }

    .rtl .summary-text {
      padding-left: 0;
      padding-right: 25px;
    }

    .rtl .experience-description li {
      padding-left: 0;
      padding-right: 20px;
    }

    .rtl .experience-description li::before {
      left: auto;
      right: 0;
    }

    .rtl .education-item {
      border-left: none;
      border-right: 3px solid #d4978b;
    }

    .rtl .volunteer-item {
      border-left: none;
      border-right: 3px solid #d4978b;
    }

    .rtl .section-line {
      background: linear-gradient(90deg, transparent, rgba(212, 151, 139, 0.4));
    }

    /* Print Styles */
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .cv-container {
        background: linear-gradient(180deg, #fdfbf9 0%, #faf7f4 100%) !important;
      }

      .header {
        background: linear-gradient(135deg, #e8a598 0%, #dea193 25%, #d4978b 50%, #c98d81 75%, #be8377 100%) !important;
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

function getLanguageLevelPercent(level) {
  const levels = {
    'native': 100,
    'fluent': 95,
    'advanced': 85,
    'intermediate': 65,
    'basic': 40,
    'beginner': 25,
    'اللغة الأم': 100,
    'طلاقة': 95,
    'متقدم': 85,
    'متوسط': 65,
    'مبتدئ': 25
  };
  return levels[level?.toLowerCase()] || 50;
}

function getSectionBuilders(data, language) {
  const isRTL = language === 'ar' || language === 'he';

  // Section icons
  const icons = {
    experience: '💼',
    education: '🎓',
    skills: '⚡',
    languages: '🌐',
    certifications: '🏆',
    projects: '🚀',
    volunteer: '❤',
    references: '📋'
  };

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
            <div class="section-icon">${icons.experience}</div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line"></div>
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
            <div class="section-icon">${icons.education}</div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line"></div>
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
                  ${edu.details ? `${edu.gpa || edu.honors ? '<br>' : ''}${edu.details}` : ''}
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
              skillsArray.push(skill.name || skill);
            });
          }
        });
      }

      if (skillsArray.length === 0) return '';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-icon">${icons.skills}</div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line"></div>
          </div>
          <div class="skills-container">
            ${skillsArray.map((skill, idx) => `
              <span class="skill-tag ${idx < 3 ? 'highlight' : ''}">${skill.name || skill}</span>
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
            <div class="section-icon">${icons.languages}</div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line"></div>
          </div>
          <div class="languages-container">
            ${data.languages.map(lang => `
              <div class="language-item">
                <div class="language-name">${lang.name || lang.language || ''}</div>
                <div class="language-level">${lang.level || lang.proficiency || ''}</div>
                <div class="language-bar">
                  <div class="language-bar-fill" style="width: ${getLanguageLevelPercent(lang.level || lang.proficiency)}%"></div>
                </div>
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
            <div class="section-icon">${icons.certifications}</div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line"></div>
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
            <div class="section-icon">${icons.projects}</div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line"></div>
          </div>
          ${data.projects.map(project => `
            <div class="project-item">
              <div class="project-header">
                <div class="project-title-group">
                  <div class="project-name">${project.name || project.title || ''}</div>
                  ${project.technologies ? `
                    <div class="project-tech">
                      ${(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(',')).map(tech =>
                        `<span class="project-tech-tag">${tech.trim()}</span>`
                      ).join('')}
                    </div>
                  ` : ''}
                </div>
                <div class="project-date">${formatDateRange(project.startDate, project.endDate, language)}</div>
              </div>
              ${project.description ? `<div class="project-description">${project.description}</div>` : ''}
              ${project.link || project.url ? `<a href="${project.link || project.url}" class="project-link">→ ${language === 'ar' ? 'عرض المشروع' : 'View Project'}</a>` : ''}
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
            <div class="section-icon">${icons.volunteer}</div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line"></div>
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
            <div class="section-icon">${icons.references}</div>
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="section-line"></div>
          </div>
          <div class="references-grid">
            ${data.references.map(ref => `
              <div class="reference-item">
                <div class="reference-name">${ref.name || ''}</div>
                <div class="reference-title">${ref.title || ref.position || ''}${ref.company ? ` • ${ref.company}` : ''}</div>
                <div class="reference-contact">
                  ${ref.email ? ref.email : ''}${ref.phone ? `<br>${ref.phone}` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    custom: (section) => {
      if (!section || !section.content) return '';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-icon">✦</div>
            <h2 class="section-title">${section.title || (language === 'ar' ? 'معلومات إضافية' : 'Additional Information')}</h2>
            <div class="section-line"></div>
          </div>
          <div class="custom-content">${section.content}</div>
        </div>
      `;
    }
  };
}

function generateCoralTemplate(data) {
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
        <header class="header">
          <div class="header-content">
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
  // Map the cvData to the format expected by generateCoralTemplate
  const data = {
    ...cvData,
    language,
    sectionOrder: sections
  };
  return generateCoralTemplate(data);
}

module.exports = { generateHTML, generateCoralTemplate };

// PDF Export - Multiple fallback methods for PDF generation
// 1. Local Puppeteer server (best quality, requires running server)
// 2. Browser print dialog (works everywhere, user must "Save as PDF")

import { uploadPDF } from '../services/cvService';

const PDF_SERVER_URL = 'http://localhost:3001';
const SERVER_TIMEOUT = 30000; // 30 second timeout for PDF generation

// Main PDF generation function - calls Puppeteer server for direct PDF download
// Optional: pass userId and cvId to save PDF to Firebase Storage
export const generatePDFFromServer = async (cvData, templateStyle = 'modern', sections = [], language = null, userId = null, cvId = null) => {
  // Validate required parameters
  if (!cvData) {
    console.error('generatePDFFromServer: cvData is required');
    alert('Error: No CV data to export');
    return false;
  }

  // Ensure sections is an array
  const sectionsArray = Array.isArray(sections) ? sections : [];

  const currentLanguage = language || localStorage.getItem('cv-language') || 'en';
  const isRTL = ['ar', 'he'].includes(currentLanguage);

  // Show loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'pdf-loading-overlay';
  loadingOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 100000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-family: Arial, sans-serif;
  `;
  loadingOverlay.innerHTML = `
    <div style="width: 50px; height: 50px; border: 4px solid #fff; border-top-color: #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div>
    <p style="margin-top: 20px;">${isRTL ? 'جاري إنشاء PDF...' : 'Generating PDF...'}</p>
    <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
  `;
  document.body.appendChild(loadingOverlay);

  try {
    // Quick server check with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SERVER_TIMEOUT);

    try {
      const response = await fetch(`${PDF_SERVER_URL}/api/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvData,
          templateStyle,
          language: currentLanguage,
          sections: sectionsArray
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      // Get the PDF blob
      const pdfBlob = await response.blob();
      const fileName = `${cvData.personalInfo?.fullName || 'CV'}_${templateStyle}.pdf`;

      // Create download link
      const downloadUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(downloadUrl);

      // Upload to Firebase Storage if userId and cvId are provided
      if (userId && cvId) {
        try {
          const { url, error } = await uploadPDF(userId, cvId, pdfBlob, fileName);
          if (error) {
            console.warn('PDF generated but failed to upload to storage:', error);
          } else {
            console.log('PDF saved to Firebase Storage:', url);
          }
        } catch (uploadError) {
          console.warn('PDF upload error:', uploadError);
        }
      }

      // Remove loading overlay
      if (loadingOverlay.parentNode) {
        document.body.removeChild(loadingOverlay);
      }

      return true;

    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }

  } catch (error) {
    console.log('PDF server unavailable, using browser print:', error.message);

    // Remove loading overlay
    if (loadingOverlay.parentNode) {
      document.body.removeChild(loadingOverlay);
    }

    // Automatically use browser print fallback (no prompt)
    return await generatePDFWithBrowserPrint(cvData, templateStyle, sectionsArray, currentLanguage, isRTL);
  }
};

// Fallback: Generate PDF using browser's print dialog
const generatePDFWithBrowserPrint = async (cvData, templateStyle, sections, language, isRTL) => {
  // Validate cvData
  if (!cvData) {
    throw new Error(isRTL ? 'لا توجد بيانات للتصدير' : 'No data to export');
  }

  const info = cvData.personalInfo || {};
  const sectionsArray = Array.isArray(sections) ? sections : [];
  const templateStyles = getTemplateStyles(templateStyle, isRTL);
  const sectionsHTML = buildSectionsHTML(cvData, sectionsArray, language, isRTL, templateStyle);

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapeHtml(info.fullName) || 'CV'} - Resume</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        @page {
          size: A4;
          margin: 10mm;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          font-family: ${isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif"};
          font-size: 11pt;
          line-height: 1.5;
          color: #1a1a1a;
          background: white;
          direction: ${isRTL ? 'rtl' : 'ltr'};
          text-align: ${isRTL ? 'right' : 'left'};
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .cv-container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 15mm;
        }

        .section, .exp-item, .edu-item, .skill-group {
          page-break-inside: avoid;
          break-inside: avoid;
        }

        h1, h2, h3, h4 {
          page-break-after: avoid;
        }

        ${templateStyles}
      </style>
    </head>
    <body>
      <div class="cv-container">
        ${sectionsHTML}
      </div>
      <script>
        document.fonts.ready.then(() => {
          setTimeout(() => {
            window.print();
            window.onafterprint = () => window.close();
          }, 500);
        });
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=800,height=600');

  if (!printWindow || !printWindow.document) {
    throw new Error(isRTL ? 'يرجى السماح بالنوافذ المنبثقة' : 'Please allow popups');
  }

  try {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } catch (writeError) {
    console.error('Error writing to print window:', writeError);
    throw new Error(isRTL ? 'فشل في إنشاء نافذة الطباعة' : 'Failed to create print window');
  }

  return true;
};

// Get template-specific CSS
const getTemplateStyles = (templateStyle, isRTL) => {
  const baseStyles = `
    .header {
      margin-bottom: 20pt;
      padding-bottom: 15pt;
    }

    .name {
      font-size: 24pt;
      font-weight: 700;
      margin-bottom: 8pt;
    }

    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12pt;
      font-size: 10pt;
      color: #4a5568;
      ${isRTL ? 'flex-direction: row-reverse; justify-content: flex-end;' : ''}
    }

    .section {
      margin-bottom: 18pt;
    }

    .section-title {
      font-size: 13pt;
      font-weight: 600;
      margin-bottom: 10pt;
      padding-bottom: 4pt;
      border-bottom: 2px solid #667eea;
      color: #667eea;
    }

    .item {
      margin-bottom: 12pt;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3pt;
      ${isRTL ? 'flex-direction: row-reverse;' : ''}
    }

    .item-title {
      font-size: 11pt;
      font-weight: 600;
    }

    .item-subtitle {
      font-size: 10pt;
      color: #667eea;
      margin-bottom: 3pt;
    }

    .item-date {
      font-size: 9pt;
      color: #718096;
    }

    .item-description {
      font-size: 10pt;
      color: #4a5568;
      line-height: 1.6;
    }

    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6pt;
      ${isRTL ? 'flex-direction: row-reverse;' : ''}
    }

    .skill-tag {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 4pt 10pt;
      border-radius: 12pt;
      font-size: 9pt;
    }

    .skill-group {
      margin-bottom: 10pt;
    }

    .skill-group-title {
      font-size: 10pt;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 5pt;
    }
  `;

  const templateSpecific = {
    modern: `
      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 25pt;
        margin: -15mm -15mm 20pt -15mm;
        width: calc(100% + 30mm);
      }
      .header .contact-row { color: rgba(255,255,255,0.9); }
      .item {
        padding-${isRTL ? 'right' : 'left'}: 12pt;
        border-${isRTL ? 'right' : 'left'}: 3pt solid #667eea;
      }
    `,
    classic: `
      .header {
        text-align: center;
        border-bottom: 2pt solid #1a1a1a;
      }
      .name { text-transform: uppercase; letter-spacing: 2pt; }
      .section-title {
        color: #1a1a1a;
        border-bottom-color: #1a1a1a;
        text-transform: uppercase;
        letter-spacing: 1pt;
      }
      .contact-row { justify-content: center; }
    `,
    creative: `
      .header {
        background: linear-gradient(180deg, #1a1a2e, #16213e);
        color: white;
        padding: 25pt;
        margin: -15mm -15mm 20pt -15mm;
        width: calc(100% + 30mm);
        text-align: center;
      }
      .header .contact-row { color: rgba(255,255,255,0.8); justify-content: center; }
    `,
    ats: `
      .header {
        text-align: center;
        border-bottom: 1pt solid #000;
      }
      .name { font-size: 20pt; text-transform: uppercase; }
      .section-title {
        color: #000;
        border-bottom: 2pt solid #000;
        text-transform: uppercase;
      }
      .skill-tag {
        background: #f0f0f0;
        color: #000;
        border: 1pt solid #ddd;
      }
    `
  };

  return baseStyles + (templateSpecific[templateStyle] || templateSpecific.modern);
};

// Build HTML for all sections
const buildSectionsHTML = (cvData, sections, language, isRTL, templateStyle) => {
  // Validate inputs
  if (!cvData) return '';
  const sectionsArray = Array.isArray(sections) ? sections : [];
  const info = cvData.personalInfo || {};
  const t = getTranslations(language) || getTranslations('en');

  let html = `
    <div class="header">
      <h1 class="name">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'Your Name')}</h1>
      <div class="contact-row">
        ${info.email ? `<span>${escapeHtml(info.email)}</span>` : ''}
        ${info.phone ? `<span>${escapeHtml(info.phone)}</span>` : ''}
        ${info.location ? `<span>${escapeHtml(info.location)}</span>` : ''}
      </div>
      ${(info.linkedin || info.website) ? `
        <div class="contact-row" style="margin-top: 5pt; font-size: 9pt;">
          ${info.linkedin ? `<span>${info.linkedin}</span>` : ''}
          ${info.website ? `<span>${info.website}</span>` : ''}
        </div>
      ` : ''}
    </div>
  `;

  // Summary
  if (cvData.summary && sectionsArray.includes('summary')) {
    html += `
      <div class="section">
        <h2 class="section-title">${t.summary}</h2>
        <p class="item-description">${escapeHtml(cvData.summary)}</p>
      </div>
    `;
  }

  // Experience
  if (Array.isArray(cvData.experience) && cvData.experience.length > 0 && sectionsArray.includes('experience')) {
    html += `
      <div class="section">
        <h2 class="section-title">${t.experience}</h2>
        ${cvData.experience.map(exp => `
          <div class="item">
            <div class="item-header">
              <span class="item-title">${escapeHtml(exp.jobTitle)}</span>
              <span class="item-date">${escapeHtml(exp.startDate)} - ${exp.current ? t.present : escapeHtml(exp.endDate)}</span>
            </div>
            <div class="item-subtitle">${escapeHtml(exp.company)}</div>
            <p class="item-description">${escapeHtml(exp.description)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Education
  if (Array.isArray(cvData.education) && cvData.education.length > 0 && sectionsArray.includes('education')) {
    html += `
      <div class="section">
        <h2 class="section-title">${t.education}</h2>
        ${cvData.education.map(edu => `
          <div class="item">
            <div class="item-header">
              <span class="item-title">${escapeHtml(edu.degree)}</span>
              <span class="item-date">${escapeHtml(edu.graduationDate)}</span>
            </div>
            <div class="item-subtitle">${escapeHtml(edu.institution)}</div>
            ${edu.honors ? `<p class="item-description" style="font-style: italic;">${escapeHtml(edu.honors)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Skills
  if (cvData.skills && sectionsArray.includes('skills')) {
    const skillsHTML = buildSkillsHTML(cvData.skills, t);
    if (skillsHTML) {
      html += `
        <div class="section">
          <h2 class="section-title">${t.skills}</h2>
          ${skillsHTML}
        </div>
      `;
    }
  }

  // Projects
  if (Array.isArray(cvData.projects) && cvData.projects.length > 0 && sectionsArray.includes('projects')) {
    html += `
      <div class="section">
        <h2 class="section-title">${t.projects}</h2>
        ${cvData.projects.map(project => `
          <div class="item">
            <div class="item-title">${escapeHtml(project.projectName || project.title)}</div>
            <p class="item-description">${escapeHtml(project.description)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Certifications
  if (Array.isArray(cvData.certifications) && cvData.certifications.length > 0 && sectionsArray.includes('certifications')) {
    html += `
      <div class="section">
        <h2 class="section-title">${t.certifications}</h2>
        ${cvData.certifications.map(cert => `
          <div class="item">
            <div class="item-header">
              <span class="item-title">${escapeHtml(cert.certification || cert.title)}</span>
              ${cert.date ? `<span class="item-date">${escapeHtml(cert.date)}</span>` : ''}
            </div>
            ${cert.issuer ? `<div class="item-subtitle">${escapeHtml(cert.issuer)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Achievements
  if (Array.isArray(cvData.achievements) && cvData.achievements.length > 0 && sectionsArray.includes('achievements')) {
    html += `
      <div class="section">
        <h2 class="section-title">${t.achievements}</h2>
        ${cvData.achievements.map(achievement => `
          <div class="item">
            <div class="item-header">
              <span class="item-title">${escapeHtml(achievement.achievement || achievement.title)}</span>
              ${achievement.date ? `<span class="item-date">${escapeHtml(achievement.date)}</span>` : ''}
            </div>
            ${achievement.description ? `<p class="item-description">${escapeHtml(achievement.description)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  return html;
};

// Build skills HTML
const buildSkillsHTML = (skills, t) => {
  if (!skills) return '';

  const items = Array.isArray(skills.items) ? skills.items : [];

  if (items.length > 0) {
    const categories = {};
    items.forEach(skill => {
      if (skill && skill.category && skill.name) {
        if (!categories[skill.category]) categories[skill.category] = [];
        categories[skill.category].push(skill.name);
      }
    });

    const categoryLabels = {
      technical: t.technicalSkills,
      soft: t.softSkills,
      languages: t.languages,
      tools: 'Tools',
      frameworks: 'Frameworks'
    };

    return Object.entries(categories).map(([cat, catSkills]) => `
      <div class="skill-group">
        <div class="skill-group-title">${categoryLabels[cat] || cat}</div>
        <div class="skills-container">
          ${catSkills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Old format fallback
  let html = '';
  const technicalSkills = Array.isArray(skills.technicalSkills) ? skills.technicalSkills.filter(Boolean) : [];
  const softSkills = Array.isArray(skills.softSkills) ? skills.softSkills.filter(Boolean) : [];
  const languages = Array.isArray(skills.languages) ? skills.languages.filter(Boolean) : [];

  if (technicalSkills.length > 0) {
    html += `
      <div class="skill-group">
        <div class="skill-group-title">${t.technicalSkills}</div>
        <div class="skills-container">
          ${technicalSkills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  if (softSkills.length > 0) {
    html += `
      <div class="skill-group">
        <div class="skill-group-title">${t.softSkills}</div>
        <div class="skills-container">
          ${softSkills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  if (languages.length > 0) {
    html += `
      <div class="skill-group">
        <div class="skill-group-title">${t.languages}</div>
        <div class="skills-container">
          ${languages.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  return html;
};

// Translations
const getTranslations = (lang) => ({
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
    present: 'حتى الآن'
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
    present: 'עד היום'
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
    present: 'Present'
  }
}[lang] || {
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
  present: 'Present'
});

// Escape HTML
const escapeHtml = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

// Legacy exports for compatibility
export const exportToPDF = async () => {
  console.warn('exportToPDF is deprecated, use generatePDFFromServer instead');
  return false;
};

export const generatePDFFromData = generatePDFFromServer;

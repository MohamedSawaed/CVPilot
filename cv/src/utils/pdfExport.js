// PDF Export - Multiple fallback methods for PDF generation
// 1. Client-side with jsPDF + html2canvas (works everywhere, no server needed)
// 2. Remote Puppeteer server (best quality, requires deployed server)
// 3. Browser print dialog (fallback)

import { uploadPDF } from '../services/cvService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Use environment variable for PDF server URL, fallback to localhost for dev
const PDF_SERVER_URL = process.env.REACT_APP_PDF_SERVER_URL || 'http://localhost:3001';
const SERVER_TIMEOUT = 30000; // 30 second timeout for PDF generation

// Main PDF generation function - uses client-side generation (works on Vercel)
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
    // Use client-side PDF generation (works on Vercel, no server needed)
    const result = await generatePDFClientSide(cvData, templateStyle, sectionsArray, currentLanguage, isRTL, userId, cvId);

    // Remove loading overlay
    if (loadingOverlay.parentNode) {
      document.body.removeChild(loadingOverlay);
    }

    return result;

  } catch (error) {
    console.error('Client-side PDF generation failed:', error.message);

    // Remove loading overlay
    if (loadingOverlay.parentNode) {
      document.body.removeChild(loadingOverlay);
    }

    // Fallback to browser print
    return await generatePDFWithBrowserPrint(cvData, templateStyle, sectionsArray, currentLanguage, isRTL);
  }
};

// Client-side PDF generation using jsPDF + html2canvas
const generatePDFClientSide = async (cvData, templateStyle, sections, language, isRTL, userId, cvId) => {
  const info = cvData.personalInfo || {};
  const t = getTranslations(language);

  // Create a hidden container for rendering
  const container = document.createElement('div');
  container.id = 'pdf-render-container';
  container.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: 794px;
    background: white;
    font-family: ${isRTL ? "'Cairo', 'Segoe UI', sans-serif" : "'Inter', 'Segoe UI', sans-serif"};
    direction: ${isRTL ? 'rtl' : 'ltr'};
  `;

  // Build HTML content
  container.innerHTML = buildPDFHTML(cvData, sections, language, isRTL, templateStyle, t);
  document.body.appendChild(container);

  // Wait for fonts to load
  await document.fonts.ready;
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `${info.fullName || 'CV'}_${templateStyle}.pdf`;

    // Get PDF as blob for Firebase upload
    const pdfBlob = pdf.output('blob');

    // Download the PDF
    pdf.save(fileName);

    // Upload to Firebase Storage if userId and cvId are provided
    if (userId && cvId) {
      console.log('Uploading PDF to Firebase Storage...', { userId, cvId, fileName, blobSize: pdfBlob.size });
      try {
        const { url, error } = await uploadPDF(userId, cvId, pdfBlob, fileName);
        if (error) {
          console.error('PDF upload failed:', error);
          alert('PDF downloaded but failed to save to cloud: ' + error);
        } else {
          console.log('PDF saved to Firebase Storage:', url);
        }
      } catch (uploadError) {
        console.error('PDF upload error:', uploadError);
        alert('PDF downloaded but upload error: ' + uploadError.message);
      }
    } else {
      console.warn('Skipping Firebase upload - missing userId or cvId:', { userId, cvId });
    }

    return true;

  } finally {
    // Clean up
    if (container.parentNode) {
      document.body.removeChild(container);
    }
  }
};

// Build HTML for PDF rendering
const buildPDFHTML = (cvData, sections, language, isRTL, templateStyle, t) => {
  const info = cvData.personalInfo || {};
  const colors = getTemplateColors(templateStyle);

  // Determine header styles based on template
  const headerBorderStyle = colors.headerBorder ? `border-bottom: ${colors.headerBorder};` : '';
  const headerLeftBorder = templateStyle === 'minimal' ? `border-left: ${colors.headerBorder};` : '';
  const nameColor = colors.nameColor || colors.headerText;
  const textAlign = 'text-align: center;';
  const fontFamily = colors.fontFamily || 'inherit';

  let html = `
    <div style="padding: 40px; color: #1a1a1a; line-height: 1.6;">
      <!-- Header -->
      <div style="background: ${colors.headerBg}; color: ${colors.headerText}; padding: 30px; margin: -40px -40px 30px -40px; ${headerBorderStyle} ${headerLeftBorder} ${textAlign}">
        <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 10px 0; color: ${nameColor}; font-family: ${fontFamily};">${escapeHtml(info.fullName) || (isRTL ? 'اسمك' : 'Your Name')}</h1>
        <div style="font-size: 13px; opacity: 0.9; display: flex; flex-direction: column; align-items: center; gap: 4px;">
          ${info.email ? `<span>${escapeHtml(info.email)}</span>` : ''}
          ${info.phone ? `<span>${escapeHtml(info.phone)}</span>` : ''}
          ${info.location ? `<span>${escapeHtml(info.location)}</span>` : ''}
          ${info.linkedin ? `<span style="font-size: 12px; opacity: 0.9;">${info.linkedin}</span>` : ''}
          ${info.website ? `<span style="font-size: 12px; opacity: 0.9;">${info.website}</span>` : ''}
        </div>
      </div>
  `;

  // Summary
  if (cvData.summary && sections.includes('summary')) {
    html += `
      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 16px; font-weight: 600; color: ${colors.accent}; border-bottom: 2px solid ${colors.accent}; padding-bottom: 5px; margin-bottom: 12px;">${t.summary}</h2>
        <p style="font-size: 13px; color: #4a5568; margin: 0;">${escapeHtml(cvData.summary)}</p>
      </div>
    `;
  }

  // Experience
  if (Array.isArray(cvData.experience) && cvData.experience.length > 0 && sections.includes('experience')) {
    html += `
      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 16px; font-weight: 600; color: ${colors.accent}; border-bottom: 2px solid ${colors.accent}; padding-bottom: 5px; margin-bottom: 12px;">${t.experience}</h2>
        ${cvData.experience.map(exp => `
          <div style="margin-bottom: 15px; padding-${isRTL ? 'right' : 'left'}: 12px; border-${isRTL ? 'right' : 'left'}: 3px solid ${colors.accent};">
            <div style="display: flex; justify-content: space-between; ${isRTL ? 'direction: rtl;' : ''}">
              <span style="font-size: 14px; font-weight: 600; ${isRTL ? 'text-align: right;' : ''}">${escapeHtml(exp.jobTitle)}</span>
              <span style="font-size: 12px; color: #718096; ${isRTL ? 'text-align: left;' : ''}">${escapeHtml(exp.startDate)} - ${exp.current ? t.present : escapeHtml(exp.endDate)}</span>
            </div>
            <div style="font-size: 13px; color: ${colors.accent}; margin: 3px 0;">${escapeHtml(exp.company)}</div>
            ${formatDescriptionAsBullets(exp.description, isRTL)}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Education
  if (Array.isArray(cvData.education) && cvData.education.length > 0 && sections.includes('education')) {
    html += `
      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 16px; font-weight: 600; color: ${colors.accent}; border-bottom: 2px solid ${colors.accent}; padding-bottom: 5px; margin-bottom: 12px;">${t.education}</h2>
        ${cvData.education.map(edu => `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; ${isRTL ? 'direction: rtl;' : ''}">
              <span style="font-size: 14px; font-weight: 600; ${isRTL ? 'text-align: right;' : ''}">${escapeHtml(edu.degree)}</span>
              <span style="font-size: 12px; color: #718096; ${isRTL ? 'text-align: left;' : ''}">${escapeHtml(edu.graduationDate)}</span>
            </div>
            <div style="font-size: 13px; color: ${colors.accent};">${escapeHtml(edu.institution)}</div>
            ${edu.honors ? `<p style="font-size: 12px; color: #4a5568; font-style: italic; margin: 3px 0 0 0;">${escapeHtml(edu.honors)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Skills
  if (cvData.skills && sections.includes('skills')) {
    const skillsHTML = buildSkillsForPDF(cvData.skills, t, colors, isRTL);
    if (skillsHTML) {
      html += `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 16px; font-weight: 600; color: ${colors.accent}; border-bottom: 2px solid ${colors.accent}; padding-bottom: 5px; margin-bottom: 12px;">${t.skills}</h2>
          ${skillsHTML}
        </div>
      `;
    }
  }

  // Projects
  if (Array.isArray(cvData.projects) && cvData.projects.length > 0 && sections.includes('projects')) {
    html += `
      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 16px; font-weight: 600; color: ${colors.accent}; border-bottom: 2px solid ${colors.accent}; padding-bottom: 5px; margin-bottom: 12px;">${t.projects}</h2>
        ${cvData.projects.map(project => `
          <div style="margin-bottom: 12px;">
            <div style="font-size: 14px; font-weight: 600;">${escapeHtml(project.projectName || project.title)}</div>
            <p style="font-size: 12px; color: #4a5568; margin: 3px 0 0 0;">${escapeHtml(project.description)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Certifications
  if (Array.isArray(cvData.certifications) && cvData.certifications.length > 0 && sections.includes('certifications')) {
    html += `
      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 16px; font-weight: 600; color: ${colors.accent}; border-bottom: 2px solid ${colors.accent}; padding-bottom: 5px; margin-bottom: 12px;">${t.certifications}</h2>
        ${cvData.certifications.map(cert => `
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; ${isRTL ? 'direction: rtl;' : ''}">
              <span style="font-size: 13px; font-weight: 600; ${isRTL ? 'text-align: right;' : ''}">${escapeHtml(cert.certification || cert.title)}</span>
              ${cert.date ? `<span style="font-size: 12px; color: #718096; ${isRTL ? 'text-align: left;' : ''}">${escapeHtml(cert.date)}</span>` : ''}
            </div>
            ${cert.issuer ? `<div style="font-size: 12px; color: ${colors.accent};">${escapeHtml(cert.issuer)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Achievements
  if (Array.isArray(cvData.achievements) && cvData.achievements.length > 0 && sections.includes('achievements')) {
    html += `
      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 16px; font-weight: 600; color: ${colors.accent}; border-bottom: 2px solid ${colors.accent}; padding-bottom: 5px; margin-bottom: 12px;">${t.achievements}</h2>
        ${cvData.achievements.map(achievement => `
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; ${isRTL ? 'direction: rtl;' : ''}">
              <span style="font-size: 13px; font-weight: 600; ${isRTL ? 'text-align: right;' : ''}">${escapeHtml(achievement.achievement || achievement.title)}</span>
              ${achievement.date ? `<span style="font-size: 12px; color: #718096; ${isRTL ? 'text-align: left;' : ''}">${escapeHtml(achievement.date)}</span>` : ''}
            </div>
            ${achievement.description ? `<p style="font-size: 12px; color: #4a5568; margin: 3px 0 0 0;">${escapeHtml(achievement.description)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  html += '</div>';
  return html;
};

// Get template colors - matches CVBuilderPro.css template styles
const getTemplateColors = (templateStyle) => {
  const templates = {
    // Popular templates
    modern: { headerBg: '#1a1a1a', headerText: '#ffffff', accent: '#1a1a1a', skillBg: '#1a1a1a', skillText: '#ffffff' },
    classic: { headerBg: '#ffffff', headerText: '#000000', accent: '#000000', skillBg: '#f0f0f0', skillText: '#000000', headerBorder: '3px solid #000' },
    bold: { headerBg: '#000000', headerText: '#ffffff', accent: '#000000', skillBg: '#000000', skillText: '#ffffff' },
    minimal: { headerBg: '#fafafa', headerText: '#000000', accent: '#000000', skillBg: 'transparent', skillText: '#000000', skillBorder: '2px solid #000', headerBorder: '6px solid #000' },

    // Premium templates
    elegant: { headerBg: '#2d2d2d', headerText: '#ffffff', accent: '#333333', skillBg: '#f8f8f8', skillText: '#333333', skillBorder: '1px solid #e0e0e0' },
    creative: { headerBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', headerText: '#ffffff', accent: '#667eea', skillBg: 'linear-gradient(135deg, #667eea, #764ba2)', skillText: '#ffffff' },
    executive: { headerBg: '#1e3a5f', headerText: '#ffffff', accent: '#1e3a5f', skillBg: '#1e3a5f', skillText: '#d4af37', nameColor: '#d4af37', accentBorder: '#d4af37' },
    tech: { headerBg: '#0f172a', headerText: '#22d3ee', accent: '#0f172a', skillBg: '#0f172a', skillText: '#22d3ee', nameColor: '#22d3ee', fontFamily: "'SF Mono', 'Fira Code', monospace" },

    // Professional templates
    corporate: { headerBg: '#374151', headerText: '#ffffff', accent: '#374151', skillBg: '#374151', skillText: '#ffffff' },
    startup: { headerBg: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', headerText: '#ffffff', accent: '#7c3aed', skillBg: 'linear-gradient(135deg, #7c3aed, #a855f7)', skillText: '#ffffff' },
    academic: { headerBg: '#1e40af', headerText: '#ffffff', accent: '#1e40af', skillBg: '#1e40af', skillText: '#ffffff' },

    // Creative templates
    designer: { headerBg: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', headerText: '#ffffff', accent: '#ec4899', skillBg: 'linear-gradient(135deg, #ec4899, #f43f5e)', skillText: '#ffffff' }
  };
  return templates[templateStyle] || templates.modern;
};

// Build skills HTML for PDF
const buildSkillsForPDF = (skills, t, colors, isRTL) => {
  if (!skills) return '';

  // Helper to render skills as bullet points
  // For RTL: use manual bullet character on the right side
  // For LTR: use standard ul/li
  const renderSkillsBullets = (skillList, category) => {
    if (!skillList || skillList.length === 0) return '';

    const skillsContent = isRTL
      ? `<div style="margin: 0; direction: rtl; text-align: right;">
          ${skillList.map(s => `<div style="font-size: 11px; color: #4a5568; margin-bottom: 2px; padding-right: 5px;">• ${escapeHtml(s)}</div>`).join('')}
        </div>`
      : `<ul style="margin: 0; padding-left: 18px; list-style-type: disc;">
          ${skillList.map(s => `<li style="font-size: 11px; color: #4a5568; margin-bottom: 2px;">${escapeHtml(s)}</li>`).join('')}
        </ul>`;

    return `
      <div style="margin-bottom: 10px;">
        <div style="font-size: 12px; font-weight: 600; color: #4a5568; margin-bottom: 4px; ${isRTL ? 'text-align: right;' : ''}">${category}</div>
        ${skillsContent}
      </div>
    `;
  };

  // Handle array of strings (simple skills)
  if (Array.isArray(skills)) {
    if (skills.length === 0) return '';

    if (isRTL) {
      return `<div style="margin: 0; direction: rtl; text-align: right;">
        ${skills.map(skill => `<div style="font-size: 11px; color: #4a5568; margin-bottom: 2px; padding-right: 5px;">• ${escapeHtml(skill)}</div>`).join('')}
      </div>`;
    }

    return `
      <ul style="margin: 0; padding-left: 18px; list-style-type: disc;">
        ${skills.map(skill => `<li style="font-size: 11px; color: #4a5568; margin-bottom: 2px;">${escapeHtml(skill)}</li>`).join('')}
      </ul>
    `;
  }

  // Handle object with items array
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

    return Object.entries(categories).map(([cat, catSkills]) =>
      renderSkillsBullets(catSkills, categoryLabels[cat] || cat)
    ).join('');
  }

  // Handle old format with separate arrays
  let html = '';
  const technicalSkills = Array.isArray(skills.technicalSkills) ? skills.technicalSkills.filter(Boolean) : [];
  const softSkills = Array.isArray(skills.softSkills) ? skills.softSkills.filter(Boolean) : [];
  const languages = Array.isArray(skills.languages) ? skills.languages.filter(Boolean) : [];

  html += renderSkillsBullets(technicalSkills, t.technicalSkills);
  html += renderSkillsBullets(softSkills, t.softSkills);
  html += renderSkillsBullets(languages, t.languages);

  return html;
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
      text-align: center;
    }

    .name {
      font-size: 24pt;
      font-weight: 700;
      margin-bottom: 8pt;
      text-align: center;
    }

    .contact-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4pt;
      font-size: 10pt;
      color: #4a5568;
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
      ${isRTL ? 'direction: rtl;' : ''}
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
      .header .contact-row { color: rgba(255,255,255,0.8); }
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
        ${info.linkedin ? `<span style="font-size: 9pt;">${info.linkedin}</span>` : ''}
        ${info.website ? `<span style="font-size: 9pt;">${info.website}</span>` : ''}
      </div>
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
            ${formatDescriptionAsBullets(exp.description, isRTL)}
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

// Format description as bullet points
// Splits text by newlines and renders each line as a bullet point
// For RTL languages, manually prepends bullet character on the right side
const formatDescriptionAsBullets = (text, isRTL = false) => {
  if (!text) return '';

  // Split by newlines and filter empty lines
  const lines = String(text).split('\n').filter(line => line.trim());

  if (lines.length === 0) return '';

  // For RTL: use manual bullet character on the right side (no ul/li which doesn't work properly)
  // For LTR: use standard ul/li with bullets on left
  if (isRTL) {
    return `<div style="margin: 5px 0 0 0; direction: rtl; text-align: right;">
      ${lines.map(line => {
        const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
        return `<div style="font-size: 12px; color: #4a5568; margin-bottom: 3px; line-height: 1.4; padding-right: 5px;">• ${escapeHtml(cleanLine)}</div>`;
      }).join('')}
    </div>`;
  }

  return `<ul style="margin: 5px 0 0 0; padding-left: 18px; list-style-type: disc;">
    ${lines.map(line => {
      const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
      return `<li style="font-size: 12px; color: #4a5568; margin-bottom: 3px; line-height: 1.4;">${escapeHtml(cleanLine)}</li>`;
    }).join('')}
  </ul>`;
};

// Legacy exports for compatibility
export const exportToPDF = async () => {
  console.warn('exportToPDF is deprecated, use generatePDFFromServer instead');
  return false;
};

export const generatePDFFromData = generatePDFFromServer;

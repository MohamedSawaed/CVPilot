import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { storage } from '../utils/storage';
import { generatePDFFromServer } from '../utils/pdfExport';
import {
  FaArrowLeft, FaUser, FaBriefcase, FaGraduationCap, FaTools,
  FaLanguage, FaCertificate, FaPlus, FaTrash, FaChevronDown,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe,
  FaDownload, FaCheck, FaPalette, FaTimes, FaEye, FaFileAlt
} from 'react-icons/fa';
import './CVBuilderPro.css';

const CVBuilderPro = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language, isRTL } = useLanguage();

  const emptyCV = {
    personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', website: '' },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certificates: []
  };

  const [cvData, setCvData] = useState(emptyCV);

  const [activeSection, setActiveSection] = useState('personal');
  const [saveStatus, setSaveStatus] = useState('saved');
  const [templateStyle, setTemplateStyle] = useState('modern');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    const isNewResume = searchParams.get('new') === 'true';

    if (isNewResume) {
      // Clear storage and start fresh
      storage.clear();
      setCvData(emptyCV);
      setTemplateStyle('modern');
      localStorage.removeItem('cv-template');
    } else {
      // Load saved data if exists
      const savedData = storage.load();
      if (savedData?.cvData) {
        setCvData(prev => ({ ...prev, ...savedData.cvData }));
      }
      const savedTemplate = localStorage.getItem('cv-template');
      if (savedTemplate) setTemplateStyle(savedTemplate);
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      storage.autoSave(cvData, null, null);
      localStorage.setItem('cv-template', templateStyle);
      setSaveStatus('saved');
    }, 1000);
    return () => clearTimeout(timer);
  }, [cvData, templateStyle]);

  const t = {
    en: {
      back: 'Back',
      saved: 'Saved',
      saving: 'Saving...',
      personal: 'Personal Info',
      summary: 'Summary',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      certificates: 'Certificates',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      linkedin: 'LinkedIn',
      website: 'Website',
      jobTitle: 'Job Title',
      company: 'Company',
      startDate: 'Start',
      endDate: 'End',
      current: 'Current',
      present: 'Present',
      description: 'Description',
      degree: 'Degree',
      school: 'School',
      field: 'Field',
      year: 'Year',
      add: 'Add',
      download: 'Download PDF',
      templates: 'Templates',
      preview: 'Preview'
    },
    he: {
      back: 'חזור',
      saved: 'נשמר',
      saving: 'שומר...',
      personal: 'פרטים אישיים',
      summary: 'תקציר',
      experience: 'ניסיון',
      education: 'השכלה',
      skills: 'כישורים',
      languages: 'שפות',
      certificates: 'הסמכות',
      fullName: 'שם מלא',
      email: 'אימייל',
      phone: 'טלפון',
      location: 'מיקום',
      linkedin: 'לינקדאין',
      website: 'אתר',
      jobTitle: 'תפקיד',
      company: 'חברה',
      startDate: 'התחלה',
      endDate: 'סיום',
      current: 'נוכחי',
      present: 'עד היום',
      description: 'תיאור',
      degree: 'תואר',
      school: 'מוסד',
      field: 'תחום',
      year: 'שנה',
      add: 'הוסף',
      download: 'הורד PDF',
      templates: 'תבניות',
      preview: 'תצוגה'
    },
    ar: {
      back: 'رجوع',
      saved: 'تم الحفظ',
      saving: 'جاري الحفظ...',
      personal: 'معلومات شخصية',
      summary: 'الملخص',
      experience: 'الخبرة',
      education: 'التعليم',
      skills: 'المهارات',
      languages: 'اللغات',
      certificates: 'الشهادات',
      fullName: 'الاسم',
      email: 'البريد',
      phone: 'الهاتف',
      location: 'الموقع',
      linkedin: 'لينكد إن',
      website: 'الموقع',
      jobTitle: 'المسمى',
      company: 'الشركة',
      startDate: 'البداية',
      endDate: 'النهاية',
      current: 'حالي',
      present: 'حتى الآن',
      description: 'الوصف',
      degree: 'الدرجة',
      school: 'المؤسسة',
      field: 'التخصص',
      year: 'السنة',
      add: 'إضافة',
      download: 'تحميل PDF',
      templates: 'القوالب',
      preview: 'معاينة'
    }
  }[language] || {
    back: 'Back', saved: 'Saved', saving: 'Saving...', personal: 'Personal Info',
    summary: 'Summary', experience: 'Experience', education: 'Education',
    skills: 'Skills', languages: 'Languages', certificates: 'Certificates',
    fullName: 'Full Name', email: 'Email', phone: 'Phone', location: 'Location',
    linkedin: 'LinkedIn', website: 'Website', jobTitle: 'Job Title', company: 'Company',
    startDate: 'Start', endDate: 'End', current: 'Current', present: 'Present',
    description: 'Description', degree: 'Degree', school: 'School', field: 'Field',
    year: 'Year', add: 'Add', download: 'Download PDF', templates: 'Templates', preview: 'Preview'
  };

  const updatePersonal = (field, value) => {
    setCvData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
    setSaveStatus('saving');
  };

  const updateSummary = (value) => {
    setCvData(prev => ({ ...prev, summary: value }));
    setSaveStatus('saving');
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), title: '', company: '', startDate: '', endDate: '', current: false, description: '' }]
    }));
  };

  const updateExperience = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
    setSaveStatus('saving');
  };

  const deleteExperience = (id) => {
    setCvData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), degree: '', school: '', field: '', year: '' }]
    }));
  };

  const updateEducation = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
    setSaveStatus('saving');
  };

  const deleteEducation = (id) => {
    setCvData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };

  const updateSkills = (value) => {
    setCvData(prev => ({ ...prev, skills: value.split(',').map(s => s.trim()).filter(s => s) }));
    setSaveStatus('saving');
  };

  const addLanguage = () => {
    setCvData(prev => ({
      ...prev,
      languages: [...(prev.languages || []), { id: Date.now(), name: '', level: '' }]
    }));
  };

  const updateLanguageItem = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => lang.id === id ? { ...lang, [field]: value } : lang)
    }));
    setSaveStatus('saving');
  };

  const deleteLanguage = (id) => {
    setCvData(prev => ({ ...prev, languages: prev.languages.filter(lang => lang.id !== id) }));
  };

  const addCertificate = () => {
    setCvData(prev => ({
      ...prev,
      certificates: [...(prev.certificates || []), { id: Date.now(), name: '', issuer: '', year: '' }]
    }));
  };

  const updateCertificate = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.map(cert => cert.id === id ? { ...cert, [field]: value } : cert)
    }));
    setSaveStatus('saving');
  };

  const deleteCertificate = (id) => {
    setCvData(prev => ({ ...prev, certificates: prev.certificates.filter(cert => cert.id !== id) }));
  };

  const handleDownload = async () => {
    // Map cvData to the format expected by PDF generator
    const pdfData = {
      personalInfo: cvData.personalInfo,
      summary: cvData.summary,
      experience: cvData.experience?.map(exp => ({
        ...exp,
        jobTitle: exp.title,
        startDate: exp.startDate,
        endDate: exp.endDate,
        company: exp.company,
        description: exp.description,
        current: exp.current
      })),
      education: cvData.education?.map(edu => ({
        ...edu,
        degree: edu.degree,
        institution: edu.school,
        graduationDate: edu.year,
        honors: edu.field
      })),
      skills: cvData.skills,
      languages: cvData.languages,
      certifications: cvData.certificates?.map(cert => ({
        certification: cert.name,
        issuer: cert.issuer,
        date: cert.year
      }))
    };

    // Include all sections that have data
    const sectionsToInclude = ['summary', 'experience', 'education', 'skills', 'certifications'];

    await generatePDFFromServer(pdfData, templateStyle, sectionsToInclude, language);
  };

  const sections = [
    { id: 'personal', icon: FaUser, label: t.personal },
    { id: 'summary', icon: FaFileAlt, label: t.summary },
    { id: 'experience', icon: FaBriefcase, label: t.experience },
    { id: 'education', icon: FaGraduationCap, label: t.education },
    { id: 'skills', icon: FaTools, label: t.skills },
    { id: 'languages', icon: FaLanguage, label: t.languages },
    { id: 'certificates', icon: FaCertificate, label: t.certificates }
  ];

  const templates = [
    { id: 'modern', name: 'Modern', desc: 'Clean & Professional', category: 'popular', color: '#1a1a1a' },
    { id: 'classic', name: 'Classic', desc: 'Traditional Style', category: 'popular', color: '#fff' },
    { id: 'bold', name: 'Bold', desc: 'Make a Statement', category: 'popular', color: '#000' },
    { id: 'elegant', name: 'Elegant', desc: 'Sophisticated Look', category: 'premium', color: '#2d2d2d' },
    { id: 'minimal', name: 'Minimal', desc: 'Less is More', category: 'popular', color: '#fafafa' },
    { id: 'creative', name: 'Creative', desc: 'Stand Out', category: 'premium', color: '#667eea' },
    { id: 'executive', name: 'Executive', desc: 'Senior Level', category: 'premium', color: '#1e3a5f' },
    { id: 'tech', name: 'Tech', desc: 'For Developers', category: 'premium', color: '#0f172a' },
    { id: 'corporate', name: 'Corporate', desc: 'Business Ready', category: 'professional', color: '#374151' },
    { id: 'startup', name: 'Startup', desc: 'Modern & Fresh', category: 'professional', color: '#7c3aed' },
    { id: 'academic', name: 'Academic', desc: 'For Researchers', category: 'professional', color: '#1e40af' },
    { id: 'designer', name: 'Designer', desc: 'Creative Fields', category: 'creative', color: '#ec4899' }
  ];

  return (
    <div className={`cvb ${isRTL ? 'rtl' : ''}`}>
      {/* MOBILE HEADER */}
      <div className="cvb-mobile-header">
        <button className="cvb-mobile-back" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft /> Back
        </button>
        <div className="cvb-mobile-actions">
          <button className="cvb-mobile-preview-btn" onClick={() => setShowMobilePreview(true)}>
            <FaEye />
          </button>
          <button className="cvb-mobile-template-btn" onClick={() => setShowTemplates(true)}>
            <FaPalette />
          </button>
          <button className="cvb-mobile-download-btn" onClick={handleDownload}>
            <FaDownload /> PDF
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="cvb-mobile-nav">
        {sections.map(sec => (
          <button
            key={sec.id}
            className={`cvb-mobile-nav-item ${activeSection === sec.id ? 'active' : ''}`}
            onClick={() => setActiveSection(sec.id)}
          >
            <sec.icon />
            <span>{sec.label}</span>
          </button>
        ))}
      </nav>

      {/* SIDEBAR */}
      <aside className="cvb-sidebar">
        <div className="cvb-logo" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft />
          <span>CV Builder</span>
        </div>

        <nav className="cvb-nav">
          {sections.map(sec => (
            <button
              key={sec.id}
              className={`cvb-nav-item ${activeSection === sec.id ? 'active' : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              <sec.icon />
              <span>{sec.label}</span>
            </button>
          ))}
        </nav>

        <div className="cvb-sidebar-footer">
          <div className={`cvb-save-status ${saveStatus}`}>
            <FaCheck />
            <span>{saveStatus === 'saved' ? t.saved : t.saving}</span>
          </div>
        </div>
      </aside>

      {/* FORM PANEL */}
      <main className="cvb-form">
        <div className="cvb-form-inner">
          {activeSection === 'personal' && (
            <div className="cvb-section">
              <h2>{t.personal}</h2>
              <div className="cvb-grid">
                <div className="cvb-field">
                  <label>{t.fullName}</label>
                  <input value={cvData.personalInfo?.fullName || ''} onChange={e => updatePersonal('fullName', e.target.value)} />
                </div>
                <div className="cvb-field">
                  <label>{t.email}</label>
                  <input type="email" value={cvData.personalInfo?.email || ''} onChange={e => updatePersonal('email', e.target.value)} />
                </div>
                <div className="cvb-field">
                  <label>{t.phone}</label>
                  <input value={cvData.personalInfo?.phone || ''} onChange={e => updatePersonal('phone', e.target.value)} />
                </div>
                <div className="cvb-field">
                  <label>{t.location}</label>
                  <input value={cvData.personalInfo?.location || ''} onChange={e => updatePersonal('location', e.target.value)} />
                </div>
                <div className="cvb-field">
                  <label>{t.linkedin}</label>
                  <input value={cvData.personalInfo?.linkedin || ''} onChange={e => updatePersonal('linkedin', e.target.value)} />
                </div>
                <div className="cvb-field">
                  <label>{t.website}</label>
                  <input value={cvData.personalInfo?.website || ''} onChange={e => updatePersonal('website', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'summary' && (
            <div className="cvb-section">
              <h2>{t.summary}</h2>
              <textarea
                className="cvb-textarea"
                value={cvData.summary || ''}
                onChange={e => updateSummary(e.target.value)}
                placeholder="Write a brief professional summary..."
                rows={6}
              />
            </div>
          )}

          {activeSection === 'experience' && (
            <div className="cvb-section">
              <h2>{t.experience}</h2>
              {cvData.experience?.map((exp, idx) => (
                <div key={exp.id} className="cvb-card">
                  <div className="cvb-card-header">
                    <span className="cvb-card-num">{idx + 1}</span>
                    <button className="cvb-delete" onClick={() => deleteExperience(exp.id)}><FaTrash /></button>
                  </div>
                  <div className="cvb-grid">
                    <div className="cvb-field">
                      <label>{t.jobTitle}</label>
                      <input value={exp.title || ''} onChange={e => updateExperience(exp.id, 'title', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>{t.company}</label>
                      <input value={exp.company || ''} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>{t.startDate}</label>
                      <input value={exp.startDate || ''} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2020" />
                    </div>
                    <div className="cvb-field">
                      <label>{t.endDate}</label>
                      <input value={exp.endDate || ''} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Present" disabled={exp.current} />
                    </div>
                    <div className="cvb-field full">
                      <label className="cvb-checkbox">
                        <input type="checkbox" checked={exp.current || false} onChange={e => updateExperience(exp.id, 'current', e.target.checked)} />
                        <span>{t.current}</span>
                      </label>
                    </div>
                    <div className="cvb-field full">
                      <label>{t.description}</label>
                      <textarea value={exp.description || ''} onChange={e => updateExperience(exp.id, 'description', e.target.value)} rows={3} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="cvb-add" onClick={addExperience}><FaPlus /> {t.add}</button>
            </div>
          )}

          {activeSection === 'education' && (
            <div className="cvb-section">
              <h2>{t.education}</h2>
              {cvData.education?.map((edu, idx) => (
                <div key={edu.id} className="cvb-card">
                  <div className="cvb-card-header">
                    <span className="cvb-card-num">{idx + 1}</span>
                    <button className="cvb-delete" onClick={() => deleteEducation(edu.id)}><FaTrash /></button>
                  </div>
                  <div className="cvb-grid">
                    <div className="cvb-field">
                      <label>{t.degree}</label>
                      <input value={edu.degree || ''} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>{t.school}</label>
                      <input value={edu.school || ''} onChange={e => updateEducation(edu.id, 'school', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>{t.field}</label>
                      <input value={edu.field || ''} onChange={e => updateEducation(edu.id, 'field', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>{t.year}</label>
                      <input value={edu.year || ''} onChange={e => updateEducation(edu.id, 'year', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="cvb-add" onClick={addEducation}><FaPlus /> {t.add}</button>
            </div>
          )}

          {activeSection === 'skills' && (
            <div className="cvb-section">
              <h2>{t.skills}</h2>
              <textarea
                className="cvb-textarea"
                value={Array.isArray(cvData.skills) ? cvData.skills.join(', ') : (cvData.skills || '')}
                onChange={e => updateSkills(e.target.value)}
                placeholder="JavaScript, React, Node.js, Python..."
                rows={4}
              />
              <p className="cvb-hint">Separate skills with commas</p>
            </div>
          )}

          {activeSection === 'languages' && (
            <div className="cvb-section">
              <h2>{t.languages}</h2>
              {cvData.languages?.map((lang, idx) => (
                <div key={lang.id} className="cvb-row">
                  <input value={lang.name || ''} onChange={e => updateLanguageItem(lang.id, 'name', e.target.value)} placeholder="Language" />
                  <select value={lang.level || ''} onChange={e => updateLanguageItem(lang.id, 'level', e.target.value)}>
                    <option value="">Level</option>
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                  <button className="cvb-delete-sm" onClick={() => deleteLanguage(lang.id)}><FaTrash /></button>
                </div>
              ))}
              <button className="cvb-add" onClick={addLanguage}><FaPlus /> {t.add}</button>
            </div>
          )}

          {activeSection === 'certificates' && (
            <div className="cvb-section">
              <h2>{t.certificates}</h2>
              {cvData.certificates?.map((cert, idx) => (
                <div key={cert.id} className="cvb-card">
                  <div className="cvb-card-header">
                    <span className="cvb-card-num">{idx + 1}</span>
                    <button className="cvb-delete" onClick={() => deleteCertificate(cert.id)}><FaTrash /></button>
                  </div>
                  <div className="cvb-grid">
                    <div className="cvb-field">
                      <label>Name</label>
                      <input value={cert.name || ''} onChange={e => updateCertificate(cert.id, 'name', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>Issuer</label>
                      <input value={cert.issuer || ''} onChange={e => updateCertificate(cert.id, 'issuer', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>{t.year}</label>
                      <input value={cert.year || ''} onChange={e => updateCertificate(cert.id, 'year', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="cvb-add" onClick={addCertificate}><FaPlus /> {t.add}</button>
            </div>
          )}
        </div>
      </main>

      {/* PREVIEW PANEL */}
      <section className="cvb-preview-panel">
        <div className="cvb-preview-toolbar">
          <button className={`cvb-template-btn ${showTemplates ? 'active' : ''}`} onClick={() => setShowTemplates(!showTemplates)}>
            <FaPalette /> {t.templates}
          </button>
          <button className="cvb-download-btn" onClick={handleDownload}>
            <FaDownload /> {t.download}
          </button>
        </div>

        {showTemplates && (
          <div className="cvb-template-catalog">
            <div className="cvb-catalog-header">
              <h2>Choose Your Template</h2>
              <p>Select a professional template that fits your style</p>
              <button className="cvb-catalog-close" onClick={() => setShowTemplates(false)}><FaTimes /></button>
            </div>

            <div className="cvb-catalog-section">
              <h3><span className="cvb-badge popular">Popular</span> Most Used Templates</h3>
              <div className="cvb-catalog-grid">
                {templates.filter(t => t.category === 'popular').map(temp => (
                  <button
                    key={temp.id}
                    className={`cvb-catalog-item ${templateStyle === temp.id ? 'active' : ''}`}
                    onClick={() => { setTemplateStyle(temp.id); setShowTemplates(false); }}
                  >
                    <div className={`cvb-catalog-preview ${temp.id}`}>
                      <div className="cvb-preview-header" style={{ background: temp.color === '#fff' ? '#000' : temp.color }}></div>
                      <div className="cvb-preview-lines">
                        <div className="line"></div>
                        <div className="line short"></div>
                        <div className="line"></div>
                      </div>
                    </div>
                    <div className="cvb-catalog-info">
                      <span className="cvb-catalog-name">{temp.name}</span>
                      <span className="cvb-catalog-desc">{temp.desc}</span>
                    </div>
                    {templateStyle === temp.id && <div className="cvb-catalog-check"><FaCheck /></div>}
                  </button>
                ))}
              </div>
            </div>

            <div className="cvb-catalog-section">
              <h3><span className="cvb-badge premium">Premium</span> Professional Templates</h3>
              <div className="cvb-catalog-grid">
                {templates.filter(t => t.category === 'premium').map(temp => (
                  <button
                    key={temp.id}
                    className={`cvb-catalog-item ${templateStyle === temp.id ? 'active' : ''}`}
                    onClick={() => { setTemplateStyle(temp.id); setShowTemplates(false); }}
                  >
                    <div className={`cvb-catalog-preview ${temp.id}`}>
                      <div className="cvb-preview-header" style={{ background: temp.color }}></div>
                      <div className="cvb-preview-lines">
                        <div className="line"></div>
                        <div className="line short"></div>
                        <div className="line"></div>
                      </div>
                    </div>
                    <div className="cvb-catalog-info">
                      <span className="cvb-catalog-name">{temp.name}</span>
                      <span className="cvb-catalog-desc">{temp.desc}</span>
                    </div>
                    {templateStyle === temp.id && <div className="cvb-catalog-check"><FaCheck /></div>}
                  </button>
                ))}
              </div>
            </div>

            <div className="cvb-catalog-section">
              <h3><span className="cvb-badge professional">Pro</span> Industry Specific</h3>
              <div className="cvb-catalog-grid">
                {templates.filter(t => t.category === 'professional' || t.category === 'creative').map(temp => (
                  <button
                    key={temp.id}
                    className={`cvb-catalog-item ${templateStyle === temp.id ? 'active' : ''}`}
                    onClick={() => { setTemplateStyle(temp.id); setShowTemplates(false); }}
                  >
                    <div className={`cvb-catalog-preview ${temp.id}`}>
                      <div className="cvb-preview-header" style={{ background: temp.color }}></div>
                      <div className="cvb-preview-lines">
                        <div className="line"></div>
                        <div className="line short"></div>
                        <div className="line"></div>
                      </div>
                    </div>
                    <div className="cvb-catalog-info">
                      <span className="cvb-catalog-name">{temp.name}</span>
                      <span className="cvb-catalog-desc">{temp.desc}</span>
                    </div>
                    {templateStyle === temp.id && <div className="cvb-catalog-check"><FaCheck /></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="cvb-preview-wrapper">
          <div className={`cv-document ${templateStyle}`}>
            <header className="cv-header">
              <h1 className="cv-name">{cvData.personalInfo?.fullName || 'Your Name'}</h1>
              <div className="cv-contact">
                {cvData.personalInfo?.email && <span><FaEnvelope /> {cvData.personalInfo.email}</span>}
                {cvData.personalInfo?.phone && <span><FaPhone /> {cvData.personalInfo.phone}</span>}
                {cvData.personalInfo?.location && <span><FaMapMarkerAlt /> {cvData.personalInfo.location}</span>}
                {cvData.personalInfo?.linkedin && <span><FaLinkedin /> {cvData.personalInfo.linkedin}</span>}
                {cvData.personalInfo?.website && <span><FaGlobe /> {cvData.personalInfo.website}</span>}
              </div>
            </header>

            {cvData.summary && (
              <section className="cv-section">
                <h2>Summary</h2>
                <p>{cvData.summary}</p>
              </section>
            )}

            {cvData.experience?.length > 0 && cvData.experience[0]?.title && (
              <section className="cv-section">
                <h2>Experience</h2>
                {cvData.experience.map(exp => (
                  <div key={exp.id} className="cv-item">
                    <div className="cv-item-header">
                      <div>
                        <h3>{exp.title}</h3>
                        <p className="cv-company">{exp.company}</p>
                      </div>
                      <span className="cv-date">{exp.startDate} - {exp.current ? t.present : exp.endDate}</span>
                    </div>
                    {exp.description && <p className="cv-desc">{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {cvData.education?.length > 0 && cvData.education[0]?.degree && (
              <section className="cv-section">
                <h2>Education</h2>
                {cvData.education.map(edu => (
                  <div key={edu.id} className="cv-item">
                    <div className="cv-item-header">
                      <div>
                        <h3>{edu.degree}</h3>
                        <p className="cv-company">{edu.school}</p>
                      </div>
                      <span className="cv-date">{edu.year}</span>
                    </div>
                    {edu.field && <p className="cv-desc">{edu.field}</p>}
                  </div>
                ))}
              </section>
            )}

            {Array.isArray(cvData.skills) && cvData.skills.length > 0 && (
              <section className="cv-section">
                <h2>Skills</h2>
                <div className="cv-skills">
                  {cvData.skills.map((skill, i) => <span key={i} className="cv-skill">{skill}</span>)}
                </div>
              </section>
            )}

            {cvData.languages?.length > 0 && cvData.languages[0]?.name && (
              <section className="cv-section">
                <h2>Languages</h2>
                <div className="cv-langs">
                  {cvData.languages.map(lang => (
                    <span key={lang.id} className="cv-lang">{lang.name} <em>({lang.level})</em></span>
                  ))}
                </div>
              </section>
            )}

            {cvData.certificates?.length > 0 && cvData.certificates[0]?.name && (
              <section className="cv-section">
                <h2>Certifications</h2>
                {cvData.certificates.map(cert => (
                  <div key={cert.id} className="cv-item">
                    <div className="cv-item-header">
                      <div>
                        <h3>{cert.name}</h3>
                        <p className="cv-company">{cert.issuer}</p>
                      </div>
                      <span className="cv-date">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE PREVIEW */}
      <button className="cvb-mobile-preview" onClick={() => setShowMobilePreview(true)}>
        <FaEye /> {t.preview}
      </button>

      {showMobilePreview && (
        <div className="cvb-mobile-modal">
          <button className="cvb-close-modal" onClick={() => setShowMobilePreview(false)}><FaTimes /></button>
          <div className={`cv-document ${templateStyle}`}>
            <header className="cv-header">
              <h1 className="cv-name">{cvData.personalInfo?.fullName || 'Your Name'}</h1>
              <div className="cv-contact">
                {cvData.personalInfo?.email && <span><FaEnvelope /> {cvData.personalInfo.email}</span>}
                {cvData.personalInfo?.phone && <span><FaPhone /> {cvData.personalInfo.phone}</span>}
                {cvData.personalInfo?.location && <span><FaMapMarkerAlt /> {cvData.personalInfo.location}</span>}
              </div>
              {(cvData.personalInfo?.linkedin || cvData.personalInfo?.website) && (
                <div className="cv-links">
                  {cvData.personalInfo?.linkedin && <span><FaLinkedin /> {cvData.personalInfo.linkedin}</span>}
                  {cvData.personalInfo?.website && <span><FaGlobe /> {cvData.personalInfo.website}</span>}
                </div>
              )}
            </header>

            {cvData.summary && (
              <section className="cv-section">
                <h2>Summary</h2>
                <p>{cvData.summary}</p>
              </section>
            )}

            {cvData.experience?.length > 0 && cvData.experience[0]?.title && (
              <section className="cv-section">
                <h2>Experience</h2>
                {cvData.experience.map(exp => (
                  <div key={exp.id} className="cv-item">
                    <div className="cv-item-header">
                      <div>
                        <h3>{exp.title}</h3>
                        <p className="cv-company">{exp.company}</p>
                      </div>
                      <span className="cv-date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="cv-desc">{exp.description}</p>
                  </div>
                ))}
              </section>
            )}

            {cvData.education?.length > 0 && cvData.education[0]?.degree && (
              <section className="cv-section">
                <h2>Education</h2>
                {cvData.education.map(edu => (
                  <div key={edu.id} className="cv-item">
                    <div className="cv-item-header">
                      <div>
                        <h3>{edu.degree}</h3>
                        <p className="cv-company">{edu.school}</p>
                      </div>
                      <span className="cv-date">{edu.year}</span>
                    </div>
                    {edu.field && <p className="cv-desc">{edu.field}</p>}
                  </div>
                ))}
              </section>
            )}

            {cvData.skills?.length > 0 && (
              <section className="cv-section">
                <h2>Skills</h2>
                <div className="cv-skills">
                  {cvData.skills.map((skill, i) => <span key={i} className="cv-skill">{skill}</span>)}
                </div>
              </section>
            )}

            {cvData.languages?.length > 0 && cvData.languages[0]?.name && (
              <section className="cv-section">
                <h2>Languages</h2>
                <div className="cv-langs">
                  {cvData.languages.map(lang => (
                    <span key={lang.id} className="cv-lang">{lang.name} {lang.level && <em>({lang.level})</em>}</span>
                  ))}
                </div>
              </section>
            )}

            {cvData.certificates?.length > 0 && cvData.certificates[0]?.name && (
              <section className="cv-section">
                <h2>Certifications</h2>
                {cvData.certificates.map(cert => (
                  <div key={cert.id} className="cv-item">
                    <div className="cv-item-header">
                      <div>
                        <h3>{cert.name}</h3>
                        <p className="cv-company">{cert.issuer}</p>
                      </div>
                      <span className="cv-date">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CVBuilderPro;

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCV } from '../contexts/CVContext';
import { useLanguage } from '../contexts/LanguageContext';
import {
  FaArrowLeft, FaUser, FaBriefcase, FaGraduationCap, FaTools,
  FaLanguage, FaCertificate, FaPlus, FaTrash, FaChevronDown,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe,
  FaDownload, FaCheck, FaPalette, FaTimes, FaEye, FaFileAlt
} from 'react-icons/fa';
import { generatePDF } from '../utils/pdfGenerator';
import './CVBuilderPro.css';

const CVBuilderPro = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cvData, setCvData, saveCVToFirebase, templates } = useCV();
  const { language } = useLanguage();

  const isRTL = language === 'he' || language === 'ar';

  // State
  const [activeSection, setActiveSection] = useState('personal');
  const [saveStatus, setSaveStatus] = useState('saved');
  const [templateStyle, setTemplateStyle] = useState(cvData.template || 'modern');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Translations
  const t = {
    en: {
      buildingCV: 'Building your CV',
      untitled: 'Untitled CV',
      saved: 'Saved',
      saving: 'Saving...',
      personal: 'Personal Information',
      personalDesc: 'Your contact details',
      summary: 'Professional Summary',
      summaryDesc: 'Brief overview of your profile',
      experience: 'Work Experience',
      experienceDesc: 'Your employment history',
      education: 'Education',
      educationDesc: 'Academic background',
      skills: 'Skills',
      skillsDesc: 'Your expertise',
      languages: 'Languages',
      languagesDesc: 'Languages you speak',
      certificates: 'Certifications',
      certificatesDesc: 'Professional certifications',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location',
      linkedin: 'LinkedIn URL',
      website: 'Portfolio/Website',
      jobTitle: 'Job Title',
      company: 'Company',
      startDate: 'Start Date',
      endDate: 'End Date',
      current: 'Current',
      present: 'Present',
      description: 'Description',
      degree: 'Degree',
      school: 'School/University',
      field: 'Field of Study',
      year: 'Year',
      skillName: 'Skill',
      languageName: 'Language',
      level: 'Level',
      certName: 'Certification Name',
      issuer: 'Issuing Organization',
      add: 'Add',
      delete: 'Delete',
      download: 'Download PDF',
      templates: 'Templates',
      preview: 'Preview',
      empty: 'Empty',
      complete: 'Complete',
      summaryPlaceholder: 'Write a compelling 2-3 sentence overview of your professional background and career goals...'
    },
    he: {
      buildingCV: 'בניית קורות החיים',
      untitled: 'קורות חיים ללא שם',
      saved: 'נשמר',
      saving: 'שומר...',
      personal: 'פרטים אישיים',
      personalDesc: 'פרטי התקשרות',
      summary: 'תקציר מקצועי',
      summaryDesc: 'סקירה קצרה של הפרופיל שלך',
      experience: 'ניסיון תעסוקתי',
      experienceDesc: 'היסטוריית העסקה',
      education: 'השכלה',
      educationDesc: 'רקע אקדמי',
      skills: 'כישורים',
      skillsDesc: 'המומחיות שלך',
      languages: 'שפות',
      languagesDesc: 'שפות שאתה דובר',
      certificates: 'הסמכות',
      certificatesDesc: 'הסמכות מקצועיות',
      fullName: 'שם מלא',
      email: 'כתובת אימייל',
      phone: 'מספר טלפון',
      location: 'מיקום',
      linkedin: 'קישור לינקדאין',
      website: 'אתר/תיק עבודות',
      jobTitle: 'תפקיד',
      company: 'חברה',
      startDate: 'תאריך התחלה',
      endDate: 'תאריך סיום',
      current: 'נוכחי',
      present: 'עד היום',
      description: 'תיאור',
      degree: 'תואר',
      school: 'מוסד לימודים',
      field: 'תחום לימודים',
      year: 'שנה',
      skillName: 'כישור',
      languageName: 'שפה',
      level: 'רמה',
      certName: 'שם ההסמכה',
      issuer: 'גוף מנפיק',
      add: 'הוסף',
      delete: 'מחק',
      download: 'הורד PDF',
      templates: 'תבניות',
      preview: 'תצוגה מקדימה',
      empty: 'ריק',
      complete: 'הושלם',
      summaryPlaceholder: 'כתוב תקציר של 2-3 משפטים על הרקע המקצועי והמטרות שלך...'
    },
    ar: {
      buildingCV: 'إنشاء سيرتك الذاتية',
      untitled: 'سيرة ذاتية بدون عنوان',
      saved: 'تم الحفظ',
      saving: 'جاري الحفظ...',
      personal: 'المعلومات الشخصية',
      personalDesc: 'بيانات الاتصال',
      summary: 'الملخص المهني',
      summaryDesc: 'نظرة عامة على ملفك',
      experience: 'الخبرة العملية',
      experienceDesc: 'تاريخ التوظيف',
      education: 'التعليم',
      educationDesc: 'الخلفية الأكاديمية',
      skills: 'المهارات',
      skillsDesc: 'خبراتك',
      languages: 'اللغات',
      languagesDesc: 'اللغات التي تتحدثها',
      certificates: 'الشهادات',
      certificatesDesc: 'الشهادات المهنية',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      location: 'الموقع',
      linkedin: 'رابط لينكد إن',
      website: 'الموقع/المحفظة',
      jobTitle: 'المسمى الوظيفي',
      company: 'الشركة',
      startDate: 'تاريخ البدء',
      endDate: 'تاريخ الانتهاء',
      current: 'حالي',
      present: 'حتى الآن',
      description: 'الوصف',
      degree: 'الدرجة',
      school: 'المدرسة/الجامعة',
      field: 'مجال الدراسة',
      year: 'السنة',
      skillName: 'المهارة',
      languageName: 'اللغة',
      level: 'المستوى',
      certName: 'اسم الشهادة',
      issuer: 'الجهة المانحة',
      add: 'إضافة',
      delete: 'حذف',
      download: 'تحميل PDF',
      templates: 'القوالب',
      preview: 'معاينة',
      empty: 'فارغ',
      complete: 'مكتمل',
      summaryPlaceholder: 'اكتب ملخصاً من 2-3 جمل عن خلفيتك المهنية وأهدافك...'
    }
  }[language] || {
    buildingCV: 'Building your CV',
    untitled: 'Untitled CV',
    saved: 'Saved',
    saving: 'Saving...',
    personal: 'Personal Information',
    personalDesc: 'Your contact details',
    summary: 'Professional Summary',
    summaryDesc: 'Brief overview of your profile',
    experience: 'Work Experience',
    experienceDesc: 'Your employment history',
    education: 'Education',
    educationDesc: 'Academic background',
    skills: 'Skills',
    skillsDesc: 'Your expertise',
    languages: 'Languages',
    languagesDesc: 'Languages you speak',
    certificates: 'Certifications',
    certificatesDesc: 'Professional certifications',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    location: 'Location',
    linkedin: 'LinkedIn URL',
    website: 'Portfolio/Website',
    jobTitle: 'Job Title',
    company: 'Company',
    startDate: 'Start Date',
    endDate: 'End Date',
    current: 'Current',
    present: 'Present',
    description: 'Description',
    degree: 'Degree',
    school: 'School/University',
    field: 'Field of Study',
    year: 'Year',
    skillName: 'Skill',
    languageName: 'Language',
    level: 'Level',
    certName: 'Certification Name',
    issuer: 'Issuing Organization',
    add: 'Add',
    delete: 'Delete',
    download: 'Download PDF',
    templates: 'Templates',
    preview: 'Preview',
    empty: 'Empty',
    complete: 'Complete',
    summaryPlaceholder: 'Write a compelling 2-3 sentence overview of your professional background and career goals...'
  };

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user && saveStatus === 'saving') {
        saveCVToFirebase();
        setSaveStatus('saved');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [cvData, user, saveStatus, saveCVToFirebase]);

  // Update handlers
  const updatePersonal = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
    setSaveStatus('saving');
  };

  const updateSummary = (value) => {
    setCvData(prev => ({ ...prev, summary: value }));
    setSaveStatus('saving');
  };

  const updateExperience = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
    setSaveStatus('saving');
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }));
  };

  const deleteExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
    setSaveStatus('saving');
  };

  const updateEducation = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
    setSaveStatus('saving');
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        degree: '',
        school: '',
        field: '',
        year: ''
      }]
    }));
  };

  const deleteEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
    setSaveStatus('saving');
  };

  const updateSkills = (value) => {
    setCvData(prev => ({ ...prev, skills: value.split(',').map(s => s.trim()).filter(s => s) }));
    setSaveStatus('saving');
  };

  const updateLanguages = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }));
    setSaveStatus('saving');
  };

  const addLanguage = () => {
    setCvData(prev => ({
      ...prev,
      languages: [...(prev.languages || []), { id: Date.now(), name: '', level: '' }]
    }));
  };

  const deleteLanguage = (id) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
    setSaveStatus('saving');
  };

  const updateCertificates = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
    setSaveStatus('saving');
  };

  const addCertificate = () => {
    setCvData(prev => ({
      ...prev,
      certificates: [...(prev.certificates || []), { id: Date.now(), name: '', issuer: '', year: '' }]
    }));
  };

  const deleteCertificate = (id) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(cert => cert.id !== id)
    }));
    setSaveStatus('saving');
  };

  const selectTemplate = (template) => {
    setTemplateStyle(template);
    setCvData(prev => ({ ...prev, template }));
    setShowTemplateModal(false);
    setSaveStatus('saving');
  };

  const handleDownload = async () => {
    await generatePDF(cvData, templateStyle);
  };

  // Check section completion
  const isSectionComplete = (section) => {
    switch(section) {
      case 'personal':
        return cvData.personalInfo?.fullName && cvData.personalInfo?.email;
      case 'summary':
        return cvData.summary && cvData.summary.length > 20;
      case 'experience':
        return cvData.experience?.length > 0 && cvData.experience[0]?.title;
      case 'education':
        return cvData.education?.length > 0 && cvData.education[0]?.degree;
      case 'skills':
        return cvData.skills?.length > 0;
      case 'languages':
        return cvData.languages?.length > 0;
      case 'certificates':
        return cvData.certificates?.length > 0;
      default:
        return false;
    }
  };

  // Sections config
  const sections = [
    { id: 'personal', icon: FaUser, title: t.personal, desc: t.personalDesc },
    { id: 'summary', icon: FaFileAlt, title: t.summary, desc: t.summaryDesc },
    { id: 'experience', icon: FaBriefcase, title: t.experience, desc: t.experienceDesc },
    { id: 'education', icon: FaGraduationCap, title: t.education, desc: t.educationDesc },
    { id: 'skills', icon: FaTools, title: t.skills, desc: t.skillsDesc },
    { id: 'languages', icon: FaLanguage, title: t.languages, desc: t.languagesDesc },
    { id: 'certificates', icon: FaCertificate, title: t.certificates, desc: t.certificatesDesc }
  ];

  // Template options
  const templateOptions = [
    { id: 'modern', name: 'Modern', color: '#5b4eff' },
    { id: 'classic', name: 'Classic', color: '#1a1a1a' },
    { id: 'creative', name: 'Creative', color: '#667eea' },
    { id: 'professional', name: 'Professional', color: '#0a3d62' },
    { id: 'minimal', name: 'Minimal', color: '#0d9488' },
    { id: 'executive', name: 'Executive', color: '#1a365d' }
  ];

  return (
    <div className={`cv-builder ${isRTL ? 'rtl' : ''}`}>
      {/* LEFT - Form Panel */}
      <div className="form-panel">
        {/* Header */}
        <header className="form-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <FaArrowLeft />
          </button>
          <div className="header-info">
            <h1>{t.buildingCV}</h1>
            <span>{cvData.personalInfo?.fullName || t.untitled}</span>
          </div>
          <div className="header-status">
            <span className={`save-status ${saveStatus}`}>
              {saveStatus === 'saved' ? <><FaCheck /> {t.saved}</> : t.saving}
            </span>
          </div>
        </header>

        {/* Form Content */}
        <div className="form-content">
          {sections.map(section => (
            <div key={section.id} className="form-section">
              <button
                className={`section-toggle ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
              >
                <div className="section-info">
                  <section.icon className="section-icon" />
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.desc}</p>
                  </div>
                </div>
                <div className="section-status">
                  <span className={isSectionComplete(section.id) ? 'complete' : 'empty'}>
                    {isSectionComplete(section.id) ? t.complete : t.empty}
                  </span>
                  <FaChevronDown className={`chevron ${activeSection === section.id ? 'open' : ''}`} />
                </div>
              </button>

              {activeSection === section.id && (
                <div className="section-content">
                  {/* Personal Information */}
                  {section.id === 'personal' && (
                    <div className="form-grid">
                      <div className="form-field">
                        <label>{t.fullName} <span className="required">*</span></label>
                        <input
                          type="text"
                          value={cvData.personalInfo?.fullName || ''}
                          onChange={(e) => updatePersonal('fullName', e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="form-field">
                        <label>{t.email} <span className="required">*</span></label>
                        <input
                          type="email"
                          value={cvData.personalInfo?.email || ''}
                          onChange={(e) => updatePersonal('email', e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="form-field">
                        <label>{t.phone}</label>
                        <input
                          type="tel"
                          value={cvData.personalInfo?.phone || ''}
                          onChange={(e) => updatePersonal('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="form-field">
                        <label>{t.location}</label>
                        <input
                          type="text"
                          value={cvData.personalInfo?.location || ''}
                          onChange={(e) => updatePersonal('location', e.target.value)}
                          placeholder="New York, NY"
                        />
                      </div>
                      <div className="form-field">
                        <label>{t.linkedin}</label>
                        <input
                          type="url"
                          value={cvData.personalInfo?.linkedin || ''}
                          onChange={(e) => updatePersonal('linkedin', e.target.value)}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      <div className="form-field">
                        <label>{t.website}</label>
                        <input
                          type="url"
                          value={cvData.personalInfo?.website || ''}
                          onChange={(e) => updatePersonal('website', e.target.value)}
                          placeholder="johndoe.com"
                        />
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {section.id === 'summary' && (
                    <div className="form-field full">
                      <textarea
                        value={cvData.summary || ''}
                        onChange={(e) => updateSummary(e.target.value)}
                        placeholder={t.summaryPlaceholder}
                        rows={4}
                      />
                    </div>
                  )}

                  {/* Experience */}
                  {section.id === 'experience' && (
                    <>
                      {cvData.experience?.map((exp, index) => (
                        <div key={exp.id} className="entry-card">
                          <div className="entry-header">
                            <span className="entry-number">#{index + 1}</span>
                            <button className="delete-btn" onClick={() => deleteExperience(exp.id)}>
                              <FaTrash />
                            </button>
                          </div>
                          <div className="form-grid">
                            <div className="form-field">
                              <label>{t.jobTitle}</label>
                              <input
                                type="text"
                                value={exp.title || ''}
                                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                              />
                            </div>
                            <div className="form-field">
                              <label>{t.company}</label>
                              <input
                                type="text"
                                value={exp.company || ''}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              />
                            </div>
                            <div className="form-field">
                              <label>{t.startDate}</label>
                              <input
                                type="text"
                                value={exp.startDate || ''}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                placeholder="Jan 2020"
                              />
                            </div>
                            <div className="form-field">
                              <label>{t.endDate}</label>
                              <input
                                type="text"
                                value={exp.endDate || ''}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                placeholder="Present"
                                disabled={exp.current}
                              />
                            </div>
                            <div className="form-field full">
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked={exp.current || false}
                                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                />
                                {t.current}
                              </label>
                            </div>
                            <div className="form-field full">
                              <label>{t.description}</label>
                              <textarea
                                value={exp.description || ''}
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="add-btn" onClick={addExperience}>
                        <FaPlus /> {t.add} {t.experience}
                      </button>
                    </>
                  )}

                  {/* Education */}
                  {section.id === 'education' && (
                    <>
                      {cvData.education?.map((edu, index) => (
                        <div key={edu.id} className="entry-card">
                          <div className="entry-header">
                            <span className="entry-number">#{index + 1}</span>
                            <button className="delete-btn" onClick={() => deleteEducation(edu.id)}>
                              <FaTrash />
                            </button>
                          </div>
                          <div className="form-grid">
                            <div className="form-field">
                              <label>{t.degree}</label>
                              <input
                                type="text"
                                value={edu.degree || ''}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              />
                            </div>
                            <div className="form-field">
                              <label>{t.school}</label>
                              <input
                                type="text"
                                value={edu.school || ''}
                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                              />
                            </div>
                            <div className="form-field">
                              <label>{t.field}</label>
                              <input
                                type="text"
                                value={edu.field || ''}
                                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                              />
                            </div>
                            <div className="form-field">
                              <label>{t.year}</label>
                              <input
                                type="text"
                                value={edu.year || ''}
                                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                                placeholder="2020"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="add-btn" onClick={addEducation}>
                        <FaPlus /> {t.add} {t.education}
                      </button>
                    </>
                  )}

                  {/* Skills */}
                  {section.id === 'skills' && (
                    <div className="form-field full">
                      <label>{t.skillsDesc}</label>
                      <textarea
                        value={cvData.skills?.join(', ') || ''}
                        onChange={(e) => updateSkills(e.target.value)}
                        placeholder="JavaScript, React, Node.js, Python..."
                        rows={3}
                      />
                      <p className="hint">Separate skills with commas</p>
                    </div>
                  )}

                  {/* Languages */}
                  {section.id === 'languages' && (
                    <>
                      {cvData.languages?.map((lang, index) => (
                        <div key={lang.id} className="entry-row">
                          <input
                            type="text"
                            value={lang.name || ''}
                            onChange={(e) => updateLanguages(lang.id, 'name', e.target.value)}
                            placeholder={t.languageName}
                          />
                          <select
                            value={lang.level || ''}
                            onChange={(e) => updateLanguages(lang.id, 'level', e.target.value)}
                          >
                            <option value="">{t.level}</option>
                            <option value="Native">Native</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Basic">Basic</option>
                          </select>
                          <button className="delete-btn small" onClick={() => deleteLanguage(lang.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                      <button className="add-btn" onClick={addLanguage}>
                        <FaPlus /> {t.add} {t.languageName}
                      </button>
                    </>
                  )}

                  {/* Certificates */}
                  {section.id === 'certificates' && (
                    <>
                      {cvData.certificates?.map((cert, index) => (
                        <div key={cert.id} className="entry-card">
                          <div className="entry-header">
                            <span className="entry-number">#{index + 1}</span>
                            <button className="delete-btn" onClick={() => deleteCertificate(cert.id)}>
                              <FaTrash />
                            </button>
                          </div>
                          <div className="form-grid">
                            <div className="form-field">
                              <label>{t.certName}</label>
                              <input
                                type="text"
                                value={cert.name || ''}
                                onChange={(e) => updateCertificates(cert.id, 'name', e.target.value)}
                              />
                            </div>
                            <div className="form-field">
                              <label>{t.issuer}</label>
                              <input
                                type="text"
                                value={cert.issuer || ''}
                                onChange={(e) => updateCertificates(cert.id, 'issuer', e.target.value)}
                              />
                            </div>
                            <div className="form-field">
                              <label>{t.year}</label>
                              <input
                                type="text"
                                value={cert.year || ''}
                                onChange={(e) => updateCertificates(cert.id, 'year', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="add-btn" onClick={addCertificate}>
                        <FaPlus /> {t.add} {t.certificates}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - Preview Panel */}
      <div className="preview-panel">
        <div className={`cv-preview ${templateStyle}`}>
          {/* CV Header */}
          <div className="cv-header">
            <h1 className="cv-name">{cvData.personalInfo?.fullName || 'Your Name'}</h1>
            <div className="cv-contact">
              {cvData.personalInfo?.email && (
                <span><FaEnvelope /> {cvData.personalInfo.email}</span>
              )}
              {cvData.personalInfo?.phone && (
                <span><FaPhone /> {cvData.personalInfo.phone}</span>
              )}
              {cvData.personalInfo?.location && (
                <span><FaMapMarkerAlt /> {cvData.personalInfo.location}</span>
              )}
              {cvData.personalInfo?.linkedin && (
                <span><FaLinkedin /> {cvData.personalInfo.linkedin}</span>
              )}
              {cvData.personalInfo?.website && (
                <span><FaGlobe /> {cvData.personalInfo.website}</span>
              )}
            </div>
          </div>

          {/* Summary */}
          {cvData.summary && (
            <div className="cv-section">
              <h2 className="cv-section-title">Professional Summary</h2>
              <p className="cv-summary">{cvData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {cvData.experience?.length > 0 && cvData.experience[0]?.title && (
            <div className="cv-section">
              <h2 className="cv-section-title">Experience</h2>
              {cvData.experience.map(exp => (
                <div key={exp.id} className="cv-entry">
                  <div className="cv-entry-header">
                    <div>
                      <h3 className="cv-entry-title">{exp.title}</h3>
                      <p className="cv-entry-subtitle">{exp.company}</p>
                    </div>
                    <span className="cv-entry-date">
                      {exp.startDate} - {exp.current ? t.present : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="cv-entry-desc">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {cvData.education?.length > 0 && cvData.education[0]?.degree && (
            <div className="cv-section">
              <h2 className="cv-section-title">Education</h2>
              {cvData.education.map(edu => (
                <div key={edu.id} className="cv-entry">
                  <div className="cv-entry-header">
                    <div>
                      <h3 className="cv-entry-title">{edu.degree}</h3>
                      <p className="cv-entry-subtitle">{edu.school}</p>
                    </div>
                    <span className="cv-entry-date">{edu.year}</span>
                  </div>
                  {edu.field && <p className="cv-entry-desc">{edu.field}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {cvData.skills?.length > 0 && (
            <div className="cv-section">
              <h2 className="cv-section-title">Skills</h2>
              <div className="cv-skills">
                {cvData.skills.map((skill, i) => (
                  <span key={i} className="cv-skill">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {cvData.languages?.length > 0 && cvData.languages[0]?.name && (
            <div className="cv-section">
              <h2 className="cv-section-title">Languages</h2>
              <div className="cv-languages">
                {cvData.languages.map(lang => (
                  <span key={lang.id} className="cv-language">
                    <strong>{lang.name}</strong> - {lang.level}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {cvData.certificates?.length > 0 && cvData.certificates[0]?.name && (
            <div className="cv-section">
              <h2 className="cv-section-title">Certifications</h2>
              {cvData.certificates.map(cert => (
                <div key={cert.id} className="cv-entry">
                  <div className="cv-entry-header">
                    <div>
                      <h3 className="cv-entry-title">{cert.name}</h3>
                      <p className="cv-entry-subtitle">{cert.issuer}</p>
                    </div>
                    <span className="cv-entry-date">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Actions */}
      <div className="floating-actions">
        <button className="template-btn" onClick={() => setShowTemplateModal(true)}>
          <FaPalette /> {t.templates}
        </button>
        <button className="download-btn" onClick={handleDownload}>
          <FaDownload /> {t.download}
        </button>
      </div>

      {/* Mobile Preview Button */}
      <button className="mobile-preview-btn" onClick={() => setShowMobilePreview(true)}>
        <FaEye /> {t.preview}
      </button>

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="modal-overlay" onClick={() => setShowTemplateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t.templates}</h2>
              <button onClick={() => setShowTemplateModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="template-grid">
                {templateOptions.map(temp => (
                  <button
                    key={temp.id}
                    className={`template-option ${templateStyle === temp.id ? 'active' : ''}`}
                    onClick={() => selectTemplate(temp.id)}
                  >
                    <div className="template-preview" style={{ background: temp.color }}></div>
                    <span>{temp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Preview Modal */}
      {showMobilePreview && (
        <div className="mobile-preview-modal">
          <button className="close-preview" onClick={() => setShowMobilePreview(false)}>
            <FaTimes />
          </button>
          <div className={`cv-preview ${templateStyle}`}>
            {/* Same CV content as above */}
            <div className="cv-header">
              <h1 className="cv-name">{cvData.personalInfo?.fullName || 'Your Name'}</h1>
              <div className="cv-contact">
                {cvData.personalInfo?.email && <span><FaEnvelope /> {cvData.personalInfo.email}</span>}
                {cvData.personalInfo?.phone && <span><FaPhone /> {cvData.personalInfo.phone}</span>}
                {cvData.personalInfo?.location && <span><FaMapMarkerAlt /> {cvData.personalInfo.location}</span>}
              </div>
            </div>
            {cvData.summary && (
              <div className="cv-section">
                <h2 className="cv-section-title">Professional Summary</h2>
                <p className="cv-summary">{cvData.summary}</p>
              </div>
            )}
            {cvData.experience?.length > 0 && cvData.experience[0]?.title && (
              <div className="cv-section">
                <h2 className="cv-section-title">Experience</h2>
                {cvData.experience.map(exp => (
                  <div key={exp.id} className="cv-entry">
                    <h3 className="cv-entry-title">{exp.title}</h3>
                    <p className="cv-entry-subtitle">{exp.company}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CVBuilderPro;

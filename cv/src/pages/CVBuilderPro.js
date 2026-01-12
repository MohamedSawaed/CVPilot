import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { createCV, getCV, updateCV, getUserPaymentStatus, setUserPaid } from '../services/cvService';
import {
  FaArrowLeft,
  FaUser,
  FaFileAlt,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaCertificate,
  FaProjectDiagram,
  FaTrophy,
  FaPlus,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaCheck,
  FaDownload,
  FaEye,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGlobe,
  FaCheckCircle,
  FaPalette
} from 'react-icons/fa';
import { generatePDFFromServer } from '../utils/pdfExport';
import './CVBuilderPro.css';

const CVBuilderPro = () => {
  const { cvId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'he';

  // Auto-save timer ref
  const saveTimerRef = useRef(null);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [currentCvId, setCurrentCvId] = useState(cvId || null);
  const isSavingRef = useRef(false); // Prevent duplicate saves
  const isInitializedRef = useRef(false); // Track if data has been modified

  // Mobile preview modal
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Template modal state
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Payment state
  const [hasPaid, setHasPaid] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Active section for form
  const [activeSection, setActiveSection] = useState('personalInfo');

  // Template style
  const [templateStyle, setTemplateStyle] = useState('elegant');

  // CV Data State
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    achievements: []
  });

  // Section definitions
  const sections = [
    { id: 'personalInfo', icon: FaUser, title: 'Personal Information', subtitle: 'Your contact details' },
    { id: 'summary', icon: FaFileAlt, title: 'Professional Summary', subtitle: 'Brief overview of your profile' },
    { id: 'experience', icon: FaBriefcase, title: 'Work Experience', subtitle: 'Your employment history' },
    { id: 'education', icon: FaGraduationCap, title: 'Education', subtitle: 'Academic background' },
    { id: 'skills', icon: FaTools, title: 'Skills', subtitle: 'Your expertise and abilities' },
    { id: 'certifications', icon: FaCertificate, title: 'Certifications', subtitle: 'Professional certifications' },
    { id: 'projects', icon: FaProjectDiagram, title: 'Projects', subtitle: 'Notable projects' },
    { id: 'achievements', icon: FaTrophy, title: 'Achievements', subtitle: 'Awards and accomplishments' }
  ];

  // Translations
  const translations = {
    en: {
      backToDashboard: 'Back',
      buildingCV: 'Building your CV',
      saved: 'Saved',
      saving: 'Saving...',
      livePreview: 'Live Preview',
      download: 'Download PDF',
      preview: 'Preview',
      addEntry: 'Add Entry',
      present: 'Present',
      // Personal Info
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location',
      linkedin: 'LinkedIn URL',
      website: 'Portfolio/Website',
      // Summary
      summaryPlaceholder: 'Write a compelling 2-3 sentence overview of your professional background and career goals...',
      // Experience
      jobTitle: 'Job Title',
      company: 'Company Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      currentJob: 'I currently work here',
      jobDescription: 'Description',
      // Education
      degree: 'Degree',
      school: 'School/University',
      graduationYear: 'Graduation Year',
      fieldOfStudy: 'Field of Study',
      // Skills
      addSkill: 'Add Skill',
      skillPlaceholder: 'Type a skill and press Add',
      // Certifications
      certName: 'Certification Name',
      issuer: 'Issuing Organization',
      issueDate: 'Issue Date',
      // Projects
      projectName: 'Project Name',
      projectDescription: 'Project Description',
      technologies: 'Technologies Used',
      // Achievements
      achievementTitle: 'Achievement',
      achievementDescription: 'Description',
      // Status
      empty: 'Empty',
      partial: 'In Progress',
      complete: 'Complete',
      // Payment
      unlockDownload: 'Unlock PDF Download',
      paymentDesc: 'Get unlimited PDF downloads for all your CVs',
      oneTimePayment: 'One-time payment',
      feature1: 'Unlimited PDF downloads',
      feature2: 'All premium templates',
      feature3: 'No watermarks',
      feature4: 'Priority support',
      payNow: 'Pay Now',
      cancel: 'Cancel',
      myCVs: 'My CVs',
      templates: 'Templates',
      chooseTemplate: 'Choose a Template',
      templateElegant: 'Elegant',
      templateBold: 'Bold',
      templateClassic: 'Classic',
      templateAts: 'ATS-Friendly',
      templateExecutive: 'Executive',
      templateMinimal: 'Minimal',
      templateTech: 'Tech',
      templateLuxe: 'Luxe',
      templateAzure: 'Azure',
      templateNoir: 'Noir',
      templateCoral: 'Coral'
    },
    ar: {
      backToDashboard: 'رجوع',
      buildingCV: 'بناء سيرتك الذاتية',
      saved: 'تم الحفظ',
      saving: 'جاري الحفظ...',
      livePreview: 'معاينة مباشرة',
      download: 'تحميل PDF',
      preview: 'معاينة',
      addEntry: 'إضافة',
      present: 'حتى الآن',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      location: 'الموقع',
      linkedin: 'رابط لينكد إن',
      website: 'الموقع الشخصي',
      summaryPlaceholder: 'اكتب نبذة مختصرة عن خبرتك المهنية وأهدافك...',
      jobTitle: 'المسمى الوظيفي',
      company: 'اسم الشركة',
      startDate: 'تاريخ البدء',
      endDate: 'تاريخ الانتهاء',
      currentJob: 'أعمل هنا حالياً',
      jobDescription: 'الوصف',
      degree: 'الدرجة العلمية',
      school: 'الجامعة/المدرسة',
      graduationYear: 'سنة التخرج',
      fieldOfStudy: 'مجال الدراسة',
      addSkill: 'إضافة مهارة',
      skillPlaceholder: 'اكتب مهارة واضغط إضافة',
      certName: 'اسم الشهادة',
      issuer: 'الجهة المانحة',
      issueDate: 'تاريخ الإصدار',
      projectName: 'اسم المشروع',
      projectDescription: 'وصف المشروع',
      technologies: 'التقنيات المستخدمة',
      achievementTitle: 'الإنجاز',
      achievementDescription: 'الوصف',
      empty: 'فارغ',
      partial: 'قيد التقدم',
      complete: 'مكتمل',
      unlockDownload: 'فتح تحميل PDF',
      paymentDesc: 'احصل على تحميلات PDF غير محدودة',
      oneTimePayment: 'دفعة واحدة',
      feature1: 'تحميلات PDF غير محدودة',
      feature2: 'جميع القوالب المميزة',
      feature3: 'بدون علامات مائية',
      feature4: 'دعم ذو أولوية',
      payNow: 'ادفع الآن',
      cancel: 'إلغاء',
      myCVs: 'سيرتي الذاتية',
      templates: 'القوالب',
      chooseTemplate: 'اختر قالباً',
      templateElegant: 'أنيق',
      templateBold: 'راقي',
      templateClassic: 'كلاسيكي',
      templateAts: 'متوافق ATS',
      templateExecutive: 'تنفيذي',
      templateMinimal: 'بسيط',
      templateTech: 'تقني',
      templateLuxe: 'فاخر',
      templateAzure: 'أزرق سماوي',
      templateNoir: 'داكن',
      templateCoral: 'مرجاني'
    },
    he: {
      backToDashboard: 'חזרה',
      buildingCV: 'בניית קורות החיים',
      saved: 'נשמר',
      saving: 'שומר...',
      livePreview: 'תצוגה מקדימה',
      download: 'הורד PDF',
      preview: 'תצוגה',
      addEntry: 'הוסף',
      present: 'עד היום',
      fullName: 'שם מלא',
      email: 'דואר אלקטרוני',
      phone: 'טלפון',
      location: 'מיקום',
      linkedin: 'קישור לינקדאין',
      website: 'אתר אישי',
      summaryPlaceholder: 'כתוב תקציר קצר על הרקע המקצועי שלך...',
      jobTitle: 'תפקיד',
      company: 'חברה',
      startDate: 'תאריך התחלה',
      endDate: 'תאריך סיום',
      currentJob: 'עובד כאן כרגע',
      jobDescription: 'תיאור',
      degree: 'תואר',
      school: 'מוסד לימודים',
      graduationYear: 'שנת סיום',
      fieldOfStudy: 'תחום לימודים',
      addSkill: 'הוסף מיומנות',
      skillPlaceholder: 'הקלד מיומנות ולחץ הוסף',
      certName: 'שם ההסמכה',
      issuer: 'גוף מנפיק',
      issueDate: 'תאריך הנפקה',
      projectName: 'שם הפרויקט',
      projectDescription: 'תיאור הפרויקט',
      technologies: 'טכנולוגיות',
      achievementTitle: 'הישג',
      achievementDescription: 'תיאור',
      empty: 'ריק',
      partial: 'בתהליך',
      complete: 'הושלם',
      unlockDownload: 'פתח הורדת PDF',
      paymentDesc: 'קבל הורדות PDF ללא הגבלה',
      oneTimePayment: 'תשלום חד פעמי',
      feature1: 'הורדות PDF ללא הגבלה',
      feature2: 'כל התבניות הפרימיום',
      feature3: 'ללא סימני מים',
      feature4: 'תמיכה בעדיפות',
      payNow: 'שלם עכשיו',
      cancel: 'ביטול',
      myCVs: 'קורות החיים שלי',
      templates: 'תבניות',
      chooseTemplate: 'בחר תבנית',
      templateElegant: 'אלגנטי',
      templateBold: 'נועז',
      templateClassic: 'קלאסי',
      templateAts: 'ידידותי ATS',
      templateExecutive: 'מנהלים',
      templateMinimal: 'מינימלי',
      templateTech: 'טכנולוגי',
      templateLuxe: 'יוקרתי',
      templateAzure: 'תכלת',
      templateNoir: 'כהה',
      templateCoral: 'אלמוגי'
    }
  };

  const t = translations[language] || translations.en;

  // Template definitions - all 11 templates
  const templates = [
    { id: 'elegant', name: t.templateElegant, color: '#667eea', accent: '#764ba2', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'bold', name: t.templateBold, color: '#1e3a3a', accent: '#4db6ac', gradient: 'linear-gradient(135deg, #1e3a3a 0%, #2d5a5a 100%)' },
    { id: 'classic', name: t.templateClassic, color: '#1a1a1a', accent: '#333333', gradient: 'linear-gradient(180deg, #1a1a1a 0%, #333 100%)' },
    { id: 'ats', name: t.templateAts, color: '#ffffff', accent: '#000000', gradient: '#ffffff', border: true },
    { id: 'executive', name: t.templateExecutive, color: '#1a365d', accent: '#d4af37', gradient: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)' },
    { id: 'minimal', name: t.templateMinimal, color: '#ffffff', accent: '#0d9488', gradient: '#f8fafc', border: true },
    { id: 'tech', name: t.templateTech, color: '#0f172a', accent: '#10b981', gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' },
    { id: 'luxe', name: t.templateLuxe, color: '#0d0d0d', accent: '#d4af37', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)' },
    { id: 'azure', name: t.templateAzure, color: '#0077b6', accent: '#48cae4', gradient: 'linear-gradient(135deg, #0077b6 0%, #48cae4 100%)' },
    { id: 'noir', name: t.templateNoir, color: '#0a0a0a', accent: '#a8a8a8', gradient: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)' },
    { id: 'coral', name: t.templateCoral, color: '#e8a598', accent: '#d4978b', gradient: 'linear-gradient(135deg, #e8a598 0%, #be8377 100%)' }
  ];

  // Load payment status
  useEffect(() => {
    if (user) {
      checkPaymentStatus();
    }
  }, [user]);

  const checkPaymentStatus = async () => {
    if (!user) return;
    const { hasPaid: paid } = await getUserPaymentStatus(user.uid);
    setHasPaid(paid);
  };

  // Load existing CV if editing
  useEffect(() => {
    if (cvId) {
      loadCV();
    }
  }, [cvId]);

  const loadCV = async () => {
    console.log('Loading CV with ID:', cvId);
    const { cv, error } = await getCV(cvId);
    console.log('Loaded CV result:', { cv, error });
    if (!error && cv && cv.cvData) {
      // Merge loaded data with default structure to ensure all fields exist
      const loadedData = {
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          website: '',
          ...(cv.cvData.personalInfo || {})
        },
        summary: cv.cvData.summary || '',
        experience: cv.cvData.experience || [],
        education: cv.cvData.education || [],
        skills: cv.cvData.skills || [],
        certifications: cv.cvData.certifications || [],
        projects: cv.cvData.projects || [],
        achievements: cv.cvData.achievements || []
      };
      console.log('Setting CV data:', loadedData);
      setCvData(loadedData);
      setCurrentCvId(cvId);
      // Mark as initialized since we're loading existing data
      isInitializedRef.current = true;
    } else {
      console.error('Failed to load CV:', error);
    }
  };

  // Auto-save functionality
  const autoSave = useCallback(async (dataToSave, cvIdToUse) => {
    if (!user) return;

    // Prevent duplicate saves
    if (isSavingRef.current) {
      console.log('Save already in progress, skipping...');
      return;
    }

    isSavingRef.current = true;
    setSaveStatus('saving');

    try {
      if (cvIdToUse) {
        // Update existing CV
        const { error } = await updateCV(cvIdToUse, dataToSave);
        if (error) {
          console.error('Update error:', error);
          setSaveStatus('error');
        } else {
          setSaveStatus('saved');
        }
      } else {
        // Create new CV only if there's meaningful data
        const hasData = dataToSave.personalInfo?.fullName ||
                       dataToSave.personalInfo?.email ||
                       dataToSave.summary ||
                       dataToSave.experience?.length > 0 ||
                       dataToSave.education?.length > 0 ||
                       dataToSave.skills?.length > 0;

        if (!hasData) {
          console.log('No meaningful data to save yet');
          setSaveStatus('saved');
          isSavingRef.current = false;
          return;
        }

        const { id, error } = await createCV(user.uid, dataToSave, null);
        if (!error && id) {
          setCurrentCvId(id);
          setSaveStatus('saved');
        } else {
          console.error('Create error:', error);
          setSaveStatus('error');
        }
      }
    } catch (error) {
      console.error('Auto-save error:', error);
      setSaveStatus('error');
    } finally {
      isSavingRef.current = false;
    }
  }, [user]);

  // Debounced auto-save on data change
  useEffect(() => {
    // Skip auto-save on initial mount - wait for user to make changes
    if (!isInitializedRef.current) {
      // If editing an existing CV, mark as initialized after loading
      if (cvId) {
        isInitializedRef.current = true;
      }
      return;
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    setSaveStatus('saving');

    // Capture current values for the save
    const dataSnapshot = JSON.parse(JSON.stringify(cvData));
    const idSnapshot = currentCvId;

    saveTimerRef.current = setTimeout(() => {
      autoSave(dataSnapshot, idSnapshot);
    }, 2000);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [cvData, currentCvId, cvId, autoSave]);

  // Mark as initialized when user starts editing
  const markInitialized = useCallback(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
    }
  }, []);

  // Update personal info
  const updatePersonalInfo = (field, value) => {
    markInitialized();
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  // Update summary
  const updateSummary = (value) => {
    markInitialized();
    setCvData(prev => ({ ...prev, summary: value }));
  };

  // Add entry to array sections
  const addEntry = (section, entry) => {
    markInitialized();
    setCvData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...entry, id: Date.now() }]
    }));
  };

  // Update entry in array sections
  const updateEntry = (section, id, field, value) => {
    markInitialized();
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Delete entry from array sections
  const deleteEntry = (section, id) => {
    markInitialized();
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  // Add skill
  const [newSkill, setNewSkill] = useState('');
  const addSkill = () => {
    if (newSkill.trim()) {
      markInitialized();
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  // Remove skill
  const removeSkill = (index) => {
    markInitialized();
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Calculate section completion status
  const getSectionStatus = (sectionId) => {
    switch (sectionId) {
      case 'personalInfo':
        const { fullName, email } = cvData.personalInfo;
        if (fullName && email) return 'complete';
        if (fullName || email) return 'partial';
        return 'empty';
      case 'summary':
        if (cvData.summary && cvData.summary.length > 50) return 'complete';
        if (cvData.summary) return 'partial';
        return 'empty';
      case 'experience':
      case 'education':
      case 'certifications':
      case 'projects':
      case 'achievements':
        if (cvData[sectionId].length > 0) return 'complete';
        return 'empty';
      case 'skills':
        if (cvData.skills.length >= 5) return 'complete';
        if (cvData.skills.length > 0) return 'partial';
        return 'empty';
      default:
        return 'empty';
    }
  };

  // Calculate overall completion percentage
  const getCompletionPercentage = () => {
    let score = 0;
    const weights = {
      personalInfo: 20,
      summary: 15,
      experience: 25,
      education: 15,
      skills: 15,
      certifications: 5,
      projects: 5,
      achievements: 0
    };

    Object.keys(weights).forEach(section => {
      const status = getSectionStatus(section);
      if (status === 'complete') score += weights[section];
      else if (status === 'partial') score += weights[section] * 0.5;
    });

    return Math.round(score);
  };

  // Handle payment (simulated - in production, integrate with Stripe/PayPal)
  const handlePayment = async () => {
    // For demo purposes, we'll just mark as paid
    // In production, this would redirect to Stripe/PayPal
    if (!user) return;

    try {
      await setUserPaid(user.uid);
      setHasPaid(true);
      setShowPaymentModal(false);
      // Now download the PDF and save to Firebase Storage
      await generatePDFFromServer(cvData, templateStyle, sections.map(s => s.id), language, user.uid, currentCvId);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  // Download PDF
  const handleDownload = async () => {
    // Check if user has paid
    if (!hasPaid) {
      setShowPaymentModal(true);
      return;
    }

    try {
      // Generate PDF and save to Firebase Storage
      await generatePDFFromServer(cvData, templateStyle, sections.map(s => s.id), language, user.uid, currentCvId);
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  };

  // Navigate back to dashboard
  const handleBack = () => {
    navigate('/dashboard');
  };

  // Toggle section
  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  // Entry form states for each section
  const [editingEntry, setEditingEntry] = useState(null);
  const [newExperience, setNewExperience] = useState({ title: '', company: '', startDate: '', endDate: '', current: false, description: '' });
  const [newEducation, setNewEducation] = useState({ degree: '', school: '', year: '', field: '' });
  const [newCertification, setNewCertification] = useState({ name: '', issuer: '', date: '' });
  const [newProject, setNewProject] = useState({ name: '', description: '', technologies: '' });
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '' });

  // Render section content based on type
  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case 'personalInfo':
        return (
          <div className="section-content-inner">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  {t.fullName} <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={cvData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  {t.email} <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={cvData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t.phone}</label>
                <input
                  type="tel"
                  className="form-input"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t.location}</label>
                <input
                  type="text"
                  className="form-input"
                  value={cvData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="New York, NY"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t.linkedin}</label>
                <input
                  type="url"
                  className="form-input"
                  value={cvData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t.website}</label>
                <input
                  type="url"
                  className="form-input"
                  value={cvData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  placeholder="johndoe.com"
                />
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="section-content-inner">
            <div className="form-row single">
              <div className="form-group">
                <textarea
                  className="form-input form-textarea"
                  value={cvData.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  placeholder={t.summaryPlaceholder}
                  rows={5}
                />
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="section-content-inner">
            <div className="entry-list">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className={`entry-card ${editingEntry === exp.id ? 'editing' : ''}`}>
                  {editingEntry === exp.id ? (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">{t.jobTitle}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={exp.title}
                            onChange={(e) => updateEntry('experience', exp.id, 'title', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">{t.company}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={exp.company}
                            onChange={(e) => updateEntry('experience', exp.id, 'company', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">{t.startDate}</label>
                          <input
                            type="month"
                            className="form-input"
                            value={exp.startDate}
                            onChange={(e) => updateEntry('experience', exp.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">{t.endDate}</label>
                          <input
                            type="month"
                            className="form-input"
                            value={exp.endDate}
                            onChange={(e) => updateEntry('experience', exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                      <div className="form-row single">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateEntry('experience', exp.id, 'current', e.target.checked)}
                          />
                          {t.currentJob}
                        </label>
                      </div>
                      <div className="form-row single">
                        <div className="form-group">
                          <label className="form-label">{t.jobDescription}</label>
                          <textarea
                            className="form-input form-textarea"
                            value={exp.description}
                            onChange={(e) => updateEntry('experience', exp.id, 'description', e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                      <button className="add-skill-btn" onClick={() => setEditingEntry(null)}>
                        <FaCheck /> Done
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="entry-card-header">
                        <div>
                          <h4 className="entry-card-title">{exp.title || 'Untitled Position'}</h4>
                          <p className="entry-card-subtitle">{exp.company}</p>
                          <span className="entry-card-date">
                            {exp.startDate} - {exp.current ? t.present : exp.endDate}
                          </span>
                        </div>
                        <div className="entry-card-actions">
                          <button className="entry-action-btn edit" onClick={() => setEditingEntry(exp.id)}>
                            <FaEdit />
                          </button>
                          <button className="entry-action-btn delete" onClick={() => deleteEntry('experience', exp.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button
              className="add-entry-btn"
              onClick={() => {
                addEntry('experience', newExperience);
                setNewExperience({ title: '', company: '', startDate: '', endDate: '', current: false, description: '' });
              }}
            >
              <FaPlus /> {t.addEntry}
            </button>
          </div>
        );

      case 'education':
        return (
          <div className="section-content-inner">
            <div className="entry-list">
              {cvData.education.map((edu) => (
                <div key={edu.id} className={`entry-card ${editingEntry === edu.id ? 'editing' : ''}`}>
                  {editingEntry === edu.id ? (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">{t.degree}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={edu.degree}
                            onChange={(e) => updateEntry('education', edu.id, 'degree', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">{t.school}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={edu.school}
                            onChange={(e) => updateEntry('education', edu.id, 'school', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">{t.fieldOfStudy}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={edu.field}
                            onChange={(e) => updateEntry('education', edu.id, 'field', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">{t.graduationYear}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={edu.year}
                            onChange={(e) => updateEntry('education', edu.id, 'year', e.target.value)}
                            placeholder="2024"
                          />
                        </div>
                      </div>
                      <button className="add-skill-btn" onClick={() => setEditingEntry(null)}>
                        <FaCheck /> Done
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="entry-card-header">
                        <div>
                          <h4 className="entry-card-title">{edu.degree || 'Untitled Degree'}</h4>
                          <p className="entry-card-subtitle">{edu.school}</p>
                          <span className="entry-card-date">{edu.field} {edu.year && `• ${edu.year}`}</span>
                        </div>
                        <div className="entry-card-actions">
                          <button className="entry-action-btn edit" onClick={() => setEditingEntry(edu.id)}>
                            <FaEdit />
                          </button>
                          <button className="entry-action-btn delete" onClick={() => deleteEntry('education', edu.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button
              className="add-entry-btn"
              onClick={() => {
                addEntry('education', newEducation);
                setNewEducation({ degree: '', school: '', year: '', field: '' });
              }}
            >
              <FaPlus /> {t.addEntry}
            </button>
          </div>
        );

      case 'skills':
        return (
          <div className="section-content-inner">
            <div className="skills-container">
              {cvData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button onClick={() => removeSkill(index)}>
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
            <div className="skill-input-wrapper">
              <input
                type="text"
                className="form-input"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder={t.skillPlaceholder}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <button className="add-skill-btn" onClick={addSkill}>
                {t.addSkill}
              </button>
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="section-content-inner">
            <div className="entry-list">
              {cvData.certifications.map((cert) => (
                <div key={cert.id} className={`entry-card ${editingEntry === cert.id ? 'editing' : ''}`}>
                  {editingEntry === cert.id ? (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">{t.certName}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={cert.name}
                            onChange={(e) => updateEntry('certifications', cert.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">{t.issuer}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={cert.issuer}
                            onChange={(e) => updateEntry('certifications', cert.id, 'issuer', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">{t.issueDate}</label>
                          <input
                            type="month"
                            className="form-input"
                            value={cert.date}
                            onChange={(e) => updateEntry('certifications', cert.id, 'date', e.target.value)}
                          />
                        </div>
                      </div>
                      <button className="add-skill-btn" onClick={() => setEditingEntry(null)}>
                        <FaCheck /> Done
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="entry-card-header">
                        <div>
                          <h4 className="entry-card-title">{cert.name || 'Untitled Certification'}</h4>
                          <p className="entry-card-subtitle">{cert.issuer}</p>
                          <span className="entry-card-date">{cert.date}</span>
                        </div>
                        <div className="entry-card-actions">
                          <button className="entry-action-btn edit" onClick={() => setEditingEntry(cert.id)}>
                            <FaEdit />
                          </button>
                          <button className="entry-action-btn delete" onClick={() => deleteEntry('certifications', cert.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button
              className="add-entry-btn"
              onClick={() => {
                addEntry('certifications', newCertification);
                setNewCertification({ name: '', issuer: '', date: '' });
              }}
            >
              <FaPlus /> {t.addEntry}
            </button>
          </div>
        );

      case 'projects':
        return (
          <div className="section-content-inner">
            <div className="entry-list">
              {cvData.projects.map((project) => (
                <div key={project.id} className={`entry-card ${editingEntry === project.id ? 'editing' : ''}`}>
                  {editingEntry === project.id ? (
                    <>
                      <div className="form-row single">
                        <div className="form-group">
                          <label className="form-label">{t.projectName}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={project.name}
                            onChange={(e) => updateEntry('projects', project.id, 'name', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-row single">
                        <div className="form-group">
                          <label className="form-label">{t.projectDescription}</label>
                          <textarea
                            className="form-input form-textarea"
                            value={project.description}
                            onChange={(e) => updateEntry('projects', project.id, 'description', e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="form-row single">
                        <div className="form-group">
                          <label className="form-label">{t.technologies}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={project.technologies}
                            onChange={(e) => updateEntry('projects', project.id, 'technologies', e.target.value)}
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>
                      </div>
                      <button className="add-skill-btn" onClick={() => setEditingEntry(null)}>
                        <FaCheck /> Done
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="entry-card-header">
                        <div>
                          <h4 className="entry-card-title">{project.name || 'Untitled Project'}</h4>
                          <span className="entry-card-date">{project.technologies}</span>
                        </div>
                        <div className="entry-card-actions">
                          <button className="entry-action-btn edit" onClick={() => setEditingEntry(project.id)}>
                            <FaEdit />
                          </button>
                          <button className="entry-action-btn delete" onClick={() => deleteEntry('projects', project.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button
              className="add-entry-btn"
              onClick={() => {
                addEntry('projects', newProject);
                setNewProject({ name: '', description: '', technologies: '' });
              }}
            >
              <FaPlus /> {t.addEntry}
            </button>
          </div>
        );

      case 'achievements':
        return (
          <div className="section-content-inner">
            <div className="entry-list">
              {cvData.achievements.map((achievement) => (
                <div key={achievement.id} className={`entry-card ${editingEntry === achievement.id ? 'editing' : ''}`}>
                  {editingEntry === achievement.id ? (
                    <>
                      <div className="form-row single">
                        <div className="form-group">
                          <label className="form-label">{t.achievementTitle}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={achievement.title}
                            onChange={(e) => updateEntry('achievements', achievement.id, 'title', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-row single">
                        <div className="form-group">
                          <label className="form-label">{t.achievementDescription}</label>
                          <textarea
                            className="form-input form-textarea"
                            value={achievement.description}
                            onChange={(e) => updateEntry('achievements', achievement.id, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                      <button className="add-skill-btn" onClick={() => setEditingEntry(null)}>
                        <FaCheck /> Done
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="entry-card-header">
                        <div>
                          <h4 className="entry-card-title">{achievement.title || 'Untitled Achievement'}</h4>
                          {achievement.description && (
                            <p className="entry-card-subtitle">{achievement.description}</p>
                          )}
                        </div>
                        <div className="entry-card-actions">
                          <button className="entry-action-btn edit" onClick={() => setEditingEntry(achievement.id)}>
                            <FaEdit />
                          </button>
                          <button className="entry-action-btn delete" onClick={() => deleteEntry('achievements', achievement.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button
              className="add-entry-btn"
              onClick={() => {
                addEntry('achievements', newAchievement);
                setNewAchievement({ title: '', description: '' });
              }}
            >
              <FaPlus /> {t.addEntry}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Live Preview Component
  const LivePreview = () => (
    <div className={`cv-preview ${templateStyle} ${isRTL ? 'rtl' : ''}`}>
      {/* Header */}
      <div className="cv-header">
        <h1 className="cv-name">{cvData.personalInfo.fullName || 'Your Name'}</h1>
        <div className="cv-contact">
          {cvData.personalInfo.email && (
            <span><FaEnvelope /> {cvData.personalInfo.email}</span>
          )}
          {cvData.personalInfo.phone && (
            <span><FaPhone /> {cvData.personalInfo.phone}</span>
          )}
          {cvData.personalInfo.location && (
            <span><FaMapMarkerAlt /> {cvData.personalInfo.location}</span>
          )}
          {cvData.personalInfo.linkedin && (
            <span><FaLinkedin /> {cvData.personalInfo.linkedin}</span>
          )}
          {cvData.personalInfo.website && (
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
      {cvData.experience.length > 0 && (
        <div className="cv-section">
          <h2 className="cv-section-title">Experience</h2>
          {cvData.experience.map((exp) => (
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
              {exp.description && (
                <p className="cv-entry-description">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="cv-section">
          <h2 className="cv-section-title">Education</h2>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="cv-entry">
              <div className="cv-entry-header">
                <div>
                  <h3 className="cv-entry-title">{edu.degree}</h3>
                  <p className="cv-entry-subtitle">{edu.school}</p>
                </div>
                <span className="cv-entry-date">{edu.year}</span>
              </div>
              {edu.field && (
                <p className="cv-entry-description">{edu.field}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="cv-section">
          <h2 className="cv-section-title">Skills</h2>
          <div className="cv-skills-list">
            {cvData.skills.map((skill, index) => (
              <span key={index} className="cv-skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {cvData.certifications.length > 0 && (
        <div className="cv-section">
          <h2 className="cv-section-title">Certifications</h2>
          {cvData.certifications.map((cert) => (
            <div key={cert.id} className="cv-entry">
              <div className="cv-entry-header">
                <div>
                  <h3 className="cv-entry-title">{cert.name}</h3>
                  <p className="cv-entry-subtitle">{cert.issuer}</p>
                </div>
                <span className="cv-entry-date">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {cvData.projects.length > 0 && (
        <div className="cv-section">
          <h2 className="cv-section-title">Projects</h2>
          {cvData.projects.map((project) => (
            <div key={project.id} className="cv-entry">
              <h3 className="cv-entry-title">{project.name}</h3>
              {project.description && (
                <p className="cv-entry-description">{project.description}</p>
              )}
              {project.technologies && (
                <p className="cv-entry-subtitle">{project.technologies}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {cvData.achievements.length > 0 && (
        <div className="cv-section">
          <h2 className="cv-section-title">Achievements</h2>
          {cvData.achievements.map((achievement) => (
            <div key={achievement.id} className="cv-entry">
              <h3 className="cv-entry-title">{achievement.title}</h3>
              {achievement.description && (
                <p className="cv-entry-description">{achievement.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const completionPercent = getCompletionPercentage();
  const circumference = 2 * Math.PI * 14;
  const strokeDashoffset = circumference - (completionPercent / 100) * circumference;

  return (
    <div className={`cv-builder-pro ${isRTL ? 'rtl' : ''}`}>
      {/* Left Panel - Form */}
      <div className="builder-left-panel">
        <header className="builder-header">
          <div className="builder-header-left">
            <button className="builder-back-btn" onClick={handleBack} title={t.myCVs}>
              <FaArrowLeft />
            </button>
            <div>
              <h1 className="builder-title">{t.buildingCV}</h1>
              <p className="builder-subtitle">
                {cvData.personalInfo.fullName || 'Untitled CV'}
              </p>
            </div>
          </div>
          <div className="builder-header-right">
            <div className={`save-status ${saveStatus}`}>
              {saveStatus === 'saving' ? t.saving : saveStatus === 'saved' ? <><FaCheck /> {t.saved}</> : 'Error'}
            </div>
            <div className="completion-badge">
              <div className="completion-ring">
                <svg width="36" height="36">
                  <circle className="bg" cx="18" cy="18" r="14" />
                  <circle
                    className="progress"
                    cx="18"
                    cy="18"
                    r="14"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <span className="completion-text">{completionPercent}%</span>
              </div>
            </div>
          </div>
        </header>
        <div className="builder-progress-bar">
          <div className="builder-progress-fill" style={{ width: `${completionPercent}%` }} />
        </div>

        <div className="builder-sections">
          {sections.map((section) => {
            const status = getSectionStatus(section.id);
            const Icon = section.icon;
            const isOpen = activeSection === section.id;

            return (
              <div
                key={section.id}
                className={`builder-section ${isOpen ? 'active' : ''} ${status === 'complete' ? 'completed' : ''}`}
              >
                <div className="section-header" onClick={() => toggleSection(section.id)}>
                  <div className="section-header-left">
                    <div className="section-header-icon">
                      <Icon />
                    </div>
                    <div className="section-header-info">
                      <h3>{section.title}</h3>
                      <p>{section.subtitle}</p>
                    </div>
                  </div>
                  <div className="section-header-right">
                    <span className={`section-status ${status}`}>
                      {status === 'complete' ? t.complete : status === 'partial' ? t.partial : t.empty}
                    </span>
                    <button className={`section-toggle ${isOpen ? 'open' : ''}`}>
                      <FaChevronDown />
                    </button>
                  </div>
                </div>
                <div className={`section-content ${isOpen ? 'open' : ''}`}>
                  {renderSectionContent(section.id)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="builder-right-panel">
        <div className="preview-container">
          <div className="preview-header">
            <span className="preview-title">{t.livePreview}</span>
            <div className="preview-actions">
              <button className="preview-action-btn secondary" onClick={() => setShowTemplateModal(true)}>
                <FaPalette /> {t.templates}
              </button>
              <button className="preview-action-btn primary" onClick={handleDownload}>
                <FaDownload /> {t.download}
              </button>
            </div>
          </div>

          <div className="preview-paper-wrapper">
            <div className="preview-paper">
              <div className="preview-scale-wrapper">
                <LivePreview />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar - visible on tablets/mobile */}
      <div className="mobile-bottom-bar">
        <button className="mobile-preview-btn" onClick={() => setShowMobilePreview(true)}>
          <FaEye /> {t.preview}
        </button>
        <button className="mobile-download-btn" onClick={handleDownload}>
          <FaDownload /> {t.download}
        </button>
      </div>

      {/* Mobile Preview Modal */}
      {showMobilePreview && (
        <div className="mobile-preview-modal">
          <button className="close-btn" onClick={() => setShowMobilePreview(false)}>
            <FaTimes />
          </button>
          <div className="preview-paper">
            <div className="preview-scale-wrapper">
              <LivePreview />
            </div>
          </div>
        </div>
      )}

      {/* Floating Download Button (Desktop) */}
      <button className="floating-download-btn" onClick={handleDownload}>
        <FaDownload className="icon" />
        {t.download}
      </button>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{t.unlockDownload}</h2>
            <p>{t.paymentDesc}</p>
            <div className="payment-price">
              $4.99 <span>{t.oneTimePayment}</span>
            </div>
            <ul className="payment-features">
              <li><FaCheckCircle /> {t.feature1}</li>
              <li><FaCheckCircle /> {t.feature2}</li>
              <li><FaCheckCircle /> {t.feature3}</li>
              <li><FaCheckCircle /> {t.feature4}</li>
            </ul>
            <button className="payment-btn" onClick={handlePayment}>
              {t.payNow}
            </button>
            <button className="payment-cancel" onClick={() => setShowPaymentModal(false)}>
              {t.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="template-modal-overlay" onClick={() => setShowTemplateModal(false)}>
          <div className="template-modal" onClick={(e) => e.stopPropagation()}>
            <div className="template-modal-header">
              <h2>{t.chooseTemplate}</h2>
              <button className="template-modal-close" onClick={() => setShowTemplateModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="template-grid">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${templateStyle === template.id ? 'active' : ''}`}
                  onClick={() => {
                    setTemplateStyle(template.id);
                    setShowTemplateModal(false);
                  }}
                >
                  <div
                    className="template-preview"
                    style={{
                      background: template.gradient,
                      border: template.border ? '2px solid #e2e8f0' : 'none'
                    }}
                  >
                    <div
                      className="template-preview-header"
                      style={{
                        background: template.gradient,
                        color: template.border ? '#1a1a1a' : '#ffffff'
                      }}
                    >
                      <div className="template-preview-name" style={{
                        background: template.border ? '#1a1a1a' : 'rgba(255,255,255,0.9)'
                      }}></div>
                      <div className="template-preview-contact" style={{
                        background: template.border ? '#666' : 'rgba(255,255,255,0.6)'
                      }}></div>
                    </div>
                    <div className="template-preview-body">
                      <div className="template-preview-section">
                        <div className="template-preview-line" style={{ backgroundColor: template.accent }}></div>
                        <div className="template-preview-line short"></div>
                        <div className="template-preview-line short"></div>
                      </div>
                      <div className="template-preview-section">
                        <div className="template-preview-line" style={{ backgroundColor: template.accent }}></div>
                        <div className="template-preview-line short"></div>
                      </div>
                    </div>
                  </div>
                  <div className="template-card-footer">
                    <span className="template-name">{template.name}</span>
                    {templateStyle === template.id && (
                      <span className="template-selected"><FaCheck /></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVBuilderPro;

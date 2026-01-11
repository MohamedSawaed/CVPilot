import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sectionDefinitions } from '../data/templates';
import SuggestionBox from '../components/SuggestionBox';
import ResumeScore from '../components/ResumeScore';
import TemplateSelector from '../components/TemplateSelector';
import SkillsManager from '../components/SkillsManager';
import SectionManager from '../components/SectionManager';
import CVTemplateElegant from '../components/CVTemplateElegant';
import CVTemplateBold from '../components/CVTemplateBold';
import CVTemplateClassic from '../components/CVTemplateClassic';
import CVTemplateATS from '../components/CVTemplateATS';
import CVTemplateExecutive from '../components/CVTemplateExecutive';
import CVTemplateMinimal from '../components/CVTemplateMinimal';
import CVTemplateTech from '../components/CVTemplateTech';
import CVTemplateLuxe from '../components/CVTemplateLuxe';
import CVTemplateAzure from '../components/CVTemplateAzure';
import CVTemplateNoir from '../components/CVTemplateNoir';
import CVTemplateCoral from '../components/CVTemplateCoral';
import { storage, debounce } from '../utils/storage';
import { generatePDFFromServer } from '../utils/pdfExport';
import {
  generateSummarySuggestions,
  generateExperienceSuggestions,
  generateSkillSuggestions
} from '../utils/aiSuggestions';
import { arrangeCV, getArrangementExplanation } from '../utils/cvArrangement';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  createCV,
  updateCV,
  getCV,
  getUserPaymentStatus,
  setUserPaid
} from '../services/cvService';
import {
  FaChartBar,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaRedo,
  FaFilePdf,
  FaLightbulb,
  FaPalette,
  FaCog,
  FaCheckCircle,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaRocket,
  FaFileCode,
  FaGlobe,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';
import './CVBuilder.css';
import './CVBuilderEnhanced.css';

function CVBuilderEnhanced({ profession: propProfession, userProfile, onStartOver, cvId, isNewCV = true }) {
  const { t, isRTL, setShowLanguageSelector, language } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State for loaded CV data (when editing)
  const [profession, setProfession] = useState(propProfession);
  const [currentCvId, setCurrentCvId] = useState(cvId);
  const [hasPaid, setHasPaid] = useState(false);
  const [loadingCV, setLoadingCV] = useState(!isNewCV);

  const handleLogout = async () => {
    await logout();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Helper function to get translated section title
  const getSectionTitle = (sectionKey) => {
    const sectionTitleKeys = {
      personalInfo: 'personalInfo',
      summary: 'summary',
      experience: 'experience',
      education: 'education',
      skills: 'skills',
      certifications: 'certifications',
      projects: 'projects',
      achievements: 'achievements',
      publications: 'publications',
      licenses: 'licenses',
      portfolio: 'portfolio'
    };
    return t(sectionTitleKeys[sectionKey]) || sectionDefinitions[sectionKey]?.title || sectionKey;
  };

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
    skills: {
      technicalSkills: [],
      softSkills: [],
      languages: []
    },
    certifications: [],
    projects: [],
    achievements: [],
    publications: [],
    licenses: [],
    portfolio: []
  });

  const [currentSection, setCurrentSection] = useState('personalInfo');
  const [showPreview, setShowPreview] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [templateStyle, setTemplateStyle] = useState('elegant');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [arrangementInfo, setArrangementInfo] = useState(null);
  const [showArrangementInfo, setShowArrangementInfo] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showSectionManager, setShowSectionManager] = useState(false);
  const [activeSections, setActiveSections] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState(null);
  const [paymentStep, setPaymentStep] = useState('pricing'); // 'pricing', 'payment', 'complete'
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Ref to track if CV creation is in progress (prevents duplicate creates)
  const creatingCvRef = React.useRef(false);
  const cvIdRef = React.useRef(cvId || null); // Store cvId in ref for immediate access

  // Smart section arrangement based on user profile
  const arrangedSections = arrangeCV(profession, userProfile);
  const sections = activeSections || arrangedSections;

  // Get arrangement explanation on mount
  useEffect(() => {
    const info = getArrangementExplanation(profession, userProfile);
    setArrangementInfo(info);
    setShowArrangementInfo(true); // Show on first load

    // Auto-hide after 10 seconds
    const timer = setTimeout(() => {
      setShowArrangementInfo(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [profession, userProfile]);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = debounce(() => {
      storage.autoSave(cvData, profession, userProfile);
      setSaveStatus('Saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 2000);

    if (cvData.personalInfo.fullName || cvData.summary) {
      autoSave();
    }
  }, [cvData, profession, userProfile]);

  // Load CV data - either from Firestore (editing) or local storage (new)
  useEffect(() => {
    const loadData = async () => {
      // Check payment status
      if (user) {
        const { hasPaid: paid } = await getUserPaymentStatus(user.uid);
        setHasPaid(paid);
      }

      // If editing existing CV, load from Firestore
      if (cvId && !isNewCV) {
        setLoadingCV(true);
        const { cv, error } = await getCV(cvId);
        if (cv && !error) {
          setCvData(cv.cvData);
          setProfession(cv.profession);
          setCurrentCvId(cv.id);
        } else {
          // CV not found, redirect to dashboard
          navigate('/');
        }
        setLoadingCV(false);
      } else if (profession) {
        // New CV - check for local draft
        const savedData = storage.loadAutoSave();
        if (savedData && savedData.profession?.id === profession?.id) {
          const shouldLoad = window.confirm('We found a saved draft. Would you like to continue where you left off?');
          if (shouldLoad) {
            setCvData(savedData.cvData);
          }
        }
      }
    };

    loadData();
  }, [cvId, isNewCV, user]);

  // Calculate completion percentage
  useEffect(() => {
    const calculateCompletion = () => {
      let totalFields = 0;
      let filledFields = 0;

      // Personal Info
      totalFields += 6;
      const personalInfo = cvData.personalInfo;
      if (personalInfo.fullName) filledFields++;
      if (personalInfo.email) filledFields++;
      if (personalInfo.phone) filledFields++;
      if (personalInfo.location) filledFields++;
      if (personalInfo.linkedin) filledFields++;
      if (personalInfo.website) filledFields++;

      // Summary
      totalFields += 1;
      if (cvData.summary && cvData.summary.length >= 50) filledFields++;

      // Experience
      totalFields += 2;
      if (cvData.experience.length > 0) filledFields++;
      if (cvData.experience.some(exp => exp.description && exp.description.length > 50)) filledFields++;

      // Education
      totalFields += 1;
      if (cvData.education.length > 0) filledFields++;

      // Skills
      totalFields += 1;
      if ((cvData.skills.technicalSkills?.filter(s => s).length || 0) >= 3) filledFields++;

      const percentage = Math.round((filledFields / totalFields) * 100);
      setCompletionPercentage(percentage);

      // Mark as complete if percentage is >= 60% (minimum viable resume)
      setIsComplete(percentage >= 60);
    };

    calculateCompletion();
  }, [cvData]);

  const handleFieldChange = (section, field, value, index = null) => {
    setCvData(prev => {
      const newData = { ...prev };

      if (index !== null) {
        const newArray = [...newData[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        newData[section] = newArray;
      } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
        newData[section] = { ...newData[section], [field]: value };
      } else {
        newData[section] = value;
      }

      return newData;
    });

    generateAdvancedSuggestions(section, field, value, index);
  };

  const generateAdvancedSuggestions = (section, field, value, index) => {
    const newSuggestions = [];
    const aiSuggs = [];

    // Basic suggestions
    if (section === 'summary' && value) {
      const summaryAI = generateSummarySuggestions(value, profession, userProfile);
      summaryAI.forEach(sugg => {
        aiSuggs.push({
          type: sugg.priority === 'high' ? 'warning' : 'suggestion',
          message: sugg.message,
          example: sugg.example
        });
      });
    }

    if (section === 'experience' && field === 'description' && value) {
      const expAI = generateExperienceSuggestions(value, cvData.experience[index]?.jobTitle, profession);
      expAI.forEach(sugg => {
        aiSuggs.push({
          type: sugg.priority === 'high' ? 'warning' : 'suggestion',
          message: sugg.message,
          examples: sugg.examples || [sugg.example]
        });
      });
    }

    if (section === 'skills') {
      const skillAI = generateSkillSuggestions(cvData.skills, profession);
      skillAI.forEach(sugg => {
        aiSuggs.push({
          type: 'suggestion',
          message: sugg.message,
          skills: sugg.skills
        });
      });
    }

    // Add profession-specific tips
    const tips = profession.tips[section];
    if (tips && value) {
      newSuggestions.push({
        type: 'tip',
        message: tips
      });
    }

    setSuggestions(newSuggestions);
    setAiSuggestions(aiSuggs);
  };

  const addArrayItem = (section) => {
    setCvData(prev => ({
      ...prev,
      [section]: [...prev[section], {}]
    }));
  };

  const removeArrayItem = (section, index) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setSaveStatus(language === 'ar' ? 'جاري الحفظ...' : 'Saving...');

    try {
      // Check ref first for immediate access to cvId
      const existingCvId = currentCvId || cvIdRef.current;

      if (existingCvId) {
        // Update existing CV
        const title = cvData.personalInfo?.fullName
          ? `${cvData.personalInfo.fullName}'s CV`
          : 'Untitled CV';
        await updateCV(existingCvId, cvData, title);
      } else if (!creatingCvRef.current) {
        // Create new CV only if not already creating
        creatingCvRef.current = true;
        try {
          const { id, error } = await createCV(user.uid, cvData, profession);
          if (id && !error) {
            cvIdRef.current = id;
            setCurrentCvId(id);
          }
        } finally {
          creatingCvRef.current = false;
        }
      }

      // Also save locally as backup
      storage.save(cvData, profession, userProfile);

      setSaveStatus(language === 'ar' ? 'تم الحفظ!' : 'Saved!');
    } catch (error) {
      setSaveStatus(language === 'ar' ? 'فشل الحفظ' : 'Save failed');
    }

    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleDownloadWithFormat = async (format) => {
    // If user hasn't paid and this is a paid download, show payment modal
    if (!hasPaid && format === 'pdf') {
      setPaymentStep('pricing');
      return;
    }

    setDownloadingFormat(format);
    try {
      // Try to save to Firestore in background (don't wait for it)
      if (user) {
        const saveInBackground = async () => {
          try {
            const existingCvId = currentCvId || cvIdRef.current;

            if (existingCvId) {
              const title = cvData.personalInfo?.fullName
                ? `${cvData.personalInfo.fullName}'s CV`
                : 'Untitled CV';
              await Promise.race([
                updateCV(existingCvId, cvData, title),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
              ]);
            } else if (!creatingCvRef.current) {
              // Only create if not already creating
              creatingCvRef.current = true;
              try {
                const result = await Promise.race([
                  createCV(user.uid, cvData, profession),
                  new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
                ]);
                if (result?.id && !result?.error) {
                  cvIdRef.current = result.id;
                  setCurrentCvId(result.id);
                }
              } finally {
                creatingCvRef.current = false;
              }
            }
          } catch (saveError) {
            console.warn('Could not save to cloud:', saveError.message);
          }
        };
        // Don't await - run in background
        saveInBackground();
      }

      // Proceed with download immediately
      if (format === 'pdf') {
        await generatePDFFromServer(cvData, templateStyle, sections, language);
      } else if (format === 'json') {
        storage.exportToJSON(cvData, profession, userProfile);
      }
    } finally {
      setTimeout(() => {
        setDownloadingFormat(null);
      }, 1000);
    }
  };

  // Handle payment completion (simulate payment - just mark as paid and go to download)
  const handlePaymentComplete = async () => {
    if (!user) return;

    // Set paid immediately (local state) - don't wait for Firestore
    setHasPaid(true);

    // Try Firestore saves in background with timeout (don't block UI)
    const savePromise = async () => {
      try {
        await Promise.race([
          setUserPaid(user.uid),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
        ]);
      } catch (error) {
        console.warn('Could not save payment status:', error.message);
      }

      try {
        const existingCvId = currentCvId || cvIdRef.current;

        if (existingCvId) {
          await Promise.race([
            updateCV(existingCvId, cvData, cvData.personalInfo?.fullName ? `${cvData.personalInfo.fullName}'s CV` : 'Untitled CV'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
          ]);
        } else if (!creatingCvRef.current) {
          creatingCvRef.current = true;
          try {
            const result = await Promise.race([
              createCV(user.uid, cvData, profession),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
            ]);
            if (result?.id && !result?.error) {
              cvIdRef.current = result.id;
              setCurrentCvId(result.id);
            }
          } finally {
            creatingCvRef.current = false;
          }
        }
      } catch (error) {
        console.warn('Could not save CV:', error.message);
      }
    };

    // Run in background, don't await
    savePromise();

    // Go directly to download options
    setPaymentStep('complete');
  };

  const handleDownloadAfterPayment = async () => {
    setDownloadingFormat('pdf');
    try {
      await generatePDFFromServer(cvData, templateStyle, sections, language);
    } finally {
      setTimeout(() => {
        setDownloadingFormat(null);
      }, 1000);
    }
  };

  const handleStartOver = () => {
    const message = language === 'ar'
      ? 'هل أنت متأكد أنك تريد البدء من جديد؟ سيتم فقدان جميع البيانات الحالية.'
      : 'Are you sure you want to start over? All current data will be lost.';
    const confirmed = window.confirm(message);
    if (confirmed) {
      storage.clear();
      if (onStartOver) {
        onStartOver();
      } else {
        navigate('/');
      }
    }
  };

  // Show loading state when loading CV from Firestore
  if (loadingCV) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Show error if no profession (when editing, profession comes from CV data)
  if (!profession && !loadingCV) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const renderPersonalInfoSection = () => (
    <div className="form-section">
      <h3>{t('personalInfo')}</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>{t('fullName')} *</label>
          <input
            type="text"
            value={cvData.personalInfo.fullName}
            onChange={(e) => handleFieldChange('personalInfo', 'fullName', e.target.value)}
            placeholder={isRTL ? 'أحمد محمد' : 'John Doe'}
            required
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>
        <div className="form-group">
          <label>{t('email')} *</label>
          <input
            type="email"
            value={cvData.personalInfo.email}
            onChange={(e) => handleFieldChange('personalInfo', 'email', e.target.value)}
            placeholder="example@email.com"
            required
            dir="ltr"
          />
        </div>
        <div className="form-group">
          <label>{t('phone')} *</label>
          <input
            type="tel"
            value={cvData.personalInfo.phone}
            onChange={(e) => handleFieldChange('personalInfo', 'phone', e.target.value)}
            placeholder="+1 234 567 8900"
            required
            dir="ltr"
          />
        </div>
        <div className="form-group">
          <label>{t('location')}</label>
          <input
            type="text"
            value={cvData.personalInfo.location}
            onChange={(e) => handleFieldChange('personalInfo', 'location', e.target.value)}
            placeholder={isRTL ? 'دبي، الإمارات' : 'New York, NY'}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>
        <div className="form-group">
          <label>{t('linkedin')}</label>
          <input
            type="url"
            value={cvData.personalInfo.linkedin}
            onChange={(e) => handleFieldChange('personalInfo', 'linkedin', e.target.value)}
            placeholder="linkedin.com/in/yourname"
            dir="ltr"
          />
        </div>
        <div className="form-group">
          <label>{t('website')}</label>
          <input
            type="url"
            value={cvData.personalInfo.website}
            onChange={(e) => handleFieldChange('personalInfo', 'website', e.target.value)}
            placeholder="www.yoursite.com"
            dir="ltr"
          />
        </div>
      </div>
    </div>
  );

  const renderSummarySection = () => (
    <div className="form-section">
      <h3>{t('summary')}</h3>
      <div className="form-group">
        <label>{t('writeSummary')} *</label>
        <textarea
          value={cvData.summary}
          onChange={(e) => handleFieldChange('summary', null, e.target.value)}
          onFocus={() => generateAdvancedSuggestions('summary', 'summary', cvData.summary)}
          placeholder={`${t('example')}: ${isRTL ? `${profession.name} متخصص مع ${userProfile.yearsInField}+ سنوات من الخبرة...` : `Dedicated ${profession.name} with ${userProfile.yearsInField}+ years of experience...`}`}
          rows="6"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
        <div className="char-count">{cvData.summary.length} {t('characters')}</div>
      </div>
    </div>
  );

  const renderExperienceSection = () => (
    <div className="form-section">
      <h3>{t('experience')}</h3>
      {cvData.experience.map((exp, index) => (
        <div key={index} className="repeatable-item">
          <div className="item-header">
            <h4>{t('position')} {index + 1}</h4>
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeArrayItem('experience', index)}
            >
              {t('remove')}
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('jobTitle')} *</label>
              <input
                type="text"
                value={exp.jobTitle || ''}
                onChange={(e) => handleFieldChange('experience', 'jobTitle', e.target.value, index)}
                placeholder={isRTL ? 'مهندس برمجيات أول' : 'Senior Software Engineer'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="form-group">
              <label>{t('company')} *</label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => handleFieldChange('experience', 'company', e.target.value, index)}
                placeholder={isRTL ? 'شركة التقنية' : 'Tech Corp'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="form-group">
              <label>{t('location')}</label>
              <input
                type="text"
                value={exp.location || ''}
                onChange={(e) => handleFieldChange('experience', 'location', e.target.value, index)}
                placeholder={isRTL ? 'دبي، الإمارات' : 'San Francisco, CA'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="form-group">
              <label>{t('startDate')} *</label>
              <input
                type="month"
                value={exp.startDate || ''}
                onChange={(e) => handleFieldChange('experience', 'startDate', e.target.value, index)}
              />
            </div>
            <div className="form-group">
              <label>{t('endDate')}</label>
              <input
                type="month"
                value={exp.endDate || ''}
                onChange={(e) => handleFieldChange('experience', 'endDate', e.target.value, index)}
                disabled={exp.current}
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={exp.current || false}
                  onChange={(e) => handleFieldChange('experience', 'current', e.target.checked, index)}
                />
                {t('currentlyWorking')}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>{t('descriptionAchievements')} *</label>
            <textarea
              value={exp.description || ''}
              onChange={(e) => handleFieldChange('experience', 'description', e.target.value, index)}
              onFocus={() => generateAdvancedSuggestions('experience', 'description', exp.description || '', index)}
              placeholder={isRTL ? '• قيادة فريق من 5 مطورين\n• زيادة أداء النظام بنسبة 40%\n• تنفيذ خط أنابيب CI/CD' : '• Led a team of 5 developers\n• Increased system performance by 40%\n• Implemented CI/CD pipeline'}
              rows="5"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addArrayItem('experience')}>
        + {t('addExperience')}
      </button>
    </div>
  );

  const renderEducationSection = () => (
    <div className="form-section">
      <h3>{t('education')}</h3>
      {cvData.education.map((edu, index) => (
        <div key={index} className="repeatable-item">
          <div className="item-header">
            <h4>{t('education')} {index + 1}</h4>
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeArrayItem('education', index)}
            >
              {t('remove')}
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('degree')} *</label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => handleFieldChange('education', 'degree', e.target.value, index)}
                placeholder={isRTL ? 'بكالوريوس علوم الحاسوب' : 'Bachelor of Science in Computer Science'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="form-group">
              <label>{t('institution')} *</label>
              <input
                type="text"
                value={edu.institution || ''}
                onChange={(e) => handleFieldChange('education', 'institution', e.target.value, index)}
                placeholder={isRTL ? 'جامعة القاهرة' : 'Stanford University'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="form-group">
              <label>{t('location')}</label>
              <input
                type="text"
                value={edu.location || ''}
                onChange={(e) => handleFieldChange('education', 'location', e.target.value, index)}
                placeholder={isRTL ? 'القاهرة، مصر' : 'Stanford, CA'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="form-group">
              <label>{t('graduationDate')}</label>
              <input
                type="month"
                value={edu.graduationDate || ''}
                onChange={(e) => handleFieldChange('education', 'graduationDate', e.target.value, index)}
              />
            </div>
            <div className="form-group">
              <label>{t('gpa')} ({t('optional')})</label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => handleFieldChange('education', 'gpa', e.target.value, index)}
                placeholder="3.8/4.0"
                dir="ltr"
              />
            </div>
            <div className="form-group">
              <label>{t('honors')} ({t('optional')})</label>
              <input
                type="text"
                value={edu.honors || ''}
                onChange={(e) => handleFieldChange('education', 'honors', e.target.value, index)}
                placeholder={isRTL ? 'بامتياز مع مرتبة الشرف' : 'Summa Cum Laude'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addArrayItem('education')}>
        + {t('addEducation')}
      </button>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="form-section">
      <h3>💻 {t('skills')}</h3>
      <SkillsManager
        skills={cvData.skills}
        onChange={(updatedSkills) => {
          setCvData({ ...cvData, skills: updatedSkills });
        }}
        suggestions={profession.suggestedSkills || []}
      />
    </div>
  );

  const renderCertificationsSection = () => (
    <div className="form-section">
      <h3>📜 {t('certifications')}</h3>
      {cvData.certifications.map((cert, index) => (
        <div key={index} className="repeatable-item">
          <div className="item-header">
            <h4>{t('certification')} {index + 1}</h4>
            <button type="button" className="remove-btn" onClick={() => removeArrayItem('certifications', index)}>{t('remove')}</button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('certificationName')} *</label>
              <input type="text" value={cert.certification || ''} onChange={(e) => handleFieldChange('certifications', 'certification', e.target.value, index)} placeholder={isRTL ? 'شهادة AWS' : 'AWS Certified Solutions Architect'} dir={isRTL ? 'rtl' : 'ltr'} />
            </div>
            <div className="form-group">
              <label>{t('issuingOrganization')} *</label>
              <input type="text" value={cert.issuer || ''} onChange={(e) => handleFieldChange('certifications', 'issuer', e.target.value, index)} placeholder={isRTL ? 'أمازون ويب سيرفيسز' : 'Amazon Web Services'} dir={isRTL ? 'rtl' : 'ltr'} />
            </div>
            <div className="form-group">
              <label>{t('issueDate')}</label>
              <input type="month" value={cert.date || ''} onChange={(e) => handleFieldChange('certifications', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>{t('expiryDate')} ({t('ifApplicable')})</label>
              <input type="month" value={cert.expiryDate || ''} onChange={(e) => handleFieldChange('certifications', 'expiryDate', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>{t('credentialId')}</label>
              <input type="text" value={cert.credentialId || ''} onChange={(e) => handleFieldChange('certifications', 'credentialId', e.target.value, index)} placeholder="ABC123XYZ" dir="ltr" />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addArrayItem('certifications')}>+ {t('addCertification')}</button>
    </div>
  );

  const renderProjectsSection = () => (
    <div className="form-section">
      <h3>🚀 {t('projects')}</h3>
      {cvData.projects.map((project, index) => (
        <div key={index} className="repeatable-item">
          <div className="item-header">
            <h4>{t('project')} {index + 1}</h4>
            <button type="button" className="remove-btn" onClick={() => removeArrayItem('projects', index)}>{t('remove')}</button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('projectName')} *</label>
              <input type="text" value={project.projectName || ''} onChange={(e) => handleFieldChange('projects', 'projectName', e.target.value, index)} placeholder={isRTL ? 'منصة التجارة الإلكترونية' : 'E-commerce Platform'} dir={isRTL ? 'rtl' : 'ltr'} />
            </div>
            <div className="form-group">
              <label>{t('yourRole')}</label>
              <input type="text" value={project.role || ''} onChange={(e) => handleFieldChange('projects', 'role', e.target.value, index)} placeholder={isRTL ? 'المطور الرئيسي' : 'Lead Developer'} dir={isRTL ? 'rtl' : 'ltr'} />
            </div>
            <div className="form-group">
              <label>{t('duration')}</label>
              <input type="text" value={project.duration || ''} onChange={(e) => handleFieldChange('projects', 'duration', e.target.value, index)} placeholder={isRTL ? '6 أشهر' : '6 months'} dir={isRTL ? 'rtl' : 'ltr'} />
            </div>
            <div className="form-group">
              <label>{t('technologiesUsed')}</label>
              <input type="text" value={project.technologies || ''} onChange={(e) => handleFieldChange('projects', 'technologies', e.target.value, index)} placeholder="React, Node.js, MongoDB" dir="ltr" />
            </div>
          </div>
          <div className="form-group">
            <label>{t('description')} *</label>
            <textarea value={project.description || ''} onChange={(e) => handleFieldChange('projects', 'description', e.target.value, index)} placeholder={isRTL ? 'صف المشروع ومساهماتك...' : 'Describe the project and your contributions...'} rows="4" dir={isRTL ? 'rtl' : 'ltr'} />
          </div>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addArrayItem('projects')}>+ {t('addProject')}</button>
    </div>
  );

  const renderAchievementsSection = () => (
    <div className="form-section">
      <h3>🏆 {t('achievements')}</h3>
      {cvData.achievements.map((achievement, index) => (
        <div key={index} className="repeatable-item">
          <div className="item-header">
            <h4>{t('achievement')} {index + 1}</h4>
            <button type="button" className="remove-btn" onClick={() => removeArrayItem('achievements', index)}>{t('remove')}</button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('achievementTitle')} *</label>
              <input type="text" value={achievement.achievement || ''} onChange={(e) => handleFieldChange('achievements', 'achievement', e.target.value, index)} placeholder={isRTL ? 'موظف العام' : 'Employee of the Year'} dir={isRTL ? 'rtl' : 'ltr'} />
            </div>
            <div className="form-group">
              <label>{t('issuingOrganization')}</label>
              <input type="text" value={achievement.issuer || ''} onChange={(e) => handleFieldChange('achievements', 'issuer', e.target.value, index)} placeholder={isRTL ? 'اسم الشركة' : 'Company Name'} dir={isRTL ? 'rtl' : 'ltr'} />
            </div>
            <div className="form-group">
              <label>{t('date')}</label>
              <input type="month" value={achievement.date || ''} onChange={(e) => handleFieldChange('achievements', 'date', e.target.value, index)} />
            </div>
          </div>
          <div className="form-group">
            <label>{t('description')}</label>
            <textarea value={achievement.description || ''} onChange={(e) => handleFieldChange('achievements', 'description', e.target.value, index)} placeholder={isRTL ? 'صف الإنجاز...' : 'Describe the achievement...'} rows="3" dir={isRTL ? 'rtl' : 'ltr'} />
          </div>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={() => addArrayItem('achievements')}>+ {t('addAchievement')}</button>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'personalInfo':
        return renderPersonalInfoSection();
      case 'summary':
        return renderSummarySection();
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      case 'skills':
        return renderSkillsSection();
      case 'certifications':
        return renderCertificationsSection();
      case 'projects':
        return renderProjectsSection();
      case 'achievements':
        return renderAchievementsSection();
      case 'licenses':
        return renderCertificationsSection(); // Same structure as certifications
      case 'publications':
        return renderAchievementsSection(); // Similar structure
      case 'portfolio':
        return renderProjectsSection(); // Similar structure
      default:
        return <div className="coming-soon">
          <h3>📝 {sectionDefinitions[currentSection]?.title || currentSection}</h3>
          <p>This section is available and ready to use!</p>
        </div>;
    }
  };

  const goToNextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
      setSuggestions([]);
      setAiSuggestions([]);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
      setSuggestions([]);
      setAiSuggestions([]);
    }
  };

  const isLastSection = sections.indexOf(currentSection) === sections.length - 1;
  const isFirstSection = sections.indexOf(currentSection) === 0;
  const currentSectionIndex = sections.indexOf(currentSection);

  return (
    <div className={`cv-builder ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="builder-header-enhanced">
        <div className="header-left">
          <h2>{profession.icon} {profession.name} {t('resume')}</h2>
          <div className="completion-bar">
            <div className="completion-fill" style={{ width: `${completionPercentage}%` }}></div>
          </div>
          <div className="completion-text">{completionPercentage}% {t('complete')}</div>
        </div>

        <div className="header-actions-redesigned">
          {saveStatus && <span className="save-status-badge">{saveStatus}</span>}

          {/* Language Button */}
          <button
            className="tool-btn language-btn"
            onClick={() => setShowLanguageSelector(true)}
            title="Change Language"
          >
            <FaGlobe />
            <span>{language === 'en' ? 'EN' : language === 'ar' ? 'ع' : 'עב'}</span>
          </button>

          {/* Left Button Group - Tools */}
          <div className="btn-group tools-group">
            <button
              className={`tool-btn ${showSectionManager ? 'active' : ''}`}
              onClick={() => setShowSectionManager(!showSectionManager)}
              title={t('sections')}
            >
              <FaCog />
              <span>{t('sections')}</span>
            </button>
            <button
              className={`tool-btn ${showScore ? 'active' : ''}`}
              onClick={() => setShowScore(!showScore)}
              title={t('score')}
            >
              <FaChartBar />
              <span>{t('score')}</span>
            </button>
            <button
              className={`tool-btn ${showTemplateSelector ? 'active' : ''}`}
              onClick={() => setShowTemplateSelector(!showTemplateSelector)}
              title={t('template')}
            >
              <FaPalette />
              <span>{t('template')}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="header-divider"></div>

          {/* Center Button Group - Actions */}
          <div className="btn-group actions-group">
            <button
              className="action-btn save-btn"
              onClick={handleSave}
              title={t('save')}
            >
              <FaSave />
              <span>{t('save')}</span>
            </button>
            <button
              className={`action-btn preview-btn ${showPreview ? 'active' : ''}`}
              onClick={() => setShowPreview(!showPreview)}
              disabled={!isComplete}
              title={!isComplete ? `${Math.max(0, 60 - completionPercentage)}% ${t('moreToUnlock')}` : showPreview ? t('hide') : t('preview')}
            >
              {showPreview ? <FaEyeSlash /> : <FaEye />}
              <span>{showPreview ? t('hide') : t('preview')}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="header-divider"></div>

          {/* Right Button Group - Reset */}
          <button className="reset-btn" onClick={handleStartOver} title={t('reset')}>
            <FaRedo />
            <span>{t('reset')}</span>
          </button>

          {/* User Info & Navigation */}
          <div className="header-divider"></div>
          <div className="user-section">
            {user && (
              <span className="user-name">{user.displayName || user.email?.split('@')[0]}</span>
            )}
            <button className="home-btn" onClick={handleGoHome} title={language === 'ar' ? 'الرئيسية' : 'Dashboard'}>
              <FaHome />
              <span>{language === 'ar' ? 'الرئيسية' : language === 'he' ? 'ראשי' : 'Home'}</span>
            </button>
            <button className="logout-btn" onClick={handleLogout} title={language === 'ar' ? 'تسجيل الخروج' : 'Logout'}>
              <FaSignOutAlt />
              <span>{language === 'ar' ? 'خروج' : language === 'he' ? 'יציאה' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </div>

      {showScore && (
        <div className="score-panel">
          <ResumeScore cvData={cvData} profession={profession} />
        </div>
      )}

      {showSectionManager && (
        <div className="template-selector-panel">
          <div className="panel-header">
            <h3>Manage CV Sections</h3>
            <button className="close-panel-btn" onClick={() => setShowSectionManager(false)}>✕</button>
          </div>
          <SectionManager
            activeSections={sections}
            onUpdateSections={(newSections) => {
              setActiveSections(newSections);
              // If current section is no longer active, switch to first section
              if (!newSections.includes(currentSection)) {
                setCurrentSection(newSections[0]);
              }
            }}
            allSectionKeys={Object.keys(sectionDefinitions)}
          />
        </div>
      )}

      {showTemplateSelector && (
        <div className="template-selector-panel">
          <div className="panel-header">
            <h3>Choose Your Template</h3>
            <button className="close-panel-btn" onClick={() => setShowTemplateSelector(false)}>✕</button>
          </div>
          <TemplateSelector
            selectedTemplate={templateStyle}
            onTemplateChange={(newTemplate) => {
              setTemplateStyle(newTemplate);
              setShowTemplateSelector(false);
            }}
            language={language}
          />
        </div>
      )}

      {showArrangementInfo && arrangementInfo && (
        <div className="arrangement-info-panel">
          <div className="arrangement-info-content">
            <button
              className="arrangement-close-btn"
              onClick={() => setShowArrangementInfo(false)}
            >
              ✕
            </button>
            <div className="arrangement-icon">🎯</div>
            <h3>{t(arrangementInfo.titleKey)}</h3>
            <p className="arrangement-reason">{t(arrangementInfo.reasonKey)}</p>
            <div className="arrangement-tips">
              <h4>{t('tipsForSuccess')}</h4>
              <ul>
                {arrangementInfo.tipKeys && arrangementInfo.tipKeys.map((tipKey, index) => (
                  <li key={index}>{t(tipKey)}</li>
                ))}
              </ul>
            </div>
            <button
              className="arrangement-understand-btn"
              onClick={() => setShowArrangementInfo(false)}
            >
              {t('gotItLetsBuild')}
            </button>
          </div>
        </div>
      )}

      {!isComplete && completionPercentage > 0 && (
        <div className="completion-notice">
          <div className="notice-content">
            <span className="notice-icon"><FaLightbulb /></span>
            <span className="notice-text">{t('complete')} {Math.max(0, 60 - completionPercentage)}% {t('moreToUnlock')}</span>
            <div className="mini-progress">
              <div className="mini-progress-fill" style={{ width: `${(completionPercentage / 60) * 100}%` }}></div>
            </div>
          </div>
        </div>
      )}

      <div className={`builder-content ${showPreview ? 'with-preview' : ''}`}>
        <div className="builder-main">
          <div className="section-navigation">
            {sections.map((section) => (
              <button
                key={section}
                className={`section-nav-btn ${currentSection === section ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSection(section);
                  setSuggestions([]);
                  setAiSuggestions([]);
                }}
              >
                <span className="section-icon">
                  {sectionDefinitions[section]?.icon
                    ? React.createElement(sectionDefinitions[section].icon, { size: 20 })
                    : '📄'}
                </span>
                <span className="section-name">
                  {getSectionTitle(section)}
                </span>
              </button>
            ))}
          </div>

          <div className="form-container">
            {renderCurrentSection()}

            {suggestions.length > 0 && (
              <SuggestionBox suggestions={suggestions} />
            )}

            {aiSuggestions.length > 0 && (
              <div className="ai-suggestions-box">
                <h4>🤖 AI-Powered Suggestions</h4>
                {aiSuggestions.map((sugg, index) => (
                  <div key={index} className="ai-suggestion-item">
                    <p className="ai-message">{sugg.message}</p>
                    {sugg.examples && (
                      <div className="ai-examples">
                        {sugg.examples.map((ex, i) => (
                          <span key={i} className="example-chip">{ex}</span>
                        ))}
                      </div>
                    )}
                    {sugg.skills && (
                      <div className="ai-examples">
                        {sugg.skills.map((skill, i) => (
                          <span key={i} className="example-chip">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="form-navigation-enhanced">
              {/* Progress Indicator */}
              <div className="nav-progress">
                <span className="nav-step">{t('step')} {currentSectionIndex + 1} {t('of')} {sections.length}</span>
                <div className="nav-dots">
                  {sections.map((_, idx) => (
                    <span
                      key={idx}
                      className={`nav-dot ${idx === currentSectionIndex ? 'active' : ''} ${idx < currentSectionIndex ? 'completed' : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="nav-buttons">
                <button
                  type="button"
                  className="nav-btn-enhanced secondary"
                  onClick={goToPreviousSection}
                  disabled={isFirstSection}
                >
                  {isRTL ? <FaArrowRight /> : <FaArrowLeft />}
                  <span>{t('previous')}</span>
                </button>

                {isLastSection ? (
                  <button
                    type="button"
                    className={`nav-btn-enhanced finish ${isComplete ? 'ready' : 'not-ready'}`}
                    onClick={() => {
                      if (isComplete) {
                        // If user has paid, go directly to download options
                        // Otherwise show pricing
                        setPaymentStep(hasPaid ? 'complete' : 'pricing');
                        setShowDownloadModal(true);
                      }
                    }}
                    disabled={!isComplete}
                    title={!isComplete ? `${Math.max(0, 60 - completionPercentage)}% ${t('moreToFinish')}` : t('downloadYourCv')}
                  >
                    <FaRocket />
                    <span>{isComplete ? t('finishDownload') : `${completionPercentage}% ${t('complete')}`}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="nav-btn-enhanced primary"
                    onClick={goToNextSection}
                  >
                    <span>{t('next')}</span>
                    {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {showPreview && (
          <div className="preview-panel-enhanced">
            <div className="preview-header">
              <span className="preview-template-name">
                {templateStyle === 'elegant' && `Elegant ${t('template')}`}
                {templateStyle === 'bold' && `Bold ${t('template')}`}
                {templateStyle === 'classic' && `${t('classic')} ${t('template')}`}
                {templateStyle === 'ats' && `${t('atsFriendly')} ${t('template')}`}
                {templateStyle === 'executive' && `Executive ${t('template')}`}
                {templateStyle === 'minimal' && `Minimal ${t('template')}`}
                {templateStyle === 'tech' && `Tech ${t('template')}`}
                {templateStyle === 'luxe' && `Luxe ${t('template')}`}
                {templateStyle === 'azure' && `Azure ${t('template')}`}
                {templateStyle === 'noir' && `Noir ${t('template')}`}
                {templateStyle === 'coral' && `Coral ${t('template')}`}
              </span>
              <button
                className="change-template-btn"
                onClick={() => setShowTemplateSelector(true)}
              >
                <FaPalette /> {t('change')} {t('template')}
              </button>
            </div>
            {templateStyle === 'elegant' && (
              <CVTemplateElegant
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'bold' && (
              <CVTemplateBold
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'classic' && (
              <CVTemplateClassic
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'ats' && (
              <CVTemplateATS
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'executive' && (
              <CVTemplateExecutive
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'minimal' && (
              <CVTemplateMinimal
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'tech' && (
              <CVTemplateTech
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'luxe' && (
              <CVTemplateLuxe
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'azure' && (
              <CVTemplateAzure
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'noir' && (
              <CVTemplateNoir
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
            {templateStyle === 'coral' && (
              <CVTemplateCoral
                cvData={cvData}
                sections={sections}
                sectionDefinitions={sectionDefinitions}
              />
            )}
          </div>
        )}
      </div>

      {/* Download Modal with Payment */}
      {showDownloadModal && (
        <div className="download-modal-overlay" onClick={() => {
          setShowDownloadModal(false);
          setPaymentStep('pricing');
          setSelectedPlan(null);
        }}>
          <div className="download-modal payment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => {
              setShowDownloadModal(false);
              setPaymentStep('pricing');
              setSelectedPlan(null);
            }}>
              <FaTimes />
            </button>

            {/* Step 1: Pricing */}
            {paymentStep === 'pricing' && (
              <>
                <div className="modal-header">
                  <div className="modal-icon success">
                    <FaCheckCircle />
                  </div>
                  <h2>{t('yourCvReady')}</h2>
                  <p>{t('choosePlan')}</p>
                </div>

                <div className="pricing-options">
                  <div
                    className={`pricing-card ${selectedPlan === 'basic' ? 'selected' : ''}`}
                    onClick={() => setSelectedPlan('basic')}
                  >
                    <div className="pricing-header">
                      <h3>{t('basic')}</h3>
                      <div className="pricing-price">
                        <span className="price-amount">$4.99</span>
                        <span className="price-period">{t('oneTime')}</span>
                      </div>
                    </div>
                    <ul className="pricing-features">
                      <li><FaCheckCircle /> {t('pdfDownload')}</li>
                      <li><FaCheckCircle /> {t('oneTemplate')}</li>
                      <li><FaCheckCircle /> {t('basicSupport')}</li>
                    </ul>
                  </div>

                  <div
                    className={`pricing-card popular ${selectedPlan === 'pro' ? 'selected' : ''}`}
                    onClick={() => setSelectedPlan('pro')}
                  >
                    <div className="popular-badge">{t('mostPopular')}</div>
                    <div className="pricing-header">
                      <h3>{t('professional')}</h3>
                      <div className="pricing-price">
                        <span className="price-amount">$9.99</span>
                        <span className="price-period">{t('oneTime')}</span>
                      </div>
                    </div>
                    <ul className="pricing-features">
                      <li><FaCheckCircle /> {t('pdfWordDownload')}</li>
                      <li><FaCheckCircle /> {t('allTemplates')}</li>
                      <li><FaCheckCircle /> {t('prioritySupport')}</li>
                      <li><FaCheckCircle /> {t('unlimitedEdits')}</li>
                    </ul>
                  </div>

                  <div
                    className={`pricing-card ${selectedPlan === 'premium' ? 'selected' : ''}`}
                    onClick={() => setSelectedPlan('premium')}
                  >
                    <div className="pricing-header">
                      <h3>{t('premium')}</h3>
                      <div className="pricing-price">
                        <span className="price-amount">$19.99</span>
                        <span className="price-period">{t('oneTime')}</span>
                      </div>
                    </div>
                    <ul className="pricing-features">
                      <li><FaCheckCircle /> {t('allProFeatures')}</li>
                      <li><FaCheckCircle /> {t('aiCoverLetter')}</li>
                      <li><FaCheckCircle /> {t('linkedinOptimization')}</li>
                      <li><FaCheckCircle /> {t('yearUpdates')}</li>
                    </ul>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="proceed-btn"
                    disabled={!selectedPlan}
                    onClick={() => setPaymentStep('payment')}
                  >
                    {selectedPlan ? `${t('continueWith')} ${t(selectedPlan)}` : t('selectPlan')}
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Payment */}
            {paymentStep === 'payment' && (
              <>
                <div className="modal-header">
                  <h2>{t('paymentDetails')}</h2>
                  <p>{t('completePurchase')}</p>
                </div>

                <div className="payment-summary">
                  <div className="summary-row">
                    <span>{t('plan')}:</span>
                    <strong>{t(selectedPlan)}</strong>
                  </div>
                  <div className="summary-row total">
                    <span>{t('total')}:</span>
                    <strong>
                      {selectedPlan === 'basic' && '$4.99'}
                      {selectedPlan === 'pro' && '$9.99'}
                      {selectedPlan === 'premium' && '$19.99'}
                    </strong>
                  </div>
                </div>

                <div className="payment-form">
                  <div className="form-group">
                    <label>{t('cardNumber')}</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('expiryDate')}</label>
                      <input type="text" placeholder="MM/YY" maxLength="5" />
                    </div>
                    <div className="form-group">
                      <label>{t('cvv')}</label>
                      <input type="text" placeholder="123" maxLength="4" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('cardholderName')}</label>
                    <input type="text" placeholder="John Doe" />
                  </div>
                </div>

                <div className="payment-methods">
                  <span>{t('securePayment')}</span>
                  <div className="payment-icons">
                    <span className="payment-icon">Visa</span>
                    <span className="payment-icon">Mastercard</span>
                    <span className="payment-icon">PayPal</span>
                  </div>
                </div>

                <div className="modal-footer payment-footer">
                  <button
                    className="back-btn"
                    onClick={() => setPaymentStep('pricing')}
                  >
                    {isRTL ? <FaArrowRight /> : <FaArrowLeft />} {t('back')}
                  </button>
                  <button
                    className="pay-btn"
                    onClick={handlePaymentComplete}
                  >
                    {t('payNow')}
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Download (after payment) */}
            {paymentStep === 'complete' && (
              <>
                <div className="modal-header">
                  <div className="modal-icon success">
                    <FaCheckCircle />
                  </div>
                  <h2>{t('paymentSuccessful')}</h2>
                  <p>{t('chooseFormat')}</p>
                </div>

                <div className="download-options">
                  <button
                    className={`download-option pdf-option ${downloadingFormat === 'pdf' ? 'downloading' : ''}`}
                    onClick={() => handleDownloadWithFormat('pdf')}
                    disabled={downloadingFormat !== null}
                  >
                    <div className="option-icon">
                      <FaFilePdf />
                    </div>
                    <div className="option-content">
                      <h3>{t('pdfDocument')}</h3>
                      <p>{t('pdfDesc')}</p>
                    </div>
                    <div className="option-badge recommended">{t('recommended')}</div>
                    {downloadingFormat === 'pdf' && <div className="download-spinner"></div>}
                  </button>

                  <button
                    className={`download-option json-option ${downloadingFormat === 'json' ? 'downloading' : ''}`}
                    onClick={() => handleDownloadWithFormat('json')}
                    disabled={downloadingFormat !== null}
                  >
                    <div className="option-icon">
                      <FaFileCode />
                    </div>
                    <div className="option-content">
                      <h3>{t('jsonData')}</h3>
                      <p>{t('jsonDesc')}</p>
                    </div>
                    {downloadingFormat === 'json' && <div className="download-spinner"></div>}
                  </button>
                </div>

                <div className="modal-footer">
                  <div className="template-preview-mini">
                    <span>{t('currentTemplate')}:</span>
                    <strong>
                      {templateStyle === 'elegant' && 'Elegant'}
                      {templateStyle === 'bold' && 'Bold'}
                      {templateStyle === 'classic' && t('classic')}
                      {templateStyle === 'ats' && t('atsFriendly')}
                      {templateStyle === 'executive' && 'Executive'}
                      {templateStyle === 'minimal' && 'Minimal'}
                      {templateStyle === 'tech' && 'Tech'}
                      {templateStyle === 'luxe' && 'Luxe'}
                      {templateStyle === 'azure' && 'Azure'}
                      {templateStyle === 'noir' && 'Noir'}
                      {templateStyle === 'coral' && 'Coral'}
                    </strong>
                    <button
                      className="change-template-link"
                      onClick={() => {
                        setShowDownloadModal(false);
                        setShowTemplateSelector(true);
                        setPaymentStep('pricing');
                        setSelectedPlan(null);
                      }}
                    >
                      {t('change')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CVBuilderEnhanced;

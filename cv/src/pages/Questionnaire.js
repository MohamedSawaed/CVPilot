import React, { useState } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import './Questionnaire.css';

// Experience levels with translation keys
const experienceLevelKeys = [
  { value: '0-2', labelKey: 'entryLevelYears' },
  { value: '3-5', labelKey: 'midLevelYears' },
  { value: '6-10', labelKey: 'seniorLevelYears' },
  { value: '10+', labelKey: 'expertLevelYears' }
];

// Degree types with translation keys
const degreeTypeKeys = [
  { value: 'highschool', labelKey: 'highSchoolDiploma' },
  { value: 'associate', labelKey: 'associateDegree' },
  { value: 'bachelor', labelKey: 'bachelorDegree' },
  { value: 'master', labelKey: 'masterDegree' },
  { value: 'phd', labelKey: 'phdDegree' },
  { value: 'professional', labelKey: 'professionalDegree' },
  { value: 'certificate', labelKey: 'professionalCertificate' }
];

function Questionnaire({ profession, onComplete }) {
  const { t, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    experienceLevel: '',
    degree: '',
    yearsInField: '',
    currentRole: '',
    careerGoal: '',
    // New section-specific questions
    hasPublications: false,
    hasProjects: false,
    hasCertifications: false,
    hasAchievements: false,
    hasLicenses: false,
    hasPortfolio: false,
    focusArea: '' // What should be emphasized: 'education', 'experience', 'skills', 'achievements'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  const isStep1Valid = formData.experienceLevel && formData.degree && formData.yearsInField;
  const isStep2Valid = formData.focusArea;

  const renderStep1 = () => (
    <>
      <div className="step-header">
        <h3 className="step-title">{t('aboutYourBackground')}</h3>
        <p className="step-subtitle">{t('tellUsExperience')}</p>
      </div>

      <div className="form-section">
        <label className="form-label">
          {t('yearsOfExperienceQuestion')}
          <span className="required">*</span>
        </label>
        <div className="radio-group">
          {experienceLevelKeys.map(level => (
            <label key={level.value} className="radio-label">
              <input
                type="radio"
                name="experienceLevel"
                value={level.value}
                checked={formData.experienceLevel === level.value}
                onChange={(e) => handleChange('experienceLevel', e.target.value)}
              />
              <span className="radio-custom"></span>
              {t(level.labelKey)}
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <label className="form-label">
          {t('highestDegree')}
          <span className="required">*</span>
        </label>
        <select
          className="form-select"
          value={formData.degree}
          onChange={(e) => handleChange('degree', e.target.value)}
        >
          <option value="">{t('selectDegree')}</option>
          {degreeTypeKeys.map(degree => (
            <option key={degree.value} value={degree.value}>
              {t(degree.labelKey)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-section">
        <label className="form-label">
          {t('exactYears')}
          <span className="required">*</span>
        </label>
        <input
          type="number"
          className="form-input"
          placeholder={t('enterYears')}
          value={formData.yearsInField}
          onChange={(e) => handleChange('yearsInField', e.target.value)}
          min="0"
          max="50"
        />
      </div>

      <div className="form-section">
        <label className="form-label">
          {t('currentRoleQuestion')}
        </label>
        <input
          type="text"
          className="form-input"
          placeholder={isRTL ? `مثال: ${profession.name} أول` : `e.g., Senior ${profession.name}`}
          value={formData.currentRole}
          onChange={(e) => handleChange('currentRole', e.target.value)}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>

      <div className="form-section">
        <label className="form-label">
          {t('careerGoalOptional')}
        </label>
        <textarea
          className="form-textarea"
          placeholder={t('describeGoal')}
          value={formData.careerGoal}
          onChange={(e) => handleChange('careerGoal', e.target.value)}
          rows="4"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="submit-btn"
          onClick={handleNext}
          disabled={!isStep1Valid}
        >
          {t('continueToPreferences')}
        </button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="step-header">
        <h3 className="step-title">{t('contentToInclude')}</h3>
        <p className="step-subtitle">{t('arrangeOptimally')}</p>
      </div>

      <div className="form-section">
        <label className="form-label">
          {t('whatToEmphasize')}
          <span className="required">*</span>
        </label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="focusArea"
              value="education"
              checked={formData.focusArea === 'education'}
              onChange={(e) => handleChange('focusArea', e.target.value)}
            />
            <span className="radio-custom"></span>
            <div>
              <strong>{t('educationQualifications')}</strong>
              <p className="radio-description">{t('educationDesc')}</p>
            </div>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="focusArea"
              value="experience"
              checked={formData.focusArea === 'experience'}
              onChange={(e) => handleChange('focusArea', e.target.value)}
            />
            <span className="radio-custom"></span>
            <div>
              <strong>{t('workExperienceFocus')}</strong>
              <p className="radio-description">{t('workExperienceDesc')}</p>
            </div>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="focusArea"
              value="skills"
              checked={formData.focusArea === 'skills'}
              onChange={(e) => handleChange('focusArea', e.target.value)}
            />
            <span className="radio-custom"></span>
            <div>
              <strong>{t('skillsExpertise')}</strong>
              <p className="radio-description">{t('skillsDesc')}</p>
            </div>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="focusArea"
              value="achievements"
              checked={formData.focusArea === 'achievements'}
              onChange={(e) => handleChange('focusArea', e.target.value)}
            />
            <span className="radio-custom"></span>
            <div>
              <strong>{t('achievementsAwards')}</strong>
              <p className="radio-description">{t('achievementsDesc')}</p>
            </div>
          </label>
        </div>
      </div>

      <div className="form-section">
        <label className="form-label">
          {t('whichToInclude')}
        </label>
        <div className="checkbox-group">
          {profession.sections.includes('publications') && (
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.hasPublications}
                onChange={(e) => handleChange('hasPublications', e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              {t('publicationsResearch')}
            </label>
          )}
          {profession.sections.includes('projects') && (
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.hasProjects}
                onChange={(e) => handleChange('hasProjects', e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              {t('projectsPortfolio')}
            </label>
          )}
          {profession.sections.includes('certifications') && (
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.hasCertifications}
                onChange={(e) => handleChange('hasCertifications', e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              {t('certificationsTraining')}
            </label>
          )}
          {profession.sections.includes('achievements') && (
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.hasAchievements}
                onChange={(e) => handleChange('hasAchievements', e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              {t('achievementsAwardsCheck')}
            </label>
          )}
          {profession.sections.includes('licenses') && (
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.hasLicenses}
                onChange={(e) => handleChange('hasLicenses', e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              {t('professionalLicenses')}
            </label>
          )}
          {profession.sections.includes('portfolio') && (
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.hasPortfolio}
                onChange={(e) => handleChange('hasPortfolio', e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              {t('portfolioLinks')}
            </label>
          )}
        </div>
      </div>

      <div className="tip-box">
        <div className="tip-icon">
          <FaLightbulb />
        </div>
        <div>
          <strong>{t('smartArrangement')}</strong> {t('smartArrangementDesc')} {profession.name}.
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="back-btn"
          onClick={handleBack}
        >
          {t('backBtn')}
        </button>
        <button
          type="submit"
          className="submit-btn"
          disabled={!isStep2Valid}
        >
          {t('startBuilding')}
        </button>
      </div>
    </>
  );

  return (
    <div className={`questionnaire ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="questionnaire-header">
        <div className="profession-badge">
          <span className="profession-icon-large">
            {React.createElement(profession.icon, { size: 60 })}
          </span>
          <h2>{profession.name} {t('resume')}</h2>
        </div>
        <div className="progress-indicator">
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <div className="step-circle">1</div>
              <div className="step-label">{t('backgroundStep')}</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <div className="step-circle">2</div>
              <div className="step-label">{t('preferencesStep')}</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="questionnaire-form">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
      </form>
    </div>
  );
}

export default Questionnaire;

import React, { useState } from 'react';
import { createUniversalProfession } from '../data/templates';
import { FaBriefcase, FaRocket, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import './TemplateSelection.css';

function TemplateSelection({ onSelectProfession }) {
  const { t, isRTL, setShowLanguageSelector, language } = useLanguage();
  const [jobTitle, setJobTitle] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleContinue = () => {
    if (jobTitle.trim()) {
      const profession = createUniversalProfession(jobTitle.trim());
      onSelectProfession(profession);
    }
  };

  const handleSkip = () => {
    // Create a generic profession for users who want to skip
    const profession = createUniversalProfession('Professional');
    onSelectProfession(profession);
  };

  return (
    <div className={`template-selection universal-mode ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Language Toggle Button */}
      <button
        className="language-toggle-btn"
        onClick={() => setShowLanguageSelector(true)}
        title={t('changeLanguage')}
      >
        <FaGlobe />
        <span>{language === 'en' ? 'EN' : language === 'ar' ? 'ع' : 'עב'}</span>
      </button>

      {/* Hero Section with Animation */}
      <header className="hero">
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">{t('heroBadge')}</div>
          <h1 className="hero-title">
            {t('heroTitle')}
            <span className="hero-highlight">{t('heroHighlight')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('heroSubtitle')}
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">100K+</div>
              <div className="stat-label">{t('resumesCreated')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">{t('professionsSupported')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">{t('userRating')}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Universal Input Section */}
      <section className="universal-input-section">
        <div className="universal-container">
          <div className="universal-header">
            <div className="universal-icon">
              <FaBriefcase />
            </div>
            <h2>{t('whatsYourRole')}</h2>
            <p>{t('enterJobTitle')}</p>
          </div>

          {!showInput ? (
            <div className="cta-wrapper">
              <button
                className="start-btn"
                onClick={() => setShowInput(true)}
              >
                <FaRocket className="btn-icon-left" />
                <span>{t('letsBuildResume')}</span>
                <svg className={`btn-arrow ${isRTL ? 'rtl-flip' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p className="cta-subtext">{t('takesLessThan')}</p>
            </div>
          ) : (
            <div className="universal-input-wrapper">
              <div className="input-group">
                <div className="input-with-icon">
                  <FaBriefcase className="input-icon-universal" />
                  <input
                    type="text"
                    className="universal-input"
                    placeholder={t('jobTitlePlaceholder')}
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && jobTitle.trim() && handleContinue()}
                    autoFocus
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
                <p className="input-help-text">
                  💡 <strong>{t('proTip')}</strong> {t('proTipText')}
                </p>
              </div>

              <div className="action-buttons">
                <button
                  className="continue-btn"
                  onClick={handleContinue}
                  disabled={!jobTitle.trim()}
                >
                  {t('continueBtn')}
                  <svg className={isRTL ? 'rtl-flip' : ''} width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="skip-btn"
                  onClick={handleSkip}
                >
                  {t('skipForNow')}
                </button>
              </div>
            </div>
          )}

          {/* Examples Section */}
          <div className="examples-section">
            <p className="examples-label">{t('worksForAll')}</p>
            <div className="examples-tags">
              <span className="example-tag">{t('techIt')}</span>
              <span className="example-tag">{t('healthcare')}</span>
              <span className="example-tag">{t('educationField')}</span>
              <span className="example-tag">{t('creativeField')}</span>
              <span className="example-tag">{t('business')}</span>
              <span className="example-tag">{t('skilledTrades')}</span>
              <span className="example-tag">{t('entertainment')}</span>
              <span className="example-tag">{t('startups')}</span>
              <span className="example-tag">{t('legal')}</span>
              <span className="example-tag">{t('financeField')}</span>
              <span className="example-tag">{t('engineering')}</span>
              <span className="example-tag">{t('nonProfit')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">{t('whyChoose')}</h2>
          <p className="section-subtitle">
            {t('poweredByAi')}
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon gradient-1">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h3>{t('universalAiEngine')}</h3>
            <p>{t('universalAiDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon gradient-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3>{t('atsOptimized')}</h3>
            <p>{t('atsDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon gradient-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <h3>{t('tenMinSetup')}</h3>
            <p>{t('tenMinDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon gradient-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3>{t('fourTemplates')}</h3>
            <p>{t('fourTemplatesDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon gradient-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 12V22" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <h3>{t('smartScoring')}</h3>
            <p>{t('smartScoringDesc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon gradient-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 21V13H7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3>{t('exportAnywhere')}</h3>
            <p>{t('exportAnywhereDesc')}</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-content">
          <h2>{t('trustedWorldwide')}</h2>
          <p>{t('trustedDesc')}</p>
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-icon">✓</div>
              <span>{t('noRegistration')}</span>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">✓</div>
              <span>{t('freePercent')}</span>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">✓</div>
              <span>{t('dataPrivate')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>{t('footerBuiltWith')}</p>
        <div className="footer-links">
          <span>{t('footerCopyright')}</span>
          <span>•</span>
          <span>{t('worksForEvery')}</span>
        </div>
      </footer>
    </div>
  );
}

export default TemplateSelection;

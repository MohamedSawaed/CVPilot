import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

function LanguageSelector() {
  const { showLanguageSelector, setLanguage } = useLanguage();

  if (!showLanguageSelector) return null;

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      direction: 'ltr'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      direction: 'rtl'
    },
    {
      code: 'he',
      name: 'Hebrew',
      nativeName: 'עברית',
      flag: '🇮🇱',
      direction: 'rtl'
    }
  ];

  return (
    <div className="language-selector-overlay">
      <div className="language-selector-modal">
        <div className="language-selector-header">
          <div className="language-icon">🌍</div>
          <h2>Select Your Language</h2>
          <p>Choose the language for your resume</p>
        </div>

        <div className="language-options">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="language-option"
              onClick={() => setLanguage(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <div className="language-info">
                <span className="language-native">{lang.nativeName}</span>
                <span className="language-english">{lang.name}</span>
              </div>
              <span className="language-direction">
                {lang.direction === 'rtl' ? '←' : '→'}
              </span>
            </button>
          ))}
        </div>

        <div className="language-selector-footer">
          <p>You can change the language later in settings</p>
        </div>
      </div>
    </div>
  );
}

export default LanguageSelector;

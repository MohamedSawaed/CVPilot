import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FcGoogle } from 'react-icons/fc';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiUser } from 'react-icons/hi';
import './Login.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const { register, loginWithGoogle, error, clearError } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isRTL = language === 'ar' || language === 'he';

  const translations = {
    en: {
      title: 'Create Account',
      subtitle: 'Start building your professional CV today',
      fullName: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      register: 'Create Account',
      registerWithGoogle: 'Sign up with Google',
      hasAccount: 'Already have an account?',
      login: 'Sign In',
      or: 'or',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 6 characters'
    },
    ar: {
      title: 'إنشاء حساب',
      subtitle: 'ابدأ بإنشاء سيرتك الذاتية المهنية اليوم',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      register: 'إنشاء حساب',
      registerWithGoogle: 'التسجيل بواسطة جوجل',
      hasAccount: 'لديك حساب بالفعل؟',
      login: 'تسجيل الدخول',
      or: 'أو',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      passwordTooShort: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'
    },
    he: {
      title: 'יצירת חשבון',
      subtitle: 'התחל לבנות את קורות החיים המקצועיים שלך היום',
      fullName: 'שם מלא',
      email: 'כתובת אימייל',
      password: 'סיסמה',
      confirmPassword: 'אימות סיסמה',
      register: 'צור חשבון',
      registerWithGoogle: 'הרשמה עם גוגל',
      hasAccount: 'כבר יש לך חשבון?',
      login: 'התחברות',
      or: 'או',
      passwordMismatch: 'הסיסמאות אינן תואמות',
      passwordTooShort: 'הסיסמה חייבת להכיל לפחות 6 תווים'
    }
  };

  const t = translations[language] || translations.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError('');

    // Validate passwords
    if (password.length < 6) {
      setLocalError(t.passwordTooShort);
      return;
    }

    if (password !== confirmPassword) {
      setLocalError(t.passwordMismatch);
      return;
    }

    setIsLoading(true);

    const success = await register(email, password, fullName);

    setIsLoading(false);
    if (success) {
      navigate('/');
    }
  };

  const handleGoogleSignup = async () => {
    clearError();
    setLocalError('');
    setIsLoading(true);

    const success = await loginWithGoogle();

    setIsLoading(false);
    if (success) {
      navigate('/');
    }
  };

  const displayError = localError || error;

  return (
    <div className={`login-page ${isRTL ? 'rtl' : ''}`}>
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <span className="logo-icon">CV</span>
            <span className="logo-text">Creator</span>
          </div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        {displayError && (
          <div className="error-message">
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="fullName">{t.fullName}</label>
            <div className="input-wrapper">
              <HiUser className="input-icon" />
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.fullName}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">{t.email}</label>
            <div className="input-wrapper">
              <HiMail className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.email}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">{t.password}</label>
            <div className="input-wrapper">
              <HiLockClosed className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.password}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{t.confirmPassword}</label>
            <div className="input-wrapper">
              <HiLockClosed className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t.confirmPassword}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? '...' : t.register}
          </button>
        </form>

        <div className="divider">
          <span>{t.or}</span>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="google-button"
          disabled={isLoading}
        >
          <FcGoogle className="google-icon" />
          {t.registerWithGoogle}
        </button>

        <div className="login-footer">
          <p>
            {t.hasAccount}{' '}
            <Link to="/login">{t.login}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

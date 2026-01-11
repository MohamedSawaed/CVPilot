import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FcGoogle } from 'react-icons/fc';
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, loginWithGoogle, error, clearError } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isRTL = language === 'ar' || language === 'he';

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to continue building your CV',
      email: 'Email Address',
      password: 'Password',
      login: 'Sign In',
      loginWithGoogle: 'Continue with Google',
      noAccount: "Don't have an account?",
      register: 'Create Account',
      or: 'or',
      forgotPassword: 'Forgot Password?'
    },
    ar: {
      title: 'مرحباً بعودتك',
      subtitle: 'سجل الدخول لمتابعة إنشاء سيرتك الذاتية',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      login: 'تسجيل الدخول',
      loginWithGoogle: 'المتابعة مع جوجل',
      noAccount: 'ليس لديك حساب؟',
      register: 'إنشاء حساب',
      or: 'أو',
      forgotPassword: 'نسيت كلمة المرور؟'
    },
    he: {
      title: 'ברוך שובך',
      subtitle: 'התחבר כדי להמשיך לבנות את קורות החיים שלך',
      email: 'כתובת אימייל',
      password: 'סיסמה',
      login: 'התחברות',
      loginWithGoogle: 'המשך עם גוגל',
      noAccount: 'אין לך חשבון?',
      register: 'צור חשבון',
      or: 'או',
      forgotPassword: 'שכחת סיסמה?'
    }
  };

  const t = translations[language] || translations.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);

    const success = await login(email, password);

    setIsLoading(false);
    if (success) {
      navigate('/');
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    setIsLoading(true);

    const success = await loginWithGoogle();

    setIsLoading(false);
    if (success) {
      navigate('/');
    }
  };

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

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
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

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? '...' : t.login}
          </button>
        </form>

        <div className="divider">
          <span>{t.or}</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="google-button"
          disabled={isLoading}
        >
          <FcGoogle className="google-icon" />
          {t.loginWithGoogle}
        </button>

        <div className="login-footer">
          <p>
            {t.noAccount}{' '}
            <Link to="/register">{t.register}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

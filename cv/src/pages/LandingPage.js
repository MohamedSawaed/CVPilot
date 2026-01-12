import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FiCheck, FiAward, FiZap, FiShield, FiGlobe, FiStar, FiArrowRight, FiDownload, FiLayout, FiEdit3, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const isRTL = language === 'ar' || language === 'he';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'EN', fullName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'AR', fullName: 'العربية', flag: '🇸🇦' },
    { code: 'he', name: 'HE', fullName: 'עברית', flag: '🇮🇱' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on navigation
  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('cv-language', langCode);
    setLangDropdownOpen(false);
  };

  const translations = {
    en: {
      nav: {
        features: 'Features',
        templates: 'Templates',
        pricing: 'Pricing',
        login: 'Login',
        getStarted: 'Get Started Free'
      },
      hero: {
        badge: 'Trusted by 50,000+ professionals worldwide',
        title: 'Create Your Perfect CV',
        titleHighlight: 'in Minutes',
        subtitle: 'Stand out from the crowd with professionally designed templates, AI-powered suggestions, and seamless PDF export. Your dream job is just one CV away.',
        cta: 'Create Your CV Now',
        ctaSecondary: 'View Templates',
        trusted: 'Trusted by professionals at'
      },
      stats: {
        cvs: 'CVs Created',
        hired: 'Users Hired',
        templates: 'Premium Templates',
        rating: 'User Rating'
      },
      features: {
        title: 'Everything You Need to',
        titleHighlight: 'Land Your Dream Job',
        subtitle: 'Our powerful features help you create, customize, and export professional CVs that get noticed by recruiters.',
        items: [
          {
            icon: 'layout',
            title: 'Premium Templates',
            description: 'Choose from 11+ professionally designed templates crafted by HR experts and designers.'
          },
          {
            icon: 'edit',
            title: 'Easy Customization',
            description: 'Intuitive drag-and-drop editor with real-time preview. No design skills required.'
          },
          {
            icon: 'zap',
            title: 'AI-Powered Suggestions',
            description: 'Get intelligent recommendations for skills, achievements, and professional summaries.'
          },
          {
            icon: 'download',
            title: 'Instant PDF Export',
            description: 'Download your CV as a high-quality PDF, ready to send to employers.'
          },
          {
            icon: 'globe',
            title: 'Multi-Language Support',
            description: 'Create CVs in English, Arabic, and Hebrew with full RTL support.'
          },
          {
            icon: 'shield',
            title: 'ATS-Friendly',
            description: 'Our templates are optimized to pass Applicant Tracking Systems used by top companies.'
          }
        ]
      },
      templates: {
        title: 'Stunning Templates for',
        titleHighlight: 'Every Industry',
        subtitle: 'From creative to corporate, find the perfect template that matches your career goals.',
        viewAll: 'View All Templates'
      },
      testimonials: {
        title: 'Loved by',
        titleHighlight: 'Professionals',
        subtitle: 'Join thousands of satisfied users who landed their dream jobs.',
        items: [
          {
            name: 'Sarah Chen',
            role: 'Software Engineer at Google',
            image: 'SC',
            text: 'This CV builder helped me land interviews at top tech companies. The templates are modern and the ATS-friendly format really works!'
          },
          {
            name: 'Ahmed Hassan',
            role: 'Marketing Director',
            image: 'AH',
            text: 'The Arabic support is incredible. Finally, a CV builder that understands RTL languages perfectly. Got my dream job within weeks!'
          },
          {
            name: 'Emma Williams',
            role: 'Product Manager at Meta',
            image: 'EW',
            text: 'Clean, professional, and incredibly easy to use. The AI suggestions helped me highlight achievements I would have overlooked.'
          }
        ]
      },
      pricing: {
        title: 'Simple,',
        titleHighlight: 'Transparent Pricing',
        subtitle: 'Start for free, upgrade when you need more.',
        free: {
          name: 'Free',
          price: '$0',
          period: 'forever',
          features: ['1 CV', 'Basic templates', 'PDF download', 'Email support'],
          cta: 'Start Free'
        },
        pro: {
          name: 'Pro',
          price: '$9.99',
          period: 'one-time',
          badge: 'Most Popular',
          features: ['Unlimited CVs', 'All premium templates', 'Priority PDF export', 'Cloud storage', 'AI suggestions', 'Priority support'],
          cta: 'Get Pro Access'
        }
      },
      cta: {
        title: 'Ready to Build Your',
        titleHighlight: 'Career-Winning CV?',
        subtitle: 'Join over 50,000 professionals who have already created their perfect CV.',
        button: 'Create Your CV Now - It\'s Free'
      },
      footer: {
        brand: 'CVPilot',
        tagline: 'Professional CVs made simple.',
        product: 'Product',
        company: 'Company',
        legal: 'Legal',
        links: {
          features: 'Features',
          templates: 'Templates',
          pricing: 'Pricing',
          about: 'About Us',
          careers: 'Careers',
          contact: 'Contact',
          privacy: 'Privacy Policy',
          terms: 'Terms of Service'
        },
        copyright: '© 2025 CVPilot. All rights reserved.'
      }
    },
    ar: {
      nav: {
        features: 'المميزات',
        templates: 'القوالب',
        pricing: 'الأسعار',
        login: 'تسجيل الدخول',
        getStarted: 'ابدأ مجاناً'
      },
      hero: {
        badge: 'موثوق به من قبل أكثر من 50,000 محترف حول العالم',
        title: 'أنشئ سيرتك الذاتية المثالية',
        titleHighlight: 'في دقائق',
        subtitle: 'تميّز عن الآخرين مع قوالب مصممة باحترافية، واقتراحات ذكية، وتصدير PDF سلس. وظيفة أحلامك على بعد سيرة ذاتية واحدة.',
        cta: 'أنشئ سيرتك الذاتية الآن',
        ctaSecondary: 'عرض القوالب',
        trusted: 'موثوق به من قبل محترفين في'
      },
      stats: {
        cvs: 'سيرة ذاتية تم إنشاؤها',
        hired: 'مستخدم تم توظيفه',
        templates: 'قالب احترافي',
        rating: 'تقييم المستخدمين'
      },
      features: {
        title: 'كل ما تحتاجه',
        titleHighlight: 'للحصول على وظيفة أحلامك',
        subtitle: 'ميزاتنا القوية تساعدك في إنشاء وتخصيص وتصدير سير ذاتية احترافية تلفت انتباه مسؤولي التوظيف.',
        items: [
          {
            icon: 'layout',
            title: 'قوالب احترافية',
            description: 'اختر من بين أكثر من 11 قالباً مصمماً باحترافية من قبل خبراء الموارد البشرية والمصممين.'
          },
          {
            icon: 'edit',
            title: 'تخصيص سهل',
            description: 'محرر سهل الاستخدام مع معاينة فورية. لا تحتاج لمهارات تصميم.'
          },
          {
            icon: 'zap',
            title: 'اقتراحات ذكية',
            description: 'احصل على توصيات ذكية للمهارات والإنجازات والملخصات المهنية.'
          },
          {
            icon: 'download',
            title: 'تصدير PDF فوري',
            description: 'حمّل سيرتك الذاتية كملف PDF عالي الجودة، جاهز للإرسال.'
          },
          {
            icon: 'globe',
            title: 'دعم متعدد اللغات',
            description: 'أنشئ سيراً ذاتية بالعربية والإنجليزية والعبرية مع دعم كامل للكتابة من اليمين لليسار.'
          },
          {
            icon: 'shield',
            title: 'متوافق مع أنظمة ATS',
            description: 'قوالبنا محسّنة لتجاوز أنظمة تتبع المتقدمين المستخدمة من قبل كبرى الشركات.'
          }
        ]
      },
      templates: {
        title: 'قوالب مذهلة',
        titleHighlight: 'لكل مجال',
        subtitle: 'من الإبداعي إلى المؤسسي، ابحث عن القالب المثالي الذي يناسب أهدافك المهنية.',
        viewAll: 'عرض جميع القوالب'
      },
      testimonials: {
        title: 'محبوب من قبل',
        titleHighlight: 'المحترفين',
        subtitle: 'انضم إلى آلاف المستخدمين الراضين الذين حصلوا على وظائف أحلامهم.',
        items: [
          {
            name: 'سارة أحمد',
            role: 'مهندسة برمجيات في Google',
            image: 'سأ',
            text: 'ساعدني منشئ السيرة الذاتية هذا في الحصول على مقابلات في أفضل شركات التقنية. القوالب حديثة والتنسيق المتوافق مع ATS فعال حقاً!'
          },
          {
            name: 'محمد حسن',
            role: 'مدير تسويق',
            image: 'مح',
            text: 'دعم اللغة العربية مذهل. أخيراً منشئ سيرة ذاتية يفهم اللغات من اليمين لليسار بشكل مثالي. حصلت على وظيفة أحلامي خلال أسابيع!'
          },
          {
            name: 'نور علي',
            role: 'مديرة منتجات في Meta',
            image: 'نع',
            text: 'نظيف واحترافي وسهل الاستخدام بشكل لا يصدق. ساعدتني الاقتراحات الذكية في إبراز إنجازات كنت سأغفل عنها.'
          }
        ]
      },
      pricing: {
        title: 'أسعار',
        titleHighlight: 'بسيطة وشفافة',
        subtitle: 'ابدأ مجاناً، قم بالترقية عندما تحتاج المزيد.',
        free: {
          name: 'مجاني',
          price: '$0',
          period: 'للأبد',
          features: ['سيرة ذاتية واحدة', 'قوالب أساسية', 'تحميل PDF', 'دعم بالبريد الإلكتروني'],
          cta: 'ابدأ مجاناً'
        },
        pro: {
          name: 'احترافي',
          price: '$9.99',
          period: 'دفعة واحدة',
          badge: 'الأكثر شعبية',
          features: ['سير ذاتية غير محدودة', 'جميع القوالب الاحترافية', 'تصدير PDF سريع', 'تخزين سحابي', 'اقتراحات ذكية', 'دعم متميز'],
          cta: 'احصل على النسخة الاحترافية'
        }
      },
      cta: {
        title: 'مستعد لإنشاء',
        titleHighlight: 'سيرتك الذاتية الناجحة؟',
        subtitle: 'انضم إلى أكثر من 50,000 محترف أنشأوا سيرتهم الذاتية المثالية.',
        button: 'أنشئ سيرتك الذاتية الآن - مجاناً'
      },
      footer: {
        brand: 'CVPilot',
        tagline: 'سير ذاتية احترافية بكل سهولة.',
        product: 'المنتج',
        company: 'الشركة',
        legal: 'قانوني',
        links: {
          features: 'المميزات',
          templates: 'القوالب',
          pricing: 'الأسعار',
          about: 'من نحن',
          careers: 'الوظائف',
          contact: 'اتصل بنا',
          privacy: 'سياسة الخصوصية',
          terms: 'شروط الخدمة'
        },
        copyright: '© 2025 CVPilot. جميع الحقوق محفوظة.'
      }
    },
    he: {
      nav: {
        features: 'תכונות',
        templates: 'תבניות',
        pricing: 'מחירים',
        login: 'התחברות',
        getStarted: 'התחל בחינם'
      },
      hero: {
        badge: 'מהימן על ידי יותר מ-50,000 אנשי מקצוע ברחבי העולם',
        title: 'צור את קורות החיים המושלמים שלך',
        titleHighlight: 'בדקות',
        subtitle: 'בלוט מהקהל עם תבניות מעוצבות מקצועית, הצעות מונעות AI וייצוא PDF חלק. עבודת החלומות שלך במרחק קורות חיים אחד.',
        cta: 'צור את קורות החיים שלך עכשיו',
        ctaSecondary: 'צפה בתבניות',
        trusted: 'מהימן על ידי אנשי מקצוע ב-'
      },
      stats: {
        cvs: 'קורות חיים נוצרו',
        hired: 'משתמשים הועסקו',
        templates: 'תבניות פרימיום',
        rating: 'דירוג משתמשים'
      },
      features: {
        title: 'כל מה שאתה צריך',
        titleHighlight: 'כדי להשיג את עבודת החלומות',
        subtitle: 'התכונות החזקות שלנו עוזרות לך ליצור, להתאים אישית ולייצא קורות חיים מקצועיים שנראים על ידי מגייסים.',
        items: [
          {
            icon: 'layout',
            title: 'תבניות פרימיום',
            description: 'בחר מתוך 11+ תבניות מעוצבות מקצועית שנוצרו על ידי מומחי משאבי אנוש ומעצבים.'
          },
          {
            icon: 'edit',
            title: 'התאמה אישית קלה',
            description: 'עורך גרור ושחרר אינטואיטיבי עם תצוגה מקדימה בזמן אמת. לא נדרשים כישורי עיצוב.'
          },
          {
            icon: 'zap',
            title: 'הצעות מונעות AI',
            description: 'קבל המלצות חכמות למיומנויות, הישגים וסיכומים מקצועיים.'
          },
          {
            icon: 'download',
            title: 'ייצוא PDF מיידי',
            description: 'הורד את קורות החיים שלך כ-PDF באיכות גבוהה, מוכן לשליחה למעסיקים.'
          },
          {
            icon: 'globe',
            title: 'תמיכה רב-לשונית',
            description: 'צור קורות חיים באנגלית, ערבית ועברית עם תמיכה מלאה ב-RTL.'
          },
          {
            icon: 'shield',
            title: 'ידידותי ל-ATS',
            description: 'התבניות שלנו מותאמות לעבור מערכות מעקב מועמדים בשימוש חברות מובילות.'
          }
        ]
      },
      templates: {
        title: 'תבניות מדהימות',
        titleHighlight: 'לכל תעשייה',
        subtitle: 'מקריאטיבי לתאגידי, מצא את התבנית המושלמת שמתאימה למטרות הקריירה שלך.',
        viewAll: 'צפה בכל התבניות'
      },
      testimonials: {
        title: 'אהוב על ידי',
        titleHighlight: 'אנשי מקצוע',
        subtitle: 'הצטרף לאלפי משתמשים מרוצים שהשיגו את עבודת החלומות שלהם.',
        items: [
          {
            name: 'שרה כהן',
            role: 'מהנדסת תוכנה ב-Google',
            image: 'שכ',
            text: 'בונה קורות החיים הזה עזר לי להשיג ראיונות בחברות טכנולוגיה מובילות. התבניות מודרניות והפורמט הידידותי ל-ATS באמת עובד!'
          },
          {
            name: 'אחמד חסן',
            role: 'מנהל שיווק',
            image: 'אח',
            text: 'התמיכה בעברית וערבית מדהימה. סוף סוף בונה קורות חיים שמבין שפות RTL בצורה מושלמת. קיבלתי את עבודת החלומות תוך שבועות!'
          },
          {
            name: 'מיכל לוי',
            role: 'מנהלת מוצר ב-Meta',
            image: 'מל',
            text: 'נקי, מקצועי וקל לשימוש להפליא. ההצעות החכמות עזרו לי להדגיש הישגים שהייתי מתעלמת מהם.'
          }
        ]
      },
      pricing: {
        title: 'תמחור',
        titleHighlight: 'פשוט ושקוף',
        subtitle: 'התחל בחינם, שדרג כשאתה צריך יותר.',
        free: {
          name: 'חינם',
          price: '$0',
          period: 'לתמיד',
          features: ['קורות חיים 1', 'תבניות בסיסיות', 'הורדת PDF', 'תמיכה באימייל'],
          cta: 'התחל בחינם'
        },
        pro: {
          name: 'פרו',
          price: '$9.99',
          period: 'תשלום חד פעמי',
          badge: 'הכי פופולרי',
          features: ['קורות חיים ללא הגבלה', 'כל תבניות הפרימיום', 'ייצוא PDF מהיר', 'אחסון בענן', 'הצעות AI', 'תמיכה מועדפת'],
          cta: 'קבל גישת פרו'
        }
      },
      cta: {
        title: 'מוכן לבנות את',
        titleHighlight: 'קורות החיים המנצחים שלך?',
        subtitle: 'הצטרף ליותר מ-50,000 אנשי מקצוע שכבר יצרו את קורות החיים המושלמים שלהם.',
        button: 'צור את קורות החיים שלך עכשיו - בחינם'
      },
      footer: {
        brand: 'CVPilot',
        tagline: 'קורות חיים מקצועיים בפשטות.',
        product: 'מוצר',
        company: 'חברה',
        legal: 'משפטי',
        links: {
          features: 'תכונות',
          templates: 'תבניות',
          pricing: 'מחירים',
          about: 'אודותינו',
          careers: 'קריירות',
          contact: 'צור קשר',
          privacy: 'מדיניות פרטיות',
          terms: 'תנאי שירות'
        },
        copyright: '© 2025 CVPilot. כל הזכויות שמורות.'
      }
    }
  };

  const t = translations[language] || translations.en;

  const getIcon = (iconName) => {
    const icons = {
      layout: <FiLayout />,
      edit: <FiEdit3 />,
      zap: <FiZap />,
      download: <FiDownload />,
      globe: <FiGlobe />,
      shield: <FiShield />
    };
    return icons[iconName] || <FiStar />;
  };

  const templatePreviews = [
    { name: 'Elegant', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', style: 'elegant' },
    { name: 'Executive', color: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)', style: 'executive' },
    { name: 'Minimal', color: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', style: 'minimal', dark: true },
    { name: 'Tech', color: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', style: 'tech' },
    { name: 'Luxe', color: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)', style: 'luxe' },
    { name: 'Azure', color: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)', style: 'azure' }
  ];

  return (
    <div className={`landing-page ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Navigation */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>CVPilot</span>
          </div>

          <div className="nav-links">
            <a href="#features">{t.nav.features}</a>
            <a href="#templates">{t.nav.templates}</a>
            <a href="#pricing">{t.nav.pricing}</a>
          </div>

          <div className="nav-actions">
            {/* Language Selector */}
            <div className="lang-dropdown" ref={langDropdownRef}>
              <button
                className="lang-dropdown-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              >
                <span className="lang-flag">{currentLang.flag}</span>
                <span className="lang-code">{currentLang.name}</span>
                <FiChevronDown className={`lang-chevron ${langDropdownOpen ? 'open' : ''}`} />
              </button>
              {langDropdownOpen && (
                <div className="lang-dropdown-menu">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className={`lang-option ${lang.code === language ? 'active' : ''}`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <span className="lang-flag">{lang.flag}</span>
                      <span className="lang-full-name">{lang.fullName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="nav-login" onClick={() => handleNavigation('/login')}>
              {t.nav.login}
            </button>
            <button className="nav-cta" onClick={() => handleNavigation('/register')}>
              {t.nav.getStarted}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</a>
            <a href="#templates" onClick={() => setMobileMenuOpen(false)}>{t.nav.templates}</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>{t.nav.pricing}</a>
            <div className="mobile-menu-divider"></div>
            <button className="mobile-login" onClick={() => handleNavigation('/login')}>
              {t.nav.login}
            </button>
            <button className="mobile-cta" onClick={() => handleNavigation('/register')}>
              {t.nav.getStarted}
            </button>
            <div className="mobile-menu-divider"></div>
            <div className="mobile-lang-selector">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className={`mobile-lang-btn ${lang.code === language ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.fullName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FiAward />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="hero-title">
              {t.hero.title} <span className="highlight">{t.hero.titleHighlight}</span>
            </h1>

            <p className="hero-subtitle">{t.hero.subtitle}</p>

            <div className="hero-actions">
              <button className="hero-cta-primary" onClick={() => navigate('/register')}>
                {t.hero.cta}
                <FiArrowRight />
              </button>
              <button className="hero-cta-secondary" onClick={() => document.getElementById('templates').scrollIntoView({ behavior: 'smooth' })}>
                {t.hero.ctaSecondary}
              </button>
            </div>

            <div className="hero-trust">
              <span>{t.hero.trusted}</span>
              <div className="trust-logos">
                <div className="trust-logo">Google</div>
                <div className="trust-logo">Microsoft</div>
                <div className="trust-logo">Amazon</div>
                <div className="trust-logo">Meta</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="cv-preview-stack">
              <div className="cv-preview cv-preview-1">
                <div className="cv-header" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}></div>
                <div className="cv-content">
                  <div className="cv-line cv-line-title"></div>
                  <div className="cv-line cv-line-subtitle"></div>
                  <div className="cv-section">
                    <div className="cv-line cv-line-heading"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line cv-line-short"></div>
                  </div>
                  <div className="cv-section">
                    <div className="cv-line cv-line-heading"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line"></div>
                  </div>
                </div>
              </div>
              <div className="cv-preview cv-preview-2">
                <div className="cv-header" style={{ background: '#1e3a5f' }}></div>
                <div className="cv-content">
                  <div className="cv-line cv-line-title"></div>
                  <div className="cv-line cv-line-subtitle"></div>
                  <div className="cv-section">
                    <div className="cv-line cv-line-heading"></div>
                    <div className="cv-line"></div>
                    <div className="cv-line cv-line-short"></div>
                  </div>
                </div>
              </div>
              <div className="cv-preview cv-preview-3">
                <div className="cv-header" style={{ background: '#0f172a' }}></div>
                <div className="cv-content">
                  <div className="cv-line cv-line-title"></div>
                  <div className="cv-line cv-line-subtitle"></div>
                </div>
              </div>
            </div>
            <div className="floating-badge badge-1">
              <FiCheck /> ATS Optimized
            </div>
            <div className="floating-badge badge-2">
              <FiDownload /> PDF Ready
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">150K+</div>
            <div className="stat-label">{t.stats.cvs}</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">45K+</div>
            <div className="stat-label">{t.stats.hired}</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">11+</div>
            <div className="stat-label">{t.stats.templates}</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">4.9</div>
            <div className="stat-label">{t.stats.rating}</div>
            <div className="stat-stars">
              {[...Array(5)].map((_, i) => <FiStar key={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>{t.features.title} <span className="highlight">{t.features.titleHighlight}</span></h2>
            <p>{t.features.subtitle}</p>
          </div>

          <div className="features-grid">
            {t.features.items.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{getIcon(feature.icon)}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="templates-section">
        <div className="templates-container">
          <div className="section-header">
            <h2>{t.templates.title} <span className="highlight">{t.templates.titleHighlight}</span></h2>
            <p>{t.templates.subtitle}</p>
          </div>

          <div className="templates-showcase">
            {templatePreviews.map((template, index) => (
              <div key={index} className={`template-card ${template.dark ? 'dark-text' : ''}`}>
                <div className="template-preview" style={{ background: template.color }}>
                  <div className="template-content">
                    <div className="template-header-bar"></div>
                    <div className="template-lines">
                      <div className="t-line t-line-long"></div>
                      <div className="t-line t-line-medium"></div>
                      <div className="t-line t-line-short"></div>
                    </div>
                  </div>
                </div>
                <div className="template-name">{template.name}</div>
              </div>
            ))}
          </div>

          <button className="templates-cta" onClick={() => navigate('/register')}>
            {t.templates.viewAll}
            <FiArrowRight />
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <h2>{t.testimonials.title} <span className="highlight">{t.testimonials.titleHighlight}</span></h2>
            <p>{t.testimonials.subtitle}</p>
          </div>

          <div className="testimonials-grid">
            {t.testimonials.items.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => <FiStar key={i} />)}
                  </div>
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.image}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="pricing-container">
          <div className="section-header">
            <h2>{t.pricing.title} <span className="highlight">{t.pricing.titleHighlight}</span></h2>
            <p>{t.pricing.subtitle}</p>
          </div>

          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>{t.pricing.free.name}</h3>
                <div className="pricing-price">
                  <span className="price">{t.pricing.free.price}</span>
                  <span className="period">/{t.pricing.free.period}</span>
                </div>
              </div>
              <ul className="pricing-features">
                {t.pricing.free.features.map((feature, i) => (
                  <li key={i}><FiCheck /> {feature}</li>
                ))}
              </ul>
              <button className="pricing-cta pricing-cta-secondary" onClick={() => navigate('/register')}>
                {t.pricing.free.cta}
              </button>
            </div>

            <div className="pricing-card pricing-card-featured">
              <div className="pricing-badge">{t.pricing.pro.badge}</div>
              <div className="pricing-header">
                <h3>{t.pricing.pro.name}</h3>
                <div className="pricing-price">
                  <span className="price">{t.pricing.pro.price}</span>
                  <span className="period">/{t.pricing.pro.period}</span>
                </div>
              </div>
              <ul className="pricing-features">
                {t.pricing.pro.features.map((feature, i) => (
                  <li key={i}><FiCheck /> {feature}</li>
                ))}
              </ul>
              <button className="pricing-cta pricing-cta-primary" onClick={() => navigate('/register')}>
                {t.pricing.pro.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>{t.cta.title} <span className="highlight">{t.cta.titleHighlight}</span></h2>
          <p>{t.cta.subtitle}</p>
          <button className="cta-button" onClick={() => navigate('/register')}>
            {t.cta.button}
            <FiArrowRight />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="brand-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>{t.footer.brand}</span>
            </div>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>{t.footer.product}</h4>
              <a href="#features">{t.footer.links.features}</a>
              <a href="#templates">{t.footer.links.templates}</a>
              <a href="#pricing">{t.footer.links.pricing}</a>
            </div>
            <div className="footer-column">
              <h4>{t.footer.company}</h4>
              <a href="#">{t.footer.links.about}</a>
              <a href="#">{t.footer.links.careers}</a>
              <a href="#">{t.footer.links.contact}</a>
            </div>
            <div className="footer-column">
              <h4>{t.footer.legal}</h4>
              <a href="#">{t.footer.links.privacy}</a>
              <a href="#">{t.footer.links.terms}</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

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
    {
      name: 'Elegant',
      nameAr: 'أنيق',
      nameHe: 'אלגנטי',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accentColor: '#667eea',
      style: 'elegant',
      popular: true
    },
    {
      name: 'Executive',
      nameAr: 'تنفيذي',
      nameHe: 'מנהלים',
      color: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
      accentColor: '#d4af37',
      style: 'executive'
    },
    {
      name: 'Minimal',
      nameAr: 'بسيط',
      nameHe: 'מינימלי',
      color: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      accentColor: '#333333',
      style: 'minimal',
      dark: true
    },
    {
      name: 'Tech',
      nameAr: 'تقني',
      nameHe: 'טכנולוגי',
      color: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      accentColor: '#22d3ee',
      style: 'tech',
      popular: true
    },
    {
      name: 'Luxe',
      nameAr: 'فاخر',
      nameHe: 'יוקרתי',
      color: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      accentColor: '#d4af37',
      style: 'luxe'
    },
    {
      name: 'Azure',
      nameAr: 'أزرق سماوي',
      nameHe: 'תכלת',
      color: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)',
      accentColor: '#00b4d8',
      style: 'azure'
    },
    {
      name: 'Creative',
      nameAr: 'إبداعي',
      nameHe: 'יצירתי',
      color: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      accentColor: '#ec4899',
      style: 'creative'
    },
    {
      name: 'Professional',
      nameAr: 'احترافي',
      nameHe: 'מקצועי',
      color: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      accentColor: '#10b981',
      style: 'professional'
    }
  ];

  const getTemplateName = (template) => {
    if (language === 'ar') return template.nameAr;
    if (language === 'he') return template.nameHe;
    return template.name;
  };

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
        {/* Premium Animated Background */}
        <div className="tpl-bg-wrapper">
          {/* Floating Orbs */}
          <div className="tpl-orb tpl-orb-1"></div>
          <div className="tpl-orb tpl-orb-2"></div>
          <div className="tpl-orb tpl-orb-3"></div>
          <div className="tpl-orb tpl-orb-4"></div>
          {/* Grid Lines */}
          <div className="tpl-grid-lines"></div>
          {/* Particles */}
          <div className="tpl-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="tpl-particle" style={{ '--i': i }}></div>
            ))}
          </div>
          {/* Spotlight */}
          <div className="tpl-spotlight"></div>
        </div>

        <div className="templates-container">
          {/* Premium Section Header */}
          <div className="tpl-section-header">
            <div className="tpl-label">
              <div className="tpl-label-glow"></div>
              <FiAward />
              <span>{language === 'ar' ? 'قوالب حصرية' : language === 'he' ? 'תבניות בלעדיות' : 'Premium Collection'}</span>
            </div>
            <h2 className="tpl-main-title">
              {language === 'ar' ? 'قوالب مصممة' : language === 'he' ? 'תבניות מעוצבות' : 'Beautifully Crafted'}
              <span className="tpl-title-highlight">
                {language === 'ar' ? ' للمحترفين' : language === 'he' ? ' למקצוענים' : ' Templates'}
              </span>
            </h2>
            <p className="tpl-subtitle">
              {language === 'ar'
                ? 'اختر من بين 11+ قالب احترافي صممه خبراء التوظيف والمصممون المحترفون'
                : language === 'he'
                ? 'בחר מתוך 11+ תבניות מקצועיות שעוצבו על ידי מומחי גיוס ומעצבים מקצועיים'
                : 'Choose from 11+ professional templates designed by HR experts and professional designers'}
            </p>
            {/* Stats Row */}
            <div className="tpl-stats-row">
              <div className="tpl-stat">
                <span className="tpl-stat-number">50K+</span>
                <span className="tpl-stat-label">{language === 'ar' ? 'مستخدم' : language === 'he' ? 'משתמשים' : 'Users'}</span>
              </div>
              <div className="tpl-stat-divider"></div>
              <div className="tpl-stat">
                <span className="tpl-stat-number">11+</span>
                <span className="tpl-stat-label">{language === 'ar' ? 'قالب' : language === 'he' ? 'תבניות' : 'Templates'}</span>
              </div>
              <div className="tpl-stat-divider"></div>
              <div className="tpl-stat">
                <span className="tpl-stat-number">4.9</span>
                <span className="tpl-stat-label">{language === 'ar' ? 'تقييم' : language === 'he' ? 'דירוג' : 'Rating'}</span>
              </div>
            </div>
          </div>

          {/* 3D Showcase Grid */}
          <div className="tpl-showcase">
            {templatePreviews.map((template, index) => (
              <div
                key={index}
                className={`tpl-card-3d ${template.popular ? 'tpl-card-featured' : ''}`}
                style={{
                  '--delay': `${index * 0.1}s`,
                  '--accent': template.accentColor,
                  '--accent-glow': `${template.accentColor}66`,
                  '--row': Math.floor(index / 4),
                  '--col': index % 4
                }}
              >
                {/* Card Glow Effect */}
                <div className="tpl-card-glow"></div>

                {/* 3D Card Container */}
                <div className="tpl-card-inner">
                  {/* Featured Badge */}
                  {template.popular && (
                    <div className="tpl-badge-featured">
                      <div className="tpl-badge-shine"></div>
                      <FiStar />
                      <span>{language === 'ar' ? 'الأفضل' : language === 'he' ? 'מומלץ' : 'Best Seller'}</span>
                    </div>
                  )}

                  {/* CV Preview Card */}
                  <div className="tpl-cv-wrapper">
                    {/* Floating Shadow */}
                    <div className="tpl-cv-shadow"></div>

                    {/* CV Document */}
                    <div className="tpl-cv-doc" style={{ background: template.color }}>
                      {/* Header */}
                      <div className="tpl-cv-header" style={{ background: template.accentColor }}>
                        <div className="tpl-cv-photo">
                          <div className="tpl-cv-photo-inner"></div>
                        </div>
                        <div className="tpl-cv-identity">
                          <div className="tpl-cv-name"></div>
                          <div className="tpl-cv-role"></div>
                          <div className="tpl-cv-contact-info">
                            <span></span><span></span>
                          </div>
                        </div>
                      </div>

                      {/* Body Content */}
                      <div className="tpl-cv-body">
                        {/* About Section */}
                        <div className="tpl-cv-section">
                          <div className="tpl-cv-sec-head">
                            <div className="tpl-cv-sec-dot" style={{ background: template.accentColor }}></div>
                            <div className="tpl-cv-sec-title" style={{ background: template.accentColor }}></div>
                          </div>
                          <div className="tpl-cv-paragraph">
                            <div className="tpl-cv-text-line w-100"></div>
                            <div className="tpl-cv-text-line w-90"></div>
                            <div className="tpl-cv-text-line w-75"></div>
                          </div>
                        </div>

                        {/* Experience Section */}
                        <div className="tpl-cv-section">
                          <div className="tpl-cv-sec-head">
                            <div className="tpl-cv-sec-dot" style={{ background: template.accentColor }}></div>
                            <div className="tpl-cv-sec-title" style={{ background: template.accentColor }}></div>
                          </div>
                          <div className="tpl-cv-timeline">
                            <div className="tpl-cv-timeline-item">
                              <div className="tpl-cv-timeline-dot" style={{ borderColor: template.accentColor }}></div>
                              <div className="tpl-cv-timeline-content">
                                <div className="tpl-cv-text-line w-65"></div>
                                <div className="tpl-cv-text-line w-50"></div>
                              </div>
                            </div>
                            <div className="tpl-cv-timeline-item">
                              <div className="tpl-cv-timeline-dot" style={{ borderColor: template.accentColor }}></div>
                              <div className="tpl-cv-timeline-content">
                                <div className="tpl-cv-text-line w-55"></div>
                                <div className="tpl-cv-text-line w-40"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Skills Section */}
                        <div className="tpl-cv-section tpl-cv-section-last">
                          <div className="tpl-cv-sec-head">
                            <div className="tpl-cv-sec-dot" style={{ background: template.accentColor }}></div>
                            <div className="tpl-cv-sec-title" style={{ background: template.accentColor }}></div>
                          </div>
                          <div className="tpl-cv-skills">
                            <div className="tpl-cv-skill" style={{ background: `${template.accentColor}25`, borderColor: `${template.accentColor}50` }}></div>
                            <div className="tpl-cv-skill" style={{ background: `${template.accentColor}25`, borderColor: `${template.accentColor}50` }}></div>
                            <div className="tpl-cv-skill" style={{ background: `${template.accentColor}25`, borderColor: `${template.accentColor}50` }}></div>
                            <div className="tpl-cv-skill" style={{ background: `${template.accentColor}25`, borderColor: `${template.accentColor}50` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="tpl-card-actions">
                    <button className="tpl-action-btn" onClick={() => navigate('/register')}>
                      <span>{language === 'ar' ? 'استخدم القالب' : language === 'he' ? 'בחר תבנית' : 'Use Template'}</span>
                      <FiArrowRight />
                    </button>
                  </div>

                  {/* Shine Effect */}
                  <div className="tpl-card-shine"></div>
                </div>

                {/* Card Info */}
                <div className="tpl-card-footer">
                  <h3 className="tpl-card-name">{getTemplateName(template)}</h3>
                  <div className="tpl-card-meta">
                    <span className="tpl-card-style">{template.style}</span>
                    <div className="tpl-card-rating">
                      <FiStar />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTA */}
          <div className="tpl-cta-section">
            <div className="tpl-cta-glow"></div>
            <button className="tpl-cta-btn" onClick={() => navigate('/register')}>
              <span className="tpl-cta-text">{language === 'ar' ? 'ابدأ الآن مجاناً' : language === 'he' ? 'התחל עכשיו בחינם' : 'Start Creating for Free'}</span>
              <FiArrowRight className="tpl-cta-icon" />
            </button>
            <p className="tpl-cta-subtext">
              {language === 'ar' ? 'لا حاجة لبطاقة ائتمان • إعداد في دقيقتين' : language === 'he' ? 'ללא כרטיס אשראי • הגדרה תוך 2 דקות' : 'No credit card required • Setup in 2 minutes'}
            </p>
          </div>
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

      {/* Advanced Premium Footer */}
      <footer className="premium-footer">
        {/* Animated Background */}
        <div className="footer-bg">
          <div className="footer-orb footer-orb-1"></div>
          <div className="footer-orb footer-orb-2"></div>
          <div className="footer-grid-pattern"></div>
        </div>

        {/* Top CTA Banner */}
        <div className="footer-cta-banner">
          <div className="footer-cta-content">
            <div className="footer-cta-text">
              <h3>{language === 'ar' ? 'ابدأ رحلتك المهنية اليوم' : language === 'he' ? 'התחל את המסע הקריירה שלך היום' : 'Start Your Career Journey Today'}</h3>
              <p>{language === 'ar' ? 'انضم لأكثر من 50,000 محترف أنشأوا سيرتهم الذاتية المثالية' : language === 'he' ? 'הצטרף ליותר מ-50,000 אנשי מקצוע שיצרו קורות חיים מושלמים' : 'Join 50,000+ professionals who created their perfect CV'}</p>
            </div>
            <button className="footer-cta-btn" onClick={() => navigate('/register')}>
              <span>{language === 'ar' ? 'أنشئ سيرتك الذاتية مجاناً' : language === 'he' ? 'צור קורות חיים בחינם' : 'Create Your CV Free'}</span>
              <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main-content">
          <div className="footer-container">
            {/* Brand Column */}
            <div className="footer-brand-section">
              <div className="footer-brand">
                <div className="brand-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>{t.footer.brand}</span>
              </div>
              <p className="footer-tagline">{t.footer.tagline}</p>

              {/* Social Links */}
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            {/* Links Grid */}
            <div className="footer-links-grid">
              <div className="footer-column">
                <h4>{t.footer.product}</h4>
                <a href="#features">{t.footer.links.features}</a>
                <a href="#templates">{t.footer.links.templates}</a>
                <a href="#">{language === 'ar' ? 'أمثلة' : language === 'he' ? 'דוגמאות' : 'Examples'}</a>
                <a href="#">{language === 'ar' ? 'التحديثات' : language === 'he' ? 'עדכונים' : 'Updates'}</a>
              </div>
              <div className="footer-column">
                <h4>{t.footer.company}</h4>
                <a href="#">{t.footer.links.about}</a>
                <a href="#">{t.footer.links.careers}</a>
                <a href="#">{t.footer.links.contact}</a>
                <a href="#">{language === 'ar' ? 'المدونة' : language === 'he' ? 'בלוג' : 'Blog'}</a>
              </div>
              <div className="footer-column">
                <h4>{language === 'ar' ? 'المساعدة' : language === 'he' ? 'עזרה' : 'Support'}</h4>
                <a href="#">{language === 'ar' ? 'مركز المساعدة' : language === 'he' ? 'מרכז עזרה' : 'Help Center'}</a>
                <a href="#">{language === 'ar' ? 'الأسئلة الشائعة' : language === 'he' ? 'שאלות נפוצות' : 'FAQ'}</a>
                <a href="#">{language === 'ar' ? 'اتصل بنا' : language === 'he' ? 'צור קשר' : 'Contact Us'}</a>
                <a href="#">{language === 'ar' ? 'الحالة' : language === 'he' ? 'סטטוס' : 'Status'}</a>
              </div>
              <div className="footer-column">
                <h4>{t.footer.legal}</h4>
                <a href="#">{t.footer.links.privacy}</a>
                <a href="#">{t.footer.links.terms}</a>
                <a href="#">{language === 'ar' ? 'ملفات تعريف الارتباط' : language === 'he' ? 'עוגיות' : 'Cookies'}</a>
                <a href="#">{language === 'ar' ? 'التراخيص' : language === 'he' ? 'רישיונות' : 'Licenses'}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-container">
            <div className="footer-bottom-content">
              <p className="footer-copyright">{t.footer.copyright}</p>
              <div className="footer-bottom-links">
                <a href="#">{t.footer.links.privacy}</a>
                <a href="#">{t.footer.links.terms}</a>
                <a href="#">{language === 'ar' ? 'إمكانية الوصول' : language === 'he' ? 'נגישות' : 'Accessibility'}</a>
              </div>
              <div className="footer-lang-badge">
                <FiGlobe />
                <span>{currentLang.fullName}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

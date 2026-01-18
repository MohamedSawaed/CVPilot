import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getUserCVs, deleteCV, duplicateCV, getUserPaymentStatus, subscribeToUserCVs } from '../services/cvService';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCopy,
  FaFileAlt,
  FaSignOutAlt,
  FaCrown,
  FaCheckCircle,
  FaSearch,
  FaChartLine,
  FaClock,
  FaStar,
  FaRocket,
  FaTh,
  FaList,
  FaCalendarAlt,
  FaSortAmountDown,
  FaLayerGroup
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isRTL = language === 'ar' || language === 'he';

  const translations = {
    en: {
      title: 'My CVs',
      welcome: 'Welcome back',
      createNew: 'Create New CV',
      noCVs: 'No CVs yet',
      noCVsDesc: 'Create your first professional CV now!',
      edit: 'Edit',
      delete: 'Delete',
      duplicate: 'Duplicate',
      lastUpdated: 'Last updated',
      confirmDelete: 'Delete this CV?',
      confirmDeleteDesc: 'This action cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Delete',
      logout: 'Logout',
      premiumStatus: 'Premium Member',
      freeStatus: 'Free Account',
      upgradeHint: 'Download any CV to unlock premium',
      totalCVs: 'Total CVs',
      thisWeek: 'This Week',
      templates: 'Templates',
      searchPlaceholder: 'Search CVs...',
      sortRecent: 'Recent',
      sortName: 'Name',
      sortOldest: 'Oldest',
      quickActions: 'Quick Actions',
      createFromTemplate: 'Create New',
      duplicateLast: 'Duplicate Last',
      noResults: 'No CVs found',
      noResultsDesc: 'Try adjusting your search',
      upgradePro: 'Upgrade Pro',
      getUnlimited: 'Unlimited downloads',
      tipText: 'Add quantifiable achievements to make your CV stand out!'
    },
    ar: {
      title: 'سيرتي الذاتية',
      welcome: 'مرحباً بعودتك',
      createNew: 'إنشاء سيرة ذاتية جديدة',
      noCVs: 'لا توجد سير ذاتية',
      noCVsDesc: 'أنشئ سيرتك الذاتية المهنية الأولى الآن!',
      edit: 'تعديل',
      delete: 'حذف',
      duplicate: 'نسخ',
      lastUpdated: 'آخر تحديث',
      confirmDelete: 'حذف هذه السيرة الذاتية؟',
      confirmDeleteDesc: 'لا يمكن التراجع عن هذا الإجراء.',
      cancel: 'إلغاء',
      confirm: 'حذف',
      logout: 'تسجيل الخروج',
      premiumStatus: 'عضو مميز',
      freeStatus: 'حساب مجاني',
      upgradeHint: 'قم بتحميل أي سيرة ذاتية لفتح الميزات المميزة',
      totalCVs: 'إجمالي السير',
      thisWeek: 'هذا الأسبوع',
      templates: 'القوالب',
      searchPlaceholder: 'البحث...',
      sortRecent: 'الأحدث',
      sortName: 'الاسم',
      sortOldest: 'الأقدم',
      quickActions: 'إجراءات سريعة',
      createFromTemplate: 'إنشاء جديد',
      duplicateLast: 'نسخ الأخير',
      noResults: 'لا توجد نتائج',
      noResultsDesc: 'جرب تعديل البحث',
      upgradePro: 'الترقية',
      getUnlimited: 'تحميلات غير محدودة',
      tipText: 'أضف إنجازات قابلة للقياس لتجعل سيرتك الذاتية مميزة!'
    },
    he: {
      title: 'קורות החיים שלי',
      welcome: 'ברוך שובך',
      createNew: 'צור קורות חיים חדשים',
      noCVs: 'אין קורות חיים',
      noCVsDesc: 'צור את קורות החיים המקצועיים הראשונים שלך עכשיו!',
      edit: 'ערוך',
      delete: 'מחק',
      duplicate: 'שכפל',
      lastUpdated: 'עודכן לאחרונה',
      confirmDelete: 'למחוק קורות חיים אלה?',
      confirmDeleteDesc: 'לא ניתן לבטל פעולה זו.',
      cancel: 'ביטול',
      confirm: 'מחק',
      logout: 'התנתקות',
      premiumStatus: 'חבר פרימיום',
      freeStatus: 'חשבון חינמי',
      upgradeHint: 'הורד כל קורות חיים כדי לפתוח פרימיום',
      totalCVs: 'סה״כ',
      thisWeek: 'השבוע',
      templates: 'תבניות',
      searchPlaceholder: 'חיפוש...',
      sortRecent: 'אחרון',
      sortName: 'שם',
      sortOldest: 'ישן',
      quickActions: 'פעולות מהירות',
      createFromTemplate: 'צור חדש',
      duplicateLast: 'שכפל אחרון',
      noResults: 'לא נמצא',
      noResultsDesc: 'נסה לשנות את החיפוש',
      upgradePro: 'שדרג',
      getUnlimited: 'הורדות ללא הגבלה',
      tipText: 'הוסף הישגים מדידים כדי להבליט את קורות החיים שלך!'
    }
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let unsubscribe = null;
    let isMounted = true;

    const showCachedData = async () => {
      const [cvsResult, paymentResult] = await Promise.all([
        getUserCVs(user.uid),
        getUserPaymentStatus(user.uid)
      ]);

      if (!isMounted) return;

      if (!cvsResult.error) {
        setCvs(cvsResult.cvs);
      }
      setHasPaid(paymentResult.hasPaid || false);

      if (cvsResult.fromCache) {
        setLoading(false);
      }
    };

    showCachedData();

    unsubscribe = subscribeToUserCVs(user.uid, (updatedCvs) => {
      if (!isMounted) return;
      setCvs(updatedCvs);
      setLoading(false);
    });

    const timeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const loadCVs = useCallback(async () => {
    if (!user) return;
    const { cvs: userCVs, error } = await getUserCVs(user.uid, true);
    if (!error) {
      setCvs(userCVs);
    }
  }, [user]);

  // Filter and sort CVs
  const filteredAndSortedCVs = useMemo(() => {
    let result = [...cvs];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(cv =>
        cv.title?.toLowerCase().includes(query) ||
        cv.profession?.name?.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return (a.title || '').localeCompare(b.title || '');
      } else if (sortBy === 'oldest') {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
        return dateA - dateB;
      } else {
        const dateA = a.updatedAt?.toDate?.() || new Date(a.updatedAt || 0);
        const dateB = b.updatedAt?.toDate?.() || new Date(b.updatedAt || 0);
        return dateB - dateA;
      }
    });

    return result;
  }, [cvs, searchQuery, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentCVs = cvs.filter(cv => {
      const date = cv.updatedAt?.toDate?.() || new Date(cv.updatedAt || 0);
      return date >= weekAgo;
    });

    const templates = new Set(cvs.map(cv => cv.template || 'modern'));

    return {
      total: cvs.length,
      thisWeek: recentCVs.length,
      templates: templates.size
    };
  }, [cvs]);

  const handleCreateNew = () => {
    navigate('/builder?new=true');
  };

  const handleEdit = (cvId) => {
    navigate(`/builder/${cvId}`);
  };

  const handleDelete = async (cvId) => {
    const { error } = await deleteCV(cvId);
    if (!error) {
      setCvs(cvs.filter(cv => cv.id !== cvId));
    }
    setDeleteConfirm(null);
  };

  const handleDuplicate = async (cvId) => {
    const { id, error } = await duplicateCV(user.uid, cvId);
    if (!error && id) {
      loadCVs();
    }
  };

  const handleDuplicateLast = async () => {
    if (cvs.length > 0) {
      await handleDuplicate(cvs[0].id);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = typeof timestamp.toDate === 'function'
        ? timestamp.toDate()
        : new Date(timestamp);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'he' ? 'he-IL' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return '';
    }
  };

  const getRelativeTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = typeof timestamp.toDate === 'function'
        ? timestamp.toDate()
        : new Date(timestamp);
      if (isNaN(date.getTime())) return '';

      const now = new Date();
      const diff = now - date;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (days === 0) return language === 'ar' ? 'اليوم' : language === 'he' ? 'היום' : 'Today';
      if (days === 1) return language === 'ar' ? 'أمس' : language === 'he' ? 'אתמול' : 'Yesterday';
      if (days < 7) return `${days} ${language === 'ar' ? 'أيام' : language === 'he' ? 'ימים' : 'days ago'}`;
      return formatDate(timestamp);
    } catch (error) {
      return '';
    }
  };

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) {
      const emailPart = user.email.split('@')[0];
      return emailPart || 'User';
    }
    return 'User';
  };

  const getTemplateColor = (template) => {
    const colors = {
      pro: '#2563eb',
      modern: '#1a1a1a',
      classic: '#333',
      elegant: '#764ba2',
      minimal: '#000',
      bold: '#000',
      creative: '#16213e',
      executive: '#1a365d',
      tech: '#0891b2',
      azure: '#0077b6',
      coral: '#e07b67',
      luxe: '#d4af37',
      noir: '#1a1a1a'
    };
    return colors[template] || '#667eea';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className={`dashboard ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>{t.title}</h1>
          <p>{t.welcome}, {getUserDisplayName()}</p>
        </div>
        <div className="header-right">
          <div className={`membership-badge ${hasPaid ? 'premium' : 'free'}`}>
            {hasPaid ? <FaCrown /> : <FaFileAlt />}
            <span>{hasPaid ? t.premiumStatus : t.freeStatus}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>{t.logout}</span>
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {/* Statistics Cards */}
        <div className="stats-section">
          <div className="stat-card total">
            <div className="stat-icon">
              <FaLayerGroup />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">{t.totalCVs}</span>
            </div>
          </div>
          <div className="stat-card activity">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.thisWeek}</span>
              <span className="stat-label">{t.thisWeek}</span>
            </div>
          </div>
          <div className="stat-card templates">
            <div className="stat-icon">
              <FaStar />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.templates}</span>
              <span className="stat-label">{t.templates}</span>
            </div>
          </div>
          {!hasPaid && (
            <div className="stat-card upgrade" onClick={() => navigate('/builder?new=true')}>
              <div className="stat-icon">
                <FaRocket />
              </div>
              <div className="stat-content">
                <span className="stat-value">{t.upgradePro}</span>
                <span className="stat-label">{t.getUnlimited}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <div className="quick-actions">
            <button className="quick-action-btn primary" onClick={handleCreateNew}>
              <FaPlus />
              <span>{t.createFromTemplate}</span>
            </button>
            {cvs.length > 0 && (
              <button className="quick-action-btn secondary" onClick={handleDuplicateLast}>
                <FaCopy />
                <span>{t.duplicateLast}</span>
              </button>
            )}
          </div>
        </div>

        {/* Search and Sort */}
        {cvs.length > 0 && (
          <div className="toolbar-section">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="toolbar-actions">
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FaTh />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FaList />
                </button>
              </div>
              <div className="sort-dropdown">
                <button className="sort-btn" onClick={() => setShowFilters(!showFilters)}>
                  <FaSortAmountDown />
                  <span>{sortBy === 'recent' ? t.sortRecent : sortBy === 'name' ? t.sortName : t.sortOldest}</span>
                </button>
                {showFilters && (
                  <div className="sort-menu">
                    <button
                      className={sortBy === 'recent' ? 'active' : ''}
                      onClick={() => { setSortBy('recent'); setShowFilters(false); }}
                    >
                      <FaClock /> {t.sortRecent}
                    </button>
                    <button
                      className={sortBy === 'name' ? 'active' : ''}
                      onClick={() => { setSortBy('name'); setShowFilters(false); }}
                    >
                      <FaFileAlt /> {t.sortName}
                    </button>
                    <button
                      className={sortBy === 'oldest' ? 'active' : ''}
                      onClick={() => { setSortBy('oldest'); setShowFilters(false); }}
                    >
                      <FaCalendarAlt /> {t.sortOldest}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CV List/Grid */}
        {filteredAndSortedCVs.length === 0 ? (
          <div className="empty-state">
            {searchQuery ? (
              <>
                <FaSearch className="empty-icon" />
                <h2>{t.noResults}</h2>
                <p>{t.noResultsDesc}</p>
              </>
            ) : (
              <>
                <FaFileAlt className="empty-icon" />
                <h2>{t.noCVs}</h2>
                <p>{t.noCVsDesc}</p>
              </>
            )}
          </div>
        ) : (
          <div className={`cv-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredAndSortedCVs.map((cv) => (
              <div key={cv.id} className="cv-card" onClick={() => handleEdit(cv.id)}>
                <div className="cv-card-header">
                  <div
                    className="cv-template-badge"
                    style={{ background: getTemplateColor(cv.template) }}
                  >
                    {(cv.template || 'modern').charAt(0).toUpperCase()}
                  </div>
                  <div className="cv-info">
                    <h3>{cv.title}</h3>
                    {cv.profession && (
                      <span className="cv-profession">
                        {cv.profession.icon} {cv.profession.name}
                      </span>
                    )}
                  </div>
                  <div className="cv-card-menu">
                    <button
                      className="menu-btn duplicate"
                      onClick={(e) => { e.stopPropagation(); handleDuplicate(cv.id); }}
                      title={t.duplicate}
                    >
                      <FaCopy />
                    </button>
                    <button
                      className="menu-btn delete"
                      onClick={(e) => { e.stopPropagation(); setDeleteConfirm(cv.id); }}
                      title={t.delete}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="cv-card-body">
                  <div className="cv-meta-row">
                    <span className="cv-date">
                      <FaClock />
                      {getRelativeTime(cv.updatedAt)}
                    </span>
                    <span className="cv-template-name">
                      {cv.template || 'modern'}
                    </span>
                  </div>
                </div>

                <div className="cv-card-footer">
                  <button
                    className="action-btn edit"
                    onClick={(e) => { e.stopPropagation(); handleEdit(cv.id); }}
                  >
                    <FaEdit />
                    <span>{t.edit}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating Create Button (Mobile) */}
      <button className="floating-create-btn" onClick={handleCreateNew}>
        <FaPlus />
      </button>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <FaTrash />
            </div>
            <h3>{t.confirmDelete}</h3>
            <p>{t.confirmDeleteDesc}</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteConfirm(null)}>
                {t.cancel}
              </button>
              <button className="confirm-btn" onClick={() => handleDelete(deleteConfirm)}>
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tip Banner */}
      {!hasPaid && cvs.length > 0 && (
        <div className="tip-banner">
          <FaCheckCircle />
          <span>{t.tipText}</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

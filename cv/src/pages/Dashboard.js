import React, { useState, useEffect, useCallback } from 'react';
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
  FaCheckCircle
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isRTL = language === 'ar' || language === 'he';

  const translations = {
    en: {
      title: 'My CVs',
      welcome: 'Welcome',
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
      upgradeHint: 'Download any CV to unlock premium'
    },
    ar: {
      title: 'سيرتي الذاتية',
      welcome: 'مرحباً',
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
      upgradeHint: 'قم بتحميل أي سيرة ذاتية لفتح الميزات المميزة'
    },
    he: {
      title: 'קורות החיים שלי',
      welcome: 'שלום',
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
      upgradeHint: 'הורד כל קורות חיים כדי לפתוח פרימיום'
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

    // INSTANT: Show cached data immediately (< 50ms)
    const showCachedData = async () => {
      const [cvsResult, paymentResult] = await Promise.all([
        getUserCVs(user.uid), // Returns cached data instantly if available
        getUserPaymentStatus(user.uid)
      ]);

      if (!isMounted) return;

      if (!cvsResult.error) {
        setCvs(cvsResult.cvs);
      }
      setHasPaid(paymentResult.hasPaid || false);

      // If data came from cache, stop loading immediately
      if (cvsResult.fromCache) {
        setLoading(false);
      }
    };

    // Show cached data first (instant)
    showCachedData();

    // BACKGROUND: Subscribe to real-time updates (gets fresh data)
    unsubscribe = subscribeToUserCVs(user.uid, (updatedCvs) => {
      if (!isMounted) return;
      setCvs(updatedCvs);
      setLoading(false); // Stop loading once we have real data
    });

    // Fallback: Stop loading after 2 seconds max
    const timeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 2000);

    // Cleanup
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
    const { cvs: userCVs, error } = await getUserCVs(user.uid, true); // Force refresh
    if (!error) {
      setCvs(userCVs);
    }
  }, [user]);

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

  const handleLogout = async () => {
    await logout();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = typeof timestamp.toDate === 'function'
        ? timestamp.toDate()
        : new Date(timestamp);
      // Check for invalid date
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'he' ? 'he-IL' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // Helper to safely get user display name
  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) {
      const emailPart = user.email.split('@')[0];
      return emailPart || 'User';
    }
    return 'User';
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
        <button className="create-new-btn" onClick={handleCreateNew}>
          <FaPlus />
          <span>{t.createNew}</span>
        </button>

        {cvs.length === 0 ? (
          <div className="empty-state">
            <FaFileAlt className="empty-icon" />
            <h2>{t.noCVs}</h2>
            <p>{t.noCVsDesc}</p>
          </div>
        ) : (
          <div className="cv-grid">
            {cvs.map((cv) => (
              <div key={cv.id} className="cv-card">
                <div className="cv-card-header">
                  <FaFileAlt className="cv-icon" />
                  <div className="cv-info">
                    <h3>{cv.title}</h3>
                    {cv.profession && (
                      <span className="cv-profession">
                        {cv.profession.icon} {cv.profession.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="cv-card-meta">
                  <span className="cv-date">
                    {t.lastUpdated}: {formatDate(cv.updatedAt)}
                  </span>
                </div>

                <div className="cv-card-actions">
                  <button
                    className="action-btn edit"
                    onClick={() => handleEdit(cv.id)}
                    title={t.edit}
                  >
                    <FaEdit />
                    <span>{t.edit}</span>
                  </button>
                  <button
                    className="action-btn duplicate"
                    onClick={() => handleDuplicate(cv.id)}
                    title={t.duplicate}
                  >
                    <FaCopy />
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => setDeleteConfirm(cv.id)}
                    title={t.delete}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
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

      {!hasPaid && (
        <div className="upgrade-hint">
          <FaCheckCircle />
          <span>{t.upgradeHint}</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

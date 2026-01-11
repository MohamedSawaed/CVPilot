import React from 'react';
import { FaPalette, FaCheckCircle } from 'react-icons/fa';
import './TemplateSelector.css';

const templates = [
  {
    id: 'elegant',
    name: 'Elegant',
    nameAr: 'أنيق',
    description: 'Sophisticated gradient design with purple-rose theme',
    descriptionAr: 'تصميم متدرج راقي بألوان البنفسجي والوردي',
    bestFor: 'Creative professionals, Marketing, Design, Modern industries',
    bestForAr: 'المحترفين المبدعين، التسويق، التصميم، الصناعات الحديثة',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    features: ['Stunning gradient', 'Section icons', 'Rounded cards', 'Modern elegance'],
    featuresAr: ['تدرج مذهل', 'أيقونات الأقسام', 'بطاقات مستديرة', 'أناقة عصرية']
  },
  {
    id: 'bold',
    name: 'Bold',
    nameAr: 'راقي',
    description: 'Refined teal sidebar with sophisticated elegance',
    descriptionAr: 'شريط جانبي أخضر زمردي بأناقة راقية',
    bestFor: 'Executives, Consultants, Senior Professionals, Managers',
    bestForAr: 'المدراء التنفيذيين، الاستشاريين، كبار المحترفين',
    preview: 'linear-gradient(135deg, #1e3a3a 0%, #234545 50%, #2d5a5a 100%)',
    previewAccent: '#4db6ac',
    features: ['Elegant sidebar', 'Refined colors', 'Premium feel', 'Sophisticated'],
    featuresAr: ['شريط جانبي أنيق', 'ألوان راقية', 'مظهر فاخر', 'متطور']
  },
  {
    id: 'classic',
    name: 'Classic',
    nameAr: 'كلاسيكي',
    description: 'Traditional black & white professional',
    descriptionAr: 'تصميم تقليدي أبيض وأسود احترافي',
    bestFor: 'Corporate, Finance, Legal, Government',
    bestForAr: 'الشركات، المالية، القانون، الحكومة',
    preview: 'linear-gradient(180deg, #1a1a1a 0%, #333 100%)',
    features: ['Clean fonts', 'Black & white', 'Traditional layout', 'Timeless'],
    featuresAr: ['خطوط نظيفة', 'أبيض وأسود', 'تخطيط تقليدي', 'خالد']
  },
  {
    id: 'ats',
    name: 'ATS-Friendly',
    nameAr: 'متوافق ATS',
    description: 'Ultra-simple for applicant tracking systems',
    descriptionAr: 'بسيط جداً لأنظمة تتبع المتقدمين',
    bestFor: 'Large corporations, Online applications',
    bestForAr: 'الشركات الكبرى، التقديم الإلكتروني',
    preview: '#ffffff',
    previewBorder: true,
    features: ['No graphics', 'Machine-readable', '95% ATS pass', 'Simple'],
    featuresAr: ['بدون رسومات', 'قابل للقراءة آلياً', 'نجاح 95%', 'بسيط']
  },
  {
    id: 'executive',
    name: 'Executive',
    nameAr: 'تنفيذي',
    description: 'Luxury premium design with elegant navy & gold',
    descriptionAr: 'تصميم فاخر بألوان الكحلي والذهبي',
    bestFor: 'Executives, Directors, C-Suite, Senior Leaders',
    bestForAr: 'المديرين التنفيذيين، القيادات العليا',
    preview: 'linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%)',
    features: ['Gold accents', 'Premium feel', 'Elegant spacing', 'Leadership'],
    featuresAr: ['لمسات ذهبية', 'مظهر فاخر', 'تباعد أنيق', 'قيادي']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    nameAr: 'بسيط',
    description: 'Clean whitespace design with Swiss typography',
    descriptionAr: 'تصميم نظيف مع مساحات بيضاء وطباعة سويسرية',
    bestFor: 'Designers, Architects, Minimalists, Creatives',
    bestForAr: 'المصممين، المهندسين المعماريين، المبدعين',
    preview: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    previewBorder: true,
    previewAccent: '#0d9488',
    features: ['Max whitespace', 'Typography focus', 'Clean lines', 'Swiss design'],
    featuresAr: ['مساحات واسعة', 'تركيز على الخط', 'خطوط نظيفة', 'تصميم سويسري']
  },
  {
    id: 'tech',
    name: 'Tech',
    nameAr: 'تقني',
    description: 'Developer-focused with terminal aesthetics',
    descriptionAr: 'موجه للمطورين بأسلوب الطرفية',
    bestFor: 'Developers, Engineers, DevOps, Tech Leads',
    bestForAr: 'المطورين، المهندسين، قادة التقنية',
    preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    previewAccent: '#10b981',
    features: ['Terminal style', 'Code blocks', 'Dark theme', 'Tech-focused'],
    featuresAr: ['أسلوب الطرفية', 'كتل الكود', 'سمة داكنة', 'تقني']
  },
  {
    id: 'luxe',
    name: 'Luxe',
    nameAr: 'فاخر',
    description: 'Premium gold & black luxury design',
    descriptionAr: 'تصميم فاخر بالذهبي والأسود',
    bestFor: 'Executives, Luxury brands, High-end professionals',
    bestForAr: 'المدراء التنفيذيين، العلامات الفاخرة، المحترفين الراقيين',
    preview: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
    previewAccent: '#d4af37',
    features: ['Gold accents', 'Dark elegance', 'Premium feel', 'Luxury design'],
    featuresAr: ['لمسات ذهبية', 'أناقة داكنة', 'مظهر فاخر', 'تصميم راقي']
  },
  {
    id: 'azure',
    name: 'Azure',
    nameAr: 'أزرق سماوي',
    description: 'Professional blue gradient with modern layout',
    descriptionAr: 'تدرج أزرق احترافي مع تخطيط عصري',
    bestFor: 'Business professionals, Consultants, Corporate roles',
    bestForAr: 'محترفي الأعمال، الاستشاريين، الأدوار المؤسسية',
    preview: 'linear-gradient(135deg, #0077b6 0%, #0096c7 50%, #48cae4 100%)',
    previewAccent: '#00b4d8',
    features: ['Blue gradient', 'Timeline layout', 'Two-column', 'Professional'],
    featuresAr: ['تدرج أزرق', 'تخطيط زمني', 'عمودين', 'احترافي']
  },
  {
    id: 'noir',
    name: 'Noir',
    nameAr: 'داكن',
    description: 'Dark sophisticated design with silver accents',
    descriptionAr: 'تصميم داكن راقي مع لمسات فضية',
    bestFor: 'Creative directors, Artists, Premium industries',
    bestForAr: 'المدراء الإبداعيين، الفنانين، الصناعات الراقية',
    preview: 'linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #1a1a1a 100%)',
    previewAccent: '#a8a8a8',
    features: ['Dark theme', 'Silver accents', 'Sophisticated', 'Elegant typography'],
    featuresAr: ['سمة داكنة', 'لمسات فضية', 'متطور', 'طباعة أنيقة']
  },
  {
    id: 'coral',
    name: 'Coral',
    nameAr: 'مرجاني',
    description: 'Warm elegant design with soft coral tones',
    descriptionAr: 'تصميم دافئ أنيق بألوان المرجان',
    bestFor: 'HR professionals, Healthcare, Education, Hospitality',
    bestForAr: 'محترفي الموارد البشرية، الرعاية الصحية، التعليم، الضيافة',
    preview: 'linear-gradient(135deg, #e8a598 0%, #d4978b 50%, #be8377 100%)',
    previewAccent: '#d4978b',
    features: ['Warm tones', 'Soft elegance', 'Friendly feel', 'Modern cards'],
    featuresAr: ['ألوان دافئة', 'أناقة ناعمة', 'شعور ودي', 'بطاقات عصرية']
  }
];

function TemplateSelector({ selectedTemplate, onTemplateChange, language = 'en' }) {
  const isRTL = language === 'ar' || language === 'he';

  const getText = (template, field) => {
    if (isRTL && template[`${field}Ar`]) {
      return template[`${field}Ar`];
    }
    return template[field];
  };

  return (
    <div className={`template-selector ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="template-selector-header">
        <FaPalette className="template-selector-icon" />
        <div>
          <h3>{isRTL ? 'اختر نمط القالب' : 'Choose Template Style'}</h3>
          <p>{isRTL ? 'اختر تصميماً يناسب مجالك وتفضيلاتك' : 'Select a design that matches your industry and preferences'}</p>
        </div>
      </div>

      <div className="template-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onTemplateChange(template.id)}
          >
            {selectedTemplate === template.id && (
              <div className="template-selected-badge">
                <FaCheckCircle />
              </div>
            )}

            <div
              className="template-preview"
              style={{
                background: template.preview,
                border: template.previewBorder ? '2px solid #e2e8f0' : 'none'
              }}
            >
              {/* Elegant Preview */}
              {template.id === 'elegant' && (
                <div className="elegant-preview">
                  <div className="elegant-preview-header">
                    <div className="elegant-preview-name">NAME</div>
                    <div className="elegant-preview-headline">Professional Title</div>
                  </div>
                  <div className="elegant-preview-section">
                    <span className="elegant-preview-icon">◆</span>
                    <span>Experience</span>
                  </div>
                </div>
              )}

              {/* Bold Preview */}
              {template.id === 'bold' && (
                <div className="bold-preview">
                  <div className="bold-preview-sidebar">
                    <div className="bold-preview-avatar">JD</div>
                    <div className="bold-preview-skill-bar" style={{ background: template.previewAccent }}></div>
                    <div className="bold-preview-skill-bar short" style={{ background: template.previewAccent }}></div>
                  </div>
                  <div className="bold-preview-main">
                    <div className="bold-preview-title">Experience</div>
                    <div className="bold-preview-lines">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}

              {/* ATS Preview */}
              {template.id === 'ats' && (
                <div className="ats-preview-text">
                  <div className="ats-preview-name">NAME</div>
                  <div className="ats-preview-line"></div>
                  <div className="ats-preview-section">EXPERIENCE</div>
                  <div className="ats-preview-lines">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}

              {/* Executive Preview */}
              {template.id === 'executive' && (
                <div className="exec-preview">
                  <div className="exec-preview-gold"></div>
                  <div className="exec-preview-name">NAME</div>
                  <div className="exec-preview-line"></div>
                </div>
              )}

              {/* Minimal Preview */}
              {template.id === 'minimal' && (
                <div className="minimal-preview">
                  <div className="minimal-preview-name">Name</div>
                  <div className="minimal-preview-accent" style={{ background: template.previewAccent }}></div>
                  <div className="minimal-preview-lines">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}

              {/* Tech Preview */}
              {template.id === 'tech' && (
                <div className="tech-preview">
                  <div className="tech-preview-prompt">$ whoami</div>
                  <div className="tech-preview-name" style={{ color: template.previewAccent }}>&gt; Developer</div>
                  <div className="tech-preview-code">
                    <span style={{ color: '#10b981' }}>const</span> skills = [...]
                  </div>
                </div>
              )}

              {/* Luxe Preview */}
              {template.id === 'luxe' && (
                <div className="luxe-preview">
                  <div className="luxe-preview-gold-bar"></div>
                  <div className="luxe-preview-name">NAME</div>
                  <div className="luxe-preview-line"></div>
                  <div className="luxe-preview-diamond">◆</div>
                </div>
              )}

              {/* Azure Preview */}
              {template.id === 'azure' && (
                <div className="azure-preview">
                  <div className="azure-preview-header">
                    <div className="azure-preview-name">NAME</div>
                    <div className="azure-preview-title">Title</div>
                  </div>
                  <div className="azure-preview-content">
                    <div className="azure-preview-dot"></div>
                    <div className="azure-preview-lines">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Noir Preview */}
              {template.id === 'noir' && (
                <div className="noir-preview">
                  <div className="noir-preview-accent"></div>
                  <div className="noir-preview-name">NAME</div>
                  <div className="noir-preview-line"></div>
                  <div className="noir-preview-section">
                    <div className="noir-preview-diamond">◆</div>
                    <span>Experience</span>
                  </div>
                </div>
              )}

              {/* Coral Preview */}
              {template.id === 'coral' && (
                <div className="coral-preview">
                  <div className="coral-preview-header">
                    <div className="coral-preview-name">NAME</div>
                    <div className="coral-preview-title">Title</div>
                  </div>
                  <div className="coral-preview-card">
                    <div className="coral-preview-icon">◆</div>
                    <div className="coral-preview-lines">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="template-info">
              <h4 className="template-name">{getText(template, 'name')}</h4>
              <p className="template-description">{getText(template, 'description')}</p>

              <div className="template-best-for">
                <strong>{isRTL ? 'الأفضل لـ:' : 'Best for:'}</strong> {getText(template, 'bestFor')}
              </div>

              <div className="template-features">
                {(isRTL && template.featuresAr ? template.featuresAr : template.features).map((feature, idx) => (
                  <span key={idx} className="template-feature-tag">
                    {feature}
                  </span>
                ))}
              </div>

              <button
                className={`template-select-btn ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onTemplateChange(template.id);
                }}
              >
                {selectedTemplate === template.id ? (
                  <>
                    <FaCheckCircle /> {isRTL ? 'محدد' : 'Selected'}
                  </>
                ) : (
                  isRTL ? 'استخدم هذا القالب' : 'Use This Template'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="template-tip">
        <FaPalette />
        <p>
          {isRTL ? (
            <>
              <strong>نصيحة:</strong> استخدم Elegant للمحترفين المبدعين، Bold للمدراء، Executive للقيادة، Tech للمطورين، وATS للتقديم الإلكتروني. يمكنك تغيير القالب في أي وقت دون فقدان المحتوى!
            </>
          ) : (
            <>
              <strong>Pro Tip:</strong> Use Elegant for creatives, Bold for managers, Executive for leadership, Tech for developers, and ATS for online applications. You can switch templates anytime without losing your content!
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default TemplateSelector;

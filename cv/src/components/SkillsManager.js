import React, { useState } from 'react';
import { FaPlus, FaTimes, FaStar, FaGripVertical } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import './SkillsManager.css';

// Proficiency levels with translation keys
const PROFICIENCY_LEVEL_KEYS = [
  { value: 'beginner', labelKey: 'beginner', stars: 1, color: '#cbd5e0' },
  { value: 'intermediate', labelKey: 'intermediate', stars: 2, color: '#48bb78' },
  { value: 'advanced', labelKey: 'advanced', stars: 3, color: '#4299e1' },
  { value: 'expert', labelKey: 'expert', stars: 4, color: '#9f7aea' },
  { value: 'master', labelKey: 'master', stars: 5, color: '#f6ad55' }
];

// Skill categories with translation keys
const SKILL_CATEGORY_KEYS = [
  { id: 'technical', labelKey: 'technicalSkills', icon: '💻', placeholderKey: 'skillPlaceholderTechnical' },
  { id: 'soft', labelKey: 'softSkills', icon: '🤝', placeholderKey: 'skillPlaceholderSoft' },
  { id: 'languages', labelKey: 'languages', icon: '🌍', placeholderKey: 'skillPlaceholderLanguages' },
  { id: 'tools', labelKey: 'toolsSoftware', icon: '🛠️', placeholderKey: 'skillPlaceholderTools' },
  { id: 'frameworks', labelKey: 'frameworksLibraries', icon: '📚', placeholderKey: 'skillPlaceholderFrameworks' }
];

function SkillsManager({ skills, onChange, suggestions = [] }) {
  const { t, isRTL } = useLanguage();
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: 'intermediate', category: 'technical' });
  const [activeCategory, setActiveCategory] = useState('technical');

  // Convert old format to new format if needed
  const normalizeSkills = () => {
    if (!skills || Array.isArray(skills.technicalSkills)) {
      // Old format - convert to new format
      return {
        items: [
          ...(skills?.technicalSkills || []).map(name => ({
            id: Date.now() + Math.random(),
            name,
            proficiency: 'intermediate',
            category: 'technical'
          })),
          ...(skills?.softSkills || []).map(name => ({
            id: Date.now() + Math.random(),
            name,
            proficiency: 'intermediate',
            category: 'soft'
          })),
          ...(skills?.languages || []).map(name => ({
            id: Date.now() + Math.random(),
            name,
            proficiency: 'intermediate',
            category: 'languages'
          }))
        ]
      };
    }
    return skills;
  };

  const normalizedSkills = normalizeSkills();
  const skillItems = normalizedSkills.items || [];

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      // Check if user entered multiple skills separated by comma, semicolon, Arabic comma, or bullet points
      const skillNames = newSkill.name.split(/[,;،•\-\*]+/).map(s => s.trim()).filter(s => s);

      if (skillNames.length > 1) {
        // Multiple skills entered - add them all
        const newSkills = skillNames.map(name => ({
          id: Date.now() + Math.random(),
          name,
          proficiency: newSkill.proficiency,
          category: newSkill.category
        }));
        const updatedSkills = {
          items: [...skillItems, ...newSkills]
        };
        onChange(updatedSkills);
      } else {
        // Single skill
        const updatedSkills = {
          items: [
            ...skillItems,
            {
              id: Date.now(),
              name: newSkill.name.trim(),
              proficiency: newSkill.proficiency,
              category: newSkill.category
            }
          ]
        };
        onChange(updatedSkills);
      }
      setNewSkill({ name: '', proficiency: 'intermediate', category: activeCategory });
    }
  };

  const handleRemoveSkill = (id) => {
    const updatedSkills = {
      items: skillItems.filter(skill => skill.id !== id)
    };
    onChange(updatedSkills);
  };

  const handleUpdateProficiency = (id, proficiency) => {
    const updatedSkills = {
      items: skillItems.map(skill =>
        skill.id === id ? { ...skill, proficiency } : skill
      )
    };
    onChange(updatedSkills);
  };

  const handleBulkAdd = (text, category) => {
    // Split by comma, semicolon, Arabic comma, newline, or bullet points (•, -, *)
    const skills = text.split(/[,;،\n•\-\*]+/).map(s => s.trim()).filter(s => s);
    if (skills.length === 0) return;

    const newSkills = skills.map(name => ({
      id: Date.now() + Math.random(),
      name,
      proficiency: 'intermediate',
      category
    }));

    const updatedSkills = {
      items: [...skillItems, ...newSkills]
    };
    onChange(updatedSkills);
  };

  const handleAddSuggestion = (skillName) => {
    const updatedSkills = {
      items: [
        ...skillItems,
        {
          id: Date.now(),
          name: skillName,
          proficiency: 'intermediate',
          category: activeCategory
        }
      ]
    };
    onChange(updatedSkills);
  };

  const getSkillsByCategory = (category) => {
    return skillItems.filter(skill => skill.category === category);
  };

  const renderProficiencyStars = (proficiency, skillId) => {
    const level = PROFICIENCY_LEVEL_KEYS.find(l => l.value === proficiency) || PROFICIENCY_LEVEL_KEYS[1];

    return (
      <div className="proficiency-stars">
        {[1, 2, 3, 4, 5].map(star => (
          <FaStar
            key={star}
            className={`star ${star <= level.stars ? 'filled' : ''}`}
            style={{ color: star <= level.stars ? level.color : '#e2e8f0' }}
            onClick={() => {
              const newLevel = PROFICIENCY_LEVEL_KEYS[star - 1];
              handleUpdateProficiency(skillId, newLevel.value);
            }}
          />
        ))}
        <span className="proficiency-label">{t(level.labelKey)}</span>
      </div>
    );
  };

  const renderSkillItem = (skill) => (
    <div key={skill.id} className="skill-item">
      <div className="skill-grip">
        <FaGripVertical />
      </div>
      <div className="skill-info">
        <div className="skill-name">{skill.name}</div>
        {renderProficiencyStars(skill.proficiency, skill.id)}
      </div>
      <button
        type="button"
        className="remove-skill-btn"
        onClick={() => handleRemoveSkill(skill.id)}
        title="Remove skill"
      >
        <FaTimes />
      </button>
    </div>
  );

  return (
    <div className="skills-manager">
      {/* Category Tabs */}
      <div className="skill-categories-tabs">
        {SKILL_CATEGORY_KEYS.map(category => {
          const categorySkills = getSkillsByCategory(category.id);
          return (
            <button
              key={category.id}
              type="button"
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setNewSkill({ ...newSkill, category: category.id });
              }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-label">{t(category.labelKey)}</span>
              <span className="category-count">{categorySkills.length}</span>
            </button>
          );
        })}
      </div>

      {/* Active Category Content */}
      <div className="category-content">
        <div className="category-header">
          <h4>
            {SKILL_CATEGORY_KEYS.find(c => c.id === activeCategory)?.icon}
            {' '}
            {t(SKILL_CATEGORY_KEYS.find(c => c.id === activeCategory)?.labelKey)}
          </h4>
          <div className="skill-count-badge">
            {getSkillsByCategory(activeCategory).length} {t('skills')}
          </div>
        </div>

        {/* Add New Skill */}
        <div className="add-skill-section">
          <div className="add-skill-row">
            <input
              type="text"
              className="skill-name-input"
              placeholder={t(SKILL_CATEGORY_KEYS.find(c => c.id === activeCategory)?.placeholderKey)}
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              dir={isRTL ? 'rtl' : 'ltr'}
            />

            <select
              className="proficiency-select"
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
            >
              {PROFICIENCY_LEVEL_KEYS.map(level => (
                <option key={level.value} value={level.value}>
                  {t(level.labelKey)} {'★'.repeat(level.stars)}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="add-skill-btn"
              onClick={handleAddSkill}
              disabled={!newSkill.name.trim()}
            >
              <FaPlus /> {t('addSkill')}
            </button>
          </div>

          <div className="bulk-add-hint">
            💡 <strong>{t('quickTip')}:</strong> {t('bulkAddHint')}
          </div>
        </div>

        {/* Skill List */}
        <div className="skills-list">
          {getSkillsByCategory(activeCategory).length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p>{t('noSkillsYet')}</p>
              <small>{t('addFirstSkill')}</small>
            </div>
          ) : (
            getSkillsByCategory(activeCategory).map(skill => renderSkillItem(skill))
          )}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && activeCategory === 'technical' && (
          <div className="skill-suggestions">
            <h5>💡 {t('suggestedSkills')}</h5>
            <div className="suggestion-chips">
              {suggestions.slice(0, 8).map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => handleAddSuggestion(suggestion)}
                >
                  <FaPlus /> {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="skills-summary">
        <div className="summary-stat">
          <div className="stat-value">{skillItems.length}</div>
          <div className="stat-label">{t('totalSkills')}</div>
        </div>
        <div className="summary-stat">
          <div className="stat-value">
            {skillItems.filter(s => s.proficiency === 'expert' || s.proficiency === 'master').length}
          </div>
          <div className="stat-label">{t('expertLevel')}</div>
        </div>
        <div className="summary-stat">
          <div className="stat-value">{SKILL_CATEGORY_KEYS.filter(c => getSkillsByCategory(c.id).length > 0).length}</div>
          <div className="stat-label">{t('categoriesCount')}</div>
        </div>
      </div>
    </div>
  );
}

export default SkillsManager;

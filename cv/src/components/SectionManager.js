import React, { useState } from 'react';
import { FaPlus, FaTimes, FaEye, FaEyeSlash, FaGripVertical } from 'react-icons/fa';
import { sectionDefinitions, createCustomSection } from '../data/templates';
import { useLanguage } from '../context/LanguageContext';
import './SectionManager.css';

function SectionManager({ activeSections, onUpdateSections, allSectionKeys, customSections = {}, onAddCustomSection }) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customSectionName, setCustomSectionName] = useState('');
  const [customSectionRepeatable, setCustomSectionRepeatable] = useState(true);
  const { t, isRTL } = useLanguage();

  // Combine built-in and custom sections
  const allDefinitions = { ...sectionDefinitions, ...customSections };
  const availableSections = allSectionKeys.filter(key => !activeSections.includes(key));

  const handleAddSection = (sectionKey) => {
    onUpdateSections([...activeSections, sectionKey]);
    setShowAddMenu(false);
  };

  const handleRemoveSection = (sectionKey) => {
    // Don't allow removing required sections
    if (sectionKey === 'personalInfo') {
      alert(t('personalInfoRequired') || 'Personal Information section is required and cannot be removed.');
      return;
    }
    onUpdateSections(activeSections.filter(key => key !== sectionKey));
  };

  const handleToggleVisibility = (sectionKey) => {
    // For now, just remove it. In the future, we could have a "hidden" state
    handleRemoveSection(sectionKey);
  };

  const handleMoveSection = (index, direction) => {
    const newSections = [...activeSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    onUpdateSections(newSections);
  };

  const handleCreateCustomSection = () => {
    if (!customSectionName.trim()) return;

    const newSection = createCustomSection(customSectionName.trim(), customSectionRepeatable);

    // Add to custom sections
    if (onAddCustomSection) {
      onAddCustomSection(newSection.id, {
        title: customSectionName.trim(),
        icon: newSection.icon,
        repeatable: customSectionRepeatable,
        isCustom: true,
        fields: newSection.fields
      });
    }

    // Add to active sections
    onUpdateSections([...activeSections, newSection.id]);

    // Reset form
    setCustomSectionName('');
    setCustomSectionRepeatable(true);
    setShowCustomForm(false);
    setShowAddMenu(false);
  };

  return (
    <div className={`section-manager ${isRTL ? 'rtl' : ''}`}>
      <div className="section-manager-header">
        <h3>📋 {t('cvSections') || 'CV Sections'}</h3>
        <p>{t('manageSections') || 'Manage which sections appear in your CV and their order'}</p>
      </div>

      {/* Active Sections List */}
      <div className="active-sections-list">
        {activeSections.map((sectionKey, index) => {
          const section = allDefinitions[sectionKey];
          if (!section) return null;

          const Icon = section.icon;
          const isRequired = sectionKey === 'personalInfo';
          const isCustom = section.isCustom || sectionKey.startsWith('custom_');

          return (
            <div key={sectionKey} className={`section-item ${isCustom ? 'custom-section' : ''}`}>
              <div className="section-drag-handle">
                <FaGripVertical />
              </div>

              <div className="section-icon-wrapper">
                {Icon && <Icon className="section-item-icon" />}
              </div>

              <div className="section-info">
                <div className="section-title">
                  {t(sectionKey) || section.title}
                  {isRequired && <span className="required-badge">{t('required') || 'Required'}</span>}
                  {isCustom && <span className="custom-badge">{t('custom') || 'Custom'}</span>}
                </div>
                <div className="section-meta">
                  {section.repeatable ? (t('multipleItems') || 'Multiple items') : (t('singleItem') || 'Single item')}
                </div>
              </div>

              <div className="section-actions">
                <button
                  type="button"
                  className="section-action-btn move-btn"
                  onClick={() => handleMoveSection(index, 'up')}
                  disabled={index === 0}
                  title={t('moveUp') || 'Move up'}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="section-action-btn move-btn"
                  onClick={() => handleMoveSection(index, 'down')}
                  disabled={index === activeSections.length - 1}
                  title={t('moveDown') || 'Move down'}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="section-action-btn remove-btn"
                  onClick={() => handleRemoveSection(sectionKey)}
                  disabled={isRequired}
                  title={isRequired ? (t('requiredSection') || 'Required section') : (t('removeSection') || 'Remove section')}
                >
                  {isRequired ? <FaEye /> : <FaTimes />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Section Button */}
      <div className="add-section-wrapper">
        {!showAddMenu ? (
          <button
            type="button"
            className="add-section-btn"
            onClick={() => setShowAddMenu(true)}
          >
            <FaPlus /> {t('addSection') || 'Add Section'}
          </button>
        ) : (
          <div className="add-section-menu">
            <div className="add-section-header">
              <h4>{t('selectSectionToAdd') || 'Select Section to Add'}</h4>
              <button
                type="button"
                className="close-menu-btn"
                onClick={() => { setShowAddMenu(false); setShowCustomForm(false); }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Custom Section Form */}
            {showCustomForm ? (
              <div className="custom-section-form">
                <h5>{t('createCustomSection') || 'Create Custom Section'}</h5>
                <input
                  type="text"
                  placeholder={t('sectionName') || 'Section name...'}
                  value={customSectionName}
                  onChange={(e) => setCustomSectionName(e.target.value)}
                  className="custom-section-input"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <label className="repeatable-checkbox">
                  <input
                    type="checkbox"
                    checked={customSectionRepeatable}
                    onChange={(e) => setCustomSectionRepeatable(e.target.checked)}
                  />
                  {t('allowMultipleItems') || 'Allow multiple items'}
                </label>
                <div className="custom-form-actions">
                  <button
                    type="button"
                    className="create-custom-btn"
                    onClick={handleCreateCustomSection}
                    disabled={!customSectionName.trim()}
                  >
                    <FaPlus /> {t('create') || 'Create'}
                  </button>
                  <button
                    type="button"
                    className="cancel-custom-btn"
                    onClick={() => { setShowCustomForm(false); setCustomSectionName(''); }}
                  >
                    {t('cancel') || 'Cancel'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="available-sections-grid">
                  {availableSections.map(sectionKey => {
                    const section = allDefinitions[sectionKey];
                    if (!section) return null;

                    const Icon = section.icon;

                    return (
                      <button
                        key={sectionKey}
                        type="button"
                        className="available-section-card"
                        onClick={() => handleAddSection(sectionKey)}
                      >
                        <div className="available-section-icon">
                          {Icon && <Icon />}
                        </div>
                        <div className="available-section-title">{t(sectionKey) || section.title}</div>
                        <div className="available-section-type">
                          {section.repeatable ? (t('multiple') || 'Multiple') : (t('single') || 'Single')}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Section Button */}
                <div className="create-custom-section-wrapper">
                  <button
                    type="button"
                    className="create-custom-section-btn"
                    onClick={() => setShowCustomForm(true)}
                  >
                    <FaPlus /> {t('createCustomSection') || 'Create Custom Section'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Section Count */}
      <div className="section-count-info">
        <div className="count-badge">
          {activeSections.length} {t('of') || 'of'} {allSectionKeys.length} {t('sectionsActive') || 'sections active'}
        </div>
        {availableSections.length === 0 && (
          <div className="all-sections-active">
            ✓ {t('allSectionsActive') || 'All available sections are active'}
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionManager;

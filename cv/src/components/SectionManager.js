import React, { useState } from 'react';
import { FaPlus, FaTimes, FaEye, FaEyeSlash, FaGripVertical } from 'react-icons/fa';
import { sectionDefinitions } from '../data/templates';
import './SectionManager.css';

function SectionManager({ activeSections, onUpdateSections, allSectionKeys }) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const availableSections = allSectionKeys.filter(key => !activeSections.includes(key));

  const handleAddSection = (sectionKey) => {
    onUpdateSections([...activeSections, sectionKey]);
    setShowAddMenu(false);
  };

  const handleRemoveSection = (sectionKey) => {
    // Don't allow removing required sections
    if (sectionKey === 'personalInfo') {
      alert('Personal Information section is required and cannot be removed.');
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

  return (
    <div className="section-manager">
      <div className="section-manager-header">
        <h3>📋 CV Sections</h3>
        <p>Manage which sections appear in your CV and their order</p>
      </div>

      {/* Active Sections List */}
      <div className="active-sections-list">
        {activeSections.map((sectionKey, index) => {
          const section = sectionDefinitions[sectionKey];
          if (!section) return null;

          const Icon = section.icon;
          const isRequired = sectionKey === 'personalInfo';

          return (
            <div key={sectionKey} className="section-item">
              <div className="section-drag-handle">
                <FaGripVertical />
              </div>

              <div className="section-icon-wrapper">
                <Icon className="section-item-icon" />
              </div>

              <div className="section-info">
                <div className="section-title">
                  {section.title}
                  {isRequired && <span className="required-badge">Required</span>}
                </div>
                <div className="section-meta">
                  {section.repeatable ? 'Multiple items' : 'Single item'}
                </div>
              </div>

              <div className="section-actions">
                <button
                  type="button"
                  className="section-action-btn move-btn"
                  onClick={() => handleMoveSection(index, 'up')}
                  disabled={index === 0}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="section-action-btn move-btn"
                  onClick={() => handleMoveSection(index, 'down')}
                  disabled={index === activeSections.length - 1}
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="section-action-btn remove-btn"
                  onClick={() => handleRemoveSection(sectionKey)}
                  disabled={isRequired}
                  title={isRequired ? 'Required section' : 'Remove section'}
                >
                  {isRequired ? <FaEye /> : <FaTimes />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Section Button */}
      {availableSections.length > 0 && (
        <div className="add-section-wrapper">
          {!showAddMenu ? (
            <button
              type="button"
              className="add-section-btn"
              onClick={() => setShowAddMenu(true)}
            >
              <FaPlus /> Add Section
            </button>
          ) : (
            <div className="add-section-menu">
              <div className="add-section-header">
                <h4>Select Section to Add</h4>
                <button
                  type="button"
                  className="close-menu-btn"
                  onClick={() => setShowAddMenu(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="available-sections-grid">
                {availableSections.map(sectionKey => {
                  const section = sectionDefinitions[sectionKey];
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
                        <Icon />
                      </div>
                      <div className="available-section-title">{section.title}</div>
                      <div className="available-section-type">
                        {section.repeatable ? 'Multiple' : 'Single'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section Count */}
      <div className="section-count-info">
        <div className="count-badge">
          {activeSections.length} of {allSectionKeys.length} sections active
        </div>
        {availableSections.length === 0 && (
          <div className="all-sections-active">
            ✓ All available sections are active
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionManager;

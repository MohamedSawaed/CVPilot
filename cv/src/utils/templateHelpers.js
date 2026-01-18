// Template helper functions for CV rendering

import React from 'react';

/**
 * Renders a description as bullet points
 * Splits text by newlines and renders each line as a list item
 * @param {string} description - The description text
 * @param {string} className - CSS class for the list
 * @param {function} r - RTL-aware render function (optional)
 * @returns {JSX.Element|null}
 */
export const renderDescriptionAsBullets = (description, className = '', r = (text) => text) => {
  if (!description) return null;

  // Split by newlines and filter empty lines
  const lines = String(description).split('\n').filter(line => line.trim());

  if (lines.length === 0) return null;

  return (
    <ul className={className}>
      {lines.map((line, index) => {
        // Remove leading bullet/dash if already present
        const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
        return <li key={index}>{r(cleanLine)}</li>;
      })}
    </ul>
  );
};

/**
 * Checks if description has multiple lines (for conditional rendering)
 * @param {string} description - The description text
 * @returns {boolean}
 */
export const hasMultipleLines = (description) => {
  if (!description) return false;
  const lines = String(description).split('\n').filter(line => line.trim());
  return lines.length > 1;
};

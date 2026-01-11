// Smart CV Section Arrangement Based on User Profile

// Helper to safely check if a section exists in profession
const professionHasSection = (profession, sectionName) => {
  if (!profession || !Array.isArray(profession.sections)) return false;
  return profession.sections.includes(sectionName);
};

// Default sections for when profession is undefined
const DEFAULT_SECTIONS = ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'achievements'];

/**
 * Arranges CV sections based on user's experience level and profile
 * @param {Object} profession - Selected profession
 * @param {Object} userProfile - User's questionnaire answers
 * @returns {Array} - Optimally arranged section order
 */
export const arrangeCV = (profession, userProfile) => {
  // Handle undefined profession - return default section order
  if (!profession || !Array.isArray(profession.sections)) {
    console.warn('arrangeCV: profession or profession.sections is undefined, using defaults');
    return DEFAULT_SECTIONS;
  }

  // Handle undefined userProfile (e.g., when editing existing CV)
  // Provide sensible defaults that result in a standard section order
  const profile = userProfile || {};

  const {
    experienceLevel = '3-5',  // Default to mid-level arrangement
    degree = 'bachelor',
    yearsInField = '3',
    currentRole = '',
    careerGoal = '',
    focusArea = 'experience',  // Default to experience-focused
    hasPublications = false,
    hasProjects = true,  // Include common sections by default
    hasCertifications = true,
    hasAchievements = true,
    hasLicenses = false,
    hasPortfolio = false
  } = profile;

  // Base sections that always appear
  const baseSections = ['personalInfo'];
  const optionalSections = [];
  const endSections = [];

  // Parse experience years
  const years = parseInt(yearsInField) || 0;

  // Determine arrangement strategy based on experience level
  const isEntryLevel = experienceLevel === '0-2' || years <= 2;
  const isMidLevel = experienceLevel === '3-5' || (years >= 3 && years <= 5);
  const isSenior = experienceLevel === '6-10' || years >= 6;
  const isExpert = experienceLevel === '10+' || years >= 10;

  // Check if degree is advanced (Master's, PhD, Professional)
  const hasAdvancedDegree = ['master', 'phd', 'professional'].includes(degree);

  // USER'S FOCUS AREA DRIVES PRIMARY ARRANGEMENT
  if (focusArea === 'education') {
    // User wants to emphasize education
    optionalSections.push('summary', 'education', 'skills', 'experience');

    if (hasCertifications && professionHasSection(profession, 'certifications')) {
      optionalSections.push('certifications');
    }
    if (hasProjects && professionHasSection(profession, 'projects')) {
      optionalSections.push('projects');
    }
    if (hasPublications && professionHasSection(profession, 'publications')) {
      optionalSections.push('publications');
    }
    if (hasAchievements && professionHasSection(profession, 'achievements')) {
      optionalSections.push('achievements');
    }
    if (hasLicenses && professionHasSection(profession, 'licenses')) {
      optionalSections.push('licenses');
    }
    if (hasPortfolio && professionHasSection(profession, 'portfolio')) {
      optionalSections.push('portfolio');
    }
  }
  else if (focusArea === 'skills') {
    // User wants to emphasize skills (good for career changers or technical roles)
    optionalSections.push('summary', 'skills', 'experience', 'education');

    if (hasProjects && professionHasSection(profession, 'projects')) {
      optionalSections.splice(2, 0, 'projects'); // Projects right after skills
    }
    if (hasCertifications && professionHasSection(profession, 'certifications')) {
      optionalSections.push('certifications');
    }
    if (hasAchievements && professionHasSection(profession, 'achievements')) {
      optionalSections.push('achievements');
    }
    if (hasPublications && professionHasSection(profession, 'publications')) {
      optionalSections.push('publications');
    }
    if (hasLicenses && professionHasSection(profession, 'licenses')) {
      optionalSections.push('licenses');
    }
    if (hasPortfolio && professionHasSection(profession, 'portfolio')) {
      optionalSections.splice(2, 0, 'portfolio'); // Portfolio right after skills
    }
  }
  else if (focusArea === 'achievements') {
    // User wants to emphasize achievements
    optionalSections.push('summary', 'experience');

    if (hasAchievements && professionHasSection(profession, 'achievements')) {
      optionalSections.push('achievements');
    }
    if (hasPublications && professionHasSection(profession, 'publications')) {
      optionalSections.push('publications');
    }

    optionalSections.push('skills');

    if (hasCertifications && professionHasSection(profession, 'certifications')) {
      optionalSections.push('certifications');
    }
    if (hasLicenses && professionHasSection(profession, 'licenses')) {
      optionalSections.push('licenses');
    }
    if (hasProjects && professionHasSection(profession, 'projects')) {
      optionalSections.push('projects');
    }
    if (hasPortfolio && professionHasSection(profession, 'portfolio')) {
      optionalSections.push('portfolio');
    }

    optionalSections.push('education');
  }
  else {
    // Default: focusArea === 'experience' OR not specified
    // Use traditional experience-level based arrangement

    // STRATEGY 1: Entry Level (0-2 years)
    if (isEntryLevel) {
      // For entry level, education comes first if they have good credentials
      if (hasAdvancedDegree || degree === 'bachelor') {
        optionalSections.push('summary', 'education', 'skills', 'experience');

        // Add projects if user indicated they have them
        if (hasProjects && professionHasSection(profession, 'projects')) {
          optionalSections.push('projects');
        }

        // Add certifications if user indicated they have them
        if (hasCertifications && professionHasSection(profession, 'certifications')) {
          optionalSections.push('certifications');
        }
      } else {
        // For entry level without degree, lead with skills and summary
        optionalSections.push('summary', 'skills', 'experience', 'education');

        if (hasProjects && professionHasSection(profession, 'projects')) {
          optionalSections.push('projects');
        }
      }

      // Add other sections if user has them
      if (hasAchievements && professionHasSection(profession, 'achievements')) {
        optionalSections.push('achievements');
      }
      if (hasPublications && professionHasSection(profession, 'publications')) {
        optionalSections.push('publications');
      }
      if (hasLicenses && professionHasSection(profession, 'licenses')) {
        optionalSections.push('licenses');
      }
      if (hasPortfolio && professionHasSection(profession, 'portfolio')) {
        optionalSections.push('portfolio');
      }
    }

    // STRATEGY 2: Mid Level (3-5 years)
    else if (isMidLevel) {
      // For mid-level, lead with summary and experience
      optionalSections.push('summary', 'experience', 'skills', 'education');

      // Add profession-specific sections if user has them
      if (hasProjects && professionHasSection(profession, 'projects')) {
        optionalSections.push('projects');
      }
      if (hasCertifications && professionHasSection(profession, 'certifications')) {
        optionalSections.push('certifications');
      }
      if (hasAchievements && professionHasSection(profession, 'achievements')) {
        optionalSections.push('achievements');
      }
      if (hasPublications && professionHasSection(profession, 'publications')) {
        optionalSections.push('publications');
      }
      if (hasLicenses && professionHasSection(profession, 'licenses')) {
        optionalSections.push('licenses');
      }
      if (hasPortfolio && professionHasSection(profession, 'portfolio')) {
        optionalSections.push('portfolio');
      }
    }

    // STRATEGY 3: Senior Level (6-10 years)
    else if (isSenior) {
      // For senior, emphasize experience and leadership
      optionalSections.push('summary', 'experience', 'skills');

      // Add achievements if user has them (important for senior level)
      if (hasAchievements && professionHasSection(profession, 'achievements')) {
        optionalSections.push('achievements');
      }

      // Add certifications if user has them
      if (hasCertifications && professionHasSection(profession, 'certifications')) {
        optionalSections.push('certifications');
      }

      // Education comes later for senior professionals
      optionalSections.push('education');

      // Add other sections if user has them
      if (hasProjects && professionHasSection(profession, 'projects')) {
        optionalSections.push('projects');
      }
      if (hasPublications && professionHasSection(profession, 'publications')) {
        optionalSections.push('publications');
      }
      if (hasLicenses && professionHasSection(profession, 'licenses')) {
        optionalSections.push('licenses');
      }
      if (hasPortfolio && professionHasSection(profession, 'portfolio')) {
        optionalSections.push('portfolio');
      }
    }

    // STRATEGY 4: Expert Level (10+ years)
    else if (isExpert) {
      // For experts, lead with powerful summary and experience
      optionalSections.push('summary', 'experience');

      // Add achievements prominently if user has them
      if (hasAchievements && professionHasSection(profession, 'achievements')) {
        optionalSections.push('achievements');
      }

      // Add publications if user has them (common for experts)
      if (hasPublications && professionHasSection(profession, 'publications')) {
        optionalSections.push('publications');
      }

      optionalSections.push('skills');

      // Certifications and licenses if user has them
      if (hasCertifications && professionHasSection(profession, 'certifications')) {
        optionalSections.push('certifications');
      }
      if (hasLicenses && professionHasSection(profession, 'licenses')) {
        optionalSections.push('licenses');
      }

      // Education at the end for experts
      optionalSections.push('education');

      // Add other sections
      if (hasProjects && professionHasSection(profession, 'projects')) {
        optionalSections.push('projects');
      }
      if (hasPortfolio && professionHasSection(profession, 'portfolio')) {
        optionalSections.push('portfolio');
      }
    }
  } // Close the else block for default experience-based arrangement

  // PROFESSION-SPECIFIC ADJUSTMENTS (only if user indicated they have these sections)

  // Doctors and Lawyers: Licenses are critical
  if (['doctor', 'lawyer'].includes(profession.id)) {
    if (hasLicenses && professionHasSection(profession, 'licenses')) {
      // Move licenses right after summary
      const licensesIndex = optionalSections.indexOf('licenses');
      if (licensesIndex > -1) {
        optionalSections.splice(licensesIndex, 1);
        optionalSections.splice(1, 0, 'licenses'); // Insert after summary
      } else if (optionalSections.includes('summary')) {
        const summaryIndex = optionalSections.indexOf('summary');
        optionalSections.splice(summaryIndex + 1, 0, 'licenses');
      }
    }

    // Publications are important for medical and legal professionals
    if (hasPublications && professionHasSection(profession, 'publications') && (isSenior || isExpert)) {
      const pubIndex = optionalSections.indexOf('publications');
      if (pubIndex === -1) {
        // Add publications before education
        const eduIndex = optionalSections.indexOf('education');
        if (eduIndex > -1) {
          optionalSections.splice(eduIndex, 0, 'publications');
        } else {
          optionalSections.push('publications');
        }
      }
    }
  }

  // Designers: Portfolio is critical
  if (profession.id === 'designer') {
    if (hasPortfolio && professionHasSection(profession, 'portfolio')) {
      // Portfolio should be prominent
      const portfolioIndex = optionalSections.indexOf('portfolio');
      if (portfolioIndex > -1 && portfolioIndex > 2) {
        optionalSections.splice(portfolioIndex, 1);
        optionalSections.splice(2, 0, 'portfolio'); // After summary and experience
      } else if (portfolioIndex === -1) {
        optionalSections.splice(2, 0, 'portfolio');
      }
    }
  }

  // Engineers: Projects are important
  if (profession.id === 'engineer') {
    if (hasProjects && professionHasSection(profession, 'projects')) {
      const projectsIndex = optionalSections.indexOf('projects');
      if (projectsIndex > 3) {
        // Move projects up if it's too far down
        optionalSections.splice(projectsIndex, 1);
        optionalSections.splice(3, 0, 'projects');
      }
    }
  }

  // Accountant: Certifications (CPA) are critical
  if (profession.id === 'accountant') {
    if (hasCertifications && professionHasSection(profession, 'certifications')) {
      const certIndex = optionalSections.indexOf('certifications');
      if (certIndex > -1 && certIndex > 2) {
        optionalSections.splice(certIndex, 1);
        optionalSections.splice(2, 0, 'certifications'); // After summary and experience
      } else if (certIndex === -1) {
        optionalSections.splice(2, 0, 'certifications');
      }
    }
  }

  // Sales: Achievements should be prominent
  if (profession.id === 'sales') {
    if (hasAchievements && professionHasSection(profession, 'achievements')) {
      const achIndex = optionalSections.indexOf('achievements');
      if (achIndex > -1 && achIndex > 2) {
        optionalSections.splice(achIndex, 1);
        optionalSections.splice(2, 0, 'achievements'); // After summary and experience
      } else if (achIndex === -1) {
        optionalSections.splice(2, 0, 'achievements');
      }
    }
  }

  // CAREER GOAL ADJUSTMENTS
  if (careerGoal) {
    const goalLower = careerGoal.toLowerCase();

    // If changing careers or pivoting, emphasize skills
    if (goalLower.includes('career change') || goalLower.includes('transition') || goalLower.includes('pivot')) {
      const skillsIndex = optionalSections.indexOf('skills');
      if (skillsIndex > 2) {
        optionalSections.splice(skillsIndex, 1);
        optionalSections.splice(2, 0, 'skills'); // Move skills up
      }
    }

    // If seeking leadership role, emphasize achievements
    if (goalLower.includes('leadership') || goalLower.includes('manager') || goalLower.includes('director')) {
      if (professionHasSection(profession, 'achievements')) {
        const achIndex = optionalSections.indexOf('achievements');
        if (achIndex === -1) {
          optionalSections.splice(2, 0, 'achievements');
        } else if (achIndex > 3) {
          optionalSections.splice(achIndex, 1);
          optionalSections.splice(2, 0, 'achievements');
        }
      }
    }
  }

  // Remove duplicates while preserving order
  const uniqueSections = [...new Set(optionalSections)];

  // Filter to only include sections that exist in the profession
  const finalSections = uniqueSections.filter(section =>
    professionHasSection(profession,(section)
  );

  // Combine all sections
  const arrangedSections = [...baseSections, ...finalSections, ...endSections];

  return arrangedSections;
};

/**
 * Get explanation for why sections are arranged this way (returns translation keys)
 * @param {Object} profession - Selected profession
 * @param {Object} userProfile - User's questionnaire answers
 * @returns {Object} - Explanation object with translation keys
 */
export const getArrangementExplanation = (profession, userProfile) => {
  // Handle undefined userProfile
  const profile = userProfile || {};
  const { experienceLevel = '3-5', degree = 'bachelor', yearsInField = '3' } = profile;
  const years = parseInt(yearsInField) || 0;

  const explanations = {
    titleKey: '',
    reasonKey: '',
    tipKeys: []
  };

  // Entry Level
  if (experienceLevel === '0-2' || years <= 2) {
    explanations.titleKey = 'entryLevelStructure';

    if (['master', 'phd', 'professional'].includes(degree)) {
      explanations.reasonKey = 'entryLevelAdvancedDegreeReason';
      explanations.tipKeys = [
        'entryLevelAdvancedDegreeTip1',
        'entryLevelAdvancedDegreeTip2',
        'entryLevelAdvancedDegreeTip3',
        'entryLevelAdvancedDegreeTip4'
      ];
    } else {
      explanations.reasonKey = 'entryLevelSkillsReason';
      explanations.tipKeys = [
        'entryLevelSkillsTip1',
        'entryLevelSkillsTip2',
        'entryLevelSkillsTip3',
        'entryLevelSkillsTip4'
      ];
    }
  }

  // Mid Level
  else if ((experienceLevel === '3-5' || (years >= 3 && years <= 5))) {
    explanations.titleKey = 'midLevelStructure';
    explanations.reasonKey = 'midLevelReason';
    explanations.tipKeys = [
      'midLevelTip1',
      'midLevelTip2',
      'midLevelTip3',
      'midLevelTip4'
    ];
  }

  // Senior Level
  else if (years >= 6 && years < 10) {
    explanations.titleKey = 'seniorLevelStructure';
    explanations.reasonKey = 'seniorLevelReason';
    explanations.tipKeys = [
      'seniorLevelTip1',
      'seniorLevelTip2',
      'seniorLevelTip3',
      'seniorLevelTip4'
    ];
  }

  // Expert Level
  else if (years >= 10) {
    explanations.titleKey = 'expertLevelStructure';
    explanations.reasonKey = 'expertLevelReason';
    explanations.tipKeys = [
      'expertLevelTip1',
      'expertLevelTip2',
      'expertLevelTip3',
      'expertLevelTip4'
    ];
  }

  return explanations;
};

/**
 * Get section priority weights for scoring
 * @param {Object} userProfile - User's questionnaire answers
 * @returns {Object} - Section weights
 */
export const getSectionWeights = (userProfile) => {
  // Handle undefined userProfile
  const profile = userProfile || {};
  const { experienceLevel = '3-5', yearsInField = '3' } = profile;
  const years = parseInt(yearsInField) || 0;

  // Default weights
  const weights = {
    personalInfo: 10,
    summary: 15,
    experience: 30,
    education: 15,
    skills: 20,
    certifications: 5,
    projects: 5
  };

  // Adjust based on experience level
  if (experienceLevel === '0-2' || years <= 2) {
    // Entry level: Education and projects matter more
    weights.education = 25;
    weights.projects = 15;
    weights.experience = 20;
  } else if (years >= 10) {
    // Expert: Experience and achievements matter most
    weights.experience = 40;
    weights.achievements = 15;
    weights.education = 5;
  }

  return weights;
};

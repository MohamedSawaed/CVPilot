// ATS-Friendly Resume Scoring System

export const calculateResumeScore = (cvData, profession) => {
  // Return default score if cvData is undefined
  if (!cvData) {
    return {
      totalScore: 0,
      maxScore: 100,
      percentage: 0,
      scores: { completeness: 0, atsCompatibility: 0, contentQuality: 0, formatting: 0, keywords: 0 },
      feedback: [{ category: 'Overall', type: 'error', message: 'No CV data provided' }],
      grade: 'F'
    };
  }

  const scores = {
    completeness: 0,
    atsCompatibility: 0,
    contentQuality: 0,
    formatting: 0,
    keywords: 0
  };

  const feedback = [];
  let totalScore = 0;

  // Safely get arrays with defaults - ensure arrays
  const personalInfo = cvData.personalInfo || {};
  const experience = Array.isArray(cvData.experience) ? cvData.experience : [];
  const education = Array.isArray(cvData.education) ? cvData.education : [];
  const skills = cvData.skills || {};
  const technicalSkills = Array.isArray(skills.technicalSkills) ? skills.technicalSkills : [];
  const softSkills = Array.isArray(skills.softSkills) ? skills.softSkills : [];
  const summary = cvData.summary || '';

  // 1. Completeness Score (30 points)
  let completenessPoints = 0;

  // Personal Info (5 points)
  if (personalInfo.fullName && personalInfo.email && personalInfo.phone) {
    completenessPoints += 5;
  } else {
    feedback.push({
      category: 'Completeness',
      type: 'error',
      message: 'Complete all required personal information fields'
    });
  }

  // Summary (5 points)
  if (summary && summary.length >= 100) {
    completenessPoints += 5;
  } else if (summary) {
    completenessPoints += 2;
    feedback.push({
      category: 'Completeness',
      type: 'warning',
      message: 'Professional summary should be at least 100 characters'
    });
  } else {
    feedback.push({
      category: 'Completeness',
      type: 'error',
      message: 'Add a professional summary'
    });
  }

  // Experience (10 points)
  if (experience.length > 0) {
    const completeExperiences = experience.filter(exp =>
      exp.jobTitle && exp.company && exp.description
    );
    completenessPoints += Math.min(10, completeExperiences.length * 5);
  } else {
    feedback.push({
      category: 'Completeness',
      type: 'error',
      message: 'Add at least one work experience entry'
    });
  }

  // Education (5 points)
  if (education.length > 0) {
    const completeEducation = education.filter(edu =>
      edu.degree && edu.institution
    );
    if (completeEducation.length > 0) {
      completenessPoints += 5;
    }
  } else {
    feedback.push({
      category: 'Completeness',
      type: 'warning',
      message: 'Add at least one education entry'
    });
  }

  // Skills (5 points)
  const skillsCount = (technicalSkills.filter(s => s).length || 0) +
                      (softSkills.filter(s => s).length || 0);
  if (skillsCount >= 5) {
    completenessPoints += 5;
  } else if (skillsCount > 0) {
    completenessPoints += 2;
    feedback.push({
      category: 'Completeness',
      type: 'warning',
      message: 'Add at least 5 skills total'
    });
  }

  scores.completeness = completenessPoints;

  // 2. ATS Compatibility Score (25 points)
  let atsPoints = 0;

  // Check for standard section headers
  if (summary) atsPoints += 5;
  if (experience.length > 0) atsPoints += 5;
  if (education.length > 0) atsPoints += 5;
  if (technicalSkills.length > 0) atsPoints += 5;

  // Check for contact info
  if (personalInfo.email && personalInfo.phone) {
    atsPoints += 5;
  } else {
    feedback.push({
      category: 'ATS',
      type: 'error',
      message: 'Include both email and phone number for ATS compatibility'
    });
  }

  scores.atsCompatibility = atsPoints;

  // 3. Content Quality Score (25 points)
  let contentPoints = 0;

  // Check for quantifiable achievements
  const experienceText = experience.map(exp => exp.description || '').join(' ');
  const hasNumbers = /\d+/.test(experienceText);
  const hasPercentages = /%/.test(experienceText);

  if (hasNumbers && hasPercentages) {
    contentPoints += 10;
  } else if (hasNumbers) {
    contentPoints += 5;
    feedback.push({
      category: 'Content',
      type: 'suggestion',
      message: 'Include percentages and metrics to quantify your impact'
    });
  } else {
    feedback.push({
      category: 'Content',
      type: 'warning',
      message: 'Add quantifiable achievements (numbers, percentages, metrics)'
    });
  }

  // Check for action verbs
  const actionVerbs = ['led', 'developed', 'created', 'managed', 'implemented', 'increased',
                       'improved', 'reduced', 'achieved', 'designed', 'built', 'launched'];
  const lowerExperienceText = experienceText.toLowerCase();
  const usedActionVerbs = actionVerbs.filter(verb => lowerExperienceText.includes(verb));

  if (usedActionVerbs.length >= 5) {
    contentPoints += 10;
  } else if (usedActionVerbs.length >= 3) {
    contentPoints += 5;
    feedback.push({
      category: 'Content',
      type: 'suggestion',
      message: 'Use more strong action verbs (led, developed, improved, etc.)'
    });
  } else {
    feedback.push({
      category: 'Content',
      type: 'warning',
      message: 'Start bullet points with strong action verbs'
    });
  }

  // Check summary quality
  if (summary && summary.length >= 150) {
    contentPoints += 5;
  }

  scores.contentQuality = contentPoints;

  // 4. Formatting Score (10 points)
  let formatPoints = 0;

  // Check for bullet points in experience
  experience.forEach(exp => {
    if (exp.description && (exp.description.includes('•') || exp.description.includes('\n'))) {
      formatPoints += 2;
    }
  });

  // Check for consistent date formatting
  const hasDates = experience.length === 0 || experience.every(exp => exp.startDate);
  if (hasDates) {
    formatPoints += 3;
  } else {
    feedback.push({
      category: 'Formatting',
      type: 'warning',
      message: 'Add dates to all experience entries'
    });
  }

  // Check for location info
  const hasLocations = experience.some(exp => exp.location);
  if (hasLocations) {
    formatPoints += 3;
  }

  scores.formatting = Math.min(10, formatPoints);

  // 5. Keywords Score (10 points)
  let keywordPoints = 0;

  // Check if resume includes profession-specific skills
  if (profession && profession.suggestedSkills) {
    const allSkillsText = [
      ...technicalSkills,
      ...softSkills,
      experienceText,
      summary
    ].join(' ').toLowerCase();

    const matchedSkills = profession.suggestedSkills.filter(skill =>
      allSkillsText.includes(skill.toLowerCase())
    );

    keywordPoints = Math.min(10, (matchedSkills.length / profession.suggestedSkills.length) * 10);

    if (matchedSkills.length < profession.suggestedSkills.length / 2) {
      feedback.push({
        category: 'Keywords',
        type: 'suggestion',
        message: `Consider adding more ${profession.name}-relevant skills: ${profession.suggestedSkills.slice(0, 3).join(', ')}`
      });
    }
  }

  scores.keywords = Math.round(keywordPoints);

  // Calculate total score
  totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Add overall feedback
  if (totalScore >= 90) {
    feedback.unshift({
      category: 'Overall',
      type: 'success',
      message: 'Excellent! Your resume is highly competitive and ATS-friendly.'
    });
  } else if (totalScore >= 70) {
    feedback.unshift({
      category: 'Overall',
      type: 'success',
      message: 'Good job! Your resume is on the right track. Address the suggestions below to improve further.'
    });
  } else if (totalScore >= 50) {
    feedback.unshift({
      category: 'Overall',
      type: 'warning',
      message: 'Your resume needs improvement. Focus on completing all sections and adding quantifiable achievements.'
    });
  } else {
    feedback.unshift({
      category: 'Overall',
      type: 'error',
      message: 'Your resume needs significant work. Complete all required sections and follow the suggestions below.'
    });
  }

  return {
    totalScore,
    maxScore: 100,
    percentage: totalScore,
    scores,
    feedback,
    grade: getGrade(totalScore)
  };
};

const getGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

// ATS keyword checker
export const checkATSKeywords = (cvData, jobDescription) => {
  if (!jobDescription || !cvData) return null;

  const personalInfo = cvData.personalInfo || {};
  const experience = Array.isArray(cvData.experience) ? cvData.experience : [];
  const skills = cvData.skills || {};
  const technicalSkills = Array.isArray(skills.technicalSkills) ? skills.technicalSkills : [];
  const softSkills = Array.isArray(skills.softSkills) ? skills.softSkills : [];

  const resumeText = [
    personalInfo.fullName || '',
    cvData?.summary || '',
    ...experience.map(exp => `${exp.jobTitle || ''} ${exp.description || ''}`),
    ...technicalSkills,
    ...softSkills
  ].join(' ').toLowerCase();

  // Extract potential keywords from job description (simplified)
  const jobKeywords = jobDescription
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 3)
    .filter((word, index, arr) => arr.indexOf(word) === index);

  const matchedKeywords = jobKeywords.filter(keyword =>
    resumeText.includes(keyword)
  );

  const matchRate = (matchedKeywords.length / jobKeywords.length) * 100;

  return {
    matchRate: Math.round(matchRate),
    matchedKeywords: matchedKeywords.slice(0, 20),
    missingKeywords: jobKeywords.filter(k => !matchedKeywords.includes(k)).slice(0, 20)
  };
};

// Resume length checker
export const checkResumeLength = (cvData) => {
  if (!cvData) {
    return { wordCount: 0, ideal: false, feedback: 'No CV data provided' };
  }
  const experience = Array.isArray(cvData.experience) ? cvData.experience : [];
  const summary = cvData.summary || '';

  const wordCount = [
    summary,
    ...experience.map(exp => exp.description || '')
  ].join(' ').split(/\s+/).filter(w => w).length;

  let feedback = '';
  if (wordCount < 200) {
    feedback = 'Your resume is too short. Add more detail about your experience and achievements.';
  } else if (wordCount > 800) {
    feedback = 'Your resume might be too long. Keep it concise and focus on the most relevant information.';
  } else {
    feedback = 'Your resume length is appropriate.';
  }

  return {
    wordCount,
    ideal: wordCount >= 200 && wordCount <= 800,
    feedback
  };
};

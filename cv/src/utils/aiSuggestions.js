// AI-Powered Content Suggestions Engine

// Power words and action verbs categorized by function
const actionVerbs = {
  leadership: ['Led', 'Directed', 'Managed', 'Supervised', 'Coordinated', 'Orchestrated', 'Spearheaded', 'Championed', 'Mentored', 'Guided'],
  achievement: ['Achieved', 'Exceeded', 'Surpassed', 'Accomplished', 'Delivered', 'Attained', 'Completed', 'Succeeded', 'Won', 'Earned'],
  improvement: ['Improved', 'Enhanced', 'Optimized', 'Streamlined', 'Upgraded', 'Modernized', 'Transformed', 'Revitalized', 'Strengthened', 'Boosted'],
  creation: ['Created', 'Developed', 'Designed', 'Built', 'Established', 'Launched', 'Initiated', 'Founded', 'Pioneered', 'Introduced'],
  analysis: ['Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Investigated', 'Examined', 'Studied', 'Measured', 'Calculated', 'Determined'],
  reduction: ['Reduced', 'Decreased', 'Cut', 'Eliminated', 'Minimized', 'Lowered', 'Saved', 'Trimmed', 'Consolidated', 'Pruned'],
  increase: ['Increased', 'Grew', 'Expanded', 'Amplified', 'Accelerated', 'Maximized', 'Multiplied', 'Escalated', 'Raised', 'Scaled']
};

// Industry-specific power words
const industryKeywords = {
  engineer: ['architected', 'engineered', 'programmed', 'debugged', 'automated', 'deployed', 'integrated', 'refactored', 'optimized', 'scaled'],
  doctor: ['diagnosed', 'treated', 'prescribed', 'examined', 'consulted', 'operated', 'rehabilitated', 'administered', 'monitored', 'prevented'],
  accountant: ['audited', 'reconciled', 'forecasted', 'budgeted', 'analyzed', 'reported', 'computed', 'allocated', 'filed', 'processed'],
  teacher: ['taught', 'educated', 'instructed', 'trained', 'mentored', 'tutored', 'facilitated', 'coached', 'demonstrated', 'assessed'],
  marketing: ['marketed', 'promoted', 'branded', 'campaigned', 'advertised', 'positioned', 'targeted', 'segmented', 'launched', 'optimized'],
  designer: ['designed', 'illustrated', 'prototyped', 'conceptualized', 'visualized', 'rendered', 'crafted', 'composed', 'styled', 'branded'],
  lawyer: ['litigated', 'negotiated', 'drafted', 'argued', 'represented', 'counseled', 'mediated', 'advised', 'reviewed', 'filed'],
  sales: ['sold', 'closed', 'negotiated', 'prospected', 'pitched', 'presented', 'upsold', 'converted', 'retained', 'acquired']
};

// Generate suggestions for professional summary
export const generateSummarySuggestions = (summary, profession, userProfile) => {
  const suggestions = [];

  // Safe access to optional parameters
  const professionName = profession?.name || 'Professional';
  const yearsInField = userProfile?.yearsInField || '5';

  // Check length
  if (!summary || summary.length < 50) {
    suggestions.push({
      type: 'structure',
      priority: 'high',
      message: 'Start with a strong opening that includes your job title and years of experience',
      example: `${professionName} with ${yearsInField}+ years of experience...`
    });
  }

  // Check for missing elements
  const hasYearsExperience = /\d+\+?\s*(year|yr)/i.test(summary);
  const hasSpecialization = summary.toLowerCase().includes('speciali');
  const hasAchievement = /\d+%|\$\d+|increase|improve|reduce/i.test(summary);

  if (!hasYearsExperience) {
    suggestions.push({
      type: 'content',
      priority: 'medium',
      message: 'Mention your years of experience to establish credibility',
      example: `With ${yearsInField} years of experience in ${professionName.toLowerCase()}...`
    });
  }

  if (!hasSpecialization) {
    suggestions.push({
      type: 'content',
      priority: 'medium',
      message: 'Highlight your area of specialization or expertise',
      example: 'Specializing in [your specialty]...'
    });
  }

  if (!hasAchievement) {
    suggestions.push({
      type: 'impact',
      priority: 'high',
      message: 'Include a quantifiable achievement to demonstrate your impact',
      example: 'Track record of increasing efficiency by 40% and reducing costs by $50K...'
    });
  }

  // Check for passive voice
  const passiveIndicators = ['was', 'were', 'been', 'being'];
  const hasPassive = passiveIndicators.some(word => summary.toLowerCase().includes(word));

  if (hasPassive) {
    suggestions.push({
      type: 'writing',
      priority: 'low',
      message: 'Use active voice instead of passive voice for stronger impact',
      example: 'Instead of "was responsible for", use "Led" or "Managed"'
    });
  }

  return suggestions;
};

// Generate suggestions for work experience descriptions
export const generateExperienceSuggestions = (description, jobTitle, profession) => {
  const suggestions = [];

  if (!description || description.length < 50) {
    suggestions.push({
      type: 'structure',
      priority: 'high',
      message: 'Add at least 3-5 bullet points describing your key responsibilities and achievements',
      example: '• Led a team of 5 developers\n• Increased system performance by 40%\n• Implemented automated testing'
    });
    return suggestions;
  }

  // Check for metrics and numbers
  const hasNumbers = /\d+/.test(description);
  const hasPercentage = /%/.test(description);
  const hasDollar = /\$/.test(description);
  const hasMetrics = hasNumbers && (hasPercentage || hasDollar);

  if (!hasMetrics) {
    suggestions.push({
      type: 'impact',
      priority: 'high',
      message: 'Quantify your achievements with specific numbers, percentages, or dollar amounts',
      examples: [
        'Increased sales by 35%',
        'Managed a budget of $500K',
        'Reduced processing time by 2 hours per day',
        'Served 1000+ customers daily'
      ]
    });
  }

  // Check for action verbs
  const lines = description.split('\n').filter(l => l.trim());
  const weakStarters = lines.filter(line => {
    const firstWord = line.trim().replace(/^[•\-*]\s*/, '').split(' ')[0].toLowerCase();
    return ['responsible', 'duties', 'worked', 'helped', 'assisted', 'was', 'did'].includes(firstWord);
  });

  if (weakStarters.length > 0) {
    const professionVerbs = industryKeywords[profession.id] || [];
    suggestions.push({
      type: 'writing',
      priority: 'high',
      message: 'Start each bullet point with a strong action verb',
      examples: [
        ...actionVerbs.leadership.slice(0, 3),
        ...actionVerbs.achievement.slice(0, 3),
        ...professionVerbs.slice(0, 3)
      ].filter((v, i, arr) => arr.indexOf(v) === i)
    });
  }

  // Check for bullet point formatting
  const hasBullets = description.includes('•') || description.includes('\n');
  if (!hasBullets && description.length > 100) {
    suggestions.push({
      type: 'formatting',
      priority: 'medium',
      message: 'Break down your description into bullet points for better readability',
      example: '• Achievement one\n• Achievement two\n• Achievement three'
    });
  }

  // Check for results-oriented language
  const resultWords = ['achieved', 'delivered', 'resulted', 'generated', 'produced', 'outcome', 'impact'];
  const hasResults = resultWords.some(word => description.toLowerCase().includes(word));

  if (!hasResults) {
    suggestions.push({
      type: 'content',
      priority: 'medium',
      message: 'Focus on results and outcomes rather than just duties',
      example: 'Instead of "Responsible for marketing campaigns", use "Delivered 5 marketing campaigns generating $2M in revenue"'
    });
  }

  // Check description length per bullet
  const avgBulletLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
  if (avgBulletLength > 150) {
    suggestions.push({
      type: 'formatting',
      priority: 'low',
      message: 'Keep bullet points concise (1-2 lines each) for better readability',
      example: 'Break long sentences into multiple focused bullet points'
    });
  }

  return suggestions;
};

// Generate skill recommendations
export const generateSkillSuggestions = (currentSkills, profession) => {
  const suggestions = [];

  // Safely access skill arrays
  const skills = currentSkills || {};
  const technicalSkills = Array.isArray(skills.technicalSkills) ? skills.technicalSkills : [];
  const softSkills = Array.isArray(skills.softSkills) ? skills.softSkills : [];

  const allCurrentSkills = [
    ...technicalSkills,
    ...softSkills
  ].filter(Boolean).map(s => (s || '').toLowerCase());

  // Suggest profession-specific skills
  const suggestedSkills = Array.isArray(profession?.suggestedSkills) ? profession.suggestedSkills : [];
  const professionName = profession?.name || 'your field';

  if (suggestedSkills.length > 0) {
    const missingSkills = suggestedSkills.filter(skill =>
      skill && !allCurrentSkills.some(current => current.includes(skill.toLowerCase()))
    );

    if (missingSkills.length > 0) {
      suggestions.push({
        type: 'skills',
        priority: 'medium',
        message: `Consider adding these ${professionName}-relevant skills:`,
        skills: missingSkills.slice(0, 5)
      });
    }
  }

  // Check skill count
  const totalSkills = technicalSkills.filter(s => s).length +
                      softSkills.filter(s => s).length;

  if (totalSkills < 5) {
    suggestions.push({
      type: 'completeness',
      priority: 'high',
      message: 'Add more skills to strengthen your resume (aim for 8-12 total skills)',
      example: 'Include a mix of technical skills and soft skills relevant to your role'
    });
  }

  if (totalSkills > 20) {
    suggestions.push({
      type: 'optimization',
      priority: 'low',
      message: 'Focus on your strongest and most relevant skills (8-15 is ideal)',
      example: 'Remove less relevant or basic skills to keep the list focused'
    });
  }

  return suggestions;
};

// Generate achievement enhancement suggestions
export const enhanceAchievement = (text) => {
  const enhancements = [];

  // Template suggestions based on common patterns
  const templates = [
    {
      pattern: /improve/i,
      suggestion: 'Consider adding "by X%" after improvement statements',
      example: 'Improved system performance by 45%'
    },
    {
      pattern: /led|manage/i,
      suggestion: 'Specify team size and deliverables',
      example: 'Led a team of 8 engineers to deliver 3 major features ahead of schedule'
    },
    {
      pattern: /create|develop|build/i,
      suggestion: 'Mention the impact or adoption of what you created',
      example: 'Developed a new feature used by 50,000+ daily active users'
    },
    {
      pattern: /reduce|decrease/i,
      suggestion: 'Quantify the reduction and its business impact',
      example: 'Reduced processing time by 3 hours daily, saving $100K annually'
    }
  ];

  templates.forEach(template => {
    if (template.pattern.test(text)) {
      enhancements.push({
        type: 'enhancement',
        message: template.suggestion,
        example: template.example
      });
    }
  });

  return enhancements;
};

// Get alternative action verbs
export const getActionVerbAlternatives = (currentVerb) => {
  const verb = currentVerb.toLowerCase();

  for (const [category, verbs] of Object.entries(actionVerbs)) {
    if (verbs.some(v => v.toLowerCase() === verb)) {
      return {
        category,
        alternatives: verbs.filter(v => v.toLowerCase() !== verb).slice(0, 5)
      };
    }
  }

  return null;
};

// Generate complete resume improvement plan
export const generateImprovementPlan = (cvData, profession, userProfile) => {
  const plan = {
    priority: [],
    quick_wins: [],
    longterm: []
  };

  // Check summary
  if (!cvData.summary || cvData.summary.length < 100) {
    plan.priority.push({
      section: 'Professional Summary',
      action: 'Write a compelling 2-3 sentence summary',
      impact: 'High - First thing recruiters read',
      estimatedTime: '10 minutes'
    });
  }

  // Check experience quantification
  const hasQuantifiedExp = cvData.experience.some(exp =>
    exp.description && /\d+%|\$\d+/.test(exp.description)
  );

  if (!hasQuantifiedExp) {
    plan.priority.push({
      section: 'Work Experience',
      action: 'Add metrics and numbers to quantify your achievements',
      impact: 'High - Shows measurable impact',
      estimatedTime: '20 minutes'
    });
  }

  // Check skills
  const totalSkills = (cvData.skills.technicalSkills?.filter(s => s).length || 0) +
                      (cvData.skills.softSkills?.filter(s => s).length || 0);

  if (totalSkills < 8) {
    plan.quick_wins.push({
      section: 'Skills',
      action: 'Add 3-5 more relevant skills',
      impact: 'Medium - Improves keyword matching',
      estimatedTime: '5 minutes'
    });
  }

  return plan;
};

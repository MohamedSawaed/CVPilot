// AI Content Enhancement Utility
// Provides smart suggestions, bullet point expansion, and professional writing assistance

/**
 * Action verbs categorized by job function and impact level
 */
export const actionVerbs = {
  leadership: ['Led', 'Directed', 'Managed', 'Orchestrated', 'Spearheaded', 'Coordinated', 'Supervised', 'Mentored', 'Guided', 'Championed'],
  achievement: ['Achieved', 'Exceeded', 'Delivered', 'Accomplished', 'Attained', 'Secured', 'Won', 'Earned', 'Obtained', 'Realized'],
  improvement: ['Improved', 'Enhanced', 'Optimized', 'Streamlined', 'Transformed', 'Upgraded', 'Modernized', 'Refined', 'Revitalized', 'Strengthened'],
  creation: ['Created', 'Developed', 'Designed', 'Built', 'Established', 'Launched', 'Implemented', 'Initiated', 'Pioneered', 'Architected'],
  analysis: ['Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Investigated', 'Examined', 'Identified', 'Diagnosed', 'Reviewed', 'Audited'],
  collaboration: ['Collaborated', 'Partnered', 'Coordinated', 'Facilitated', 'United', 'Aligned', 'Integrated', 'Engaged', 'Liaised', 'Contributed'],
  growth: ['Grew', 'Expanded', 'Increased', 'Scaled', 'Multiplied', 'Accelerated', 'Boosted', 'Amplified', 'Maximized', 'Elevated'],
  problemSolving: ['Resolved', 'Solved', 'Troubleshot', 'Debugged', 'Fixed', 'Rectified', 'Remedied', 'Addressed', 'Mitigated', 'Overcame']
};

/**
 * Metric templates for quantifying achievements
 */
export const metricTemplates = [
  'by {X}%',
  'from {X} to {Y}',
  'worth ${X}',
  'across {X} locations/teams/departments',
  'for {X} clients/users/customers',
  'within {X} months/weeks',
  'saving ${X} annually',
  'generating ${X} in revenue',
  'reaching {X}+ users/downloads',
  'managing ${X} budget'
];

/**
 * Expand a short bullet point into a professional, detailed version
 * @param {string} text - Short bullet point
 * @param {string} profession - User's profession
 * @param {string} context - Additional context (job title, company, etc.)
 * @returns {object} - Expanded versions with different levels
 */
export const expandBulletPoint = (text, profession = '', context = '') => {
  const textLower = text.toLowerCase().trim();

  // Detect the type of achievement
  const hasTeam = /team|manage|lead|supervise|coordinate/i.test(text);
  const hasImprovement = /improve|enhance|optimize|increase|reduce|decrease/i.test(text);
  const hasCreation = /create|develop|build|design|launch|implement/i.test(text);
  const hasProblemSolving = /fix|solve|resolve|debug|troubleshoot/i.test(text);

  const suggestions = [];

  // Level 1: Basic expansion (add action verb + context)
  if (hasTeam) {
    suggestions.push({
      level: 'basic',
      text: `Led cross-functional ${text}, coordinating daily activities and ensuring alignment with organizational goals`,
      rationale: 'Added leadership context and scope'
    });
  } else if (hasImprovement) {
    suggestions.push({
      level: 'basic',
      text: `Successfully ${text}, implementing data-driven strategies and best practices`,
      rationale: 'Added methodology and approach'
    });
  } else if (hasCreation) {
    suggestions.push({
      level: 'basic',
      text: `${text.charAt(0).toUpperCase() + text.slice(1)} from concept to deployment, collaborating with stakeholders throughout the development lifecycle`,
      rationale: 'Added project lifecycle context'
    });
  } else {
    suggestions.push({
      level: 'basic',
      text: `${text.charAt(0).toUpperCase() + text.slice(1)}, contributing to team objectives and organizational success`,
      rationale: 'Added professional framing'
    });
  }

  // Level 2: Intermediate (add metrics placeholder)
  if (hasTeam) {
    suggestions.push({
      level: 'intermediate',
      text: `Led team of [X] professionals in ${textLower}, achieving [Y]% improvement in [metric] and ensuring timely delivery of all milestones`,
      rationale: 'Added team size and performance metrics',
      needsInput: ['team size', 'improvement percentage', 'key metric']
    });
  } else if (hasImprovement) {
    suggestions.push({
      level: 'intermediate',
      text: `${text.charAt(0).toUpperCase() + text.slice(1)} by [X]%, implementing innovative solutions that resulted in [specific outcome] and [additional benefit]`,
      rationale: 'Added quantifiable results and outcomes',
      needsInput: ['percentage improvement', 'specific outcome', 'additional benefit']
    });
  } else if (hasCreation) {
    suggestions.push({
      level: 'intermediate',
      text: `${text.charAt(0).toUpperCase() + text.slice(1)} serving [X] users/clients, which generated [Y] in value and received [Z]% satisfaction rating`,
      rationale: 'Added scale, impact, and user satisfaction',
      needsInput: ['number of users', 'value generated', 'satisfaction score']
    });
  } else {
    suggestions.push({
      level: 'intermediate',
      text: `${text.charAt(0).toUpperCase() + text.slice(1)}, resulting in [X]% increase in [metric] and recognition as [achievement]`,
      rationale: 'Added measurable outcomes',
      needsInput: ['percentage', 'metric', 'recognition']
    });
  }

  // Level 3: Advanced (full STAR method: Situation, Task, Action, Result)
  suggestions.push({
    level: 'advanced',
    text: `Identified opportunity to ${textLower} in response to [business need/challenge]. Spearheaded initiative by [specific actions taken], collaborating with [stakeholders]. Successfully delivered [X]% improvement in [key metric], resulting in $[Y] in annual savings/revenue and establishing new best practices adopted company-wide`,
    rationale: 'Complete STAR format with business context and comprehensive results',
    needsInput: ['business need', 'specific actions', 'stakeholders', 'percentage improvement', 'key metric', 'financial impact']
  });

  return suggestions;
};

/**
 * Generate professional summary based on user profile
 * @param {object} profile - User profile data
 * @returns {array} - Multiple summary options
 */
export const generateSummary = (profile) => {
  const { profession, experienceLevel, yearsInField, currentRole, degree, careerGoal } = profile;
  const years = parseInt(yearsInField) || 0;
  const professionName = profession?.name || 'Professional';

  const summaries = [];

  // Determine experience descriptor
  let experienceDesc = '';
  if (years <= 2) experienceDesc = 'motivated';
  else if (years <= 5) experienceDesc = 'accomplished';
  else if (years <= 10) experienceDesc = 'seasoned';
  else experienceDesc = 'highly experienced';

  // Style 1: Achievement-focused
  summaries.push({
    style: 'achievement-focused',
    text: `${experienceDesc.charAt(0).toUpperCase() + experienceDesc.slice(1)} ${professionName} with ${years}+ years of proven expertise in delivering exceptional results. Track record of [key achievement], [key achievement], and [key achievement]. Known for [key strength] and [key strength]. ${careerGoal ? `Seeking to leverage experience in ${careerGoal.toLowerCase()}.` : 'Ready to drive innovation and excellence in next role.'}`,
    bestFor: 'Highlighting accomplishments and results'
  });

  // Style 2: Skills-focused
  summaries.push({
    style: 'skills-focused',
    text: `Results-driven ${professionName} with ${years}+ years specializing in [core skill], [core skill], and [core skill]. Expertise in [technical/functional area] with demonstrated ability to [key capability]. ${degree === 'master' || degree === 'phd' ? `Advanced degree holder with strong analytical and problem-solving skills. ` : ''}Passionate about [industry focus] and committed to continuous learning and professional growth.`,
    bestFor: 'Emphasizing technical expertise and capabilities'
  });

  // Style 3: Value proposition
  summaries.push({
    style: 'value-proposition',
    text: `${professionName} who transforms challenges into opportunities through [approach/methodology]. ${years}+ years of experience driving [business impact] and [business impact]. Proven ability to [key capability] while [key capability]. Strong background in [domain area] with expertise in [specific area]. ${careerGoal ? `Looking to bring this value to ${careerGoal.toLowerCase()}.` : 'Ready to contribute strategic value to forward-thinking organization.'}`,
    bestFor: 'Showing unique value and business impact'
  });

  // Style 4: Story-driven
  if (years >= 3) {
    summaries.push({
      style: 'story-driven',
      text: `Started career in ${professionName.toLowerCase()} with a passion for [area of interest]. Over ${years} years, progressed from [earlier role] to ${currentRole || 'current role'}, consistently delivering [type of results]. Recognized for [strength/achievement] and [strength/achievement]. ${careerGoal ? `Now seeking next challenge in ${careerGoal.toLowerCase()} where I can continue to make meaningful impact.` : 'Excited to bring this journey and expertise to ambitious team or organization.'}`,
      bestFor: 'Creating narrative and showing career progression'
    });
  }

  return summaries;
};

/**
 * Suggest action verbs based on context
 * @param {string} text - Current text
 * @param {string} context - Context (leadership, technical, etc.)
 * @returns {array} - Suggested action verbs
 */
export const suggestActionVerbs = (text, context = 'general') => {
  const textLower = text.toLowerCase();
  const suggestions = [];

  // Detect weak verbs
  const weakVerbs = ['did', 'made', 'was responsible for', 'worked on', 'helped', 'participated', 'involved in', 'tasked with'];

  weakVerbs.forEach(weak => {
    if (textLower.includes(weak)) {
      // Suggest alternatives based on context
      if (textLower.includes('team') || textLower.includes('people')) {
        suggestions.push(...actionVerbs.leadership.slice(0, 3));
      } else if (textLower.includes('improve') || textLower.includes('better')) {
        suggestions.push(...actionVerbs.improvement.slice(0, 3));
      } else if (textLower.includes('build') || textLower.includes('create')) {
        suggestions.push(...actionVerbs.creation.slice(0, 3));
      } else if (textLower.includes('fix') || textLower.includes('problem')) {
        suggestions.push(...actionVerbs.problemSolving.slice(0, 3));
      } else {
        suggestions.push(...actionVerbs.achievement.slice(0, 3));
      }
    }
  });

  // If no weak verbs found, suggest based on general context
  if (suggestions.length === 0) {
    if (context === 'leadership') suggestions.push(...actionVerbs.leadership.slice(0, 5));
    else if (context === 'technical') suggestions.push(...actionVerbs.creation.slice(0, 5));
    else if (context === 'sales') suggestions.push(...actionVerbs.growth.slice(0, 5));
    else suggestions.push(...actionVerbs.achievement.slice(0, 5));
  }

  return [...new Set(suggestions)]; // Remove duplicates
};

/**
 * Analyze text for improvement opportunities
 * @param {string} text - Text to analyze
 * @returns {object} - Analysis with suggestions
 */
export const analyzeContent = (text) => {
  if (!text || text.trim().length === 0) {
    return {
      score: 0,
      issues: ['Content is empty'],
      suggestions: ['Add content to get suggestions']
    };
  }

  const analysis = {
    score: 100,
    issues: [],
    suggestions: [],
    strengths: []
  };

  const textLower = text.toLowerCase();
  const wordCount = text.split(/\s+/).length;

  // Check length
  if (wordCount < 10) {
    analysis.score -= 20;
    analysis.issues.push('Too brief - add more detail');
    analysis.suggestions.push('Expand to 15-30 words for optimal impact');
  } else if (wordCount > 50) {
    analysis.score -= 10;
    analysis.issues.push('Too lengthy - consider condensing');
    analysis.suggestions.push('Keep bullet points to 30-40 words for readability');
  } else {
    analysis.strengths.push('Good length');
  }

  // Check for action verbs
  const hasStrongVerb = Object.values(actionVerbs).flat().some(verb =>
    textLower.startsWith(verb.toLowerCase())
  );

  if (!hasStrongVerb) {
    analysis.score -= 15;
    analysis.issues.push('Weak or missing action verb');
    analysis.suggestions.push('Start with a strong action verb (e.g., Led, Developed, Achieved)');
  } else {
    analysis.strengths.push('Strong action verb');
  }

  // Check for metrics/numbers
  const hasNumbers = /\d+/.test(text) || /\$|%/.test(text);

  if (!hasNumbers) {
    analysis.score -= 20;
    analysis.issues.push('Missing quantifiable results');
    analysis.suggestions.push('Add metrics: percentages, dollar amounts, team sizes, timeframes');
  } else {
    analysis.strengths.push('Includes metrics');
  }

  // Check for weak phrases
  const weakPhrases = ['responsible for', 'duties included', 'worked on', 'helped with', 'participated in', 'involved in'];
  const hasWeakPhrase = weakPhrases.some(phrase => textLower.includes(phrase));

  if (hasWeakPhrase) {
    analysis.score -= 15;
    analysis.issues.push('Contains weak passive phrases');
    analysis.suggestions.push('Replace passive phrases with active accomplishments');
  }

  // Check for first person
  if (/\b(i|me|my|mine)\b/i.test(text)) {
    analysis.score -= 10;
    analysis.issues.push('Contains first-person pronouns');
    analysis.suggestions.push('Remove "I", "me", "my" - use action verbs directly');
  }

  // Check for outcome/result
  const hasResult = /result|achiev|improv|increas|decreas|reduc|grow|deliver|success|complet/i.test(text);

  if (hasResult) {
    analysis.strengths.push('Shows results/outcomes');
  } else {
    analysis.score -= 15;
    analysis.issues.push('Missing clear outcome or result');
    analysis.suggestions.push('Add the impact or result of your action (e.g., "resulting in...", "achieving...")');
  }

  return analysis;
};

/**
 * Generate skill suggestions based on profession
 * @param {string} professionId - Profession ID
 * @param {array} currentSkills - Currently listed skills
 * @returns {array} - Suggested skills to add
 */
export const suggestSkills = (professionId, currentSkills = []) => {
  const skillsByProfession = {
    doctor: ['Patient Care', 'Clinical Diagnosis', 'Medical Records Management', 'Emergency Medicine', 'Surgical Procedures', 'Patient Communication', 'Electronic Health Records (EHR)', 'Medical Research', 'Evidence-Based Medicine', 'Team Leadership'],
    engineer: ['Problem Solving', 'System Design', 'Code Review', 'Agile/Scrum', 'Technical Documentation', 'Testing & Debugging', 'Version Control (Git)', 'CI/CD', 'Cloud Platforms (AWS/Azure)', 'API Development'],
    accountant: ['Financial Reporting', 'Tax Preparation', 'Bookkeeping', 'Auditing', 'QuickBooks/Xero', 'Excel (Advanced)', 'GAAP/IFRS', 'Budget Management', 'Financial Analysis', 'Reconciliation'],
    teacher: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Differentiated Instruction', 'Educational Technology', 'Lesson Planning', 'Parent Communication', 'Learning Management Systems', 'Special Education Support', 'Student Motivation'],
    marketing: ['Digital Marketing', 'SEO/SEM', 'Content Strategy', 'Social Media Marketing', 'Google Analytics', 'Email Marketing', 'Campaign Management', 'Brand Development', 'Marketing Automation', 'A/B Testing'],
    designer: ['Adobe Creative Suite', 'UI/UX Design', 'Figma/Sketch', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'Typography', 'Color Theory', 'Responsive Design'],
    lawyer: ['Legal Research', 'Contract Drafting', 'Litigation', 'Negotiation', 'Legal Writing', 'Case Management', 'Client Counseling', 'Discovery', 'Motion Practice', 'Legal Analysis'],
    sales: ['Lead Generation', 'Pipeline Management', 'CRM (Salesforce)', 'Negotiation', 'Account Management', 'Sales Presentations', 'Closing Techniques', 'Relationship Building', 'Sales Forecasting', 'Cold Calling']
  };

  const suggestions = skillsByProfession[professionId] || [];
  const currentSkillsLower = currentSkills.map(s => s.toLowerCase());

  // Filter out skills user already has
  return suggestions.filter(skill =>
    !currentSkillsLower.some(existing =>
      existing.includes(skill.toLowerCase()) || skill.toLowerCase().includes(existing)
    )
  );
};

/**
 * Generate achievement examples based on profession
 * @param {string} professionId - Profession ID
 * @returns {array} - Example achievements
 */
export const generateAchievementExamples = (professionId) => {
  const examples = {
    doctor: [
      'Reduced patient wait times by 35% through implementation of new scheduling system',
      'Achieved 98% patient satisfaction rating, highest in department for 3 consecutive quarters',
      'Published 5 peer-reviewed articles in leading medical journals',
      'Led successful accreditation process resulting in hospital receiving prestigious designation'
    ],
    engineer: [
      'Architected microservices infrastructure serving 2M+ daily users with 99.9% uptime',
      'Reduced application load time by 60% through code optimization and caching strategies',
      'Led team of 6 engineers to deliver major product feature 2 weeks ahead of schedule',
      'Open-source contributions with 1,000+ GitHub stars across multiple repositories'
    ],
    accountant: [
      'Identified $150K in annual cost savings through expense analysis and process improvements',
      'Successfully managed audit process with zero findings for 3 consecutive years',
      'Reduced month-end close process from 15 days to 7 days through automation',
      'Earned CPA certification on first attempt with 95+ score on all sections'
    ],
    teacher: [
      'Improved student test scores by average of 25% through innovative teaching methods',
      'Developed curriculum adopted by 12 teachers across district reaching 400+ students',
      'Received "Teacher of the Year" award in recognition of exceptional student outcomes',
      'Secured $15K in grants for classroom technology and learning resources'
    ],
    marketing: [
      'Increased website traffic by 150% and conversion rate by 45% within 6 months',
      'Launched campaign generating $2M in revenue with 400% ROI',
      'Grew social media following from 5K to 50K followers in one year',
      'Reduced customer acquisition cost by 35% through optimization of ad spend'
    ],
    designer: [
      'Redesigned user interface resulting in 40% increase in user engagement',
      'Led design system implementation adopted across 15+ product teams',
      'Won "Best Design" award at industry conference for innovative mobile app',
      'Portfolio website featured in leading design publication with 50K+ views'
    ],
    lawyer: [
      'Achieved favorable verdict in high-stakes litigation worth $5M',
      'Negotiated settlements saving clients over $2M in potential liabilities',
      'Maintained 95% success rate across 100+ cases',
      'Named "Rising Star" by legal publication for exceptional trial performance'
    ],
    sales: [
      'Exceeded annual quota by 175%, highest in company history',
      'Closed $3M in new business, representing 30% of regional revenue',
      'Grew territory from $500K to $2M in annual recurring revenue',
      'Won "Top Performer" award 4 consecutive quarters'
    ]
  };

  return examples[professionId] || [
    'Exceeded performance goals by [X]% through [specific actions]',
    'Led initiative that resulted in $[X] in value/savings',
    'Recognized with [award/honor] for [achievement]',
    'Achieved [metric] improvement in [area] within [timeframe]'
  ];
};

import {
  FaUserMd,
  FaCog,
  FaCalculator,
  FaChalkboardTeacher,
  FaBullhorn,
  FaPalette,
  FaBalanceScale,
  FaChartLine,
  FaUser,
  FaFileAlt,
  FaBriefcase,
  FaGraduationCap,
  FaBolt,
  FaCertificate,
  FaRocket,
  FaTrophy,
  FaBook,
  FaAward,
  FaImage
} from 'react-icons/fa';

export const professions = [
  {
    id: 'doctor',
    name: 'Doctor',
    icon: FaUserMd,
    description: 'Medical professionals, physicians, surgeons',
    sections: ['personalInfo', 'summary', 'education', 'licenses', 'experience', 'skills', 'publications'],
    suggestedSkills: ['Patient Care', 'Diagnosis', 'Surgery', 'Medical Research', 'Emergency Medicine', 'Clinical Skills'],
    tips: {
      summary: 'Highlight your medical specialization and years of clinical experience',
      experience: 'Include hospital names, departments, and specific medical procedures',
      education: 'List medical school, residency, and fellowships with specializations'
    }
  },
  {
    id: 'engineer',
    name: 'Engineer',
    icon: FaCog,
    description: 'Software, mechanical, civil, electrical engineers',
    sections: ['personalInfo', 'summary', 'experience', 'projects', 'skills', 'education', 'certifications'],
    suggestedSkills: ['Problem Solving', 'Technical Design', 'Project Management', 'CAD Software', 'Programming', 'Testing'],
    tips: {
      summary: 'Emphasize your engineering discipline and technical expertise',
      experience: 'Quantify your impact with metrics and specific technologies used',
      projects: 'Showcase significant projects with technical challenges solved'
    }
  },
  {
    id: 'accountant',
    name: 'Accountant',
    icon: FaCalculator,
    description: 'Accountants, financial analysts, auditors',
    sections: ['personalInfo', 'summary', 'experience', 'education', 'certifications', 'skills', 'achievements'],
    suggestedSkills: ['Financial Reporting', 'Tax Planning', 'Auditing', 'QuickBooks', 'Excel', 'Cost Analysis'],
    tips: {
      summary: 'Mention CPA certification and areas of accounting expertise',
      experience: 'Include budget sizes managed and financial improvements achieved',
      certifications: 'List CPA, CMA, or other relevant certifications prominently'
    }
  },
  {
    id: 'teacher',
    name: 'Teacher',
    icon: FaChalkboardTeacher,
    description: 'Teachers, educators, professors',
    sections: ['personalInfo', 'summary', 'experience', 'education', 'certifications', 'skills', 'achievements'],
    suggestedSkills: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Educational Technology', 'Communication'],
    tips: {
      summary: 'Highlight your teaching philosophy and subject expertise',
      experience: 'Include grade levels, subjects taught, and student outcomes',
      achievements: 'Mention awards, student success rates, or innovative programs'
    }
  },
  {
    id: 'marketing',
    name: 'Marketing Professional',
    icon: FaBullhorn,
    description: 'Marketing managers, digital marketers, brand strategists',
    sections: ['personalInfo', 'summary', 'experience', 'skills', 'education', 'achievements', 'projects'],
    suggestedSkills: ['Digital Marketing', 'SEO/SEM', 'Social Media', 'Analytics', 'Content Strategy', 'Campaign Management'],
    tips: {
      summary: 'Showcase your marketing specialization and proven results',
      experience: 'Use metrics like ROI, conversion rates, and audience growth',
      projects: 'Highlight successful campaigns with measurable outcomes'
    }
  },
  {
    id: 'designer',
    name: 'Designer',
    icon: FaPalette,
    description: 'Graphic designers, UI/UX designers, creative directors',
    sections: ['personalInfo', 'summary', 'experience', 'skills', 'portfolio', 'education', 'achievements'],
    suggestedSkills: ['Adobe Creative Suite', 'UI/UX Design', 'Branding', 'Typography', 'Prototyping', 'User Research'],
    tips: {
      summary: 'Emphasize your design philosophy and creative approach',
      portfolio: 'Link to online portfolio or include project descriptions',
      experience: 'Describe design challenges and creative solutions'
    }
  },
  {
    id: 'lawyer',
    name: 'Lawyer',
    icon: FaBalanceScale,
    description: 'Attorneys, legal counsels, paralegals',
    sections: ['personalInfo', 'summary', 'experience', 'education', 'licenses', 'skills', 'publications'],
    suggestedSkills: ['Legal Research', 'Contract Law', 'Litigation', 'Negotiation', 'Legal Writing', 'Case Management'],
    tips: {
      summary: 'Highlight your practice areas and bar admissions',
      experience: 'Include case outcomes, clients served, and legal specializations',
      licenses: 'List all bar admissions and legal certifications'
    }
  },
  {
    id: 'sales',
    name: 'Sales Professional',
    icon: FaChartLine,
    description: 'Sales representatives, account managers, business development',
    sections: ['personalInfo', 'summary', 'experience', 'achievements', 'skills', 'education'],
    suggestedSkills: ['Lead Generation', 'Negotiation', 'CRM Software', 'Account Management', 'Pipeline Management', 'Closing'],
    tips: {
      summary: 'Emphasize your sales achievements and quota performance',
      experience: 'Include revenue generated, deals closed, and territories managed',
      achievements: 'Highlight awards, top performer rankings, and exceeded targets'
    }
  }
];

export const experienceLevels = [
  { value: '0-2', label: 'Entry Level (0-2 years)' },
  { value: '3-5', label: 'Mid Level (3-5 years)' },
  { value: '6-10', label: 'Senior (6-10 years)' },
  { value: '10+', label: 'Expert (10+ years)' }
];

export const degreeTypes = [
  { value: 'highschool', label: 'High School Diploma' },
  { value: 'associate', label: 'Associate Degree' },
  { value: 'bachelor', label: 'Bachelor\'s Degree' },
  { value: 'master', label: 'Master\'s Degree' },
  { value: 'phd', label: 'Ph.D.' },
  { value: 'professional', label: 'Professional Degree (MD, JD, etc.)' },
  { value: 'certificate', label: 'Professional Certificate' }
];

export const sectionDefinitions = {
  personalInfo: {
    title: 'Personal Information',
    icon: FaUser,
    fields: ['fullName', 'email', 'phone', 'location', 'linkedin', 'website']
  },
  summary: {
    title: 'Professional Summary',
    icon: FaFileAlt,
    fields: ['summary']
  },
  experience: {
    title: 'Work Experience',
    icon: FaBriefcase,
    repeatable: true,
    fields: ['jobTitle', 'company', 'location', 'startDate', 'endDate', 'current', 'description']
  },
  education: {
    title: 'Education',
    icon: FaGraduationCap,
    repeatable: true,
    fields: ['degree', 'institution', 'location', 'graduationDate', 'gpa', 'honors']
  },
  skills: {
    title: 'Skills',
    icon: FaBolt,
    fields: ['technicalSkills', 'softSkills', 'languages']
  },
  certifications: {
    title: 'Certifications & Licenses',
    icon: FaCertificate,
    repeatable: true,
    fields: ['certification', 'issuer', 'date', 'expiryDate', 'credentialId']
  },
  projects: {
    title: 'Projects',
    icon: FaRocket,
    repeatable: true,
    fields: ['projectName', 'role', 'duration', 'description', 'technologies']
  },
  achievements: {
    title: 'Achievements & Awards',
    icon: FaTrophy,
    repeatable: true,
    fields: ['achievement', 'issuer', 'date', 'description']
  },
  publications: {
    title: 'Publications & Research',
    icon: FaBook,
    repeatable: true,
    fields: ['title', 'publisher', 'date', 'coAuthors', 'description']
  },
  licenses: {
    title: 'Licenses',
    icon: FaAward,
    repeatable: true,
    fields: ['license', 'issuingAuthority', 'licenseNumber', 'issueDate', 'expiryDate']
  },
  portfolio: {
    title: 'Portfolio',
    icon: FaImage,
    repeatable: true,
    fields: ['projectName', 'client', 'year', 'description', 'link']
  }
};

// Function to create a custom profession
export const createCustomProfession = (professionName) => {
  return {
    id: `custom-${professionName.toLowerCase().replace(/\s+/g, '-')}`,
    name: professionName,
    icon: FaBriefcase,
    description: `Custom profession: ${professionName}`,
    isCustom: true,
    // Default sections for any profession
    sections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'certifications', 'achievements'],
    suggestedSkills: [
      'Communication',
      'Problem Solving',
      'Leadership',
      'Teamwork',
      'Time Management',
      'Adaptability'
    ],
    tips: {
      summary: `Highlight your unique skills and experience in ${professionName}`,
      experience: 'Focus on achievements and quantifiable results',
      education: 'Include relevant degrees, courses, and training'
    }
  };
};

// Universal profession function - works for ANY job title in the world
export const createUniversalProfession = (jobTitle) => {
  return {
    id: 'universal',
    name: jobTitle || 'Professional',
    icon: FaBriefcase,
    description: `Professional resume for ${jobTitle}`,
    isUniversal: true,
    // Comprehensive sections that work for any profession
    sections: [
      'personalInfo',
      'summary',
      'experience',
      'education',
      'skills',
      'certifications',
      'projects',
      'achievements'
    ],
    suggestedSkills: [
      'Communication',
      'Problem Solving',
      'Leadership',
      'Teamwork',
      'Time Management',
      'Adaptability',
      'Critical Thinking',
      'Attention to Detail'
    ],
    tips: {
      summary: `Write a compelling summary highlighting your expertise as a ${jobTitle}. Focus on your unique value proposition and key achievements.`,
      experience: 'Use strong action verbs and quantify your impact with numbers, percentages, and concrete results.',
      education: 'List your most relevant education and training. Include certifications and continuous learning.',
      skills: 'Include both technical and soft skills relevant to your role. Be specific and honest.',
      projects: 'Showcase your best work with descriptions of challenges solved and technologies used.',
      achievements: 'Highlight awards, recognition, and measurable accomplishments that set you apart.'
    }
  };
};

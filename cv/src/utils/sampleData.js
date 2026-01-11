// Sample CV data for testing different professions

export const sampleCVData = {
  engineer: {
    personalInfo: {
      fullName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johnsmith',
      website: 'www.johnsmith.dev'
    },
    summary: 'Senior Software Engineer with 8+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud architecture. Proven track record of leading teams and delivering high-impact projects that improve user experience and system performance.',
    experience: [
      {
        jobTitle: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: '2020-03',
        endDate: '',
        current: true,
        description: '• Led a team of 5 developers in building a microservices architecture\n• Improved system performance by 45% through optimization\n• Implemented CI/CD pipeline reducing deployment time by 60%\n• Mentored junior developers and conducted code reviews'
      },
      {
        jobTitle: 'Software Engineer',
        company: 'StartUp Inc',
        location: 'San Francisco, CA',
        startDate: '2017-06',
        endDate: '2020-02',
        current: false,
        description: '• Developed RESTful APIs serving 100K+ daily active users\n• Built responsive web applications using React and Redux\n• Reduced bug count by 35% through implementing automated testing\n• Collaborated with product team to define technical requirements'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Stanford University',
        location: 'Stanford, CA',
        graduationDate: '2017-05',
        gpa: '3.8/4.0',
        honors: 'Magna Cum Laude'
      }
    ],
    skills: {
      technicalSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
      softSkills: ['Leadership', 'Problem Solving', 'Communication', 'Agile Methodology'],
      languages: ['English (Native)', 'Spanish (Conversational)']
    }
  },

  doctor: {
    personalInfo: {
      fullName: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      phone: '+1 (555) 987-6543',
      location: 'Boston, MA',
      linkedin: 'linkedin.com/in/sarahjohnson',
      website: ''
    },
    summary: 'Board-certified Internal Medicine physician with 12+ years of clinical experience. Specializing in chronic disease management and preventive care. Committed to patient-centered care and evidence-based medicine with a focus on improving health outcomes.',
    experience: [
      {
        jobTitle: 'Attending Physician - Internal Medicine',
        company: 'Boston General Hospital',
        location: 'Boston, MA',
        startDate: '2015-07',
        endDate: '',
        current: true,
        description: '• Manage a patient panel of 2000+ individuals with complex medical conditions\n• Lead quality improvement initiatives resulting in 25% reduction in hospital readmissions\n• Supervise and mentor medical residents and interns\n• Participate in hospital committees for patient safety and clinical protocols'
      },
      {
        jobTitle: 'Resident Physician - Internal Medicine',
        company: 'Massachusetts Medical Center',
        location: 'Boston, MA',
        startDate: '2012-07',
        endDate: '2015-06',
        current: false,
        description: '• Provided comprehensive care to diverse patient populations\n• Conducted morning rounds and managed inpatient cases\n• Participated in multidisciplinary care teams\n• Completed 5000+ clinical hours across various medical specialties'
      }
    ],
    education: [
      {
        degree: 'Doctor of Medicine (MD)',
        institution: 'Harvard Medical School',
        location: 'Boston, MA',
        graduationDate: '2012-05',
        gpa: '',
        honors: 'Alpha Omega Alpha Honor Society'
      },
      {
        degree: 'Bachelor of Science in Biology',
        institution: 'MIT',
        location: 'Cambridge, MA',
        graduationDate: '2008-05',
        gpa: '3.9/4.0',
        honors: 'Summa Cum Laude'
      }
    ],
    skills: {
      technicalSkills: ['Diagnosis', 'Patient Care', 'Electronic Health Records', 'Clinical Research', 'Chronic Disease Management'],
      softSkills: ['Patient Communication', 'Leadership', 'Critical Thinking', 'Empathy', 'Time Management'],
      languages: ['English (Native)', 'French (Fluent)', 'Spanish (Professional)']
    }
  },

  accountant: {
    personalInfo: {
      fullName: 'Michael Chen',
      email: 'michael.chen@accounting.com',
      phone: '+1 (555) 246-8135',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/michaelchen',
      website: ''
    },
    summary: 'Certified Public Accountant with 10+ years of experience in financial reporting, tax planning, and audit management. Expertise in GAAP compliance and financial analysis. Proven ability to streamline accounting processes and reduce costs while maintaining accuracy.',
    experience: [
      {
        jobTitle: 'Senior Accountant',
        company: 'Financial Services Inc',
        location: 'New York, NY',
        startDate: '2018-01',
        endDate: '',
        current: true,
        description: '• Manage financial reporting for $500M portfolio\n• Reduced monthly close time by 40% through process optimization\n• Led successful implementation of new accounting software (SAP)\n• Prepare tax returns and ensure compliance with federal and state regulations\n• Supervise team of 3 junior accountants'
      },
      {
        jobTitle: 'Staff Accountant',
        company: 'ABC Corporation',
        location: 'New York, NY',
        startDate: '2014-06',
        endDate: '2017-12',
        current: false,
        description: '• Performed month-end close and reconciliations for 200+ accounts\n• Conducted variance analysis and prepared financial statements\n• Assisted in annual audit process and addressed auditor inquiries\n• Improved accounts payable process reducing errors by 30%'
      }
    ],
    education: [
      {
        degree: 'Master of Business Administration (MBA) - Accounting',
        institution: 'Columbia Business School',
        location: 'New York, NY',
        graduationDate: '2014-05',
        gpa: '3.7/4.0',
        honors: ''
      },
      {
        degree: 'Bachelor of Science in Accounting',
        institution: 'New York University',
        location: 'New York, NY',
        graduationDate: '2012-05',
        gpa: '3.8/4.0',
        honors: 'Cum Laude'
      }
    ],
    skills: {
      technicalSkills: ['GAAP', 'Financial Reporting', 'Tax Preparation', 'QuickBooks', 'SAP', 'Excel', 'Financial Analysis', 'Audit'],
      softSkills: ['Attention to Detail', 'Analytical Thinking', 'Communication', 'Problem Solving', 'Team Management'],
      languages: ['English (Native)', 'Mandarin (Native)']
    }
  },

  marketing: {
    personalInfo: {
      fullName: 'Emily Rodriguez',
      email: 'emily.rodriguez@marketing.com',
      phone: '+1 (555) 369-2580',
      location: 'Los Angeles, CA',
      linkedin: 'linkedin.com/in/emilyrodriguez',
      website: 'www.emilyrodriguez.com'
    },
    summary: 'Results-driven Digital Marketing Manager with 7+ years of experience driving brand growth and customer engagement. Expertise in SEO, content strategy, and social media marketing. Track record of increasing organic traffic by 200% and improving conversion rates across multiple channels.',
    experience: [
      {
        jobTitle: 'Digital Marketing Manager',
        company: 'Creative Agency',
        location: 'Los Angeles, CA',
        startDate: '2019-09',
        endDate: '',
        current: true,
        description: '• Led digital marketing strategy for 15+ clients with combined revenue of $50M\n• Increased organic traffic by 250% through SEO optimization and content marketing\n• Managed $500K annual advertising budget across Google Ads, Facebook, and LinkedIn\n• Improved email marketing ROI by 180% through A/B testing and segmentation\n• Built and mentored a team of 4 marketing specialists'
      },
      {
        jobTitle: 'Marketing Specialist',
        company: 'E-commerce Startup',
        location: 'Los Angeles, CA',
        startDate: '2017-03',
        endDate: '2019-08',
        current: false,
        description: '• Managed social media presence growing followers from 5K to 100K\n• Created content strategy increasing engagement rate by 150%\n• Coordinated influencer partnerships generating $2M in sales\n• Analyzed campaign performance and provided data-driven recommendations'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Arts in Marketing',
        institution: 'UCLA',
        location: 'Los Angeles, CA',
        graduationDate: '2017-06',
        gpa: '3.6/4.0',
        honors: ''
      }
    ],
    skills: {
      technicalSkills: ['SEO', 'Google Analytics', 'Google Ads', 'Facebook Ads', 'Content Marketing', 'Email Marketing', 'HubSpot', 'Hootsuite'],
      softSkills: ['Strategic Thinking', 'Creativity', 'Data Analysis', 'Project Management', 'Communication'],
      languages: ['English (Native)', 'Spanish (Native)']
    }
  }
};

// Helper function to load sample data
export const loadSampleData = (professionId) => {
  return sampleCVData[professionId] || null;
};

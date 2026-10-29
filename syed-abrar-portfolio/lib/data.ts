// ============================================================
// PORTFOLIO DATA — Syed Abrar
// Populated from resume — update links/placeholders as needed
// ============================================================

export const PERSONAL = {
  name: 'Syed Abrar',
  nameShort: 'S. Abrar',
  title: 'AI & Data Science Student',
  subtitle: 'Aspiring Data Analyst',
  tagline: 'AI & Data Science Student | Aspiring Data Analyst',
  phone: '+91-9177620461',
  email: 'syejunaid0084@gmail.com',
  linkedin: 'https://www.linkedin.com/in/syed-abrar-557528353',
  github: 'https://github.com/abrar084',
  resume: '/resume.pdf', // Place your resume PDF in the /public folder
  location: 'Hyderabad, Telangana, India',
};

export const ABOUT = {
  intro: `I'm Syed Abrar, a motivated and detail-oriented Data Analytics and AI enthusiast currently pursuing B.Tech in Artificial Intelligence & Data Science. I'm passionate about transforming raw data into actionable insights that support real business decisions.`,
  background: `I have practical knowledge of Python, SQL, Machine Learning, Data Visualization, and Business Intelligence. I've built real-world analytics projects — from recommendation systems and market analytics dashboards to AI-powered applications — and I'm always looking to apply these skills at scale.`,
  interests: [
    'Machine Learning',
    'Data Visualization',
    'Business Intelligence',
    'Predictive Analytics',
    'Exploratory Data Analysis',
    'Dashboard Development',
  ],
  goals: `My goal is to secure a data analyst or AI internship where I can apply my skills in Python, SQL, Tableau, and machine learning to solve real business problems and grow into a well-rounded data professional.`,
  strengths: [
    'Data Cleaning & Preparation',
    'Problem Solving',
    'Critical Thinking',
    'Dashboard Development',
    'Business Intelligence',
    'Statistical Analysis',
    'Machine Learning Basics',
    'Fast Learner',
    'Team Collaboration',
  ],
};

export const SKILLS: SkillCategory[] = [
  {
    id: 'python',
    name: 'Python',
    color: '#3b82f6',
    orbitRadius: 3.2,
    size: 0.45,
    speed: 0.8,
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Flask'],
    description: 'Core language for data analysis, ML pipelines, and backend development.',
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    color: '#f59e0b',
    orbitRadius: 4.8,
    size: 0.4,
    speed: 0.5,
    technologies: [
      'Exploratory Data Analysis (EDA)',
      'Data Cleaning',
      'Data Wrangling',
      'Feature Engineering',
      'Statistical Analysis',
      'Predictive Analytics',
    ],
    description: 'Turning messy datasets into clean, meaningful, decision-ready insights.',
  },
  {
    id: 'sql',
    name: 'SQL & Databases',
    color: '#10b981',
    orbitRadius: 6.2,
    size: 0.35,
    speed: 0.35,
    technologies: ['MySQL', 'PostgreSQL', 'Supabase', 'SQL Joins', 'Aggregations', 'Query Optimisation'],
    description: 'Writing efficient queries and managing relational databases.',
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    color: '#8b5cf6',
    orbitRadius: 7.8,
    size: 0.42,
    speed: 0.25,
    technologies: [
      'Scikit-learn',
      'Logistic Regression',
      'Linear Regression',
      'KNN',
      'K-Means Clustering',
      'XGBoost',
    ],
    description: 'Building and evaluating supervised and unsupervised predictive models.',
  },
  {
    id: 'data-viz',
    name: 'Data Visualisation',
    color: '#ec4899',
    orbitRadius: 9.2,
    size: 0.38,
    speed: 0.18,
    technologies: ['Tableau', 'Matplotlib', 'Excel', 'Business Dashboards', 'KPI Reporting'],
    description: 'Creating clear dashboards and charts that communicate data stories.',
  },
  {
    id: 'web-dev',
    name: 'Web & Tools',
    color: '#06b6d4',
    orbitRadius: 10.8,
    size: 0.36,
    speed: 0.13,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Flask', 'Git', 'GitHub', 'Jupyter Notebook', 'VS Code'],
    description: 'Building web interfaces and managing code with industry-standard tools.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'student-career-guidance',
    title: 'Student Career Guidance Analytics System',
    subtitle: 'Recommendation System & Analytics Dashboard',
    description:
      'A data-driven recommendation system that guides students toward suitable career paths based on their academic performance and interests. Combines machine learning with interactive Tableau dashboards.',
    technologies: ['Python', 'SQL', 'Tableau', 'Scikit-learn', 'Pandas', 'Machine Learning'],
    features: [
      'Recommendation engine based on academic performance and student interests',
      'Exploratory data analysis to identify learning trends',
      'Interactive Tableau dashboards for visualising student performance',
      'Machine learning algorithms for personalised recommendation generation',
    ],
    github: 'https://github.com/abrar084', // Update with direct repo link when available
    demo: '#',
    color: '#8b5cf6',
    accent: '#a78bfa',
    icon: '🎓',
  },
  {
    id: 'retail-scrap-market',
    title: 'Retail Scrap Market Analytics',
    subtitle: 'Marketplace Analytics & Business Intelligence',
    description:
      'A marketplace analytics solution designed for scrap dealers to monitor pricing trends, track inventory movement, and analyse supplier and customer activities through business intelligence dashboards.',
    technologies: ['Python', 'SQL', 'Pandas', 'Tableau', 'Data Visualisation'],
    features: [
      'Marketplace analytics solution built for scrap dealers',
      'Pricing trend analysis across different material categories',
      'Inventory movement reports and sales forecasting',
      'Dashboards for monitoring supplier and customer activities',
    ],
    github: 'https://github.com/abrar084', // Update with direct repo link when available
    demo: '#',
    color: '#0891b2',
    accent: '#67e8f9',
    icon: '📊',
  },
    {
    id: 'facevault',
    title: 'FaceVault',
    subtitle: 'Biometric Authentication & Secure Access System',

    description:
      'A biometric authentication system designed to provide secure user access through face recognition, encrypted data storage, and authentication management.',

    technologies: [
      'Python',
      'OpenCV',
      'FastAPI',
      'NumPy',
      'Cryptography',
      'SQLite'
    ],

    features: [
      'Face detection and recognition using OpenCV',
      'Secure storage of biometric data',
      'User registration and authentication',
      'REST API backend using FastAPI',
      'Authentication status and session management'
    ],

    github: 'https://github.com/abrar084',
    demo: '#',

    color: '#10b981',
    accent: '#6ee7b7',
    icon: '🔐',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'edu-1',
    year: '2024',
    type: 'education',
    title: 'B.Tech — Artificial Intelligence & Data Science',
    description:
      'Enrolled at ISL Engineering College, Hyderabad, pursuing a four-year B.Tech degree in Artificial Intelligence & Data Science. Building strong foundations in Python, SQL, machine learning, and data analytics.',
    icon: '🚀',
  },
  {
    id: 'proj-1',
    year: '2024',
    type: 'project',
    title: 'Student Career Guidance Analytics System',
    description:
      'Built a recommendation system to guide students based on academic performance and interests. Included EDA, Tableau dashboards, and ML-based recommendation generation.',
    icon: '🎓',
  },
  {
    id: 'proj-2',
    year: '2025',
    type: 'project',
    title: 'Retail Scrap Market Analytics',
    description:
      'Designed a marketplace analytics solution for scrap dealers — analysing pricing trends, inventory movement, sales forecasting, and building supplier/customer monitoring dashboards.',
    icon: '📊',
  },
  {
    id: 'goal-1',
    year: '2025',
    type: 'goal',
    title: 'Data Analyst / AI Internship',
    description:
      'Actively seeking an internship in data analytics or AI to apply Python, SQL, Tableau, and machine learning skills in a real-world production environment.',
    icon: '�',
  },
  {
    id: 'goal-2',
    year: '2026',
    type: 'goal',
    title: 'Advanced ML & BI Projects',
    description:
      'Planning to deepen expertise in XGBoost, advanced feature engineering, and business intelligence tools — building more complex, production-grade analytics solutions.',
    icon: '🧠',
  },
  {
    id: 'edu-2',
    year: '2028',
    type: 'education',
    title: 'Graduate — B.Tech AI & Data Science',
    description:
      'Complete degree at ISL Engineering College and launch a full-time career as a Data Analyst or Machine Learning Engineer.',
    icon: '🌌',
  },
];

// ── Type definitions ──────────────────────────────────────────

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  orbitRadius: number;
  size: number;
  speed: number;
  technologies: string[];
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  features: string[];
  github: string;
  demo: string;
  color: string;
  accent: string;
  icon: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  type: 'education' | 'project' | 'certification' | 'goal';
  title: string;
  description: string;
  icon: string;
}

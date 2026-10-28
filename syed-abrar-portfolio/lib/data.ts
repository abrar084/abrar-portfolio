// ============================================================
// PORTFOLIO DATA — Syed Abrar
// Update any placeholder values marked with [PLACEHOLDER]
// ============================================================

export const PERSONAL = {
  name: 'Syed Abrar',
  nameShort: ' Abrar',
  title: 'AI & Data Science Student',
  subtitle: 'Aspiring Data Analyst',
  tagline: 'AI & Data Science Student | Aspiring Data Analyst',
  email: 'syedjunaid0084',          // [PLACEHOLDER]
  linkedin: 'https://linkedin.com/in/syed-abrar', // [PLACEHOLDER]
  github: 'https://github.com/syed-abrar',  // [PLACEHOLDER]
  resume: '/resume.pdf',                     // [PLACEHOLDER] — place resume.pdf in /public
  location: 'Your City, Country',           // [PLACEHOLDER]
};

export const ABOUT = {
  intro: `I'm Syed Abrar, an AI & Data Science student passionate about transforming raw data into meaningful insights. I love building intelligent systems that solve real-world problems — from interactive data dashboards to face-authentication applications.`,
  background: `Currently pursuing my studies in AI and Data Science, I've developed a strong foundation in Python, machine learning, data analytics, and SQL. My journey started with a curiosity about how machines can learn and has grown into a drive to build production-ready data solutions.`,
  interests: ['Machine Learning', 'Data Visualization', 'Computer Vision', 'Natural Language Processing', 'Open Source'],
  goals: `My goal is to land a data analyst or machine learning engineer internship where I can apply my skills at scale — contributing to data-driven decision making and innovative AI products.`,
};

export const SKILLS: SkillCategory[] = [
  {
    id: 'python',
    name: 'Python',
    color: '#3b82f6',
    orbitRadius: 3.2,
    size: 0.45,
    speed: 0.8,
    technologies: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    description: 'Core programming language for data science and ML workflows.',
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    color: '#f59e0b',
    orbitRadius: 4.8,
    size: 0.4,
    speed: 0.5,
    technologies: ['Pandas', 'Excel', 'Power BI', 'Google Sheets', 'Statistical Analysis'],
    description: 'Turning raw datasets into actionable business insights.',
  },
  {
    id: 'sql',
    name: 'SQL',
    color: '#10b981',
    orbitRadius: 6.2,
    size: 0.35,
    speed: 0.35,
    technologies: ['MySQL', 'PostgreSQL', 'SQLite', 'Query Optimization', 'Joins & Aggregations'],
    description: 'Querying and managing relational databases efficiently.',
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    color: '#8b5cf6',
    orbitRadius: 7.8,
    size: 0.42,
    speed: 0.25,
    technologies: ['Scikit-learn', 'Regression', 'Classification', 'Clustering', 'Model Evaluation'],
    description: 'Building and evaluating predictive models from data.',
  },
  {
    id: 'data-viz',
    name: 'Data Visualization',
    color: '#ec4899',
    orbitRadius: 9.2,
    size: 0.38,
    speed: 0.18,
    technologies: ['Matplotlib', 'Seaborn', 'Plotly', 'Power BI', 'Streamlit'],
    description: 'Creating clear, compelling charts and interactive dashboards.',
  },
  {
    id: 'web-dev',
    name: 'Web Dev',
    color: '#06b6d4',
    orbitRadius: 10.8,
    size: 0.36,
    speed: 0.13,
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Streamlit'],
    description: 'Building web interfaces to deploy and present data products.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'datamind-ai',
    title: 'DataMind AI',
    subtitle: 'Smart CSV Data Analyzer',
    description:
      'An intelligent CSV data analysis platform with automated data cleaning, interactive visualization, and built-in machine learning capabilities. Upload any dataset and get instant insights.',
    technologies: ['Python', 'Streamlit', 'Pandas', 'Scikit-learn', 'Plotly', 'NumPy'],
    features: [
      'Automated data cleaning and preprocessing',
      'Interactive charts and correlation heatmaps',
      'One-click ML model training and evaluation',
      'Export cleaned data and reports',
    ],
    github: 'https://github.com/syed-abrar/datamind-ai', // [PLACEHOLDER]
    demo: '#',                                              // [PLACEHOLDER]
    color: '#6366f1',
    accent: '#a78bfa',
    icon: '🧠',
  },
  {
    id: 'facevault',
    title: 'FaceVault',
    subtitle: 'Face Authentication & Secure Storage',
    description:
      'A computer-vision powered face authentication system with encrypted secure storage. Register users via webcam, authenticate with liveness detection, and manage access securely.',
    technologies: ['Python', 'OpenCV', 'Face Recognition', 'Flask', 'SQLite', 'Cryptography'],
    features: [
      'Real-time face detection and recognition',
      'Liveness detection to prevent spoofing',
      'AES-encrypted secure file storage',
      'User management dashboard',
    ],
    github: 'https://github.com/syed-abrar/facevault', // [PLACEHOLDER]
    demo: '#',                                           // [PLACEHOLDER]
    color: '#0891b2',
    accent: '#67e8f9',
    icon: '🔐',
  },
  {
    id: 'student-guidance',
    title: 'Student Guidance Platform',
    subtitle: 'Learning Resource Hub for Students',
    description:
      'A centralized student guidance and learning resource platform that helps students discover resources, plan their learning paths, and connect with guidance materials across subjects.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    features: [
      'Curated learning path recommendations',
      'Subject-wise resource library',
      'Progress tracking dashboard',
      'Interactive guidance tools',
    ],
    github: 'https://github.com/syed-abrar/student-guidance', // [PLACEHOLDER]
    demo: '#',                                                   // [PLACEHOLDER]
    color: '#059669',
    accent: '#34d399',
    icon: '🎓',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'edu-1',
    year: '2022',
    type: 'education',
    title: 'Started AI & Data Science Program',
    description: 'Enrolled in a degree program focused on Artificial Intelligence and Data Science, building strong foundations in mathematics, statistics, and programming.',
    icon: '🚀',
  },
  {
    id: 'proj-1',
    year: '2023',
    type: 'project',
    title: 'Built FaceVault',
    description: 'Developed a face authentication system using OpenCV and Python, combining computer vision with secure encrypted storage.',
    icon: '🔐',
  },
  {
    id: 'proj-2',
    year: '2024',
    type: 'project',
    title: 'Launched DataMind AI',
    description: 'Created an end-to-end CSV data analysis platform with ML capabilities and interactive Plotly visualizations.',
    icon: '🧠',
  },
  {
    id: 'proj-3',
    year: '2024',
    type: 'project',
    title: 'Student Guidance Platform',
    description: 'Built a full-stack web platform to help students navigate learning resources and plan their educational journey.',
    icon: '🎓',
  },
  {
    id: 'goal-1',
    year: '2025',
    type: 'goal',
    title: 'Data Analyst / ML Engineer Internship',
    description: 'Seeking a hands-on internship to apply data science and ML skills in a real-world production environment.',
    icon: '🌟',
  },
  {
    id: 'goal-2',
    year: '2026',
    type: 'goal',
    title: 'Graduate & Launch Career',
    description: 'Complete degree and transition into a full-time role as a Data Analyst or Machine Learning Engineer.',
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

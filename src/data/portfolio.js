// ============================================================
// PORTFOLIO DATA — Edit everything here from one place.
// ============================================================

export const personal = {
  name: "Tejas Janagi",
  title: "CS & AI Student",
  taglines: [
    "Competitive Programmer",
    "Full Stack Developer",
    "CS & AI @ IIIT Lucknow",
    "Problem Solver",
  ],
  bio: `I'm a Computer Science and Artificial Intelligence student at IIIT Lucknow with a deep passion for competitive programming and building impactful software. I love solving complex algorithmic problems and translating that problem-solving mindset into clean, scalable applications.`,
  college: "IIIT Lucknow",
  branch: "Computer Science and Artificial Intelligence",
  email: "tejasjanagi2006@gmail.com",
  resumeUrl: "#",                       // TODO: replace with PDF URL
  github: "https://github.com/Txxjasss",
  linkedin: "https://www.linkedin.com/in/tejas-janagi-b7a111334/",
  codeforces: "https://codeforces.com/profile/placeholder", // TODO: replace
  codechef: "https://codechef.com/users/placeholder",       // TODO: replace
  profileImage: null,                   // TODO: replace with image path/URL
};

export const achievements = [
  {
    id: 1,
    title: "Codeforces Specialist",
    subtitle: "Max Rating: 1450+",
    icon: "trophy",
    color: "#6C63FF",
    description: "Achieved Specialist rank on Codeforces with consistent competitive performance.",
  },
  {
    id: 2,
    title: "CodeChef 3 Star",
    subtitle: "Max Rating: 1633",
    icon: "star",
    color: "#00D9F5",
    description: "Earned 3-star rating on CodeChef through sustained contest performance.",
  },
  {
    id: 3,
    title: "600+ Problems Solved",
    subtitle: "Across all platforms",
    icon: "code",
    color: "#00E396",
    description: "Solved over 600 algorithmic problems across Codeforces, CodeChef, LeetCode and more.",
  },
];

export const cpStats = [
  {
    platform: "Codeforces",
    handle: "placeholder",              // TODO: replace
    rating: 1450,
    maxRating: 2000,
    rank: "Specialist",
    rankColor: "#73C2FB",
    url: personal.codeforces,
    badge: "CF",
    accent: "#6C63FF",
  },
  {
    platform: "CodeChef",
    handle: "placeholder",             // TODO: replace
    rating: 1633,
    maxRating: 2500,
    rank: "3 Star ★★★",
    rankColor: "#FFD700",
    url: personal.codechef,
    badge: "CC",
    accent: "#00D9F5",
  },
];

export const projects = [
  {
    id: 1,
    title: 'Workforce Insight',
    subtitle: 'Predictive Analytics for Employee Attrition',
    desc: 'Machine learning platform that predicts employee attrition using advanced classification models, featuring a production-ready MLOps pipeline with automated training, evaluation, and deployment.',
    tags: 'ML • MLOPS • PREDICTIVE ANALYTICS',
    placeholderText: 'Workforce Insight',
    imageUrl: '/workforce_insight.png',
    githubUrl: 'https://github.com/Txxjasss/Workforce-Insight',
    liveUrl: 'https://txxjasss-workforce-insight.hf.space/',
    accentColor: 'rgba(59, 130, 246, 0.45)',
    category: 'ai-ml',
  },
  {
    id: 2,
    title: 'JobSphere',
    subtitle: 'Full-Stack Career Portal',
    desc: 'A modern full-stack recruitment platform that enables job seekers to discover opportunities, apply seamlessly, and track applications while helping employers post openings, manage candidates, and streamline hiring through an intuitive dashboard.',
    tags: 'REACT • SPRING BOOT • JAVA • FULL STACK',
    placeholderText: 'JobSphere',
    imageUrl: '/jobsphere.png',
    githubUrl: '#',
    accentColor: 'rgba(59, 130, 246, 0.45)',
    category: 'fullstack',
  }
];

export const skills = {
  languages: [
    { name: "C++", level: 90 },
    { name: "Python", level: 80 },
    { name: "Swift", level: 75 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 70 },
  ],
  frontend: [
    { name: "React", level: 85 },
    { name: "HTML5", level: 90 },
    { name: "CSS3", level: 85 },
    { name: "SwiftUI", level: 75 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Express.js", level: 80 },
    { name: "Firebase", level: 80 },
    { name: "REST APIs", level: 85 },
  ],
  tools: [
    { name: "Git & GitHub", level: 85 },
    { name: "Xcode", level: 75 },
    { name: "VS Code", level: 90 },
    { name: "Postman", level: 80 },
  ],
};

export const education = [
  {
    id: 1,
    institution: "IIIT Lucknow",
    degree: "B.Tech in Computer Science and Artificial Intelligence",
    duration: "2023 – 2027",
    description:
      "Pursuing a 4-year B.Tech program with a strong focus on algorithms, data structures, machine learning fundamentals, and software engineering principles.",
    grade: null,                        // TODO: add CGPA if desired
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Achievements", href: "#achievements" },
  { label: "CP", href: "#cp" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

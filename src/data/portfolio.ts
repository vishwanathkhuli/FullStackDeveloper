// All portfolio content lives here — edit this file to update the site.

/**
 * The day you started your career. Everything that mentions experience
 * (summary, stats, job period) is calculated from this, so it stays current
 * on its own: the visitor's browser works it out from today's date.
 */
export const careerStart = new Date(2025, 4, 1) // months are 0-based: 4 = May

const DAY = 24 * 60 * 60 * 1000
const years = Math.max(0, (Date.now() - careerStart.getTime()) / (365.25 * DAY))

/** Rounded down to one decimal (1.5, 1.6 ... 2, 2.1), so it never overstates. */
export const experienceYears = Math.floor(years * 10) / 10
const hasDecimal = experienceYears % 1 !== 0

/** "1.5+ years", "2+ years", or "5+ months" during the first year. */
export const experienceText =
  experienceYears >= 1 ? `${experienceYears}+ years` : `${Math.floor(years * 12)}+ months`

const monthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric" })

export const profile = {
  name: "Vishwanath K Khuli",
  initials: "VK",
  role: "Full Stack Software Engineer",
  keywords: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL / PostGIS", "AWS"],
  location: "Bengaluru, India",
  email: "vishwanathkhuli347@gmail.com",
  phone: "+91-9019393599",
  /** Your photo lives at public/profile.png — initials are shown until it exists. */
  photo: "/profile.png",
  available: true,
  /** Badge under the photo cycles through these. */
  status: ["Open to work", "Immediate joiner"],
  resumeUrl: "/resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/vishwanath-khuli-068ab526b",
    github: "", // add your GitHub URL to show the button
  },
  summary: [
    `Full Stack Software Engineer with **${experienceText} of experience** building oil and gas data platforms with **React, TypeScript, Java (Spring Boot)**, REST APIs and PostgreSQL/PostGIS — deployed on **AWS (EKS, S3)** with Docker, Kubernetes and CI/CD.`,
    "I build **OSDU data management** features, **geospatial map search** and engineering data visualizations — **owning features end to end**, from the REST API to the user interface.",
  ],
}

export const stats = [
  { value: experienceYears, decimals: hasDecimal ? 1 : 0, suffix: "+", label: "Years Experience", caption: "Oil & gas data platforms" },
  { value: 25, suffix: "+", label: "Feature Modules", caption: "React + Spring Boot" },
  { value: 500, suffix: "+", label: "Jest Test Files", caption: "SonarQube-checked" },
  { value: 1, suffix: "M+", label: "Wells on the Map", caption: "via PostGIS vector tiles" },
]

export const experience = [
  {
    company: "Petrabytes Corp",
    team: "Oil & Gas Data Platform",
    role: "Software Engineer – Full Stack",
    location: "Bengaluru, India · On-site",
    period: `${monthYear(careerStart)} — Present`,
    points: [
      { lead: "Full-stack features", text: "Build and maintain 25+ feature modules with React, TypeScript and Java Spring Boot, from REST API to user interface." },
      { lead: "Backend modules", text: "Developed 10+ Spring Boot modules — Data Lineage, Metadata Management, OSDU and User Administration — plus data pipeline jobs and REST controllers routing session-authenticated requests and multipart uploads to microservices." },
      { lead: "Cloud & DevOps", text: "Containerized apps with Docker and deployed to Kubernetes on AWS EKS alongside 20+ microservices, with Amazon S3 storage and Jenkins, Bitbucket Pipelines and AWS CodeBuild for CI/CD." },
      { lead: "Shared UI", text: "Maintain a modular React codebase with 49 centralized reusable components, shared utilities and a custom icon system serving 4 production applications." },
      { lead: "Quality", text: "Wrote and maintain 500+ Jest unit test files checked with SonarQube and Bitbucket PR reviews; Agile/Scrum with Jira and Confluence." },
    ],
    keywords: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "Docker", "Kubernetes", "AWS EKS", "Jenkins"],
  },
]

export const projects = [
  {
    title: "PIE Lake — OSDU Data Platform",
    stack: "React · TypeScript · PostgreSQL · PostGIS · AWS",
    year: "2025",
    summary: "Geospatial search and administration for an OSDU data platform.",
    sections: [
      { label: "Problem", text: "Map search loaded large JSON payloads, which couldn't scale to millions of wells and entities." },
      { label: "Solution", text: "Re-engineered Advanced Search on PostGIS-generated Mapbox Vector Tiles with session-based search APIs — only visible tiles are loaded." },
      { label: "Architecture", text: "Multi-filter search across OSDU entity types via 4 REST endpoints, exact counts, server-side point clustering, WebGL rendering of points, lines and polygons." },
      { label: "Admin", text: "8 React modules for OSDU administration, group management, data backup, ingestion workflows and service health / resource monitoring." },
      { label: "Impact", text: "1M+ wells and entities rendered smoothly on the map." },
    ],
  },
  {
    title: "PIE Scale — Oil & Gas Data Management",
    stack: "Java · Spring Boot · React · TypeScript · Plotly · Zustand",
    year: "2025",
    summary: "Fiber-optic DAS/DTS hydraulic fracture monitoring and pressure analysis.",
    sections: [
      { label: "Visualizations", text: "15+ DAS/DTS fracture monitoring plots — waterfall, well log, time-series and pressure profile — built with React and Plotly." },
      { label: "State", text: "Centralized Zustand store with persistent user view settings." },
      { label: "Backend", text: "Pressure-profile ingestion service with 3 REST endpoints (query, wellbore lookup, file import)." },
      { label: "Impact", text: "Powers pressure analysis and fracture monitoring visualizations for engineers." },
    ],
  },
]

export const education = {
  school: "Angadi Institute of Technology and Management",
  location: "Belagavi, Karnataka",
  degree: "Bachelor of Engineering (B.E.)",
  period: "Jun 2019 — May 2023",
  grade: "CGPA 8.65 / 10",
}

export const skillGroups = [
  { title: "Languages", items: ["Java", "JavaScript", "TypeScript", "SQL"] },
  { title: "Backend", items: ["Spring Boot", "Spring MVC", "Spring Security", "OAuth2", "Spring Data JPA", "Hibernate", "Lombok", "JUnit"] },
  { title: "Frontend", items: ["React", "Zustand", "React Router", "Jest", "Plotly", "Mapbox", "HTML5", "CSS3"] },
  { title: "Concepts", items: ["REST APIs", "Microservices", "JWT Auth", "RBAC", "OOP"] },
  { title: "Databases", items: ["PostgreSQL", "PostGIS"] },
  { title: "Cloud & DevOps", items: ["AWS EKS", "Amazon S3", "Docker", "Kubernetes", "Jenkins", "Maven", "Git", "Bitbucket"] },
  { title: "Collaboration", items: ["Jira", "Confluence", "Google Docs", "Mind Maps"] },
]

export const skills = skillGroups.flatMap((g) => g.items)

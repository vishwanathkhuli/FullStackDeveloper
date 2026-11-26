// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: "Vishwanath K Khuli",
  initials: "VK",
  role: "Full Stack Software Engineer",
  team: "Oil & Gas Data Platforms",
  keywords: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL / PostGIS", "AWS"],
  location: "Bengaluru, India",
  email: "vishwanathkhuli@gmail.com",
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
    "Full Stack Software Engineer with 1.5+ years of experience building oil and gas data platforms with React, TypeScript, Java (Spring Boot), REST APIs and PostgreSQL/PostGIS — deployed on AWS (EKS, S3) with Docker, Kubernetes and CI/CD.",
    "I build OSDU data management features, geospatial map search and engineering data visualizations — owning features end to end, from the REST API to the user interface.",
  ],
}

export const stats = [
  { value: 1.5, decimals: 1, suffix: "+", label: "Years Experience", caption: "Oil & gas data platforms" },
  { value: 25, suffix: "+", label: "Feature Modules", caption: "React + Spring Boot" },
  { value: 500, suffix: "+", label: "Jest Test Files", caption: "SonarQube-checked" },
  { value: 1, suffix: "M+", label: "Wells on the Map", caption: "via PostGIS vector tiles" },
]

export type ShowcaseCase = {
  id: string
  tag: string
  title: string
  icon: "map" | "activity" | "cloud" | "blocks"
  context: string
  /** Illustrative terminal output for the trace step. */
  logs: { time: string; level: "INFO" | "WARN" | "OK" | "RUN"; text: string }[]
  steps: { title: string; body: string }[]
}

export const showcase: ShowcaseCase[] = [
  {
    id: "map",
    tag: "Geospatial Search",
    title: "Rendering 1M+ wells without freezing the map",
    icon: "map",
    context: "PIE Lake · OSDU Data Platform",
    logs: [
      { time: "10:02:11", level: "RUN", text: "POST /search/session  filters=[wellbore, seismic, field]" },
      { time: "10:02:11", level: "WARN", text: "legacy search returns full JSON result set → main thread blocked" },
      { time: "10:02:12", level: "INFO", text: "PostGIS ST_AsMVT → serving tile z/x/y for viewport only" },
      { time: "10:02:12", level: "INFO", text: "server-side point clustering enabled · exact counts returned" },
      { time: "10:02:13", level: "INFO", text: "WebGL layers: points · lines · polygons" },
      { time: "10:02:13", level: "OK", text: "1M+ wells & entities searchable on the map" },
    ],
    steps: [
      { title: "Problem", body: "Advanced Search loaded large JSON payloads to draw every result on the map, which doesn't scale to millions of wells and entities." },
      { title: "Approach", body: "Re-engineered search around PostGIS-generated Mapbox Vector Tiles (MVT) and session-based search APIs, so the client loads only the tiles in view." },
      { title: "Build", body: "Multi-filter search across OSDU entity types through 4 REST endpoints, with exact result counts, server-side point clustering and WebGL rendering of 3 geometry types." },
      { title: "Impact", body: "The map renders 1M+ wells and entities by loading only visible tiles instead of large JSON payloads." },
    ],
  },
  {
    id: "viz",
    tag: "Engineering Viz",
    title: "Fiber-optic fracture monitoring, plotted live",
    icon: "activity",
    context: "PIE Scale · Oil & Gas Data Management",
    logs: [
      { time: "14:30:02", level: "RUN", text: "POST /pressure-profile/import  file=stage_12.csv" },
      { time: "14:30:03", level: "INFO", text: "GET /wellbore/lookup → wellbore resolved" },
      { time: "14:30:03", level: "INFO", text: "GET /pressure-profile/query → series ready" },
      { time: "14:30:04", level: "INFO", text: "render: DAS waterfall · DTS well log · time-series · pressure profile" },
      { time: "14:30:04", level: "OK", text: "view settings restored from persisted Zustand store" },
    ],
    steps: [
      { title: "Problem", body: "Engineers needed to analyse DAS/DTS fiber-optic data and pressure profiles during hydraulic fracturing in one place." },
      { title: "Approach", body: "A set of React + Plotly visualizations sharing a centralized Zustand store, backed by a dedicated pressure-profile ingestion service." },
      { title: "Build", body: "15+ visualizations (waterfall, well log, time-series, pressure profile) and a Spring Boot service with 3 REST endpoints: query, wellbore lookup and file import." },
      { title: "Impact", body: "Powers pressure analysis and fracture monitoring, with each user's view settings persisted between sessions." },
    ],
  },
  {
    id: "cloud",
    tag: "Cloud & CI/CD",
    title: "Shipping services to Kubernetes on AWS EKS",
    icon: "cloud",
    context: "Petrabytes · Platform Services",
    logs: [
      { time: "09:15:40", level: "RUN", text: "pipeline: mvn verify → docker build → push" },
      { time: "09:15:52", level: "INFO", text: "artifacts → Amazon S3" },
      { time: "09:16:10", level: "INFO", text: "kubectl rollout → EKS cluster (20+ microservices)" },
      { time: "09:16:31", level: "OK", text: "deployment healthy · rollout complete" },
    ],
    steps: [
      { title: "Problem", body: "10+ Spring Boot modules — Data Lineage, Metadata Management, OSDU and User Administration — needed consistent, repeatable deployments." },
      { title: "Approach", body: "Containerize every application with Docker and run it on Kubernetes alongside the platform's other microservices." },
      { title: "Build", body: "Deployed to AWS EKS next to 20+ microservices, with Amazon S3 for data storage and Jenkins, Bitbucket Pipelines and AWS CodeBuild for CI/CD." },
      { title: "Impact", body: "REST controllers route session-authenticated requests and multipart file uploads to backend microservices through one consistent pipeline." },
    ],
  },
  {
    id: "ui",
    tag: "Shared UI",
    title: "One component library, four production apps",
    icon: "blocks",
    context: "Petrabytes · Frontend Platform",
    logs: [
      { time: "11:48:20", level: "RUN", text: "npm test -- --coverage" },
      { time: "11:48:51", level: "INFO", text: "500+ test files · SonarQube quality gate" },
      { time: "11:49:02", level: "INFO", text: "@shared/ui: 49 components · icons · utilities" },
      { time: "11:49:03", level: "OK", text: "consumed by 4 production applications" },
    ],
    steps: [
      { title: "Problem", body: "Four production applications duplicating UI meant every change had to be shipped once per app." },
      { title: "Approach", body: "A modular React codebase with centralized reusable components, shared utilities and a common custom icon system." },
      { title: "Build", body: "49 centralized components backed by 500+ Jest unit test files, checked with SonarQube and Bitbucket pull request reviews." },
      { title: "Impact", body: "UI changes ship once instead of per application, across all 4 apps." },
    ],
  },
]

export const experience = [
  {
    company: "Petrabytes Corp",
    team: "Oil & Gas Data Platform",
    role: "Software Engineer – Full Stack",
    location: "Bengaluru, India · On-site",
    period: "Apr 2025 — Present",
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

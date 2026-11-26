import {
  Archive,
  Boxes,
  Cloud,
  Database,
  FileText,
  Globe,
  Key,
  KeyRound,
  Layers,
  MapPinned,
  Network,
  Package,
  Shapes,
  ShieldCheck,
  WandSparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

/** Brand logos self-hosted from Devicon (MIT) in /public/logos. */
const logos: Record<string, string> = {
  Java: "java",
  JavaScript: "javascript",
  TypeScript: "typescript",
  "Spring Boot": "spring",
  "Spring MVC": "spring",
  "Spring Security": "spring",
  "Spring Data JPA": "spring",
  Hibernate: "hibernate",
  JUnit: "junit",
  React: "react",
  "React Router": "reactrouter",
  Jest: "jest",
  Plotly: "plotly",
  HTML5: "html5",
  CSS3: "css3",
  PostgreSQL: "postgresql",
  "PostgreSQL / PostGIS": "postgresql",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Jenkins: "jenkins",
  Git: "git",
  Bitbucket: "bitbucket",
  Jira: "jira",
  Confluence: "confluence",
}

/** Concepts and tools without a usable logo get a line icon instead. */
const glyphs: Record<string, LucideIcon> = {
  SQL: Database,
  OAuth2: KeyRound,
  Lombok: WandSparkles,
  Zustand: Layers,
  Mapbox: MapPinned,
  "REST APIs": Network,
  Microservices: Boxes,
  "JWT Auth": Key,
  RBAC: ShieldCheck,
  OOP: Shapes,
  PostGIS: Globe,
  AWS: Cloud,
  "AWS EKS": Cloud,
  "Amazon S3": Archive,
  Maven: Package,
  "Google Docs": FileText,
  "Mind Maps": Workflow,
}

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const logo = logos[name]
  if (logo) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}logos/${logo}.svg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn("shrink-0 object-contain", className)}
      />
    )
  }
  const Glyph = glyphs[name] ?? Shapes
  return <Glyph aria-hidden="true" strokeWidth={1.75} className={cn("shrink-0 text-foreground/60", className)} />
}

import { FolderGit2 } from "lucide-react"
import { Expandable } from "@/components/expandable"
import { Reveal } from "@/components/motion/reveal"
import { PeriodBadge } from "@/components/period-badge"
import { Section } from "@/components/section"
import { projects } from "@/data/portfolio"

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="space-y-6">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.1}>
            <article className="hover-shimmer rounded-2xl border border-foreground/10 p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-foreground/5">
              <div className="mb-2 flex flex-col justify-between gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <FolderGit2 className="size-4 text-foreground/50" />
                  {project.title}
                </h3>
                <PeriodBadge>{project.year}</PeriodBadge>
              </div>
              <p className="mb-1 text-xs text-foreground/50">{project.stack}</p>
              <p className="mb-4 text-sm text-foreground/80 italic">{project.summary}</p>

              <Expandable collapsedHeight={80}>
                <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/70">
                  {project.sections.map((s) => (
                    <li key={s.label} className="flex gap-2">
                      <span className="mt-1 text-foreground/40">▹</span>
                      <span>
                        <strong className="font-semibold text-foreground">{s.label}:</strong> {s.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </Expandable>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

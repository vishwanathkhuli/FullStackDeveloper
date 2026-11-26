import { Activity, ArrowUpRight, FolderGit2, GraduationCap, Map as MapIcon } from "lucide-react"
import { Expandable } from "@/components/expandable"
import { Reveal } from "@/components/motion/reveal"
import { PeriodBadge } from "@/components/period-badge"
import { Section } from "@/components/section"
import { projects } from "@/data/portfolio"

/** Icon per project (the `icon` field in portfolio.ts); unknown values fall back to a folder. */
const icons = { map: MapIcon, activity: Activity, graduation: GraduationCap }

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="space-y-6">
        {projects.map((project, i) => {
          const Icon = icons[project.icon as keyof typeof icons] ?? FolderGit2
          return (
            <Reveal key={project.title} delay={i * 0.1}>
              <article className="hover-shimmer rounded-2xl border border-foreground/10 p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-foreground/5">
                {/* Header laid out like the Experience cards: icon tile, then title + date */}
                <div className="mb-3 flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-foreground/10">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <PeriodBadge>{project.year}</PeriodBadge>
                    </div>
                    <p className="mt-0.5 text-xs text-foreground/50">{project.stack}</p>
                    {"url" in project && project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 rounded-full border border-foreground/15 px-2.5 py-0.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
                      >
                        Live site <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
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
          )
        })}
      </div>
    </Section>
  )
}

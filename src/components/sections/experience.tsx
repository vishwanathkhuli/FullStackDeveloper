import { Briefcase } from "lucide-react"
import { Expandable } from "@/components/expandable"
import { Reveal } from "@/components/motion/reveal"
import { PeriodBadge } from "@/components/period-badge"
import { Section } from "@/components/section"
import { experience } from "@/data/portfolio"

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-6">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.1}>
            <article className="hover-shimmer rounded-2xl border border-foreground/10 p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-foreground/5">
              <div className="mb-3 flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-foreground/10">
                  <Briefcase className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                    <h3 className="text-lg font-semibold">{job.company}</h3>
                    <PeriodBadge>{job.period}</PeriodBadge>
                  </div>
                  <p className="text-sm text-foreground/60">
                    {job.role} · {job.team}
                  </p>
                  <p className="text-xs text-foreground/40">{job.location}</p>
                </div>
              </div>

              <Expandable collapsedHeight={96}>
                <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/70">
                  {job.points.map((p) => (
                    <li key={p.lead} className="flex gap-2">
                      <span className="mt-1 text-foreground/40">▹</span>
                      <span>
                        <strong className="font-semibold text-foreground">{p.lead}:</strong> {p.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-foreground/10 pt-3">
                  {job.keywords.map((k) => (
                    <span key={k} className="rounded-md bg-foreground/5 px-2 py-0.5 text-[11px] text-foreground/60">
                      {k}
                    </span>
                  ))}
                </div>
              </Expandable>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

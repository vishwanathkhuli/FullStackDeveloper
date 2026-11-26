import { GraduationCap } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { Section } from "@/components/section"
import { education } from "@/data/portfolio"

export function Education() {
  return (
    <Section id="education" title="Education">
      <Reveal>
        <div className="hover-shimmer flex items-start gap-4 rounded-2xl border border-foreground/10 p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-foreground/10">
            <GraduationCap className="size-5" />
          </span>
          <div className="flex-1">
            <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
              <h3 className="text-lg font-medium">{education.school}</h3>
              <span className="font-mono text-xs text-foreground/50">{education.period}</span>
            </div>
            <p className="text-sm text-foreground/60">{education.degree}</p>
            <p className="text-xs text-foreground/40">{education.location}</p>
            <span className="mt-3 inline-block rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-0.5 text-xs font-medium">
              {education.grade}
            </span>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

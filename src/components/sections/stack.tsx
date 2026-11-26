import type React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Reveal } from "@/components/motion/reveal"
import { Section } from "@/components/section"
import { SkillIcon } from "@/components/skill-icon"
import { skillGroups, skills } from "@/data/portfolio"

/**
 * Seamless left-to-right marquee: one track holds two identical copies and
 * slides from -50% to 0, so the loop point is invisible. Pauses on hover (or
 * while touched on mobile) and stays still for users who prefer reduced motion.
 */
function MarqueeRow({ items, duration }: { items: string[]; duration: number }) {
  return (
    <div className="group relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
        className="flex w-max animate-marquee-right will-change-transform group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center gap-2 pr-2 sm:gap-3 sm:pr-3">
            {items.map((s) => (
              <li
                key={s}
                className="flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] py-1 pr-3 pl-2 text-xs font-semibold tracking-tight whitespace-nowrap text-foreground/80 transition-colors duration-200 hover:border-foreground/30 hover:bg-foreground/[0.07] hover:text-foreground sm:gap-2 sm:py-1.5 sm:pr-4 sm:pl-2.5 sm:text-sm md:text-base"
              >
                <SkillIcon name={s} className="size-4 sm:size-5" />
                {s}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export function Stack() {
  const [open, setOpen] = useState(false)
  const half = Math.ceil(skills.length / 2)

  return (
    <Section id="skills" title="Tech Stack">
      <Reveal className="-mx-6 space-y-2 py-2 sm:mx-0 sm:space-y-3">
        <MarqueeRow items={skills.slice(0, half)} duration={45} />
        <MarqueeRow items={skills.slice(half)} duration={60} />
      </Reveal>

      <div className="mt-4 flex justify-center sm:mt-6">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-bold tracking-[0.2em] text-foreground/50 uppercase transition-colors hover:text-foreground"
        >
          {open ? "Hide Full Stack" : "View Full Stack"}
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown className="size-3" />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 pt-4 sm:grid-cols-2 sm:pt-6">
              {skillGroups.map((g, i) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-foreground/10 p-4"
                >
                  <p className="mb-2 text-[10px] font-bold tracking-widest text-foreground/60 uppercase">{g.title}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-md bg-foreground/5 px-2 py-1 text-xs text-foreground/80"
                      >
                        <SkillIcon name={item} className="size-3.5" />
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

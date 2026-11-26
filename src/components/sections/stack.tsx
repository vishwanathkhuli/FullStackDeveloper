import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Reveal } from "@/components/motion/reveal"
import { Section } from "@/components/section"
import { skillGroups, skills } from "@/data/portfolio"
import { cn } from "@/lib/utils"

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      {[0, 1].map((dup) => (
        <div
          key={dup}
          aria-hidden={dup === 1}
          className={cn(
            "flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {items.map((s) => (
            <span
              key={s}
              className="rounded-full border border-foreground/10 px-4 py-1.5 text-sm font-bold tracking-tight whitespace-nowrap text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground md:text-base"
            >
              {s}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export function Stack() {
  const [open, setOpen] = useState(false)
  const half = Math.ceil(skills.length / 2)

  return (
    <Section id="skills" title="Tech Stack">
      <Reveal className="-mx-6 space-y-3 py-2 sm:mx-0">
        <MarqueeRow items={skills.slice(0, half)} />
        <MarqueeRow items={skills.slice(half)} reverse />
      </Reveal>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-foreground/50 uppercase transition-colors hover:text-foreground"
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
            <div className="grid gap-3 pt-6 sm:grid-cols-2">
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
                      <span key={item} className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-foreground/80">
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

import { AnimatePresence, motion } from "motion/react"
import { Activity, Blocks, Cloud, Map as MapIcon, Terminal } from "lucide-react"
import { useState } from "react"
import { Reveal } from "@/components/motion/reveal"
import { Section } from "@/components/section"
import { showcase, type ShowcaseCase } from "@/data/portfolio"
import { cn } from "@/lib/utils"

const icons = { map: MapIcon, activity: Activity, cloud: Cloud, blocks: Blocks }

const levelColor: Record<ShowcaseCase["logs"][number]["level"], string> = {
  RUN: "text-sky-400",
  INFO: "text-neutral-400",
  WARN: "text-amber-400",
  OK: "text-emerald-400",
}

const stepLabels = ["Trace", "Problem", "Approach", "Build", "Impact"]

export function Showcase() {
  const [activeId, setActiveId] = useState(showcase[0].id)
  const [step, setStep] = useState(0)
  const active = showcase.find((c) => c.id === activeId)!

  const pick = (id: string) => {
    setActiveId(id)
    setStep(0)
  }

  return (
    <Section id="highlights" title="Engineering Highlights">
      <Reveal className="hover-shimmer w-full space-y-4 rounded-2xl border border-foreground/10 bg-background/90 p-4 shadow-xl backdrop-blur-md sm:p-6">
        <div className="flex flex-col justify-between gap-3 border-b border-foreground/10 pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-foreground/10">
              <Terminal className="size-5" />
            </span>
            <div>
              <p className="font-hand text-3xl leading-none font-bold">Under the hood</p>
              <p className="text-xs text-foreground/60">How I solved real problems on the platform</p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            Interactive
          </span>
        </div>

        {/* Case selector */}
        <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
          {showcase.map((c) => {
            const Icon = icons[c.icon]
            const isActive = c.id === activeId
            return (
              <button
                key={c.id}
                onClick={() => pick(c.id)}
                className={cn(
                  "relative flex items-start gap-3 rounded-xl border p-3 text-left transition-colors duration-200",
                  isActive
                    ? "border-foreground/40"
                    : "border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20 hover:bg-foreground/[0.05]",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="case-bg"
                    className="absolute inset-0 -z-10 rounded-xl bg-foreground/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className={cn("mt-0.5 size-5 shrink-0", isActive ? "text-foreground" : "text-foreground/50")} />
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold tracking-wider text-foreground/60 uppercase">{c.tag}</span>
                  <span className="block truncate text-xs font-semibold">{c.title}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Terminal window (always dark) */}
        <div className="overflow-hidden rounded-xl border border-foreground/15 bg-neutral-950 text-neutral-100 shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-4 py-2.5 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-3 rounded-full bg-red-500/80" />
              <span className="inline-block size-3 rounded-full bg-amber-500/80" />
              <span className="inline-block size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 hidden font-mono text-neutral-400 sm:inline">vishwanath@pie: ~/{active.id}</span>
            </div>
            <span className="font-mono text-[11px] text-amber-400">{active.context}</span>
          </div>

          <div className="scrollbar-none flex overflow-x-auto border-b border-neutral-800 bg-neutral-900/50 px-2 font-mono text-xs">
            {stepLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => setStep(i)}
                className={cn(
                  "relative px-3 py-2 font-medium whitespace-nowrap transition-colors",
                  step === i ? "text-emerald-400" : "text-neutral-400 hover:text-neutral-200",
                )}
              >
                {i + 1}. {label}
                {step === i && (
                  <motion.span layoutId="step-underline" className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-400" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[240px] p-4 font-mono text-xs leading-relaxed">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.id}-${step}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 ? (
                  <div className="space-y-1">
                    <p className="mb-3 text-neutral-500">$ trace --case {active.id}</p>
                    {active.logs.map((log, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.22 }}
                        className="break-words"
                      >
                        <span className="text-neutral-600">[{log.time}]</span>{" "}
                        <span className={levelColor[log.level]}>[{log.level}]</span>{" "}
                        <span className="text-neutral-200">{log.text}</span>
                      </motion.p>
                    ))}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ delay: 0.2 + active.logs.length * 0.22, duration: 1, repeat: Infinity }}
                      className="mt-1 inline-block h-3.5 w-2 bg-emerald-400"
                    />
                  </div>
                ) : (
                  <div className="font-sans">
                    <p className="mb-2 text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                      {active.steps[step - 1].title}
                    </p>
                    <p className="mb-4 text-base font-semibold text-neutral-100">{active.title}</p>
                    <p className="rounded border border-amber-500/20 bg-amber-500/10 p-3 text-sm leading-relaxed text-amber-100">
                      {active.steps[step - 1].body}
                    </p>
                    <div className="mt-5 flex items-center justify-between font-mono text-[11px] text-neutral-500">
                      <span>
                        step {step} / {active.steps.length}
                      </span>
                      {step < active.steps.length && (
                        <button onClick={() => setStep(step + 1)} className="text-neutral-300 hover:text-emerald-400">
                          next →
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

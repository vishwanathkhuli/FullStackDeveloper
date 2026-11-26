import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const draw = (delay: number, duration = 0.9) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true },
  transition: { pathLength: { delay, duration, ease: "easeInOut" as const }, opacity: { delay, duration: 0.01 } },
})

/** A wobbly pen underline that draws itself when scrolled into view. */
export function ScribbleUnderline({ className, delay = 0.3 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden className={cn("h-3 w-full overflow-visible", className)}>
      <motion.path
        d="M3 12 C 60 4, 120 16, 180 9 S 270 6, 297 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        {...draw(delay)}
      />
      <motion.path
        d="M20 16 C 90 11, 160 18, 240 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.6}
        {...draw(delay + 0.6, 0.6)}
      />
    </svg>
  )
}

/** A curved hand-drawn arrow, pointing down-left by default. */
export function ScribbleArrow({ className, delay = 0.3 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 80 60" aria-hidden className={cn("overflow-visible", className)}>
      <motion.path
        d="M75 6 C 55 4, 30 14, 14 46"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        {...draw(delay, 0.7)}
      />
      <motion.path
        d="M6 36 L 14 47 L 26 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(delay + 0.65, 0.3)}
      />
    </svg>
  )
}

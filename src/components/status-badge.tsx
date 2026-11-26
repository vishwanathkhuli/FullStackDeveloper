import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/** Green "live" badge that cycles through a few short status labels. */
export function StatusBadge({ labels, className, interval = 2800 }: { labels: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (labels.length < 2) return
    const id = setInterval(() => setI((n) => (n + 1) % labels.length), interval)
    return () => clearInterval(id)
  }, [labels.length, interval])

  return (
    <motion.span
      layout
      transition={{ layout: { type: "spring", stiffness: 400, damping: 32 } }}
      className={cn(
        "flex items-center gap-1.5 overflow-hidden rounded-full border border-emerald-500/25 bg-background/90 px-3 py-1 text-xs font-semibold whitespace-nowrap text-emerald-600 shadow-sm backdrop-blur dark:text-emerald-400",
        className,
      )}
    >
      <span className="relative flex size-1.5 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={labels[i]}
          initial={{ y: 14, opacity: 0, filter: "blur(2px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -14, opacity: 0, filter: "blur(2px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {labels[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

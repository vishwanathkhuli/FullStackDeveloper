import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { useState, type ReactNode } from "react"

/** Collapses its content to a short preview with a fade, plus a View More toggle. */
export function Expandable({ children, collapsedHeight = 88 }: { children: ReactNode; collapsedHeight?: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : collapsedHeight }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
      >
        {children}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent"
            />
          )}
        </AnimatePresence>
      </motion.div>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-4 flex items-center gap-1 text-xs font-medium text-foreground/50 transition-colors hover:text-foreground"
      >
        {open ? "View Less" : "View More"}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="size-3" />
        </motion.span>
      </button>
    </div>
  )
}

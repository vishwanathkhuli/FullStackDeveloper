import { motion } from "motion/react"
import { Fragment, type ReactNode } from "react"

/** A marker stroke that sweeps under the text when it scrolls into view. */
export function Highlight({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.mark
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="-mx-0.5 rounded-md bg-transparent bg-[linear-gradient(to_right,color-mix(in_oklch,var(--brand)_24%,transparent),color-mix(in_oklch,var(--brand-2)_24%,transparent))] bg-no-repeat px-1 py-0.5 font-medium text-foreground [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
    >
      {children}
    </motion.mark>
  )
}

/** Renders a string, turning **phrases** into animated highlights. */
export function HighlightedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Highlight key={i} delay={delay + Math.floor(i / 2) * 0.25}>
            {part}
          </Highlight>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

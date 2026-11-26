import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type TextRevealProps = {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
}

/** Reveals a line of text word by word, sliding each word up from a mask. */
export function TextReveal({ text, className, wordClassName, delay = 0 }: TextRevealProps) {
  const words = text.split(" ")
  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="-mx-[0.12em] inline-block overflow-hidden px-[0.12em] pb-[0.12em] align-bottom" aria-hidden="true">
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

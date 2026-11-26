import { animate, useInView, useMotionValue, useTransform, motion } from "motion/react"
import { useEffect, useRef } from "react"

/** Counts up from 0 to `value` once it scrolls into view. */
export function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => `${v.toFixed(decimals)}${suffix}`)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, count, value])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

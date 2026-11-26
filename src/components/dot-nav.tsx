import { motion } from "motion/react"
import { useEffect, useRef } from "react"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"

const sections = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Tech Stack" },
  { id: "contact", label: "Contact" },
]
const ids = sections.map((s) => s.id)

/** A slightly lopsided pen dot, like a dot made with a pen tip. */
function InkDot({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className="size-3 overflow-visible">
      <path
        d="M6 1.6c2.6-.2 4.5 1.9 4.3 4.5-.2 2.4-2.2 4.3-4.6 4.2C3.3 10.2 1.5 8.4 1.7 5.9 1.9 3.5 3.6 1.8 6 1.6Z"
        className={cn(
          "fill-current transition-all duration-300",
          active ? "scale-[0.7] opacity-100" : "opacity-25 group-hover:opacity-60",
        )}
        style={{ transformOrigin: "center", transformBox: "fill-box" }}
      />
    </svg>
  )
}

/** A hand-drawn ring that draws itself around the active dot (not quite closed, like a real pen loop). */
function PenRing() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden className="absolute -inset-[9px] size-[30px] overflow-visible">
      <motion.path
        d="M16 4.5c6 .3 10 4.8 9.4 10.6-.6 5.6-5.4 9.8-11 9.2C8.6 23.7 4.4 19 5 13.3 5.5 8 10 4.4 15.5 4.7c2.3.1 4.2.9 5.7 2.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, rotate: -40 }}
        animate={{ pathLength: 1, rotate: 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />
    </svg>
  )
}

/** Vertical notebook-style navigation on the right edge (xl screens; TopNav covers smaller ones). */
export function DotNav() {
  const active = useActiveSection(ids)

  return (
    <motion.nav
      aria-label="Sections"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed top-1/2 right-8 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
    >
      {sections.map((s, i) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex w-36 items-center justify-end text-foreground"
          >
            <span
              className={cn(
                "mr-4 font-hand text-xl leading-none transition-all duration-300",
                isActive
                  ? "translate-x-0 font-semibold opacity-100"
                  : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
              )}
              // Alternate a tiny tilt so the labels look hand-written, not typeset
              style={{ rotate: `${i % 2 === 0 ? -2 : 1.5}deg` }}
            >
              {s.label}
            </span>
            <span className="relative grid size-3 place-items-center">
              {isActive && <PenRing key={s.id} />}
              <InkDot active={isActive} />
            </span>
          </a>
        )
      })}
    </motion.nav>
  )
}

/**
 * Top bar for phones and tablets (below xl), where the dot nav is hidden.
 * Swipeable section tabs; the active one is marked and kept scrolled into view.
 * Leaves room on the right for the theme toggle.
 */
export function TopNav() {
  const active = useActiveSection(ids)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    const tab = list?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (!list || !tab) return
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" })
  }, [active])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="fixed inset-x-0 top-0 z-50 h-14 border-b border-foreground/10 bg-background/80 backdrop-blur-md xl:hidden"
    >
      <nav aria-label="Sections" className="h-full pr-24">
        <div
          ref={listRef}
          className="scrollbar-none flex h-full items-center gap-1 overflow-x-auto px-3 [mask-image:linear-gradient(to_right,black_85%,transparent)]"
        >
          {sections.map((s) => {
            const isActive = active === s.id
            return (
              <a
                key={s.id}
                data-id={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative shrink-0 rounded-full px-3 py-1.5 font-hand text-lg leading-none whitespace-nowrap transition-colors",
                  isActive ? "font-semibold text-foreground" : "text-foreground/50 hover:text-foreground/80",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="top-nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground/10"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {s.label}
              </a>
            )
          })}
        </div>
      </nav>
    </motion.header>
  )
}

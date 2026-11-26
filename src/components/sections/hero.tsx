import { motion } from "motion/react"
import { MapPin } from "lucide-react"
import { AvatarPhoto } from "@/components/avatar-photo"
import { Counter } from "@/components/motion/counter"
import { HighlightedText } from "@/components/motion/highlight"
import { ScribbleArrow, ScribbleUnderline } from "@/components/motion/scribble"
import { TextReveal } from "@/components/motion/text-reveal"
import { SkillIcon } from "@/components/skill-icon"
import { StatusBadge } from "@/components/status-badge"
import { profile, stats } from "@/data/portfolio"

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease },
})

export function Hero() {
  return (
    <section id="home" className="flex w-full scroll-mt-16 flex-col items-center pt-24 text-center sm:pt-28">
      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease }}
        className="group relative mb-6"
      >
        <div className="absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,var(--foreground)_0%,transparent_65%)] opacity-[0.06] blur-xl transition-opacity duration-700 group-hover:opacity-[0.12]" />
        <AvatarPhoto className="size-32 rounded-full border border-foreground/10 shadow-md transition-transform duration-700 group-hover:scale-[1.03] sm:size-48" />
        {/* Margin note: writes itself in, then gently sways and the arrow keeps pointing at the photo */}
        <motion.div
          initial={{ rotate: -6 }}
          animate={{ rotate: [-6, -2.5, -6] }}
          transition={{ delay: 2.8, duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute top-2 -right-36 hidden origin-bottom-left text-foreground/60 sm:block"
        >
          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: 1.6, duration: 0.8, ease: "easeInOut" }}
            className="font-hand text-2xl leading-none"
          >
            that&apos;s me
            <motion.span
              className="inline-block origin-bottom"
              animate={{ y: [0, -5, 0, -2, 0], rotate: [0, 8, 0, -4, 0] }}
              transition={{ delay: 2.6, duration: 0.9, repeat: Infinity, repeatDelay: 2.5 }}
            >
              !
            </motion.span>
          </motion.p>
          <motion.div
            animate={{ x: [0, -4, 0], y: [0, 4, 0] }}
            transition={{ delay: 2.8, duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="transition-[translate] duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"
          >
            <ScribbleArrow className="mt-1 -ml-6 h-12 w-16" delay={2.3} />
          </motion.div>
        </motion.div>
        {profile.available && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 300, damping: 18 }}
            className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 justify-center"
          >
            <StatusBadge labels={profile.status} />
          </motion.div>
        )}
      </motion.div>

      <h1 className="font-hand text-[clamp(2.5rem,10vw,5rem)] leading-[1.15] font-bold whitespace-nowrap">
        <TextReveal text={profile.name} delay={0.3} />
      </h1>
      <ScribbleUnderline className="mb-4 w-64 text-foreground/50 sm:w-96" delay={1} />
      <motion.p {...fadeUp(0.7)} className="text-base font-medium text-balance text-foreground/80 sm:text-xl">
        {profile.role}
      </motion.p>
      {/* One line: swipeable on phones, centred (allowed to overhang the column) from md up */}
      <div className="scrollbar-none mt-5 -mx-6 w-[calc(100%+3rem)] overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] md:mx-0 md:flex md:w-full md:justify-center md:overflow-visible md:[mask-image:none]">
      <ul className="mx-auto flex w-max flex-nowrap items-center gap-1.5 px-6 py-1 md:px-0 md:gap-2">
        {profile.keywords.map((k, i) => (
          <motion.li
            key={k}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9 + i * 0.08, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ y: -3 }}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] py-1 pr-2.5 pl-1 text-xs font-semibold whitespace-nowrap text-foreground/80 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:border-foreground/25 hover:bg-foreground/[0.08] hover:text-foreground lg:py-1.5 lg:pr-3 lg:pl-1.5 lg:text-sm"
          >
            <span className="grid size-5 place-items-center rounded-full bg-background/80 ring-1 ring-foreground/10 lg:size-6">
              <SkillIcon name={k} className="size-3.5 lg:size-4" />
            </span>
            {k}
          </motion.li>
        ))}
      </ul>
      </div>
      <motion.p {...fadeUp(1.4)} className="mt-4 inline-flex items-center gap-1.5 text-xs text-foreground/50">
        <MapPin className="size-3.5" /> {profile.location}
      </motion.p>

      {/* Impact stats */}
      <motion.div {...fadeUp(1.1)} className="mt-12 mb-12 w-full">
        <div className="hover-shimmer rounded-2xl border border-foreground/10 bg-background/90 p-4 sm:p-6">
          <h2 className="mb-5 text-center font-hand text-3xl font-semibold text-foreground/80">
            Key impact highlights
          </h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1, ease }}
                className="text-center"
              >
                <p className="text-2xl font-bold tabular-nums sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="text-xs text-foreground/60 sm:text-sm">{s.label}</p>
                <p className="text-xs text-foreground/40">{s.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="mb-20 w-full space-y-4 text-left text-base leading-relaxed text-foreground/70 sm:text-lg">
        {profile.summary.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease }}
            className="text-pretty"
          >
            <HighlightedText text={p} delay={0.4 + i * 0.2} />
          </motion.p>
        ))}
      </div>
    </section>
  )
}

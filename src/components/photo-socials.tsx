import { motion } from "motion/react"
import type { ComponentType, CSSProperties, SVGProps } from "react"
import { GithubIcon, GmailIcon, LeetcodeColorIcon, LinkedinColorIcon } from "@/components/icons"
import { profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"

type Link = {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  external?: boolean
  /**
   * Angle on the ring around the photo, in degrees: 0 = right, 90 = bottom, 180 = left.
   * [phones, sm and up]. Chosen to stay clear of the status badge (bottom centre) and
   * the "that's me!" note (top right).
   */
  angle: [number, number]
}

/** Ring radius as a fraction of the photo's size: [phones, sm and up]. */
const RING: [number, number] = [0.76, 0.72]

/** Centre of a bubble on the ring, as CSS percentages of the photo box. */
function onRing(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180
  return { x: `${50 + radius * 100 * Math.cos(rad)}%`, y: `${50 + radius * 100 * Math.sin(rad)}%` }
}

/** Only links that have a URL are shown, so empty entries in portfolio.ts are skipped. */
const links: Link[] = (
  [
    {
      label: "LinkedIn",
      href: profile.socials.linkedin,
      Icon: LinkedinColorIcon,
      external: true,
      angle: [205, 205],
    },
    {
      label: "GitHub",
      href: profile.socials.github,
      Icon: GithubIcon,
      external: true,
      angle: [160, 160],
    },
    {
      label: "LeetCode",
      href: profile.socials.leetcode,
      Icon: LeetcodeColorIcon,
      external: true,
      angle: [28, 30],
    },
    {
      label: "Email",
      href: profile.email && `mailto:${profile.email}`,
      Icon: GmailIcon,
      angle: [2, 2],
    },
  ] satisfies Link[]
).filter((l) => l.href)

/**
 * Social links as bubbles floating around the profile photo. Render inside the
 * photo's `relative` wrapper; positions are relative to the photo.
 */
export function PhotoSocials() {
  return (
    <>
      {links.map(({ label, href, Icon, external, angle }, i) => {
        const phone = onRing(angle[0], RING[0])
        const wide = onRing(angle[1], RING[1])
        return (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            {...(external && { target: "_blank", rel: "noreferrer" })}
            style={{ "--x": phone.x, "--y": phone.y, "--x-sm": wide.x, "--y-sm": wide.y } as CSSProperties}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { delay: 1.6 + i * 0.12, duration: 0.3 },
              scale: { delay: 1.6 + i * 0.12, type: "spring", stiffness: 320, damping: 16 },
              // Each bubble bobs on its own rhythm so the group feels like it floats
              y: { delay: 2.2 + i * 0.4, duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "absolute top-[var(--y)] left-[var(--x)] z-10 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-foreground/10 bg-background/80 text-foreground shadow-md backdrop-blur-md transition-[border-color,box-shadow] hover:border-foreground/25 hover:shadow-lg sm:top-[var(--y-sm)] sm:left-[var(--x-sm)] sm:size-11",
            )}
          >
            <Icon className="size-[18px] sm:size-[22px]" />
          </motion.a>
        )
      })}
    </>
  )
}

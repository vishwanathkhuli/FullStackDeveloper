import { motion } from "motion/react"
import type { ComponentType, SVGProps } from "react"
import { GithubIcon, GmailIcon, LeetcodeColorIcon, LinkedinColorIcon } from "@/components/icons"
import { profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"

type Link = {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  external?: boolean
  /** Where the bubble sits around the photo (percent of the photo's size). */
  position: string
}

/** Only links that have a URL are shown, so empty entries in portfolio.ts are skipped. */
const links: Link[] = (
  [
    {
      label: "LinkedIn",
      href: profile.socials.linkedin,
      Icon: LinkedinColorIcon,
      external: true,
      position: "top-[-4%] left-[-18%]",
    },
    {
      label: "GitHub",
      href: profile.socials.github,
      Icon: GithubIcon,
      external: true,
      position: "top-[58%] left-[-34%]",
    },
    {
      label: "LeetCode",
      href: profile.socials.leetcode,
      Icon: LeetcodeColorIcon,
      external: true,
      position: "top-[82%] right-[-26%]",
    },
    {
      label: "Email",
      href: profile.email && `mailto:${profile.email}`,
      Icon: GmailIcon,
      position: "top-[50%] right-[-36%]",
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
      {links.map(({ label, href, Icon, external, position }, i) => (
        <motion.a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external && { target: "_blank", rel: "noreferrer" })}
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
            "absolute z-10 grid size-9 place-items-center rounded-full border border-foreground/10 bg-background/80 text-foreground shadow-md backdrop-blur-md transition-[border-color,box-shadow] hover:border-foreground/25 hover:shadow-lg sm:size-11",
            position,
          )}
        >
          <Icon className="size-[18px] sm:size-[22px]" />
        </motion.a>
      ))}
    </>
  )
}

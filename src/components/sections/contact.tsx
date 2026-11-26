import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Check, Copy, Download, Mail, Phone } from "lucide-react"
import { useState } from "react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { Reveal } from "@/components/motion/reveal"
import { Section } from "@/components/section"
import { profile } from "@/data/portfolio"

const linkBtn =
  "inline-flex items-center gap-2 rounded-full border border-foreground/10 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-foreground/5"

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Section id="contact" title="Get in Touch" className="text-center">
      <Reveal className="relative">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[300px] w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--foreground)_0%,transparent_50%)] opacity-[0.04] blur-[20px]" />

        <p className="mb-6 text-lg text-foreground/70">
          Open to full-stack roles and interesting problems in data platforms, geospatial search and visualization.
          Let's talk.
        </p>

        {profile.available && (
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            Currently open to new opportunities
          </p>
        )}

        <div className="group relative mx-auto mb-8 flex w-fit items-center gap-3">
          <a href={`mailto:${profile.email}`} className="font-hand text-3xl font-semibold sm:text-4xl">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-bottom-left bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {profile.email}
            </span>
          </a>
          <button
            onClick={copy}
            aria-label="Copy email"
            className="grid size-8 place-items-center rounded-lg border border-foreground/10 text-foreground/60 transition-colors hover:text-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "y" : "n"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${profile.email}`} className={`${linkBtn} bg-foreground text-background hover:bg-foreground/90`}>
            <Mail className="size-4" /> Say hello
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className={linkBtn}>
            <LinkedinIcon className="size-4" /> LinkedIn <ArrowUpRight className="size-3.5 opacity-50" />
          </a>
          {profile.socials.github && (
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className={linkBtn}>
              <GithubIcon className="size-4" /> GitHub <ArrowUpRight className="size-3.5 opacity-50" />
            </a>
          )}
          <a href={profile.resumeUrl} download className={linkBtn}>
            <Download className="size-4" /> Resume
          </a>
          <a href={`tel:${profile.phone}`} className={linkBtn}>
            <Phone className="size-4" /> {profile.phone}
          </a>
        </div>
      </Reveal>
    </Section>
  )
}

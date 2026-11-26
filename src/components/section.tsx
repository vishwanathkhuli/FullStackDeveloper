import type { ReactNode } from "react"
import { Reveal } from "@/components/motion/reveal"
import { ScribbleUnderline } from "@/components/motion/scribble"
import { cn } from "@/lib/utils"

/** Page section with a handwritten title and a pen underline. */
export function Section({
  id,
  title,
  children,
  className,
}: {
  id: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("mb-20 w-full scroll-mt-16 text-left", className)}>
      <Reveal className={cn("mb-6 w-fit", className?.includes("text-center") && "mx-auto")}>
        <h2 className="font-hand text-4xl leading-none font-semibold text-foreground/90">{title}</h2>
        <ScribbleUnderline className="mt-1 text-foreground/40" />
      </Reveal>
      {children}
    </section>
  )
}

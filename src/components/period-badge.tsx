import { CalendarDays } from "lucide-react"

/** Date range as a readable pill; ongoing periods ("… Present") get a live green dot. */
export function PeriodBadge({ children }: { children: string }) {
  const current = children.includes("Present")
  return (
    <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/[0.06] px-2.5 py-1 text-xs font-medium whitespace-nowrap text-foreground/85">
      {current ? (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
        </span>
      ) : (
        <CalendarDays className="size-3.5 text-foreground/60" />
      )}
      {children}
    </span>
  )
}

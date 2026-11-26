import { useState } from "react"
import { profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"

/** Profile photo with an initials fallback if public/profile.png is missing. */
export function AvatarPhoto({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-brand to-brand-2", className)}>
      {!failed ? (
        <img
          src={profile.photo}
          alt={profile.name}
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="grid size-full place-items-center text-5xl font-semibold tracking-tight text-white">
          {profile.initials}
        </span>
      )}
    </div>
  )
}

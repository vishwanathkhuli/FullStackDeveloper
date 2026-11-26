import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

/** Pill switch fixed to the top-right corner. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === "dark"

  return (
    <motion.button
      onClick={toggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed top-2.5 right-4 z-[55] flex xl:top-6 xl:right-6 h-9 w-16 items-center rounded-full border border-foreground/10 bg-background/80 p-1 backdrop-blur-md"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="grid size-7 place-items-center rounded-full bg-foreground text-background"
        style={{ marginLeft: dark ? "auto" : 0 }}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {dark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
        </motion.span>
      </motion.span>
    </motion.button>
  )
}

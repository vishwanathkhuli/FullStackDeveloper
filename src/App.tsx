import { Background } from "@/components/background"
import { DotNav, TopNav } from "@/components/dot-nav"
import { ScrollProgress } from "@/components/scroll-progress"
import { Contact } from "@/components/sections/contact"
import { Education } from "@/components/sections/education"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"
import { Stack } from "@/components/sections/stack"
import { ThemeToggle } from "@/components/theme-toggle"
import { profile } from "@/data/portfolio"

const YEAR = new Date().getFullYear()

export default function App() {
  return (
    <>
      <Background />
      <ScrollProgress />
      <ThemeToggle />
      <DotNav />
      <TopNav />

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6">
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Stack />
        <Contact />
      </main>

      <footer className="relative z-10 mx-auto max-w-2xl px-6 pb-10">
        <div className="mx-auto mb-6 h-px max-w-sm bg-foreground/15 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        <p className="text-center text-xs text-foreground/40">
          © {YEAR} {profile.name}
        </p>
      </footer>
    </>
  )
}

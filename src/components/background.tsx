/**
 * Notes-app paper: the ruled lines live on <body> (bg-paper) so they scroll with
 * the page. This adds a soft edge shading and a paper-fiber grain on top.
 */
export function Background() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,color-mix(in_oklch,var(--foreground)_6%,transparent)_100%)]"
      />
      <div
        aria-hidden
        className="bg-noise pointer-events-none fixed inset-0 z-[9999] opacity-[0.07] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-screen"
      />
    </>
  )
}

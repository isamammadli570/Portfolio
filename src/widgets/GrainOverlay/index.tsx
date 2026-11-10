/** Barely-visible film grain over the whole page; purely decorative and click-through. */
export const GrainOverlay = () => (
    <div
        aria-hidden="true"
        className="pointer-events-none fixed -inset-1/2 z-90 animate-grain opacity-[0.05]"
        style={{backgroundImage: "radial-gradient(rgba(0,0,0,0.5) 1px, transparent 1.2px)", backgroundSize: "4px 4px"}}
    />
);

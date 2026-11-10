import {useEffect} from "react";
import Lenis from "lenis";

/** Inertial page scroll (Lenis). Skipped for users who prefer reduced motion; anchor links keep working through `scrollTo`. */
export const useSmoothScroll = (): void => {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), anchors: {offset: 0}});
        let frame = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, []);
};

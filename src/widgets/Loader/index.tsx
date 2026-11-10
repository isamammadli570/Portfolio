import {useEffect, useState} from "react";
import {animate, AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform} from "motion/react";
import {useTranslation} from "react-i18next";
import {LOADER} from "@/constants/other";

/** Full-screen preloader: a big percentage counter, then the curtain lifts. Skipped for reduced motion. */
export const Loader = () => {
    const {t} = useTranslation();
    const reduced = useReducedMotion();
    const [isVisible, setIsVisible] = useState(!reduced);
    const progress = useMotionValue(0);
    const rounded = useTransform(progress, (value) => Math.round(value));
    const scaleX = useTransform(progress, [0, 100], [0, 1]);

    useEffect(() => {
        if (reduced) return;
        document.documentElement.classList.add("lenis-stopped");
        const controls = animate(progress, 100, {duration: LOADER.COUNT_DURATION / 1000, delay: 0.1, ease: [0.6, 0, 0.2, 1]});
        const timer = window.setTimeout(() => {
            setIsVisible(false);
            document.documentElement.classList.remove("lenis-stopped");
        }, LOADER.EXIT_DELAY);

        return () => {
            controls.stop();
            window.clearTimeout(timer);
            document.documentElement.classList.remove("lenis-stopped");
        };
    }, [progress, reduced]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loader"
                    aria-hidden="true"
                    className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-8 text-ink-foreground"
                    initial={{clipPath: "inset(0 0 0 0)"}}
                    exit={{clipPath: "inset(0 0 100% 0)", transition: {duration: 1, ease: [0.8, 0, 0.2, 1]}}}
                >
                    <div className="flex items-center justify-between">
                        <span className="mono-label text-ink-muted">{t("brand")} — portfolio ©2026</span>
                        <span className="grid size-14 animate-spin-slow place-items-center rounded-full border border-ink-border">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/></svg>
                        </span>
                    </div>
                    <div>
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <span className="mono-label text-sm text-ink-muted">{t("loader.tagline")}</span>
                            <span className="text-[clamp(96px,16vw,240px)] leading-[0.85] font-bold tracking-[-0.06em] tabular-nums">
                                <motion.span>{rounded}</motion.span>
                            </span>
                        </div>
                        <div className="relative mt-6 h-px bg-ink-border">
                            <motion.i className="absolute inset-0 origin-left bg-ink-foreground" style={{scaleX}}/>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

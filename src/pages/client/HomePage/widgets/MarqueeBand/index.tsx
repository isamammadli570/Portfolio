import {useRef} from "react";
import {motion, useScroll, useTransform} from "motion/react";
import {useTranslation} from "react-i18next";

const REPEAT = [0, 1, 2];

/** Two huge text rows that slide in opposite directions as the band scrolls past. */
export const MarqueeBand = () => {
    const {t} = useTranslation("home");
    const ref = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({target: ref, offset: ["start end", "end start"]});
    const xForward = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
    const xBackward = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

    const row = (text: string) =>
        REPEAT.flatMap((i) => [
            <span key={`t${i}`}>{text}</span>,
            <span key={`s${i}`} className="inline-block animate-spin-slow text-brand">✳</span>,
        ]);

    return (
        <section ref={ref} aria-hidden="true" className="overflow-hidden py-36">
            <motion.div className="display flex w-max gap-[60px] text-[clamp(5rem,12vw,11.875rem)] whitespace-nowrap" style={{x: xForward}}>{row(t("marquee.a"))}</motion.div>
            <motion.div className="display mt-3 flex w-max gap-[60px] text-[clamp(5rem,12vw,11.875rem)] whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_var(--foreground)]" style={{x: xBackward}}>{row(t("marquee.b"))}</motion.div>
        </section>
    );
};

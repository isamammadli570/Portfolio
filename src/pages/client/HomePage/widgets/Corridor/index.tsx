import {useRef} from "react";
import {motion, useScroll, useTransform} from "motion/react";
import {useTranslation} from "react-i18next";
import {CorridorPanel} from "@/pages/client/HomePage/widgets/Corridor/CorridorPanel";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {SKILL_GROUPS} from "@/constants/portfolio";
import {SECTION_IDS} from "@/constants/routes";

const PANEL_GAP = 640;
const FIRST_DEPTH = -700;
const TRAVEL = 4300;

/** Skills as a 3D fly-through: the camera glides forward along a neon floor and each skill group passes by. */
export const Corridor = () => {
    const {t} = useTranslation("home");
    const isNarrow = useMediaQuery("(max-width: 760px)");
    const ref = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({target: ref, offset: ["start start", "end end"]});
    const z = useTransform(scrollYProgress, [0, 1], [0, TRAVEL]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.14], [0, -80]);
    const outroOpacity = useTransform(scrollYProgress, [0.7, 0.92], [0, 1]);
    const sideOffset = isNarrow ? 70 : 360;

    return (
        <section id={SECTION_IDS.SKILLS} ref={ref} className="relative h-[480svh] bg-ink">
            <div className="sticky top-0 h-svh overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#232321,var(--ink)_70%)] [perspective-origin:50%_45%] [perspective:700px]">
                <motion.div className="absolute top-1/2 left-1/2 size-0 [transform-style:preserve-3d]" style={{z}}>
                    <div
                        aria-hidden="true"
                        className="absolute -top-[3000px] -left-[1500px] h-[6000px] w-[3000px] [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_60%)]"
                        style={{
                            transform: "translateY(300px) rotateX(90deg)",
                            backgroundImage: "linear-gradient(rgba(239,238,233,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(239,238,233,0.22) 1px, transparent 1px)",
                            backgroundSize: "120px 120px",
                        }}
                    />
                    {SKILL_GROUPS.map((group, index) => (
                        <CorridorPanel
                            key={group.id}
                            group={group}
                            index={index}
                            x={index % 2 === 0 ? -sideOffset : sideOffset}
                            y={index % 2 === 0 ? -70 : 40}
                            z={FIRST_DEPTH - index * PANEL_GAP}
                        />
                    ))}
                    <motion.div className="absolute top-0 left-0 w-[900px] text-center text-white" style={{transform: "translate(-50%, -50%) translate3d(0px, -40px, -4600px)", opacity: outroOpacity}}>
                        <p className="display text-[110px] italic">{t("skills.outro")}</p>
                    </motion.div>
                </motion.div>

                <motion.div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white" style={{opacity: titleOpacity, y: titleY}}>
                    <p className="mono-label mb-4.5 text-ink-muted">{t("skills.label")}</p>
                    <h2 className="display text-[clamp(3.25rem,7.4vw,7.25rem)] italic">{t("skills.title")}</h2>
                    <p className="mt-5 text-[17px] text-ink-muted">{t("skills.hint")} ↓</p>
                </motion.div>
            </div>
        </section>
    );
};

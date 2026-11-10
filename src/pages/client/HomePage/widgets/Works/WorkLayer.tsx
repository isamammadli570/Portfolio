import {motion, useTransform, type MotionValue} from "motion/react";
import {useTranslation} from "react-i18next";
import type {Project} from "@/constants/portfolio";

type WorkLayerProps = {project: Project; index: number; count: number; progress: MotionValue<number>};

/**
 * One full-screen project slide. Slides after the first wipe in from the bottom while the screenshot settles from a zoom.
 * The screenshot stays black-and-white until the slide is hovered, to keep the page monochrome.
 */
export const WorkLayer = ({project, index, count, progress}: WorkLayerProps) => {
    const {t} = useTranslation(["projects", "home"]);
    const slot = 1 / count;
    const end = index * slot;
    const start = Math.max(0, end - slot * 0.45);
    const isFirst = index === 0;

    const clipPath = useTransform(progress, isFirst ? [0, 1] : [start, end], isFirst ? ["inset(0% 0 0 0)", "inset(0% 0 0 0)"] : ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
    const scale = useTransform(progress, [start, end + slot * 0.7], [isFirst ? 1 : 1.2, 1]);
    const name = t(`projects:items.${project.id}.name`);

    return (
        <motion.div className="group absolute inset-0 bg-ink" style={{clipPath}}>
            <motion.img
                src={project.image}
                alt={t("home:work.screenshot", {name})}
                loading={isFirst ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 size-full object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                style={{scale}}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82),rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.75))]"/>

            <div className="absolute right-[6%] bottom-[9%] z-20 flex max-w-[88%] flex-col items-end gap-3.5 text-right text-white">
                <span className="mono-label text-white/75">{t(`projects:items.${project.id}.category`)} — {project.year}</span>
                <span className="display text-[clamp(3rem,6vw,6rem)]">{name}</span>
                <p className="max-w-md text-[15px] leading-relaxed text-white/80">{t(`projects:items.${project.id}.description`)}</p>
                <div className="flex flex-wrap justify-end gap-2">
                    {project.tags.map((tag) => <span key={tag} className="inline-flex h-7 items-center rounded-full border border-white/30 px-3 text-xs">{tag}</span>)}
                </div>
                <div className="flex flex-wrap justify-end gap-2.5">
                    {project.repo && (
                        <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2.5 rounded-full border border-white/40 px-5.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink">
                            {t("home:work.code")}
                        </a>
                    )}
                    <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-5.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-ink-foreground">
                        {t("home:work.view")} <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

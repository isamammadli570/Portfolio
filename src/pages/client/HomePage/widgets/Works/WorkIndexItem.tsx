import {motion, useTransform, type MotionValue} from "motion/react";
import {useTranslation} from "react-i18next";
import {padIndex} from "@/helpers/format";
import type {Project} from "@/constants/portfolio";

type WorkIndexItemProps = {project: Project; index: number; count: number; progress: MotionValue<number>};

/** Entry of the numbered project list; brightens and nudges right while its slide is in view. */
export const WorkIndexItem = ({project, index, count, progress}: WorkIndexItemProps) => {
    const {t} = useTranslation("projects");
    const center = (index + 0.5) / count;
    const closeness = useTransform(progress, (value) => Math.max(0, 1 - Math.abs(value - center) / (1 / count)));
    const opacity = useTransform(closeness, [0, 1], [0.35, 1]);
    const x = useTransform(closeness, [0, 1], [0, 18]);

    return (
        <motion.li className="flex items-baseline gap-4 font-serif text-[clamp(1.1rem,2vw,1.75rem)] italic text-white" style={{opacity, x}}>
            <span className="mono-label">{padIndex(index + 1)}</span>
            {t(`items.${project.id}.name`)}
        </motion.li>
    );
};

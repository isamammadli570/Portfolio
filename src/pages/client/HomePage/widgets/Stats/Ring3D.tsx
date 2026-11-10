import {motion, useTransform, type MotionValue} from "motion/react";
import {RING_TECH} from "@/constants/portfolio";
import {padIndex} from "@/helpers/format";
import {cn} from "@/lib/utils";

const RADIUS = 360;

type Ring3DProps = {progress: MotionValue<number>};

/** Ring of the technologies I work with, spinning in 3D with the scroll position; only the front faces are drawn. */
export const Ring3D = ({progress}: Ring3DProps) => {
    const rotateY = useTransform(progress, [0, 1], [0, -330]);

    return (
        <div aria-hidden="true" className="flex h-[640px] scale-[0.62] items-center justify-center [perspective:1100px] sm:scale-100">
            <motion.div className="relative h-[250px] w-[170px] [transform-style:preserve-3d]" style={{rotateX: -12, rotateY}}>
                {RING_TECH.map((tech, index) => (
                    <div
                        key={tech}
                        className={cn(
                            "absolute inset-0 flex flex-col justify-between border p-4 [backface-visibility:hidden]",
                            index % 2 === 0 ? "border-foreground bg-surface text-foreground" : "border-ink-border bg-ink text-ink-foreground",
                        )}
                        style={{transform: `rotateY(${(index * 360) / RING_TECH.length}deg) translateZ(${RADIUS}px)`}}
                    >
                        <span className="mono-label opacity-60">{padIndex(index + 1)}</span>
                        <span className="font-serif text-[22px] leading-tight italic">{tech}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

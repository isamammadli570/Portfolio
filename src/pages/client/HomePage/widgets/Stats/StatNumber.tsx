import {motion, useTransform, type MotionValue} from "motion/react";

type StatNumberProps = {value: number; label: string; progress: MotionValue<number>; prefix?: string; suffix?: string};

/** Big serif counter that counts up from zero as the section scrolls into place. */
export const StatNumber = ({value, label, progress, prefix = "", suffix = ""}: StatNumberProps) => {
    const current = useTransform(progress, [0.05, 0.5], [0, value], {clamp: true});
    const rounded = useTransform(current, (latest) => Math.round(latest));

    return (
        <div className="flex flex-col gap-2.5">
            <span className="display text-[clamp(3.5rem,8vw,8rem)] whitespace-nowrap tabular-nums">
                {prefix}<motion.span>{rounded}</motion.span><span className="italic">{suffix}</span>
            </span>
            <span className="text-[15px] leading-snug text-muted-foreground">{label}</span>
        </div>
    );
};

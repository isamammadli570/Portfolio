import {motion, useTransform, type MotionValue} from "motion/react";
import type {ManifestoWord as ManifestoWordData} from "@/helpers/manifesto";
import {cn} from "@/lib/utils";

type ManifestoWordProps = {word: ManifestoWordData; progress: MotionValue<number>};

/** One word of a scroll-lit paragraph: fades in with scroll; emphasised words turn italic and draw an underline. */
export const ManifestoWord = ({word, progress}: ManifestoWordProps) => {
    const reveal = useTransform(progress, [word.start, word.end], [0, 1], {clamp: true});
    const opacity = useTransform(reveal, [0, 1], [0.16, 1]);
    const backgroundSize = useTransform(reveal, [0, 1], ["0% 0.06em", "100% 0.06em"]);

    return (
        <motion.span
            className={cn("mr-[0.24em] inline-block", word.highlighted && "bg-[linear-gradient(var(--brand),var(--brand))] bg-position-[0_96%] bg-no-repeat italic")}
            style={word.highlighted ? {opacity, backgroundSize} : {opacity}}
        >
            {word.text}
        </motion.span>
    );
};

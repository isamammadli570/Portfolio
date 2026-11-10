import type {ReactNode} from "react";
import {motion} from "motion/react";
import {cn} from "@/lib/utils";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    /** Distance in px the element rises from while fading in. */
    distance?: number;
};

/** Fades and lifts its children into view once they enter the viewport. */
export const Reveal = ({children, className, delay = 0, distance = 60}: RevealProps) => (
    <motion.div
        className={cn(className)}
        initial={{opacity: 0, y: distance}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: "0px 0px -12% 0px"}}
        transition={{duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1]}}
    >
        {children}
    </motion.div>
);

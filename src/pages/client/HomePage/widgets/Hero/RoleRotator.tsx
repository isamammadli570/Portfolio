import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "motion/react";

type RoleRotatorProps = {roles: readonly string[]};

/** Cycles through the given roles with a vertical slide, one at a time, in italic serif. */
export const RoleRotator = ({roles}: RoleRotatorProps) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => setIndex((current) => (current + 1) % roles.length), 2400);
        return () => window.clearInterval(timer);
    }, [roles.length]);

    return (
        <span className="relative inline-flex h-[1.1em] overflow-hidden align-bottom italic">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={roles[index]}
                    className="block leading-[1.1]"
                    initial={{y: "100%"}}
                    animate={{y: 0}}
                    exit={{y: "-100%"}}
                    transition={{duration: 0.6, ease: [0.7, 0, 0.2, 1]}}
                >
                    {roles[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

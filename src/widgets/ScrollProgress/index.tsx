import {motion, useScroll, useSpring} from "motion/react";

/** Thin bar pinned to the top of the page that fills as the visitor scrolls. */
export const ScrollProgress = () => {
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {stiffness: 140, damping: 30, restDelta: 0.001});

    return <motion.div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left bg-white" style={{scaleX}}/>;
};

import {motion, useReducedMotion, useTransform, type MotionValue} from "motion/react";
import {LOADER} from "@/constants/other";
import type {HeroTile} from "@/constants/portfolio";

type HeroTileCardProps = {tile: HeroTile; index: number; progress: MotionValue<number>};

/** One floating code fragment of the hero collage: pops in after the preloader, then flies outwards as the page scrolls. */
export const HeroTileCard = ({tile, index, progress}: HeroTileCardProps) => {
    const reduced = useReducedMotion();
    const x = useTransform(progress, [0, 0.4], [0, tile.dx]);
    const y = useTransform(progress, [0, 0.4], [0, tile.dy]);
    const rotate = useTransform(progress, [0, 0.4], [0, tile.rotate]);
    const scale = useTransform(progress, [0, 0.4], [1, 1.3]);
    const opacity = useTransform(progress, [0.05, 0.4], [1, 0]);
    const delay = (reduced ? 0 : LOADER.EXIT_DELAY / 1000 + 0.2) + index * 0.08;

    return (
        <div className="absolute z-[3]" style={{left: tile.left, top: tile.top, width: tile.width, height: tile.height}}>
            <motion.div className="size-full" style={{x, y, rotate, scale, opacity}}>
                <motion.div
                    className="group flex size-full flex-col gap-1.5"
                    initial={{opacity: 0, scale: 0.6, y: 60}}
                    animate={{opacity: 1, scale: 1, y: 0}}
                    transition={{duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1]}}
                >
                    <div className={`tone-${tile.tone} relative flex-1 overflow-hidden border border-foreground/20 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-rotate-2 group-hover:scale-105`}>
                        <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-background/55 font-mono text-[clamp(1.5rem,3.6vw,3.25rem)] font-medium tracking-tight text-foreground">
                            {tile.glyph}
                        </span>
                    </div>
                    <span className="mono-label hidden text-muted-foreground sm:block">{tile.caption}</span>
                </motion.div>
            </motion.div>
        </div>
    );
};

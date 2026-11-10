import {useRef} from "react";
import {motion, useReducedMotion, useScroll, useTransform} from "motion/react";
import {useTranslation} from "react-i18next";
import {HeroTileCard} from "@/pages/client/HomePage/widgets/Hero/HeroTileCard";
import {RoleRotator} from "@/pages/client/HomePage/widgets/Hero/RoleRotator";
import {HERO_TILES} from "@/constants/portfolio";
import {LOADER} from "@/constants/other";
import {SECTION_IDS} from "@/constants/routes";

/**
 * Opening scene. Code fragments float around a giant "Hello, World"; scrolling scatters them,
 * zooms *through* the word and reveals the dark introduction behind it.
 */
export const Hero = () => {
    const {t} = useTranslation("home");
    const reduced = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({target: ref, offset: ["start start", "end end"]});

    const greetingScale = useTransform(scrollYProgress, [0, 0.5], [1, 16]);
    const greetingOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
    const metaOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
    const introOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
    const introScale = useTransform(scrollYProgress, [0.3, 0.7], [0.8, 1]);
    const introRadius = useTransform(scrollYProgress, [0.3, 0.7], [60, 0]);
    const roles = t("hero.roles", {returnObjects: true}) as string[];
    const greetingDelay = reduced ? 0 : LOADER.EXIT_DELAY / 1000 + 0.1;

    return (
        <section id={SECTION_IDS.TOP} ref={ref} className="relative h-[300svh]">
            <div className="sticky top-0 h-svh overflow-hidden">
                <motion.div className="absolute inset-0 z-[2] flex items-center bg-ink text-ink-foreground" style={{opacity: introOpacity, scale: introScale, borderRadius: introRadius}}>
                    <div className="wrap flex flex-col gap-7">
                        <span className="mono-label text-ink-muted">{t("hero.tag")}</span>
                        <h1 className="display text-[clamp(3.25rem,8vw,7.75rem)]">
                            {t("hero.intro")}<br/>
                            <span className="text-ink-muted">{t("hero.specialty")}</span> <RoleRotator roles={roles}/>
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-ink-muted">{t("hero.description")}</p>
                    </div>
                </motion.div>

                {HERO_TILES.map((tile, index) => <HeroTileCard key={tile.id} tile={tile} index={index} progress={scrollYProgress}/>)}

                <div className="absolute top-1/2 left-1/2 z-[4] -translate-x-1/2 -translate-y-1/2 text-center">
                    <motion.div style={{scale: greetingScale, opacity: greetingOpacity}}>
                        <motion.h1
                            className="display text-[clamp(4rem,15vw,15rem)] leading-[0.85] whitespace-nowrap italic"
                            initial={{opacity: 0, scale: 0.9, y: 40}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            transition={{duration: 1.2, delay: greetingDelay, ease: [0.2, 0.8, 0.2, 1]}}
                        >
                            {t("hero.greeting")}<span className="not-italic">.</span>
                        </motion.h1>
                        <motion.p
                            className="mt-5 font-mono text-xs text-muted-foreground sm:text-sm"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1, delay: greetingDelay + 0.6}}
                        >
                            {t("hero.subline")}
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div className="absolute inset-x-8 bottom-8 z-[5] flex items-end justify-between gap-6" style={{opacity: metaOpacity}}>
                    <div className="flex flex-col gap-1">
                        <span className="font-serif text-lg italic">{t("hero.position")}</span>
                        <span className="mono-label text-muted-foreground">{t("hero.location")}</span>
                    </div>
                    <div aria-hidden="true" className="hidden items-center gap-3 text-[13px] font-medium sm:flex">
                        {t("hero.scroll")} <i className="h-10 w-px animate-line bg-foreground"/>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

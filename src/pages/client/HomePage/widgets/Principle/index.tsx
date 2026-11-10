import {useMemo, useRef} from "react";
import {motion, useScroll, useTransform} from "motion/react";
import {useTranslation} from "react-i18next";
import {ManifestoWord} from "@/pages/client/HomePage/widgets/Manifesto/ManifestoWord";
import {buildManifestoWords} from "@/helpers/manifesto";

/** How I work: a pinned statement on a dark page whose words light up with scroll, then the workflow line appears. */
export const Principle = () => {
    const {t, i18n} = useTranslation("home");
    const ref = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({target: ref, offset: ["start start", "end end"]});
    const text = t("principle.text");
    const words = useMemo(() => buildManifestoWords(text, 0.12), [text]);
    const metaOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
    const metaY = useTransform(scrollYProgress, [0.7, 0.9], [24, 0]);

    return (
        <section ref={ref} className="relative h-[220svh] bg-ink text-ink-foreground">
            <div className="sticky top-0 flex h-svh items-center">
                <div className="wrap">
                    <p className="mono-label mb-10 text-ink-muted">{t("principle.label")}</p>
                    <p key={i18n.resolvedLanguage} className="display max-w-5xl text-[clamp(2.2rem,5.6vw,5.75rem)] leading-[1.04]">
                        {words.map((word, index) => <ManifestoWord key={`${word.text}-${index}`} word={word} progress={scrollYProgress}/>)}
                    </p>
                    <motion.div className="mt-12 flex flex-wrap items-baseline justify-between gap-6 border-t border-ink-border pt-6" style={{opacity: metaOpacity, y: metaY}}>
                        <code className="font-mono text-sm text-ink-foreground">{t("principle.flow")}</code>
                        <p className="max-w-md font-mono text-xs leading-relaxed text-ink-muted">{t("principle.coda")}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

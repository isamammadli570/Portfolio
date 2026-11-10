import {useMemo, useRef} from "react";
import {useScroll} from "motion/react";
import {useTranslation} from "react-i18next";
import {ManifestoWord} from "@/pages/client/HomePage/widgets/Manifesto/ManifestoWord";
import {buildManifestoWords} from "@/helpers/manifesto";
import {SECTION_IDS} from "@/constants/routes";

/** About statement: a pinned paragraph whose words light up one by one while scrolling. */
export const Manifesto = () => {
    const {t, i18n} = useTranslation("home");
    const ref = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({target: ref, offset: ["start start", "end end"]});
    const text = t("manifesto.text");
    const words = useMemo(() => buildManifestoWords(text), [text]);

    return (
        <section id={SECTION_IDS.ABOUT} ref={ref} className="relative h-[280svh]">
            <div className="sticky top-0 flex h-svh items-center">
                <div className="wrap">
                    <p className="mono-label mb-8 text-muted-foreground">{t("manifesto.label")}</p>
                    <p key={i18n.resolvedLanguage} className="display text-[clamp(1.9rem,4.4vw,4.25rem)] leading-[1.08]">
                        {words.map((word, index) => <ManifestoWord key={`${word.text}-${index}`} word={word} progress={scrollYProgress}/>)}
                    </p>
                </div>
            </div>
        </section>
    );
};

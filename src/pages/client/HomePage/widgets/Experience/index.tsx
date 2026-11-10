import {motion} from "motion/react";
import {useTranslation} from "react-i18next";
import {Reveal} from "@/widgets/Reveal";
import {SectionHead} from "@/widgets/SectionHead";
import {EXPERIENCE_IDS} from "@/constants/portfolio";
import {SECTION_IDS} from "@/constants/routes";

/** Work and education timeline as ruled rows; each rule draws itself as the row enters. */
export const Experience = () => {
    const {t} = useTranslation("home");

    return (
        <section id={SECTION_IDS.EXPERIENCE} className="pt-40 pb-10">
            <div className="wrap">
                <SectionHead label={t("experience.label")} title={t("experience.title")}/>
                {EXPERIENCE_IDS.map((id) => (
                    <div key={id}>
                        <motion.div
                            className="h-px origin-left bg-foreground"
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 1.1, ease: [0.7, 0, 0.2, 1]}}
                        />
                        <Reveal distance={40}>
                            <div className="grid items-baseline gap-6 py-9 transition-[padding] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:pl-4 md:grid-cols-12">
                                <span className="mono-label text-muted-foreground md:col-span-2">{t(`experience.items.${id}.date`)}</span>
                                <div className="flex flex-col gap-1.5 md:col-span-5">
                                    <h3 className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight italic">{t(`experience.items.${id}.role`)}</h3>
                                    <span className="text-[17px] text-muted-foreground">{t(`experience.items.${id}.company`)}</span>
                                </div>
                                <p className="text-[17px] leading-relaxed text-muted-foreground md:col-span-5">{t(`experience.items.${id}.description`)}</p>
                            </div>
                        </Reveal>
                    </div>
                ))}
                <div className="h-px bg-foreground"/>
            </div>
        </section>
    );
};

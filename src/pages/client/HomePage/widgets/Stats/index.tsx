import {useRef} from "react";
import {useScroll} from "motion/react";
import {useTranslation} from "react-i18next";
import {Ring3D} from "@/pages/client/HomePage/widgets/Stats/Ring3D";
import {StatNumber} from "@/pages/client/HomePage/widgets/Stats/StatNumber";
import {STATS} from "@/constants/portfolio";

/** Key numbers on the left, a scroll-driven 3D ring on the right. */
export const Stats = () => {
    const {t} = useTranslation("home");
    const ref = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({target: ref, offset: ["start start", "end end"]});

    return (
        <section ref={ref} aria-label={t("stats.label")} className="relative h-[220svh] bg-surface-muted">
            <div className="sticky top-0 flex h-svh items-center">
                <div className="wrap grid items-center gap-10 lg:grid-cols-2">
                    <div className="flex flex-col gap-10">
                        <p className="mono-label text-muted-foreground">{t("stats.label")}</p>
                        <p className="max-w-lg text-[22px] leading-normal tracking-[-0.02em]">{t("stats.lead")}</p>
                        <div className="grid grid-cols-3 gap-6 border-t border-border pt-7">
                            {STATS.map((stat) => (
                                <StatNumber key={stat.id} value={stat.value} prefix={stat.prefix} suffix={stat.suffix} label={t(`stats.items.${stat.id}`)} progress={scrollYProgress}/>
                            ))}
                        </div>
                    </div>
                    <Ring3D progress={scrollYProgress}/>
                </div>
            </div>
        </section>
    );
};

import {useTranslation} from "react-i18next";
import {buttonVariants} from "@/components/ui/button";
import {Reveal} from "@/widgets/Reveal";
import {SECTION_IDS} from "@/constants/routes";

const FACT_IDS = ["location", "languages", "education", "status"] as const;

/** Résumé block: a big heading with download / view actions and a short facts table. */
export const Cv = () => {
    const {t} = useTranslation("home");

    return (
        <section id={SECTION_IDS.CV} className="pt-10 pb-40">
            <div className="wrap">
                <div className="h-px bg-foreground"/>
                <Reveal className="grid gap-12 pt-14 md:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <p className="mono-label text-muted-foreground">{t("cv.label")}</p>
                        <h2 className="display text-[clamp(3.5rem,8vw,7.75rem)]">
                            {t("cv.title")} <em className="underline decoration-brand decoration-[0.04em] underline-offset-[0.12em]">{t("cv.titleAccent")}</em>{t("cv.titleEnd")}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            <a href="/cv.pdf" download="Isa_Mammadli_CV.pdf" className={buttonVariants()}>
                                <span>{t("cv.download")}</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v12M7 11l5 5 5-5M5 20h14"/></svg>
                            </a>
                            <a href="/cv.pdf" target="_blank" rel="noreferrer" className={buttonVariants({variant: "outline"})}><span>{t("cv.view")}</span></a>
                        </div>
                    </div>
                    <dl className="flex flex-col">
                        {FACT_IDS.map((id) => (
                            <div key={id} className="flex justify-between gap-4 border-t border-border py-4.5 text-lg">
                                <dt className="text-muted-foreground">{t(`cv.facts.${id}.label`)}</dt>
                                <dd className="text-right font-medium">{t(`cv.facts.${id}.value`)}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </section>
    );
};

import {useTranslation} from "react-i18next";
import {Reveal} from "@/widgets/Reveal";
import {SectionHead} from "@/widgets/SectionHead";
import {SERVICE_IDS, SERVICE_TAGS} from "@/constants/portfolio";
import {SECTION_IDS} from "@/constants/routes";
import {padIndex} from "@/helpers/format";

/** Service list: each row opens its description on hover/focus (always open on touch devices). */
export const Services = () => {
    const {t} = useTranslation("home");

    return (
        <section id={SECTION_IDS.SERVICES} className="py-36">
            <div className="wrap">
                <SectionHead label={t("services.label")} title={t("services.title")}/>
                {SERVICE_IDS.map((id, index) => (
                    <Reveal key={id}>
                        <div tabIndex={0} className="group border-t border-border py-7 transition-[padding] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:pl-5 focus-visible:pl-5">
                            <div className="flex items-center gap-7">
                                <span className="mono-label w-10 text-muted-foreground">{padIndex(index + 1)}</span>
                                <h3 className="display flex-1 text-[clamp(2rem,4.4vw,4rem)]">{t(`services.items.${id}.title`)}</h3>                                <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full border border-foreground transition-all duration-500 group-hover:rotate-90 group-hover:bg-foreground group-hover:text-background group-focus-visible:rotate-90 group-focus-visible:bg-foreground group-focus-visible:text-background">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                                </span>
                            </div>
                            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                                <div className="overflow-hidden">
                                    <div className="flex flex-wrap gap-x-16 gap-y-6 pt-6 pb-1 md:pl-17">
                                        <p className="min-w-72 flex-1 text-lg leading-relaxed text-muted-foreground">{t(`services.items.${id}.description`)}</p>
                                        <div className="flex min-w-60 flex-1 flex-wrap content-start gap-2">
                                            {SERVICE_TAGS[id].map((tag) => <span key={tag} className="inline-flex h-8 items-center rounded-full border border-border px-3.5 text-[13px]">{tag}</span>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
                <div className="border-t border-border"/>
            </div>
        </section>
    );
};

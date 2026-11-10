import {useTranslation} from "react-i18next";
import {ContactForm} from "@/pages/client/HomePage/widgets/Contact/ContactForm";
import {Reveal} from "@/widgets/Reveal";
import {ENV} from "@/lib/env";
import {SOCIALS} from "@/constants/portfolio";
import {SECTION_IDS} from "@/constants/routes";

/** Closing section: oversized call to action, social links, the form and the footer line. */
export const Contact = () => {
    const {t} = useTranslation("home");

    return (
        <section id={SECTION_IDS.CONTACT} className="bg-ink pt-40 pb-12 text-ink-foreground">
            <div className="wrap flex flex-col gap-20">
                <Reveal className="flex flex-col gap-8">
                    <p className="mono-label text-ink-muted">{t("contact.label")}</p>
                    <h2 className="display text-[clamp(4rem,13vw,13.75rem)]"><em>{t("contact.title")}</em><span className="text-brand-glow">.</span></h2>
                    <a href={`mailto:${ENV.contactEmail}`} className="group relative self-start text-[clamp(1.6rem,3.4vw,3rem)] font-medium tracking-[-0.03em]">
                        {ENV.contactEmail}
                        <span className="absolute inset-x-0 -bottom-1 h-1 origin-left scale-x-[0.15] bg-brand-glow transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-x-100"/>
                    </a>
                </Reveal>

                <div className="flex flex-wrap gap-16">
                    <ul className="m-0 flex min-w-72 flex-[1_1_22rem] list-none flex-col p-0">
                        {SOCIALS.map((social) => (
                            <li key={social.id}>
                                <a href={social.href} target={social.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="group flex items-center justify-between border-t border-ink-border py-5.5 text-[22px] font-medium transition-[padding] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:pl-4">
                                    {social.label}
                                    <svg className="transition-transform duration-500 group-hover:rotate-45" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ContactForm/>
                </div>

                <div className="flex flex-wrap justify-between gap-4 border-t border-ink-border pt-8 text-sm text-ink-muted">
                    <span>{t("contact.footer.rights")}</span>
                    <a href={`#${SECTION_IDS.TOP}`} className="text-ink-foreground">{t("contact.footer.top")} ↑</a>
                </div>
            </div>
        </section>
    );
};

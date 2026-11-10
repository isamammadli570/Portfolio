import {useTranslation} from "react-i18next";
import {useLocation} from "react-router";
import {ScrollProgress} from "@/widgets/ScrollProgress";
import {NAV_ITEMS} from "@/constants/portfolio";
import {buildRoute, ROUTES, SECTION_IDS} from "@/constants/routes";
import {LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type Language} from "@/i18n/resources";

/** Language switcher button: cycles AZ → EN → RU and shows the current code. */
const LanguageSwitch = () => {
    const {t, i18n} = useTranslation();
    const current = (i18n.resolvedLanguage ?? "az") as Language;
    const next = SUPPORTED_LANGUAGES[(SUPPORTED_LANGUAGES.indexOf(current) + 1) % SUPPORTED_LANGUAGES.length];

    return (
        <button
            type="button"
            onClick={() => void i18n.changeLanguage(next)}
            aria-label={`${t("language.label")}: ${LANGUAGE_LABELS[next]}`}
            className="cursor-pointer rounded-full px-3 py-2 text-[13px] font-medium uppercase transition-opacity hover:opacity-60"
        >
            {current}
        </button>
    );
};

/** Fixed top bar. `mix-blend-difference` keeps it readable over both light and dark sections. */
export const Nav = () => {
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const isHome = pathname === ROUTES.HOME;
    const hrefFor = (id: string) => (isHome ? `#${id}` : buildRoute.section(id as never));

    return (
        <header className="fixed inset-x-0 top-0 z-80 text-white mix-blend-difference">
            <ScrollProgress/>
            <div className="flex items-center justify-between gap-4 px-5 py-2.5 sm:px-6">
                <a href={hrefFor(SECTION_IDS.TOP)} className="text-base font-bold tracking-[-0.03em]">{t("brand")}©</a>
                <nav aria-label={t("nav.label")} className="hidden gap-1 md:flex">
                    {NAV_ITEMS.map((item) => (
                        <a key={item.id} href={hrefFor(item.id)} className="group relative px-2.5 py-3.5 text-[13px] font-medium">
                            {t(item.labelKey)}
                            <span className="absolute inset-x-2.5 bottom-2.5 h-px origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:origin-left group-hover:scale-x-100"/>
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <LanguageSwitch/>
                    <a href={hrefFor(SECTION_IDS.CONTACT)} className="inline-flex items-center gap-2 rounded-full border border-white px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-white hover:text-black">
                        {t("nav.contact")} <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

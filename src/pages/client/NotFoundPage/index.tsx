import {Link} from "react-router";
import {useTranslation} from "react-i18next";
import {buttonVariants} from "@/components/ui/button";
import {ROUTES} from "@/constants/routes";

/** 404 screen. */
export const NotFoundPage = () => {
    const {t} = useTranslation();

    return (
        <main className="grid min-h-svh place-items-center px-8 text-center">
            <div className="flex flex-col items-center gap-8">
                <p className="mono-label text-muted-foreground">404</p>
                <h1 className="display text-[clamp(4rem,14vw,12rem)]">{t("notFound.title")}</h1>
                <p className="max-w-md text-lg text-muted-foreground">{t("notFound.description")}</p>
                <Link to={ROUTES.HOME} className={buttonVariants()}><span>{t("notFound.back")}</span></Link>
            </div>
        </main>
    );
};

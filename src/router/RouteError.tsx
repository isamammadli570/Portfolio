import {Link} from "react-router";
import {useTranslation} from "react-i18next";
import {ROUTES} from "@/constants/routes";

/** Router-level error screen shown when a route chunk or loader fails. */
export const RouteError = () => {
    const {t} = useTranslation();

    return (
        <div className="grid min-h-svh place-items-center p-8 text-center">
            <div className="flex flex-col items-center gap-6">
                <h1 className="display text-5xl">{t("errors.action")}</h1>
                <Link to={ROUTES.HOME} className="rounded-full bg-foreground px-6 py-3 font-semibold text-background">{t("notFound.back")}</Link>
            </div>
        </div>
    );
};

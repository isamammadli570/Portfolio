import {useEffect} from "react";
import {Outlet} from "react-router";
import {MotionConfig} from "motion/react";
import {useTranslation} from "react-i18next";
import {Nav} from "@/layout/MainLayout/Nav";
import {Loader} from "@/widgets/Loader";
import {GrainOverlay} from "@/widgets/GrainOverlay";
import {useSmoothScroll} from "@/hooks/useSmoothScroll";

/** App shell: preloader, grain, fixed navigation, smooth scroll and the routed page. */
export const MainLayout = () => {
    const {i18n} = useTranslation();
    useSmoothScroll();

    useEffect(() => {
        document.documentElement.lang = (i18n.resolvedLanguage ?? "az").split("-")[0];
    }, [i18n.resolvedLanguage]);

    return (
        <MotionConfig reducedMotion="user">
            <Loader/>
            <GrainOverlay/>
            <Nav/>
            <Outlet/>
        </MotionConfig>
    );
};

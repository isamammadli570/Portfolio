import {useRef} from "react";
import {useScroll} from "motion/react";
import {useTranslation} from "react-i18next";
import {WorkIndexItem} from "@/pages/client/HomePage/widgets/Works/WorkIndexItem";
import {WorkLayer} from "@/pages/client/HomePage/widgets/Works/WorkLayer";
import {PROJECTS} from "@/constants/portfolio";
import {SECTION_IDS} from "@/constants/routes";

/** Pinned project showcase: a numbered index on the left while full-screen slides wipe over each other. */
export const Works = () => {
    const {t} = useTranslation("home");
    const ref = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({target: ref, offset: ["start start", "end end"]});

    return (
        <section id={SECTION_IDS.WORK} ref={ref} className="relative bg-ink" style={{height: `${PROJECTS.length * 90}svh`}}>
            <div className="sticky top-0 h-svh overflow-hidden">
                {PROJECTS.map((project, index) => <WorkLayer key={project.id} project={project} index={index} count={PROJECTS.length} progress={scrollYProgress}/>)}

                <div className="absolute top-24 left-6 z-30 text-white sm:left-8">
                    <p className="mono-label text-white/75">{t("work.label")}</p>
                    <h2 className="display mt-3.5 text-[clamp(3rem,6vw,5.75rem)]">{t("work.title")}</h2>
                </div>
                <ol className="absolute bottom-16 left-6 z-30 m-0 hidden list-none flex-col gap-2.5 p-0 sm:left-8 md:flex">
                    {PROJECTS.map((project, index) => <WorkIndexItem key={project.id} project={project} index={index} count={PROJECTS.length} progress={scrollYProgress}/>)}
                </ol>
            </div>
        </section>
    );
};

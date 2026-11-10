import {Hero} from "@/pages/client/HomePage/widgets/Hero";
import {Manifesto} from "@/pages/client/HomePage/widgets/Manifesto";
import {Stats} from "@/pages/client/HomePage/widgets/Stats";
import {Principle} from "@/pages/client/HomePage/widgets/Principle";
import {Services} from "@/pages/client/HomePage/widgets/Services";
import {Works} from "@/pages/client/HomePage/widgets/Works";
import {Corridor} from "@/pages/client/HomePage/widgets/Corridor";
import {Experience} from "@/pages/client/HomePage/widgets/Experience";
import {MarqueeBand} from "@/pages/client/HomePage/widgets/MarqueeBand";
import {Cv} from "@/pages/client/HomePage/widgets/Cv";
import {Contact} from "@/pages/client/HomePage/widgets/Contact";

/** Single-page portfolio: every scene is a self-contained widget stacked in reading order. */
export const HomePage = () => (
    <main>
        <Hero/>
        <Manifesto/>
        <Stats/>
        <Principle/>
        <Services/>
        <Works/>
        <Corridor/>
        <Experience/>
        <MarqueeBand/>
        <Cv/>
        <Contact/>
    </main>
);

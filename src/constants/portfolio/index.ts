import {SECTION_IDS, type SectionId} from "@/constants/routes";

/** Visual flavour of a project cover; the actual image goes here once real screenshots exist. */
export type CoverTone = "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8";

export type Project = {
    /** Key into the `projects` i18n namespace (`items.<id>.name`, `.category`, `.description`). */
    id: string;
    year: string;
    /** Screenshot in `public/projects/`. */
    image: string;
    tags: readonly string[];
    live: string;
    /** Public source code; omitted for company projects. */
    repo?: string;
};

export const PROJECTS: readonly Project[] = [
    {id: "nextcook", year: "2026", image: "/projects/nextcook.webp", tags: ["React", "TypeScript", "TanStack Query", "i18n"], live: "https://cook-dev.nextcross.az"},
    {id: "folio", year: "2026", image: "/projects/folio.webp", tags: ["React", "TypeScript", "Tailwind CSS", "TanStack Query"], live: "https://folio-mu-peach.vercel.app", repo: "https://github.com/isamammadli570/Folio"},
    {id: "lumen", year: "2026", image: "/projects/lumen.webp", tags: ["React", "TypeScript", "PWA", "Open-Meteo"], live: "https://az-hava.vercel.app", repo: "https://github.com/isamammadli570/Lumen"},
    {id: "reelbook", year: "2026", image: "/projects/reelbook.webp", tags: ["React Native", "Expo", "Supabase", "TMDB"], live: "https://reelbook-xi.vercel.app", repo: "https://github.com/isamammadli570/Reelbook"},
] as const;

export type SkillGroup = {id: string; items: readonly string[]};

export const SKILL_GROUPS: readonly SkillGroup[] = [
    {id: "frontend", items: ["React", "TypeScript", "JavaScript (ES6+)", "React Router"]},
    {id: "mobile", items: ["React Native", "Expo"]},
    {id: "styling", items: ["Tailwind CSS", "SCSS", "CSS"]},
    {id: "data", items: ["TanStack Query", "axios", "i18next"]},
    {id: "backend", items: ["Node.js", "Express.js", "MongoDB", "Supabase"]},
    {id: "tools", items: ["Git", "GitHub", "Vite", "C++", "AI-assisted development"]},
] as const;

export const SERVICE_IDS = ["frontend", "mobile", "motion", "ai"] as const;
export const SERVICE_TAGS: Record<(typeof SERVICE_IDS)[number], readonly string[]> = {
    frontend: ["React", "TypeScript", "Tailwind CSS", "TanStack Query"],
    mobile: ["React Native", "Expo", "Supabase"],
    motion: ["CSS animations", "Scroll-driven", "PWA"],
    ai: ["AI-assisted development", "Architecture", "Code review"],
};

export const EXPERIENCE_IDS = ["nextclass", "codelandia", "opportuland", "edu"] as const;

export type Stat = {id: string; value: number; prefix?: string; suffix?: string};
export const STATS: readonly Stat[] = [
    {id: "years", value: 2, suffix: "+"},
    {id: "registrations", value: 111, prefix: "+", suffix: "%"},
    {id: "projects", value: PROJECTS.length},
] as const;

/** Technologies on the 3D ring in the stats section; brand names, so they are not translated. */
export const RING_TECH = ["React", "TypeScript", "React Native", "Tailwind CSS", "TanStack Query", "Node.js", "MongoDB", "Expo", "Supabase", "Git", "Vite", "SCSS"] as const;

export type NavItem = {id: SectionId; labelKey: string};
export const NAV_ITEMS: readonly NavItem[] = [
    {id: SECTION_IDS.ABOUT, labelKey: "nav.about"},
    {id: SECTION_IDS.SERVICES, labelKey: "nav.services"},
    {id: SECTION_IDS.WORK, labelKey: "nav.work"},
    {id: SECTION_IDS.SKILLS, labelKey: "nav.skills"},
    {id: SECTION_IDS.CV, labelKey: "nav.cv"},
] as const;

export type SocialLink = {id: string; label: string; href: string};
export const CONTACT_EMAIL = "isamammadlee@gmail.com";

export const SOCIALS: readonly SocialLink[] = [
    {id: "github", label: "GitHub", href: "https://github.com/isamammadli570"},
    {id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/isa-mammadli-4411aa285/"},
    {id: "email", label: "Gmail", href: `mailto:${CONTACT_EMAIL}`},
] as const;

/**
 * Floating fragments of the hero collage: a code token on a monochrome card with a file name as caption.
 * Percentages keep the layout fluid; dx/dy/rotate drive the scatter on scroll.
 */
export type HeroTile = {id: string; left: string; top: string; width: string; height: string; dx: number; dy: number; rotate: number; tone: CoverTone; glyph: string; caption: string};
export const HERO_TILES: readonly HeroTile[] = [
    {id: "t1", left: "3%", top: "9%", width: "15%", height: "30%", dx: -520, dy: -420, rotate: -16, tone: "g2", glyph: "</>", caption: "App.tsx"},
    {id: "t2", left: "21%", top: "5%", width: "17%", height: "25%", dx: -260, dy: -520, rotate: 9, tone: "g3", glyph: "{ }", caption: "package.json"},
    {id: "t3", left: "62%", top: "6%", width: "15%", height: "23%", dx: 260, dy: -520, rotate: -7, tone: "g1", glyph: "=>", caption: "useQuery.ts"},
    {id: "t4", left: "80%", top: "10%", width: "17%", height: "31%", dx: 540, dy: -400, rotate: 14, tone: "g6", glyph: "&&", caption: "router.tsx"},
    {id: "t5", left: "2%", top: "45%", width: "12%", height: "24%", dx: -600, dy: 40, rotate: 10, tone: "g4", glyph: "$_", caption: "npm run dev"},
    {id: "t6", left: "86%", top: "47%", width: "12%", height: "23%", dx: 600, dy: 60, rotate: -12, tone: "g5", glyph: "===", caption: "helpers.test.ts"},
    {id: "t7", left: "5%", top: "74%", width: "17%", height: "20%", dx: -480, dy: 420, rotate: -8, tone: "g7", glyph: "[ ]", caption: "api.ts"},
    {id: "t8", left: "27%", top: "72%", width: "13%", height: "22%", dx: -200, dy: 520, rotate: 6, tone: "g6", glyph: "#", caption: "index.css"},
    {id: "t9", left: "59%", top: "73%", width: "14%", height: "21%", dx: 220, dy: 520, rotate: -5, tone: "g8", glyph: "( )", caption: "hooks.ts"},
    {id: "t10", left: "77%", top: "76%", width: "18%", height: "19%", dx: 520, dy: 440, rotate: 11, tone: "g2", glyph: "git", caption: "main ← feature"},
] as const;

/** Every app path lives here; components never hard-code one. */
export const ROUTES = {
    HOME: "/",
    NOT_FOUND: "*",
} as const;

/** In-page anchors of the home page, used by the navigation and "scroll to" links. */
export const SECTION_IDS = {
    TOP: "top",
    ABOUT: "about",
    SERVICES: "services",
    WORK: "work",
    SKILLS: "skills",
    EXPERIENCE: "experience",
    CV: "cv",
    CONTACT: "contact",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const buildRoute = {
    section: (id: SectionId) => `${ROUTES.HOME}#${id}`,
};

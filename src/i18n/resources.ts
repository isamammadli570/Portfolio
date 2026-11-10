import azCommon from "./locales/AZ/common.json";
import azHome from "./locales/AZ/home.json";
import azProjects from "./locales/AZ/projects.json";
import enCommon from "./locales/EN/common.json";
import enHome from "./locales/EN/home.json";
import enProjects from "./locales/EN/projects.json";
import ruCommon from "./locales/RU/common.json";
import ruHome from "./locales/RU/home.json";
import ruProjects from "./locales/RU/projects.json";

export const SUPPORTED_LANGUAGES = ["az", "en", "ru"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const NAMESPACES = ["common", "home", "projects"] as const;

export const LANGUAGE_LABELS: Record<Language, string> = {az: "Azərbaycan", en: "English", ru: "Русский"};

export const RESOURCES = {
    az: {common: azCommon, home: azHome, projects: azProjects},
    en: {common: enCommon, home: enHome, projects: enProjects},
    ru: {common: ruCommon, home: ruHome, projects: ruProjects},
};

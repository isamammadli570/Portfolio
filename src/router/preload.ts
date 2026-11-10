import type {ComponentType} from "react";
import type {RouteObject} from "react-router";

type PageModule = Record<string, unknown>;
type PageLoader = () => Promise<PageModule>;

const preloaders = new Map<string, PageLoader>();

/** Code-split route: the page chunk loads on demand and its loader is remembered so links can warm it up on hover. */
export const pageRoute = (path: string, load: PageLoader, exportName: string): RouteObject => {
    preloaders.set(path, load);
    return {
        path,
        lazy: async () => ({Component: (await load())[exportName] as ComponentType}),
    };
};

export const preloadRoute = (to: string): void => {
    void preloaders.get(to)?.();
};

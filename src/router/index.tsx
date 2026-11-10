import {createBrowserRouter} from "react-router";
import {MainLayout} from "@/layout/MainLayout";
import {ROUTES} from "@/constants/routes";
import {pageRoute} from "@/router/preload";
import {RouteError} from "@/router/RouteError";

export const router = createBrowserRouter([
    {
        element: <MainLayout/>,
        errorElement: <RouteError/>,
        children: [
            pageRoute(ROUTES.HOME, () => import("@/pages/client/HomePage"), "HomePage"),
            pageRoute(ROUTES.NOT_FOUND, () => import("@/pages/client/NotFoundPage"), "NotFoundPage"),
        ],
    },
]);

import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router";
import "@/index.css";
import "@/i18n";
import QueryProvider from "@/provider/QueryProvider";
import {ErrorBoundary} from "@/widgets/ErrorBoundary";
import {Toaster} from "@/components/ui/sonner";
import {router} from "@/router";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <ErrorBoundary>
            <QueryProvider>
                <RouterProvider router={router}/>
                <Toaster/>
            </QueryProvider>
        </ErrorBoundary>
    </StrictMode>,
);

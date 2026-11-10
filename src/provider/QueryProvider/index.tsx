import {useEffect, useState, type ReactNode} from "react";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {toast} from "sonner";
import {ApiError} from "@/api/client";
import i18n from "@/i18n";

type CacheMeta = {suppressGlobalError?: boolean; onError?: (error: unknown) => void} | undefined;

const handleError = (error: unknown, meta: CacheMeta, fallbackKey: string): void => {
    if (meta?.suppressGlobalError) return;
    if (error instanceof ApiError && error.isNetworkError) {
        toast.error(error.message);
        return;
    }
    if (typeof meta?.onError === "function") {
        meta.onError(error);
        return;
    }
    toast.error(error instanceof Error ? error.message : i18n.t(fallbackKey as never));
};

const createQueryClient = (): QueryClient =>
    new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => handleError(error, query.meta as CacheMeta, "common:errors.load"),
        }),
        mutationCache: new MutationCache({
            onError: (error, _variables, _context, mutation) => handleError(error, mutation.meta as CacheMeta, "common:errors.action"),
        }),
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 30_000,
                gcTime: 5 * 60_000,
                retry: (count, error) => {
                    const status = (error as {status?: number}).status;
                    if (status === 401 || status === 403 || status === 404) return false;
                    return count < 1;
                },
            },
        },
    });

/** App-wide React Query client with one global error toast per failed request. */
export default function QueryProvider({children}: {children: ReactNode}) {
    const [queryClient] = useState(createQueryClient);

    // Cached responses were fetched in the previous language and do not translate themselves.
    useEffect(() => {
        const refetchAll = () => void queryClient.invalidateQueries();
        i18n.on("languageChanged", refetchAll);
        return () => i18n.off("languageChanged", refetchAll);
    }, [queryClient]);

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

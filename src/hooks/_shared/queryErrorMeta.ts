/** Lets the global cache handler toast a request failure once, with a translated fallback message. */
export const queryErrorMeta = (fallbackMessage: string) => ({
    onError: (error: unknown) => {
        void import("sonner").then(({toast}) => toast.error(error instanceof Error && error.message ? error.message : fallbackMessage));
    },
});

export const loadError = queryErrorMeta;

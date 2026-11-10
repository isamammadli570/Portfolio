import axios, {AxiosError, type AxiosRequestConfig} from "axios";
import i18n from "@/i18n";

/** Normalised error every request failure is converted to, so hooks and toasts handle one shape. */
export class ApiError extends Error {
    readonly status: number;
    readonly isNetworkError: boolean;
    readonly url?: string;

    constructor(message: string, status: number, isNetworkError: boolean, url?: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.isNetworkError = isNetworkError;
        this.url = url;
    }
}

export const normalizeApiError = (error: unknown): ApiError => {
    if (error instanceof ApiError) return error;
    if (error instanceof AxiosError) {
        if (!error.response) return new ApiError(i18n.t("common:errors.network"), 0, true, error.config?.url);
        const payload = error.response.data as {error?: string; message?: string} | undefined;
        return new ApiError(payload?.error ?? payload?.message ?? error.message, error.response.status, false, error.config?.url);
    }
    return new ApiError(error instanceof Error ? error.message : String(error), 0, false);
};

const request = axios.create({timeout: 15_000, headers: {Accept: "application/json"}});

request.interceptors.request.use((config) => {
    config.headers.set("Accept-Language", i18n.resolvedLanguage ?? "az");
    return config;
});

request.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
);

export type RequestConfig = Omit<AxiosRequestConfig, "url" | "method" | "data">;

export const api = {
    get: async <TData>(url: string, config?: RequestConfig) => (await request.get<TData>(url, config)).data,
    post: async <TData, TBody = unknown>(url: string, body?: TBody, config?: RequestConfig) => (await request.post<TData>(url, body, config)).data,
};

export const segment = (value: string): string => encodeURIComponent(value);

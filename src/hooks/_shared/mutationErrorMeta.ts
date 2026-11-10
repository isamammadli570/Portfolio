import {queryErrorMeta} from "@/hooks/_shared/queryErrorMeta";

/** A mutation's own `onError` and the global `MutationCache.onError` would both toast, so the message travels via `meta`. */
export const mutationErrorMeta = queryErrorMeta;

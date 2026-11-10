import {useMutation, useQueryClient, type QueryKey} from "@tanstack/react-query";
import {toast} from "sonner";
import i18n from "@/i18n";
import {mutationErrorMeta} from "@/hooks/_shared/mutationErrorMeta";
import {ERRORS} from "@/constants/errors";
import {NOTIFICATIONS} from "@/constants/notifications";

type EntityMutationConfig<TData, TVariables> = {
    mutationFn: (variables: TVariables) => Promise<TData>;
    /** i18n key of the success toast; pass `null` to stay silent. */
    successMessage?: string | null;
    /** i18n key of the fallback error toast. */
    errorMessage?: string;
    invalidateKeys?: QueryKey[];
    onSuccess?: (data: TData, variables: TVariables) => void;
};

const translate = (key: string): string => i18n.t(key as never) as string;

/** Mutation wrapper: toasts success, invalidates the given query keys and routes failures through the global handler. */
export const useEntityMutation = <TData, TVariables = void>({
    mutationFn,
    successMessage = NOTIFICATIONS.SAVED,
    errorMessage = ERRORS.ACTION,
    invalidateKeys = [],
    onSuccess,
}: EntityMutationConfig<TData, TVariables>) => {
    const queryClient = useQueryClient();

    return useMutation<TData, Error, TVariables>({
        mutationFn,
        onSuccess: (data, variables) => {
            if (successMessage) toast.success(translate(successMessage));
            invalidateKeys.forEach((queryKey) => void queryClient.invalidateQueries({queryKey}));
            onSuccess?.(data, variables);
        },
        meta: mutationErrorMeta(translate(errorMessage)),
    });
};

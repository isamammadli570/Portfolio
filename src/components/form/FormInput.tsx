import {useId, type ComponentProps} from "react";
import {cn} from "@/lib/utils";

type FormInputProps = ComponentProps<"input"> & {
    label: string;
    error?: string;
};

/** Underlined text field with a label and inline error, styled for the dark contact section. */
export const FormInput = ({label, error, className, id, ...props}: FormInputProps) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <label htmlFor={inputId} className="text-sm text-ink-muted">{label}</label>
            <input
                id={inputId}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className="border-b border-ink-border bg-transparent py-3 text-xl text-ink-foreground outline-none transition-colors placeholder:text-ink-border focus:border-brand-glow aria-invalid:border-danger"
                {...props}
            />
            {error && <p id={`${inputId}-error`} className="text-sm text-danger" role="alert">{error}</p>}
        </div>
    );
};

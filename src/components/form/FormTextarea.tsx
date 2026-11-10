import {useId, type ComponentProps} from "react";
import {cn} from "@/lib/utils";

type FormTextareaProps = ComponentProps<"textarea"> & {
    label: string;
    error?: string;
};

/** Underlined multi-line field matching `FormInput`. */
export const FormTextarea = ({label, error, className, id, ...props}: FormTextareaProps) => {
    const autoId = useId();
    const textareaId = id ?? autoId;

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <label htmlFor={textareaId} className="text-sm text-ink-muted">{label}</label>
            <textarea
                id={textareaId}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${textareaId}-error` : undefined}
                className="resize-none border-b border-ink-border bg-transparent py-3 text-xl text-ink-foreground outline-none transition-colors placeholder:text-ink-border focus:border-brand-glow aria-invalid:border-danger"
                {...props}
            />
            {error && <p id={`${textareaId}-error`} className="text-sm text-danger" role="alert">{error}</p>}
        </div>
    );
};

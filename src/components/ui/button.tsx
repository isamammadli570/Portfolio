import {cva, type VariantProps} from "class-variance-authority";
import type {ComponentProps} from "react";
import {cn} from "@/lib/utils";

/** Pill button whose brand-coloured fill slides up on hover; children are lifted above the fill. */
export const buttonVariants = cva(
    "relative inline-flex min-h-14 cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full px-7 text-base font-semibold transition-colors before:absolute before:inset-0 before:translate-y-full before:bg-brand before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.7,0,0.2,1)] hover:before:translate-y-0 *:relative disabled:pointer-events-none disabled:opacity-60",
    {
        variants: {
            variant: {
                solid: "bg-foreground text-background hover:text-brand-ink",
                outline: "border border-foreground bg-transparent text-foreground hover:border-brand hover:text-brand-ink",
                light: "bg-ink-foreground text-ink hover:text-brand-ink",
            },
        },
        defaultVariants: {variant: "solid"},
    },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export const Button = ({className, variant, type = "button", ...props}: ButtonProps) => (
    <button type={type} className={cn(buttonVariants({variant}), className)} {...props}/>
);

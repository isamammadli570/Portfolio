import {Toaster as Sonner, type ToasterProps} from "sonner";

/** App toaster; colours come from the design tokens so toasts match the page. */
export const Toaster = (props: ToasterProps) => (
    <Sonner
        position="bottom-center"
        toastOptions={{
            style: {
                background: "var(--ink)",
                color: "var(--ink-foreground)",
                border: "1px solid var(--ink-border)",
                borderRadius: "999px",
                fontFamily: "var(--font-sans)",
            },
        }}
        {...props}
    />
);

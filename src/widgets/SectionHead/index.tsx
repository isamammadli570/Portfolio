import {Reveal} from "@/widgets/Reveal";
import {cn} from "@/lib/utils";

type SectionHeadProps = {
    label: string;
    title: string;
    className?: string;
};

/** Giant section title with a small mono label on the right; the opening of most home sections. */
export const SectionHead = ({label, title, className}: SectionHeadProps) => (
    <Reveal className={cn("mb-12 flex flex-wrap items-end justify-between gap-4", className)}>
        <h2 className="display text-[clamp(3.5rem,8vw,7.75rem)]">{title}</h2>
        <p className="mono-label text-muted-foreground">{label}</p>
    </Reveal>
);

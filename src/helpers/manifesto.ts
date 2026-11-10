export type ManifestoWord = {text: string; highlighted: boolean; start: number; end: number};

/**
 * Splits a sentence into words for the scroll-reveal paragraph. Words wrapped in `*…*` are highlighted;
 * each word gets a `[start, end]` slice (0..1) of the section's scroll progress in which it lights up.
 */
export const buildManifestoWords = (source: string, tail = 0.1): ManifestoWord[] => {
    const parts = source.split(/\s+/).filter(Boolean);
    const total = parts.length;
    let inside = false;

    return parts.map((raw, index) => {
        let text = raw;
        if (text.startsWith("*")) {
            inside = true;
            text = text.slice(1);
        }
        const closes = text.includes("*");
        if (closes) text = text.replace("*", "");

        const highlighted = inside;
        if (closes) inside = false;

        const start = 0.05 + (index / total) * 0.78;
        return {text, highlighted, start, end: Math.min(1, start + tail)};
    });
};

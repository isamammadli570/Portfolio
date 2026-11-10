export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** Zero-padded index label used by project lists: 1 → "01". */
export const padIndex = (index: number, size = 2): string => String(index).padStart(size, "0");

/** Evenly splits 0..1 into `count` slots and returns the `[start, end]` of slot `index`. */
export const slotRange = (index: number, count: number): [number, number] => [index / count, (index + 1) / count];

import {describe, expect, it} from "vitest";
import {clamp, padIndex, slotRange} from "@/helpers/format";

describe("format helpers", () => {
    it("clamps into the range", () => {
        expect(clamp(5, 0, 3)).toBe(3);
        expect(clamp(-1, 0, 3)).toBe(0);
        expect(clamp(2, 0, 3)).toBe(2);
    });

    it("pads indexes", () => {
        expect(padIndex(1)).toBe("01");
        expect(padIndex(12)).toBe("12");
    });

    it("splits progress into equal slots", () => {
        expect(slotRange(0, 4)).toEqual([0, 0.25]);
        expect(slotRange(3, 4)).toEqual([0.75, 1]);
    });
});

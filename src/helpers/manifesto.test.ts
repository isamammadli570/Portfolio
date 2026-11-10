import {describe, expect, it} from "vitest";
import {buildManifestoWords} from "@/helpers/manifesto";

describe("buildManifestoWords", () => {
    it("splits a sentence into words in order", () => {
        const words = buildManifestoWords("a b c");
        expect(words.map((word) => word.text)).toEqual(["a", "b", "c"]);
    });

    it("highlights only the words inside asterisks and strips the markers", () => {
        const words = buildManifestoWords("I build *fast, clear sites* daily");
        expect(words.map((word) => word.text)).toEqual(["I", "build", "fast,", "clear", "sites", "daily"]);
        expect(words.map((word) => word.highlighted)).toEqual([false, false, true, true, true, false]);
    });

    it("gives every word a growing, in-range progress window", () => {
        const words = buildManifestoWords("one two three four");
        words.forEach((word) => {
            expect(word.start).toBeGreaterThanOrEqual(0);
            expect(word.end).toBeLessThanOrEqual(1);
            expect(word.end).toBeGreaterThan(word.start);
        });
        expect(words[3].start).toBeGreaterThan(words[0].start);
    });
});

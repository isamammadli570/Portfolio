import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {"@": path.resolve(import.meta.dirname, "./src")},
    },
    build: {
        target: "es2023",
        sourcemap: false,
        chunkSizeWarningLimit: 600,
        rolldownOptions: {
            output: {
                // Vendor code rarely changes, so it gets its own long-cached chunks and the app chunk stays small.
                codeSplitting: {
                    groups: [
                        {name: "vendor-motion", test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion|lenis)[\\/]/, priority: 30},
                        {name: "vendor-react", test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/, priority: 20},
                        {name: "vendor-data", test: /node_modules[\\/](@tanstack|axios|react-hook-form|sonner)[\\/]/, priority: 10},
                        {name: "vendor-i18n", test: /node_modules[\\/](i18next|react-i18next|i18next-browser-languagedetector)[\\/]/, priority: 10},
                    ],
                },
            },
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
        css: false,
        coverage: {
            provider: "v8",
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["src/**/*.test.{ts,tsx}", "src/test/**"],
        },
    },
});

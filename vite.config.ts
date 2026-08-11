// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    build: {
      // Optimize chunk sizes and code splitting
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/motion")) return "motion";
            if (id.includes("/src/components/Bento") || id.includes("/src/components/Leadership")) return "components";
            if (
              id.includes("node_modules/@radix-ui/react-accordion") ||
              id.includes("node_modules/@radix-ui/react-dialog") ||
              id.includes("node_modules/@radix-ui/react-dropdown-menu")
            )
              return "radix";
            if (id.includes("node_modules/three")) return "three";
          },
        },
      },
      // Increase chunk size warning threshold
      chunkSizeWarningLimit: 1000,
      // Enable minification
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "motion/react",
        "@radix-ui/react-accordion",
        "@radix-ui/react-dialog",
      ],
    },
  },
});

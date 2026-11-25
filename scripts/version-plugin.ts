import type { Plugin } from "vite";

/**
 * Gives every build an ID and writes it to dist/version.json. The page knows its own ID (__BUILD_ID__), so it can tell
 * when a newer version has been deployed (src/lib/update.ts). Set BUILD_ID to choose the ID (e.g. the git commit).
 */
export function buildVersion(): Plugin {
  const id = process.env.BUILD_ID ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    name: "centies-build-version",
    config: () => ({ define: { __BUILD_ID__: JSON.stringify(id) } }),
    generateBundle() {
      // Only the browser build; the pre-render (server) build has no use for it.
      if (!this.environment.config.build.ssr) this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ id }) });
    },
  };
}

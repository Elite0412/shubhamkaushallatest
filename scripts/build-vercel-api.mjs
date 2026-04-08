/**
 * Builds a standalone Vercel-compatible API bundle from the Express app.
 * The output is placed at api/dist/server.mjs and imported by api/server.js.
 */
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "../artifacts/api-server/node_modules/esbuild/lib/main.js";
import { rm, mkdir } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const outDir = path.resolve(root, "api/dist");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await esbuild({
  entryPoints: [path.resolve(root, "artifacts/api-server/src/app.ts")],
  platform: "node",
  bundle: true,
  format: "esm",
  outfile: path.resolve(outDir, "server.mjs"),
  external: [
    "*.node",
    "pg-native",
  ],
  logLevel: "info",
  banner: {
    js: `import { createRequire as __crReq } from 'node:module';
import __nodePath from 'node:path';
import __nodeUrl from 'node:url';
globalThis.require = __crReq(import.meta.url);
globalThis.__filename = __nodeUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __nodePath.dirname(globalThis.__filename);
`,
  },
});

console.log("Vercel API bundle built successfully.");

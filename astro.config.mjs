// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://humelixa.pages.dev",
  adapter: cloudflare({ imageService: "passthrough" }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
  server: {
    port: 3000,
  },
});

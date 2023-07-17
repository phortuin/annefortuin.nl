import { defineConfig } from 'astro/config';
import dotenv from 'dotenv-safe';
import mdx from "@astrojs/mdx";
dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  trailingSlash: "always",
  inlineStylesheets: "auto",
  compressHTML: true,
  experimental: {
    assets: true
  },
  integrations: [mdx()]
});

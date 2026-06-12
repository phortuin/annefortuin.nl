import process from "node:process";
import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeFigure } from "./src/lib/rehype-figure.ts";
import { createWikilinkResolver, loadPageSlugs } from "./src/lib/wikilink.ts";
import { remarkMark } from "remark-mark-highlight";
import remarkWikiLink from "remark-wiki-link";

const { SITE_URL } = loadEnv(process.env.NODE_ENV || "", process.cwd(), "");

const knownPageSlugs = loadPageSlugs();

export default defineConfig({
	compressHTML: "jsx",
	devToolbar: {
		enabled: false,
	},
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: "rose-pine-moon",
		},
		processor: unified({
			rehypePlugins: [rehypeFigure],
			remarkPlugins: [
				remarkMark,
				[
					remarkWikiLink,
					{
						aliasDivider: "|",
						hrefTemplate: (permalink: string) => `/${permalink}`,
						permalinks: knownPageSlugs,
						pageResolver: createWikilinkResolver(knownPageSlugs),
					},
				],
			],
		}),
	},
	scopedStyleStrategy: "class",
	site: SITE_URL,
});

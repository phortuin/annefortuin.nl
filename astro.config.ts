import process from "node:process";
import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeFigure } from "./src/lib/rehype-figure.ts";
import { resolveWikilink } from "./src/lib/wikilink.ts";
import { remarkMark } from "remark-mark-highlight";
import remarkWikiLink from "remark-wiki-link";

const { SITE_URL } = loadEnv(
	process.env.NODE_ENV || "",
	process.cwd(),
	"",
);

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: "rose-pine-moon",
		},
		rehypePlugins: [rehypeFigure],
		remarkPlugins: [
			remarkMark,
			[
				remarkWikiLink,
				{
					aliasDivider: "|",
					hrefTemplate: (permalink: string) => `/${permalink}`,
					pageResolver: resolveWikilink,
				},
			],
		],
	},
	scopedStyleStrategy: "class",
	site: SITE_URL,
});

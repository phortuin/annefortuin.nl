import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeFigure } from "./lib/rehype-figure";
import { remarkMark } from "remark-mark-highlight";
import remarkWikiLink from "remark-wiki-link";
import slugify from "slugify";

const { SITE_URL } = loadEnv(process.env.SITE_URL, process.cwd(), "");

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
					pageResolver: (name: string) => {
						if (/\d{4}-\d{2}-\d{2}.*/.test(name)) {
							return [`notes/#${name}`];
						}
						return [slugify(name, { lower: true })];
					},
				},
			],
		],
	},
	scopedStyleStrategy: "class",
	site: SITE_URL,
});

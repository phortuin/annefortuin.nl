import { defineConfig } from "astro/config";
import { type RemarkPlugins } from "astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { remarkMark } from "remark-mark-highlight";
import remarkWikiLink from "remark-wiki-link";
import slugify from "slugify";
import { loadEnv } from "vite";
import { rehypeFigure } from "./lib/rehype-figure";

const { SITE_URL } = loadEnv(process.env.SITE_URL, process.cwd(), "");

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	markdown: {
		shikiConfig: {
			theme: "rose-pine-moon",
		},
		rehypePlugins: [rehypeFigure],
		remarkPlugins: remarkPlugins(),
	},
	scopedStyleStrategy: "class",
	site: SITE_URL,
	integrations: [mdx(), sitemap()],
});

function remarkPlugins(): RemarkPlugins {
	const options = {
		aliasDivider: "|",
		hrefTemplate: (permalink: string) => `/${permalink}`,
		pageResolver: (name: string) => {
			if (/\d{4}-\d{2}-\d{2}.*/.test(name)) {
				return [`notes/#${name}`];
			}
			return [slugify(name, { lower: true })];
		},
	};
	return [remarkMark, [remarkWikiLink, options]];
}

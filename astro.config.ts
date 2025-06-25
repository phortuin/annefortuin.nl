import { defineConfig } from "astro/config";
import { type RemarkPlugins } from "astro";
import mdx from "@astrojs/mdx";
import { remarkMark } from "remark-mark-highlight";

import remarkWikiLink from "remark-wiki-link";
import slugify from "slugify";
import { loadEnv } from "vite";

const { SITE_URL } = loadEnv(process.env.SITE_URL, process.cwd(), "");

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	markdown: {
		shikiConfig: {
			theme: "rose-pine-moon",
		},
		remarkPlugins: remarkPlugins(),
	},
	scopedStyleStrategy: "class",
	site: SITE_URL,
	integrations: [mdx()],
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

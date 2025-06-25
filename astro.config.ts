import { defineConfig } from "astro/config";
import { type RemarkPlugins } from "astro";
import mdx from "@astrojs/mdx";

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
	site: SITE_URL,
	trailingSlash: "always",
	integrations: [mdx()],
});

function remarkPlugins(): RemarkPlugins {
	const options = {
		aliasDivider: "|",
		hrefTemplate: (permalink: string) => `/${permalink}/`,
		pageResolver: (name: string) => [slugify(name, { lower: true })],
	};
	return [[remarkWikiLink, options]];
}

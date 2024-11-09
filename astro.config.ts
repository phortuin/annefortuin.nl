// Astro
import { defineConfig } from "astro/config";
import { type RemarkPlugins } from "astro";
import mdx from "@astrojs/mdx";

// NPM
import { config } from "dotenv-safe";
import remarkWikiLink from "remark-wiki-link";
import slugify from "slugify";

// Initialise dotenv
config();

// Astro config
export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	markdown: {
		remarkPlugins: remarkPlugins(),
	},
	site: process.env.SITE_URL,
	trailingSlash: "always",
	integrations: [mdx()],
});

/**
 * Wrapper function to keep Astro config somewhat clean
 */
function remarkPlugins(): RemarkPlugins {
	const options = {
		aliasDivider: "|",
		hrefTemplate: (permalink: string) => `/${permalink}/`,
		pageResolver: (name: string) => [slugify(name, { lower: true })],
	};
	return [[remarkWikiLink, options]];
}

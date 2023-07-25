// Astro
import { defineConfig } from "astro/config";

// NPM
import dotenv from "dotenv-safe";
import mdx from "@astrojs/mdx";
import remarkWikiLink from "remark-wiki-link";
import slugify from "slugify";

// Initialise dotenv
dotenv.config();

// Astro config
export default defineConfig({
	markdown: {
		remarkPlugins: remarkPlugins(),
	},
	site: process.env.SITE_URL,
	trailingSlash: "always",
	inlineStylesheets: "auto",
	compressHTML: true,
	experimental: {
		assets: true
	},
	integrations: [mdx()]
});

/**
 * Wrapper function to keep Astro config somewhat clean
 *
 * @return {Array}
 */
function remarkPlugins() {
	return [
		[
			remarkWikiLink,
			{
				aliasDivider: "|",
				hrefTemplate: (permalink) => `/${permalink}/`,
				pageResolver: (name) => [ slugify(name, { lower: true }) ],
			}
		],
	];
}

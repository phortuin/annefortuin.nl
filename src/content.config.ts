import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { type Locale } from "~/lib/locale.ts";
import { mdExtensionRegex } from "~/lib/wikilink.ts";

const locales = z.custom<Locale>();

const notesCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
	}),
});

const pagesCollection = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./src/content/pages",
		generateId: ({ entry }) => entry.replace(mdExtensionRegex, ""),
	}),
	schema: z.object({
		title: z.string().optional(),
		lang: z.optional(locales),
		description: z.string().optional(),
	}),
});

export const collections = {
	notes: notesCollection,
	pages: pagesCollection,
};

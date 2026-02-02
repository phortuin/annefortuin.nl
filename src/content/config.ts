import { defineCollection, z } from "astro:content";
import { type Locale } from "@lib/date.ts";

const locales = z.custom<Locale>();

const notesCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
	}),
});

const pagesCollection = defineCollection({
	type: "content",
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

import { z, defineCollection } from "astro:content";
import { type Locale } from "@lib/date";

const locales = z.custom<Locale>();

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		lang: z.optional(locales),
		pubDate: z.coerce.date(),
	}),
});

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
		template: z.string().optional(),
	}),
});

export const collections = {
	posts: postsCollection,
	notes: notesCollection,
	pages: pagesCollection,
};

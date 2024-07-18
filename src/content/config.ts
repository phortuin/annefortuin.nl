import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		author: z.string(),
		pubDate: z.coerce.date(),
		description: z.string(),
	}),
});

const notesCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
	}),
})

const pagesCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
	})
})

export const collections = {
	"posts": postsCollection,
	"notes": notesCollection,
	"pages": pagesCollection,
};

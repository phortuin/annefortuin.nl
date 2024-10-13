import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
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
		title: z.string().optional(),
		description: z.string().optional(),
		template: z.string().optional(),
	})
})

export const collections = {
	"posts": postsCollection,
	"notes": notesCollection,
	"pages": pagesCollection,
};

import { type APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { defaultDescription, siteName } from "~/layouts/Base.astro";
import { locales } from "~/lib/date.ts";

export const GET: APIRoute = async (context) => {
	const notes = await getCollection("notes");
	// https://docs.astro.build/en/recipes/rss/#including-full-post-content
	return rss({
		title: siteName,
		description: defaultDescription[locales.NL],
		site: context.site!,
		items: notes.map((note) => ({
			title: note.data.title,
			pubDate: note.data.pubDate,
			link: `/${note.slug}/`,
		})),
		customData: `<language>${locales.NL}</language>`,
	});
};

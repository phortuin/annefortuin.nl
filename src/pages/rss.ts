import { type APIRoute } from "astro";
import rss from "@astrojs/rss";
import { defaultDescription, siteName } from "~/layouts/Base.astro";
import { locales } from "~/lib/date.ts";
import { getNotes } from "~/lib/note.ts";

export const GET: APIRoute = async (context) => {
	const notes = await getNotes();
	return rss({
		title: siteName,
		description: defaultDescription[locales.NL],
		site: context.site!,
		items: notes.map((note) => ({
			title: note.title,
			pubDate: note.pubDate,
			link: note.permalink,
		})),
		customData: `<language>${locales.NL}</language>`,
	});
};

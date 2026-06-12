import { getCollection, render } from "astro:content";
import { dateToYMD } from "~/lib/date.ts";

export async function getNotes() {
	const entries = await getCollection("notes");
	return await Promise.all(
		entries
			.sort((a, b) => (a.data.pubDate > b.data.pubDate ? -1 : 1))
			.map(async (entry) => {
				const { Content } = await render(entry);
				return {
					title: entry.data.title,
					pubDate: entry.data.pubDate,
					permalink: `/notes/#${dateToYMD(entry.data.pubDate)}`,
					Content,
				};
			}),
	);
}

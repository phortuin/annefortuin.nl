import { type APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { defaultDescription, siteName } from "@layouts/Base.astro";
import { locales } from "@lib/date";

export const GET: APIRoute = async (context) => {
	const posts = await getCollection("posts");
	// https://docs.astro.build/en/recipes/rss/#including-full-post-content
	return rss({
		title: siteName,
		description: defaultDescription[locales.EN],
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			link: `/blog/${post.slug}/`,
		})),
		customData: `<language>${locales.EN}</language>`,
	});
};

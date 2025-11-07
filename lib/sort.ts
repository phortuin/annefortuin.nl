import { type CollectionEntry, type CollectionKey } from "astro:content";

export const sortCollection = <T extends CollectionKey>(
	collection: CollectionEntry<T>[],
) => collection.sort((a, b) => a.data.pubDate > b.data.pubDate ? -1 : 1);

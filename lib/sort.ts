import { type CollectionEntry } from "astro:content";

type SomeCollection = CollectionEntry<"posts"> | CollectionEntry<"notes">;

export const sortCollection = (collection:SomeCollection[]) =>
	collection.sort((a:SomeCollection, b:SomeCollection) =>
		a.data.pubDate > b.data.pubDate ? 1 : -1
	);

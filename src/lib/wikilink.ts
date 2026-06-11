import { readdirSync } from "node:fs";
import path from "node:path";
import slugify from "@sindresorhus/slugify";

const pagesDir = path.join(import.meta.dirname!, "../content/pages");
const markdownRegex = /\.mdx?$/;

function fileToSlug(file: string) {
	const { dir, name } = path.parse(file);
	if (name === "index") return dir;
	return dir ? `${dir}/${name}` : name;
}

function slugKey(name: string) {
	return slugify(name, { lowercase: true });
}

export function loadPageSlugs(): string[] {
	const files = readdirSync(pagesDir, { recursive: true, encoding: "utf8" });
	return files
		.filter((file) => markdownRegex.test(file))
		.map(fileToSlug)
		.filter((slug) => slug !== "");
}

/**
 * Returns a function to be consumed by remarkWikiLink plugin to know how to
 * resolve a wikilink to a path:
 * - date like strings resolve to notes
 * - when editor uses slashes, the slug is interpreted as is. So [[my/page]]
 *   will resolve to my/page.md
 * - [[page]] will be the first matching page that has `page` as slug, even if
 *   it is nested (eg. /project/page.md). Files called index.md are filtered
 *   out: /project/index.md will be found as [[project]]
 */
export function createWikilinkResolver(knownSlugs: string[]) {
	const byBasename = new Map<string, string[]>();
	for (const slug of [...knownSlugs].sort()) {
		const key = slugKey(path.basename(slug));
		const matches = byBasename.get(key) ?? [];
		matches.push(slug);
		byBasename.set(key, matches);
	}

	return (name: string) => {
		if (/\d{4}-\d{2}-\d{2}/.test(name)) return [`notes/#${name}`];
		if (name.includes("/")) return [name];
		const key = slugKey(name);
		return byBasename.get(key) ?? [key];
	};
}

import slugify from "@sindresorhus/slugify";

export function resolveWikilink(name: string): string[] {
	if (/\d{4}-\d{2}-\d{2}.*/.test(name)) return [`notes/#${name}`];
	if (name.indexOf("/") > -1) return [name];
	return [slugify(name, { lowercase: true })];
}

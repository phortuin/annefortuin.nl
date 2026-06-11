import { deepStrictEqual } from "node:assert/strict";
import { createWikilinkResolver } from "./wikilink.ts";

const KNOWN = [
	"inderdaad",
	"links",
	"notes",
	"now",
	"some-path/derp",
];

const resolve = createWikilinkResolver(KNOWN);

Deno.test("date-prefixed names resolve to a notes anchor", () => {
	deepStrictEqual(resolve("2025-03-09"), ["notes/#2025-03-09"]);
	deepStrictEqual(resolve("2025-07-07-suffix"), [
		"notes/#2025-07-07-suffix",
	]);
});

Deno.test("names containing a slash pass through unchanged", () => {
	deepStrictEqual(resolve("some-path/derp"), ["some-path/derp"]);
	deepStrictEqual(resolve("any/explicit/path"), ["any/explicit/path"]);
});

Deno.test("a bare name matching a nested page resolves to that page", () => {
	deepStrictEqual(resolve("derp"), ["some-path/derp"]);
});

Deno.test("a bare name matching a top-level page resolves to that page", () => {
	deepStrictEqual(resolve("inderdaad"), ["inderdaad"]);
});

Deno.test("a bare name with no match returns just the slugified key", () => {
	deepStrictEqual(resolve("ghost"), ["ghost"]);
});

Deno.test("bare names are slugified (lowercase, kebab-case) before lookup", () => {
	deepStrictEqual(resolve("Derp"), ["some-path/derp"]);
	deepStrictEqual(resolve("Some Title"), ["some-title"]);
});

Deno.test("ambiguous basenames return all matches sorted alphabetically", () => {
	const ambiguous = createWikilinkResolver([
		"some-path/derp",
		"other-path/derp",
		"zzz-path/derp",
	]);
	deepStrictEqual(ambiguous("derp"), [
		"other-path/derp",
		"some-path/derp",
		"zzz-path/derp",
	]);
});

Deno.test("an empty knownSlugs list still resolves the date and slash rules", () => {
	const empty = createWikilinkResolver([]);
	deepStrictEqual(empty("2025-03-09"), ["notes/#2025-03-09"]);
	deepStrictEqual(empty("a/b"), ["a/b"]);
	deepStrictEqual(empty("ghost"), ["ghost"]);
});

import { deepStrictEqual } from "node:assert/strict";
import { buildBreadcrumbs } from "./breadcrumbs.ts";

const KNOWN = new Set(["my-page", "links", "projects", "projects/my-project"]);

Deno.test("home returns just the root crumb (undefined slug)", () => {
	deepStrictEqual(buildBreadcrumbs(undefined, KNOWN), [
		{ label: "annefortuin.nl", href: "/" },
	]);
});

Deno.test("home returns just the root crumb (slug '/')", () => {
	deepStrictEqual(buildBreadcrumbs("/", KNOWN), [
		{ label: "annefortuin.nl", href: "/" },
	]);
});

Deno.test("a top-level page links to itself", () => {
	deepStrictEqual(buildBreadcrumbs("my-page", KNOWN), [
		{ label: "annefortuin.nl", href: "/" },
		{ label: "my-page", href: "/my-page" },
	]);
});

Deno.test(
	"a nested page with an existing intermediate links each segment",
	() => {
		deepStrictEqual(buildBreadcrumbs("projects/my-project", KNOWN), [
			{ label: "annefortuin.nl", href: "/" },
			{ label: "projects", href: "/projects" },
			{ label: "my-project", href: "/projects/my-project" },
		]);
	},
);

Deno.test("a missing intermediate renders as plain text", () => {
	deepStrictEqual(buildBreadcrumbs("ghost/page", new Set(["ghost/page"])), [
		{ label: "annefortuin.nl", href: "/" },
		{ label: "ghost", href: null },
		{ label: "page", href: "/ghost/page" },
	]);
});

Deno.test("deeper nesting checks the cumulative path at each level", () => {
	deepStrictEqual(buildBreadcrumbs("a/b/c", new Set(["a", "a/b", "a/b/c"])), [
		{ label: "annefortuin.nl", href: "/" },
		{ label: "a", href: "/a" },
		{ label: "b", href: "/a/b" },
		{ label: "c", href: "/a/b/c" },
	]);
	deepStrictEqual(buildBreadcrumbs("a/b/c", new Set(["a", "a/b/c"])), [
		{ label: "annefortuin.nl", href: "/" },
		{ label: "a", href: "/a" },
		{ label: "b", href: null },
		{ label: "c", href: "/a/b/c" },
	]);
});

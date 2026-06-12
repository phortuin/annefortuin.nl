import { siteName } from "./site.ts";

export interface Crumb {
	label: string;
	href: string | null;
}

export function buildBreadcrumbs(
	slug: string | undefined,
	knownSlugs: Set<string>,
): Crumb[] {
	const root: Crumb = { label: siteName, href: "/" };
	if (!slug || slug === "/") return [root];

	const segments = slug.split("/").filter(Boolean);
	const crumbs: Crumb[] = [root];
	let routePath = "";

	for (const segment of segments) {
		routePath = routePath ? `${routePath}/${segment}` : segment;
		const pageExists = knownSlugs.has(routePath);
		crumbs.push({
			label: segment,
			href: pageExists ? `/${routePath}` : null,
		});
	}

	return crumbs;
}

import { visit } from "unist-util-visit";
import type { Element, Node, Parent, Text } from "hast";
import { whitespace } from "hast-util-whitespace";
import { remove } from "unist-util-remove";
import { h } from "hastscript";

const isParentNode = (node: Node): node is Parent => "children" in node;
const isElementNode = (node: Node): node is Element => node.type === "element";
const isTextNode = (node: Node): node is Text => node.type === "text";

const elementIsImage = (node: Node) =>
	isElementNode(node) &&
	node.tagName === "img" &&
	Boolean(node.properties.src);

const elementIsImageInFigure = (parent: Parent) =>
	isElementNode(parent) && parent.tagName === "figure";

const hasOnlyImagesOrWhitespace = (node: Parent) =>
	node.children.every((child: Node | Element | Text) => {
		if (isElementNode(child)) return child.tagName === "img";
		if (isTextNode(child)) return whitespace(child);
		return false;
	});

/**
 * Rehype plugin to wrap `<img/>` tags in `<figure/>` element with an
 * optional `<figcaption />`. This is a TypeScript implementation of
 * [@microflash/rehype-figure][1] with a slight modification to use the title
 * attribute for figcaptions instead of the alt attribute
 *
 * @see https://www.a11yproject.com/posts/alt-text/
 *
 * @example
 * Markdown:
 * ```markdown
 * ![Bar chart showing visitor numbers](chart.webp "This website had 1 visitor in 2025")
 * ```
 *
 * ...yields:
 *
 * ```html
 * <figure role="group">
 *   <img src="chart.webp" alt="Bar chart showing visitor numbers" />
 *   <figcaption>This website had 1 visitor in 2025</figcaption>
 * </figure>
 * ```
 *
 * [1]: https://github.com/Microflash/rehype-figure/blob/main/index.js
 */
export function rehypeFigure() {
	return (tree: Node) => {
		/**
		 * Unwrap images inside a <p/> element if it has only image(s)
		 * as children
		 */
		visit(
			tree,
			{ tagName: "p" },
			(node: Node | Parent, index: number, parent: Parent) => {
				if (isParentNode(node) && !hasOnlyImagesOrWhitespace(node)) {
					return;
				}
				remove(node, "text"); // This removes any whitespace such as tabs or newlines
				if (parent && parent.children && "children" in node) {
					parent.children.splice(index, 1, ...node.children); // Replace current child with its children, effectively unwrapping the <img/> elements inside the <p/>
				}
			},
		);

		/**
		 * Creates a <figure/> element wherever there’s an <img/>
		 */
		visit(
			tree,
			(node: Node): node is Element => elementIsImage(node),
			(node: Element, _, parent: Parent) => {
				if (elementIsImageInFigure(parent)) return; // Skip to prevent endless loop
				const { tagName, children, properties } = createFigure(node);
				node.tagName = tagName;
				node.children = children;
				node.properties = properties;
			},
		);
	};
}

/**
 * Create figure element with an image inside, and optionally (if the img
 * element that needs wrapping has a title attribute) a figcaption
 * @note The `role=group` attribute is added for backwards compatibility with
 * the <figure/> element.
 * @see https://www.a11yproject.com/posts/title-attributes/
 * @note We use the title attribute to create a figcaption, but remove it
 * because title attributes are useless for a11y and UX in general.
 * @see https://www.w3.org/WAI/tutorials/images/complex/
 */
function createFigure(element: Element): Element {
	const title = element.properties.title;
	delete element.properties.title;
	const newElement = h("figure", { role: "group" }, [
		h("img", { ...element.properties }),
		title ? h("figcaption", { type: "text", value: title }) : null,
	]);
	return {
		type: "element",
		tagName: newElement.tagName,
		children: newElement.children,
		properties: newElement.properties,
	};
}

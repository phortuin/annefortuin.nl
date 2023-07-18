// Core
import path from "node:path";

// NPM
import slugify from "slugify";

/**
 * Turn file path into a slug. "filePath" is a full filesystem path; we just
 * want the filename without extension and pull it through slugify just to be
 * sure
 */
export default function slug(filePath:string) {
	const extension = path.extname(filePath);
	const filename = path.basename(filePath).replace(extension, "");
	return slugify(filename, { lower: true });
}

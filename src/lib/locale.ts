export const locales = {
	NL: "nl",
	EN: "en",
} as const;
export type Locale = (typeof locales)[keyof typeof locales];
export const DEFAULT_LOCALE = locales.NL;

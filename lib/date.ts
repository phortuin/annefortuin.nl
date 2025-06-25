export const locales = {
	NL: "nl",
	EN: "en",
} as const;
export type Locale = (typeof locales)[keyof typeof locales];
export const DEFAULT_LOCALE = locales.NL;

/**
 * Get ISO date without time (yyyy-mm-dd) for Date object
 * @returns {string} yyyy-mm-dd
 */
export const dateToYMD = (date: Date): string =>
	date.toISOString().slice(0, 10);

export function formatDate(date: Date) {
	const formatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return formatter.format(date);
}

/**
 * Return a human-readable relative time string
 * @see https://stackoverflow.com/a/72817357
 */
export function timeAgo(date: Date) {
	const formatter = new Intl.RelativeTimeFormat(DEFAULT_LOCALE);
	const ranges = [
		["years", 3600 * 24 * 365],
		["months", 3600 * 24 * 30],
		["weeks", 3600 * 24 * 7],
		["days", 3600 * 24],
		["hours", 3600],
		["minutes", 60],
		["seconds", 1],
	] as const;
	const secondsElapsed = (date.getTime() - Date.now()) / 1000;

	for (const [type, duration] of ranges) {
		if (duration < Math.abs(secondsElapsed)) {
			const delta = secondsElapsed / duration;
			return formatter.format(Math.round(delta), type);
		}
	}
	return "Heel, heel lang geleden";
}

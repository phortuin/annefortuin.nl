// Type definition for process.env
// https://stackoverflow.com/a/53981706/554821

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SITE_URL: string;
		}
	}
}

export {};

// Ambient types for the Deno runtime globals used in test files, so non-Deno
// TS tooling (astro check, editor LSP) doesn't choke on `Deno.test`.
declare namespace Deno {
	function test(name: string, fn: () => void | Promise<void>): void;
}
	
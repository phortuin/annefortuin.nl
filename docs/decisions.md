# Decisions

## 007 Cloudflare API token instead of logging in

2026-02-23

With the move to Deno came some plumbing to get deployment with Wrangler to work (round trip to sign in to Cloudflare via browser didn’t fire), so I opted in on having a `CLOUDFLARE_API_TOKEN` with the right permissions. Flawless victory

## 006 Lefthook

2026-02-23

For pre-commit linting, formatting and type checking I use Lefthook and not Husky for no reason other than someone I trust uses it. Also it runs in parallel out of the box which is nice

## 005 MIT license

2026-02-22

Apparently MIT is recommended over ISC and since I had to fix my license file for sourcehut (it doesn’t approve of a lowercase `license` file) I went with it

## 004 Use Deno

2026-02-22

I moved to Deno in favor of Node/npm. Mostly because of the built-in linting, formatting and TypeScript support and tbh some of the security stuff feels nice as well

## 003 Change into a kms/pkm system, sort of

2026-02-21

Instead of having blog posts I chose to move into a kmt/pkm like setup with Wikilinks that I’m fond of when using Obsidian. Simplifies everything, to a degree where this whole site is nothing but a heavy duty markdown renderer. But yeah for now this feels good

## 002 No improved spacing around en/em dash

2025-07-03

In Dutch, the rules are different than in English, so everything is solved by using the right spaces/characters in the source text. Also, Recursive (the current choice of font for this website) has lousy rendering for the em dash: it’s way too narrow. Third, the technical solution would be using html entities for spacing (like `&emsp14`, [see here](https://stackoverflow.com/questions/8515365/are-there-other-whitespace-codes-like-nbsp-for-half-spaces-em-spaces-en-space)) which means I have to write a rehype plugin instead of a remark one, and I don’t like that. So.

## 001 No reading time

2025-07-03

Reading time doesn’t mean much: a blog is either interesting, or too long. The scrollbar is a better indicator than reading time.

# annefortuin.nl

> Some dude’s website

Built with [Astro](https://astro.build/). Uses [Deno](https://deno.com/) for dependency management and running tasks.

## Development

Set up an `.env.local` file with your local `SITE_URL` pointing to localhost, or whatever your development URL is. For production, create a `.env.production` with the live URL of your website, as it will be used in the `Astro.site` global.

```shell
$ deno install
$ deno task dev
```

## Deploy

Uses Wrangler to deploy to [Cloudflare Pages](https://pages.cloudflare.com/).

```shell
$ deno task deploy
```

To set up deployment with Wrangler properly, create an API token with these permissions:

- Account: Cloudflare Pages: Edit
- Account: Workers Scripts: Edit
- User: Memberships: Read
- User: User Details: Read

...and store it in `.env.local`:

```shell
CLOUDFLARE_API_TOKEN=<your_token>
```

This token will automatically be picked up by Wrangler’s deploy command.

## Tech

- Astro as SSG
- Markdown files
- Statically deployed to Cloudflare Pages

## Todo

- [ ] Add protective headers
- [ ] Guestbook
- [ ] Wikilinks should match any page, eg. if `/some-path/derp.md` is the only page called 'derp' it should link by using `[[derp]]`
- [ ] Add precommit hook w/lefthook with lint/fmt/check tasks

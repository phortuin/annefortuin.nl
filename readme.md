# annefortuin.nl

> Some dude’s website

Built with [Astro](https://astro.build/). Uses [Deno](https://deno.com/) for dependency management and running tasks.

## Development

```bash
$ deno install
$ deno task dev
```

## Deploy

Uses Wrangler to deploy to [Cloudflare Pages](https://pages.cloudflare.com/).

```bash
$ deno task deploy
```

## Tech

- Astro as SSG
- Markdown files
- Statically deployed to Cloudflare Pages

## Todo

- [ ] Build on push to main or tag
- [ ] Add protective headers
- [ ] Guestbook
- [ ] Wikilinks should match any page, eg. if `/some-path/derp.md` is the only page called 'derp' it should link by using `[[derp]]`
- [ ] Add precommit hook w/lefthook with lint/fmt/check tasks
- [ ] Set up CI w/deno on cloudflare?

# annefortuin.nl

> Some dude’s website

Built with [Astro](https://astro.build/).

## Development

```bash
$ npm ci
$ npm run dev
```

## Deploy

Uses Wrangler to deploy to [Cloudflare Pages](https://pages.cloudflare.com/).

```bash
$ npm run deploy
```

## Tech

- Astro as SSG
- Markdown files
- Statically deployed to Cloudflare Pages

## Todo

- [ ] Build on push to main or tag
- [ ] Add protective headers
- [ ] Guestbook
- [ ] Deno!
- [ ] Wikilinks should match any page, eg. if `/some-path/derp.md` is the only page called 'derp' it should link by using `[[derp]]`

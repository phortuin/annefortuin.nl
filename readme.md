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

- [ ] Set SITE_URL to something during production build?
- [ ] Add robots.txt
- [ ] Move away from Astro 

### Move away from Astro

Astro is cool and all and it's easy to set up stuff fast, but it's overkill for a super simple blog like this. I’d rather have a custom build with Nunjucks and Marked which will work forever, instead of relying on a dependency that might go away, break, or need updates every so often.

## License

MIT

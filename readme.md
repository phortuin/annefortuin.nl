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
- [ ] Have pages without trailing slash? Seems to be a standard nowadays. How wuld that even work with a static deploy and no server side magic :thinking_face:
- [ ] Add robots.txt
- [ ] Move away from Astro 
- [ ] Move away from Cloudflare Pages

### Move away from Astro

Astro is cool and all and it's easy to set up stuff fast, but it's overkill for a super simple blog like this. I’d rather have a custom build with Nunjucks and Marked which will work forever, instead of relying on a dependency that might go away, break, or need updates every so often.

### Move away from CF Pages

On hard refreshes, there’s an error `Pages had an internal error, if this persists please contact support!` that randomly occurs. It seems to have to do with DNS config (since it doesn’t occur on the [pages.dev](https://annefortuin-nl.pages.dev) URL). I’d rather dump everything on S3 again and have CF do the CDN/DNS management than have issues like these.

## License

MIT

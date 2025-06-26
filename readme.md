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
- [ ] RSS
- [ ] Sitemap
- [ ] Implement [Reading time](https://docs.astro.build/en/recipes/reading-time/)
- [ ] Header w/ clickable subsections (eg. click blog in `blog/blog-post` and then go to blog overview)
- [ ] Add robots.txt
- [ ] Guestbook
- [ ] Have improved spacing around endash and emdash
- [x] SEO card support & meta tag stuff. Kill me please
- [x] Have pages without trailing slash? Seems to be a standard nowadays. How wuld that even work with a static deploy and no server side magic :thinking_face:
- [x] Header w/ breadcrumbs; [see here](https://markboulton.co.uk/journal/an-anchor/) and [here](https://paulmillr.com/posts/eth-cryptography/)
- [x] Use [Content Collections]

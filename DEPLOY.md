# Putting the site live

The site is a static export of a Next.js app, served by GitHub Pages from Maryam's repository, `mattar23/Mix-Website`. Hosting costs nothing, she owns the code and the domain, and every push to `main` redeploys within about two minutes. Nothing here needs her to touch a terminal.

The code is pushed. What remains splits into two stages: a preview at a GitHub address so Maryam can review the site, then the real domain.

## Stage 1: preview at the GitHub address

GitHub Pages on a free account only serves public repositories, and only the repository owner can change these settings. Maryam does both steps once:

1. Open github.com/mattar23/Mix-Website, then Settings, then General. Scroll to the Danger Zone and choose Change visibility, Public. (If she prefers the code private, GitHub Pro covers Pages on private repositories instead.)
2. Still in Settings, open Pages. Under Build and deployment, set Source to GitHub Actions.

Then Moad opens the Actions tab and re runs the latest "Deploy to GitHub Pages" workflow, or pushes any commit. When it finishes the site is at:

```
https://mattar23.github.io/Mix-Website/
```

The workflow currently builds for that address. The two `env` lines under the build step in `.github/workflows/deploy.yml` set the site URL and base path, and the comment above them says what to change at stage 2.

## Stage 2: connect maryamattar.co

1. In the repository, Settings, Pages, under Custom domain, enter `maryamattar.co` and save. GitHub shows a DNS check that fails until the next step is done.
2. At GoDaddy, open the domain, then DNS. Delete the existing A records for `@` (they point at GoDaddy's placeholder page) and add these four A records, each with name `@`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

3. Add one CNAME record with name `www` and value `mattar23.github.io`.
4. DNS can take up to an hour to settle. When the check in GitHub turns green, tick Enforce HTTPS on the same page. The certificate is issued automatically.
5. Moad edits the two `env` lines in `.github/workflows/deploy.yml` to `https://maryamattar.co` and an empty base path, and adds a `public/CNAME` file containing `maryamattar.co`, then pushes. The next deploy builds for the domain.

## Email at the domain

A domain purchase does not include a mailbox. The site uses `info@maryamattar.co`, so before launch that address has to deliver somewhere, or enquiries bounce. Two routes:

- **Forwarding, free.** A forwarding service such as ImprovMX takes two DNS records at GoDaddy (an MX and a TXT) and forwards `info@` to any existing inbox. Replies come from the existing inbox, not from the domain. GoDaddy also offers forwarding in some domain plans; check the Email section of her account first.
- **A mailbox, paid.** GoDaddy sells Microsoft 365 mailboxes alongside the domain, and Google Workspace does the same. Either lets her send as `info@maryamattar.co`. Worth it once the site brings enquiries.

Start with forwarding. It can be replaced by a mailbox later without touching the site.

## After launch

- Submit `https://maryamattar.co/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Both ask to verify ownership: use the DNS record method at GoDaddy, which needs no change to the site.
- Open a Google Business Profile for Jeddah under audio equipment rental and sound services. For local searches this matters more than anything in the code.

## Day to day

Edit, commit to `main`, push. The workflow builds and deploys. To check the build before pushing:

```bash
npm run build
```

The exported site lands in `out/`, which is ignored by git. To build for the GitHub preview address locally, set the same two variables the workflow sets.

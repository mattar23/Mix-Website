# Putting the site live

The site is a static export of a Next.js app, served by GitHub Pages from a repository in Maryam's own GitHub account. Hosting costs nothing, she owns the code and the domain, and every push to `main` redeploys within about two minutes. Nothing here needs her to touch a terminal.

## One time setup

### 1. Maryam creates the GitHub account and repository

1. Sign up at github.com with her own email.
2. Create a new repository named `maryamattar.co`. Public, no README, no licence, no `.gitignore`.
3. In the repository, open Settings, then Collaborators, and add Moad's GitHub username.

### 2. Moad pushes the code

From the `website/` folder:

```bash
git remote add origin git@github.com:<her-account>/maryamattar.co.git
git push -u origin main
```

The first push triggers the workflow in `.github/workflows/deploy.yml`. It will fail once, because Pages is not switched on yet. That is expected.

### 3. Switch Pages to the workflow

1. In the repository, open Settings, then Pages.
2. Under Build and deployment, set Source to GitHub Actions.
3. Open the Actions tab and re run the failed workflow, or push any commit. When the run finishes the deploy has worked. The temporary `github.io` address will look unstyled because the site is built for the root of its own domain; that resolves at the next step.

### 4. Connect the domain

Still in Settings, Pages, under Custom domain, enter `maryamattar.co` and save. GitHub will show a DNS check that fails until the next step is done.

At GoDaddy, open the domain, then DNS. Delete the existing A records for `@` (they point at GoDaddy's placeholder page) and add these four A records, each with name `@` and TTL at the default:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Add one CNAME record with name `www` and value `<her-account>.github.io`.

DNS can take up to an hour to settle. When the check in GitHub turns green, tick Enforce HTTPS on the same Pages settings page. The certificate is issued automatically.

The file `public/CNAME` records the domain alongside the code. GitHub keeps the custom domain setting itself for workflow deploys, so the file is a note for whoever hosts the site next, not a switch.

## After launch

- Submit `https://maryamattar.co/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Both ask to verify ownership: use the DNS record method at GoDaddy, which needs no change to the site.
- Open a Google Business Profile for Jeddah under audio equipment rental and sound services. For local searches this matters more than anything in the code.
- Replace the placeholder social links in `src/config/site.ts` and `src/data/bio.ts` with Maryam's real profile URLs.

## Day to day

Edit, commit to `main`, push. The workflow builds and deploys. To check the build before pushing:

```bash
npm run build
```

The exported site lands in `out/`, which is ignored by git.

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

A domain purchase does not include a mailbox, and GoDaddy no longer includes free forwarding with a domain. The site shows `info@maryamattar.co`, so before launch that address has to deliver somewhere, or enquiries bounce.

The decision, 2026-10-07: forward `info@` to Maryam's personal inbox for free with ImprovMX. No Microsoft 365. Replies will come from her personal address. If she later wants to send as `info@maryamattar.co`, Google Workspace replaces the forwarding with a DNS change and the site does not change.

### Before changing anything

As checked on 2026-10-07 the domain already carries Microsoft 365 mail records, which means a Microsoft email product was attached to it in her GoDaddy account at some point, possibly as a trial at checkout:

```
MX    @              maryamattar-co.mail.protection.outlook.com   priority 0
TXT   @              v=spf1 include:secureserver.net -all
TXT   @              NETORGFT21196915.onmicrosoft.com
CNAME autodiscover   autodiscover.outlook.com
```

In GoDaddy, open My Products and look under Email. If a Microsoft 365 or Professional Email plan is listed, check whether it is billing or set to renew, and cancel it if she does not want it. Nothing has been using that mailbox for the site.

### Set up forwarding, about ten minutes

Do this in the same GoDaddy sitting as the website DNS in Stage 2.

1. Maryam creates a free account at improvmx.com, adds the domain `maryamattar.co`, and enters her personal email as the destination. ImprovMX creates a catch all alias, so `info@` and any other address at the domain forward to her.
2. At GoDaddy, open the domain, then DNS, and make these changes:

   Delete:

   ```
   MX    @              maryamattar-co.mail.protection.outlook.com
   TXT   @              v=spf1 include:secureserver.net -all
   CNAME autodiscover   autodiscover.outlook.com
   ```

   Add:

   ```
   MX    @    mx1.improvmx.com    priority 10
   MX    @    mx2.improvmx.com    priority 20
   TXT   @    v=spf1 include:spf.improvmx.com ~all
   ```

   Leave the `_dmarc` record and the `NETORGFT` text record alone; neither affects forwarding. A domain may hold only one text record starting `v=spf1`, which is why the old one is deleted and not kept beside the new one.

3. Back in ImprovMX the domain shows a green "Email forwarding active" once the records are seen, usually within minutes and at most an hour.
4. Send a message from a different account to `info@maryamattar.co` and confirm it reaches her inbox. Check the spam folder the first time. Then send one through the contact form on the site.

ImprovMX shows the exact records for the domain on its own setup screen. If they differ from the ones above, use theirs.

The free plan is reported as one domain, 25 aliases, and 500 forwarded messages a day, far beyond what the site will need.

## Sending enquiries straight from the contact form

The site has no server, so on its own the contact form can only open the visitor's email app with the details filled in. To send from the page itself it needs a form service. The code is ready for Web3Forms, free for 250 enquiries a month, and switches over as soon as a key is set.

1. Go to web3forms.com, enter the email address that should receive enquiries, and press Create Access Key. Use an inbox that already works, which today means Maryam's personal address, since `info@maryamattar.co` has no forwarding yet.
2. The key arrives in that inbox. Send it to Moad.
3. Moad pastes it between the quotes on the `NEXT_PUBLIC_FORM_KEY` line in `.github/workflows/deploy.yml` and pushes. The key is public by design; it only names the inbox.
4. Send a test enquiry from the live contact page and confirm it arrives. Check spam the first time.

With the key empty the form keeps working through the email app, so nothing breaks in the meantime. To change the receiving inbox later, create a new key for the new address and replace the old one.

## After launch

- Submit `https://maryamattar.co/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Both ask to verify ownership: use the DNS record method at GoDaddy, which needs no change to the site.
- Open a Google Business Profile for Jeddah under audio equipment rental and sound services. For local searches this matters more than anything in the code.

## Day to day

Edit, commit to `main`, push. The workflow builds and deploys. To check the build before pushing:

```bash
npm run build
```

The exported site lands in `out/`, which is ignored by git. To build for the GitHub preview address locally, set the same two variables the workflow sets.

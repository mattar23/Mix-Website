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

The decision, 2026-10-07: Maryam is taking Google Workspace, so `info@maryamattar.co` becomes a real mailbox she can send from. Her own Microsoft subscription is Microsoft 365 Personal, which cannot take a custom domain address, and GoDaddy's Microsoft email renews at a higher price than Google. The free forwarding route through ImprovMX was considered and is no longer needed.

The site shows `info@maryamattar.co`, so mail to it must arrive before launch.

### Before changing anything

As checked on 2026-10-07 the domain carries Microsoft 365 mail records from an account GoDaddy set up, which she did not knowingly buy:

```
MX    @              maryamattar-co.mail.protection.outlook.com   priority 0
TXT   @              v=spf1 include:secureserver.net -all
TXT   @              NETORGFT21196915.onmicrosoft.com
CNAME autodiscover   autodiscover.outlook.com
TXT   _dmarc         v=DMARC1; p=quarantine; ... rua=mailto:dmarc_rua@onsecureserver.net
```

In GoDaddy, open My Products and look under Email & Office. If a Microsoft plan is listed, check whether it is billing or set to renew, and cancel it.

### Set up Google Workspace

1. Sign up at workspace.google.com with the domain `maryamattar.co`. Either make `info@maryamattar.co` the first user, or make the first user her name and add `info@` to that user as an alias (Admin console, Directory, Users, the user, Add alternate emails). An alias costs nothing extra and lands in the same inbox.
2. Verify the domain. Google gives one TXT record to add at GoDaddy, name `@`, value starting `google-site-verification=`. Google may offer to sign in to GoDaddy and add records itself. That is fine for the verification and mail records, but see the warning below.
3. Point mail at Google. In GoDaddy DNS:

   Delete:

   ```
   MX    @              maryamattar-co.mail.protection.outlook.com
   TXT   @              v=spf1 include:secureserver.net -all
   CNAME autodiscover   autodiscover.outlook.com
   ```

   Add:

   ```
   MX    @    smtp.google.com    priority 1
   TXT   @    v=spf1 include:_spf.google.com ~all
   ```

   A domain may hold only one text record starting `v=spf1`, which is why the old one is deleted and not kept beside the new one.

4. Turn on DKIM so her mail is not marked as spam. In the Admin console go to Apps, Google Workspace, Gmail, Authenticate email, press Generate new record, and add the TXT record it shows at GoDaddy (name `google._domainkey`). Then press Start authentication. Google can take up to 48 hours to offer this on a new account.
5. Update the `_dmarc` record, which still reports to GoDaddy's Microsoft service. Change its value to:

   ```
   v=DMARC1; p=none; rua=mailto:info@maryamattar.co
   ```

   Once DKIM shows as authenticating, `p=none` can be raised to `p=quarantine`.

6. Test both directions. Send to `info@maryamattar.co` from another account and confirm it arrives, then reply from it and confirm the reply is not in the recipient's spam.

Google shows the exact records for her account on its setup screens. If they differ from the ones above, use theirs.

**Do not let any of this touch the website records.** The four `@` A records and the `www` CNAME from Stage 2 serve the site. Mail uses only MX and TXT records, so nothing in this section needs an A record or the `www` CNAME changed or deleted.

## Sending enquiries straight from the contact form

The site has no server, so on its own the contact form can only open the visitor's email app with the details filled in. To send from the page itself it needs a form service. The code is ready for Web3Forms, free for 250 enquiries a month, and switches over as soon as a key is set.

1. Go to web3forms.com, enter the email address that should receive enquiries, and press Create Access Key. Use `info@maryamattar.co` once the Google Workspace mailbox is receiving mail; before that, a key sent there would never arrive.
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

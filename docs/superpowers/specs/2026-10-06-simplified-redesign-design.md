# Simplified redesign, light theme, mixing and voiceover focus

Date: 2026-10-06. Status: approved by Moad in conversation, build to follow.

## Brief

Maryam reviewed the site and asked for something simpler. Her feedback is in `input.txt` and in five mockups she rendered with ChatGPT, kept at `../maryam_web_info/ChatGPT Image 1.png` to `5.png`. The mockups are the brief. Her own service copy is in `../maryam_web_info/written_content/Wesbite Services.pages` and is used verbatim where possible.

Moad's addition: the site must carry a complete metadata layer so it ranks for her field in Saudi Arabia and the GCC.

What she asked for, in her order:

1. Use the colours of the rendered mockups, light only, no dark theme and no dark panels.
2. Remove the CV material from About.
3. Remove music production and sound design as services. The site focuses on mixing and voiceover.
4. The red background portrait goes on the home page.
5. Add terms and agreement for equipment hire.
6. Reduce page length.
7. Recommend a way to put the site live. Domain at GoDaddy, no WordPress, she is not technical. Moad's plan is a GitHub account in her name that he pushes to.

Decisions Moad confirmed on 2026-10-06:

- No audio player on the home page. Listening lives on Work.
- The equipment enquiry cart, drawer, search, and filter chips are removed in favour of one enquire link.
- Audio restoration drops as a service and stays as a credit.
- The hardcoded phone number and coordinates in JSON-LD are removed.
- The uncommitted About and Cloud Walker changes from 2026-09-30 are folded into this work. Cloud Walker reverts to the typeset tag card.

## Design rules

The print document direction stands: no cards, no border radius, no shadows, hairline rules, margin metadata through the `.doc` grid, lists over grids, Archivo for display and interface, Newsreader for prose. Only the palette and the amount of content change.

### Palette

Sampled from the mockups. Light only. The `[data-theme="dark"]` block, the theme toggle, the theme context, and the inline theme script are deleted. `color-scheme: light` stays.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f1ede6` | page ground |
| `--paper-2` | `#e6e1d8` | highlighted row, player bar ground |
| `--ink` | `#0c0c0b` | text |
| `--ink-2` | `#5f5a52` | secondary text |
| `--ink-3` | `#8a847b` | quiet text |
| `--rule` | `#d6d2cb` | hairlines |
| `--rule-soft` | `#e0dcd5` | soft hairlines |
| `--spot` | `#b5653a` | accent, see below |
| `--spot-ink` | `#ffffff` | text on accent |

The accent has exactly three jobs: the underline of the current nav item, a short rule above a page heading (a 2.5rem by 1px bar, as in the mockups), and audio that is playing. It still serves focus rings and selection. It does not appear on buttons, body links, or anywhere else. The `viewport.themeColor` becomes a single light value.

### Portrait

`../maryam_web_info/media_content/DSCF2076.jpeg` is 1024 by 683 and the only copy. It is used at a contained size it can hold, never full bleed. Derive `public/images/maryam-portrait.jpg` as a 3:2 progressive JPEG at the source width, and `public/images/og-portrait.jpg` as a 1200 by 630 crop for Open Graph. The old `maryam-studio-portrait.jpg` is the same frame and is replaced by these two.

## Pages

Six routes stay: `/`, `/work`, `/services`, `/equipment`, `/about`, `/contact`. The masthead shows the name and five links, nothing else. The mobile menu stays.

### Home

In order, then the colophon:

1. Hero: the accent rule, the headline "Sound for music, spaces, and moving images." and a one sentence introduction naming what she does and where, beside the portrait at up to 40rem wide. Under 1024px the portrait stacks under the text.
2. Three entries in a row, divided by vertical hairlines, stacking under 760px: Mixing, Podcast & Voiceover, Equipment Rental. Each has its title, one sentence, and a link to its page section. The first two come from `SERVICES`, the third is written in the page.

Nothing else. The tracklist, the reel band, the selected work index, the equipment teaser, and the closing call to action are removed from this page.

### Services

Two services from `SERVICES`, in `src/data/services.ts`, rewritten from Maryam's document:

- `mixing`, "Mixing". Approach paragraph, what is accepted, the five delivery requirement groups as short lists, revisions and delivery (three rounds, consolidated notes, WAV ready for mastering, turnaround confirmed before start), the line "Mastering is not included.", and the optional extras list (rush delivery, additional revisions, mixed stems, alternate versions, vocal editing and tuning).
- `voiceover`, "Podcast & Voiceover Mixing". Her description, the eight item includes list, the sync to video line, and the two exclusions.

The `ServiceDetail` type gains `includes`, `excludes`, and `extras` as optional string arrays, and `deliverables` and `requirements` stay for mixing. Production, sound design, and restoration entries are deleted. Each service ends in a link to `/contact?service=<id>`. The closing "Something that fits none of these?" section is removed.

### Equipment

A flat rate sheet grouped by category: item, brand and stock, day rate, week rate. No Add column, no search, no chips, no cart. The intro sentence stays. Below the sheet, "Hire" with a single link to `/contact?service=rental`, then "Terms" as a numbered list from `RENTAL_TERMS`, which becomes an array of `{ heading, body }` covering: rental period and rates, booking and deposit, collection and return, condition and inspection, damage and loss, late return, cancellation, use and sub hire, governing law (Saudi Arabia). The page opens with a line saying the terms are summarised here and the full agreement is signed at handover. The terms text is a draft for Maryam's approval and is marked as such in a code comment, not on the page.

`RentalContext`, `RentalDrawer`, and the rental cart `sessionStorage` key are deleted. The contact form keeps an "Equipment hire" option and gains a "Which items and dates" placeholder when that option is selected.

### About

Accent rule, heading "Maryam Attar", the four bio paragraphs beside the portrait, then "Credits". Education, toolkit, capabilities, the session band, and the closing call to action are removed. `ARTIST_INFO` loses `education`, `toolkit`, and `capabilities`. `maryam-session-collab.jpg` is no longer used and is deleted.

### Work

Unchanged in structure. Cloud Walker's `image` field and `public/images/projects/cloud-walker.jpg` are removed so it falls back to the tag card. The intro sentence drops "from 2019 onward". The Films section stays.

### Contact

Unchanged except the intro sentence, which now reads mixing, podcast and voiceover, or equipment hire, and the service select, which lists the two services plus "Equipment hire" and "Something else".

## Metadata and search

- `siteConfig.url` falls back to `https://maryamattar.co`. `CLAUDE.md` is corrected to match.
- `siteConfig.title` becomes "Maryam Attar, Mixing and Voiceover Engineer in Jeddah". Description, keywords, and per page titles and descriptions are rewritten around: mixing engineer Jeddah and Saudi Arabia, online mixing, podcast editing, voiceover mixing, audio equipment and microphone rental Jeddah, GCC. Written to be read aloud, no keyword lists in prose.
- Open Graph and Twitter images point at `og-portrait.jpg` with correct dimensions. `locale` stays `en_US` with `ar_SA` as alternate.
- JSON-LD keeps the `Person` and `ProfessionalService` graphs. `areaServed` lists Saudi Arabia, United Arab Emirates, Qatar, Bahrain, Kuwait, and Oman, plus "Remote". The offer catalog lists the two services as `Service` with `serviceType`, and all equipment as `Product` offers in SAR. `telephone`, `geo`, `priceRange`, and `alumniOf` are removed. `knowsAbout` becomes mixing, podcast and voiceover mixing, audio engineering, equipment hire.
- Geo meta tags are added in the root layout `other` block: `geo.region` `SA-02`, `geo.placename` `Jeddah`.
- Sitemap and robots stay. `/terms` is not a route, it is `/equipment#terms`.
- Off site, for Moad: Google Business Profile for Jeddah, Search Console and Bing verification with the sitemap submitted, and real social URLs replacing the placeholders in `site.ts` and `bio.ts`. An Arabic version with hreflang is the biggest further lever and is out of scope here.

## Hosting

Recommendation: GitHub Pages from a static export, in a repository under Maryam's GitHub account with Moad as collaborator.

- `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`.
- `.github/workflows/deploy.yml`: on push to `main`, `npm ci`, `npm run build`, upload `out/`, deploy with `actions/deploy-pages`.
- `public/CNAME` containing `maryamattar.co`.
- GoDaddy DNS: four A records for the apex to GitHub Pages' IPs, one CNAME for `www` to `<account>.github.io`, then enforce HTTPS in the repository Pages settings.
- A short `DEPLOY.md` in the repo walks Moad through account creation, the push, the Pages setting, and the DNS records.

`useSearchParams` on Contact already sits in a `Suspense` boundary, which static export requires. Metadata routes (sitemap, robots, manifest) export as static files.

## Verification

- `npm run build`, `npm run lint`, `npx tsc --noEmit` pass.
- `out/` contains the six routes, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, and `CNAME`.
- No `data-theme`, `--spot: #001489`, `maryamattar.com`, or `RentalContext` references remain in `src/`.
- No dash characters in copy, data, or comments (grep for em dash, en dash, and `--` outside CSS custom properties).
- Horizontal overflow checked at 414px, 360px, and 320px on every route.
- Every page is shorter than before in rendered height at 1280px width, measured with a headless browser.

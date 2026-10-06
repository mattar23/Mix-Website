# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

All commands run from `website/` (the git repo root is `website/`, not the parent `maryam_attar/` folder).

```bash
npm run dev       # Next.js dev server on http://localhost:3000
npm run build     # static export to out/
npm run lint      # eslint (flat config, next/core-web-vitals + next/typescript)
npx tsc --noEmit  # typecheck; there is no npm script for this
```

There is no test runner and no test files. CI is the deploy workflow only, see Deployment.

## What this is

A portfolio and equipment hire site for Maryam Attar, a mixing and voiceover engineer in Jeddah, Saudi Arabia. Seven static routes: home, work, services, equipment, about, contact, and `/links`, the page a social bio points at, which stays out of the masthead. Next.js 16 App Router, React 19, TypeScript strict, exported as static files. No database, no API routes, no backend.

Dependencies are deliberately minimal: `next`, `react`, `react-dom` and nothing else. There is no CSS framework, no icon library, no component library. Adding one needs a real reason.

The parent directory holds source material that is not part of the app: `maryam_web_info/` (raw media, Maryam's own service copy in `written_content/Wesbite Services.pages`, the equipment spreadsheet, and the five mockups she rendered, `ChatGPT Image 1.png` to `5.png`). Content in `src/data/` was derived from those; treat them as the upstream reference for content questions. The services document also contains a login in plain text. Never copy it anywhere.

The brief, in Maryam's words from 2026-10-06: simpler, light only, mixing and voiceover as the two services, her portrait on the home page, hire terms published, shorter pages. The mockups are the visual brief. The spec that turned them into rules is `docs/superpowers/specs/2026-10-06-simplified-redesign-design.md`.

## Design

The site is built as a print document, closer to an album insert or exhibition catalogue than a product page. This is not decoration, it drives concrete rules:

- **No cards.** Structure comes from hairline rules, alignment, and the margin column. No element gets a border-radius, a drop shadow, or a bordered box that exists only to group things.
- **One accent, three jobs.** `--spot` is the rust from Maryam's mockups and marks exactly three things: the current nav item's underline, the short `.accent-rule` bar above a page heading, and audio that is playing. It also serves focus rings and selection. It never appears on buttons, body links, or anything else. If you find yourself reaching for the accent to make something stand out, that is the signal to fix hierarchy instead.
- **Light only.** Maryam asked for the dark theme to go. There is no theme attribute on the document, no toggle, and no dark token block. Do not bring one back.
- **Metadata goes in the margin**, via the `.doc` grid, not in a label stacked above the content. This is why the site has no uppercase eyebrow labels, and it should stay that way.
- **No invented instrumentation.** An earlier version displayed a VU meter, a "tape running" light, and a sample-rate readout, none of which reflected anything real. Do not add indicators that are not driven by actual state.
- **Lists over grids.** Work is a typeset index, equipment is a rate sheet, terms are a numbered list. All beat a card grid for scanning and are more honest about the content being a list.

Type is two variable families with distinct jobs, loaded in `app/layout.tsx`:

| Family | Role | Axis used |
|---|---|---|
| Archivo | display, interface, metadata | `wdth` 62 to 125, via `font-stretch` |
| Newsreader | prose and reading text | `opsz`, via `font-variation-settings` |

The width axis is where the personality lives. Headings set around `font-stretch: 118%`, metadata around `80%`. Do not swap in a static font and lose it.

### Styling

`app/globals.css` is the entire stylesheet: plain CSS, hand-organised into tokens, reset, typography, layout, components, and utilities, in that order. There is no Tailwind, no PostCSS plugin, no CSS-in-JS.

Colour, type scale, and rhythm are all custom properties on `:root`. Components reference tokens (`var(--ink)`, `var(--rule)`), never raw hex.

Class names are semantic and BEM-ish (`.index__row`, `.sheet__rate`, `.doc__margin`). Inline `style` is used sparingly for one-off measures like a `maxWidth` on a single heading; anything reused belongs in the stylesheet.

One trap worth knowing, already hit once: the equipment table turns its rows into CSS grids under 720px, so a desktop cell rule such as a fixed `width` still applies there and will push content out of the viewport unless explicitly reset.

When changing layout, check for horizontal overflow at 414px, 360px, and 320px. Comparing `documentElement.scrollWidth` against `clientWidth` in an iframe catches it quickly; headless screenshots at small window sizes do not, because the layout viewport can be wider than the captured image.

## Architecture

### Content lives in `src/data/`, never in components

Four typed modules are the single source of content truth. Pages import and render them; they do not inline copy or prices.

| Module | Exports | Consumed by |
|---|---|---|
| `data/equipment.ts` | `EquipmentItem`, `EQUIPMENT_INVENTORY`, `RENTAL_TERMS` | equipment page, JSON-LD offer catalog |
| `data/projects.ts` | `Project`, `PROJECTS`, `AudioSample`, `AUDIO_SAMPLES`, `Film`, `FILMS` | work page, audio player |
| `data/services.ts` | `ServiceDetail`, `SERVICES` | home, services page, contact form, JSON-LD offer catalog |
| `data/bio.ts` | `ARTIST_INFO` | about page, colophon, contact page |

`SERVICES` holds exactly two entries, `mixing` and `voiceover`, and the copy is Maryam's own from her services document. Production, sound design, and restoration were removed as services at her request; they survive only as credits and projects. `RENTAL_TERMS` is a numbered list of `{ heading, body }` and is a draft she has not yet approved.

`src/config/site.ts` holds site-level identity: canonical URL, description, keywords, `areaServed`, socials. The URL reads `NEXT_PUBLIC_SITE_URL` and falls back to `https://maryamattar.co`. Metadata, sitemap, robots, manifest, and JSON-LD all derive from it. The contact address is `info@maryamattar.co` in both `site.ts` and `bio.ts`; it has no mailbox yet, see `DEPLOY.md`.

`src/lib/asset.ts` prefixes a public path with `NEXT_PUBLIC_BASE_PATH`. Every raw `src` or `poster` on an image, video, or audio element, and every `next/image` src, goes through `asset()`. `next/link` prefixes the base path itself. The base path is `/Mix-Website` while the site is previewed from the GitHub project URL and empty on the real domain; forgetting `asset()` breaks only the preview, so test with the two variables the workflow sets.

Adding a piece of gear means adding one entry to `EQUIPMENT_INVENTORY`. It then appears in the rate sheet and the structured data automatically. Same for a project.

A project is linked to its audio by matching `Project.audioSrc` against `AudioSample.src`, not by id. Keep those paths in sync or the listen control disappears from the work index. A `Film` carries its own `credit` line (music production and mix) because the voiceover on the two Rawda films was not Maryam's, while the audio chapters are her voiceover mixes.

`Project.image` is optional, and `Project.video` is an optional short muted loop. The work plate handles all three cases: a still, a still with a loop that plays while the row is hovered, or a typeset card built from the project's tags when there is no imagery at all. Never fill a gap by stretching a small file, which is what the card exists to prevent.

### One global context, mounted once in the root layout

`app/layout.tsx` wraps the masthead, page content, colophon, and player bar in `AudioProvider`. `AudioPlayerContext` holds one `HTMLAudioElement` in a ref, shared site-wide. Calling `playTrack` from any page drives the fixed `PlayerBar`. The bar sets `--player-h` on the document element while a track is loaded, and the body reserves that much bottom padding, so pages carry no dead space when nothing is playing.

### Server pages, two client components

`/`, `/about`, `/services`, `/equipment`, and `/links` are pure server components. `/work` and `/contact` split in two: `page.tsx` exports `metadata` and renders a sibling `*Client.tsx` marked `'use client'`. Work drives the audio player and the hover plate; Contact reads `useSearchParams` inside a `Suspense` boundary, which the static export requires.

Per-route `metadata` sets `alternates.canonical` and an `openGraph` block built from `siteConfig.url`. New routes also go in `app/sitemap.ts`. Metadata routes (`sitemap.ts`, `robots.ts`, `manifest.ts`) carry `export const dynamic = 'force-static'`, which `output: 'export'` demands.

### Search

Ranking for mixing, voiceover, and equipment hire in Saudi Arabia and the GCC is a stated goal. `components/JsonLd.tsx` emits a `Person` and a `ProfessionalService` graph; the latter lists `siteConfig.areaServed` as countries, the two services as `Service`, and every equipment item as a priced `Product` offer in SAR. The root layout adds `geo.region` and `geo.placename` meta tags. Titles and descriptions name Jeddah and the service, written to be read aloud rather than as keyword strings. The levers that remain outside the code are in `DEPLOY.md` under After launch.

## Deployment

The site is a static export served by GitHub Pages from `mattar23/Mix-Website`, Maryam's repository, with Moad as a collaborator (push, not admin). `next.config.ts` sets `output: 'export'`, `trailingSlash: true`, `images.unoptimized`, and `basePath` from `NEXT_PUBLIC_BASE_PATH`. `.github/workflows/deploy.yml` builds and deploys on every push to `main`; its two `env` lines pick the preview address or the real domain. The human steps (visibility, Pages source, GoDaddy DNS, email forwarding) are in `DEPLOY.md`.

## Media

Source material lives outside the repo in `maryam_web_info/media_content`, including two 4K Nadine Jewellery campaign films under `NJ_PROD_MIX`, the 1080p `Blend in.mp4`, a 40 megapixel studio photograph, `DSCF2712.jpg`, and the red studio portrait `DSCF2076.jpeg`. The originals run to hundreds of megabytes, so nothing there is committed directly.

Web assets were derived with ffmpeg and Pillow. Stills are cropped to 3:2 to match the footage, resized to roughly 1800px wide, and saved as progressive JPEG at quality 80. Hover loops are five or six seconds, cropped to the same 3:2 frame, scaled to 1000px, stripped of audio, and encoded with libx264 at crf 31 with faststart.

The portrait Maryam chose for the home page, `public/images/maryam-portrait.jpg`, is a 1024 by 682 crop of `DSCF2076.jpeg` and the only copy that exists. It sits beside the headline on Home inside the `.hero` grid, capped at 40rem so it is never requested wider than its source, and as a small square on `/links`. `public/images/og-portrait.jpg` is a 1200 by 630 crop of the same frame for Open Graph and the JSON-LD `Person` image. The About page carries `maryam-session.jpg`, the dark background session photo she asked for there, cut 4:5 around the two figures at 1440 by 1800 from `DSCF2712.jpg`, as the tall panel in her About mockup.

The two Rawda campaign films play in full, with sound, in the Films section at the foot of the Work page. They are the finished spots carrying Maryam's music and mix, so the audio is only AAC encoded, never normalised or altered. Each is scaled to 1920px, encoded with libx264 at crf 24 capped at 5Mbps, AAC at 192k, faststart, with the camera timecode track dropped. That lands at 8 to 12MB each, which is why they use `preload="none"` behind a poster frame saved to `public/images/films/`.

`components/FilmPlate.tsx` keeps sound exclusive: a film pauses the track player when it starts, pauses itself when a track starts, and pauses any other film through a `ma:film-play` document event. Its caption reuses the `.track` row, so a playing film takes the accent like a playing track.

The plate is 3:2 because the sources are widescreen. The earlier 4:5 portrait plate discarded most of every frame, which is part of why the old images looked poor. The other part is that the original project files were roughly 220 by 110 pixel thumbnails being scaled up.

## Known gaps

The only enquiry path hands off to the visitor's mail client. The contact form composes a pre-filled `mailto:` with the submitted details, and the equipment page links into it with `?service=rental`. Nothing is silently dropped, but nothing is captured server-side either, so there is no record of an enquiry unless the visitor actually sends the mail. A form service would be the real fix, since there is no server.

`RENTAL_TERMS` is a plain-words draft of a standard hire agreement. Maryam has not approved it and no lawyer has read it.

Several `EquipmentItem` entries have no `image` field. The rate sheet does not show images, so this currently costs nothing, but the data is incomplete.

Two projects have no imagery and fall back to the tag card: Cloud Walker and the Athr Gallery open call. Cloud Walker's YouTube thumbnail crop was tried and rejected as too soft. Each needs a still or a clip from Maryam before it can carry a plate. The Music Commission restoration and the Wall of Sound sessions were removed from the Work page at Maryam's request on 2026-10-06.

`AudioSample.duration` is a hardcoded display string, not read from the file. Check it against `ffprobe` when adding a track; the first five were once listed at roughly half their real length.

An Arabic version of the pages with `hreflang` would be the biggest remaining lever for Saudi search. It is out of scope until Maryam asks.

## Conventions

- Import with the `@/*` alias mapped to `./src/*`.
- Images go through `next/image`; a raw `<img>` fails `next/core-web-vitals` lint.
- Play and pause are the only icons, drawn in `components/Glyph.tsx`. Do not reintroduce an icon dependency for a shape that can be two rects.
- Prices are integers in Saudi riyals with a `SAR` suffix in the name. Week rate is three times the day rate, and the copy says a week costs the same as three days.
- The services and equipment pages deep-link into the contact form with `/contact?service=<id>`. Unknown ids fall back to the first service. Preserve the `Suspense` boundary around `useSearchParams` or the build fails.
- **No dashes anywhere.** Maryam's brief is explicit: no em dash, no en dash, no `--`. This covers site copy, content in `src/data/`, code comments, commit messages, and class names. Use a comma, a colon, a full stop, or a rewrite. Year spans use a slash, as in `2022/23`. Ranges in prose read "2 to 3 tracks". List items take the square marker from `.speclist`, never a dash bullet. BEM modifiers use a single hyphen, so `.btn-solid`, not `.btn--solid`.
- CSS custom properties are the one exception, since `--ink` and the rest are required syntax and cannot be written any other way.
- Copy is written to be read aloud. Avoid keyword stuffing, middle-dot meta strings, and arrows appended to link text.
- `AGENTS.md` is generated and rewritten by `next dev`. Do not hand-edit it.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

All commands run from `website/` (the git repo root is `website/`, not the parent `maryam_attar/` folder).

```bash
npm run dev     # Next.js dev server on http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint (flat config, next/core-web-vitals + next/typescript)
npx tsc --noEmit  # typecheck; there is no npm script for this
```

There is no test runner, no test files, and no CI configured.

## What this is

A portfolio and equipment-hire site for Maryam Attar, a producer, sound designer, and audio engineer in Jeddah, Saudi Arabia. Six static routes: home, work, services, equipment, about, contact. Next.js 16 App Router, React 19, TypeScript strict. No database, no API routes, no backend.

Dependencies are deliberately minimal: `next`, `react`, `react-dom` and nothing else. There is no CSS framework, no icon library, no component library. Adding one needs a real reason.

The parent directory holds source material that is not part of the app: `M_CV/` (LaTeX CV) and `maryam_web_info/` (raw media, bio docs, the equipment inventory spreadsheet). Content in `src/data/` was derived from those; treat them as the upstream reference for content questions.

## Design

The site is built as a two-colour offset print document, closer to an album insert or exhibition catalogue than a product page. This is not decoration, it drives concrete rules:

- **No cards.** Structure comes from hairline rules, alignment, and the margin column. No element gets a border-radius, a drop shadow, or a bordered box that exists only to group things.
- **One spot colour.** `--spot` is Pantone Reflex Blue, and it marks exactly one thing: audio that is currently playing. It also serves focus rings. It never appears on headings, buttons, or links. If you find yourself reaching for the accent to make something stand out, that is the signal to fix hierarchy instead.
- **Metadata goes in the margin**, via the `.doc` grid, not in a label stacked above the content. This is why the site has no uppercase eyebrow labels, and it should stay that way.
- **No invented instrumentation.** An earlier version displayed a VU meter, a "tape running" light, and a sample-rate readout, none of which reflected anything real. Do not add indicators that are not driven by actual state.
- **Lists over grids.** Work is a typeset index, equipment is a rate sheet. Both beat a card grid for scanning and both are more honest about the content being a list.

Type is two variable families with distinct jobs, loaded in `app/layout.tsx`:

| Family | Role | Axis used |
|---|---|---|
| Archivo | display, interface, metadata | `wdth` 62 to 125, via `font-stretch` |
| Newsreader | prose and reading text | `opsz`, via `font-variation-settings` |

The width axis is where the personality lives. Headings set around `font-stretch: 118%`, metadata around `80%`. Do not swap in a static font and lose it.

### Styling

`app/globals.css` is the entire stylesheet: plain CSS, hand-organised into tokens, reset, typography, layout, components, and utilities, in that order. There is no Tailwind, no PostCSS plugin, no CSS-in-JS.

Colour, type scale, and rhythm are all custom properties on `:root`, overridden wholesale under `[data-theme="dark"]`. Components reference tokens (`var(--ink)`, `var(--rule)`), never raw hex. A hardcoded colour breaks dark mode silently.

Class names are semantic and BEM-ish (`.index__row`, `.sheet__rate`, `.doc__margin`). Inline `style` is used sparingly for one-off measures like a `maxWidth` on a single heading; anything reused belongs in the stylesheet.

Two traps worth knowing, both already hit once:

- The equipment table turns its rows into CSS grids under 720px. Desktop cell rules such as `width: 1%` on `.sheet__act` still apply there and will push content out of the viewport unless explicitly reset.
- Changing `display` on table elements drops their native semantics, which is why `EquipmentClient` carries explicit `role="table" / "row" / "cell" / "columnheader"` attributes. Keep them if you touch that markup.

When changing layout, check for horizontal overflow at 414px, 360px, and 320px. Comparing `documentElement.scrollWidth` against `clientWidth` in an iframe catches it quickly; headless screenshots at small window sizes do not, because the layout viewport can be wider than the captured image.

## Architecture

### Content lives in `src/data/`, never in components

Four typed modules are the single source of content truth. Pages import and render them; they do not inline copy or prices.

| Module | Exports | Consumed by |
|---|---|---|
| `data/equipment.ts` | `EquipmentItem`, `EQUIPMENT_INVENTORY`, `RENTAL_TERMS` | equipment page, rental drawer, JSON-LD offer catalog |
| `data/projects.ts` | `Project`, `PROJECTS`, `AudioSample`, `AUDIO_SAMPLES`, `Film`, `FILMS` | work page, home, audio player |
| `data/services.ts` | `ServiceDetail`, `SERVICES` | services page, contact form, JSON-LD offer catalog |
| `data/bio.ts` | `ARTIST_INFO` | about page, colophon, contact page |

`src/config/site.ts` holds site-level identity: canonical URL, description, keywords, socials. The URL reads `NEXT_PUBLIC_SITE_URL` and falls back to `https://maryamattar.com`. Metadata, sitemap, robots, manifest, and JSON-LD all derive from it.

Adding a piece of gear means adding one entry to `EQUIPMENT_INVENTORY`. It then appears in the rate sheet, the category filter, the search, the enquiry drawer, and the structured data automatically. Same for a project or a service.

A project is linked to its audio by matching `Project.audioSrc` against `AudioSample.src`, not by id. Keep those paths in sync or the listen control disappears from the work index.

`Project.image` is optional, and `Project.video` is an optional short muted loop. The work plate handles all three cases: a still, a still with a loop that plays while the row is hovered, or a typeset card built from the project's tags when there is no imagery at all. Never fill a gap by stretching a small file, which is what the card exists to prevent.

### Three global contexts, mounted once in the root layout

`app/layout.tsx` nests `ThemeProvider > AudioProvider > RentalProvider` around the masthead, page content, colophon, rental drawer, and player bar.

- **`ThemeContext`** sets light/dark. The `data-theme` attribute on `<html>` is the source of truth, set before paint by an inline script in `<head>` and persisted to `localStorage` under `ma-theme`. React does not own it: the provider subscribes with `useSyncExternalStore` and a `MutationObserver`. If you change the storage key or the attribute name, change the inline script too.
- **`AudioPlayerContext`** holds one `HTMLAudioElement` in a ref, shared site-wide. Calling `playTrack` from any page drives the fixed `PlayerBar`. The bar sets `--player-h` on the document element while a track is loaded, and the body reserves that much bottom padding, so pages carry no dead space when nothing is playing.
- **`RentalContext`** holds the equipment enquiry list. Persisted to `sessionStorage` under `maryam_rental_cart` (deliberately session-scoped). `addToCart` clamps quantity to `item.quantity`, which is physical stock, and opens `RentalDrawer`.

### Server page wrapper + client component

Routes needing interactivity split in two: `page.tsx` is a server component exporting only `metadata`, rendering a sibling `*Client.tsx` marked `'use client'`. That is `/work`, `/equipment`, and `/contact`. `/about` and `/services` are pure server components. `/` is a client component because it drives the audio player.

Per-route `metadata` sets `alternates.canonical` and an `openGraph` block built from `siteConfig.url`. New routes also go in `app/sitemap.ts`.

### SEO

Local discovery for equipment hire is a real goal, so the SEO layer matters. `components/JsonLd.tsx` emits a `Person` and a `ProfessionalService` graph, the latter building its offer catalog from `SERVICES` and the first ten `EQUIPMENT_INVENTORY` entries. `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts` are Next.js metadata routes.

## Media

Source material lives outside the repo in `maryam_web_info/media_content`, including two 4K Nadine Jewellery campaign films under `NJ_PROD_MIX`, the 1080p `Blend in.mp4`, and a 40 megapixel studio photograph, `DSCF2712.jpg`. The originals run to hundreds of megabytes, so nothing there is committed directly.

Web assets were derived with ffmpeg and Pillow. Stills are cropped to 3:2 to match the footage, resized to roughly 1800px wide, and saved as progressive JPEG at quality 80. Hover loops are five or six seconds, cropped to the same 3:2 frame, scaled to 1000px, stripped of audio, and encoded with libx264 at crf 31 with faststart. Both loops together come to under 270KB.

The two Rawda campaign films also play in full, with sound, in the Films section at the foot of the Work page. They are the finished spots carrying Maryam's music and mix, so the audio is only AAC encoded, never normalised or altered. Each is scaled to 1920px, encoded with libx264 at crf 24 capped at 5Mbps, AAC at 192k, faststart, with the camera timecode track dropped. That lands at 8 to 12MB each, which is why they use `preload="none"` behind a poster frame saved to `public/images/films/`.

The home page band is `rawda-reel.mp4`, a silent ten second loop of five shots from both films, cropped to the band's 16:7 frame at 1600px and encoded at crf 28 (about 800KB). It is muted by design, since sound on page load is hostile; its caption links to the films on `/work#films`. Under reduced motion it renders the poster still instead. Rebuilding it means picking shots inside the cut points, which `ffmpeg` scene detection (`select='gt(scene,0.25)'`) finds quickly.

`components/FilmPlate.tsx` keeps sound exclusive: a film pauses the track player when it starts, pauses itself when a track starts, and pauses any other film through a `ma:film-play` document event. Its caption reuses the `.track` row, so a playing film takes the spot colour like a playing track.

The plate is 3:2 because the sources are widescreen. The earlier 4:5 portrait plate discarded most of every frame, which is part of why the old images looked poor. The other part is that the original project files were roughly 220 by 110 pixel thumbnails being scaled up.

## Known gaps

Both enquiry paths hand off to the visitor's mail client rather than posting anywhere. The contact form and the rental drawer compose a pre-filled `mailto:` with the submitted details. Nothing is silently dropped, but nothing is captured server-side either, so there is no record of an enquiry unless the visitor actually sends the mail. A server action or form service would be the real fix.

Social URLs in `config/site.ts` and `data/bio.ts` are bare domain placeholders (`https://instagram.com` and similar) and feed the JSON-LD `sameAs` array. They need Maryam's real profile URLs.

Several `EquipmentItem` entries have no `image` field. The rate sheet does not show images, so this currently costs nothing, but the data is incomplete.

Three projects have no source imagery and fall back to the tag card: Cloud Walker for MDLBEAST, the Athr Gallery open call, and the Saudi Music Commission restoration. Each needs a still or a clip from Maryam before it can carry a plate. The thumbnails they used to point at were deleted rather than left in place, because they were too small to display honestly.

The home page portrait, `maryam-studio-portrait.jpg`, is only 1024 pixels wide and no larger original exists in the source folder. It no longer appears on the home page but is still the site's Open Graph image and the JSON-LD `Person` image, where a sharper frame would help. The about page photograph was rebuilt at 2400px from `DSCF2712.jpg`.

`AudioSample.duration` is a hardcoded display string, not read from the file. Check it against `ffprobe` when adding a track; the first five were once listed at roughly half their real length.

`JsonLd.tsx` hardcodes a phone number and geo coordinates that appear nowhere else in the site.

## Conventions

- Import with the `@/*` alias mapped to `./src/*`.
- Images go through `next/image`; a raw `<img>` fails `next/core-web-vitals` lint.
- Play and pause are the only icons, drawn in `components/Glyph.tsx`. Do not reintroduce an icon dependency for a shape that can be two rects.
- Prices are integers in Saudi riyals with a `SAR` suffix in the name. Week rate is three times the day rate, and the copy sells that as seven days for the price of three.
- The services page deep-links into the contact form with `/contact?service=<id>`, read via `useSearchParams` inside a `Suspense` boundary. Preserve the boundary or the build fails.
- **No dashes anywhere.** Maryam's brief is explicit: no em dash, no en dash, no `--`. This covers site copy, content in `src/data/`, code comments, commit messages, and class names. Use a comma, a colon, a full stop, or a rewrite. Year spans use a slash, as in `2022/23`. Ranges in prose read "2 to 3 tracks". List items take the square marker from `.speclist`, never a dash bullet. BEM modifiers use a single hyphen, so `.btn-solid`, not `.btn--solid`.
- CSS custom properties are the one exception, since `--ink` and the rest are required syntax and cannot be written any other way.
- Copy is written to be read aloud. Avoid keyword stuffing, middle-dot meta strings, and arrows appended to link text.
- `AGENTS.md` is generated and rewritten by `next dev`. Do not hand-edit it.

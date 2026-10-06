# Simplified Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Maryam Attar site as a light only, two service (mixing and voiceover) portfolio with a flat equipment rate sheet, draft hire terms, a complete Saudi and GCC metadata layer, and a static export deployable to GitHub Pages.

**Architecture:** Content stays in `src/data/`, pages render it. The theme system and the rental cart are deleted outright rather than hidden. Interactive client components shrink to the audio player and the Work page. The Next.js app becomes a static export so it can be served from GitHub Pages under the client's own account.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, plain CSS, Pillow for image derivation, GitHub Actions for deploy.

**Spec:** `docs/superpowers/specs/2026-10-06-simplified-redesign-design.md`

## Global Constraints

- No em dash, en dash, or `--` anywhere except CSS custom properties. Ranges read "2 to 3", year spans use a slash.
- No cards, border radius, shadows, uppercase eyebrow labels, icon libraries, or indicators not driven by real state.
- The accent `--spot: #b5653a` has exactly three jobs: current nav underline, the short rule above a page heading, playing audio. Plus focus rings and selection.
- Components reference tokens, never raw hex.
- Images go through `next/image`. A raw `<img>` fails lint.
- `useSearchParams` stays inside a `Suspense` boundary.
- Copy is written to be read aloud. No keyword lists in prose.
- Dependencies stay at `next`, `react`, `react-dom`.
- Repo root is `website/`. All commands run there. There is no test runner; the checks are `npm run build`, `npx tsc --noEmit`, `npm run lint`, and the greps in each task.

## Review Focus

1. Contact arriving at `/contact?service=production` (an old deep link) must fall back to the first service, not render an empty select. Pinned in Task 6.
2. The equipment sheet below 720px turns rows into grids. With the Add column gone, the grid template must change or the week rate lands in an empty fourth cell. Pinned in Task 5.
3. Static export with `trailingSlash: true` changes `/work#films` anchors to `/work/#films`. Every internal link with a hash must still land. Pinned in Task 9.
4. The portrait at 1024px must never be requested wider than its source. `sizes` on both uses must cap at the layout width. Pinned in Tasks 7 and 8.
5. The mobile menu kept its toggle, but the `.masthead__tools` cluster that held it is otherwise empty. The toggle must still show under 720px. Pinned in Task 2.

---

### Task 1: Derive the portrait and Open Graph image, remove the dead images

**Files:**
- Create: `public/images/maryam-portrait.jpg`, `public/images/og-portrait.jpg`
- Delete: `public/images/maryam-studio-portrait.jpg`, `public/images/maryam-session-collab.jpg`, `public/images/projects/cloud-walker.jpg`, `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`

**Interfaces:**
- Produces: `/images/maryam-portrait.jpg` (1024 by 683, 3:2) and `/images/og-portrait.jpg` (1200 by 630). Tasks 7, 8, 10 reference these paths.

- [ ] **Step 1: Derive both images with Pillow**

```bash
python3 -I - <<'EOF'
from PIL import Image
src = Image.open('../maryam_web_info/media_content/DSCF2076.jpeg').convert('RGB')
w, h = src.size  # 1024 x 683
# 3:2 at source width. 1024/683 is already 1.4993, so crop to 1024x682.
portrait = src.crop((0, 0, 1024, 682))
portrait.save('public/images/maryam-portrait.jpg', 'JPEG', quality=84, progressive=True, optimize=True)
# OG 1200x630: crop the source to 1.905:1 keeping the face (right of centre), then upscale 1.17x.
target = 1200 / 630
ch = int(w / target)  # 537
top = int((h - ch) * 0.35)
og = src.crop((0, top, w, top + ch)).resize((1200, 630), Image.LANCZOS)
og.save('public/images/og-portrait.jpg', 'JPEG', quality=82, progressive=True, optimize=True)
print(Image.open('public/images/maryam-portrait.jpg').size, Image.open('public/images/og-portrait.jpg').size)
EOF
```

Expected: `(1024, 682) (1200, 630)`

- [ ] **Step 2: Remove the images the redesign no longer uses**

```bash
git rm -q public/images/maryam-studio-portrait.jpg public/images/maryam-session-collab.jpg public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
rm -f public/images/projects/cloud-walker.jpg
```

- [ ] **Step 3: Confirm nothing in src still references a deleted file**

Run: `grep -rn "maryam-studio-portrait\|maryam-session-collab\|cloud-walker.jpg" src`
Expected: matches in `about/page.tsx`, `config/site.ts`, `JsonLd.tsx`, `data/projects.ts`. These are rewritten in Tasks 3, 8, and 10. Note them, do not fix here.

- [ ] **Step 4: Commit**

```bash
git add public/images
git commit -m "Derive the home portrait and Open Graph image from the red studio frame

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Light only palette, accent rule, theme system removed

**Files:**
- Modify: `src/app/globals.css` (tokens at lines 9 to 54, masthead at 218 to 304, tracks 390 to 427, player 627 to 699)
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Masthead.tsx`
- Delete: `src/components/ThemeContext.tsx`

**Interfaces:**
- Produces: CSS class `.accent-rule` (a 2.5rem by 1px bar in `--spot`, `margin-bottom: 1.5rem`). Pages in Tasks 5 to 8 place it above each `h1`.

- [ ] **Step 1: Replace the token block**

In `globals.css`, replace everything from `:root {` through the closing brace of `[data-theme="dark"] { ... }` with:

```css
:root {
  --paper:      #f1ede6;
  --paper-2:    #e6e1d8;
  --ink:        #0c0c0b;
  --ink-2:      #5f5a52;
  --ink-3:      #8a847b;
  --rule:       #d6d2cb;
  --rule-soft:  #e0dcd5;
  --spot:       #b5653a;
  --spot-ink:   #ffffff;

  --sans: var(--font-archivo), "Helvetica Neue", Helvetica, Arial, sans-serif;
  --serif: var(--font-newsreader), Georgia, "Times New Roman", serif;

  /* type scale */
  --t-micro: 0.6875rem;
  --t-fine:  0.8125rem;
  --t-body:  1.0625rem;
  --t-lead:  1.3125rem;
  --t-sub:   clamp(1.5rem, 2.6vw, 2.125rem);
  --t-head:  clamp(2.25rem, 6vw, 4rem);
  --t-hero:  clamp(2.75rem, 9.5vw, 8.25rem);

  /* measure + rhythm */
  --margin-col: 9.5rem;
  --gutter: 2.5rem;
  --page-x: clamp(1.25rem, 5vw, 4.5rem);
  --page-max: 84rem;
  --step: clamp(3.5rem, 9vw, 8rem);

  --player-h: 0px;
  color-scheme: light;
}
```

Update the file's header comment to read: "Maryam Attar, cream stock, near black ink, one rust accent. The accent marks the current page, the rule above a heading, and audio that is playing. Nothing else."

- [ ] **Step 2: Make the current nav item take the accent and add the accent rule class**

Find `.navlink[aria-current="page"]` and set its underline to `var(--spot)`:

```css
.navlink[aria-current="page"] {
  color: var(--ink);
  box-shadow: inset 0 -1px 0 0 var(--spot);
}
```

(Keep whatever underline mechanism the existing rule uses, only the colour changes to `var(--spot)`.) Then add after the `.rule-soft` line:

```css
/* The short bar above a page heading, as on the client's mockups. */
.accent-rule {
  display: block;
  width: 2.5rem;
  height: 1px;
  background: var(--spot);
  margin-bottom: 1.5rem;
}
```

- [ ] **Step 3: Remove the theme toggle and theme context**

`git rm src/components/ThemeContext.tsx`. In `Masthead.tsx`, delete the `useTheme` import, the `const { theme, toggleTheme } = useTheme();` line, and the `<button className="toolbtn" onClick={toggleTheme}>` element. Leave the rental button for now, Task 4 removes it.

In `layout.tsx`: delete the `ThemeProvider` import and wrapper, delete the `themeInit` constant and its `<script>` tag, remove `data-theme="light"` and `suppressHydrationWarning` from `<html>`, and set:

```ts
export const viewport: Viewport = {
  themeColor: '#f1ede6',
  width: 'device-width',
  initialScale: 1,
};
```

Update the comment above the removed script accordingly (delete it).

- [ ] **Step 4: Check the mobile menu still renders under 720px**

The `.masthead__menu` rule at about line 286 is `display: none` with a media query showing it under 720px. Confirm the media query still targets `.masthead__menu` and that `.masthead__tools` has no min-width or gap that leaves a visible hole when it holds one button. If `.masthead__tools` has `gap`, that is fine with one child.

- [ ] **Step 5: Typecheck, grep**

Run: `npx tsc --noEmit && grep -rn "data-theme\|useTheme\|ThemeProvider\|ma-theme\|001489" src`
Expected: tsc clean, grep returns nothing.

- [ ] **Step 6: Commit**

```bash
git add -A src/app/globals.css src/app/layout.tsx src/components/Masthead.tsx src/components/ThemeContext.tsx
git commit -m "Move to the client's light palette and remove the dark theme

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Content data rewritten from Maryam's documents

**Files:**
- Rewrite: `src/data/services.ts`
- Modify: `src/data/bio.ts`, `src/data/equipment.ts` (RENTAL_TERMS at line 255), `src/data/projects.ts` (line 28)

**Interfaces:**
- Produces: `ServiceDetail` with fields `id, title, shortDesc, fullDesc, includes?: string[], excludes?: string[], extras?: string[], requirements?: { heading: string; points: string[] }[], delivery?: string[]`. `SERVICES` has ids `'mixing'` and `'voiceover'`. `RENTAL_TERMS: { heading: string; body: string }[]`. `ARTIST_INFO` without `education`, `toolkit`, `capabilities`.

- [ ] **Step 1: Rewrite services.ts**

```ts
export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  includes?: string[];
  excludes?: string[];
  extras?: string[];
  requirements?: { heading: string; points: string[] }[];
  delivery?: string[];
}

// Copy below is Maryam's own, from "Wesbite Services.pages", lightly
// punctuated. Keep it in her voice when editing.
export const SERVICES: ServiceDetail[] = [
  {
    id: 'mixing',
    title: 'Mixing',
    shortDesc:
      'Build on what is already there: a finished mix ready for mastering that keeps the creative direction and the character of the track intact.',
    fullDesc:
      'I work with singles, EPs and albums. Sessions are preferably supplied as consolidated WAV multitracks. Ableton Live or Logic Pro project files can also be accepted.',
    requirements: [
      {
        heading: 'Session and file format',
        points: [
          'Supply consolidated WAV multitracks, exported from the same start point at the session’s native sample rate and bit depth.',
          'Alternatively, Ableton Live or Logic Pro sessions can be supplied as a zipped project folder containing all required audio files.',
        ],
      },
      {
        heading: 'Session organisation',
        points: [
          'Tracks should be clearly named and organised. Remove unused tracks, takes and files that are not intended to be part of the final mix.',
        ],
      },
      {
        heading: 'Rough mix and references',
        points: [
          'Include the latest producer or rough mix as a reference for the existing balance, production choices and effects.',
          'Provide a short playlist of reference tracks that reflect the sound, feel or overall direction you have in mind for the final mix.',
        ],
      },
      {
        heading: 'Effects and processing',
        points: [
          'Any effects or processing that are important to the production should be included. Where applicable, supply both wet and dry versions so the original choices can be referenced while keeping flexibility during the mix.',
        ],
      },
      {
        heading: 'Vocals and editing',
        points: [
          'Vocals should arrive comped, edited, cleaned and tuned where required. Minor corrective work is handled during the mix. Extensive comping, editing, pitch correction or cleanup is charged separately.',
        ],
      },
    ],
    delivery: [
      'Three rounds of revisions are included. Send revision notes as one consolidated list, with timestamps where applicable. Additional rounds are charged separately.',
      'The final approved mix is delivered as a high resolution WAV file ready for mastering.',
      'Turnaround depends on the size and complexity of the session and is confirmed before the project begins.',
      'Mastering is not included.',
    ],
    extras: [
      'Rush delivery, dependent on availability.',
      'Additional revision rounds beyond the three included.',
      'Mixed stems: processed stem groups such as drums, instruments, lead vocals and background vocals.',
      'Alternate versions: instrumental, a cappella, clean, performance or TV, and vocal up mixes.',
      'Vocal editing and tuning beyond the minor corrective work included in the mix.',
    ],
  },
  {
    id: 'voiceover',
    title: 'Podcast & Voiceover Mixing',
    shortDesc:
      'Editing, cleanup and mixing for podcasts, voiceovers and other spoken word recordings. Clear, consistent dialogue with a natural sound throughout.',
    fullDesc:
      'Audio can also be mixed and synced to supplied video where required. Turnaround and final delivery specifications are confirmed based on the requirements of each project.',
    includes: [
      'Dialogue editing',
      'EQ and compression',
      'De-essing',
      'Level balancing',
      'Minor noise, click and pop removal',
      'Light timing edits',
      'Mixing of supplied music and sound effects',
      'Final audio delivery to the required format',
    ],
    excludes: [
      'Source recordings should be clean and properly recorded before delivery.',
      'Extensive audio restoration and editorial or content editing are not included.',
    ],
  },
];
```

- [ ] **Step 2: Trim bio.ts**

Delete the `education`, `toolkit`, and `capabilities` arrays. Change `title` to `'Mixing and Voiceover Engineer'`. Everything else stays.

- [ ] **Step 3: Replace RENTAL_TERMS in equipment.ts**

Replace the `RENTAL_TERMS` object (line 255 to 260) with:

```ts
// Draft for Maryam's approval. Her own notes read "still figuring it out"
// for the terms, so this is a standard hire agreement summarised in plain
// words. Nothing here has been reviewed by a lawyer.
export const RENTAL_TERMS: { heading: string; body: string }[] = [
  {
    heading: 'Rental period and rates',
    body: 'Rates are per item, per day, in Saudi riyals. A week costs the same as three days. A day runs from collection to the same time the following day. Longer periods are quoted on request.',
  },
  {
    heading: 'Booking and deposit',
    body: 'A booking is confirmed once dates are agreed in writing and a refundable security deposit is paid. The deposit is returned after the equipment has been returned and inspected.',
  },
  {
    heading: 'Collection and return',
    body: 'Collection and return are arranged in Jeddah at agreed times. Delivery by courier can be arranged on request and is charged separately.',
  },
  {
    heading: 'Condition and inspection',
    body: 'All equipment is tested and cleaned before handover and inspected together at collection. Please report any fault on the day it appears.',
  },
  {
    heading: 'Damage and loss',
    body: 'The hirer is responsible for the equipment from collection to return. Repair or replacement at current retail cost is charged for damage beyond normal wear, loss, or theft, and may be deducted from the deposit.',
  },
  {
    heading: 'Late return',
    body: 'Equipment returned after the agreed time is charged at the day rate for each day or part day until it is back.',
  },
  {
    heading: 'Cancellation',
    body: 'Cancellation with at least 48 hours notice carries no charge. Later cancellation is charged one day at the agreed rate.',
  },
  {
    heading: 'Use and sub hire',
    body: 'Equipment is for the hirer’s own use and may not be lent or sub hired. Please use it as intended and keep it out of rain, sand, and direct heat.',
  },
  {
    heading: 'Governing law',
    body: 'This agreement is governed by the laws of the Kingdom of Saudi Arabia. The full agreement is signed at handover.',
  },
];
```

- [ ] **Step 4: Cloud Walker back to the tag card**

In `projects.ts`, delete the line `image: '/images/projects/cloud-walker.jpg',` added on 2026-09-30 (line 28).

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: errors only in `about/page.tsx`, `services/page.tsx`, `EquipmentClient.tsx`, `RentalDrawer.tsx`, `JsonLd.tsx`, `ContactClient.tsx` (consumers not yet updated). Note them. If any error is inside `src/data/`, fix it here.

- [ ] **Step 6: Commit**

```bash
git add src/data
git commit -m "Rewrite content data around mixing and voiceover, add draft hire terms

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Remove the rental cart

**Files:**
- Delete: `src/components/RentalContext.tsx`, `src/components/RentalDrawer.tsx`
- Modify: `src/app/layout.tsx`, `src/components/Masthead.tsx`, `src/app/globals.css` (drawer block at 700 to 758, `.toolbtn__count` at 281, `.chip` at 565 to 581, `.sheet__act` at 468)

- [ ] **Step 1: Delete the files and their mounts**

```bash
git rm -q src/components/RentalContext.tsx src/components/RentalDrawer.tsx
```

In `layout.tsx` delete the `RentalProvider` and `RentalDrawer` imports, the `<RentalProvider>` wrapper, and `<RentalDrawer />`. The body becomes:

```tsx
<AudioProvider>
  <Masthead />
  <main>{children}</main>
  <Colophon />
  <PlayerBar />
</AudioProvider>
```

In `Masthead.tsx` delete the `useRental` import, the `const { totalItems, setIsCartDrawerOpen } = useRental();` line, and the Enquiry button. `.masthead__tools` now holds only the menu toggle.

- [ ] **Step 2: Remove the dead CSS**

Delete the whole `/* ============ drawer ============ */` block, the `.toolbtn__count` rule, the `.chip` rules, and the `.sheet__act` rule plus any `.sheet__act` reset inside the under 720px media query of the sheet.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit 2>&1 | grep -v "about/page\|services/page\|EquipmentClient\|JsonLd\|ContactClient"`
Expected: no other errors. `EquipmentClient` still imports `useRental`; Task 5 replaces that file.

- [ ] **Step 4: Commit**

```bash
git add -A src/components src/app/layout.tsx src/app/globals.css
git commit -m "Remove the equipment enquiry cart and drawer

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: Equipment as a flat rate sheet with terms

**Files:**
- Rewrite: `src/app/equipment/page.tsx`
- Delete: `src/app/equipment/EquipmentClient.tsx`
- Modify: `src/app/globals.css` (sheet block 428 to 534)

- [ ] **Step 1: Write the server page**

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { EQUIPMENT_INVENTORY, RENTAL_TERMS } from '@/data/equipment';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Audio equipment rental in Jeddah',
  description:
    'Microphones, recorders, DI boxes, pedals, and amplifiers for hire in Jeddah, Saudi Arabia. Shure SM7B and SM57, Tascam Model 12, Cloudlifter, Radial. Day and week rates in riyals, terms published in full.',
  alternates: { canonical: `${siteConfig.url}/equipment` },
  openGraph: {
    title: 'Audio equipment rental in Jeddah | Maryam Attar',
    description: 'Studio and field recording gear for hire in Jeddah, with day and week rates.',
    url: `${siteConfig.url}/equipment`,
    images: [
      {
        url: `${siteConfig.url}/images/aesthetic/equipment-flightcase.jpg`,
        width: 1200,
        height: 630,
        alt: 'Audio equipment ready for hire in Jeddah',
      },
    ],
  },
};

const ORDER = [
  'Microphones',
  'Recording & Interfaces',
  'DI Boxes & Signal',
  'Guitar Pedals & FX',
  'Amplifiers',
  'Cables & Accessories',
] as const;

export default function EquipmentPage() {
  const groups = ORDER.map((category) => ({
    category,
    items: EQUIPMENT_INVENTORY.filter((item) => item.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <section className="wrap step">
        <span className="accent-rule" aria-hidden="true" />
        <h1 className="hero-type" style={{ maxWidth: '13ch' }}>
          Equipment for hire
        </h1>
        <div className="doc" style={{ marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
          <p className="meta doc__margin">Jeddah</p>
          <p className="prose">
            Gear Maryam records with, available to hire in Jeddah. Rates are per
            item, in Saudi riyals. A week costs the same as three days.
          </p>
        </div>
      </section>

      <section className="wrap step-b">
        {groups.map(({ category, items }) => (
          <table className="sheet" key={category}>
            <caption>{category}</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col" className="sheet__rate">Day</th>
                <th scope="col" className="sheet__rate">Week</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="sheet__name">{item.brand} {item.name}</span>
                    <span className="sheet__stock">{item.quantity} available</span>
                  </td>
                  <td className="sheet__rate">{item.dayRateSAR}</td>
                  <td className="sheet__rate">{item.weekRateSAR}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem' }}>
          <p className="meta doc__margin">Hire</p>
          <div className="stack stack-lg">
            <p className="prose">
              Tell us which items and which dates, and we will confirm availability,
              the deposit, and a collection time.
            </p>
            <Link className="btn btn-solid" href="/contact?service=rental">
              Enquire about hire
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap step-b" id="terms">
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem' }}>
          <p className="meta doc__margin">Terms</p>
          <div style={{ maxWidth: '44rem' }}>
            <p className="prose" style={{ marginBottom: '2rem' }}>
              The terms are summarised here. The full agreement is signed at handover.
            </p>
            <ol className="terms">
              {RENTAL_TERMS.map((t) => (
                <li key={t.heading}>
                  <p className="meta">{t.heading}</p>
                  <p className="prose prose-fine" style={{ marginTop: '0.35rem' }}>
                    {t.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
```

`git rm src/app/equipment/EquipmentClient.tsx`.

- [ ] **Step 2: Fix the sheet CSS for three columns and add the terms list**

In the sheet block: `.sheet__stock` becomes `display: block`. Remove any `nth-child(4)` rules. In the under 720px media query that turns rows into grids, set the row template to two columns, item spanning the first row and the two rates on the second:

```css
@media (max-width: 720px) {
  .sheet thead { display: none; }
  .sheet tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem 1rem;
    padding-block: 0.9rem;
    border-bottom: 1px solid var(--rule);
  }
  .sheet td { display: block; padding: 0; border: 0; }
  .sheet td:first-child { grid-column: 1 / -1; }
  .sheet td.sheet__rate { text-align: left; }
  .sheet td.sheet__rate::before { content: attr(data-label); }
}
```

Read the existing media query first and adapt to its structure rather than adding a second one. If the existing rule relies on `data-label`, add `data-label="Day"` and `data-label="Week"` to the two rate cells in the page; otherwise drop the `::before` line. Then add after `.speclist`:

```css
.terms { counter-reset: term; }
.terms li { position: relative; padding-left: 2.25rem; }
.terms li + li { margin-top: 1.5rem; }
.terms li::before {
  counter-increment: term;
  content: counter(term, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 0.15em;
  font-size: var(--t-micro);
  font-stretch: 80%;
  color: var(--ink-2);
}
```

- [ ] **Step 3: Check overflow under 720px**

Run `npm run dev` in the background, then:

```bash
node -e "
const { chromium } = require('playwright');" 2>/dev/null || echo "no playwright; use the iframe check in CLAUDE.md"
```

If Playwright is not installed, use a Python stdlib check instead: fetch `/equipment` with `curl` and visually open `http://localhost:3000/equipment` in the browser at 360px. Record the result in the commit message.

- [ ] **Step 4: Typecheck and commit**

Run: `npx tsc --noEmit 2>&1 | grep -v "about/page\|services/page\|JsonLd\|ContactClient"` then

```bash
git add -A src/app/equipment src/app/globals.css
git commit -m "Flatten the equipment page to a rate sheet with hire terms

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: Contact form tracks the two services and hire

**Files:**
- Modify: `src/app/contact/ContactClient.tsx`, `src/app/contact/page.tsx`

- [ ] **Step 1: Make the preset fall back when the id is unknown**

Replace the `preset` line with:

```ts
const requested = searchParams.get('service');
const known = SERVICES.some((s) => s.id === requested) || requested === 'rental';
const preset = known && requested ? requested : SERVICES[0].id;
```

- [ ] **Step 2: Rename the hire option and placeholder**

The select keeps the two services, then `<option value="rental">Equipment hire</option>` and `<option value="other">Something else</option>`. The message textarea placeholder becomes conditional:

```tsx
placeholder={
  form.service === 'rental'
    ? 'Which items, how many, and which dates?'
    : 'What are you making, who is it for, and where is it going?'
}
```

The intro paragraph becomes: "Mixing, podcast and voiceover work, or equipment hire in Jeddah. A sentence about the project is enough to start." Add `<span className="accent-rule" aria-hidden="true" />` above the `h1`.

- [ ] **Step 3: Page metadata**

```ts
title: 'Contact',
description:
  'Get in touch with Maryam Attar for mixing, podcast and voiceover mixing, or audio equipment hire in Jeddah, Saudi Arabia. Remote sessions across the GCC.',
```

OpenGraph description: "Book a mix, a voiceover session, or hire gear in Jeddah."

- [ ] **Step 4: Verify the fallback by hand**

Run `npm run dev` in the background and open `/contact?service=production`. The select must show Mixing. Open `/contact?service=rental`. The select shows Equipment hire and the placeholder asks for items and dates.

- [ ] **Step 5: Commit**

```bash
git add src/app/contact
git commit -m "Point the contact form at mixing, voiceover, and hire

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: Home page

**Files:**
- Rewrite: `src/app/page.tsx` (becomes a server component)
- Modify: `src/app/globals.css` (add `.hero` and `.trio` blocks in the layout section)

- [ ] **Step 1: Write the page**

```tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '@/data/services';

const ENTRIES = [
  ...SERVICES.map((s) => ({
    title: s.title,
    body: s.shortDesc,
    href: `/services#${s.id}`,
    cta: `About ${s.title.toLowerCase()}`,
  })),
  {
    title: 'Equipment Rental',
    body: 'Microphones, recorders, DI boxes, pedals, and amplifiers for hire in Jeddah, with day and week rates published in full.',
    href: '/equipment',
    cta: 'See the rate sheet',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="wrap step">
        <div className="hero">
          <div>
            <span className="accent-rule" aria-hidden="true" />
            <h1 className="hero-type" style={{ maxWidth: '12ch' }}>
              Sound for music, spaces, and moving images.
            </h1>
            <p className="prose" style={{ marginTop: '2rem', maxWidth: '34em' }}>
              Maryam Attar is a mixing and voiceover engineer in Jeddah, Saudi
              Arabia, working with artists, podcasters, and directors here and
              remotely across the Gulf.
            </p>
          </div>
          {/* The only portrait is 1024px wide, so it is held to a size it can
              carry rather than run full bleed. */}
          <div className="figure hero__portrait">
            <Image
              src="/images/maryam-portrait.jpg"
              alt="Maryam Attar at her desk in the studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40rem"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <ol className="trio">
          {ENTRIES.map((e, i) => (
            <li key={e.title}>
              <p className="meta num">0{i + 1}</p>
              <h2 className="display" style={{ marginTop: '0.75rem' }}>{e.title}</h2>
              <p className="prose prose-fine" style={{ marginTop: '1rem' }}>{e.body}</p>
              <p style={{ marginTop: '1.5rem' }}>
                <Link className="ul-link meta" href={e.href}>{e.cta}</Link>
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
```

Remove `'use client'`. Remove the imports for audio, reduced motion, glyph, projects, equipment.

- [ ] **Step 2: Add the layout CSS**

In the layout section of `globals.css`, after `.two-col`:

```css
/* home: headline beside the portrait */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 40rem);
  gap: var(--gutter);
  align-items: end;
}
.hero__portrait { aspect-ratio: 3 / 2; }
@media (max-width: 1024px) {
  .hero { grid-template-columns: minmax(0, 1fr); }
  .hero__portrait { max-width: 40rem; }
}

/* home: three entries divided by hairlines */
.trio {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-top: 2.5rem;
}
.trio > li { padding-right: var(--gutter); }
.trio > li + li { padding-left: var(--gutter); border-left: 1px solid var(--rule); }
.trio > li:last-child { padding-right: 0; }
@media (max-width: 760px) {
  .trio { grid-template-columns: minmax(0, 1fr); }
  .trio > li { padding: 0; }
  .trio > li + li { margin-top: 2.5rem; padding-top: 2.5rem; border-left: 0; border-top: 1px solid var(--rule); }
}
```

Remove the `.tracklist` rule and the `.lead` block (About stops using it, Task 8 reuses `.hero`).

- [ ] **Step 3: Typecheck and commit**

Run: `npx tsc --noEmit 2>&1 | grep -v "about/page\|services/page\|JsonLd"` then

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "Home page: portrait, one sentence, three entries

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8: Services and About pages

**Files:**
- Rewrite: `src/app/services/page.tsx`, `src/app/about/page.tsx`

- [ ] **Step 1: Services page**

```tsx
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICES } from '@/data/services';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Mixing and voiceover services',
  description:
    'Mixing for singles, EPs, and albums, and editing and mixing for podcasts and voiceovers, by Maryam Attar in Jeddah, Saudi Arabia. Remote sessions across the GCC, with delivery requirements listed.',
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: 'Mixing and voiceover services | Maryam Attar',
    description: 'What each session covers, what comes back, and how to prepare your files.',
    url: `${siteConfig.url}/services`,
  },
};

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <p className="meta">{heading}</p>
      <ul className="speclist" style={{ marginTop: '0.75rem' }}>
        {items.map((i) => (
          <li className="prose prose-fine" key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="wrap step">
        <span className="accent-rule" aria-hidden="true" />
        <h1 className="hero-type" style={{ maxWidth: '12ch' }}>Services</h1>
        <p className="prose" style={{ marginTop: '2rem', maxWidth: '34em' }}>
          Two kinds of session. Each lists what is included and how to prepare
          your files, so there are no surprises once we start.
        </p>
      </section>

      {SERVICES.map((service) => (
        <section className="wrap step-b" key={service.id} id={service.id} style={{ scrollMarginTop: '6rem' }}>
          <hr className="rule" />
          <div className="doc" style={{ paddingTop: '2.5rem' }}>
            <h2 className="margin-head doc__margin">{service.title}</h2>
            <div>
              <p className="prose" style={{ fontSize: 'var(--t-sub)', lineHeight: 1.32, maxWidth: '20em' }}>
                {service.shortDesc}
              </p>
              <p className="prose prose-fine" style={{ marginTop: '1.75rem', maxWidth: '44em' }}>
                {service.fullDesc}
              </p>

              <div className="two-col" style={{ marginTop: '3rem' }}>
                {service.includes && <List heading="Included" items={service.includes} />}
                {service.excludes && <List heading="Before you send" items={service.excludes} />}
                {service.requirements && (
                  <div className="stack stack-lg">
                    {service.requirements.map((r) => (
                      <List key={r.heading} heading={r.heading} items={r.points} />
                    ))}
                  </div>
                )}
                {(service.delivery || service.extras) && (
                  <div className="stack stack-lg">
                    {service.delivery && <List heading="Revisions and delivery" items={service.delivery} />}
                    {service.extras && <List heading="Optional extras" items={service.extras} />}
                  </div>
                )}
              </div>

              <p style={{ marginTop: '2.5rem' }}>
                <Link className="btn" href={`/contact?service=${service.id}`}>
                  Request a quote
                </Link>
              </p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
```

- [ ] **Step 2: About page**

```tsx
import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { ARTIST_INFO } from '@/data/bio';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Maryam Attar is a mixing and voiceover engineer in Jeddah, Saudi Arabia, with credits for MDLBEAST, Athr Gallery, Nadine Jewellery, and the Saudi Music Commission.',
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: 'About | Maryam Attar',
    description: 'A mixing and voiceover engineer in Jeddah, and the work behind the credits.',
    url: `${siteConfig.url}/about`,
    images: [
      { url: `${siteConfig.url}/images/og-portrait.jpg`, width: 1200, height: 630, alt: 'Maryam Attar in the studio' },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="wrap step">
        <span className="accent-rule" aria-hidden="true" />
        <h1 className="hero-type" style={{ maxWidth: '10ch' }}>Maryam Attar</h1>

        <div className="hero" style={{ marginTop: 'clamp(2.5rem, 6vw, 5rem)', alignItems: 'start' }}>
          <div className="doc">
            <p className="meta doc__margin">
              {ARTIST_INFO.title}
              <br />
              {ARTIST_INFO.location}
            </p>
            <div className="prose">
              {ARTIST_INFO.longBio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="figure hero__portrait">
            <Image
              src="/images/maryam-portrait.jpg"
              alt="Maryam Attar at her desk in the studio"
              fill
              sizes="(max-width: 1024px) 100vw, 40rem"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem' }}>
          <p className="meta doc__margin">Credits</p>
          <div className="index" style={{ borderTop: 0 }}>
            {ARTIST_INFO.clientsAndCredits.map((credit) => (
              <div className="index__row index__row-static" key={credit.name}>
                <span className="index__year">{credit.name}</span>
                <span className="prose prose-fine" style={{ maxWidth: '40ch' }}>{credit.detail}</span>
                <span />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Work page intro and metadata**

In `WorkClient.tsx`, the intro becomes "Commissions and collaborations across music, film, and exhibition." Add the accent rule above the `h1`. In `work/page.tsx`, description: "Selected work by Maryam Attar: mixing, voiceover, and original music for MDLBEAST, Athr Gallery, Nadine Jewellery, and Nur Taibah."

- [ ] **Step 4: Typecheck and commit**

Run: `npx tsc --noEmit 2>&1 | grep -v JsonLd` (expected clean apart from JsonLd), then

```bash
git add src/app/services src/app/about src/app/work
git commit -m "Services down to mixing and voiceover, About down to bio and credits

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9: Static export and GitHub Pages deploy

**Files:**
- Modify: `next.config.ts`
- Create: `public/CNAME`, `.github/workflows/deploy.yml`, `DEPLOY.md`
- Modify: `.gitignore` (add `out/`)

- [ ] **Step 1: Config**

```ts
import type { NextConfig } from 'next';

// Static export: the site has no server code, so it ships as files and is
// served from GitHub Pages under Maryam's own account.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

`echo maryamattar.co > public/CNAME`. Append `out/` to `.gitignore`.

- [ ] **Step 2: Workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://maryamattar.co
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: DEPLOY.md**

Write a walkthrough with these sections, in plain prose, no dashes: Maryam creates a GitHub account and an empty public repository named `maryamattar.co`, adds Moad as a collaborator; Moad adds the remote and pushes `main`; in Settings, Pages, set Source to GitHub Actions; wait for the first run; in Settings, Pages, enter `maryamattar.co` as the custom domain; at GoDaddy, DNS, replace the existing A records with 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 and add a CNAME `www` pointing to `<account>.github.io`; back in GitHub tick Enforce HTTPS once the DNS check passes (up to an hour); afterwards submit `https://maryamattar.co/sitemap.xml` in Google Search Console and Bing Webmaster Tools, and open a Google Business Profile for Jeddah. Include the note that every push to `main` redeploys within two minutes.

- [ ] **Step 4: Build and check the export**

Run: `npm run build && ls out && ls out/work out/equipment && cat out/CNAME && head -c 300 out/sitemap.xml`
Expected: `out/index.html`, `out/work/index.html`, `out/equipment/index.html`, `out/about/index.html`, `out/services/index.html`, `out/contact/index.html`, `out/sitemap.xml`, `out/robots.txt`, `out/manifest.webmanifest`, `out/CNAME`. Sitemap URLs start with `https://maryamattar.co` once Task 10 is done; before Task 10 they read `.com`, which is expected at this step.

- [ ] **Step 5: Confirm hash links survive trailing slashes**

Run: `grep -rn 'href="/[a-z]*#' src` and confirm each target id exists: `/services#mixing`, `/services#voiceover`, `/equipment#terms`. Next rewrites `/services#mixing` to `/services/#mixing` on export, which lands on the same id.

- [ ] **Step 6: Commit**

```bash
git add next.config.ts public/CNAME .github DEPLOY.md .gitignore
git commit -m "Export statically and deploy to GitHub Pages on push

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10: Metadata layer for Saudi Arabia and the GCC

**Files:**
- Modify: `src/config/site.ts`, `src/app/layout.tsx`, `src/components/JsonLd.tsx`, `src/components/Colophon.tsx`, `CLAUDE.md`

- [ ] **Step 1: site.ts**

```ts
export const siteConfig = {
  name: 'Maryam Attar',
  title: 'Maryam Attar, Mixing and Voiceover Engineer in Jeddah',
  description:
    'Mixing for records, editing and mixing for podcasts and voiceovers, and audio equipment hire in Jeddah, Saudi Arabia. Maryam Attar works with artists, podcasters, and directors across the Gulf, in person and remotely.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://maryamattar.co',
  ogImage: '/images/og-portrait.jpg',
  locale: 'en_US',
  alternateLocales: ['ar_SA'],
  author: {
    name: 'Maryam Attar',
    role: 'Mixing and Voiceover Engineer',
    email: 'maryamattarmusic@gmail.com',
    location: 'Jeddah, Saudi Arabia',
  },
  keywords: [
    'mixing engineer Jeddah',
    'mixing engineer Saudi Arabia',
    'online mixing GCC',
    'podcast editing Jeddah',
    'voiceover mixing Saudi Arabia',
    'audio equipment rental Jeddah',
    'microphone rental Jeddah',
    'Shure SM7B rental Saudi Arabia',
    'Maryam Attar',
  ],
  areaServed: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Bahrain', 'Kuwait', 'Oman'],
  socials: {
    instagram: 'https://www.instagram.com',
    soundcloud: 'https://soundcloud.com',
    linkedin: 'https://linkedin.com',
  },
};
```

- [ ] **Step 2: layout.tsx metadata**

Keep the existing `metadata` object, update `openGraph.images[0].alt` to "Maryam Attar in her Jeddah studio", `twitter` unchanged, and add:

```ts
other: {
  'geo.region': 'SA-02',
  'geo.placename': 'Jeddah',
},
```

- [ ] **Step 3: JsonLd.tsx**

```tsx
import React from 'react';
import { siteConfig } from '@/config/site';
import { EQUIPMENT_INVENTORY } from '@/data/equipment';
import { SERVICES } from '@/data/services';

export function JsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: 'Maryam Attar',
    alternateName: 'مريم عطار',
    jobTitle: siteConfig.author.role,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    email: siteConfig.author.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressRegion: 'Makkah Province',
      addressCountry: 'SA',
    },
    knowsAbout: ['Mixing', 'Podcast and voiceover mixing', 'Audio engineering', 'Audio equipment hire'],
    knowsLanguage: ['en', 'ar'],
    sameAs: Object.values(siteConfig.socials),
  };

  const business = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#business`,
    name: 'Maryam Attar, Mixing, Voiceover and Equipment Hire',
    url: siteConfig.url,
    image: `${siteConfig.url}/images/aesthetic/equipment-flightcase.jpg`,
    email: siteConfig.author.email,
    founder: { '@id': `${siteConfig.url}/#person` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressCountry: 'SA',
    },
    areaServed: [
      ...siteConfig.areaServed.map((name) => ({ '@type': 'Country', name })),
      { '@type': 'AdministrativeArea', name: 'Remote sessions worldwide' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services and equipment hire',
      itemListElement: [
        ...SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            serviceType: s.title,
            description: s.shortDesc,
            provider: { '@id': `${siteConfig.url}/#business` },
            areaServed: siteConfig.areaServed,
          },
        })),
        {
          '@type': 'OfferCatalog',
          name: 'Equipment hire, Jeddah',
          itemListElement: EQUIPMENT_INVENTORY.map((gear) => ({
            '@type': 'Offer',
            priceCurrency: 'SAR',
            price: gear.dayRateSAR,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: gear.dayRateSAR,
              priceCurrency: 'SAR',
              unitText: 'DAY',
            },
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Product',
              name: `${gear.brand} ${gear.name}`,
              description: gear.description,
              brand: { '@type': 'Brand', name: gear.brand },
            },
          })),
        },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
    </>
  );
}
```

- [ ] **Step 4: Colophon copy**

The colophon sentence becomes "Maryam Attar mixes records and voiceovers in Jeddah, and works remotely with artists and directors across the Gulf."

- [ ] **Step 5: CLAUDE.md**

Fix the fallback URL sentence to `.co`. Update: the "What this is" paragraph (mixing and voiceover engineer, equipment hire), the Design section (accent is rust `#b5653a` with three jobs, light only, no dark theme), Architecture (two contexts become one: `AudioProvider` only; `/equipment` is a server page; `/` is a server page), the data table (`RENTAL_TERMS` is an array, `SERVICES` has two entries, `ARTIST_INFO` lost the CV fields), Known gaps (cart removed, so the enquiry path is the contact form only; terms are a draft awaiting Maryam's approval; portrait resolution), Media (portrait files), and add a Deployment section pointing at `DEPLOY.md`. Remove the dark mode trap sentence ("A hardcoded colour breaks dark mode silently") and replace with "Components reference tokens, never raw hex."

- [ ] **Step 6: Full verification**

```bash
npx tsc --noEmit && npm run lint && npm run build
grep -rn "maryamattar.com\|RentalContext\|useRental\|data-theme\|001489\|maryam-studio-portrait\|maryam-session-collab" src CLAUDE.md ; echo "grep exit $? (1 means clean)"
grep -rnP "\x{2014}|\x{2013}" src ; echo "dash grep exit $? (1 means clean)"
grep -rn "\-\-" src --include=*.tsx --include=*.ts | grep -v "^\S*:\s*//" ; echo "double hyphen in tsx/ts exit $? (1 means clean)"
grep -o "https://maryamattar.co[^<]*" out/sitemap.xml
```

Expected: build passes, every grep prints exit 1, sitemap lists six `.co` URLs.

- [ ] **Step 7: Commit**

```bash
git add src/config/site.ts src/app/layout.tsx src/components/JsonLd.tsx src/components/Colophon.tsx CLAUDE.md
git commit -m "Metadata for Saudi Arabia and the GCC, canonical domain corrected to .co

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 11: Visual verification

**Files:** none modified unless a check fails.

- [ ] **Step 1: Serve the export and measure**

```bash
(cd out && python3 -m http.server 8123 >/dev/null 2>&1 &) ; sleep 1
```

Use the Chrome browser tools (or Playwright if available) to open each of the six routes at 1280px wide and record `document.documentElement.scrollHeight`. Then at 414, 360, and 320px record `scrollWidth > clientWidth`. Expected: no horizontal overflow anywhere; home, about, services, and equipment each shorter than the figures from the pre redesign build (measure `git stash` or the previous commit if numbers are needed, otherwise compare against the section counts in the spec).

- [ ] **Step 2: Eyeball the three accent uses**

On `/work` play a track: the row and the player take rust. The current nav item underline is rust. Each `h1` has the short rust bar above it. Nothing else on any page is rust.

- [ ] **Step 3: Fix anything found, commit, and stop the server**

```bash
pkill -f "http.server 8123"
```

Report results with the measured numbers.

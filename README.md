# Paris, in focus · Benny and Lindsay SS27 notebook

First edition: 2 October 2026. Paris Fashion Week Womenswear Spring/Summer 2027, 28 September–6 October 2026.

## What’s included

- Complete uploaded FHCM calendar revision 6: 101 entries, 67 shows and 34 presentations.
- Calendar date selector, entire-week view, Shows Only filter, show-page coverage filter, accent-insensitive house/designer search.
- Thirty completed show dossiers using the approved Notion handoff copy for September 28–October 1, plus the existing Chanel and Louis Vuitton previews.
- Designer portraits, personal biography, founder distinction, house context, tenure check, editorial expectations, prior-season reception, current news, runway videos, and separate press/community reception with source links.
- Seventeen primary YouTube embeds, with full runway recordings kept distinct from analysis and edited coverage.
- Twelve six-image SS27 carousels with arrow, keyboard and swipe navigation, individual captions and published credits.
- Reception emojis, evidence confidence and approved blurbs on all 30 reviewed dossiers, distinct from personal ratings.
- Approved Pulse dashboard: four expandable daily recaps, three cumulative Week So Far stories, seven trend cards, three rolling groups and a reception board.
- Manual refresh panel that copies a request to send in this chat. It does not claim to execute research from the browser.

## Page architecture

Each dossier has six numbered sections: (1) house/founder context, (2) expectations and prior-season reception, (3) recent news, (4) runway film, (5) critics and separate public conversation, (6) source ledger. A designer sidebar supplies portrait, bio and tenure. A visible tenure check distinguishes continuity, early transition and unconfirmed farewell speculation.

Presentations never get dossiers. The 30 completed handoff houses now have full dossiers; remaining unresearched runway houses remain plain schedule entries. Add new dossiers only after approving this structure or requesting more houses.

## Source policy

The uploaded calendar PDF controls every date, time, show/presentation distinction and broadcast note. Published press totals may differ; they do not override this revision. Times use Europe/Paris. “Time passed” reflects scheduled time, not independently confirmed occurrence.

the shared Notion determines the initial selection and supplied films. Fashion reporting is summarised with inline source links. Reddit/social comments are labelled by scope: collection, front-row styling, ambassador diary, prior season or insufficient evidence. Do not call a handful of fan comments a representative public consensus. No unannounced departure is treated as fact.

Expectations are explicitly editorial interpretations, reconstructed from source context; they are not claimed to have been written before the show. Brand communications establish official history and appointments, not independent critical reception.

External photos retain credit/source links and a graceful unavailable-image fallback. Rights remain with the original owners; there is no claimed open licence. Portraits are not necessarily current-season photos.

## Reusable content

The site is dependency-free static HTML/CSS/JavaScript. Content is isolated in `public/data/`:

- `schedule.json`: event id, brand, slug, ISO date, Paris start/end, type, invitation/access and broadcast note.
- `shows.json`: dossier fields, sources by paragraph, research state, portrait/image, video id and verification provenance.
- `sources.json`: source id, title, URL, source type, verified publication date when available, checked date.
- `pulse.json`: narrative introduction, cards, stories, source references and scope note.
- `meta.json`: edition date, season, calendar revision/counts and refresh policy.

Routes are bookmarkable hash URLs: `#schedule`, `#shows`, `#show/christian-dior`, `#pulse`, `#guide`. Hash routing avoids host-specific fallback configuration.

## Manual refresh workflow

1. Click **Refresh briefing**, choose scope, copy the request and send it in this chat.
2. Edit the site in this GitHub repository; preserve its identity and audience.
3. Re-read the shared Notion and browse new coverage. For each newly completed initial show, verify the video title and season; prefer the official house channel when available.
4. Check at least two independent reviews where available. Search date-matched Reddit/social discussions; record the actual sample and avoid confusing resort, menswear or celebrity looks with SS27 womenswear.
5. Update the appropriate paragraphs, direct citations and individual source checked dates. Resolve official appointments before changing tenure labels. Keep the supplied PDF authoritative unless a replacement calendar is supplied.
6. Rewrite the weekly pulse around material changes. Never fabricate a “miss” when evidence is thin.
7. Advance `updatedAt` only for content actually rechecked; verify data consistency and the affected views; republish the same Site.

Suggested request: “Refresh the Benny and Lindsay Paris Fashion Week SS27 site with reviews and public reception for the completed Notion shows, verified runway films, confirmed designer news, and the weekly pulse. Preserve the official revision 6 schedule and cite direct sources.”

## Verification

Run `node --check public/app.js` and `python3 validate.py`. Serve `public/` with a static server to inspect the UI. No dependency installation or build step is required. The repository’s `vercel.json` configures a dependency-free static deployment: no install or build command, the Other framework preset, and `public` as the output directory. Keep the Vercel Root Directory at the repository root. GitHub pushes to `main` trigger production deployments after the Vercel integration is connected. Custom domains and DNS are configured separately.

## Runway media model

The existing `shows.json` records retain their research fields. Media additions use `video_status` (`video_available`, `video_pending`, `upcoming`), `videoKind` (`runway_show`, `analysis`, `edited_coverage`), `videoTitle`, `videoOrigin`, `videoDuration`, `videoAlternates`, `mediaUpdatedAt`, and `images`.

Each image stores `image_url`, `image_source`, `photographer` (null when no individual is named), `image_credit` (the exact published agency/house credit), `source_url`, `alt_text`, and optional `look_number` and `gallery_position`. Source-selection and licensing notes stay separate. `galleryReference` preserves the requested Vogue collection reference; `mediaSource` is the accessible source actually used. `researchStatus: media_only` keeps added media pages distinct from the ten researched dossiers.

When a proper SS27 full-show film arrives, set the video and its verification fields, update `video_status` to `video_available`, and **keep `images` unchanged**. `media.js` renders video first, then the gallery and existing photograph. Images are remotely embedded through the existing workflow; no external media downloader or new image-storage service was introduced.

See `MEDIA-UPDATE.md` for all media sources, excluded clips, selection caveats, and rights checks. The original research date is preserved; the media update is recorded separately. The official calendar remains unchanged.

## Brand identity media

All 32 show cards use locally stored brand logos instead of designer portraits or initials. Profiles show the brand logo and retain the existing artistic director portrait when available. `shows.json` stores a separate `logo` object with local `url`, `source`, `credit`, `originalUrl`, `capturedFrom`, `checkedAt`, and `sha256` provenance. Logo assets live in `public/assets/logos/`; their proportions are preserved. Official header assets are used for 30 houses; Balenciaga uses its official wordmark from Wikimedia Commons, linked and credited separately. Balmain uses the replacement PNG supplied by the user after its original SVG appeared blank. Logos remain trademarks of their owners.

## Approved editorial handoffs · October 2 update

The existing show paragraph schema is retained; `format: approved_markdown` preserves supplied emphasis and inline source links. Show records add `role`, `showNotes`, `approvedReceipts`, `receiptNote`, editorial provenance and the four requested reception fields. Pulse records add `dailyRecaps`, `weekSoFar`, `groups`, `receptionKey`, and `trends` with `trend_name`, `trend_status` and `related_shows`. Older Pulse cards and stories remain in the data for compatibility and are not rendered by the new dashboard.

Recaps and trend details expand without truncating the approved copy. Group membership is supplied editorial selection, independent from rating; confidence is evidence quality. The only editorial adjustment is the user-approved alignment of Courrèges references with Drew Henry’s debut dossier. Its supplied positive rating and medium confidence remain. The sheerness trend’s related houses are mapped from explicit corsetry, exposed lingerie and sheer-trench references in approved show notes.

All original media and source records were checked against the pre-update snapshot and remain identical. The editorial copy was not re-researched. See `EDITORIAL-UPDATE.md` for the page list and implementation checks.

## Local development and repository layout

`public/` contains the editable static site source, including JavaScript, CSS, content data, local logos and the official calendar PDF. The original project called this directory `dist`, but it had no build pipeline or separate source tree. The migration preserves all of its contents byte-for-byte under `public/`.

From the repository root, run `python3 -m http.server 5173 --directory public` and open `http://127.0.0.1:5173/`. Validate changes with `node --check public/app.js`, `node --check public/media.js`, and `python3 validate.py`. No environment variables are required.

GitHub repository: https://github.com/bennyrad/paris-fw26. Local hosting metadata in `.openai/` was not migrated.

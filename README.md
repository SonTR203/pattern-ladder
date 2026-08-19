# The Pattern Ladder

A free, open study tool for anyone preparing for coding interviews. It takes
the NeetCode 150, groups the problems into 21 patterns, and works through them
in three passes — breadth first, then depth, then timed pressure — with
quizzes, company frequency data, and a mastery level per pattern. Code
templates are Java.

**Live at https://sontr203.github.io/pattern-ladder/** — nothing to install and
no account needed. Progress is saved in your own browser.

It does not assume a starting point. Everyone begins with nothing marked
solved, and you tick off what you already know as you go. The built-in schedule
spans six months of steady work, but nothing enforces that pace: problems are
ordered by how broadly companies ask them, so a shorter runway means stopping
earlier in each list rather than following a different plan.

Run it locally with the steps below if you want to change the content.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer. Check with `node -v`.

```bash
cd pattern-ladder
npm install
npm run dev
```

That prints a local address (usually `http://localhost:5173`) and opens it.
Leave the terminal running while you use the app; `Ctrl+C` stops it.

## Keep it running permanently

`npm run dev` only works while the terminal is open. For something you can
bookmark and forget about, build a static copy:

```bash
npm run build
npm run preview     # serves the built copy at http://localhost:4173
```

`npm run build` writes plain HTML/CSS/JS into `dist/`. That folder is fully
self-contained — you can drop it on any static host (Netlify, Cloudflare Pages,
Vercel) or serve it with `npx serve dist`.

## Deploying

The site deploys itself to GitHub Pages. Every push to `main` triggers
`.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and
publishes `dist/`. Takes about half a minute. You can also start a run by hand
from the repository's Actions tab, and check whether one succeeded there.

```bash
git push          # that is the whole deploy step
```

There is no `gh-pages` branch — Pages is set to `build_type: workflow`, so the
built artifact goes straight from the Actions run to the CDN. Nothing built is
ever committed, which is why `dist/` stays in `.gitignore`.

One wrinkle worth knowing if you change the repository name: project pages are
served from `/<repo>/` rather than the domain root, so the built HTML has to
request assets from `/pattern-ladder/assets/…`. That path is set by `base` in
`vite.config.js`, and it is conditional on the `GITHUB_ACTIONS` environment
variable so that local `npm run dev` and `npm run preview` keep working at the
root. Rename the repository and you must update that string, or the deployed
page will load a blank screen with 404s for its own JavaScript.

## Where your progress lives

There are no accounts and no server — nothing you do here is uploaded anywhere.
Everything is stored in your own browser's `localStorage` under the key
`pl:algo-lms-v2`. The app asks for `algo-lms-v2`; the `pl:` prefix is added by
the storage adapter, so that full string is what you need if you go looking in
devtools. Notes:

- It is per browser and per machine. Chrome on your laptop and Safari on your
  phone are separate.
- It is also per site. `localhost:5173` and `sontr203.github.io` are different
  origins, so progress made locally does not show up on the deployed site or
  the other way round.
- Clearing site data or browsing history erases it.
- Use **Export progress** on the Plan tab to save a JSON backup, and **Import
  progress** to load it somewhere else — moving between machines, or between
  the local copy and the live site.

`src/storage.js` implements this. It exposes a small async `window.storage` API
on top of `localStorage`, so `PatternLadder.jsx` never touches browser storage
directly and can be dropped into any host that provides the same interface.

## Files

```
index.html                     page shell
vite.config.js                 dev server port and the Pages base path
.github/workflows/deploy.yml   builds and publishes to GitHub Pages
src/main.jsx                   React entry point
src/storage.js                 localStorage adapter — the only local-only file
src/PatternLadder.jsx          the whole app: lessons, quizzes, company data, UI
```

Everything lives in `PatternLadder.jsx`, so it is one file to edit. A few
places you might want to change:

| What | Where to look |
|---|---|
| Lesson text, code templates, traps | the `MODULES` array |
| Quiz questions and explanations | each module's `quiz` array |
| Problems pre-ticked for a new visitor (empty by default) | `ALREADY_SOLVED` |
| Points per problem, level thresholds | `PTS`, `QUIZ_PTS`, `NOTE_PTS`, `LEVELS` |
| The three-pass week-by-week schedule | `PLAN` |
| Company tags | `CO` and `CT` |

The dev server hot-reloads, so edits appear as soon as you save.

## Company data

From a July 2026 snapshot of LeetCode's community company tags, filtered to
these 150 problems: 54 companies, 1,411 problem-company pairs, with a
last-six-months recency flag. These are candidate self-reports, so they lag
real interviews and cover only what people chose to post. Use them to
prioritise, not to predict.

To refresh later, re-scrape a current company-tag dump and regenerate the `CT`
array — same shape: one row per company, each entry `[problemIndex, code]`
where `code` is 1–5 for the 50–100% frequency buckets, plus 10 if the problem
was reported in the last six months.

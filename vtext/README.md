# VText — landing page

Ready-to-deploy landing page. Static, self-contained, no build step, no
external dependencies (no CDN, no fonts to fetch — it uses the system font).

## Files
- `index.html` — the page
- `landing.js` — hero demo animation (the “you said → clean text” loop)
- `i18n.js` — all copy + the language switcher (9 languages, auto-detects
  from the visitor’s browser, remembers their choice)

Keep the three files together in the same folder. Open `index.html` and it
just works.

## Deploy
It’s plain static hosting. Any of these is fine:
- Drop the folder into Netlify / Vercel / Cloudflare Pages / GitHub Pages.
- Or copy the three files to any web server (nginx/Apache) under one directory.

No environment variables, no server code.

## Before going live — 2 things to set
1. **Download link.** The “Download” buttons currently point to `#download`
   (placeholder). Search `index.html` for `href="#download"` (3 places: nav,
   hero, final CTA) and replace with the real download URL, e.g.
   `href="https://.../VText.dmg"`.

2. **Screenshots (optional).** There are none on the page right now. If you
   want to add product shots later, that’s a normal `<img>` — no special setup.

## Editing copy / languages
All text lives in `i18n.js` inside the `I18N` object, one block per language
(`en`, `ru`, `es`, `fr`, `de`, `pt`, `zh`, `ja`, `ar`). Edit the strings there;
the page picks them up automatically. To add a language, add a block with the
same keys and add an entry to the `LANGS` array at the top of the file.

## Notes
- Respects `prefers-reduced-motion`: the hero demo shows a static final state
  instead of looping for users who ask for reduced motion.
- Arabic switches the whole layout to right-to-left automatically.
- There is a single self-contained version too (everything inlined into one
  `.html`) if you’d rather host a single file — ask and it can be regenerated.

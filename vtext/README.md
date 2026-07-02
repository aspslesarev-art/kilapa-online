# kilapa.online/vtext (VText landing)

Static landing page for VText — a macOS menu-bar push-to-talk dictation app.

`index.html` is a self-contained export (i18n + reveal animations bundled inline, no build step).
`VText.dmg` is the downloadable app, linked from the page's download buttons.

## Deploy

Auto-deployed on Railway from this repo's `main` branch, served at `kilapa.online/vtext/`.

To ship a new app build: rebuild `VText.dmg` via `~/vtext/release.sh`, copy it over this one, commit, push.

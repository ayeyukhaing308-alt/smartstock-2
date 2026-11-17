# SmartStock V2

Offline-first retail inventory & POS (Burmese / English). Single-page app, no build step.

## Files (keep this structure)
Files (all in the repo root, no folders):
index.html, sw.js, manifest.webmanifest, .nojekyll, icon.svg, icon-192.png, icon-512.png, maskable-512.png

## Deploy (GitHub Pages)
Settings → Pages → Deploy from a branch → main / (root). Offline mode needs https (Pages is https).

## Turn on offline mode
Open the app → Settings → Offline mode → enable. After that it opens with no internet and can be installed to the home screen.

## After you change index.html
Edit `VERSION` in `sw.js` (e.g. `v2-2`) so users get the new version.

Data lives in each browser (IndexedDB). Use Backup & Restore to move it.

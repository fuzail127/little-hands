# Little Hands

The website for Little Hands: handmade clocks, natural candles, wax scent pouches and small workshops in Al Khobar.

Live at https://fuzail127.github.io/little-hands/ (Arabic at `/ar/`).

## Changing things

| To change | Edit |
|---|---|
| WhatsApp number, email, Instagram | `assets/config.js` |
| The pieces (names, descriptions, prices, photos) | `assets/products.js` |
| Workshops, and how many people have signed up | `assets/workshops.js` |
| Page wording | `index.html` (English) and `ar/index.html` (Arabic) |

After editing any of the three `assets/*.js` files, run:

```
node build.js
```

That writes the pieces, workshops and contacts into the HTML, so Google and AI assistants can read them. The page also redraws itself from the data files in the browser, so a change shows up for visitors even if the build step is forgotten.

### Adding a photo

1. Put the photo in `assets/photos/`, e.g. `assets/photos/wall-clock.jpg`. Square-ish photos around 1200px wide work best.
2. In `assets/products.js`, set that piece's `photo` to `"photos/wall-clock.jpg"`.
3. Run `node build.js`, then commit and push.

### Workshop sign-ups

Each workshop runs once `minimum` people (4) have signed up. Sign-ups arrive as WhatsApp messages. Raise `signedUp` in `assets/workshops.js` as they come in, and the candles on the page light up. At 4, the page says the class is on.

## Before sharing the link

1. Put the real WhatsApp number and email in `assets/config.js`.
2. Delete the `<meta name="robots" content="noindex">` line in both `index.html` and `ar/index.html`, so Google can list the site.
3. Run `node build.js`, commit and push.

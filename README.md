# Flip

A simple, ad-free currency converter. It opens on your currencies, works with no signal, and shows a green or red light for your connection.

Rates come from [open.er-api.com](https://www.exchangerate-api.com/docs/free) (free, no key needed, updated once a day). They are mid-market rates for guidance; banks and bureaux add their own margin.

## Put it online with GitHub Pages

1. Create a new **public** repository called `xe`.
2. Upload every file in this folder (not the folder itself) and commit.
3. Go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After a minute or two the app is live at `https://YOUR-USERNAME.github.io/xe/`.
5. On iPhone, open that address in Safari, tap **Share → Add to Home Screen**.

## See how many people use it (optional)

1. Make a free account at [goatcounter.com](https://www.goatcounter.com) and choose a code, for example `flipapp`.
2. In this repository, open `index.html`, tap the pencil to edit, and find the line near the top:
   `window.GOATCOUNTER_CODE="";`
3. Put your code between the quotes, for example `window.GOATCOUNTER_CODE="flipapp";`, and commit.

Your stats are then at `https://YOUR-CODE.goatcounter.com`.

## Updating the app

After changing any file, also change `flip-v1` to `flip-v2` (and so on) at the top of `sw.js`, so phones pick up the new version.

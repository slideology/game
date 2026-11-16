# Licenses and credits

## Original prototype

The game text, scoring, and interface written for this repository are released under the MIT License. See `LICENSE`.

Meridian is not affiliated with Chartered or playchartered.com. No questions, branding, or visual design were copied from that game.

## Natural Earth

Coastlines and country outlines are Natural Earth 1:50 million cultural vectors, version redistributed as TopoJSON.

Natural Earth is in the public domain. The authors ask only for a citation if you want to give one:

> Made with Natural Earth. Free vector and raster map data at naturalearthdata.com.

The file served by this app is `public/geo/countries-50m.json`. It is drawn in the browser. The app does not download, cache, or proxy map tiles.

## world-atlas

The TopoJSON file is the `countries-50m.json` artifact from `world-atlas` 2.0.2 by Michael Bostock, built from Natural Earth 4.1.0. The package code is ISC licensed:

```
Copyright 2013-2019 Michael Bostock

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
```

The geographic data inside the file remains Natural Earth public-domain data.

## Other libraries

- Next.js, React, and the other npm dependencies keep their own licenses. See `package.json` and `node_modules` after install.
- UI primitives come from shadcn/ui (Radix-based components in `src/components/ui`).
- Outfit and Fraunces are loaded through `next/font` and are licensed under the SIL Open Font License.

## Event sources

Each answer links to the pages used to check the year and the place. Publishers include Encyclopaedia Britannica, UNESCO, NASA, the US National Park Service, national libraries and museums, and scientific agencies. Those sites keep their own copyrights. This app links to them. It does not copy their text.

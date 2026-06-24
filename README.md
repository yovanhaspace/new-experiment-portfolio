# Yovanna Pineda — Portfolio

A single-page portfolio site for Dr. Yovanna Pineda, Associate Professor of History
at the University of Central Florida, generated from her 2025–2026 CV.

**Theme:** ancient Maya–inspired aesthetics (jade, obsidian, gold, terracotta, turquoise;
stepped-pyramid motifs and glyphs) — a nod to her career as a historian of Latin America —
with heavy animation throughout.

## Files
- `index.html` — the animated portfolio site
- `assets/style.css` — Maya-themed styling & keyframe animations
- `assets/main.js` — scroll reveals, typewriter, count-up stats, glyph constellation canvas, floating glyphs
- `cv.md` — the CV in Markdown
- `1-CV Pineda 2025-2026.pdf` — source CV

## View it
Open `index.html` in any modern browser, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Animation highlights
- Animated rotating glyph ring + shimmering gradient title in the hero
- Typewriter rotating through roles
- Scroll-progress bar and reveal-on-scroll for every section
- Count-up statistics
- Animated language proficiency bars
- Background glyph constellation (canvas) + drifting floating glyphs
- Hover shine on cards, sliding timeline & publication rows

Respects `prefers-reduced-motion` for accessibility.

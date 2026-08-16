# Run Strong — Clean Images v4

This package intentionally contains NO old cropped workout-sheet JPGs.

Exercise photos are loaded dynamically from the Free Exercise DB image library for every supported exercise and warm-up.

What you should see in this ZIP:
- index.html
- styles-v3.css
- app-v3.js
- sw.js
- manifest.webmanifest
- icon-192.png
- icon-512.png
- README.md

You should NOT see any photo-bench.jpg / photo-incline.jpg / photo-lateral.jpg / photo-ohp.jpg / photo-pushup.jpg files.


## v5 validation
- JavaScript syntax: PASS
- HTML asset references: PASS
- Required files: PASS
- Old cropped workout-sheet images: NOT INCLUDED


## v6 — Supersets restored
- Warm-ups flow directly into the next movement with no forced rest.
- Supersets alternate exercise 1 → exercise 2 → rest, then repeat.
- Circuits move through all exercises before resting.
- Heavy solo lifts keep their full rest periods.
- Workout preview labels WARM-UP / SOLO / SUPERSET / CIRCUIT so you know the structure before starting.


## v7 flow fix
This build hard-enforces workout flow:
- Warm-ups NEVER trigger a rest screen.
- Superset exercise 1 ALWAYS advances directly to exercise 2.
- Rest occurs only after the last exercise in the superset/circuit round.
- Legacy schedule/workout IDs are resolved by workout name.
- Unknown/custom workout plans automatically pair exercises into supersets instead of defaulting every exercise to solo.
- Guided screen explicitly says NO REST / SUPERSET — NO REST / REST AFTER SET.


## v8 Recovery routines
- Recovery tab now starts with two clickable routine cards:
  - Quick Recovery — 5 min
  - Full Recovery — 12–15 min
- Guided recovery shows one movement at a time with pictures, video, cues, progress, Previous/Next, and timers.
- Existing individual recovery exercise library remains below.
- Strength workout flow and superset logic are unchanged from v7.

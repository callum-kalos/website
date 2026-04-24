# Kalos 4-Week Projection Calculator — Webflow Embed

Self-contained HTML/CSS/JS export of the projection calculator for use inside a Webflow page.

## How to install in Webflow

1. Drag an **Embed** element (Add panel → Components → Embed) onto the page where the calculator should appear.
2. Open `projection-calculator.html` from this folder and copy the **entire file contents**.
3. Paste into the Embed element's code editor and click **Save & Close**.
4. Publish the site.

That's it — no external scripts, no fonts to load, no build step. The calculator renders with the Kalos dark/blue theme out of the box.

## What it contains

- **Quiz step** — sex, training days per week, age range.
- **Capture step** — first name, last name, email, phone (optional).
- **Results step** — Lean Mass (+lbs), Body Fat (-lbs), Body Fat % (change), Visceral Fat (-g). Includes a headline tailored to the cohort plus a "Book My Scan" CTA.

The CTA currently links to `#pricing` — change it in the HTML if the Webflow page uses a different anchor or URL.

## Wiring up the form submit

On submit, the script logs the payload to the browser console and shows the results. To send the data to a CRM / backend, edit the `fetch` TODO inside the `<script>` block near the bottom of the file. Example:

```js
fetch('https://your-endpoint.example.com/projections', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
```

Webflow Forms can also capture this: replace the `<form>` with a Webflow form that posts natively, but you'll need to carry the state (gender / age / days) as hidden inputs.

## Data

Cohort averages are baked into the `baseline` object in the script. They come from a dataset of ~830 real Kalos members, grouped by sex × age bucket. A training-frequency multiplier is applied on top:

| Days / week | Multiplier |
| --- | --- |
| 2   | 1.00× |
| 3   | 1.15× |
| 4   | 1.30× |
| 5+  | 1.45× |

## Size

~18 KB. Webflow's Embed limit is 50,000 characters, so this fits comfortably.

## Styling scope

All CSS is scoped to `.kalos-projection` so it will not collide with other Webflow page styles. To customize spacing or colors, edit the CSS variables at the top of the `<style>` block (`--kp-accent`, `--kp-bg`, etc.).

# Kalos Webflow Embeds

Self-contained HTML/CSS/JS exports of interactive components from the Kalos site, for use inside Webflow pages. Each file is a single drop-in `<Embed>`: no external scripts, no fonts, no build step.

| File | What it is |
| --- | --- |
| `projection-calculator.html` | 4-week projection quiz → capture → results |
| `framework-triangle.html` | Interactive Kalos Framework triangle + three hover info boxes |
| `pyramids.html` | 80-16-3-1 prioritization pyramids (Nutrition + Exercise) |
| `dexa-progress-chart.html` | 12-month DEXA progress chart with hover tooltips per scan |
| `icons/` | All Lucide icons used on the site, as individual `.svg` files |
| `HANDOFF.md` | Install + ActiveCampaign integration steps for the designer |

## How to install either embed in Webflow

1. Drag an **Embed** element (Add panel → Components → Embed) onto the page where the component should appear.
2. Open the `.html` file, select all (Cmd+A), copy (Cmd+C).
3. Paste into the Embed element's code editor and click **Save & Close**.
4. Publish the site.

Both embeds render with the Kalos dark/blue theme out of the box. All CSS is scoped (`.kalos-projection` and `.kalos-framework` respectively) so they will not collide with Webflow's page styles.

---

## `projection-calculator.html`

**What it contains:**
- **Quiz step** — sex, training days per week, age range.
- **Capture step** — first name, last name, email, phone (optional).
- **Results step** — Lean Mass (+lbs), Body Fat (-lbs), Body Fat % (change), Visceral Fat (-g). Includes a headline tailored to the cohort plus a "Book My Scan" CTA.

The CTA currently links to `#pricing` — change it in the HTML if the Webflow page uses a different anchor or URL.

### Wiring up the form submit

On submit, the script logs the payload to the browser console and shows the results. See **HANDOFF.md** for step-by-step instructions to wire it into ActiveCampaign using the native embedded-form action URL.

### Data

Cohort averages are baked into the `baseline` object in the script. They come from a dataset of ~830 real Kalos members, grouped by sex × age bucket. A training-frequency multiplier is applied on top:

| Days / week | Multiplier |
| --- | --- |
| 2   | 1.00× |
| 3   | 1.15× |
| 4   | 1.30× |
| 5+  | 1.45× |

**Size:** ~18 KB (Webflow's Embed limit is 50,000 characters, so this fits comfortably).

---

## `framework-triangle.html`

**What it contains:**
- SVG triangle with three vertices (Aesthetics / Longevity / Performance) and an inner shape that represents the user's current "triangle."
- Three numbered information cards on the right. **Hovering** (or tapping on mobile) a card animates the inner triangle to the shape for that stage.

The three stages are:
1. *Where most people start* — small triangle
2. *After your first four weeks* — mid-size triangle
3. *Where Kalos takes you* — large triangle

There is no form, no submission logic, no CTA — this is a pure interactive visual.

**Size:** ~7 KB.

---

## Styling scope

All CSS is namespaced:
- Projection calculator: `.kalos-projection`
- Framework triangle: `.kalos-framework`

To customize spacing or colors, edit the CSS variables at the top of each component's `<style>` block (`--kp-accent`, `--kf-accent`, etc.).

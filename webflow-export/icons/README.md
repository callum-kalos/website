# Kalos Icons (Lucide)

All icons used across the Kalos site, exported as individual `.svg` files. Source: [Lucide](https://lucide.dev) (MIT-licensed, free to use).

## How to use in Webflow

- **Upload as assets**: Drag an `.svg` into Webflow's Asset panel, then drop it onto the page as an Image element. Resize/recolor using Webflow's built-in controls.
- **Inline SVG (recommended for CSS control)**: Open the `.svg` in any text editor, copy the `<svg>…</svg>` block, paste into a Webflow **Embed** element. Now you can style `stroke`, `fill`, `width` etc. with CSS.

All icons use `stroke="currentColor"` so they automatically inherit the color of whatever parent element they sit inside.

## Icon mapping — where each one is used on the site

### "How It Works" — three-step section

| Label | File |
| --- | --- |
| Scan | `scan-line.svg` |
| Understand | `users.svg` |
| Decide | `compass.svg` |

### "What we measure" — body composition metric tiles

| Label | File |
| --- | --- |
| Body Fat % | `activity.svg` |
| Visceral Fat | `heart.svg` |
| Lean Tissue | `dumbbell.svg` |
| ALMI | `scale.svg` |
| Bone Density | `bone.svg` |
| Imbalances | `arrow-left-right.svg` |

### Navigation & general UI

| Purpose | File |
| --- | --- |
| Menu (hamburger) | `menu.svg` |
| Close | `x.svg` |
| Location pin | `map-pin.svg` |
| Arrow right (CTAs) | `arrow-right.svg` |
| Arrow left | `arrow-left.svg` |
| Chevron down (expand) | `chevron-down.svg` |
| Chevron left / right (carousel) | `chevron-left.svg` / `chevron-right.svg` |
| Play button (video) | `play.svg` |
| Checkmark | `check.svg` |
| Plus / Minus (FAQ) | `plus.svg` / `minus.svg` |
| Star (ratings) | `star.svg` |
| Quote mark | `quote.svg` |
| Reset (results calculator) | `rotate-ccw.svg` |
| Camera (placeholder) | `camera.svg` |
| User / Users | `user.svg` / `users.svg` |
| Clock | `clock.svg` |
| Trending up / down (results) | `trending-up.svg` / `trending-down.svg` |
| Database (data callouts) | `database.svg` |
| Bar chart (stats) | `bar-chart-3.svg` |
| Trophy (achievement) | `trophy.svg` |
| Car / Train (getting here) | `car.svg` / `train.svg` |
| Scan (generic) | `scan.svg` |

## Need a different icon?

Full Lucide icon library: **https://lucide.dev** — 1,500+ free icons, same visual style. Your designer can search there and download any additional `.svg` directly.

## Recoloring

To change the color in Webflow:

- **Image element**: use Webflow's color override on the image, or wrap in a div and set `color`.
- **Inline SVG**: set CSS `color: <any-color>` on the parent element. Since the SVG uses `stroke="currentColor"`, it inherits automatically.

## Sizing

All icons are 24×24 by default. To resize in CSS:

```css
svg { width: 32px; height: 32px; }
```

Or set `width`/`height` attributes directly on the `<svg>` tag.

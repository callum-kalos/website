# Kalos Projection Calculator → Webflow + ActiveCampaign

Two things to do:

1. **Install the calculator in Webflow.**
2. **Wire submissions into ActiveCampaign** (using AC's native embedded-form integration).

---

## 1. Install in Webflow

**The file**: [`projection-calculator.html`](./projection-calculator.html)
(on GitHub — click **Raw** then **Save As…** to download)

**Steps:**

1. Open the Webflow page where the calculator should appear.
2. Drag an **Embed** element onto the page (Add panel → Components → Embed).
3. Open `projection-calculator.html` in any text editor, select all (Cmd+A), copy (Cmd+C).
4. Paste the whole thing into the Webflow Embed editor → **Save & Close**.
5. Publish the site.

That's it. It's self-contained: no external scripts, no fonts to load, no build step.
The CSS is scoped to `.kalos-projection` so it will not collide with Webflow's page styles.

**CTA link**: the "Book My Scan" button links to `#pricing` by default. Change that in the HTML if the Webflow page uses a different anchor or URL.

---

## 2. Hook it up to ActiveCampaign

We'll use ActiveCampaign's **embedded form action URL** (the "Manual HTML" export). Our custom UI POSTs directly to AC — no API key, no backend.

### Step A — Set up in ActiveCampaign

1. **Enable Site Tracking** (one-time): Settings → Tracking → enable Site Tracking, whitelist the Webflow domain.
2. **Add three custom contact fields** (Contacts → Manage fields → Add):
   - `Gender` (Text)
   - `Age bucket` (Text)
   - `Training days per week` (Text)
3. **Create a new Inline form**: Forms → New form → **Inline form** → include these fields:
   - First name
   - Last name
   - Email
   - Phone
   - Gender
   - Age bucket
   - Training days per week
4. Pick the list the submissions should land on (e.g. *"Projection calculator leads"*) and any tag you want auto-applied (e.g. `projection-calculator`).
5. Save the form.
6. On the **Integrate** tab, click **Manual HTML**.

### Step B — Pull these values out of the Manual HTML snippet

AC will show you a raw `<form>` block. Copy these into a note somewhere:

| From AC | Looks like |
| --- | --- |
| `action="…"` URL | `https://kalos.activehosted.com/proc.php` |
| Hidden input `u` | `1` (a number) |
| Hidden input `f` | `3` (a number — this is the form ID) |
| Hidden input `s` | usually blank |
| Hidden input `c` | usually `0` |
| Hidden input `m` | usually `0` |
| Hidden input `act` | `sub` |
| Hidden input `v` | `2` |
| The `name=` attribute on each field | e.g. `fullname`, `email`, `phone`, `field[1]`, `field[2]`, `field[3]` |

The custom field names look like `field[1]`, `field[2]`, `field[3]` — note which number maps to which field (Gender / Age bucket / Training days).

### Step C — Wire it into the embed

Open the Embed in Webflow and find this block near the bottom of the `<script>`:

```js
root.querySelector('form[data-view="capture"]').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = e.target;
  var payload = { … };
  // TODO: wire this to your CRM / backend. Example:
  // fetch('/api/projections', { method: 'POST', ... });
  console.log('[Kalos projection] submit', payload);
  renderResults();
  showView('results');
});
```

**Replace that handler with this** (fill in the values from Step B where you see `<<REPLACE>>`):

```js
root.querySelector('form[data-view="capture"]').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = e.target;

  // Build the payload AC expects
  var body = new FormData();
  body.append('u',   '<<REPLACE_U>>');
  body.append('f',   '<<REPLACE_F>>');
  body.append('s',   '');
  body.append('c',   '0');
  body.append('m',   '0');
  body.append('act', 'sub');
  body.append('v',   '2');

  body.append('fullname', form.firstName.value + ' ' + form.lastName.value);
  body.append('email',    form.email.value);
  body.append('phone',    form.phone.value);

  // Custom fields — replace field[N] numbers with whatever AC assigned
  body.append('field[<<GENDER_FIELD_NUM>>]',   state.gender);
  body.append('field[<<AGE_FIELD_NUM>>]',      state.age);
  body.append('field[<<DAYS_FIELD_NUM>>]',     state.days);

  // Fire-and-forget POST (no-cors because AC doesn't return CORS headers)
  fetch('<<REPLACE_ACTION_URL>>', {
    method: 'POST',
    mode: 'no-cors',
    body: body
  }).catch(function() { /* silent — we still show results */ });

  // Reference `state` is defined earlier in the script
  renderResults();
  showView('results');
});
```

Republish Webflow and submit a test. The contact should appear in AC within a couple of seconds, on the list you picked, with gender/age/training-days custom fields populated.

### Gotchas to know about

- **`mode: 'no-cors'`** is required — AC's endpoint doesn't send CORS headers, so the browser can't read the response. That's fine; the POST still reaches them.
- If AC has **double-opt-in** turned on for this list, the contact won't be marked "active" until they click the confirmation email. Turn it off under the form's options if you want instant lead capture.
- **spam protection**: AC sometimes requires a `__utmz` tracking cookie. If you see submissions getting flagged, enable Site Tracking (Step A item 1) on the Webflow domain — that drops the cookie automatically.
- **`field[N]` numbers** are account-specific. The only way to know them is to look at the Manual HTML snippet AC gives you.

---

## Questions?

Ping Callum — he can ping the engineer who built the embed.

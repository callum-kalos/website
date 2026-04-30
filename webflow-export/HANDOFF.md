# Kalos Projection Calculator → Webflow + ActiveCampaign

Two things to do:

1. **Install the calculator in Webflow.**
2. **Hook submissions up to ActiveCampaign** (direct, no Zapier).

---

## 1. Install in Webflow

**The file**: [`projection-calculator.html`](./projection-calculator.html)
(on GitHub, click **Raw** then **Save As…** to download, or just select-all and copy)

**Steps:**

1. Open the Webflow page where the calculator should appear.
2. Drag an **Embed** element onto the page (Add panel → Components → Embed).
3. Open `projection-calculator.html` in any text editor, select all (Cmd+A), copy (Cmd+C).
4. Paste the whole thing into the Webflow Embed editor → **Save & Close**.
5. Publish the site.

That's it. It's self-contained: no external scripts, no fonts to load, no build step. The CSS is scoped to `.kalos-projection` so it will not collide with Webflow's page styles.

The "Book Now" CTA on the results step already points at `https://www.livekalos.com/book-now`. Change that in the HTML if it should go somewhere else.

---

## 2. Hook submissions into ActiveCampaign

Submissions POST directly to your AC form's action URL (`proc.php`). No Zapier, no API key, no backend. The user sees their results immediately, the network call is fire-and-forget.

### Step A, Set up custom fields in AC

In ActiveCampaign, go to **Contacts → Manage fields → Add a field** and create eight Text custom fields:

- `Gender`
- `Age bucket`
- `Training days per week`
- `UTM Source`
- `UTM Medium`
- `UTM Campaign`
- `UTM Content`
- `UTM Term`

### Step B, Create the AC form

1. **Forms → New form** → pick **Inline form**.
2. Add these fields to the form:
   - First name, Last name, Email, Phone (the standard contact fields)
   - All eight custom fields you just created
3. Pick the list submissions should land on (e.g. *"Projection calculator leads"*) and any tag you want auto-applied (e.g. `projection-calculator`).
4. Save the form.
5. On the **Integrate** tab, click **Manual HTML**. AC shows you a raw `<form>` snippet, keep this open in a tab, you'll need values out of it in the next step.

### Step C, Pull these values out of the Manual HTML

Open the Manual HTML view and grab:

| What | Looks like in the HTML | Where to find it |
| --- | --- | --- |
| Action URL | `<form action="https://kalos.activehosted.com/proc.php" ...>` | Top of the snippet |
| `u` value | `<input type="hidden" name="u" value="1">` | One of the hidden inputs |
| `f` value | `<input type="hidden" name="f" value="3">` | One of the hidden inputs (this is the form ID) |
| Custom field IDs | `<input ... name="field[12]" ...>` | Each custom field appears as `field[N]`, note which N belongs to which field |

For each custom field, AC's HTML will show the field's label nearby (or you can hover the field input to see its name). Match each custom field to its `N`:

| Custom field | `field[N]` value |
| --- | --- |
| Gender | _____ |
| Age bucket | _____ |
| Training days per week | _____ |
| UTM Source | _____ |
| UTM Medium | _____ |
| UTM Campaign | _____ |
| UTM Content | _____ |
| UTM Term | _____ |

### Step D, Paste those values into the embed

Open the pasted Embed in Webflow and find this config block near the top of the `<script>` (it's the very first thing in the script):

```js
var AC_CONFIG = {
  actionUrl: '<<REPLACE_WITH_AC_FORM_ACTION_URL>>',
  uId:       '<<REPLACE_WITH_U_VALUE>>',
  formId:    '<<REPLACE_WITH_F_VALUE>>',
  fields: {
    gender:       '<<REPLACE_GENDER_FIELD_ID>>',
    ageBucket:    '<<REPLACE_AGE_FIELD_ID>>',
    trainingDays: '<<REPLACE_DAYS_FIELD_ID>>',
    utm_source:   '<<REPLACE_UTM_SOURCE_FIELD_ID>>',
    utm_medium:   '<<REPLACE_UTM_MEDIUM_FIELD_ID>>',
    utm_campaign: '<<REPLACE_UTM_CAMPAIGN_FIELD_ID>>',
    utm_content:  '<<REPLACE_UTM_CONTENT_FIELD_ID>>',
    utm_term:     '<<REPLACE_UTM_TERM_FIELD_ID>>'
  }
};
```

Replace each `<<REPLACE...>>` with the values from Step C. Quotes stay. Example of what it should look like once filled in:

```js
var AC_CONFIG = {
  actionUrl: 'https://kalos.activehosted.com/proc.php',
  uId:       '1',
  formId:    '7',
  fields: {
    gender:       '12',
    ageBucket:    '13',
    trainingDays: '14',
    utm_source:   '15',
    utm_medium:   '16',
    utm_campaign: '17',
    utm_content:  '18',
    utm_term:     '19'
  }
};
```

Save & publish Webflow.

### Step E, Test it

1. Add UTM params to the page URL: `https://livekalos.com/your-page?utm_source=test&utm_medium=test&utm_campaign=test&utm_content=test&utm_term=test`
2. Fill out the calculator and submit.
3. Within a few seconds, a new contact should appear in AC with all the fields populated.

---

## How UTMs work

The form has five hidden `<input>` elements (Source / Medium / Campaign / Content / Term). On page load, the script reads `?utm_source=...&utm_medium=...` etc. from the page URL and populates those inputs automatically. They get included in the POST to AC alongside the rest of the form data.

No setup needed for the UTMs themselves beyond creating the matching custom fields in AC (Step A) and mapping their IDs (Step D).

---

## Gotchas to know about

- **`mode: 'no-cors'`** is set on the fetch call. AC's `proc.php` doesn't send CORS headers, so the browser can't read the response. The POST still reaches AC; we just can't confirm receipt from the client side. Use AC's contact list to verify.
- If AC has **double-opt-in** turned on for the destination list, the contact won't be marked "active" until they click the confirmation email. Turn it off under the form's options if you want instant lead capture.
- AC's spam protection sometimes requires a `__utmz` tracking cookie. If submissions get flagged, enable **Site Tracking** in AC (Settings → Tracking → enable, whitelist `livekalos.com`). It drops the cookie automatically.
- The form **always shows the results page** to the user, even if the AC POST fails. This is intentional, the worst outcome is a missing lead, not a confused user.
- If you don't want to capture a particular custom field, leave its ID as `<<REPLACE...>>` and the script will skip it.

---

## Questions?

Ping Callum, he can ping the engineer who built the embed.

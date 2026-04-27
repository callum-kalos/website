# Kalos Projection Calculator → Webflow + ActiveCampaign

Two things to do:

1. **Install the calculator in Webflow.**
2. **Wire submissions into ActiveCampaign** by setting one webhook URL.

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

That's it. It's self-contained: no external scripts, no fonts to load, no build step. The CSS is scoped to `.kalos-projection` so it will not collide with Webflow's page styles.

The "Book Now" CTA on the results step already points at `https://www.livekalos.com/book-now`. Change that in the HTML if it should go somewhere else.

---

## 2. Hook submissions up to ActiveCampaign

When a user fills in their details and clicks **Get My Results**, the embed POSTs a JSON payload to a webhook URL. You set that URL once at the top of the script. The user sees their results immediately — the network call is fire-and-forget.

### What gets POSTed

```json
{
  "firstName":    "Jane",
  "lastName":     "Doe",
  "email":        "jane@example.com",
  "phone":        "5551234567",
  "gender":       "female",
  "age":          "25-34",
  "days":         "4",
  "utm_source":   "instagram",
  "utm_medium":   "social",
  "utm_campaign": "spring2026",
  "utm_content":  "story-link",
  "utm_term":     "",
  "submitted_at": "2026-04-26T14:32:11.000Z",
  "page_url":     "https://livekalos.com/projection?utm_source=instagram&utm_medium=social&..."
}
```

UTM fields are auto-captured from the page URL on load — no manual setup needed.

### Pick one of two webhook flavors

**Option A — Zapier / Make / n8n (recommended; easiest)**
1. Create a new Zap → trigger: **Webhooks by Zapier → Catch Hook**.
2. Copy the **catch URL** Zapier gives you.
3. Add a second step: **ActiveCampaign → Create or Update Contact**. Map the JSON fields to AC fields (Email → Email, FirstName → First name, gender → custom field, etc.).
4. Add a third step if you want to apply a tag (e.g. `projection-calculator`) or add to a list.
5. Turn the Zap on.

**Option B — ActiveCampaign's native form action URL (no third party)**
1. In AC: Forms → New form → **Inline form** → add fields for First name, Last name, Email, Phone, plus custom fields for Gender / Age bucket / Training days. Save.
2. Open the form's **Integrate** tab → click **Manual HTML**.
3. Copy the `action="…"` URL (looks like `https://kalos.activehosted.com/proc.php`).
4. Note: with this option, AC expects form-encoded data with specific field names like `field[1]`, `field[2]`. The embed currently sends JSON, so you'd need to either tweak the script to use `FormData` (small edit, ping Callum if you want this), or use Option A which handles the field mapping for you in Zapier's UI.

### Set the webhook URL in the embed

Open the pasted Embed in Webflow and find this line near the top of the `<script>` block:

```js
var WEBHOOK_URL = '<<REPLACE_WITH_WEBHOOK_URL>>';
```

Replace the placeholder with the URL from whichever option above you chose. Save & publish. Submit a test. The contact should appear in AC within a few seconds.

### How UTMs work

The form has five hidden inputs (Source / Medium / Campaign / Content / Term). On page load, the script reads `?utm_source=...&utm_medium=...` etc. from the page URL and populates those inputs automatically. They get included in the POST payload.

To test: append `?utm_source=test&utm_medium=test&utm_campaign=test` to the page URL, submit the form, and check the webhook (Zapier shows it instantly in the Zap's history).

### Gotchas to know about

- **`mode: 'no-cors'`** is set on the fetch call. Most webhook services don't send CORS headers, so the browser can't read the response. That's fine — the POST still reaches them; we just can't confirm receipt from the client side. Use Zapier's task history (or AC's contact list) to verify.
- **Don't expose your AC API key** — never paste an API key into the embed. Both options above avoid this. Zapier auths with AC server-side; AC's `proc.php` is a public endpoint that just creates contacts.
- If AC has **double-opt-in** turned on for the destination list, the contact won't be marked "active" until they click the confirmation email. Turn it off under the form's options if you want instant lead capture.
- The form **always shows the results page** to the user, even if the webhook fails. This is intentional — the worst outcome is a missing lead, not a confused user.

---

## Questions?

Ping Callum — he can ping the engineer who built the embed.

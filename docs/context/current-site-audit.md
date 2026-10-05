# Current site audit — getstrength.com

- **Audited:** 2026-08-30
- **Method:** public HTTP requests, response headers, DNS lookups, XML sitemaps, page fetches
- **Confidence:** high on platform/scale/DNS (directly observed); unknown on anything behind a login

> ⚠️ **Headline finding: this is not a static site.** It is a large, live WordPress
> installation with e-commerce and a forum. The "static site" assumption (WA-1) is dead.
> See "What this means" at the bottom before planning any work.

---

## 1. Platform

| Thing | Value | How we know |
|---|---|---|
| CMS | **WordPress 7.0.1** | `<meta name="generator">` |
| Page builder | **Elementor 4.0.9** | `<meta name="generator">` |
| Active theme | `blogus` (by themeansar) | asset paths in HTML |
| Previous theme | OceanWP — remnants still indexed | `oceanwp_library-sitemap.xml` exists |
| E-commerce | **WooCommerce** — `/shop`, `/cart`, `/checkout`, `/my-account`, `/track-my-order` all live (HTTP 200) | page fetches |
| Forum | **bbPress** — 39 forums, 528 topics, 1,758 replies | forum/topic/reply sitemaps |
| Email capture | AWeber plugin installed; Mailchimp in SPF record | plugin path, DNS TXT |
| Legal pages | WPAutoTerms (auto-generated T&Cs) | `wpautoterms_page-sitemap.xml` |
| Host | **WPX Cloud**, Sydney edge (`SYD03`), LiteSpeed | `server:` / `x-edge-location:` headers |

## 2. Scale — ~2,700 indexed URLs

| Sitemap | URLs |
|---|---|
| Pages | 66 |
| Blog posts | 323 |
| Forums | 39 |
| Forum topics | 528 |
| Forum replies | 1,758 |
| Categories | 11 |
| **Total** | **~2,725** |

This is not a brochure site. Any migration has to answer: *what happens to 323 posts
and 1,758 forum replies?*

## 3. Access and DNS — the critical section

Stakeholder currently holds **registrar (domain) login only**.

```
Nameservers : ns38.wpxhosting.com / ns39.wpxhosting.com   ← DNS is managed AT WPX
A record    : 194.1.147.14 / 194.1.147.59                  ← WPX servers
MX          : Google Workspace (ASPMX.L.GOOGLE.com)        ← business email
SPF         : includes _spf.google.com + servers.mcsv.net (Mailchimp)
```

**What registrar access DOES give you**
- Repoint nameservers → you can launch a new site on a new host without WPX's help
- Prove domain ownership for SSL, Google Search Console, Google Business Profile
- Transfer the domain away

**What it does NOT give you**
- WordPress admin (`/wp-admin`) → no content export
- WPX hosting panel → no files, no database, no backups
- WooCommerce orders and customer records
- The DNS zone itself — every record above lives in **WPX's** DNS panel

> 🚨 **Do not change nameservers before copying the DNS zone.** MX points at Google
> Workspace. Repointing NS without recreating the MX and SPF records first will kill
> the gym's email. This is the single highest-consequence mistake available on this project.

### Regaining access — try in this order
1. **WordPress password reset.** `/wp-login.php` responds 200 and "Lost your password?"
   emails a reset link. If anyone still has an email address that was a WP admin
   account, this recovers full admin — and from there Tools → Export gets all content
   out. **Cheapest path by far. Try before anything else.**
2. **WPX account recovery.** WPX support can verify ownership. Find out *who is being
   billed* — the card statement is the proof. Ask that in the meeting.
3. **Scrape and rebuild.** Public pages and posts are recoverable from the live site and
   the Wayback Machine. Forum user accounts, WooCommerce orders and customer data are **not**.

## 4. Defects found

**Severe**
- Homepage `<title>` is literally `-`. No title. This is what shows in Google results
  and the browser tab for the site's most important page.
- Homepage `<h1>` is **empty** (`<h1 class="site-title"><a …></a></h1>`).
- Tagline reads **"Strength Training Blog"**. The site introduces itself as a blog, not
  as an Auckland gym.

**Structural**
- Duplicate/orphan pages: `home`, `home-2`, `home-page`, `home-v3`; `contact` and
  `contact-us`; `terms-and-conditions` and `terms-of-service`; `gs-gym-video` and
  `getstrength-gym-video`.
- `/knee-sleeves` is in the sitemap but returns **404**.
- Root `sitemap.xml` contains external **amzn.to affiliate links** as if they were site
  pages — either a misconfigured plugin or leftover spam. Worth a closer look.
- `category-*` URLs in the sitemap are `http://`, not `https://`.

**Positioning**
- Top nav is: Merch Store · Front Squat Harness · Blog · GS Gym · About Us.
  The physical gym is **fourth**. Amazon, Teespring and ClickBank affiliate links appear
  on the homepage. A prospective member landing here does not find a gym.

## 5. Gym facts captured from the site
*(verify with the stakeholder — these are scraped, not confirmed)*

| | |
|---|---|
| Address | 385B Neilson St, Onehunga, Auckland (behind TWL) |
| Access | 24/7 keycard membership |
| Pricing | $19.90/wk (12mth) · $24.90/wk (6mth) · $29.90/wk (3mth), joining fee waived with coupons `12nofee` / `6nofee` / `3nofee` |
| Contact | John Strachan — Head Strength Coach & Gym Manager, (email held by Johnson — not in the public repo) |
| Social | facebook.com/getstrengthgym |
| Phone | none published |

Note: memberships are sold as **WooCommerce products with coupon codes**, and the
contact address is a **personal Gmail**, not a business domain address.

## 6. What this means for the project

The brief was scoped as "refurbish a static brochure site". The reality is a WordPress
store + forum + 323-post blog where the gym is a minor section. Three consequences:

1. **Scope.** "Refurbish the website" is now at least three separable projects: the gym
   marketing site, the merch store, and the blog/forum archive. Get the stakeholder to
   say which one matters. Pushing them to pick one is the most valuable thing you can do
   in the meeting.
2. **Access is the critical path, not design.** Nothing can ship until either wp-admin or
   WPX is recovered, or a decision is made to abandon the old content. Start this now —
   it involves waiting on other people.
3. **The cheap win is enormous.** If admin access is recovered, setting a page title and
   an H1, and moving the gym to the front of the nav, is maybe an hour of work against a
   site that currently has *no title tag*. That may buy goodwill for the bigger rebuild.

## Open questions for the stakeholder
- **Q-A1** Who pays the WPX hosting bill? (that person can recover the account)
- **Q-A2** Does anyone have an email address that was ever a WordPress admin?
- **Q-A3** Is the merch store actually taking orders, and what payment gateway?
- **Q-A4** Does the forum still matter, or can 1,758 replies be archived?
- **Q-A5** Who controls the Google Workspace account behind the MX records?
- **Q-A6** Is the goal the *gym*, the *store*, or the *blog*? Which one pays the bills?

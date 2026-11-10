// Build-time content loader (ADR-006). Reads JSON from frontend/content/
// while `next build` runs; nothing here is shipped to the browser.
//
// Server-only: this module uses node:fs. The `server-only` package is not installed
// (it is not one of this project's dependencies), so import this only from server
// components or next.config.ts, never from a "use client" file.
//
// Invalid content throws an error naming the file and field, which fails the build.

import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// ---------------------------------------------------------------------------
// Build mode
// ---------------------------------------------------------------------------

/** Anything other than SITE_ENV=production is a preview build. */
export function isPreviewBuild(): boolean {
  return process.env.SITE_ENV !== "production";
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}

function isRealDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

function requireString(
  file: string,
  data: Record<string, unknown>,
  field: string,
  label = field,
): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `"${label}" is required and must be non-empty text`);
  }
  return value;
}

function rejectUnknownFields(file: string, data: Record<string, unknown>, allowed: string[]) {
  for (const key of Object.keys(data)) {
    if (!allowed.includes(key)) {
      fail(file, `unknown field "${key}" (allowed: ${allowed.join(", ")})`);
    }
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// ---------------------------------------------------------------------------
// Prices
// ---------------------------------------------------------------------------

export type Plan = {
  id: string;
  name: string;
  price: number | null;
  period: string | null;
  details: string[];
};

export type Prices = {
  currency: string;
  confirmedWithClient: string | null; // YYYY-MM-DD the client confirmed, or null
  sample: boolean;
  plans: Plan[];
  dayPass: { price: number | null; howToBuy: string | null };
};

function readPricesFile(filename: string): Prices {
  const file = `content/${filename}`;
  let data: unknown;
  try {
    data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8"));
  } catch (err) {
    fail(file, `could not read as JSON (${(err as Error).message})`);
  }
  if (!isObject(data)) fail(file, "must be a JSON object");
  rejectUnknownFields(file, data, ["sample", "currency", "confirmedWithClient", "plans", "dayPass"]);

  const currency = requireString(file, data, "currency");

  const confirmed = data.confirmedWithClient;
  if (!(confirmed === null || (typeof confirmed === "string" && isRealDate(confirmed)))) {
    fail(file, `"confirmedWithClient" must be null or YYYY-MM-DD`);
  }

  if (data.sample !== undefined && typeof data.sample !== "boolean") {
    fail(file, `"sample" must be true or false`);
  }

  if (!Array.isArray(data.plans) || data.plans.length === 0) {
    fail(file, `"plans" must be a non-empty list`);
  }
  const seen = new Set<string>();
  const plans = data.plans.map((plan: unknown, i: number): Plan => {
    const where = `plans[${i}]`;
    if (!isObject(plan)) fail(file, `"${where}" must be an object`);
    rejectUnknownFields(`${file} ${where}`, plan, ["id", "name", "price", "period", "details"]);

    const id = requireString(file, plan, "id", `${where}.id`);
    if (!SLUG.test(id)) fail(file, `"${where}.id" must be lower-case words separated by hyphens`);
    if (seen.has(id)) fail(file, `"${where}.id" duplicates "${id}"`);
    seen.add(id);

    const name = requireString(file, plan, "name", `${where}.name`);

    const price = plan.price;
    if (!(price === null || (typeof price === "number" && Number.isFinite(price) && price > 0))) {
      fail(file, `"${where}.price" must be null or a positive number`);
    }
    const period = plan.period;
    if (!(period === null || (typeof period === "string" && period.trim() !== ""))) {
      fail(file, `"${where}.period" must be null or text such as "week" or "month"`);
    }
    const details = plan.details;
    if (!Array.isArray(details) || !details.every(detail => typeof detail === "string" && detail.trim() !== "")) {
      fail(file, `"${where}.details" must be a list of non-empty text`);
    }
    return { id, name, price, period, details };
  });

  if (!isObject(data.dayPass)) fail(file, '"dayPass" must be an object');
  rejectUnknownFields(file + " dayPass", data.dayPass, ["price", "howToBuy"]);
  const dayPassPrice = data.dayPass.price;
  if (!(dayPassPrice === null || (typeof dayPassPrice === "number" && Number.isFinite(dayPassPrice) && dayPassPrice > 0))) {
    fail(file, '"dayPass.price" must be null or a positive number');
  }
  const dayPass = { price: dayPassPrice, howToBuy: optionalString(file + " dayPass", data.dayPass, "howToBuy") };
  return { currency, confirmedWithClient: confirmed, sample: data.sample === true, plans, dayPass };
}

/**
 * Prices for this build.
 * - Production: content/prices.json, and the build fails unless the client has confirmed
 *   them (the launch check). The sample file is never read.
 * - Preview: content/prices.sample.json. prices.json is still validated so mistakes in it
 *   show up on everyday builds, not first at deploy time.
 */
export function getPrices(): Prices {
  const real = readPricesFile("prices.json");
  if (real.sample) fail("content/prices.json", `"sample" must not be true in the real price list`);

  if (!isPreviewBuild()) {
    if (real.confirmedWithClient === null) {
      fail(
        "content/prices.json",
        `prices not confirmed with the client. "confirmedWithClient" is null, so this ` +
          `production build has been stopped. Confirm the prices with GetStrength, then set ` +
          `"confirmedWithClient" to the date they confirmed (YYYY-MM-DD). ` +
          `See docs/maintenance/content-changes.md.`,
      );
    }
    return real;
  }

  const sample = readPricesFile("prices.sample.json");
  if (!sample.sample) fail("content/prices.sample.json", `"sample" must be true`);
  return sample;
}

// ---------------------------------------------------------------------------
// Site facts (header, footer, Join button)
// ---------------------------------------------------------------------------

export type NavLink = { label: string; href: string };
export const BENEFIT_ICONS = ["coaching", "equipment", "community"] as const;
export type OutboundLink = { label: string; service: string; url: string };

export type Site = {
  name: string;
  address: { street: string; locality: string };
  memberAccessHours: string | null; // null until the client confirms
  staffedHours: string | null;
  phone: string | null; // null until the client confirms
  email: string | null;
  joinUrl: string;
  privacyPolicyUrl: string | null;
  nav: NavLink[];
  outboundLinks: OutboundLink[]; // links whose URL is still null are left out
  home: {
    introduction: string;
    whyIntroduction: string;
    benefits: { title: string; description: string; icon: (typeof BENEFIT_ICONS)[number]; photo: string }[];
    togetherIntroduction: string;
  };
};

const SITE_FIELDS = [
  "name",
  "address",
  "memberAccessHours",
  "staffedHours",
  "phone",
  "email",
  "joinUrl",
  "privacyPolicyUrl",
  "nav",
  "outboundLinks",
  "home",
];

function optionalString(file: string, data: Record<string, unknown>, field: string): string | null {
  const value = data[field];
  if (!(value === null || (typeof value === "string" && value.trim() !== ""))) {
    fail(file, `"${field}" must be null or non-empty text`);
  }
  return value;
}

function requireUrl(file: string, value: unknown, label: string): string {
  if (typeof value !== "string" || !value.startsWith("https://")) {
    fail(file, `"${label}" must be a full address starting with https://`);
  }
  return value;
}

/** Facts shown on every page: content/site.json. */
export function getSite(): Site {
  const file = "content/site.json";
  let data: unknown;
  try {
    data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "site.json"), "utf8"));
  } catch (err) {
    fail(file, `could not read as JSON (${(err as Error).message})`);
  }
  if (!isObject(data)) fail(file, "must be a JSON object");
  rejectUnknownFields(file, data, SITE_FIELDS);

  const name = requireString(file, data, "name");

  if (!isObject(data.address)) fail(file, `"address" must be an object with "street" and "locality"`);
  rejectUnknownFields(`${file} address`, data.address, ["street", "locality"]);
  const address = {
    street: requireString(file, data.address, "street", "address.street"),
    locality: requireString(file, data.address, "locality", "address.locality"),
  };

  const memberAccessHours = optionalString(file, data, "memberAccessHours");
  const staffedHours = optionalString(file, data, "staffedHours");
  const phone = optionalString(file, data, "phone");
  const email = optionalString(file, data, "email");
  const joinUrl = requireUrl(file, data.joinUrl, "joinUrl");
  const privacy = data.privacyPolicyUrl;
  if (!(privacy === null || (typeof privacy === "string" && /^(\/|https:\/\/)/.test(privacy)))) {
    fail(file, `"privacyPolicyUrl" must be null, a page such as /privacy/, or an https:// address`);
  }
  const privacyPolicyUrl = privacy;

  if (!Array.isArray(data.nav) || data.nav.length === 0) fail(file, `"nav" must be a non-empty list`);
  const nav = data.nav.map((link: unknown, i: number): NavLink => {
    const where = `nav[${i}]`;
    if (!isObject(link)) fail(file, `"${where}" must be an object`);
    rejectUnknownFields(`${file} ${where}`, link, ["label", "href"]);
    const href = requireString(file, link, "href", `${where}.href`);
    // Internal pages only, with the trailing slash S3 + CloudFront need (ADR-005, ADR-007).
    if (!href.startsWith("/") || !href.endsWith("/")) {
      fail(file, `"${where}.href" must start and end with /, e.g. /about/`);
    }
    return { label: requireString(file, link, "label", `${where}.label`), href };
  });

  if (!Array.isArray(data.outboundLinks)) fail(file, `"outboundLinks" must be a list`);
  const outboundLinks = data.outboundLinks.flatMap((link: unknown, i: number): OutboundLink[] => {
    const where = `outboundLinks[${i}]`;
    if (!isObject(link)) fail(file, `"${where}" must be an object`);
    rejectUnknownFields(`${file} ${where}`, link, ["label", "service", "url"]);
    const label = requireString(file, link, "label", `${where}.label`);
    const service = requireString(file, link, "service", `${where}.service`);
    // A null URL is a link we don't have yet. Leave it out rather than ship a dead link.
    if (link.url === null) return [];
    return [{ label, service, url: requireUrl(file, link.url, `${where}.url`) }];
  });

  if (!isObject(data.home)) fail(file, '"home" must be an object');
  rejectUnknownFields(file + " home", data.home, ["introduction", "whyIntroduction", "benefits", "togetherIntroduction"]);
  const benefits = data.home.benefits;
  if (!Array.isArray(benefits) || benefits.length === 0) fail(file, '"home.benefits" must be a non-empty list');
  const home = {
    introduction: requireString(file, data.home, "introduction", "home.introduction"),
    whyIntroduction: requireString(file, data.home, "whyIntroduction", "home.whyIntroduction"),
    togetherIntroduction: requireString(file, data.home, "togetherIntroduction", "home.togetherIntroduction"),
    benefits: benefits.map((benefit: unknown, i: number) => {
      const where = "home.benefits[" + i + "]";
      if (!isObject(benefit)) fail(file, where + " must be an object");
      rejectUnknownFields(file + " " + where, benefit, ["title", "description", "icon", "photo"]);
      const title = requireString(file, benefit, "title", where + ".title");
      const description = requireString(file, benefit, "description", where + ".description");
      const icon = benefit.icon as (typeof BENEFIT_ICONS)[number];
      if (!BENEFIT_ICONS.includes(icon)) fail(file, `"${where}.icon" must be one of: ${BENEFIT_ICONS.join(", ")}`);
      return { title, description, icon, photo: requirePublicFile(file, benefit, "photo", where + ".photo") };
    }),
  };

  return {
    name,
    address,
    memberAccessHours,
    staffedHours,
    phone,
    email,
    joinUrl,
    privacyPolicyUrl,
    nav,
    outboundLinks,
    home,
  };
}

// ---------------------------------------------------------------------------
// Photos
// ---------------------------------------------------------------------------

export type Photo = { src: string; alt: string };

export type Photos = {
  homeHero: { video: string; poster: string }; // decorative, so no alt text
  homeTogether: Photo;
  aboutStory: Photo;
  aboutGallery: Photo[];
};

const PUBLIC_DIR = path.join(process.cwd(), "public");

function requirePublicFile(file: string, data: Record<string, unknown>, field: string, label: string): string {
  const src = requireString(file, data, field, label);
  // Exact-case match: S3 paths are case-sensitive, Windows and macOS file systems are not.
  const dir = path.join(PUBLIC_DIR, path.dirname(src));
  if (!/^\/(images|videos)\//.test(src) || !fs.existsSync(dir) || !fs.readdirSync(dir).includes(path.basename(src))) {
    fail(file, `"${label}" must be an existing file under public/images/ or public/videos/`);
  }
  return src;
}

function readPhoto(file: string, value: unknown, label: string): Photo {
  if (!isObject(value)) fail(file, `"${label}" must be an object with "src" and "alt"`);
  rejectUnknownFields(`${file} ${label}`, value, ["src", "alt"]);
  return {
    src: requirePublicFile(file, value, "src", `${label}.src`),
    alt: requireString(file, value, "alt", `${label}.alt`),
  };
}

/** Approved gym photos and the hero video, and where each one is used: content/photos.json. */
export function getPhotos(): Photos {
  const file = "content/photos.json";
  let data: unknown;
  try {
    data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "photos.json"), "utf8"));
  } catch (err) {
    fail(file, `could not read as JSON (${(err as Error).message})`);
  }
  if (!isObject(data)) fail(file, "must be a JSON object");
  rejectUnknownFields(file, data, ["homeHero", "homeTogether", "aboutStory", "aboutGallery"]);
  if (!Array.isArray(data.aboutGallery) || data.aboutGallery.length === 0) {
    fail(file, '"aboutGallery" must be a non-empty list');
  }
  if (!isObject(data.homeHero)) fail(file, '"homeHero" must be an object with "video" and "poster"');
  rejectUnknownFields(file + " homeHero", data.homeHero, ["video", "poster"]);
  return {
    homeHero: {
      video: requirePublicFile(file, data.homeHero, "video", "homeHero.video"),
      poster: requirePublicFile(file, data.homeHero, "poster", "homeHero.poster"),
    },
    homeTogether: readPhoto(file, data.homeTogether, "homeTogether"),
    aboutStory: readPhoto(file, data.aboutStory, "aboutStory"),
    aboutGallery: data.aboutGallery.map((photo: unknown, i: number) => readPhoto(file, photo, `aboutGallery[${i}]`)),
  };
}

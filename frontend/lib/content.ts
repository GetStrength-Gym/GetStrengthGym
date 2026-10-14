// Build-time content loader (ADR-006). Reads Markdown and JSON from frontend/content/
// while `next build` runs; nothing here is shipped to the browser.
//
// Server-only: this module uses node:fs. The `server-only` package is not installed
// (it is not one of this project's dependencies), so import this only from server
// components or next.config.ts, never from a "use client" file.
//
// Invalid content throws an error naming the file and field, which fails the build.

import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";
import { isScalar, parseDocument, Scalar } from "yaml";

const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
// A "---" line, the YAML fields (possibly none), then a closing "---" line.
const FRONT_MATTER = /^---[ \t]*\r?\n(?:([\s\S]*?)\r?\n)?---[ \t]*(?:\r?\n|$)/;

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
// Blog posts
// ---------------------------------------------------------------------------

export type PostSummary = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  image: { src: string; alt: string } | null; // from the "image" and "imageAlt" fields
  draft: boolean;
};

export type Post = PostSummary & { html: string };

const POST_FIELDS = ["title", "date", "description", "image", "imageAlt", "draft"];

/**
 * Splits a post into its YAML front matter and Markdown body, and parses the YAML.
 * The parsed document is returned too, so callers can see how a value was written.
 */
function readFrontMatter(file: string, source: string) {
  const text = source.replace(/^﻿/, ""); // editors on Windows may add a byte-order mark
  const match = FRONT_MATTER.exec(text);
  if (!match) {
    fail(file, `must start with front matter: a "---" line, the fields, then another "---" line`);
  }

  // yaml's default schema is YAML 1.2 core. It rejects duplicate keys.
  const doc = parseDocument(match[1] ?? "");
  if (doc.errors.length > 0) {
    fail(file, `front matter is not valid YAML (${doc.errors[0].message})`);
  }
  const data: unknown = doc.toJS();
  if (!isObject(data)) fail(file, "front matter must be a list of fields such as title: \"...\"");

  return { doc, data, body: text.slice(match[0].length) };
}

function readPostFile(filename: string): { summary: PostSummary; body: string } {
  const file = `content/blog/${filename}`;
  const slug = filename.replace(/\.md$/, "");
  if (!SLUG.test(slug)) {
    fail(file, "file name must be lower-case words separated by hyphens, e.g. my-first-post.md");
  }

  const { doc, data, body } = readFrontMatter(file, fs.readFileSync(path.join(BLOG_DIR, filename), "utf8"));
  rejectUnknownFields(file, data, POST_FIELDS); // catches typos like "drafts: true"

  const title = requireString(file, data, "title");
  const description = requireString(file, data, "description");

  // Dates must be quoted. The YAML 1.2 parser used here keeps an unquoted date as text,
  // but YAML 1.1 tools (most front-matter libraries, and any future CMS) turn an unquoted
  // 2026-02-30 into a Date and silently roll it over to 2 March. Quoting keeps the files
  // safe for every parser.
  const dateNode = doc.get("date", true);
  if (isScalar(dateNode) && dateNode.type === Scalar.PLAIN) {
    fail(file, `"date" must be in quotes, e.g. date: "2026-10-10"`);
  }
  if (typeof data.date !== "string" || !isRealDate(data.date)) {
    fail(file, `"date" must be YYYY-MM-DD`);
  }

  let image: PostSummary["image"] = null;
  if (data.image !== undefined) {
    if (typeof data.image !== "string" || !data.image.startsWith("/")) {
      fail(file, `"image" must be a path starting with /, e.g. /images/blog/photo.jpg`);
    }
    // Rendered as the image's alt text (WCAG 2.2 AA), so every image needs one.
    if (typeof data.imageAlt !== "string" || data.imageAlt.trim() === "") {
      fail(file, `"imageAlt" is required when "image" is set: a short description of what the image shows`);
    }
    image = { src: data.image, alt: data.imageAlt };
  } else if (data.imageAlt !== undefined) {
    fail(file, `"imageAlt" is set but "image" is not; remove "imageAlt" or add the image`);
  }

  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    fail(file, `"draft" must be true or false`);
  }
  const draft = data.draft === true;

  return { summary: { slug, title, date: data.date, description, image, draft }, body };
}

function readAllPostFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith(".md"))
    .map(readPostFile)
    .filter(({ summary }) => isPreviewBuild() || !summary.draft);
}

/** Post summaries, newest first. Drafts are included in preview builds only. */
export function getAllPosts(): PostSummary[] {
  return readAllPostFiles()
    .map(({ summary }) => summary)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** One post with its Markdown body converted to sanitised HTML. */
export async function getPost(slug: string): Promise<Post> {
  const found = readAllPostFiles().find(({ summary }) => summary.slug === slug);
  if (!found) throw new Error(`content/blog/${slug}.md: no such post in this build`);

  // remark-html sanitises by default; never turn that off.
  const rendered = String(await remark().use(html, { sanitize: true }).process(found.body));
  if (/<h1[\s>]/.test(rendered)) {
    fail(`content/blog/${slug}.md`, `body must not use "# " headings; the title is the page's only H1, start at "##"`);
  }
  return { ...found.summary, html: rendered };
}

// ---------------------------------------------------------------------------
// Prices
// ---------------------------------------------------------------------------

export type Plan = {
  id: string;
  name: string;
  price: number | null;
  period: string | null;
};

export type Prices = {
  currency: string;
  confirmedWithClient: string | null; // YYYY-MM-DD the client confirmed, or null
  sample: boolean;
  plans: Plan[];
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
  rejectUnknownFields(file, data, ["sample", "currency", "confirmedWithClient", "plans"]);

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
    rejectUnknownFields(`${file} ${where}`, plan, ["id", "name", "price", "period"]);

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
    return { id, name, price, period };
  });

  return { currency, confirmedWithClient: confirmed, sample: data.sample === true, plans };
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

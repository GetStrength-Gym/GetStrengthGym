import type { Metadata } from "next";
import Link from "next/link";
import JoinButton from "@/components/JoinButton";
import Placeholder from "@/components/Placeholder";
import { getAllPosts, getPrices, getSite, isPreviewBuild, type Plan } from "@/lib/content";
import { formatDate, formatPrice } from "@/lib/format";

// Home (docs/design/five-page-journey.md §4). Its one job: this is a gym in Onehunga, and
// here is how you join. The H1 and the Join button must both be above the fold at 375px.
//
// No gym facts are typed here. The address, links and prices come from content/; anything
// the client still owes is a <Placeholder>, which shows in preview builds only.

export const metadata: Metadata = {
  // Absolute, so the layout's "— GetStrength Gym" template isn't added twice.
  // Proposed copy, five-page-journey.md §2.
  title: { absolute: "GetStrength Gym — Strength Gym in Onehunga, Auckland" },
};

const secondaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-sm border px-5 py-2 font-semibold transition-colors duration-150";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-wider text-red">{children}</p>;
}

/** The lowest priced plan, for "from $X". Null if no plan has a price yet. */
function cheapestPlan(plans: Plan[]): Plan | null {
  const priced = plans.filter((plan) => plan.price !== null);
  if (priced.length === 0) return null;
  return priced.reduce((a, b) => (b.price! < a.price! ? b : a));
}

export default function Home() {
  const site = getSite();
  const prices = getPrices();
  const fromPlan = cheapestPlan(prices.plans);
  const posts = getAllPosts().slice(0, 3);
  const preview = isPreviewBuild();
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.address.street}, ${site.address.locality}`,
  )}`;

  return (
    <main>
      {/* Hero */}
      <section className="bg-charcoal text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-semibold text-muted-on-dark">
              A strength gym in {site.address.locality}
            </p>
            {/* Figma heading (five-page-journey.md §2). */}
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Build strength. Find your community.
            </h1>
            <Placeholder label="Hero introduction copy" className="mt-4" />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <JoinButton />
              <Link href="/gym/" className={`${secondaryButton} border-white hover:bg-white hover:text-charcoal`}>
                Explore the gym
              </Link>
            </div>
          </div>
          <Placeholder label="Approved hero photography" className="aspect-[4/3]" />
        </div>
      </section>

      {/* Why GS Gym? Card titles are the Figma draft. TODO(confirm) that coaching and
          specialist equipment are on offer under the current owners (§4, "Other content slots"). */}
      <section aria-labelledby="why-heading" className="bg-neutral">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Eyebrow>Strength for every level</Eyebrow>
          <h2 id="why-heading" className="mt-2 text-3xl font-extrabold tracking-tight">
            Why GS Gym?
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {["Experienced coaching", "Specialist equipment", "Supportive community"].map((title, i) => (
              <li key={title} className="border border-line bg-white p-6">
                <p aria-hidden="true" className="text-lg font-extrabold text-red">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-bold">{title}</h3>
                <Placeholder label="One-line description" className="mt-3" />
              </li>
            ))}
          </ol>
          <Link href="/about/" className={`${secondaryButton} mt-8 border-charcoal hover:bg-charcoal hover:text-white`}>
            Explore About Us
          </Link>
        </div>
      </section>

      {/* Meet your coach: the coach is TODO(confirm) (minutes 2026-10-11, Q2). Until the client
          names one, this band shows only as a placeholder in preview, and production leaves
          it out so "Why GS Gym?" leads straight into "Train together" (§4). */}
      {preview && (
        <section aria-labelledby="coach-heading">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Eyebrow>Meet your coach</Eyebrow>
            <h2 id="coach-heading" className="mt-2 text-3xl font-extrabold tracking-tight">
              Coaching at GS Gym
            </h2>
            <Placeholder label="Coach name, role, photo and approved credentials" className="mt-6 min-h-40" />
          </div>
        </section>
      )}

      {/* Train together */}
      <section aria-labelledby="together-heading" className="bg-charcoal text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Placeholder label="Gym interior photography" className="aspect-[4/3]" />
          <div>
            <h2 id="together-heading" className="text-3xl font-extrabold tracking-tight">
              Train together. Grow stronger.
            </h2>
            <Link href="/about/" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
              Read our story<span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest posts. Hidden when there are none: the blog may launch empty (ADR-006). */}
      {posts.length > 0 && (
        <section aria-labelledby="posts-heading">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 id="posts-heading" className="text-3xl font-extrabold tracking-tight">
              Start strong. Keep learning.
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug} className="border border-line p-6">
                  <p className="text-sm text-grey">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.draft && <strong> · Draft (preview only)</strong>}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">
                    <Link href={`/blog/${post.slug}/`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-grey">{post.description}</p>
                </li>
              ))}
            </ul>
            <Link href="/blog/" className="mt-6 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
              View all posts<span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </section>
      )}

      {/* Testimonials are videos from existing footage, embedded from YouTube (minutes
          2026-10-11, D2 and flag 4). None supplied yet, and none are ever made up, so the
          band is preview-only until they arrive. */}
      {preview && (
        <section aria-labelledby="testimonials-heading" className="bg-neutral">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 id="testimonials-heading" className="text-3xl font-extrabold tracking-tight">
              What our members say
            </h2>
            <Placeholder label="Video testimonials from the client's footage" className="mt-6 aspect-video md:aspect-[21/9]" />
          </div>
        </section>
      )}

      {/* Find GS Gym (GS/Location, short form) */}
      <section aria-labelledby="location-heading">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>Come train with us</Eyebrow>
            <h2 id="location-heading" className="mt-2 text-3xl font-extrabold tracking-tight">
              Find GS Gym
            </h2>
            <address className="mt-4 text-lg not-italic">
              {site.address.street}
              <br />
              {site.address.locality}
            </address>
            {site.memberAccessHours && <p className="mt-2 text-grey">Member access: {site.memberAccessHours}</p>}
            {site.staffedHours && <p className="text-grey">Staffed hours: {site.staffedHours}</p>}
            {!site.memberAccessHours && <Placeholder label="Member access hours" className="mt-3" />}
            {!site.staffedHours && <Placeholder label="Staffed / viewing hours" className="mt-2" />}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={directions} className={`${secondaryButton} border-charcoal hover:bg-charcoal hover:text-white`}>
                Get directions<span className="sr-only"> (Google Maps)</span>
              </a>
              <Link href="/contact/" className={`${secondaryButton} border-red bg-red text-white hover:bg-red-dark`}>
                Ask about visiting
              </Link>
            </div>
          </div>
          <Placeholder label="Static map image linking to Google Maps" className="aspect-[4/3]" />
        </div>
      </section>

      {/* Memberships teaser: reads the same price file as The Gym page, so the two can't
          disagree (ADR-006). The full list lives on /gym/ (GS-19). */}
      <section aria-labelledby="memberships-heading" className="bg-neutral">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Eyebrow>Memberships</Eyebrow>
          <h2 id="memberships-heading" className="mt-2 text-3xl font-extrabold tracking-tight">
            {fromPlan ? `Memberships from ${formatPrice(fromPlan, prices.currency)}` : "Membership options"}
          </h2>
          {!fromPlan && <p className="mt-2 text-lg">Contact us for pricing.</p>}
          {prices.sample && <p className="mt-2 font-semibold text-red">Sample prices — preview only</p>}
          {/* The casual day pass isn't in prices.json yet. TODO(confirm) its price and how it's
              bought: Debitsuccess is direct debit, so it may be "pay at the gym". */}
          <Placeholder label="Casual day pass price" className="mt-4" />
          <Link href="/gym/#memberships" className={`${secondaryButton} mt-6 border-charcoal hover:bg-charcoal hover:text-white`}>
            See all memberships
          </Link>
        </div>
      </section>

      {/* Closing call to action */}
      <section aria-labelledby="join-heading" className="bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 id="join-heading" className="text-3xl font-extrabold tracking-tight">
            Ready to get strong?
          </h2>
          <JoinButton className="mt-6" />
          <p className="mt-4 text-muted-on-dark">Memberships are handled securely through Debitsuccess.</p>
        </div>
      </section>
    </main>
  );
}

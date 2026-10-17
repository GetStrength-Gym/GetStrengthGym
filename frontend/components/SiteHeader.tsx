import Link from "next/link";
import { getSite } from "@/lib/content";
import JoinButton from "./JoinButton";
import NavLinks from "./NavLinks";

// Header on every page (docs/design/five-page-journey.md §3). Charcoal with a red rule.
// Mobile: logo and Join on one row, the nav wrapping underneath, no hamburger.
// Desktop: logo, nav, Join on one row. No outbound links up here.
export default function SiteHeader() {
  const site = getSite();
  return (
    <header className="border-b-2 border-red bg-charcoal text-white">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-white focus:px-4 focus:py-2 focus:text-charcoal"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8">
        {/* Wordmark until the logo is cleared for use: TODO(confirm) logo rights and the
            original vector file (docs/design/five-page-journey.md §10). */}
        <Link href="/" className="inline-flex min-h-11 items-center text-xl font-extrabold tracking-tight">
          GetStrength<span className="sr-only"> Gym, home</span>
        </Link>
        <JoinButton className="lg:order-last" />
        <nav aria-label="Main" className="w-full lg:w-auto">
          <NavLinks links={site.nav} className="-mx-2 flex flex-wrap gap-x-2 lg:gap-x-4" />
        </nav>
      </div>
    </header>
  );
}

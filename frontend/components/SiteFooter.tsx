import Link from "next/link";
import { getSite, isPreviewBuild } from "@/lib/content";
import JoinButton from "./JoinButton";
import NavLinks from "./NavLinks";
import Placeholder from "./Placeholder";

// Footer on every page: "See you at the gym" (docs/design/five-page-journey.md §3).
// Every fact comes from content/site.json. Facts still owed by the client show as
// placeholders in preview builds and are left out of production builds.
export default function SiteFooter() {
  const site = getSite();
  const year = new Date().getFullYear();
  const hasHours = site.memberAccessHours !== null || site.staffedHours !== null;

  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xl font-extrabold tracking-tight">GetStrength</p>
          <JoinButton />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto]">
          <p aria-hidden="true" className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
            See you
            <br />
            at the gym.
            <span className="mt-4 block h-1.5 w-24 bg-red" />
          </p>
          <nav aria-label="Footer">
            <NavLinks links={site.nav} className="-mx-2 flex flex-col" />
          </nav>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <section aria-labelledby="footer-visit">
            <h2 id="footer-visit" className="font-semibold">
              Visit GS Gym
            </h2>
            <address className="mt-2 not-italic text-muted-on-dark">
              {site.address.street}
              <br />
              {site.address.locality}
            </address>
          </section>

          {(hasHours || isPreviewBuild()) && (
          <section aria-labelledby="footer-hours">
            <h2 id="footer-hours" className="font-semibold">
              Access and hours
            </h2>
            <dl className="mt-2 text-muted-on-dark">
              {site.memberAccessHours && (
                <div>
                  <dt className="inline">Member access: </dt>
                  <dd className="inline">{site.memberAccessHours}</dd>
                </div>
              )}
              {site.staffedHours && (
                <div>
                  <dt className="inline">Staffed hours: </dt>
                  <dd className="inline">{site.staffedHours}</dd>
                </div>
              )}
            </dl>
            {!site.memberAccessHours && <Placeholder label="Member access hours" className="mt-2" />}
            {!site.staffedHours && <Placeholder label="Staffed / viewing hours" className="mt-2" />}
          </section>
          )}

          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact" className="font-semibold">
              Get in touch
            </h2>
            <p className="mt-2 text-muted-on-dark">Training, memberships and enquiries.</p>
            <Link href="/contact/" className="mt-1 inline-flex min-h-11 items-center font-medium underline underline-offset-4">
              Contact the team<span aria-hidden="true">&nbsp;→</span>
            </Link>
          </section>

          {site.outboundLinks.length > 0 && (
            <section aria-labelledby="footer-elsewhere">
              <h2 id="footer-elsewhere" className="font-semibold">
                Elsewhere
              </h2>
              {/* Outbound links are labelled with the service they open (docs/requirements.md,
                  "clearly-marked links out"). They open in the same tab, like Join. */}
              <ul className="mt-1">
                {site.outboundLinks.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} className="inline-flex min-h-11 items-center underline underline-offset-4">
                      {link.label}
                      <span className="ml-1 text-muted-on-dark">({link.service})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-muted-on-dark">
          <p>© {year} GetStrength</p>
          {site.privacyPolicyUrl ? (
            <a href={site.privacyPolicyUrl} className="inline-flex min-h-11 items-center underline underline-offset-4">
              Privacy policy
            </a>
          ) : (
            <Placeholder label="Privacy policy link" />
          )}
        </div>
      </div>
    </footer>
  );
}

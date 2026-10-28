import Image from "next/image";
import Link from "next/link";
import { getSite, isPreviewBuild } from "@/lib/content";
import JoinButton from "./JoinButton";
import NavLinks from "./NavLinks";

export default function SiteFooter() {
  const site = getSite();
  const preview = isPreviewBuild();
  return (
    <footer className="site-footer">
      <div className="page-width footer-inner">
        <div className="footer-brand">
          <Link href="/" aria-label={site.name + ", home"}>
            <Image src="/images/brand/getstrength-primary.png" width={2858} height={2042}
              alt={site.name} className="footer-logo" />
          </Link>
          <JoinButton />
        </div>
        <div className="footer-invitation">
          <div>
            <p className="footer-statement">SEE YOU<br />AT THE GYM.</p>
            <span className="brand-underline" aria-hidden="true" />
          </div>
          <nav aria-label="Footer"><NavLinks links={site.nav} className="footer-nav" /></nav>
        </div>
        <div className="footer-details">
          <section aria-labelledby="footer-visit">
            <h2 id="footer-visit">Visit GS Gym</h2>
            <address>{site.address.street}<br />{site.address.locality}</address>
          </section>
          {(site.memberAccessHours || site.staffedHours || preview) && (
            <section aria-labelledby="footer-hours">
              <h2 id="footer-hours">Access &amp; viewing</h2>
              {(site.memberAccessHours || preview) && <p>Member access: {site.memberAccessHours ?? "[confirm]"}</p>}
              {(site.staffedHours || preview) && <p>Staffed / viewing: {site.staffedHours ?? "[confirm]"}</p>}
            </section>
          )}
          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact">Get in touch</h2>
            <p>Training, memberships &amp; enquiries</p>
            <Link href="/contact/" className="footer-contact-link">Contact the team</Link>
            {site.outboundLinks.length > 0 && (
              <ul className="footer-socials">
                {site.outboundLinks.map(link => <li key={link.url}><a href={link.url}>{link.service}</a></li>)}
              </ul>
            )}
          </section>
        </div>
        <div className="footer-legal">
          <p>© {new Date().getFullYear()} GetStrength</p>
          {site.privacyPolicyUrl ? <a href={site.privacyPolicyUrl}>Privacy policy</a> :
            preview && <p>Privacy policy — awaiting confirmation</p>}
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getSite, isPreviewBuild } from "@/lib/content";
import { telUrl } from "@/lib/format";
import NavLinks from "./NavLinks";
import SocialIcon from "./SocialIcon";

export default function SiteFooter() {
  const site = getSite();
  const preview = isPreviewBuild();
  return (
    <footer className="site-footer">
      <div className="page-width footer-inner">
        <div className="footer-brand">
          <Link href="/" aria-label={site.name + ", home"}>
            <Image src="/images/brand/getstrength-primary.png" width={480} height={343}
              alt={site.name} className="footer-logo" />
          </Link>
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
              {(site.staffedHours || preview) && <p>Viewings: {site.staffedHours ?? "[confirm]"}</p>}
            </section>
          )}
          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact">Get in touch</h2>
            {site.phone && <p><a href={telUrl(site.phone)} className="footer-contact-link">{site.phone}</a></p>}
            {site.email && <p><a href={"mailto:" + site.email} className="footer-contact-link">{site.email}</a></p>}
            {/* In a <p> like the phone and email, so it reads as a link, not as a heading over the icons. */}
            <p><Link href="/contact/" className="footer-contact-link">Contact the team<span aria-hidden="true">&nbsp;→</span></Link></p>
            {site.outboundLinks.length > 0 && (
              <ul className="footer-socials">
                {site.outboundLinks.map(link => <li key={link.url}><a href={link.url} aria-label={link.label} className="social-icon"><SocialIcon service={link.service} /></a></li>)}
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

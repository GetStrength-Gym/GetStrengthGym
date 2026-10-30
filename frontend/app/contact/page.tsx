import type { Metadata } from "next";
import JoinCta from "@/components/JoinCta";
import Placeholder from "@/components/Placeholder";
import { getSite, isPreviewBuild } from "@/lib/content";
import { directionsUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: "Contact GetStrength Gym — Penrose, Auckland" },
  description: "Questions about training, coaching or GetStrength Gym in Penrose, Auckland? Get in touch.",
};

export default function Contact() {
  const site = getSite();
  const preview = isPreviewBuild();
  const directions = directionsUrl(site.address);
  // Unconfirmed details are labelled in preview and left out of production.
  const details = [
    { term: "Phone", value: site.phone },
    { term: "Email", value: site.email },
  ].filter(detail => detail.value || preview);

  return (
    <main className="contact">
      <section className="bg-neutral">
        <div className="page-width section-space section-stack">
          <h1 className="section-heading page-title">Contact</h1>
          <p className="body-large">Questions about training, coaching or the gym? Get in touch.</p>
        </div>
      </section>

      <section aria-label="Enquiries and contact details">
        <div className="page-width section-space contact-row">
          {/* The form's delivery mechanism is undecided (GS-13/GS-26) and a static export cannot
              receive it, so it is a preview-only layout with sending switched off. */}
          {preview && (
            <form className="enquiry-form" method="post" aria-labelledby="form-heading">
              <h2 id="form-heading" className="section-heading">Send us a message</h2>
              <p className="text-grey">Preview only — sending is not connected yet.</p>
              <label className="field">Name
                <input name="name" autoComplete="name" required placeholder="Your name" />
              </label>
              <label className="field">Email
                <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
              </label>
              <label className="field">Phone (optional)
                <input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" />
              </label>
              <label className="field">Enquiry type
                <select name="type" defaultValue="Gym membership">
                  <option>Gym membership</option>
                  <option>Coaching</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="field">Message
                <textarea name="message" required rows={5} placeholder="How can we help?" />
              </label>
              <button type="submit" className="gs-button gs-button-primary" disabled>Send enquiry</button>
              <p className="form-note">
                Read our {site.privacyPolicyUrl ? <a href={site.privacyPolicyUrl}>privacy policy</a> :
                  "privacy policy (awaiting confirmation)"} to learn how enquiry information is used.
              </p>
            </form>
          )}

          <div className="contact-details">
            <section aria-labelledby="details-heading" className="details-card">
              <h2 id="details-heading">Get in touch</h2>
              <dl>
                {details.map(({ term, value }) => (
                  <div key={term}><dt>{term}</dt><dd>{value ?? "Awaiting confirmation"}</dd></div>
                ))}
                <div><dt>Address</dt><dd><address>{site.address.street}<br />{site.address.locality}</address></dd></div>
                {(site.memberAccessHours || site.staffedHours || preview) && (
                  <div><dt>Hours</dt><dd>
                    {(site.memberAccessHours || preview) && <p>Member access: {site.memberAccessHours ?? "awaiting confirmation"}</p>}
                    {(site.staffedHours || preview) && <p>Staffed / viewing hours: {site.staffedHours ?? "awaiting confirmation"}</p>}
                  </dd></div>
                )}
              </dl>
              <a href={directions} className="gs-button gs-button-secondary">Get directions<span className="sr-only"> (Google Maps)</span></a>
            </section>
            {preview && <a href={directions} aria-label="Get directions to GetStrength Gym in Penrose" className="map-link">
              <Placeholder label="Map · GS Gym, Penrose" detail="PLACEHOLDER · APPROVED MAP NEEDED" className="map-placeholder" />
            </a>}
            {site.outboundLinks.length > 0 && (
              <ul className="social-links" aria-label="Social media">
                {site.outboundLinks.map(link => (
                  <li key={link.url}><a href={link.url} className="gs-button gs-button-secondary">{link.service}</a></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <JoinCta heading="Ready to join?" text="Sign up for a GS Gym membership online."
        note="Memberships are handled securely through Debit Success." />
    </main>
  );
}

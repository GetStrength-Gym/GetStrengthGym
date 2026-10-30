import type { Metadata } from "next";
import Link from "next/link";
import JoinCta from "@/components/JoinCta";
import Placeholder from "@/components/Placeholder";
import { getSite, isPreviewBuild } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "About GetStrength Gym — Our Story and Coaching" },
  description: "Serious strength training. A welcoming community. About GetStrength Gym in Penrose, Auckland.",
};

// Story, coach and services are TODO(confirm) with the gym (docs/design/five-page-journey.md §7),
// so they show as labelled placeholders in preview and are left out of production.
const OFFERS = [
  { title: "Gym membership", description: "Explore gym membership and access options through Debit Success." },
  { title: "Personal training & coaching", description: "Enquire about coaching, programming and technique support." },
  { title: "Competition prep", description: "Discuss your lifting goals and available competition support." },
];

export default function About() {
  const site = getSite();
  const preview = isPreviewBuild();

  return (
    <main className="about">
      <section className="bg-neutral">
        <div className="page-width section-space section-stack">
          <h1 className="section-heading page-title">About Us</h1>
          <p className="body-large">Serious strength training. A welcoming community.</p>
        </div>
      </section>

      <section aria-labelledby="story-heading">
        <div className="page-width section-space together-row">
          <div className="section-stack">
            <h2 id="story-heading" className="section-heading">Our story</h2>
            <p className="body-large">{site.name} is located at {site.address.street}, {site.address.locality}.</p>
            {preview && <p className="body-large">[Current gym story to be supplied by the owners.]</p>}
          </div>
          <Placeholder label="Gym / team photo" detail="PLACEHOLDER · APPROVED PHOTOGRAPHY NEEDED" className="gym-photo" />
        </div>
      </section>

      {preview && (
        <section aria-labelledby="coach-heading" className="bg-neutral">
          <div className="page-width section-space coach-row">
            <Placeholder label="Portrait: head coach" detail="PLACEHOLDER · APPROVED PHOTOGRAPHY NEEDED" className="coach-photo" />
            <div className="coach-copy">
              <p className="eyebrow">Coach profile · details to confirm</p>
              <h2 id="coach-heading" className="section-heading">Coach profile</h2>
              <p className="body-large">Current coach name, role and biography awaiting confirmation with the gym.</p>
              <Link href="/contact/" className="gs-button gs-button-secondary">Get in touch</Link>
            </div>
          </div>
        </section>
      )}

      {preview && (
        <section aria-labelledby="offer-heading">
          <div className="page-width section-space section-stack">
            <h2 id="offer-heading" className="section-heading">What we offer</h2>
            <p className="text-grey">Services to confirm with the gym — preview only.</p>
            <ul className="benefit-grid">
              {OFFERS.map(offer => (
                <li key={offer.title} className="offer-card">
                  <Placeholder label="Icon / photo" className="offer-photo" />
                  <h3>{offer.title}</h3>
                  <p className="text-grey">{offer.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {preview && (
        <section aria-labelledby="gallery-heading">
          <div className="page-width section-space section-stack">
            <h2 id="gallery-heading" className="section-heading">Inside the gym</h2>
            <div className="gallery-grid">
              {[1, 2, 3, 4].map(number => (
                <Placeholder key={number} label={"Gym photo " + number} detail="PLACEHOLDER · APPROVED PHOTOGRAPHY NEEDED"
                  className="gallery-photo" />
              ))}
            </div>
          </div>
        </section>
      )}

      <JoinCta heading="Train with us" text="Become a GS Gym member."
        note="Memberships are handled securely through Debit Success." />
    </main>
  );
}

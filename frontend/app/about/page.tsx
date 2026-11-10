import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JoinCta from "@/components/JoinCta";
import Placeholder from "@/components/Placeholder";
import { getPhotos, getSite, isPreviewBuild } from "@/lib/content";

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
  const photos = getPhotos();
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
          <Image src={photos.aboutStory.src} alt={photos.aboutStory.alt} width={1200} height={800} className="photo" />
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
              {OFFERS.map((offer, i) => (
                <li key={offer.title} className="benefit-card">
                  <Image src={photos.aboutOffers[i].src} alt={photos.aboutOffers[i].alt} width={800} height={1000} className="benefit-photo" />
                  <div className="benefit-reveal"><p>{offer.description}</p></div>
                  <h3>{offer.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="gallery-heading">
        <div className="page-width section-space section-stack">
          <h2 id="gallery-heading" className="section-heading">Inside the gym</h2>
          <ul className="gallery-grid">
            {photos.aboutGallery.map(photo => (
              <li key={photo.src}><Image src={photo.src} alt={photo.alt} width={1200} height={800} className="photo" /></li>
            ))}
          </ul>
        </div>
      </section>

      <JoinCta heading="Train with us" text="Become a GS Gym member."
        note="Memberships are handled securely through Debit Success." />
    </main>
  );
}

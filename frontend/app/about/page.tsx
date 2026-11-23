import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Coaches from "@/components/Coaches";
import JoinCta from "@/components/JoinCta";
import { getPhotos, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "About GetStrength Gym — Our Story and Coaching" },
  description: "Serious strength training. A welcoming community. About GetStrength Gym in Penrose, Auckland.",
};

// What we offer shows on the live site since 2026-11-23 (visual-polish minutes D13). The coaches come from site.json.
const OFFERS = [
  { title: "Gym membership", description: "Explore gym membership and access options through Debit Success." },
  { title: "Personal training & coaching", description: "Enquire about coaching, programming and technique support." },
  { title: "Competition prep", description: "Discuss your lifting goals and available competition support." },
];

export default function About() {
  const site = getSite();
  const photos = getPhotos();
  if (photos.aboutOffers.length !== OFFERS.length) {
    throw new Error(`content/photos.json: "aboutOffers" needs ${OFFERS.length} photos, one per What we offer card`);
  }

  return (
    <main className="about">
      {/* The story photo doubles as the page header, so About opens with one dark band, not two. */}
      <section aria-labelledby="about-heading" className="together story">
        <Image src={photos.aboutStory.src} alt={photos.aboutStory.alt} width={2880} height={1920} className="together-photo" />
        <div className="page-width together-inner">
          <div className="together-copy section-stack">
            <p className="page-hero-kicker">Since 2001 · Penrose</p>
            <h1 id="about-heading">About Us</h1>
            <h2 className="story-subheading">Our story</h2>
            <p className="body-large">{site.about.story}</p>
          </div>
        </div>
      </section>

      <Coaches actions={<Link href="/contact/" className="gs-button gs-button-secondary">Get in touch</Link>} />

      <section aria-labelledby="offer-heading">
        <div className="page-width section-space section-stack">
          <h2 id="offer-heading" className="section-heading">What we offer</h2>
          <ul className="benefit-grid">
            {OFFERS.map((offer, i) => (
              <li key={offer.title} className="benefit-card">
                <Image src={photos.aboutOffers[i].src} alt={photos.aboutOffers[i].alt} width={800} height={1000} className="benefit-photo" />
                <div className="benefit-copy">
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="gallery-heading">
        <div className="page-width section-space section-stack">
          <h2 id="gallery-heading" className="section-heading">Inside the gym</h2>
          <ul className="gallery-grid">
            {photos.aboutGallery.map((photo, i) => (
              <li key={i}><Image src={photo.src} alt={photo.alt} width={1200} height={800} className="photo" /></li>
            ))}
          </ul>
        </div>
      </section>

      <JoinCta heading="Train with us" text="Become a GS Gym member."
        note="Memberships are handled securely through Debit Success." />
    </main>
  );
}

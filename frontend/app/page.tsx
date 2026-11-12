import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JoinButton from "@/components/JoinButton";
import GymMap from "@/components/GymMap";
import HeroVideo from "@/components/HeroVideo";
import JoinCta from "@/components/JoinCta";
import Placeholder from "@/components/Placeholder";
import PriceList from "@/components/PriceList";
import { getPhotos, getSite, isPreviewBuild, type BENEFIT_ICONS } from "@/lib/content";
import { directionsUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: "GetStrength Gym — Strength Gym in Penrose, Auckland" },
  description: "Build strength. Find your community. Explore GetStrength Gym in Penrose, Auckland, and find your membership.",
};

// Line icons for the Why GS Gym cards, keyed by each benefit's "icon" in site.json.
const ICONS: Record<(typeof BENEFIT_ICONS)[number], React.ReactNode> = {
  coaching: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2.5h6V4M9 13l2 2 4-4" /></>,
  equipment: <path d="M2.5 10v4M6 7v10M18 7v10M21.5 10v4M6 12h12" />,
  community: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20a6 6 0 0 1 12 0M15.5 14.3A4 4 0 0 1 21 18v2" /></>,
};

export default function Home() {
  const site = getSite();
  const photos = getPhotos();
  const preview = isPreviewBuild();
  const directions = directionsUrl(site.address);

  return (
    <main className="home">
      <section className="home-hero" aria-labelledby="hero-heading">
        <HeroVideo video={photos.homeHero.video} poster={photos.homeHero.poster} />
        <div className="page-width hero-inner">
          <div className="hero-copy">
            <h1 id="hero-heading">Build strength. Find your community.</h1>
            <p>{site.home.introduction}</p>
            <div className="hero-actions">
              <JoinButton />
              <a href="#the-gym" className="gs-button gs-button-secondary">Explore the gym</a>
            </div>
          </div>
        </div>
      </section>

      <section id="the-gym" aria-labelledby="why-heading" className="bg-neutral">
        <div className="page-width section-space section-stack">
          <p className="eyebrow">Strength for every level</p>
          <h2 id="why-heading" className="section-heading">Why GS Gym?</h2>
          <p className="body-large">{site.home.whyIntroduction}</p>
          <ol className="benefit-grid">
            {site.home.benefits.map(benefit => (
              <li key={benefit.title} className="benefit-card">
                <Image src={benefit.photo} alt="" width={800} height={1200} className="benefit-photo" />
                <div className="benefit-reveal">
                  <span className="benefit-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">{ICONS[benefit.icon]}</svg>
                  </span>
                  <p>{benefit.description}</p>
                </div>
                <h3>{benefit.title}</h3>
              </li>
            ))}
          </ol>
          <Link href="/about/" className="gs-button gs-button-secondary section-action">Explore About Us</Link>
        </div>
      </section>

      {preview && (
        <section aria-labelledby="coach-heading">
          <div className="page-width section-space coach-row">
            <Placeholder label="Current coach photo needed" detail="PLACEHOLDER · APPROVED PHOTOGRAPHY NEEDED" className="coach-photo" />
            <div className="coach-copy">
              <p className="eyebrow">Meet your coach</p>
              <h2 id="coach-heading" className="section-heading">Coach profile</h2>
              <p className="body-large">Coach role to confirm</p>
              <p className="text-grey">Current coach name, role and biography awaiting confirmation with the gym.</p>
              <p className="text-grey">Approved coach credentials needed.</p>
              <div className="coach-actions">
                <Link href="/contact/" className="gs-button gs-button-primary">Enquire about coaching</Link>
                <Link href="/about/" className="gs-button gs-button-secondary">About the gym</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="together-heading" className="together">
        <Image src={photos.homeTogether.src} alt={photos.homeTogether.alt} width={2880} height={1920} className="together-photo" />
        <div className="page-width together-inner">
          <div className="together-copy section-stack">
            <h2 id="together-heading" className="section-heading">Train together. Grow stronger.</h2>
            <p className="body-large">{site.home.togetherIntroduction}</p>
            <Link href="/about/" className="gs-button gs-button-primary section-action">Read our story <span aria-hidden="true">&nbsp;→</span></Link>
          </div>
        </div>
      </section>

      {preview && (
        <section aria-labelledby="testimonials-heading" className="bg-neutral members">
          <h2 id="testimonials-heading" className="page-width section-heading">What our members say</h2>
          <ul className="member-row" tabIndex={0} aria-label="Member testimonials">
            {photos.homeMembers.map((photo, i) => (
              <li key={i} className="benefit-card member-card">
                <Image src={photo.src} alt={photo.alt} width={1600} height={800} className="benefit-photo" />
                <div className="benefit-reveal"><p>[Member testimonial to be supplied]</p></div>
                <h3>Member {i + 1}</h3>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="location-heading">
        <div className="page-width section-space section-stack">
          <p className="eyebrow">Come train with us</p>
          <h2 id="location-heading" className="section-heading">Find GS Gym</h2>
          <div className="location-row">
            <div className="location-information">
              <address>{site.address.street}<br />{site.address.locality}</address>
              <div className="text-grey">
                {(site.memberAccessHours || preview) && <p>Member access hours: {site.memberAccessHours ?? "awaiting confirmation"}</p>}
                {(site.staffedHours || preview) && <p>Staffed / viewing hours: {site.staffedHours ?? "awaiting confirmation"}</p>}
              </div>
              <a href={directions} className="gs-button gs-button-secondary">Get directions<span className="sr-only"> (Google Maps)</span></a>
              <Link href="/contact/" className="gs-button gs-button-primary">Ask about visiting</Link>
            </div>
            <GymMap name={site.name} address={site.address} />
          </div>
        </div>
      </section>

      <PriceList />
      <JoinCta heading="Find your membership." text="Check Debit Success for membership options, prices and terms."
        note="Opens Debit Success." />
    </main>
  );
}

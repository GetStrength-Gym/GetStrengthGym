import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JoinButton from "@/components/JoinButton";
import GymMap from "@/components/GymMap";
import HeroVideo from "@/components/HeroVideo";
import JoinCta from "@/components/JoinCta";
import Coaches from "@/components/Coaches";
import Marquee from "@/components/Marquee";
import MemberRow from "@/components/MemberRow";
import PriceList from "@/components/PriceList";
import { getPhotos, getSite, isPreviewBuild } from "@/lib/content";
import { directionsUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: "GetStrength Gym — Strength Gym in Penrose, Auckland" },
  description: "Build strength. Find your community. Explore GetStrength Gym in Penrose, Auckland, and find your membership.",
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
              <a href="#memberships" className="gs-button gs-button-secondary">See memberships</a>
            </div>
          </div>
        </div>
      </section>

      {/* TODO(confirm): the partner list is per the project lead (2026-11-16); the gym has not confirmed
          it or supplied logo files, so the band is preview-only. A partner without a logo file shows its name alone. */}
      {preview && site.partners.length > 0 && (
        <Marquee label="Partners">
          {site.partners.map(partner => (
            <li key={partner.name}>
              {/* The name follows the logo, so the logo itself needs no alt text. */}
              {partner.logo && <Image src={partner.logo} alt="" width={64} height={64} className="marquee-logo" />}
              {partner.name}
            </li>
          ))}
        </Marquee>
      )}

      <section id="the-gym" aria-labelledby="why-heading" className="bg-neutral">
        <div className="page-width section-space section-stack">
          <p className="eyebrow">Strength for every level</p>
          <h2 id="why-heading" className="section-heading">Why GS Gym?</h2>
          <p className="body-large">{site.home.whyIntroduction}</p>
          <ol className="benefit-grid">
            {site.home.benefits.map(benefit => (
              <li key={benefit.title} className="benefit-card">
                <Image src={benefit.photo} alt="" width={800} height={1200} className="benefit-photo" />
                <div className="benefit-copy">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/about/" className="gs-button gs-button-secondary section-action">Explore About Us</Link>
        </div>
      </section>

      <PriceList />

      <Coaches actions={
        <div className="coach-actions">
          <Link href="/contact/" className="gs-button gs-button-primary">Enquire about coaching</Link>
          <Link href="/about/" className="gs-button gs-button-secondary">About the gym</Link>
        </div>
      } />

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
          <h2 id="testimonials-heading" className="page-width section-heading">What our lifters say</h2>
          <MemberRow>
            {photos.homeMembers.map((photo, i) => (
              <li key={i} className="member-card">
                <Image src={photo.src} alt={photo.alt} width={1600} height={800} className="member-photo" />
                <p>[Member testimonial to be supplied]</p>
                <h3>Member {i + 1}</h3>
              </li>
            ))}
          </MemberRow>
        </section>
      )}

      <section aria-labelledby="location-heading">
        {/* The heading sits in the left column, so the map lines up with "Come train with us". */}
        <div className="page-width section-space location-row">
          <div className="location-information">
            <p className="eyebrow">Come train with us</p>
            <h2 id="location-heading" className="section-heading">Find GS Gym</h2>
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
      </section>

      <JoinCta heading="Find your membership." text="Check Debit Success for membership options, prices and terms."
        note="Opens Debit Success." />
    </main>
  );
}

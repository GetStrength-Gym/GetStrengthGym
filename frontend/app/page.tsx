import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JoinButton from "@/components/JoinButton";
import JoinCta from "@/components/JoinCta";
import Placeholder from "@/components/Placeholder";
import PriceList from "@/components/PriceList";
import { getAllPosts, getSite, isPreviewBuild } from "@/lib/content";
import { directionsUrl, formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: "GetStrength Gym — Strength Gym in Penrose, Auckland" },
  description: "Build strength. Find your community. Explore GetStrength Gym in Penrose, Auckland, and find your membership.",
};

export default function Home() {
  const site = getSite();
  const preview = isPreviewBuild();
  const posts = getAllPosts().slice(0, 3);
  const directions = directionsUrl(site.address);

  return (
    <main className="home">
      <section className="home-hero" aria-labelledby="hero-heading">
        <div className="page-width hero-inner">
          {preview && <p className="hero-photo-note">PLACEHOLDER · APPROVED MEMBER PHOTOGRAPHY</p>}
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
            {site.home.benefits.map((benefit, i) => (
              <li key={benefit.title} className="benefit-card">
                <p className="eyebrow" aria-hidden="true">{String(i + 1).padStart(2, "0")}</p>
                <h3>{benefit.title}</h3><p className="text-grey">{benefit.description}</p>
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
              <p className="eyebrow">Approved coach credentials needed.</p>
              <div className="coach-actions">
                <Link href="/contact/" className="gs-button gs-button-primary">Enquire about coaching</Link>
                <Link href="/about/" className="gs-button gs-button-secondary">About the gym</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="together-heading">
        <div className="page-width section-space together-row">
          <Placeholder label="Gym interior photo" detail="PLACEHOLDER · APPROVED PHOTOGRAPHY NEEDED" className="gym-photo" />
          <div className="section-stack">
            <h2 id="together-heading" className="section-heading">Train together. Grow stronger.</h2>
            <p className="body-large">{site.home.togetherIntroduction}</p>
            <Link href="/about/" className="text-link">Read our story <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="posts-heading">
          <div className="page-width section-space section-stack">
            <div className="section-title-row">
              <h2 id="posts-heading" className="section-heading">Start strong. Keep learning.</h2>
              <Link href="/blog/" className="text-link">View all posts <span aria-hidden="true">→</span></Link>
            </div>
            <ul className="post-grid">
              {posts.map(post => (
                <li key={post.slug}>
                  {post.image ? <Image src={post.image.src} alt={post.image.alt} width={820} height={480} className="post-photo" /> :
                    <Placeholder label="Post image" detail="PLACEHOLDER · APPROVED PHOTOGRAPHY NEEDED" className="post-photo" />}
                  <p className="post-date"><time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.draft && " · Draft (preview only)"}</p>
                  <h3><Link href={"/blog/" + post.slug + "/"}>{post.title}</Link></h3>
                  <p className="text-grey">{post.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {preview && (
        <section aria-labelledby="testimonials-heading" className="bg-neutral">
          <div className="page-width section-space section-stack">
            <h2 id="testimonials-heading" className="section-heading">What our members say</h2>
            <div className="testimonial-grid">
              {[1, 2, 3].map(number => (
                <Placeholder key={number} label={"Member video " + number}
                  detail="PLACEHOLDER · APPROVED TESTIMONIAL FOOTAGE NEEDED" className="video-placeholder" />
              ))}
            </div>
          </div>
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
            {preview && <a href={directions} aria-label="Get directions to GetStrength Gym in Penrose" className="map-link">
              <Placeholder label="Map · GS Gym, Penrose" detail="PLACEHOLDER · APPROVED MAP NEEDED" className="map-placeholder" />
            </a>}
          </div>
        </div>
      </section>

      <PriceList />
      <JoinCta heading="Find your membership." text="Check Debit Success for membership options, prices and terms."
        note="Opens Debit Success." />
    </main>
  );
}

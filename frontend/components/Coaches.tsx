import Image from "next/image";
import type { ReactNode } from "react";
import { getSite } from "@/lib/content";

// One row per coach, in site.json order. On wide screens every second photo sits on the right.
// `compact` (Home) shows the coaches side by side as cards instead; About keeps the full rows.
export default function Coaches({ actions, compact = false }: { actions: ReactNode; compact?: boolean }) {
  const coaches = getSite().coaches;
  const heading = `Meet your ${coaches.length > 1 ? "coaches" : "coach"}`;
  if (compact) return (
    <section aria-labelledby="coaches-heading" className="bg-neutral">
      <div className="page-width section-space section-stack">
        <h2 id="coaches-heading" className="section-heading">{heading}</h2>
        <ul className="coach-cards">
          {coaches.map(coach => (
            <li key={coach.name} className="coach-card">
              <Image src={coach.photo.src} alt={coach.photo.alt} width={1600} height={1067} className="photo coach-card-photo" />
              <h3>{coach.name}</h3>
              <p className="text-grey">{coach.bio}</p>
            </li>
          ))}
        </ul>
        {actions}
      </div>
    </section>
  );
  return (
    <section aria-labelledby="coaches-heading" className="bg-neutral">
      <div className="page-width section-space coach-list">
        {coaches.map((coach, i) => (
          <article key={coach.name} aria-labelledby={`coach-${i}`} className={"coach-row" + (i % 2 ? " is-flipped" : "")}>
            <Image src={coach.photo.src} alt={coach.photo.alt} width={1600} height={1067} className="photo coach-photo" />
            <div className="coach-copy">
              {i === 0 && <p id="coaches-heading" className="eyebrow">{heading}</p>}
              <h2 id={`coach-${i}`} className="section-heading">{coach.name}</h2>
              <p className="text-grey">{coach.bio}</p>
              {i === coaches.length - 1 && actions}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

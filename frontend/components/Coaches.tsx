import Image from "next/image";
import type { ReactNode } from "react";
import { getSite } from "@/lib/content";

// One row per coach, in site.json order. On wide screens every second photo sits on the right.
export default function Coaches({ actions }: { actions: ReactNode }) {
  const coaches = getSite().coaches;
  return (
    <section aria-label="Coaches" className="bg-neutral">
      <div className="page-width section-space coach-list">
        {coaches.map((coach, i) => (
          <article key={coach.name} aria-labelledby={`coach-${i}`} className={"coach-row" + (i % 2 ? " is-flipped" : "")}>
            <Image src={coach.photo.src} alt={coach.photo.alt} width={1600} height={1067} className="photo coach-photo" />
            <div className="coach-copy">
              {i === 0 && <p className="eyebrow">Meet your {coaches.length > 1 ? "coaches" : "coach"}</p>}
              <h2 id={`coach-${i}`} className="section-heading">{coach.name}</h2>
              <p className="body-large">{coach.role}</p>
              <p className="text-grey">{coach.bio}</p>
              {i === coaches.length - 1 && actions}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

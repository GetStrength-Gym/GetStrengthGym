"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/content";

// Spotlight carousel that cycles: every card sits at an offset from the active one (…, -1, 0, +1, …),
// so after the last member comes the first, with a neighbour on both sides at all times.
export default function MemberCarousel({ photos }: { photos: Photo[] }) {
  const n = photos.length;
  const half = Math.floor(n / 2);
  const [{ active, from }, setPosition] = useState({ active: half, from: half });
  const swipeStart = useRef<number | null>(null);

  const offset = (i: number, centre: number) => ((((i - centre) % n) + n + half) % n) - half;
  const step = (direction: number) => setPosition(p => ({ active: (p.active + direction + n) % n, from: p.active }));

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label="Member testimonials"
      onPointerDown={event => { swipeStart.current = event.clientX; }}
      onPointerCancel={() => { swipeStart.current = null; }}
      onPointerLeave={() => { swipeStart.current = null; }}
      onPointerUp={event => {
        const moved = swipeStart.current === null ? 0 : event.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(moved) > 40) step(moved < 0 ? 1 : -1);
      }}>
      <ul className="carousel-track">
        {photos.map((photo, i) => {
          const now = offset(i, active);
          // A card wrapping from one end to the other jumps while off-screen instead of sliding across.
          const wraps = Math.abs(now - offset(i, from)) > 1;
          return (
            <li key={i} style={{ "--offset": now } as React.CSSProperties}
              className={"benefit-card member-card" + (now === 0 ? " is-active" : "") + (wraps ? " no-slide" : "")}>
              <Image src={photo.src} alt={photo.alt} width={1600} height={800} className="benefit-photo" draggable={false} />
              <div className="benefit-reveal"><p>[Member testimonial to be supplied]</p></div>
              <h3>Member {i + 1}</h3>
            </li>
          );
        })}
      </ul>
      <div className="carousel-controls">
        {([-1, 1] as const).map(direction => (
          <button key={direction} type="button" className="carousel-button" onClick={() => step(direction)}
            aria-label={direction === 1 ? "Next member" : "Previous member"}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={direction === 1 ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

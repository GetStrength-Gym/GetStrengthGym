"use client";

import { Children, cloneElement, useRef, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";

const ADVANCE_MS = 6000; // long enough to read a card

// A card's place relative to the current one in the cycle: 0 is the middle, -1 and 1 the sides.
// shortcut: with fewer than 5 cards the card that wraps round is visible as it crosses; fine for 5 photos.
function offset(i: number, current: number, count: number) {
  const half = Math.floor(count / 2);
  return ((i - current + count + half) % count) - half;
}

// The testimonial cycle. The current card sits in the middle with its neighbours darker on either
// side; it moves on when the current dot's bar fills, and loops. Clicking a side card, an arrow, a
// dot, the arrow keys or a swipe moves it too. The bar is a CSS animation, so it (and the cycle) waits
// while the pointer or keyboard focus is on it, while paused, and never runs under reduced motion.
// A swipe stops it for good, and the pause button covers WCAG 2.2.2.
export default function MemberRow({ children }: { children: ReactNode }) {
  const cards = Children.toArray(children) as ReactElement<{ className?: string; style?: CSSProperties; onClick?: () => void }>[];
  const count = cards.length;
  const touchX = useRef(0);
  const [auto, setAuto] = useState(true);
  const [current, setCurrent] = useState(0);
  const step = (direction: 1 | -1) => setCurrent((c) => (c + direction + count) % count);

  return (
    <div className={"member-carousel" + (auto ? "" : " is-paused")} style={{ "--member-advance": `${ADVANCE_MS}ms` } as CSSProperties}>
      <div className="member-stage">
        <ul className="member-row" tabIndex={0} aria-label="Lifter testimonials"
          onKeyDown={(e) => { if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); step(e.key === "ArrowLeft" ? -1 : 1); } }}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) { setAuto(false); step(dx < 0 ? 1 : -1); }
          }}>
          {cards.map((card, i) => {
            const place = offset(i, current, count);
            return cloneElement(card, {
              className: [card.props.className, place === 0 && "is-current", Math.abs(place) > 1 && "is-far"].filter(Boolean).join(" "),
              style: { "--offset": place } as CSSProperties,
              onClick: place === 0 ? undefined : () => setCurrent(i),
            });
          })}
        </ul>
        <button type="button" className="member-arrow is-previous" aria-label="Previous testimonial" onClick={() => step(-1)}><Arrow d="M15 18l-6-6 6-6" /></button>
        <button type="button" className="member-arrow is-next" aria-label="Next testimonial" onClick={() => step(1)}><Arrow d="M9 18l6-6-6-6" /></button>
      </div>
      <div className="member-dots">
        {cards.map((_, i) => (
          <button key={i} type="button" className="member-dot" aria-label={`Show testimonial ${i + 1}`}
            aria-current={i === current || undefined} onClick={() => setCurrent(i)}>
            {/* Remounted on every move, so the bar starts empty; filling it moves the cycle on. */}
            {i === current && <span key={current} className="member-dot-fill" onAnimationEnd={() => step(1)} />}
          </button>
        ))}
      </div>
      {/* Play moves one card straight away, so it visibly works without waiting a full turn. */}
      <button type="button" className="member-auto" aria-label={auto ? "Pause testimonials" : "Play testimonials"}
        onClick={() => { if (!auto) step(1); setAuto(!auto); }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {auto ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </button>
    </div>
  );
}

function Arrow({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  );
}

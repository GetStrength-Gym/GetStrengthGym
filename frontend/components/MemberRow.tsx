"use client";

import { Children, cloneElement, useEffect, useRef, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";

const ADVANCE_MS = 6000; // long enough to read a card
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// A card's place relative to the current one in the cycle: 0 is the middle, -1 and 1 the sides.
// shortcut: with fewer than 5 cards the card that wraps round is visible as it crosses; fine for 5 photos.
function offset(i: number, current: number, count: number) {
  const half = Math.floor(count / 2);
  return ((i - current + count + half) % count) - half;
}

// The testimonial cycle. The current card sits in the middle with its neighbours smaller on either
// side; it moves on every few seconds and loops. Clicking a side card, an arrow, the arrow keys or a
// swipe moves it too. It waits while the pointer or keyboard focus is on it, a swipe stops it for
// good, and nothing moves by itself under reduced motion.
export default function MemberRow({ children }: { children: ReactNode }) {
  const cards = Children.toArray(children) as ReactElement<{ className?: string; style?: CSSProperties; onClick?: () => void }>[];
  const count = cards.length;
  const waiting = useRef(false); // pointer or focus is on the cycle
  const touchX = useRef(0);
  const [auto, setAuto] = useState(true);
  const [current, setCurrent] = useState(0);
  const step = (direction: 1 | -1) => setCurrent((c) => (c + direction + count) % count);

  useEffect(() => {
    if (!auto || reducedMotion()) return;
    const timer = setInterval(() => {
      if (!waiting.current && !document.hidden) setCurrent((c) => (c + 1) % count);
    }, ADVANCE_MS);
    return () => clearInterval(timer);
  }, [auto, count]);

  return (
    <div className="member-carousel"
      onPointerEnter={() => { waiting.current = true; }} onPointerLeave={() => { waiting.current = false; }}
      onFocus={() => { waiting.current = true; }} onBlur={() => { waiting.current = false; }}>
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
  );
}

function Arrow({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const ADVANCE_MS = 6000; // long enough to read a card
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Glide to the next card, or back to the first from the end.
function advance(row: HTMLUListElement) {
  const card = row.firstElementChild;
  if (!card) return;
  const atEnd = row.scrollLeft + row.clientWidth > row.scrollWidth - 8;
  row.scrollTo({ left: atEnd ? 0 : row.scrollLeft + card.getBoundingClientRect().width + 16, behavior: "smooth" });
}

// The testimonial row. Native scroll-snap does the swiping and keyboard scrolling. On top of
// that the row glides to the next card every few seconds and loops back at the end. It waits
// while the pointer or keyboard focus is on the cards, stops for good once the visitor scrolls or
// steps it themselves, has a pause button (WCAG 2.2.2), and never starts under reduced motion.
export default function MemberRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const waiting = useRef(false); // pointer or focus is on the row
  const [auto, setAuto] = useState(true);
  const [edge, setEdge] = useState<"start" | "end" | null>("start");

  const step = (direction: 1 | -1) => {
    const row = ref.current;
    const card = row?.firstElementChild;
    if (row && card) row.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: reducedMotion() ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (!auto || reducedMotion()) return;
    const timer = setInterval(() => {
      if (ref.current && !waiting.current && !document.hidden) advance(ref.current);
    }, ADVANCE_MS);
    return () => clearInterval(timer);
  }, [auto]);

  const onScroll = () => {
    const row = ref.current;
    if (!row) return;
    setEdge(row.scrollLeft < 8 ? "start" : row.scrollLeft + row.clientWidth > row.scrollWidth - 8 ? "end" : null);
  };
  const takeOver = () => setAuto(false); // the visitor is driving now

  return (
    <div className="member-carousel">
      {/* Only the cards count as reading: on the whole carousel, pressing Play focused the Play
          button and the row waited for that focus to leave before it moved. */}
      <ul ref={ref} className="member-row" tabIndex={0} aria-label="Lifter testimonials" onScroll={onScroll}
        onPointerEnter={() => { waiting.current = true; }} onPointerLeave={() => { waiting.current = false; }}
        onFocus={() => { waiting.current = true; }} onBlur={() => { waiting.current = false; }}
        onTouchStart={takeOver} onWheel={takeOver} onKeyDown={takeOver}>{children}</ul>
      <div className="page-width member-controls">
        {/* Play moves one card straight away, so it visibly works without waiting a full turn. */}
        <button type="button" className="member-auto" aria-label={auto ? "Pause testimonials" : "Play testimonials"}
          onClick={() => { if (!auto && ref.current) advance(ref.current); setAuto(!auto); }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {auto ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>
        <button type="button" aria-label="Previous testimonial" disabled={edge === "start"} onClick={() => { takeOver(); step(-1); }}><Arrow d="M15 18l-6-6 6-6" /></button>
        <button type="button" aria-label="Next testimonial" disabled={edge === "end"} onClick={() => { takeOver(); step(1); }}><Arrow d="M9 18l6-6-6-6" /></button>
      </div>
    </div>
  );
}

function Arrow({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  );
}

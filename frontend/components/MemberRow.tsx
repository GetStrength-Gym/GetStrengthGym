"use client";

import { useRef, useState, type ReactNode } from "react";

// The testimonial row: native scroll-snap does the swiping and keyboard scrolling; the two
// buttons step one card at a time for visitors who don't know the row scrolls.
export default function MemberRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState<"start" | "end" | null>("start");

  const step = (direction: 1 | -1) => {
    const row = ref.current;
    const card = row?.firstElementChild;
    if (row && card) row.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16) });
  };
  const onScroll = () => {
    const row = ref.current;
    if (!row) return;
    setEdge(row.scrollLeft < 8 ? "start" : row.scrollLeft + row.clientWidth > row.scrollWidth - 8 ? "end" : null);
  };

  return (
    <>
      <ul ref={ref} className="member-row" tabIndex={0} aria-label="Member testimonials" onScroll={onScroll}>{children}</ul>
      <div className="page-width member-controls">
        <button type="button" aria-label="Previous testimonial" disabled={edge === "start"} onClick={() => step(-1)}><Arrow d="M15 18l-6-6 6-6" /></button>
        <button type="button" aria-label="Next testimonial" disabled={edge === "end"} onClick={() => step(1)}><Arrow d="M9 18l6-6-6-6" /></button>
      </div>
    </>
  );
}

function Arrow({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  );
}

"use client";

import { useState, type ReactNode } from "react";

// A looping band of list items (pass <li> children). The second copy only exists to make the
// loop seamless, so it is hidden from screen readers. It pauses under the pointer and has a
// pause button, because anything that moves for more than 5 seconds needs one (WCAG 2.2.2).
// Reduced motion shows the items as a still row (globals.css).
export default function Marquee({ label, children }: { label: string; children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={"marquee" + (paused ? " is-paused" : "")}>
      <p className="marquee-label">{label}</p>
      <div className="marquee-window">
        <ul className="marquee-track" aria-label={label}>{children}</ul>
        <ul className="marquee-track" aria-hidden="true">{children}</ul>
      </div>
      <button type="button" className="marquee-pause" aria-label={paused ? "Play the moving band" : "Pause the moving band"} onClick={() => setPaused(!paused)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M8 5v14l11-7z" /> : <path d="M6 5h4v14H6zM14 5h4v14h-4z" />}
        </svg>
      </button>
    </div>
  );
}

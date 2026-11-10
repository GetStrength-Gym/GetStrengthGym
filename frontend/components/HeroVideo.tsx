"use client";

import { useEffect, useRef, useState } from "react";

// Decorative looping background. Motion over 5 s needs a pause control (WCAG 2.2.2), and
// visitors who ask for reduced motion only see the poster.
export default function HeroVideo({ video, poster }: { video: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.muted = true; // browsers only autoplay muted video
    element.play().catch(() => {});
  }, []);

  return (
    <>
      <video ref={ref} className="hero-video" src={video} poster={poster} muted loop playsInline preload="metadata"
        aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <button type="button" className="hero-video-toggle" aria-label={playing ? "Pause video" : "Play video"}
        onClick={() => (ref.current?.paused ? ref.current.play().catch(() => {}) : ref.current?.pause())}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </button>
    </>
  );
}

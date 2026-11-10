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
      <button type="button" className="hero-video-toggle"
        onClick={() => (ref.current?.paused ? ref.current.play().catch(() => {}) : ref.current?.pause())}>
        {playing ? "Pause video" : "Play video"}
      </button>
    </>
  );
}

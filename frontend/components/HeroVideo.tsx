"use client";

import { useRef, useState, useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

// Desktop visitors get the video straight away. Phones, reduced motion and data saver start
// on the poster and download nothing until the visitor presses play.
function autoplayAllowed(): boolean {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return matchMedia("(min-width: 960px)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches && !saveData;
}

// Decorative looping background. Motion over 5 s needs a pause control (WCAG 2.2.2).
export default function HeroVideo({ video, poster }: { video: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const auto = useSyncExternalStore(noSubscribe, autoplayAllowed, () => false);
  const [requested, setRequested] = useState(false);
  const [playing, setPlaying] = useState(false);
  const loaded = auto || requested; // the file is only fetched once this is true

  const toggle = () => {
    if (!loaded) return setRequested(true); // autoPlay starts it once the source is attached
    if (ref.current?.paused) ref.current.play().catch(() => {});
    else ref.current?.pause();
  };

  return (
    <>
      <video ref={ref} className="hero-video" src={loaded ? video : undefined} poster={poster} autoPlay={loaded} muted loop
        playsInline preload="none" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <button type="button" className="hero-video-toggle" aria-label={playing ? "Pause video" : "Play gym video"} onClick={toggle}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </button>
    </>
  );
}

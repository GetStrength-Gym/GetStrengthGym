import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/lib/content";

// The dark photo header on Contact, matching the one Events builds in EventsCalendar.
export default function PageHero({ photo, children }: { photo: Photo; children: ReactNode }) {
  return (
    <section className="page-hero">
      <Image src={photo.src} alt={photo.alt} width={1600} height={800} className="page-hero-photo" preload />
      <div className="page-width page-hero-inner">
        <div className="page-hero-copy">{children}</div>
      </div>
    </section>
  );
}

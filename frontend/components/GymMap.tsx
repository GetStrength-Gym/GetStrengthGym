import type { Site } from "@/lib/content";

// Google's keyless embed; it only loads when scrolled near, so it costs nothing above the fold.
export default function GymMap({ name, address }: { name: string; address: Site["address"] }) {
  const query = encodeURIComponent(name + ", " + address.street + ", " + address.locality);
  return (
    <iframe src={"https://www.google.com/maps?q=" + query + "&output=embed"} title={"Map showing " + name + ", " + address.street}
      className="gym-map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
  );
}

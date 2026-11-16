import type { Site } from "@/lib/content";

// Google's keyless embed. It loads by itself when scrolled near, so it costs nothing above the
// fold; until it paints, the slot shows the address instead of an empty box.
export default function GymMap({ name, address }: { name: string; address: Site["address"] }) {
  const query = encodeURIComponent(name + ", " + address.street + ", " + address.locality);
  return (
    <div className="gym-map">
      <p className="gym-map-address" aria-hidden="true">{address.street}<br />{address.locality}</p>
      <p className="gym-map-note" aria-hidden="true">Loading map…</p>
      <iframe src={"https://www.google.com/maps?q=" + query + "&output=embed"} title={"Map showing " + name + ", " + address.street}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    </div>
  );
}

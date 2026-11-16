"use client";

import { useState } from "react";
import type { Site } from "@/lib/content";

// The slot shows the address straight away. Google's keyless embed is only loaded when the
// visitor asks for it, so nothing is sent to Google before then.
export default function GymMap({ name, address }: { name: string; address: Site["address"] }) {
  const [open, setOpen] = useState(false);
  const query = encodeURIComponent(name + ", " + address.street + ", " + address.locality);
  return (
    <div className="gym-map">
      {open ? (
        <>
          <p className="gym-map-loading" role="status">Loading map…</p>
          <iframe src={"https://www.google.com/maps?q=" + query + "&output=embed"} title={"Map showing " + name + ", " + address.street}
            referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </>
      ) : (
        <>
          <p className="gym-map-address">{address.street}<br />{address.locality}</p>
          <button type="button" className="gs-button gs-button-secondary" onClick={() => setOpen(true)}>Load interactive map</button>
          <p className="gym-map-note">Loads Google Maps.</p>
        </>
      )}
    </div>
  );
}

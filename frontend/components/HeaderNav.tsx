"use client";

import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/lib/content";
import NavLinks from "./NavLinks";

// Phones: a Menu button opens the links under the header bar. Desktop shows the links in the
// bar and hides the button (globals.css).
export default function HeaderNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  // A tap anywhere outside the open menu closes it.
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!nav.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  };

  return (
    <nav ref={nav} aria-label="Main" className={"header-menu" + (open ? " is-open" : "")}
      onKeyDown={event => { if (event.key === "Escape" && open) close(true); }}>
      <button ref={button} type="button" className="header-menu-button" aria-expanded={open} aria-controls="header-links"
        onClick={() => setOpen(!open)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
        </svg>
        Menu
      </button>
      {/* Following a link closes the menu. */}
      <div id="header-links" className="header-links" onClick={() => close(false)}>
        <NavLinks links={links} className="header-nav" />
      </div>
    </nav>
  );
}

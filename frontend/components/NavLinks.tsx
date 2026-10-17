"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/content";

// Client component only so the current page can be marked with aria-current. The links
// come from content/site.json via the server-side header and footer.
export default function NavLinks({ links, className = "" }: { links: NavLink[]; className?: string }) {
  const pathname = usePathname();
  const current = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href);

  return (
    <ul className={className}>
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            aria-current={current(href) ? "page" : undefined}
            className="inline-flex min-h-11 items-center px-2 font-medium underline-offset-8 hover:underline aria-[current=page]:underline aria-[current=page]:decoration-red aria-[current=page]:decoration-2"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

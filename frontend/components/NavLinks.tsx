"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/content";

export default function NavLinks({ links, className = "" }: { links: NavLink[]; className?: string }) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link href={href}
            aria-current={(href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href)) ? "page" : undefined}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

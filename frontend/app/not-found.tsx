import type { Metadata } from "next";
import Link from "next/link";

// The 404 page: exported as out/404.html, which CloudFront serves for missing pages
// (ADR-007). Unstyled on purpose; styling is GS-25.
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>There is no page at this address.</p>
      <p>
        <Link href="/">Go to the home page</Link>
      </p>
    </main>
  );
}

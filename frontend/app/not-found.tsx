import type { Metadata } from "next";
import Link from "next/link";

// The 404 page: exported as out/404.html, which CloudFront serves for missing pages (ADR-007).
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main>
      <section className="bg-neutral">
        <div className="page-width section-space section-stack">
          <h1 className="section-heading page-title">Page not found</h1>
          <p className="body-large">There is no page at this address.</p>
          <div className="coach-actions">
            <Link href="/" className="gs-button gs-button-primary">Go to the home page</Link>
            <Link href="/contact/" className="gs-button gs-button-secondary">Contact the gym</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Plan } from "./content";

// Display helpers shared by the blog pages and the price list.

/** "2026-10-10" -> "10 October 2026". Dates are calendar days, so format in UTC. */
export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** A plan's price as shown on the site. A null price never shows as blank or $0 (ADR-006). */
export function formatPrice(plan: Pick<Plan, "price" | "period">, currency: string): string {
  if (plan.price === null) return "Contact us for pricing";
  const amount = new Intl.NumberFormat("en-NZ", { style: "currency", currency }).format(plan.price);
  return plan.period ? `${amount} / ${plan.period}` : amount;
}

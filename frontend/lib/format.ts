import type { Plan, Site } from "./content";

// Display helpers shared by the pages and the price list.

/** Google Maps directions to the gym, used by Home and Contact. */
export function directionsUrl(address: Site["address"]): string {
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address.street + ", " + address.locality);
}

/** A tel: link for a New Zealand number written locally, such as "09 622 2885" → "tel:+6496222885". */
export function telUrl(phone: string): string {
  return "tel:+64" + phone.replace(/\D/g, "").replace(/^0/, "");
}

/** A plan's price as shown on the site: "$30" for whole dollars, "$27.99" otherwise. A null price never
 *  shows as blank or $0 (ADR-006). */
export function formatPrice(plan: Pick<Plan, "price" | "period">, currency: string): string {
  if (plan.price === null) return "Contact us for pricing";
  const amount = new Intl.NumberFormat("en-NZ", { style: "currency", currency, trailingZeroDisplay: "stripIfInteger" }).format(plan.price);
  return plan.period ? `${amount} / ${plan.period}` : amount;
}

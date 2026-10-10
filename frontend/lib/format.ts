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

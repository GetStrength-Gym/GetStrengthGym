import { getPrices } from "@/lib/content";
import { formatPrice } from "@/lib/format";

// Membership prices from content/prices.json (or the sample file in preview builds).
// Server component: read at build time. Unstyled on purpose; styling is GS-25.

export default function PriceList() {
  const prices = getPrices();

  return (
    <section aria-labelledby="price-list-heading">
      <h2 id="price-list-heading">Membership prices</h2>
      {prices.sample && (
        <p>
          <strong>Sample prices — preview only</strong>
        </p>
      )}
      <ul>
        {prices.plans.map((plan) => (
          <li key={plan.id}>
            {plan.name}: {formatPrice(plan, prices.currency)}
          </li>
        ))}
      </ul>
    </section>
  );
}

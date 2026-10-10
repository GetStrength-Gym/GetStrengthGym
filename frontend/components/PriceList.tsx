import { getPrices, type Plan } from "@/lib/content";

// Membership prices from content/prices.json (or the sample file in preview builds).
// Server component: read at build time. Unstyled on purpose; styling is GS-25.

function formatPrice(plan: Plan, currency: string): string {
  if (plan.price === null) return "Contact us for pricing";
  const amount = new Intl.NumberFormat("en-NZ", { style: "currency", currency }).format(plan.price);
  return plan.period ? `${amount} per ${plan.period}` : amount;
}

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

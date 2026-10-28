import { getPrices } from "@/lib/content";
import { formatPrice } from "@/lib/format";

export default function PriceList() {
  const prices = getPrices();
  return (
    <section id="memberships" aria-labelledby="memberships-heading" className="bg-neutral">
      <div className="page-width memberships-section">
        <div className="membership-intro">
          <p className="eyebrow">Memberships</p>
          <h2 id="memberships-heading" className="section-heading">Choose how you train.</h2>
          <p className="body-large">Explore the available plans below. Check Debit Success for membership options, prices and terms.</p>
          {prices.sample && <p className="text-grey">Unconfirmed prices and terms — preview only. Confirm current details with the gym.</p>}
        </div>
        <ul className="membership-grid">
          {prices.plans.map(plan => (
            <li key={plan.id} className="membership-card">
              <h3>{plan.name}</h3>
              <p className="membership-price">{formatPrice(plan, prices.currency)}</p>
              {plan.details.map(detail => <p key={detail} className="text-grey">{detail}</p>)}
            </li>
          ))}
        </ul>
        <div className="day-pass">
          <h3>Casual day pass</h3>
          {prices.dayPass.price !== null && <p className="membership-price">{formatPrice({ price: prices.dayPass.price, period: "visit" }, prices.currency)}</p>}
          <p className="text-grey">{prices.dayPass.howToBuy ?? "Ask the gym for the day-pass price and purchase details."}</p>
        </div>
      </div>
    </section>
  );
}

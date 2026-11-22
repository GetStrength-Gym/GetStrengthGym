import { getPrices } from "@/lib/content";
import { formatPrice } from "@/lib/format";

export default function PriceList() {
  const prices = getPrices();
  return (
    <section id="memberships" aria-labelledby="memberships-heading">
      <div className="page-width memberships-section">
        <div className="membership-intro">
          <p className="eyebrow">Memberships</p>
          <h2 id="memberships-heading" className="section-heading">Choose how you train.</h2>
          <p className="body-large">Compare the plans below. Sign-up, billing and terms are handled on Debit Success.</p>
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
        <div className="pass-row">
          {[
            { pass: prices.dayPass, title: "Casual day pass", period: "visit", name: "a day pass" },
            { pass: prices.weeklyPass, title: "Weekly pass", period: "week", name: "a weekly pass" },
          ].map(({ pass, title, period, name }) => (
            <div key={title} className="day-pass">
              <h3>{title}</h3>
              <p className="membership-price">{formatPrice({ price: pass.price, period }, prices.currency)}</p>
              <p className="text-grey">{pass.howToBuy ?? `Ask the gym how to buy ${name}.`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

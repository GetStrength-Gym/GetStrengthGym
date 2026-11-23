import { getPrices } from "@/lib/content";
import { formatPrice } from "@/lib/format";

// The amount large and the period small, so prices are easy to compare at a glance.
// An unset price shows "Contact us for pricing" at a smaller size.
function Price({ price, text }: { price: number | null; text: string }) {
  const [amount, period] = text.split(" / ");
  return (
    <p className={"membership-price" + (price === null ? " is-unset" : "")}>
      {amount}{period && <span className="membership-period"> / {period}</span>}
    </p>
  );
}

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
              <Price price={plan.price} text={formatPrice(plan, prices.currency)} />
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
              <Price price={pass.price} text={formatPrice({ price: pass.price, period }, prices.currency)} />
              <p className="text-grey">{pass.howToBuy ?? `Ask the gym how to buy ${name}.`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

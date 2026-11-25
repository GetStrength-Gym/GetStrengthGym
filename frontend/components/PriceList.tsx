import Link from "next/link";
import JoinButton from "./JoinButton";
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
          <p className="body-large">Compare the plans below, then sign up online through the Join GS Gym link at the end.</p>
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
        {/* The one Join action in the section, after the visitor has compared every plan and pass. */}
        <div className="join-panel">
          <div className="join-panel-copy">
            <h3>Ready to join?</h3>
            <p>Sign up online through our Debit Success form, which also sets up your billing and terms.</p>
          </div>
          <div className="join-panel-actions">
            <JoinButton />
            <Link href="/contact/" className="join-panel-link">Questions first? Contact us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

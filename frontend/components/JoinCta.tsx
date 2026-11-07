import JoinButton from "./JoinButton";

// The dark Join band that closes Home, About Us and Contact.
export default function JoinCta({ heading, text, note }: { heading: string; text: string; note: string }) {
  return (
    <section className="membership-cta" aria-labelledby="join-heading">
      <div className="page-width section-space section-stack">
        <h2 id="join-heading" className="section-heading">{heading}</h2>
        <p>{text}</p>
        <JoinButton />
        <p className="cta-note">{note}</p>
      </div>
    </section>
  );
}

// Logo for an outbound link by its `service` in site.json; a service without a logo shows its name.
export default function SocialIcon({ service }: { service: string }) {
  if (service !== "Instagram") return <>{service}</>;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

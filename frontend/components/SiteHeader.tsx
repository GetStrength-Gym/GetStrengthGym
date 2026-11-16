import Image from "next/image";
import Link from "next/link";
import { getSite } from "@/lib/content";
import JoinButton from "./JoinButton";
import HeaderNav from "./HeaderNav";

export default function SiteHeader() {
  const site = getSite();
  return (
    <header className="site-header">
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="page-width header-inner">
        <Link href="/" aria-label={site.name + ", home"}>
          <Image src="/images/brand/getstrength-primary.png" width={480} height={343}
            alt={site.name} className="header-logo" preload />
        </Link>
        <JoinButton className="header-join" />
        <HeaderNav links={site.nav} />
      </div>
    </header>
  );
}

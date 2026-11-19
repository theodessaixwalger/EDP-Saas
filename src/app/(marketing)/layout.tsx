import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { SkipLink } from "@/components/shared/skip-link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SkipLink />
      <MarketingNavbar />
      <main id="contenu" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
      <MarketingFooter />
    </div>
  );
}

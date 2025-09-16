import { UtilityHeader } from "@/components/layout/UtilityHeader";
import { Footer } from "@/components/layout/Footer";

// This layout wraps our simple utility pages like Imprint and Privacy Policy.
export default function UtilityPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <UtilityHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

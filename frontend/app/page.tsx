import { Hero } from "@/components/features/hero/Hero";
import { VotingSection } from "@/components/features/voting/VotingSection";
import { TicketSection } from "@/components/features/tickets/TicketSection";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans text-navy selection:bg-gold selection:text-navy">
      <Hero />
      <VotingSection />
      <TicketSection />
      <Footer />
    </main>
  );
}

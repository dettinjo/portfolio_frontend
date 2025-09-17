import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="kontakt" className="text-center">
      <h2 className="text-3xl font-bold">Interesse geweckt?</h2>
      <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
        Schreiben Sie mir eine Nachricht für Buchungsanfragen, Kooperationen
        oder um einfach nur &apos;Hallo&apos; zu sagen.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild>
          <a href="mailto:deine-foto-email@example.com">Nachricht schreiben</a>
        </Button>
        <Button asChild variant="secondary">
          <a href="https://instagram.com/dein-profil" target="_blank">
            Auf Instagram folgen
          </a>
        </Button>
      </div>
    </section>
  );
}

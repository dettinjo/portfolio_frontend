import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export function ContactSection() {
  return (
    <section id="kontakt" className="text-center">
      <h2 className="text-3xl font-bold">Lassen Sie uns zusammenarbeiten</h2>
      <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
        Ich bin offen für neue Projekte und Herausforderungen. Kontaktieren Sie
        mich gerne für eine Zusammenarbeit oder einen Austausch.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild variant="outline" size="icon">
          <a href="mailto:deine-email@example.com">
            <Mail />
          </a>
        </Button>
        <Button asChild variant="outline" size="icon">
          <a href="https://github.com/dein-profil" target="_blank">
            <Github />
          </a>
        </Button>
        <Button asChild variant="outline" size="icon">
          <a href="https://linkedin.com/in/dein-profil" target="_blank">
            <Linkedin />
          </a>
        </Button>
      </div>
    </section>
  );
}

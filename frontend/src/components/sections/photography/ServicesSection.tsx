import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ServicesSection() {
  return (
    <section id="services">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold">Services</h2>
        <p className="mt-2 text-muted-foreground">
          Wie ich Ihnen helfen kann, Ihre Momente festzuhalten.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Portraitfotografie</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Individuelle Portraits, die Ihre Persönlichkeit einfangen.</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Eventfotografie</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dokumentation Ihrer besonderen Anlässe und Veranstaltungen.</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Produktfotografie</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ästhetische Darstellung Ihrer Produkte für Web und Print.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

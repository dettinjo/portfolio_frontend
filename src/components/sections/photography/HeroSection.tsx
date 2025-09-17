import Image from "next/image"; // <-- Import the component

export function HeroSection() {
  return (
    <section className="relative h-[60vh] ...">
      <div className="absolute inset-0 bg-black/50 z-10" />
      {/* THE FIX: Replace <img> with <Image> and add fill, sizes, priority props */}
      <Image
        src="https://placehold.co/1200x800/000000/FFFFFF/png?text=Ihr+bestes+Foto"
        alt="Hero Image"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        priority // Tells Next.js to load this image first
      />
      <div className="z-20">{/* ... */}</div>
    </section>
  );
}

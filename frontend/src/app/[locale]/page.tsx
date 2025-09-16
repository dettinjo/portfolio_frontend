import { Terminal, Camera } from "lucide-react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";

// We MUST use standard <a> tags here to force navigation to a different domain.
// The `Link` component is only for navigating within the same domain.

export default function HomePage() {
  // Read the domain names from environment variables for flexibility
  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";
  const photographyDomain =
    process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || "photosby.joeldettinger.de";

  return (
    <>
      <MinimalHeader />
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* --- THE FIX IS HERE --- */}
          {/* This is now a standard `<a>` tag pointing to the absolute URL */}
          <a
            href={`https://${softwareDomain}`}
            className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 transition-colors duration-300 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 focus:ring-offset-background"
          >
            <Terminal
              className="h-28 w-28 text-foreground transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.25}
            />
            {/* The text here can be hardcoded as this page is not internationalized */}
            <span className="text-3xl font-semibold text-foreground">Code</span>
          </a>

          {/* --- AND HERE --- */}
          <a
            href={`https://s${photographyDomain}`}
            className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 transition-colors duration-300 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 focus:ring-offset-background"
          >
            <Camera
              className="h-28 w-28 text-foreground transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.25}
            />
            <span className="text-3xl font-semibold text-foreground">
              Photos
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

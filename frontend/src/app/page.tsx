import { Terminal, Camera } from "lucide-react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";

export default function HomePage() {
  return (
    <>
      <MinimalHeader />
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* Use <a> tags to force a server request for middleware redirection */}
          <a
            href="/software"
            className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 ..."
          >
            <Terminal className="h-28 w-28 text-foreground ..." />
            <span className="text-3xl font-semibold text-foreground">Code</span>
          </a>
          <a
            href="/photography"
            className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 ..."
          >
            <Camera className="h-28 w-28 text-foreground ..." />
            <span className="text-3xl font-semibold text-foreground">
              Photos
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

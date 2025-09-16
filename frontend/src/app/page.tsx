import { Terminal, Camera } from "lucide-react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
// 1. We switch back to using the standard Next.js Link component
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <MinimalHeader />
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* 2. We use the Link component with `prefetch={false}` */}
          <Link
            href="/software"
            prefetch={false} // This helps ensure the middleware is triggered
            className="group flex flex-col items-center justify-center ..."
          >
            <Terminal className="h-28 w-28 ..." />
            <span className="text-3xl font-semibold ...">Code</span>
          </Link>

          <Link
            href="/photography"
            prefetch={false}
            className="group flex flex-col items-center justify-center ..."
          >
            <Camera className="h-28 w-28 ..." />
            <span className="text-3xl font-semibold ...">Photos</span>
          </Link>
        </div>
      </div>
    </>
  );
}

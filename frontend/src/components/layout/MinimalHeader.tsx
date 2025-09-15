// src/components/layout/MinimalHeader.tsx
import { ThemeToggle } from "./ThemeToggle";

export function MinimalHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 p-4">
      <div className="container mx-auto flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}

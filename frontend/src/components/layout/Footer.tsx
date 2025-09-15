import React from "react";

export function Footer() {
  return (
    <footer className="p-4 border-t mt-16">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Mein Name. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}

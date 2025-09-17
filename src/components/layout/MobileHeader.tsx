"use client";

import React from "react";
// 1. Import the necessary title and description components
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

// Define the shape of the links
interface NavLink {
  href: string;
  label: string;
}

// Update the props to accept children for the toggles
interface MobileNavProps {
  navLinks: NavLink[];
  children: React.ReactNode;
}

export function MobileNav({ navLinks, children }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        {/* 2. ADD A SHEET HEADER FOR ACCESSIBILITY */}
        <SheetHeader>
          {/* This title is required for screen readers */}
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          {/* This description provides more context for screen readers */}
          <SheetDescription className="sr-only">
            Main navigation links and display settings.
          </SheetDescription>
        </SheetHeader>

        <nav className="grid gap-6 text-lg font-medium mt-8">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <a
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <SheetFooter className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2">{children}</div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

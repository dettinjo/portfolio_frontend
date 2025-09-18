"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  navLinks?: NavLink[];
  children: React.ReactNode;
}

export function MobileNav({ navLinks, children }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false}>
        <VisuallyHidden asChild>
          <SheetHeader>
            <SheetTitle>Mobile Navigation Menu</SheetTitle>
          </SheetHeader>
        </VisuallyHidden>

        {/* --- THIS IS THE FIX --- */}
        {/* The main container now pushes all content to the bottom-right */}
        <div className="flex h-full flex-col justify-end items-end p-0">
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </SheetClose>

          {/* This inner div stacks the nav and toggles */}
          <div className="flex flex-col items-end gap-8">
            {navLinks && navLinks.length > 0 && (
              <nav className="grid gap-6 text-lg font-medium text-right">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="font-bold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            )}

            <div className="flex items-center gap-2">{children}</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client"; // This component needs to be a client component for animations

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Instagram } from "lucide-react";
import { motion } from "framer-motion"; // 1. Import motion

interface ProfileHeaderProps {
  name: string;
  bio: string;
  avatarSrc: string;
}

export function ProfileHeaderSection({
  name,
  bio,
  avatarSrc,
}: ProfileHeaderProps) {
  return (
    // 2. Wrap the section in a motion.div
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
    >
      <div className="flex-shrink-0">
        <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-foreground">
          <AvatarImage src={avatarSrc} alt={`Profile picture of ${name}`} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
          <BadgeCheck className="h-6 w-6 fill-foreground text-background" />
        </div>
        <p className="mt-4 max-w-xl text-muted-foreground">{bio}</p>
        <div className="mt-6 flex items-center justify-center md:justify-start">
          <Button asChild variant="secondary">
            <a
              href="https://instagram.com/joeldettinger"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile for @joeldettinger"
            >
              <Instagram className="mr-2 h-4 w-4" />
              @joeldettinger
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

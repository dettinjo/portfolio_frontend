// src/components/ProficiencyBar.tsx
"use client";

import { cn } from "@/lib/utils";

interface ProficiencyBarProps {
  level: number;
  maxLevel?: number;
  className?: string;
}

export function ProficiencyBar({
  level,
  maxLevel = 5,
  className,
}: ProficiencyBarProps) {
  const percentage = (level / maxLevel) * 100;

  return (
    <div
      className={cn(
        "h-1.5 w-16 rounded-full bg-background/20 group-data-[active=true]:bg-background/30",
        className
      )}
      aria-label={`Proficiency: ${level} out of ${maxLevel}`}
    >
      <div
        className="h-full rounded-full bg-background group-data-[active=true]:bg-foreground"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

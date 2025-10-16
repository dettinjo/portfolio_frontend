"use client";

interface ProficiencyDotsProps {
  level: number;
  maxLevel?: number;
}

export function ProficiencyDots({ level, maxLevel = 5 }: ProficiencyDotsProps) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Proficiency: ${level} out of ${maxLevel}`}
    >
      {Array.from({ length: maxLevel }, (_, index) => {
        const dotLevel = index + 1;
        const isFilled = dotLevel <= level;

        return (
          <span
            key={dotLevel}
            // --- THIS IS THE FIX ---
            className={`
              h-2 w-2 rounded-full transition-colors duration-200
              ${
                isFilled
                  ? "bg-foreground group-hover/item:bg-background group-data-[active=true]:bg-background group-data-[active=true]:group-hover/item:bg-foreground"
                  : "bg-muted group-hover/item:bg-background/30 group-data-[active=true]:bg-background/30 group-data-[active=true]:group-hover/item:bg-foreground/30"
              }
            `}
          />
        );
      })}
    </div>
  );
}

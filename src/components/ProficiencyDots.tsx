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
            // This pure Tailwind approach now works because the CSS variables are correct.
            className={`
              h-2 w-2 rounded-full transition-colors duration-200
              ${
                isFilled
                  ? "bg-foreground group-hover:bg-background" // Filled: ink -> paper
                  : "bg-muted group-hover:bg-background/30" // Empty: muted gray -> 30% paper
              }
            `}
          />
        );
      })}
    </div>
  );
}

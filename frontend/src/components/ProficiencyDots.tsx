"use client";

interface ProficiencyDotsProps {
  level: number;
  maxLevel?: number;
  // It will now receive explicit color strings as props
  filledColor: string;
  emptyColor: string;
}

export function ProficiencyDots({
  level,
  maxLevel = 5,
  filledColor,
  emptyColor,
}: ProficiencyDotsProps) {
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
            className="h-2 w-2 rounded-full transition-colors duration-200"
            // The background color is now set directly and un-overrideably from the props
            style={{ backgroundColor: isFilled ? filledColor : emptyColor }}
          />
        );
      })}
    </div>
  );
}

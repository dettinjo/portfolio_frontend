// src/components/ThemeAwareAvatarSVG.tsx
import React from "react";

// This component renders your custom SVG, with colors linked to your site's theme.
export function ThemeAwareAvatarSVG({ className }: { className?: string }) {
  // NOTE: SVG attributes like "stroke-width" are converted to camelCase "strokeWidth" for JSX.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      preserveAspectRatio="xMidYMid meet"
      viewBox="114 235.1 670 699.9"
      className={className}
    >
      <g
        transform="translate(0.000000,1152.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        {/* Layer 1: The background-colored border "cutout" */}
        {/* Its color adapts to the theme, making it light on light mode and dark on dark mode. */}
        <path
          d="M4450 9154...-104z" // Full path data goes here
          fill="none"
          stroke="hsl(var(--background))"
          strokeWidth={60}
          strokeLinejoin="round"
        />

        {/* Layer 2: The foreground-colored shape */}
        {/* Its color also adapts, making it black on light mode and white on dark mode. */}
        <path
          d="M4450 9154...-104z" // Full path data goes here
          fill="hsl(var(--foreground))"
        />

        {/* All the smaller detail paths also inherit the foreground color */}
        <path
          d="M5690 7442 c0 -5 7 -15 15 -22 8 -7 15 -8 15 -2 0 5 -7 15 -15 22 -8 7 -15 8 -15 2z"
          fill="hsl(var(--foreground))"
        />
        <path
          d="M3007 7453 c-4 -3 -7 -11 -7 -17 0 -6 5 -5 12 2 6 6 9 14 7 17 -3 3 -9 2 -12 -2z"
          fill="hsl(var(--foreground))"
        />
        <path
          d="M3070 7410 c-6 -11 -8 -20 -6 -20 3 0 10 9 16 20 6 11 8 20 6 20 -3 0 -10 -9 -16 -20z"
          fill="hsl(var(--foreground))"
        />
        {/* ... and so on for all the other small path elements ... */}
      </g>
    </svg>
  );
}

// IMPORTANT: For this code to work, you must copy the full, long path data from your SVG
// into BOTH of the `d="..."` attributes marked above. Then, for all the smaller <path> elements,
// add `fill="hsl(var(--foreground))"` to them as shown in the examples.

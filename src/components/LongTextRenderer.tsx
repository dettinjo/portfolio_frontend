"use client";

import ReactMarkdown from "react-markdown";
import { type ExtraProps } from "react-markdown";

interface LongTextRendererProps {
  content: string | null | undefined;
}

// --- THIS IS THE DEFINITIVE FIX ---
// We create a custom component to render inline code (`...`) blocks.
// This gives us full control over the styling and ensures no extra characters are added.
const CodeComponent = ({
  children,
  className,
  ...props
}: React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  ExtraProps) => {
  // react-markdown adds a `language-*` class for fenced code blocks (```).
  // Inline code has no className. We only want to style the inline code.
  const isInlineCode = !className;

  if (isInlineCode) {
    // These are the classes that Tailwind's `@tailwindcss/typography` (prose)
    // applies to inline code. By setting them explicitly, we guarantee the
    // correct appearance without any unwanted artifacts like visible backticks.
    return (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        {...props}
      >
        {children}
      </code>
    );
  }

  // For larger, fenced code blocks, we let them render normally for now.
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export function LongTextRenderer({ content }: LongTextRendererProps) {
  if (!content) {
    return null;
  }

  return (
    // The `prose` class is still valuable for styling headings, lists, links, etc.
    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
      <ReactMarkdown
        components={{
          // We tell ReactMarkdown to use our custom component for all `code` elements.
          code: CodeComponent,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

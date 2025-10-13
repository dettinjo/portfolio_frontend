"use client";

import { createContext, useContext, ReactNode } from "react";

// Define the shape of the data we'll store in the context
type AlternateLinksContextType = {
  alternateSlugs: Record<string, string> | null;
};

// Create the context with a default value of null
const AlternateLinksContext = createContext<AlternateLinksContextType>({
  alternateSlugs: null,
});

// Create a custom hook for easy access to the context
export function useAlternateLinks() {
  return useContext(AlternateLinksContext);
}

// Create the Provider component that will wrap our page
export function AlternateLinksProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: AlternateLinksContextType;
}) {
  return (
    <AlternateLinksContext.Provider value={value}>
      {children}
    </AlternateLinksContext.Provider>
  );
}

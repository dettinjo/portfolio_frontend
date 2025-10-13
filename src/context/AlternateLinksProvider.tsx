"use client";

import { createContext, useContext, ReactNode } from "react";

type AlternateLinksContextType = {
  alternateSlugs: Record<string, string> | null;
};

const AlternateLinksContext = createContext<AlternateLinksContextType>({
  alternateSlugs: null,
});

export function useAlternateLinks() {
  return useContext(AlternateLinksContext);
}

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

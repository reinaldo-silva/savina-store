"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface IRootContext {
  filterOpen: boolean;
  toggleFilter: () => void;
}

const RootContext = createContext({} as IRootContext);

export function RootContextProvider({ children }: PropsWithChildren) {
  const [filterOpen, setFilterOpen] = useState(false);

  function toggleFilter() {
    setFilterOpen(() => !filterOpen);
  }

  return (
    <RootContext.Provider value={{ filterOpen, toggleFilter }}>
      {children}
    </RootContext.Provider>
  );
}

export function useRootContext() {
  return useContext(RootContext);
}

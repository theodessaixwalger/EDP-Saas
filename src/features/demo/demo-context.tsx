"use client";

import * as React from "react";

const DemoContext = React.createContext(false);

/** Transmet l'état du mode démo (lu côté serveur) aux composants clients. */
export function DemoProvider({ demo, children }: { demo: boolean; children: React.ReactNode }) {
  return <DemoContext.Provider value={demo}>{children}</DemoContext.Provider>;
}

export const useDemo = () => React.useContext(DemoContext);

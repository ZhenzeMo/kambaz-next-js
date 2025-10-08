"use client";

import { ReactNode, createContext, useContext, useState } from "react";

// Create context for sidebar visibility
const SidebarContext = createContext<{
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
}>({
  sidebarVisible: true,
  setSidebarVisible: () => {}
});

export const useSidebar = () => useContext(SidebarContext);

export default function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <SidebarContext.Provider value={{ sidebarVisible, setSidebarVisible }}>
      {children}
    </SidebarContext.Provider>
  );
}

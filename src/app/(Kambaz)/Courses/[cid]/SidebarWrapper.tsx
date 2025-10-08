"use client";

import { useSidebar } from "./SidebarProvider";
import CourseNavigation from "./Navigation";

export default function SidebarWrapper() {
  const { sidebarVisible } = useSidebar();

  return (
    <div className={`${sidebarVisible ? 'd-block' : 'd-none'} d-md-block`}>
      <CourseNavigation />
    </div>
  );
}

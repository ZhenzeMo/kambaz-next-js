import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import SidebarProvider from "./SidebarProvider";
import SidebarWrapper from "./SidebarWrapper";

export default async function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;

  return (
    <SidebarProvider>
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          Course {cid}
        </h2>
        <hr />
        <div className="d-flex">
          <SidebarWrapper />
          <div className="flex-fill">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
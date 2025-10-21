import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../Database";
import SidebarProvider from "./SidebarProvider";
import SidebarWrapper from "./SidebarWrapper";
import Breadcrumb from "./Breadcrumb";

export default async function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  const course = courses.find((course) => course._id === cid);

  return (
    <SidebarProvider>
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          <Breadcrumb course={course} />
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
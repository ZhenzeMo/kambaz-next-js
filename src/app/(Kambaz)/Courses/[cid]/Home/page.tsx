"use client";

import Modules from "../Modules/page";
import CourseStatus from "./Status";
import { useSidebar } from "../SidebarProvider";

export default function Home() {
  const { sidebarVisible } = useSidebar();

  return (
    <div className="d-flex" id="wd-home">
      {/* Column 1: Left Sidebar (hidden when narrowest) */}
      <div className={`${sidebarVisible ? 'd-block' : 'd-none'} d-md-block`}>
        {/* This will be the course navigation sidebar */}
      </div>
      
      {/* Column 2: Main Content Area */}
      <div className="flex-fill me-3">
        <Modules />
      </div>
      
      {/* Column 3: Modules (visible on wide screens) */}
      <div className="d-none d-xl-block me-3" style={{ minWidth: "200px" }}>
        <div className="bg-light p-3 rounded">
          <h5>Quick Modules</h5>
          <div className="list-group list-group-flush">
            <div className="list-group-item border-0 px-0 py-2">
              <small className="text-muted">Week 1 - Course Introduction</small>
            </div>
            <div className="list-group-item border-0 px-0 py-2">
              <small className="text-muted">Week 1 - HTML Basics</small>
            </div>
            <div className="list-group-item border-0 px-0 py-2">
              <small className="text-muted">Week 2 - CSS Styling</small>
            </div>
            <div className="list-group-item border-0 px-0 py-2">
              <small className="text-muted">Week 2 - JavaScript</small>
            </div>
          </div>
        </div>
      </div>
      
      {/* Column 4: Course Status (hidden when narrow) */}
      <div className="d-none d-lg-block">
        <CourseStatus />
      </div>
    </div>
  );
}

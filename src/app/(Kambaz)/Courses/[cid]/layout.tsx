"use client";

import { ReactNode, useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import CourseNavigation from "./Navigation";
import SidebarProvider, { useSidebar } from "./SidebarProvider";

interface Course {
  _id: string;
  name: string;
  [key: string]: unknown;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

function CoursesLayoutContent({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const course = courses.find((course: Course) => course._id === cid);
  const { sidebarVisible, setSidebarVisible } = useSidebar();

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "TA";
  const isEnrolled = currentUser && enrollments.some(
    (enrollment: Enrollment) =>
      enrollment.user === currentUser._id && enrollment.course === cid
  );

  useEffect(() => {
    // Only check enrollment for non-faculty users
    // Faculty and Admin can access all courses without enrollment
    if (!isFaculty && currentUser && !isEnrolled) {
      router.push("/Dashboard");
    }
    // Redirect to Dashboard if no user is logged in
    if (!currentUser) {
      router.push("/Dashboard");
    }
  }, [isFaculty, currentUser, isEnrolled, cid, router]);

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setSidebarVisible(!sidebarVisible)}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        {sidebarVisible && (
          <div>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}

export default function CoursesLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <CoursesLayoutContent>{children}</CoursesLayoutContent>
    </SidebarProvider>
  );
}
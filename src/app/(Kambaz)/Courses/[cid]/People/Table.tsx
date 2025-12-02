"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId?: string;
  section?: string;
  role: string;
  lastActivity?: string;
  totalActivity?: string;
}

interface Enrollment {
  user: string;
  course: string;
}

export default function PeopleTable({ users = [], fetchUsers }: { users?: User[]; fetchUsers?: () => void; }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  const params = useParams();
  const cid = params?.cid as string | undefined;
  const { users: dbUsers, enrollments } = db;
  
  const displayUsers = users.length > 0 
    ? users 
    : dbUsers.filter((user: User) =>
        cid && enrollments.some((enrollment: Enrollment) => enrollment.user === user._id && enrollment.course === cid)
      );
  
  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            if (fetchUsers) fetchUsers();
          }}
        />
      )}
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {displayUsers.map((user: User) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  className="text-decoration-none"
                  onClick={() => {
                    setShowDetails(true);
                    setShowUserId(user._id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


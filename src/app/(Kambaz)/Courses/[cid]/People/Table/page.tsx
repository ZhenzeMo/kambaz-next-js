"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl } from "react-bootstrap";
import PeopleTable from "../Table";
import * as coursesClient from "../../../client";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId?: string;
  section?: string;
  role: string;
  lastActivity?: string;
  totalActivity?: string;
  [key: string]: unknown;
}

export default function PeopleTablePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { cid } = useParams();

  const fetchUsers = async () => {
    if (!cid) return;
    const enrolledUsers = await coursesClient.findUsersForCourse(cid as string);
    setUsers(enrolledUsers);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const allEnrolledUsers = await coursesClient.findUsersForCourse(cid as string);
      const filteredUsers = allEnrolledUsers.filter((user: User) => user.role === role);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const allEnrolledUsers = await coursesClient.findUsersForCourse(cid as string);
      const regex = new RegExp(name, "i");
      const filteredUsers = allEnrolledUsers.filter(
        (user: User) => regex.test(user.firstName) || regex.test(user.lastName)
      );
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <FormControl
        value={name}
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}


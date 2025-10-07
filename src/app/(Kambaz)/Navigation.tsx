"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Account", path: "/Account", icon: FaRegCircleUser, iconColor: "white" },
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Courses", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];
  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 110 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <ListGroupItem className="bg-black border-0 text-center" as="a"
        target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/NEU.jpeg" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      {links.map((link) => {
        const Icon = link.icon;
        const active = pathname?.startsWith(link.path);
        return (
          <ListGroupItem key={link.path} className={`border-0 text-center ${active ? "bg-white" : "bg-black"}`}>
            <Link href={link.path} id={`wd-${link.label.toLowerCase()}-link`}
              className={`text-decoration-none ${active ? "text-danger" : "text-white"}`}>
              <Icon className={`fs-1 ${link.iconColor === "white" ? "text-white" : (active ? "text-danger" : "text-danger")}`} />
              <br />
              {link.label}
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
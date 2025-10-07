"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();
  const links = ["Signin", "Signup", "Profile"];
  
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/Account/${link}`;
        const active = pathname?.includes(link);
        return (
          <Link
            key={link}
            href={path}
            id={`wd-account-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${active ? "active" : "text-danger"}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}


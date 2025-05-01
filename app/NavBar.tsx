import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/" },
  ];
  return (
    <nav className="flex space-x-6 border-b p-5 h-16 items-center">
      <Link href="/">
        <AiFillBug size={20} />
      </Link>

      <ul className="flex space-x-6  border-b-amber-900">
        {links.map((item) => (
          <li>
            <Link
              href={item.href}
              className="text-zinc-500 hover:text-zinc-800  transition-colors"
              key={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

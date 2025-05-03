"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b p-5 mb-5 h-16 items-center font-[inter]">
      <Link href="/">
        <AiFillBug size={20} />
      </Link>

      <ul className="flex space-x-6  border-b-amber-900">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={classNames({
                "text-zinc-900": item.href === currentPath,
                "text-zinc-500": item.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
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

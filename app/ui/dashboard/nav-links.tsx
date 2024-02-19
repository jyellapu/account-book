"use client";

import { HomeIcon, SquareUser, BadgeIndianRupee, BookText } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: SquareUser,
  },
  { name: "Expenses", href: "/dashboard/expenses", icon: BadgeIndianRupee },
  { name: "DailySlips", href: "/dashboard/dailyslips", icon: BookText },
];

export default function NavLinks() {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "text-foreground": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

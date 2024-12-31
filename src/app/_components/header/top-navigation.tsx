"use client";
import { NavigationMenuItem } from "@/types/navigation-menu-item";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

const menuItems: NavigationMenuItem[] = [
  {
    title: "صفحه اصلی",
    href: "/",
  },
  {
    title: "آنالیز فالوور ها",
    href: "/courses",
  },
  {
    title: "آنالیز فعالیت ها",
    href: "/blog",
  },
];

export const TopNavigation: React.FC = () => {
  const pathname = usePathname();
  return (
    <>
    <CiMenuFries className="md:hidden text-2xl mr-4"/>
    <ul className='md:flex hidden gap-x-8 mr-12'>
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={`navigation-${item.href}`}>
            <Link
              href={item.href}
              className={`dark:hover:text-light-100 dark:text-light-100 transition-colors pb-2 ${
                isActive &&
                "border-b-2 dark:text-dark-100 dark:border-light-100 font-bold"
              }`}>
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
      </>
  );
};

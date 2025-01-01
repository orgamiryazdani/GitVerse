'use client';
import { NavigationMenuItem } from '@/types/navigation-menu-item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiMenuFries } from 'react-icons/ci';

const menuItems: NavigationMenuItem[] = [
  {
    title: 'صفحه اصلی',
    href: '/',
  },
  {
    title: 'آنالیز فالوور ها',
    href: '/courses',
  },
  {
    title: 'آنالیز فعالیت ها',
    href: '/blog',
  },
];

export const TopNavigation: React.FC<{ showMenu: boolean; showMenuHandler: () => void }> = ({
  showMenu,
  showMenuHandler,
}) => {
  const pathname = usePathname();
  return (
    <>
      <Menu showMenu={showMenu} />
      <CiMenuFries onClick={showMenuHandler} className="md:hidden text-2xl mr-4 cursor-pointer" />
      <ul className="md:flex hidden gap-x-8 mr-12">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={`navigation-${item.href}`}>
              <Link
                href={item.href}
                className={`dark:hover:text-light-100 dark:text-light-100 transition-colors pb-2 ${
                  isActive && 'border-b-2 dark:text-dark-100 dark:border-light-100 font-bold'
                }`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const Menu: React.FC<{ showMenu: boolean }> = ({ showMenu }) => {
  return (
    <menu
      className={`md:hidden absolute w-full bg-dark-300 top-0 p-5 gap-5 flex flex-col transition-all duration-200 ease-in-out ${showMenu ? 'h-56' : 'h-0 p-0'}`}
    >
      {menuItems.map((item) => (
        <li
          key={`navigation-${item.href}`}
          className="w-full h-12 pr-3 flex items-center bg-dark-400 text-light-100 rounded-lg"
        >
          <div>{showMenu && item.title}</div>
        </li>
      ))}
    </menu>
  );
};

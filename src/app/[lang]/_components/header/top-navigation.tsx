'use client';
import { useDictionary } from '@/providers/DictionaryProvider';
import { NavigationMenuItem } from '@/types/navigation-menu-item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiMenuFries } from 'react-icons/ci';

export const TopNavigation: React.FC<{ showMenu: boolean; showMenuHandler: () => void; lang: 'fa' | 'en' }> = ({
  showMenu,
  showMenuHandler,
  lang,
}) => {
  const pathname = usePathname();
  const dict = useDictionary();

  const menuItems: NavigationMenuItem[] = [
    {
      title: dict.home_page,
      href: '/',
    },
    {
      title: dict.followers_analysis,
      href: '/courses',
    },
    {
      title: dict.activities_analysis,
      href: '/blog',
    },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === `/${lang}`;
    }
    return pathname === href || pathname === `/${lang}${href}`;
  };

  return (
    <>
      {/* menu mobile */}
      <menu
        className={`md:hidden absolute w-full bg-dark-300 top-0 gap-5 flex flex-col transition-all duration-200 ease-in-out ${showMenu ? 'h-56 p-5' : 'h-0 p-0'}`}
      >
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.href);
          return (
            <Link
              key={`navigation-${item.href}`}
              href={item.href}
              className={`w-full h-12 px-3 flex items-center bg-dark-400 rounded-lg ${isActive ? 'text-light-300' : 'text-light-100'}`}
            >
              <div>{showMenu && item.title}</div>
            </Link>
          );
        })}
      </menu>
      <CiMenuFries
        onClick={showMenuHandler}
        className={`md:hidden text-2xl ${lang === 'fa' ? 'mr-4' : 'ml-4 rotate-180'} cursor-pointer`}
      />
      {/* menu desktop */}
      <ul className="md:flex hidden gap-x-8 mx-12">
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.href);
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

'use client';
import { TopNavigation } from './top-navigation';
import HeaderUserSection from './header-user-section';
import { useState } from 'react';

export const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = () => setShowMenu(!showMenu);
  return (
    <header
      className={`dark:text-white w-full h-[11vh] dark:bg-dark-200 flex transition-all duration-200 ease-in-out ${showMenu ? 'mt-56' : 'mt-0'}`}
    >
      <div className="container flex items-center justify-between max-w-8xl">
        <TopNavigation showMenu={showMenu} showMenuHandler={showMenuHandler} />
        <span className="mr-auto ml-3">
          <HeaderUserSection />
        </span>
      </div>
    </header>
  );
};

'use client';
import { TopNavigation } from './top-navigation';
import HeaderUserSection from './header-user-section';
import { useState } from 'react';
import ChangeTheme from './change-theme';
import ChangeLanguage from './change-language';

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = () => setShowMenu(!showMenu);

  return (
    <header
      className={`dark:text-white w-full h-[11vh] min-h-[70px] md:min-h-0 max-h-[70px] dark:bg-dark-200 bg-light-300 flex transition-all duration-200 ease-in-out ${showMenu ? 'mt-56' : 'mt-0'}`}
    >
      <div className="container w-full flex items-center justify-between max-w-8xl">
        <TopNavigation showMenu={showMenu} showMenuHandler={showMenuHandler} />
        <span className="lg:mx-10 mx-5 flex items-center lg:gap-x-8 gap-x-5">
          <ChangeTheme />
          <ChangeLanguage />
          <HeaderUserSection />
        </span>
      </div>
    </header>
  );
};

'use client';
import { TopNavigation } from './top-navigation';
import HeaderUserSection from './header-user-section';
import { useState } from 'react';
import ChangeTheme from './change-theme';
import ChangeLanguage from './change-language';
import { lang } from '@/types/languages';

export const Header = ({ lang }: lang) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTheme, setShowTheme] = useState(false);

  const showMenuHandler = () => setShowMenu(!showMenu);

  const showLanguageHandler = () => {
    if (showTheme) {
      setShowTheme(false);
    }
    setShowLanguage(!showLanguage);
  };

  const showThemeHandler = () => {
    if (showLanguage) {
      setShowLanguage(false);
    }
    setShowTheme(!showTheme);
  };

  return (
    <header
      className={`dark:text-white w-full h-[11vh] max-h-[70px] dark:bg-dark-200 flex transition-all duration-200 ease-in-out ${showMenu ? 'mt-56' : 'mt-0'}`}
    >
      <div className="container w-full flex items-center justify-between max-w-8xl">
        <TopNavigation lang={lang} showMenu={showMenu} showMenuHandler={showMenuHandler} />
        <span className="lg:mx-10 mx-5 flex items-center lg:gap-x-8 gap-x-5">
          <ChangeTheme showTheme={showTheme} showThemeHandler={showThemeHandler} />
          <ChangeLanguage lang={lang} showLanguage={showLanguage} showLanguageHandler={showLanguageHandler} />
          <HeaderUserSection />
        </span>
      </div>
    </header>
  );
};

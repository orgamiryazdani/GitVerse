'use client';
import { GiUbisoftSun } from 'react-icons/gi';
import { RiMoonCloudyLine } from 'react-icons/ri';
import { AnimatePresence } from 'framer-motion';
import { FramerMotionAnimation } from '../framer-motion';
import { useTheme } from '@/providers/ThemeProvider';

const moonVariants = {
  hidden: {
    opacity: 0,
    top: 0,
    right: 0,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    top: 40,
    right: -40,
    transition: {
      duration: 0.3,
    },
  },
};

const sunVariants = {
  hidden: {
    opacity: 0,
    top: 0,
    right: 0,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    top: 40,
    right: 20,
    transition: {
      duration: 0.5,
    },
  },
};

const ChangeTheme = ({ showTheme, showThemeHandler }: { showTheme: boolean; showThemeHandler: () => void }) => {
  const { theme, changeTheme } = useTheme();

  const icons = [
    { id: 1, name: 'light', icon: <GiUbisoftSun />, variants: sunVariants },
    { id: 2, name: 'dark', icon: <RiMoonCloudyLine />, variants: moonVariants },
  ] as const;

  return (
    <div className="relative w-7 flex items-center justify-center">
      {theme === 'dark' ? (
        <RiMoonCloudyLine className="text-3xl cursor-pointer absolute" onClick={showThemeHandler} />
      ) : (
        <GiUbisoftSun className="text-3xl cursor-pointer absolute" onClick={showThemeHandler} />
      )}
      <AnimatePresence>
        {showTheme &&
          icons.map(({ id, icon, variants, name }) => (
            <FramerMotionAnimation
              key={id}
              className={`${theme === name ? 'dark:text-light-400 text-dark-200 dark:border-light-400 border-dark-400' : 'text-light-100 border-light-300'} absolute w-10 h-10 dark:bg-dark-400 bg-light-400 text-[22px] cursor-pointer flex items-center justify-center rounded-full border-2`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              tag="div"
              variants={variants}
              onClick={() => {
                showThemeHandler();
                changeTheme(name);
              }}
            >
              {icon}
            </FramerMotionAnimation>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default ChangeTheme;

import { GiUbisoftSun } from 'react-icons/gi';
import { PiDesktopThin } from 'react-icons/pi';
import { RiMoonCloudyLine } from 'react-icons/ri';
import { AnimatePresence } from 'framer-motion';
import { FramerMotionAnimation } from '../framer-motion';

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
    right: -64,
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
    right: -5,
    transition: {
      duration: 0.5,
    },
  },
};

const desktopVariants = {
  hidden: {
    opacity: 0,
    top: 0,
    right: 0,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    top: 40,
    right: 50,
    transition: {
      duration: 0.7,
    },
  },
};

const ChangeTheme = ({ showTheme, showThemeHandler }: { showTheme: boolean; showThemeHandler: () => void }) => {
  const icons = [
    { id: 1, name: 'light', icon: <GiUbisoftSun />, variants: sunVariants },
    { id: 2, name: 'dark', icon: <RiMoonCloudyLine />, variants: moonVariants },
    { id: 3, name: 'system', icon: <PiDesktopThin />, variants: desktopVariants },
  ];

  return (
    <div className="relative w-7 flex items-center justify-center">
      <PiDesktopThin className="text-3xl cursor-pointer absolute" onClick={showThemeHandler} />
      <AnimatePresence>
        {showTheme &&
          icons.map(({ id, icon, variants }) => (
            <FramerMotionAnimation
              key={id}
              className={`absolute w-10 h-10 bg-dark-400 text-[22px] cursor-pointer flex items-center justify-center rounded-full border-2 border-light-300 text-light-100`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              tag="div"
              variants={variants}
            >
              {icon}
            </FramerMotionAnimation>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default ChangeTheme;

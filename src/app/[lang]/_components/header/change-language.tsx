import { lang } from '@/types/languages';
import { AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { IoLanguageOutline } from 'react-icons/io5';
import { FramerMotionAnimation } from '../framer-motion';
import { useLang } from '@/providers/language-provider';

const enVariants = {
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
    top: 55,
    right: -35,
    transition: {
      duration: 0.5,
    },
  },
};

const faVariants = {
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
    top: 55,
    right: 25,
    transition: {
      duration: 0.7,
    },
  },
};

type props = {
  showLanguage: boolean;
  showLanguageHandler: () => void;
};

const ChangeLanguage = ({ showLanguage, showLanguageHandler }: props) => {
  const icons = [
    { id: 1, name: 'en', variants: enVariants },
    { id: 2, name: 'fa', variants: faVariants },
  ];
  const lang = useLang();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLanguage = (newLocale: string) => {
    const html = document.getElementById('html');
    if (html) {
      html.setAttribute('dir', newLocale === 'en' ? 'ltr' : 'rtl');
      html.setAttribute('lang', newLocale);
    }

    const newPath = pathname.includes(`/${lang}`)
      ? pathname.replace(`/${lang}`, `/${newLocale}`)
      : `/${newLocale}${pathname}`;

    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="relative w-8 flex items-center justify-center">
      <IoLanguageOutline onClick={showLanguageHandler} className="text-3xl cursor-pointer" />

      <AnimatePresence>
        {showLanguage &&
          icons.map(({ id, name, variants }) => (
            <FramerMotionAnimation
              key={id}
              className={`absolute w-10 h-10 dark:bg-dark-400 bg-light-400 z-10 cursor-pointer flex items-center justify-center ${lang === 'fa' ? 'pt-[2px]' : 'pt-[0px]'} rounded-full border-2 border-light-300 text-light-100`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              tag="div"
              variants={variants}
              onClick={() => {
                handleChangeLanguage(name);
                showLanguageHandler();
              }}
            >
              {name}
            </FramerMotionAnimation>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default ChangeLanguage;

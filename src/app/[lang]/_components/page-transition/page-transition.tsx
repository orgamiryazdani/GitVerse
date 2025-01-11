'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
            transition: { delay: 1, duration: 0.4, ease: 'easeInOut' },
          }}
          className="w-screen h-screen fixed dark:bg-dark-100 bg-light-400 top-0 pointer-events-none"
        />
        {children}
      </div>
    </AnimatePresence>
  );
};

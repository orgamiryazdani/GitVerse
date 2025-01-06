'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Stair from './stairs';

export const StairTransition = () => {
  const pathname = usePathname();
  return (
    <>
      <AnimatePresence mode="wait">
        <div key={pathname}>
          <div className="w-screen h-screen fixed top-0 left-0 right-0 z-40 pointer-events-none flex">
            <Stair />
          </div>
          <motion.div
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
              transition: { delay: 1, duration: 0.4, ease: 'easeInOut' },
            }}
            className="w-screen h-screen fixed bg-dark-100 top-0 pointer-events-none"
          />
        </div>
      </AnimatePresence>
    </>
  );
};

'use client';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

type CounterProps = {
  endNumber: number;
};

export const Counter: React.FC<CounterProps> = ({ endNumber }: CounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, endNumber, {
      duration: 7,
      ease: 'easeOut',
    });

    return animation.stop;
  }, [endNumber]);

  return <motion.h1>{rounded}</motion.h1>;
};

'use client';
import { motion } from 'framer-motion';
import { FramerMotionAnimationProps } from './framer-motion.types';

export const FramerMotionAnimation = ({ variants, tag, children, ...rest }: FramerMotionAnimationProps) => {
  const MotionTag = motion(tag);

  return (
    <MotionTag variants={variants} {...rest}>
      {children}
    </MotionTag>
  );
};

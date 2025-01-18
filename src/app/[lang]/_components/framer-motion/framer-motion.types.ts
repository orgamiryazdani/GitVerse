import { HTMLMotionProps, Variants } from 'framer-motion';
import { JSX } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FramerMotionAnimationProps = Omit<HTMLMotionProps<any>, 'variants'> & {
  variants: Variants;
  tag: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedTagsIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AnimatedTagsIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Back tag flies in from top-right first, then settles
const backTagVariants: Variants = {
  normal: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  animate: {
    x: [8, 2, -1, 0],
    y: [-8, -2, 1, 0],
    opacity: [0, 0.6, 1, 1],
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      times: [0, 0.4, 0.7, 1],
    },
  },
};

// Front tag stacks on from top-right, slightly delayed
const frontTagVariants: Variants = {
  normal: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  animate: {
    x: [12, 3, -0.5, 0],
    y: [-12, -3, 0.5, 0],
    opacity: [0, 0.5, 1, 1],
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: [0.4, 0, 0.2, 1],
      times: [0, 0.4, 0.7, 1],
    },
  },
};

// Dot follows the front tag
const dotVariants: Variants = {
  normal: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
  },
  animate: {
    x: [12, 3, -0.5, 0],
    y: [-12, -3, 0.5, 0],
    opacity: [0, 0.5, 1, 1],
    scale: [0.2, 0.8, 1.15, 1],
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: [0.4, 0, 0.2, 1],
      times: [0, 0.4, 0.7, 1],
    },
  },
};

const TagsIcon = forwardRef<AnimatedTagsIconHandle, AnimatedTagsIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label="Tags"
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <title>Tags icon</title>
          {/* Back tag (the one peeking behind) */}
          <motion.path
            d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"
            variants={backTagVariants}
            animate={controls}
          />

          {/* Front tag body */}
          <motion.path
            d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"
            variants={frontTagVariants}
            animate={controls}
          />

          {/* Dot on front tag */}
          <motion.circle
            cx="10.5"
            cy="6.5"
            r=".5"
            fill="currentColor"
            variants={dotVariants}
            animate={controls}
          />
        </svg>
      </div>
    );
  },
);

TagsIcon.displayName = "TagsIcon";

export { TagsIcon };

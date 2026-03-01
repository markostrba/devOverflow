"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface BriefcaseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BriefcaseIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  duration: 0.5,
  opacity: { duration: 0.2 },
};

const PATH_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
  },
};

const BOUNCE_VARIANTS: Variants = {
  normal: {
    y: 0,
  },
  animate: {
    y: [0, -3, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const BriefcaseIcon = forwardRef<BriefcaseIconHandle, BriefcaseIconProps>(
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
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={BOUNCE_VARIANTS}
          animate={controls}
        >
          {/* Briefcase body */}
          <motion.rect
            width="20"
            height="14"
            x="2"
            y="7"
            rx="2"
            ry="2"
            variants={PATH_VARIANTS}
            transition={{ ...DEFAULT_TRANSITION, delay: 0 }}
            animate={controls}
          />
          {/* Handle */}
          <motion.path
            d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
            variants={PATH_VARIANTS}
            transition={{ ...DEFAULT_TRANSITION, delay: 0.15 }}
            animate={controls}
          />
        </motion.svg>
      </div>
    );
  },
);

BriefcaseIcon.displayName = "BriefcaseIcon";

export { BriefcaseIcon };

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Hide once the page has been scrolled past this many pixels. */
export const HIDE_AFTER_PX = 200;
/** Show again once the page is back within this many pixels of the top. */
export const SHOW_BEFORE_PX = 400;
/** Scroll steps smaller than this are treated as noise so jitter cannot flip the card. */
export const DIRECTION_THRESHOLD = 4;

export type ScrollDirection = "up" | "down";

export interface ScrollHideOptions {
  /** Defaults to {@link HIDE_AFTER_PX}. */
  hideAfterPx?: number;
  /** Defaults to {@link SHOW_BEFORE_PX}. */
  showBeforePx?: number;
}

/**
 * Should a scroll-hiding element be tucked away at this offset?
 *
 * Past `showBeforePx` it is always hidden and within `hideAfterPx` always
 * shown. The two thresholds overlap on purpose: in the band between them the
 * scroll direction decides, so the card leaves as you dive down the page and
 * comes back the moment you start climbing again.
 */
export function shouldHideOnScroll(
  scrollY: number,
  direction: ScrollDirection,
  {
    hideAfterPx = HIDE_AFTER_PX,
    showBeforePx = SHOW_BEFORE_PX,
  }: ScrollHideOptions = {},
): boolean {
  if (scrollY <= hideAfterPx) return false;
  if (scrollY >= showBeforePx) return true;
  return direction === "down";
}

/** Tracks whether the page is scrolled deep enough that the element should hide. */
export function useHiddenOnScroll(options: ScrollHideOptions = {}): boolean {
  const { hideAfterPx = HIDE_AFTER_PX, showBeforePx = SHOW_BEFORE_PX } =
    options;
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const direction = useRef<ScrollDirection>("down");

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
        direction.current = delta > 0 ? "down" : "up";
        lastY.current = y;
      }

      setHidden(
        shouldHideOnScroll(y, direction.current, { hideAfterPx, showBeforePx }),
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, [hideAfterPx, showBeforePx]);

  return hidden;
}

export interface HideOnScrollProps extends ScrollHideOptions {
  children: ReactNode;
  className?: string;
}

/**
 * Slides its children down and fades them out once the page is scrolled past
 * {@link HIDE_AFTER_PX}, and brings them back when the reader returns towards
 * the top. The element stays mounted so hiding never changes the document
 * height, and it is made inert while off-screen so nothing invisible can be
 * clicked or tabbed to.
 */
export function HideOnScroll({
  children,
  className,
  ...options
}: HideOnScrollProps) {
  const hidden = useHiddenOnScroll(options);
  const reduceMotion = useReducedMotion();
  const slide = hidden && !reduceMotion;

  return (
    <motion.div
      className={cn(className, hidden && "pointer-events-none")}
      initial={false}
      animate={{ y: slide ? "100%" : 0, opacity: hidden ? 0 : 1 }}
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : {
              type: "spring",
              stiffness: 320,
              damping: 34,
              mass: 0.9,
              opacity: { duration: 0.25, ease: "easeOut" },
            }
      }
      aria-hidden={hidden || undefined}
      inert={hidden}
    >
      {children}
    </motion.div>
  );
}

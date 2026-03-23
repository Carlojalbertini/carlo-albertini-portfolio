import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const CLICKABLE_SELECTORS = "a, button, [role='button'], input, textarea, select, [data-cursor='hover'], .group";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(CLICKABLE_SELECTORS)) {
        setIsHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(CLICKABLE_SELECTORS)) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          mixBlendMode: "difference",
        }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          marginLeft: isHovering ? -28 : -16,
          marginTop: isHovering ? -28 : -16,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 25 },
          height: { type: "spring", stiffness: 300, damping: 25 },
          marginLeft: { type: "spring", stiffness: 300, damping: 25 },
          marginTop: { type: "spring", stiffness: 300, damping: 25 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="w-full h-full rounded-full border border-white/80"
          style={{
            transition: "border-color 0.3s ease",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: -3,
          marginTop: -3,
          mixBlendMode: "difference",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 25 },
          opacity: { duration: 0.15 },
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
    </>
  );
}

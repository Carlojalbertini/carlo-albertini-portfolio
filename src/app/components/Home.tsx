import { useState, useCallback, useRef } from "react";
import { motion } from "motion/react";
import skullImg from "../../assets/d2a975953885db6531263265d531317fde593de9.png";

const MAX_ROTATE_Y = 18;
const MAX_ROTATE_X = 8;

const Skull = ({ delay = 0, className = "" }: { delay?: number; className?: string }) => (
  <motion.div
    className={`relative inline-flex items-end justify-center ${className}`}
    initial={{ opacity: 0, scale: 0, rotate: -20, z: 0 }}
    animate={{ opacity: 1, scale: 1, rotate: 0, z: 50 }}
    transition={{ 
      type: "spring",
      stiffness: 50,
      damping: 15,
      delay: delay 
    }}
    style={{
      width: "min(13vw, 15vh)",
      height: "min(13vw, 15vh)",
      margin: "0 0.15em",
      alignSelf: "flex-end",
      transform: "translateY(8%)",
    }}
  >
    <img 
      src={skullImg} 
      alt="Crystal Skull" 
      className="w-full h-full object-contain drop-shadow-2xl filter sepia-[0.3] brightness-90 contrast-125"
    />
  </motion.div>
);

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        rotateY: x * MAX_ROTATE_Y * 2,
        rotateX: -y * MAX_ROTATE_X * 2,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const textStyle = {
    fontFamily: "'swear-display', serif",
    fontSize: "min(17vw, 22vh)",
    fontWeight: 300,
    lineHeight: 0.9,
    letterSpacing: "-0.03em",
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex items-center justify-center overflow-hidden cursor-default relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      {/* Subtle background texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #d4c9b8 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, #d4c9b8 1px, transparent 1px),
                            radial-gradient(circle at 50% 80%, #d4c9b8 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* 3D tilting text block */}
      <motion.div
        className="relative text-center px-6 flex flex-col items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{
          type: "spring",
          stiffness: 35,
          damping: 20,
          mass: 1.2,
        }}
      >
        {/* LINE 1: Omnis [SKULL] Ars */}
        <motion.div
          className="flex items-center justify-center flex-wrap gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        >
          <span className="text-[#d4c9b8]" style={textStyle}>Omnis</span>
          <Skull delay={0.4} />
          <span className="text-[#d4c9b8]" style={textStyle}>Ars</span>
        </motion.div>

        {/* LINE 2: Ad [SKULL] Mortem */}
        <motion.div
          className="flex items-center justify-center flex-wrap gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
        >
          <span className="text-[#d4c9b8] italic" style={textStyle}>Ad</span>
          <Skull delay={0.6} />
          <span className="text-[#d4c9b8] italic" style={textStyle}>Mortem</span>
        </motion.div>

        {/* LINE 3: [SKULL] Pertinet */}
        <motion.div
          className="flex items-center justify-center flex-wrap gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
        >
           <Skull delay={0.8} />
          <span className="text-[#d4c9b8]" style={textStyle}>Pertinet</span>
        </motion.div>

      </motion.div>
    </div>
  );
}
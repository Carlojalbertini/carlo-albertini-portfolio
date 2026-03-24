import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { fetchAbout } from "../../lib/queries";

const fallbackImages = [
  {
    src: "https://images.unsplash.com/photo-1735823197840-c6eaa4869c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ290aGljJTIwaW5rJTIwaWxsdXN0cmF0aW9uJTIwZGV0YWlsfGVufDF8fHx8MTc3MjE5MDcwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gothic ink illustration",
    finalLeft: "8%",
    finalTop: "15%",
    width: "22vw",
    aspectRatio: "3/4",
    rotate: -2,
    zIndex: 10,
  },
  {
    src: "https://images.unsplash.com/photo-1623672655463-932bce1d4043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZW5ncmF2aW5nJTIwYm90YW5pY2FsJTIwZGFya3xlbnwxfHx8fDE3NzIxOTA3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Vintage engraving botanical",
    finalLeft: "32%",
    finalTop: "12%",
    width: "18vw",
    aspectRatio: "3/4",
    rotate: 3,
    zIndex: 11,
  },
  {
    src: "https://images.unsplash.com/photo-1598408104280-9a4f0137ad7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBoYW5kcyUyMGRyYXdwYW5nJTIwSW5rJTIwcGVuJTIwZGFyrfGVufDF8fHx8MTc3MjE5MDcwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Artist hands drawing with ink",
    finalLeft: "58%",
    finalTop: "14%",
    width: "20vw",
    aspectRatio: "3/4",
    rotate: -1,
    zIndex: 12,
  },
  {
    src: "https://images.unsplash.com/photo-1771986923184-12644c050457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjBwb3J0cmFpdCUyMHN0dWRpbyUyMGFydGlzdGljfGVufDF8fHx8MTc3MjE5MDcwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Dark moody portrait",
    finalLeft: "10%",
    finalTop: "52%",
    width: "24vw",
    aspectRatio: "4/3",
    rotate: 2,
    zIndex: 13,
  },
  {
    src: "https://images.unsplash.com/photo-1548092542-6daae5350557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3RoaWMlMjBjYXRoZWRyYWwlMjBnYXJnb3lsZSUyMHNjdWxwdHVyZSUyMGRldGFpbHxlbnwxfHx8fDE3NzIxOTA3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gothic cathedral detail",
    finalLeft: "74%",
    finalTop: "22%",
    width: "15vw",
    aspectRatio: "1/1",
    rotate: -4,
    zIndex: 14,
  },
  {
    src: "https://images.unsplash.com/photo-1715705721271-203dac81a315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ290aGljJTIwc2t1bGwlMjBlbmdyYXZpbmclMjBhcnR8ZW58MXx8fHwxNzcyMTkyODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gothic skull engraving",
    finalLeft: "44%",
    finalTop: "48%",
    width: "16vw",
    aspectRatio: "3/4",
    rotate: 5,
    zIndex: 15,
  },
  {
    src: "https://images.unsplash.com/photo-1759255552032-195f86204da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW5hdG9taWNhbCUyMGlsbHVzdHJhdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzcyMTkyODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Vintage anatomical illustration",
    finalLeft: "64%",
    finalTop: "50%",
    width: "22vw",
    aspectRatio: "4/3",
    rotate: -3,
    zIndex: 16,
  },
  {
    src: "https://images.unsplash.com/photo-1679214889254-2f48f4d5aa29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjBzdGlsbCUyMGxpZmUlMjB2YW5pdGFzJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzcyMTkyODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Dark vanitas still life",
    finalLeft: "22%",
    finalTop: "28%",
    width: "14vw",
    aspectRatio: "1/1",
    rotate: 4,
    zIndex: 17,
  },
  {
    src: "https://images.unsplash.com/photo-1670483113676-01371126c768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3RoaWMlMjBhcmNoaXRlY3R1cmUlMjBkYXJrJTIwb3JuYW1lbnQlMjBkZXRhaWx8ZW58MXx8fHwxNzcyMTkyODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gothic ornament detail",
    finalLeft: "50%",
    finalTop: "30%",
    width: "13vw",
    aspectRatio: "3/4",
    rotate: -2,
    zIndex: 18,
  },
];

// Layout positions — invariate, solo le immagini cambiano
const imageLayout = fallbackImages.map(({ finalLeft, finalTop, width, aspectRatio, rotate, zIndex }) => ({
  finalLeft, finalTop, width, aspectRatio, rotate, zIndex,
}));

const TOTAL = fallbackImages.length;

// Per-card easing exponents — higher = slower deceleration, more "float"
const cardEaseExponents = [7, 5, 8, 4, 6, 9, 5, 7, 6];

function easeOutPow(t: number, pow: number): number {
  return 1 - Math.pow(1 - t, pow);
}

type CardImage = {
  src: string;
  videoUrl?: string;
  mediaType?: string;
  alt: string;
  finalLeft: string;
  finalTop: string;
  width: string;
  aspectRatio: string;
  rotate: number;
  zIndex: number;
};

function ScrollCard({
  image,
  index,
  scrollYProgress,
}: {
  image: CardImage;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const [hover, setHover] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHover({ x: x * 8, y: y * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover({ x: 0, y: 0 });
  }, []);

  // Overlapping segments: each card uses 2x the base segment for a slower journey
  const baseSegment = 1 / TOTAL;
  const segmentSize = baseSegment * 2;
  const start = index * baseSegment;
  const end = Math.min(start + segmentSize, 1);

  const easePow = cardEaseExponents[index] || 6;
  const easeFn = (t: number) => easeOutPow(t, easePow);

  const yRaw = useTransform(
    scrollYProgress,
    [start, end],
    [120, 0],
    { ease: easeFn }
  );

  // Clamp manuale: y non scende mai sotto 0 né supera 120 → evita che le card
  // escano dal top del container overflow-hidden dopo aver completato l'animazione
  const y = useTransform(yRaw, (v) => `${Math.max(0, Math.min(120, v))}vh`);

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [0.92, 1],
    { ease: easeFn, clamp: true }
  );

  return (
    <motion.div
      ref={cardRef}
      className="absolute pointer-events-auto will-change-transform cursor-default"
      style={{
        left: image.finalLeft,
        top: image.finalTop,
        width: image.width,
        aspectRatio: image.aspectRatio,
        zIndex: image.zIndex,
        rotate: image.rotate,
        y,
        scale,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full overflow-hidden"
        animate={{ x: hover.x, y: hover.y }}
        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      >
        {image.mediaType === "video" && image.videoUrl ? (
          <video
            src={image.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
            style={{ filter: "grayscale(80%) contrast(1.1) sepia(15%)" }}
          />
        ) : (
          <ImageWithFallback
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover scale-105"
            style={{
              filter: image.mediaType === "gif"
                ? "none"
                : "grayscale(80%) contrast(1.1) sepia(15%)",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export function Bio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [images, setImages] = useState<CardImage[]>(
    fallbackImages.map((img) => ({ src: img.src, alt: img.alt, finalLeft: img.finalLeft, finalTop: img.finalTop, width: img.width, aspectRatio: img.aspectRatio, rotate: img.rotate, zIndex: img.zIndex }))
  );
  const [bioText, setBioText] = useState<string | null>(null);

  useEffect(() => {
    fetchAbout().then((data) => {
      if (!data) return;
      if (data.bioText) setBioText(data.bioText);
      if (data.images && data.images.length > 0) {
        setImages(
          data.images.map((img, i) => ({
            src: img.src,
            videoUrl: img.videoUrl,
            mediaType: img.mediaType,
            alt: img.alt,
            ...imageLayout[i % imageLayout.length],
          }))
        );
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: "950vh" }}>
      {/* Sticky wrapper: text + cards pinned to viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Bio text — centered, z-1 (behind cards) */}
        <div
          className="absolute inset-0 z-[1] flex items-center justify-center px-12 md:px-24 lg:px-36"
        >
          <motion.div
            className="max-w-5xl text-center"
            style={{ fontFamily: "'swear-display', serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            <p
              className="text-[#d4c9b8]"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                lineHeight: 1.25,
                fontWeight: 300,
              }}
            >
              {bioText ?? (
                <>
                  Between{" "}
                  <span className="italic">Symbolism and Baroque,</span>{" "}
                  Carlo Albertini fuses{" "}
                  <span
                    className="italic text-[#d4c9b8]/50"
                    style={{ fontFamily: "'swear-display', serif" }}
                  >
                    myth, tribal, post-war and cyberpunk elements:
                  </span>{" "}
                  organic and technological forms hybridize, and borders vanish into the line.{" "}
                  Black and white flips{" "}
                  <span className="italic">life and death.</span>{" "}
                  From automatic gestures comes a cosmogony of insects, animals and humans judged by higher beings—
                  <span
                    className="italic text-[#d4c9b8]/50"
                    style={{ fontFamily: "'swear-display', serif" }}
                  >
                    "illustrations"
                  </span>{" "}
                  for{" "}
                  <span className="italic">lost books from a dark future.</span>
                </>
              )}
            </p>
          </motion.div>
        </div>

        {/* Image cards layer — z-2 (in front of text) */}
        <div className="absolute inset-0 z-[2]">
          {images.map((image, index) => (
            <ScrollCard
              key={image.alt}
              image={image}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
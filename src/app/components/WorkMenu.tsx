import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { fetchProjects, type Project } from "../../lib/queries";

export function WorkMenu() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setError(err?.message || "Failed to load projects");
        setLoading(false);
      });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p
          className="text-[#d4c9b8]/30 italic"
          style={{ fontFamily: "'swear-display', serif", fontSize: "1rem" }}
        >
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p
          className="text-[#d4c9b8]/30 italic"
          style={{ fontFamily: "'swear-display', serif", fontSize: "1rem" }}
        >
          {error}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center pt-28 pb-20 px-6 md:px-10 relative"
      onMouseMove={handleMouseMove}
    >
      {/* Floating thumbnail on hover */}
      {hoveredIndex !== null && (
        <motion.div
          className="fixed pointer-events-none z-40 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            top: 0,
            left: 0,
            transform: `translate(${mousePos.x + 24}px, ${mousePos.y - 100}px)`,
          }}
        >
          <img
            src={projects[hoveredIndex].thumbnail}
            alt=""
            className="w-48 h-60 object-cover grayscale opacity-70"
          />
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto w-full">
        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              className="no-underline block group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="flex items-baseline gap-4 md:gap-8 py-4 md:py-5 border-b border-[#d4c9b8]/[0.06]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 }}
              >
                {/* Year */}
                <span
                  className="text-[#d4c9b8]/50 shrink-0 w-10 md:w-14"
                  style={{
                    fontFamily: "'swear-display', serif",
                    fontSize: "0.8rem",
                  }}
                >
                  {project.year}
                </span>

                {/* Title */}
                <span
                  className="text-[#d4c9b8] flex-1 group-hover:text-white transition-colors duration-500"
                  style={{
                    fontFamily: "'swear-display', serif",
                    fontSize: "clamp(2rem, 6vw, 4.5rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: project.titleStyle === "uppercase" ? "0.04em" : "-0.01em",
                    fontStyle: project.titleStyle === "italic" ? "italic" : "normal",
                    textTransform: project.titleStyle === "uppercase" ? "uppercase" : "none",
                  }}
                >
                  {project.titleStyle === "uppercase"
                    ? project.displayTitle
                    : project.title}
                </span>

                {/* Category */}
                <span
                  className="text-[#d4c9b8]/50 shrink-0 text-right hidden sm:block"
                  style={{
                    fontFamily: "'swear-display', serif",
                    fontSize: "0.7rem",
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                  }}
                >
                  {project.category}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { fetchProjects, type Project, type ProjectImage } from "../../lib/queries";

export function ProjectGallery() {
  const { slug } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
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

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p
          className="text-[#d4c9b8]/50 italic"
          style={{ fontFamily: "'swear-display', serif", fontSize: "1.2rem" }}
        >
          Project not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          <Link
            to="/work"
            className="no-underline inline-flex items-center gap-3 text-[#d4c9b8]/50 hover:text-[#d4c9b8] transition-colors duration-500 mb-16 md:mb-20"
            style={{ fontFamily: "'swear-display', serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" as const }}
          >
            &larr; All projects
          </Link>
        </motion.div>

        {/* Project header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
          <div className="flex items-baseline gap-4 mb-6">
            <span
              className="text-[#d4c9b8]/50"
              style={{ fontFamily: "'swear-display', serif", fontSize: "0.8rem" }}
            >
              {project.year}
            </span>
            <span
              className="text-[#d4c9b8]/50 tracking-[0.3em] uppercase"
              style={{ fontFamily: "'swear-display', serif", fontSize: "0.6rem" }}
            >
              {project.category.replace("\n", " ")}
            </span>
          </div>

          <h1
            className="text-[#d4c9b8] mb-8"
            style={{
              fontFamily: "'swear-display', serif",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              fontStyle: project.titleStyle === "italic" ? "italic" : "normal",
              textTransform: project.titleStyle === "uppercase" ? "uppercase" : "none",
              letterSpacing: project.titleStyle === "uppercase" ? "0.04em" : "-0.01em",
            }}
          >
            {project.title}
          </h1>

          <div className="h-px w-16 bg-[#d4c9b8]/50 mb-8" />

          <p
            className="text-[#d4c9b8]/50 max-w-2xl"
            style={{
              fontFamily: "'swear-display', serif",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              fontStyle: "italic",
            }}
          >
            {project.description}
          </p>
        </motion.div>

        {/* Gallery - editorial asymmetric */}
        <div className="space-y-8 md:space-y-12">
          {project.images.map((image, index) => {
            const isEven = index % 2 === 0;
            const isWide = index === 0;
            return (
              <motion.div
                key={image.title}
                className={`${
                  isWide
                    ? "w-full"
                    : isEven
                    ? "md:w-3/4 md:ml-0"
                    : "md:w-2/3 md:ml-auto"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div
                  className="group cursor-pointer relative overflow-hidden"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto grayscale"
                  />
                  <div className="absolute inset-0 bg-[#1F1F1F]/15 group-hover:bg-transparent transition-all duration-700" />
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <p
                    className="text-[#d4c9b8]/50 italic"
                    style={{
                      fontFamily: "'swear-display', serif",
                      fontSize: "1rem",
                    }}
                  >
                    {image.title}
                  </p>
                  <span
                    className="text-[#d4c9b8]/50 ml-4 hidden sm:block"
                    style={{
                      fontFamily: "'swear-display', serif",
                      fontSize: "0.7rem",
                    }}
                  >
                    {image.medium}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation to next/prev project */}
        <motion.div
          className="mt-24 md:mt-32 pt-12 border-t border-[#d4c9b8]/[0.06]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-between">
            {(() => {
              const currentIndex = projects.findIndex((p) => p.slug === slug);
              const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
              const nextProject =
                currentIndex < projects.length - 1
                  ? projects[currentIndex + 1]
                  : null;

              return (
                <>
                  <div>
                    {prevProject && (
                      <Link
                        to={`/work/${prevProject.slug}`}
                        className="no-underline group"
                      >
                        <span
                          className="text-[#d4c9b8]/50 tracking-[0.2em] uppercase block mb-2"
                          style={{ fontFamily: "'swear-display', serif", fontSize: "0.6rem" }}
                        >
                          Previous
                        </span>
                        <span
                          className="text-[#d4c9b8]/50 group-hover:text-[#d4c9b8] transition-colors duration-500 italic"
                          style={{
                            fontFamily: "'swear-display', serif",
                            fontSize: "1.3rem",
                            fontWeight: 300,
                          }}
                        >
                          {prevProject.title}
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className="text-right">
                    {nextProject && (
                      <Link
                        to={`/work/${nextProject.slug}`}
                        className="no-underline group"
                      >
                        <span
                          className="text-[#d4c9b8]/50 tracking-[0.2em] uppercase block mb-2"
                          style={{ fontFamily: "'swear-display', serif", fontSize: "0.6rem" }}
                        >
                          Next
                        </span>
                        <span
                          className="text-[#d4c9b8]/50 group-hover:text-[#d4c9b8] transition-colors duration-500 italic"
                          style={{
                            fontFamily: "'swear-display', serif",
                            fontSize: "1.3rem",
                            fontWeight: 300,
                          }}
                        >
                          {nextProject.title}
                        </span>
                      </Link>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1F1F]/95 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full mx-6 flex flex-col items-center cursor-default"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="mt-6 text-center">
                <p
                  className="text-[#d4c9b8] italic"
                  style={{
                    fontFamily: "'swear-display', serif",
                    fontSize: "1.1rem",
                  }}
                >
                  {selectedImage.title}
                </p>
                <p
                  className="text-[#d4c9b8]/50 mt-1"
                  style={{
                    fontFamily: "'swear-display', serif",
                    fontSize: "0.8rem",
                  }}
                >
                  {selectedImage.medium}
                </p>
              </div>

              <button
                className="absolute -top-2 right-0 text-[#d4c9b8]/50 hover:text-[#d4c9b8] transition-colors cursor-pointer bg-transparent border-none"
                onClick={() => setSelectedImage(null)}
                style={{
                  fontFamily: "'swear-display', serif",
                  fontSize: "1.5rem",
                }}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

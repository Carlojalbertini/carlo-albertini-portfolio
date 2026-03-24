import { Link, Outlet, useLocation } from "react-router";
import { motion } from "motion/react";
import { CustomCursor } from "./CustomCursor";

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className="min-h-screen bg-[#1F1F1F] relative cursor-none"
      style={{ fontFamily: "'swear-display', serif" }}
    >
      <CustomCursor />

      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 mix-blend-difference">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Link
            to="/"
            className="text-white no-underline"
            style={{
              fontFamily: "'swear-display', serif",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            CARLO ALBERTINI
          </Link>
        </motion.div>

        <nav className="flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              to="/work"
              className="text-white no-underline tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-60"
              style={{
                fontFamily: "'swear-display', serif",
                fontSize: "12px",
              }}
            >
              Work
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              to="/about"
              className="text-white no-underline tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-60"
              style={{
                fontFamily: "'swear-display', serif",
                fontSize: "12px",
              }}
            >
              About
            </Link>
          </motion.div>
        </nav>
      </header>

      <motion.div
        key={location.pathname}
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
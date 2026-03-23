import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'OPERE', to: 'gallery' },
    { name: 'BIOGRAFIA', to: 'bio' },
    { name: 'CONTATTI', to: 'footer' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-neutral-200 pointer-events-none">
      <div className="container mx-auto px-6 py-8 flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col">
          <h1 className="font-serif text-3xl md:text-5xl tracking-widest uppercase border-b border-neutral-600 pb-2 mb-2 select-none font-bold">
            Corvus
          </h1>
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] opacity-80 uppercase">
            Illustrazioni Oscure
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-col items-end space-y-2 mt-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={800}
              className="group flex items-center cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-widest mr-2 group-hover:mr-4 transition-all duration-300 opacity-60 group-hover:opacity-100">
                {item.name}
              </span>
              <div className="w-8 h-[1px] bg-current opacity-40 group-hover:opacity-100 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden mt-2 p-2 border border-neutral-700 hover:bg-neutral-800 transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-neutral-950 border-b border-neutral-800 p-6 flex flex-col items-center gap-6 pointer-events-auto shadow-2xl md:hidden">
           {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={800}
              onClick={() => setIsOpen(false)}
              className="font-serif text-2xl uppercase tracking-widest cursor-pointer hover:text-red-900 transition-colors italic"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

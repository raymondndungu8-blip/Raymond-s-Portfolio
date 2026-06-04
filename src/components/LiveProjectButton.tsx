import React from 'react';
import { motion } from 'motion/react';

interface LiveProjectButtonProps {
  href?: string;
  className?: string;
}

export function LiveProjectButton({ href, className = '' }: LiveProjectButtonProps) {
  return (
    <motion.a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, backgroundColor: 'rgba(215, 226, 234, 0.1)' }}
      whileTap={{ scale: 0.96 }}
      className={`inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-sans font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base text-center transition-colors duration-200 cursor-pointer ${className}`}
    >
      Live Project
    </motion.a>
  );
}

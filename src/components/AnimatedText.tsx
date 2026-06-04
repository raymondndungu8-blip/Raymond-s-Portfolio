import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split('');

  return (
    <p ref={containerRef} className={`${className} relative inline-block`}>
      {chars.map((char, index) => (
        <Char 
          key={index} 
          char={char} 
          index={index} 
          total={chars.length} 
          progress={scrollYProgress} 
        />
      ))}
    </p>
  );
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  key?: React.Key | null;
}

function Char({ char, index, total, progress }: CharProps) {
  // Map index to a timeline segment between 0 and 1, with overlapping easing window (0.15 height)
  const start = (index / total) * 0.82;
  const end = Math.min(1, start + 0.18);
  
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  return (
    <span className="relative inline-block whitespace-pre-wrap">
      {/* Invisible placeholder for browser flow layout */}
      <span className="opacity-0">{char}</span>
      {/* Absolute overlay for character opacity rendering */}
      <motion.span 
        style={{ opacity }} 
        className="absolute inset-0 select-none pointer-events-none"
      >
        {char}
      </motion.span>
    </span>
  );
}

import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

export function Magnet({ 
  children, 
  padding = 150, 
  strength = 3, 
  activeTransition = "transform 0.3s ease-out", 
  inactiveTransition = "transform 0.6s ease-in-out" 
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;

      const distX = e.clientX - elX;
      const distY = e.clientY - elY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const maxRange = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < maxRange) {
        setTransition(activeTransition);
        const moveX = distX / strength;
        const moveY = distY / strength;
        setTransform(`translate3d(${moveX}px, ${moveY}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform("translate3d(0px, 0px, 0px)");
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div 
      ref={ref} 
      style={{ 
        transform, 
        transition, 
        willChange: 'transform' 
      }}
      className="inline-block"
    >
      {children}
    </div>
  );
}

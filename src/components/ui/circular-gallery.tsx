import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  autoRotateSpeed?: number;
  onActiveIndexChange?: (index: number) => void;
}

export function CircularGallery({ items, autoRotateSpeed = 0.08, onActiveIndexChange }: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(580);
  const [itemDimensions, setItemDimensions] = useState({ width: 280, height: 380 });
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Dynamic repetition to form a seamless endless 3D cylinder
  const duplicatedItems = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    if (items.length < 12) {
      const repeats = Math.ceil(12 / items.length);
      const list: GalleryItem[] = [];
      for (let r = 0; r < repeats; r++) {
        items.forEach((item, index) => {
          list.push({
            ...item,
            id: `${item.id}-dup-${r}-${index}`
          });
        });
      }
      return list;
    }
    return items;
  }, [items]);

  const containerRef = useRef<HTMLDivElement>(null);
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const pointerXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastScrollYRef = useRef(0);

  // Responsive layout calibration with spacious radii & elegant aspect ratios
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const desktop = width >= 1024;
      setIsDesktop(desktop);
      if (width < 640) { // Mobile
        setRadius(380);
        setItemDimensions({ width: 150, height: 210 });
      } else if (width < 1024) { // Tablet
        setRadius(520);
        setItemDimensions({ width: 200, height: 280 });
      } else { // Desktop
        setRadius(760);
        setItemDimensions({ width: 250, height: 350 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Endless relative scroll-wheel rotation
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Spin relative to page scroll distance
      targetRotationRef.current += deltaScroll * 0.045;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Frame physics animation loop (inertia / smooth lerp / gentle auto-rotation)
  useEffect(() => {
    if (duplicatedItems.length === 0) return;
    let animationFrameId: number;

    const animateLoop = (time: number) => {
      const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, 0.1) : 0.016;
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        // Slow continuous breathing ambient auto-rotation
        targetRotationRef.current += autoRotateSpeed;

        // Apply decay to any residual swipe/spin velocity
        velocityRef.current *= Math.exp(-6 * dt);
        targetRotationRef.current += velocityRef.current * dt * 45;
      } else {
        velocityRef.current *= 0.85;
      }

      // Smooth custom visual easing
      const diff = targetRotationRef.current - currentRotationRef.current;
      currentRotationRef.current += diff * 0.09; // Fluid ease action

      setRotation(currentRotationRef.current);

      // Identify active centered item facing closest to the front pointer (0 deg)
      const anglePerItem = 360 / duplicatedItems.length;
      const normalizedRot = -currentRotationRef.current % 360;
      const positiveRot = normalizedRot < 0 ? normalizedRot + 360 : normalizedRot;

      let closestIdx = 0;
      let minDiff = 360;
      for (let i = 0; i < duplicatedItems.length; i++) {
        const itemAngle = i * anglePerItem;
        let angleDiff = Math.abs(positiveRot - itemAngle);
        if (angleDiff > 180) angleDiff = 360 - angleDiff;
        if (angleDiff < minDiff) {
          minDiff = angleDiff;
          closestIdx = i;
        }
      }

      const mappedActiveIndex = closestIdx % items.length;

      if (mappedActiveIndex !== activeIndex) {
        setActiveIndex(mappedActiveIndex);
        if (onActiveIndexChange) {
          onActiveIndexChange(mappedActiveIndex);
        }
      }

      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [duplicatedItems, items.length, autoRotateSpeed, activeIndex, onActiveIndexChange]);

  // Pointer & Touch gesture handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPointerDown(true);
    isDraggingRef.current = true;
    pointerXRef.current = e.clientX;
    velocityRef.current = 0;

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - pointerXRef.current;
    pointerXRef.current = e.clientX;

    const angularDelta = (deltaX / window.innerWidth) * 180;
    targetRotationRef.current += angularDelta;
    velocityRef.current = angularDelta;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPointerDown(false);
    isDraggingRef.current = false;

    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  // Direct mouse wheel scroll control on hover
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Elegant incremental rotation from mouse wheel directly inside section
    targetRotationRef.current += e.deltaY * 0.065;
  };

  const anglePerItem = 360 / duplicatedItems.length;

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] md:h-[600px] flex flex-col justify-center items-center overflow-visible select-none">
      
      {/* 3D Scene Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className={cn(
          "relative w-full h-[380px] sm:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing",
          isPointerDown && "grabbing"
        )}
        style={{ perspective: '1800px', touchAction: 'none' }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {duplicatedItems.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);

            // Dynamically calculate opacity & gorgeous focal scales based on front proximity
            const opacity = Math.max(0.06, 1 - (normalizedAngle / 120));
            const scale = Math.max(0.70, 1.15 - (normalizedAngle / 180) * 0.45);
            const isFront = normalizedAngle < 100;

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-300 ease-out"
                style={{
                  width: `${itemDimensions.width}px`,
                  height: `${itemDimensions.height}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity: opacity,
                  pointerEvents: isFront ? 'auto' : 'none',
                  backfaceVisibility: 'hidden',
                  willChange: 'opacity, transform'
                }}
              >
                {/* Visual Glassmorphic Project Card */}
                <div className="h-full w-full rounded-[2.2rem] overflow-hidden p-1.5 bg-neutral-900/40 border border-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-300 group hover:border-[#C5A059]/40 hover:shadow-[#C5A059]/10 hover:scale-[1.03]">
                  {item.link ? (
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block w-full h-full rounded-[1.92rem] overflow-hidden bg-[#070707] cursor-pointer"
                      onClick={(e) => {
                        // Prevent click event if active dragging/swiping velocity is high to allow rotation
                        if (Math.abs(velocityRef.current) > 1.2) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {/* Project Thumbnail Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        draggable="false"
                      />

                      {/* Highly aesthetic gradient masks */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-[2]" />
                      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/20 to-transparent z-[2]" />

                      {/* Numeric Watermark Background */}
                      <div className="absolute top-5 left-5 z-[3] pointer-events-none">
                        <span className="font-mono text-3xl font-bold text-white/15 select-none tracking-widest">
                          {item.id.substring(0, 2)}
                        </span>
                      </div>

                      {/* Details On Card overlay */}
                      <div className="absolute bottom-6 left-6 right-6 z-[3] text-left">
                        <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#C5A059] border border-[#C5A059]/30 px-2.5 py-0.5 rounded-full mb-2 inline-block bg-black/40 backdrop-blur-sm">
                          {item.category}
                        </span>
                        <h4 className="text-lg font-serif italic text-white leading-tight font-semibold group-hover:text-[#C5A059] transition-colors flex items-center gap-1.5">
                          {item.title}
                          <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </h4>
                      </div>
                    </a>
                  ) : (
                    <div className="relative w-full h-full rounded-[1.92rem] overflow-hidden bg-[#070707]">
                      {/* Project Thumbnail Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        draggable="false"
                      />

                      {/* Highly aesthetic gradient masks */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-[2]" />
                      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/20 to-transparent z-[2]" />

                      {/* Numeric Watermark Background */}
                      <div className="absolute top-5 left-5 z-[3] pointer-events-none">
                        <span className="font-mono text-3xl font-bold text-white/15 select-none tracking-widest">
                          {item.id.substring(0, 2)}
                        </span>
                      </div>

                      {/* Details On Card overlay */}
                      <div className="absolute bottom-6 left-6 right-6 z-[3] text-left">
                        <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#C5A059] border border-[#C5A059]/30 px-2.5 py-0.5 rounded-full mb-2 inline-block bg-black/40 backdrop-blur-sm">
                          {item.category}
                        </span>
                        <h4 className="text-lg font-serif italic text-white leading-tight font-semibold group-hover:text-[#C5A059] transition-colors">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Detailed Control and Details Console */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-3 w-full">
        <p className="text-[9px] uppercase font-mono tracking-[0.25em] text-[#C5A059] animate-pulse">
          {isDesktop ? "↓ Scroll page or hover & wheel-scroll to explore gallery ↓" : "← Swipe Left or Right to Browse →"}
        </p>

        {/* Clean, high-tech selector slide dots */}
        <div className="flex gap-2 items-center justify-center bg-white/[0.02] border border-white/5 px-4.5 py-2.5 rounded-full backdrop-blur-xl">
          {items.map((proj, i) => (
            <button
              key={proj.id}
              onClick={() => {
                const anglePerOriginalItem = 360 / items.length;
                const currentDegrees = currentRotationRef.current;
                const currentK = Math.round(currentDegrees / 360);
                let targetDegs = currentK * 360 - i * anglePerOriginalItem;

                const diff = targetDegs - currentDegrees;
                if (diff > 180) {
                  targetDegs -= 360;
                } else if (diff < -180) {
                  targetDegs += 360;
                }
                targetRotationRef.current = targetDegs;
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                i === activeIndex ? "w-8 bg-[#C5A059]" : "w-2 bg-white/10 hover:bg-white/30"
              )}
              aria-label={`Select Project ${proj.title}`}
            />
          ))}
        </div>

        {/* Selected Project Dynamic Briefcase console panel */}
        <div className="text-center mt-3 max-w-xl px-6 min-h-[140px] flex flex-col items-center justify-start transition-all duration-500 w-full">
          <h3 className="text-xl sm:text-2xl font-serif italic font-semibold text-white tracking-tight">
            {items[activeIndex]?.title}
          </h3>
          <p className="text-[#C5A059] text-[10px] uppercase tracking-wider font-mono font-medium mt-1">
            {items[activeIndex]?.category}
          </p>
          <p className="text-white/60 text-xs sm:text-sm font-sans mt-2.5 leading-relaxed max-w-md">
            {items[activeIndex]?.description}
          </p>
          
          {items[activeIndex]?.link && (
            <motion.a
              href={items[activeIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 px-5 py-2.5 bg-[#C5A059]/10 hover:bg-[#C5A059]/25 border border-[#C5A059]/30 hover:border-[#C5A059]/70 text-[#C5A059] hover:text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-[0_4px_20px_rgba(197,160,89,0.15)] cursor-pointer"
            >
              <span>Visit Live Project</span>
              <ArrowUpRight size={13} className="text-[#C5A059]" />
            </motion.a>
          )}
        </div>
      </div>

    </div>
  );
}

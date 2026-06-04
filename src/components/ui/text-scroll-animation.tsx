"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";
import { cn } from "../../lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
  key?: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);

  return (
    <motion.span
      className={cn("inline-block text-[#C5A059]", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 object-contain will-change-transform invert opacity-80 hover:opacity-100 transition-opacity"
      style={{ x, scale, y, transformOrigin: "center" }}
    />
  );
};

const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 object-contain will-change-transform invert opacity-80 hover:opacity-100 transition-opacity"
      style={{ x, rotate, y, scale, transformOrigin: "center" }}
    />
  );
};

const Skiper31 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollYProgress: scrollYProgress2 } = useScroll({ target: targetRef2 });
  const { scrollYProgress: scrollYProgress3 } = useScroll({ target: targetRef3 });

  // Dynamic backdrops, opacity transitions, and border fades that increase from 0 to 0.5
  const backdropFilter1 = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(20px)"]);
  const borderOpacity1 = useTransform(scrollYProgress, [0, 0.5], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);
  const bgOpacity1 = useTransform(scrollYProgress, [0, 0.5], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.02)"]);
  const containerOpacity1 = useTransform(scrollYProgress, [0, 0.5], [0.4, 1.0]);

  const backdropFilter2 = useTransform(scrollYProgress2, [0, 0.5], ["blur(0px)", "blur(20px)"]);
  const borderOpacity2 = useTransform(scrollYProgress2, [0, 0.5], ["rgba(197, 160, 89, 0)", "rgba(197, 160, 89, 0.12)"]);
  const bgOpacity2 = useTransform(scrollYProgress2, [0, 0.5], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.02)"]);
  const containerOpacity2 = useTransform(scrollYProgress2, [0, 0.5], [0.4, 1.0]);

  const backdropFilter3 = useTransform(scrollYProgress3, [0, 0.5], ["blur(0px)", "blur(20px)"]);
  const borderOpacity3 = useTransform(scrollYProgress3, [0, 0.5], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);
  const bgOpacity3 = useTransform(scrollYProgress3, [0, 0.5], ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.4)"]);
  const containerOpacity3 = useTransform(scrollYProgress3, [0, 0.5], [0.4, 1.0]);

  const text = "see more from ";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const macIcon = [
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/discord.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/figma.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/framer.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mongodb.svg",
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/notion.svg",
  ];
  const iconCenterIndex = Math.floor(macIcon.length / 2);

  return (
    <ReactLenis root>
      <main className="w-full bg-[#050505] text-white overflow-hidden">
        {/* Scroll hint indicator */}
        <div className="absolute left-1/2 z-10 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-white/50 top-8">
          <span className="relative max-w-[12ch] text-[10px] font-mono uppercase tracking-[0.2em] leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-12 after:w-px after:bg-gradient-to-b after:from-[#C5A059] after:to-transparent after:content-['']">
            Scroll for Tech Stack
          </span>
        </div>

        {/* Section 1 - Text */}
        <div
          ref={targetRef}
          className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-gradient-to-b from-[#050505] to-[#0A0A0A] p-[4vw]"
        >
          {/* Ambient glowing orb inside the page background */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#C5A059]/5 blur-[120px] pointer-events-none" />

          <motion.div
            style={{
              backdropFilter: backdropFilter1,
              WebkitBackdropFilter: backdropFilter1,
              borderColor: borderOpacity1,
              backgroundColor: bgOpacity1,
              opacity: containerOpacity1,
            }}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 w-full max-w-4xl p-10 sm:p-20 rounded-[32px] border border-white/0 flex items-center justify-center shadow-2xl transition-all duration-300"
          >
            <div
              className="w-full text-center text-4xl sm:text-6xl md:text-7xl font-space font-extrabold uppercase tracking-tighter text-white"
              style={{ perspective: "1000px" }}
            >
              {characters.map((char, index) => (
                <CharacterV1
                  key={index}
                  char={char}
                  index={index}
                  centerIndex={centerIndex}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 2 - Icons Grid Stack */}
        <div
          ref={targetRef2}
          className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#050505] p-[4vw]"
        >
          {/* Ambient glowing orb */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />

          <motion.div
            style={{
              backdropFilter: backdropFilter2,
              WebkitBackdropFilter: backdropFilter2,
              borderColor: borderOpacity2,
              backgroundColor: bgOpacity2,
              opacity: containerOpacity2,
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="relative z-10 w-full max-w-4xl p-10 sm:p-16 rounded-[32px] border border-white/0 flex flex-col items-center justify-center gap-8 shadow-2xl transition-all duration-300"
          >
            <p className="flex items-center justify-center gap-3 text-lg sm:text-2xl font-serif italic text-[#C5A059]">
              <Bracket className="h-8 sm:h-12 text-[#C5A059]" />
              <span className="font-serif">integrate with your fav tech stack</span>
              <Bracket className="h-8 sm:h-12 scale-x-[-1] text-[#C5A059]" />
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {macIcon.map((char, index) => (
                <CharacterV2
                  key={index}
                  char={char}
                  index={index}
                  centerIndex={iconCenterIndex}
                  scrollYProgress={scrollYProgress2}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 3 - Animated Rotation Icons */}
        <div
          ref={targetRef3}
          className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-[#050505] to-[#0A0A0A] p-[4vw]"
        >
          {/* Ambient glowing orb */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

          <motion.div
            style={{
              backdropFilter: backdropFilter3,
              WebkitBackdropFilter: backdropFilter3,
              borderColor: borderOpacity3,
              backgroundColor: bgOpacity3,
              opacity: containerOpacity3,
            }}
            animate={{
              y: [0, -14, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="relative z-10 w-full max-w-4xl p-10 sm:p-16 rounded-[32px] border border-white/0 flex flex-col items-center justify-center gap-8 shadow-2xl transition-all duration-300 animate-pulse-subtle"
          >
            <p className="flex items-center justify-center gap-3 text-lg sm:text-2xl font-serif italic text-white/90">
              <Bracket className="h-8 sm:h-12 text-white/50" />
              <span className="font-serif">and dynamic tools & pipelines</span>
              <Bracket className="h-8 sm:h-12 scale-x-[-1] text-white/50" />
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10" style={{ perspective: "1000px" }}>
              {macIcon.map((char, index) => (
                <CharacterV3
                  key={index}
                  char={char}
                  index={index}
                  centerIndex={iconCenterIndex}
                  scrollYProgress={scrollYProgress3}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </ReactLenis>
  );
};

const Bracket = ({ className }: { className: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

export { CharacterV1, CharacterV2, CharacterV3, Skiper31 };

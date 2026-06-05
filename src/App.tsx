import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  Menu,
  ChevronRight,
  MessageSquare,
  Globe,
  Mail,
  Linkedin,
  Github,
  Award,
  CircleDot
} from 'lucide-react';
import { Magnet } from './components/Magnet';
import { ContactButton } from './components/ContactButton';
import { LiveProjectButton } from './components/LiveProjectButton';
import { FadeIn } from './components/FadeIn';
import { AnimatedText } from './components/AnimatedText';
import { WebGLShader } from './components/ui/web-gl-shader';
import { StardustButton } from './components/ui/stardust-button';

// @ts-expect-error - image asset import
import profileImage from './assets/images/profile_raymond_3d_1780645210471.png';

// @ts-expect-error - image asset import
import ceeDashboard from './assets/images/cee_revision_dashboard_1780643184610.png';
// @ts-expect-error - image asset import
import ceeMobile from './assets/images/cee_revision_mobile_1780643200894.png';
// @ts-expect-error - image asset import
import ceeBadge from './assets/images/cee_revision_badge_1780643253454.png';

// @ts-expect-error - image asset import
import hatProduct from './assets/images/african_hat_product_1780643216593.png';
// @ts-expect-error - image asset import
import hatTraveler from './assets/images/african_hat_traveler_1780643232057.png';
// @ts-expect-error - image asset import
import hatBox from './assets/images/african_hat_box_1780643269655.png';
// @ts-expect-error - image asset import
import hatSafari from './assets/images/african_safari_wildlife_1780643552194.png';

// @ts-expect-error - image asset import
import retailShelves from './assets/images/retail_supermarket_shelves_1780643942616.png';
// @ts-expect-error - image asset import
import retailCheckout from './assets/images/retail_smart_checkout_1780643962728.png';
// @ts-expect-error - image asset import
import retailInterior from './assets/images/retail_boutique_interior_1780643981894.png';

// @ts-expect-error - image asset import
import novaAthlete from './assets/images/nova_athlete_action_1780644002537.png';
// @ts-expect-error - image asset import
import novaDevice from './assets/images/nova_interactive_device_1780644020908.png';
// @ts-expect-error - image asset import
import novaWorkout from './assets/images/nova_people_workout_1780644039339.png';

// @ts-expect-error - image asset import
import rnStation from './assets/images/rn_studio_designer_station_1780644061416.png';
// @ts-expect-error - image asset import
import rnCooperation from './assets/images/rn_studio_office_cooperation_1780644084097.png';
// @ts-expect-error - image asset import
import rnAgents from './assets/images/rn_studio_intelligent_agents_1780644103297.png';

// --- Projects Data ---
const PROJECTS = [
  {
    id: '01',
    category: 'Premium Brand Identity & Web Dev',
    title: 'RN Studio',
    col1Image1: rnStation,
    col1Image2: rnCooperation,
    col2Image: rnAgents,
    link: 'https://github.com/raymondndungu8-blip'
  },
  {
    id: '02',
    category: 'AI-Integrated Fitness & Motion Tracking',
    title: 'NOVA Core',
    col1Image1: novaAthlete,
    col1Image2: novaDevice,
    col2Image: novaWorkout,
    link: 'https://github.com/raymondndungu8-blip'
  },
  {
    id: '03',
    category: 'Digital Retail & Automotive Transformation',
    title: 'Retail Modernization',
    col1Image1: retailShelves,
    col1Image2: retailCheckout,
    col2Image: retailInterior,
    link: 'https://github.com/raymondndungu8-blip'
  },
  {
    id: '04',
    category: 'Interactive EdTech Learning Platform',
    title: 'Cee Revision',
    col1Image1: ceeBadge,
    col1Image2: ceeMobile,
    col2Image: ceeDashboard,
    link: 'https://github.com/raymondndungu8-blip'
  },
  {
    id: '05',
    category: 'Artisanal Heritage Apparel & Safari Gear',
    title: 'African Hat',
    col1Image1: hatProduct,
    col1Image2: hatTraveler,
    col2Image: hatSafari,
    link: 'https://github.com/raymondndungu8-blip'
  }
];

// --- Services Data ---
const SERVICES = [
  {
    num: '01',
    name: 'Web Development',
    desc: 'Creation of detailed and reliable websites, customized front-ends, and performance-optimized full-stack web applications constructed for supreme speeds.'
  },
  {
    num: '02',
    name: 'Creative Technology',
    desc: 'Employing avant-garde creative loops to craft highly premium digital interfaces using standard-setting experimental elements.'
  },
  {
    num: '03',
    name: 'Vibe Coding',
    desc: 'Leveraging cutting-edge AI-assisted engineering with natural language context to orchestrate lightning-fast design-to-production pipelines.'
  },
  {
    num: '04',
    name: 'UI/UX Design',
    desc: 'Designing custom digital systems with focus on stunning black luxury aesthetics, custom layouts, high-end editorial fonts, and user experiences.'
  },
  {
    num: '05',
    name: 'Payment Operations',
    desc: 'Implementing high-grade checkout flow integrations involving global and regional providers such as Stripe, IntaSend, and PayPal.'
  }
];

// --- Marquee Images ---
const MARQUEE_GIFS = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

// Sticky Card Wrapper for 3D Projects Section
interface CardWrapperProps {
  index: number;
  total: number;
  children: React.ReactNode;
  key?: React.Key | null;
}

function ProjectCardWrapper({ index, total, children }: CardWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  
  return (
    <div 
      ref={containerRef} 
      className="sticky w-full"
      style={{
        top: `${96 + index * 28}px`, // Cards offset by top (sticky top-24 md:top-32, plus indices offset)
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Main App Redesign
export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 800; // Snappy 800ms preloader for super fast perceived load speed

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const computed = Math.min(Math.round((elapsed / duration) * 100), 100);
      
      setLoadingProgress(computed);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setLoadingComplete(true);
        }, 150);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);
  
  // Custom scroll listener refs for Passive Marquee Horiz Trans
  const marqueeContainerRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = marqueeContainerRef.current;
    if (!parent) return;

    // Cache the offsetTop during mount and only recalculate on resize to prevent layout thrashing
    let sectionTop = parent.offsetTop;
    const handleResize = () => {
      if (parent) {
        sectionTop = parent.offsetTop;
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let ticked = false;
    const handleScroll = () => {
      if (!ticked) {
        requestAnimationFrame(() => {
          const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.35;
          
          if (row1Ref.current) {
            row1Ref.current.style.transform = `translate3d(${offset - 200}px, 0px, 0px)`;
          }
          if (row2Ref.current) {
            row2Ref.current.style.transform = `translate3d(${- (offset - 200)}px, 0px, 0px)`;
          }
          ticked = false;
        });
        ticked = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial sync

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Form submission handler querying backend and routing message to email
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("All fields are required. Please provide your name, email, and project description.");
      return;
    }
    
    setFormLoading(true);
    setFormError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'RN Studio Portfolio Project Inquiry',
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({ error: 'Inquiry dispatch failed.' }));
        throw new Error(errJson.error || 'Server error occurred during dispatch.');
      }

      await response.json();
      setFormSubmitted(true);
      
      // Auto close and reset state after success screen shows
      setTimeout(() => {
        setFormSubmitted(false);
        setIsContactOpen(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3500);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setFormError(err.message || 'An unexpected networking bottleneck occurred.');
    } finally {
      setFormLoading(false);
    }
  };

  // Scroll smoothly to targeting hash
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!loadingComplete && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              y: '-100dvh',
              transition: { 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1] 
              }
            }}
            className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-12 bg-[#050507] text-[#D7E2EA] font-sans overflow-hidden select-none pointer-events-auto"
          >
            {/* Top Row */}
            <div className="w-full flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-widest font-mono text-[#D7E2EA]/30">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-pulse" />
                RN STUDIO 2026
              </span>
              <span>CREATIVE PORTFOLIO</span>
            </div>

            {/* Center: Beautiful Rising Typography */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="overflow-hidden mb-3">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1], delay: 0.1 }}
                  className="hero-heading text-[10vw] sm:text-[6vw] md:text-[5vw] font-black uppercase tracking-tight leading-none text-white flex items-center gap-2.5 sm:gap-4 justify-center"
                >
                  RAYMOND <span className="text-[#C5A059] text-[5vw] sm:text-[3vw]">✧</span> ND&apos;UNGU
                </motion.h1>
              </div>

              <div className="overflow-hidden h-6 sm:h-8">
                <motion.p 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1], delay: 0.3 }}
                  className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-[#D7E2EA]/60"
                >
                  ✧ DESIGN IS EVERYTHING ✦
                </motion.p>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="w-full flex justify-between items-end">
              <div className="flex flex-col gap-1 items-start text-left text-[9px] sm:text-xs font-mono text-[#D7E2EA]/30 uppercase">
                <span>SYSTEM INIT</span>
                <span>GEOMETRY SHADERS ON</span>
              </div>
              
              <div className="text-[12vw] sm:text-[7vw] font-bold font-mono tracking-tighter leading-none tabular-nums text-white">
                {String(loadingProgress).padStart(3, '0')}<span className="text-[5vw] sm:text-[2.5vw] text-[#C5A059] font-light">%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth easeOutExpo 
          staggerChildren: 0.15 
        }}
        className="relative bg-[#0C0C0C] text-[#D7E2EA] antialiased select-none font-sans overflow-x-clip min-h-screen"
      >
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85dvh] xs:h-[88dvh] sm:h-screen min-h-[540px] xs:min-h-[580px] sm:min-h-0 w-full flex flex-col justify-between overflow-hidden px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 bg-[#0C0C0C]">
        
        {/* Interactive 3D WebGL Shader background */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none select-none">
          <WebGLShader />
        </div>
        
        {/* Navbar inside Hero Section */}
        <FadeIn delay={0} y={-20} as="nav" className="w-full flex justify-between items-center pt-6 md:pt-8 relative z-35">
          <button 
            onClick={() => scrollToSection('about')} 
            className="font-sans font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer text-[#D7E2EA]"
          >
            About
          </button>
          
          <button 
            onClick={() => scrollToSection('price')} 
            className="font-sans font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer text-[#D7E2EA]"
          >
            Services
          </button>
          
          <button 
            onClick={() => scrollToSection('projects')} 
            className="font-sans font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer text-[#D7E2EA]"
          >
            Projects
          </button>
          
          <button 
            onClick={() => setIsContactOpen(true)} 
            className="font-sans font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer text-[#D7E2EA]"
          >
            Contact
          </button>
        </FadeIn>

        {/* Hero Huge Heading Stack - Structured as an editorial framing system around the centered portrait */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 px-6 pointer-events-none flex flex-col justify-between items-center h-[46dvh] xs:h-[50dvh] sm:h-[70dvh] max-h-[230px] xs:max-h-[270px] sm:max-h-[500px] md:max-h-[580px] lg:max-h-[640px] xl:max-h-[680px]">
          <FadeIn delay={0.15} y={-15} className="w-full flex justify-center">
            <h1 className="hero-heading text-[8vw] xs:text-[9vw] sm:text-[8vw] md:text-[7vw] lg:text-[6.5vw] font-black uppercase tracking-tight leading-none text-white/50 select-none">
              HI, I&apos;M
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3} y={15} className="w-full flex justify-center">
            <h1 className="hero-heading text-[12vw] xs:text-[13vw] sm:text-[14vw] md:text-[13vw] lg:text-[12vw] font-black uppercase tracking-tighter leading-none text-white select-none">
              RAYMOND
            </h1>
          </FadeIn>
        </div>

        {/* Anchor Portrait layered in front of heading on mobile, and behind on tablet/PC to construct a gorgeous editorial depth effect */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 sm:z-[5] w-[130px] xs:w-[155px] sm:w-[230px] md:w-[290px] lg:w-[350px] xl:w-[380px] select-none pointer-events-none sm:pointer-events-auto">
          {/* Subtle multi-layer ambient glows to blend background and elevate the 3D depth of the face */}
          <div className="absolute inset-0 bg-[#C5A059]/12 rounded-full blur-[60px] -z-10 pointer-events-none scale-110" />
          <div className="absolute inset-0 bg-violet-600/10 rounded-full blur-[90px] -z-10 pointer-events-none scale-125 animate-pulse duration-[7s]" />
          
          <FadeIn delay={0.4} y={20}>
            <Magnet padding={150} strength={3}>
              <img 
                src={profileImage} 
                alt="Raymond portrait" 
                className="w-full aspect-square object-cover mix-blend-screen contrast-[1.1] brightness-[1.05] hover:scale-[1.04] transition-all duration-500"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 98%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 98%)'
                }}
                referrerPolicy="no-referrer"
              />
            </Magnet>
          </FadeIn>
        </div>

        {/* Bottom Bar Segment - Stacked on mobile and row on desktop */}
        <div className="relative w-full flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 sm:gap-0 z-30 pb-2 sm:pb-0">
          {/* Left Summary Text */}
          <FadeIn delay={0.35} y={20} className="w-full sm:w-auto">
            <p className="text-white font-semibold uppercase tracking-wider leading-relaxed text-xs sm:text-[1.2vw] md:text-sm max-w-[250px] xs:max-w-[280px] sm:max-w-[280px] md:max-w-[340px] text-center sm:text-left mx-auto sm:mx-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              a kenya-based web developer & creative technologist specializing in premium UI/UX design
            </p>
          </FadeIn>

          {/* Right Floating Contact Button */}
          <FadeIn delay={0.5} y={20} className="w-full sm:w-auto flex justify-center z-30">
            <StardustButton 
              onClick={() => setIsContactOpen(true)} 
              className="w-full sm:w-auto min-w-[190px] sm:min-w-[210px] scale-90 xs:scale-100"
            >
              Contact Me
            </StardustButton>
          </FadeIn>
        </div>

      </section>

      {/* 2. MARQUEE SECTION */}
      <section 
        ref={marqueeContainerRef} 
        className="w-full overflow-hidden bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 relative z-10"
      >
        {/* Row 1: Triple elements, scrolling right */}
        <div className="w-full overflow-hidden relative">
          <div 
            ref={row1Ref} 
            style={{ willChange: 'transform' }}
            className="flex gap-3 whitespace-nowrap"
          >
            {[...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11)].map((gif, idx) => (
              <img 
                key={`r1-${idx}`}
                src={gif} 
                alt="3D presentation item" 
                className="w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] flex-shrink-0 rounded-2xl object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>

        {/* Row 2: Triple elements, scrolling left */}
        <div className="w-full overflow-hidden relative">
          <div 
            ref={row2Ref} 
            style={{ willChange: 'transform' }}
            className="flex gap-3 whitespace-nowrap"
          >
            {[...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11)].map((gif, idx) => (
              <img 
                key={`r2-${idx}`}
                src={gif} 
                alt="3D interaction thumbnail" 
                className="w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] flex-shrink-0 rounded-2xl object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section 
        id="about" 
        className="relative min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-28 overflow-hidden bg-[#0C0C0C]"
      >
        {/* Decorative Abs Corner 3D items */}
        {/* 1. Top left Moon */}
        <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none select-none">
          <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" 
              alt="Decorative 3D Moon"
              className="w-[120px] sm:w-[160px] md:w-[210px] object-contain"
              referrerPolicy="no-referrer"
            />
          </FadeIn>
        </div>

        {/* 2. Top right Lego */}
        <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none select-none">
          <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" 
              alt="Decorative 3D Lego block"
              className="w-[120px] sm:w-[160px] md:w-[210px] object-contain"
              referrerPolicy="no-referrer"
            />
          </FadeIn>
        </div>

        {/* 3. Bottom left abstract capsule */}
        <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none select-none">
          <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" 
              alt="Decorative 3D capsule"
              className="w-[100px] sm:w-[140px] md:w-[180px] object-contain"
              referrerPolicy="no-referrer"
            />
          </FadeIn>
        </div>

        {/* 4. Bottom right glass group */}
        <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none select-none">
          <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" 
              alt="Decorative 3D orb structure"
              className="w-[130px] sm:w-[170px] md:w-[220px] object-contain"
              referrerPolicy="no-referrer"
            />
          </FadeIn>
        </div>

        {/* Content Wrapper */}
        <div className="max-w-4xl text-center flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-20">
          
          {/* Centered Heading */}
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[160px] font-black uppercase tracking-tight leading-none text-center">
              About me
            </h2>
          </FadeIn>

          {/* Character-by-character reveals on scroll */}
          <div className="max-w-3xl px-4 md:px-0">
            <AnimatedText 
              text="I am a Kenya-based Web Developer and Creative Technologist specializing in premium UI/UX design. Founder of RN Studio, I craft high-end digital experiences defined by a dark luxury editorial aesthetic. My workflow leverages advanced 'vibe coding' and AI-assisted development to deliver high-performance, mobile-first solutions for retail and automotive industries."
              className="text-[#D7E2EA] font-medium leading-relaxed font-sans text-center text-sm sm:text-lg md:text-xl lg:text-[1.35rem] tracking-wide"
            />
          </div>

          {/* Core Skills Premium Luxury Display Grid */}
          <FadeIn delay={0.15} y={30} className="w-full max-w-4xl mt-6 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
              
              {/* Dev skill card */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]/40 backdrop-blur-md">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#C5A059] mb-3">Development</h4>
                <ul className="space-y-1 text-xs text-white/70 font-sans">
                  <li>Web Development</li>
                  <li>Creative Technology</li>
                  <li>Vibe Coding</li>
                  <li>Prompt Engineering</li>
                </ul>
              </div>

              {/* Design skill card */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]/30 backdrop-blur-md">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#C5A059] mb-3">Design</h4>
                <ul className="space-y-1 text-xs text-white/70 font-sans">
                  <li>Premium UI/UX</li>
                  <li>Editorial Design</li>
                  <li>Dark Luxury Aesthetic</li>
                </ul>
              </div>

              {/* Tools skill card */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]/40 backdrop-blur-md">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#C5A059] mb-3">Tools</h4>
                <ul className="space-y-1 text-xs text-white/70 font-sans">
                  <li>Claude Code & Cursor</li>
                  <li>Windsurf</li>
                  <li>Google Antigravity</li>
                  <li>21st.dev</li>
                </ul>
              </div>

              {/* Operations skill card */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]/30 backdrop-blur-md">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#C5A059] mb-3">Operations</h4>
                <ul className="space-y-1 text-xs text-white/70 font-sans">
                  <li>Payment Integrations</li>
                  <li>Stripe, IntaSend, PayPal</li>
                  <li>API Management</li>
                </ul>
              </div>

            </div>
          </FadeIn>

          {/* Action button beneath */}
          <FadeIn delay={0.2} y={30} className="mt-4 sm:mt-6">
            <ContactButton onClick={() => setIsContactOpen(true)} />
          </FadeIn>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section 
        id="price" 
        className="w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20"
      >
        <div className="max-w-5xl mx-auto flex flex-col">
          
          {/* Section Heading */}
          <FadeIn delay={0.1} y={40} className="w-full flex justify-center">
            <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[160px] tracking-tight leading-none mb-16 sm:mb-20 md:mb-28">
              Services
            </h2>
          </FadeIn>

          {/* List items with staggered Delay */}
          <div className="w-full flex flex-col border-t border-[#0C0C0C]/15">
            {SERVICES.map((srv, idx) => (
              <FadeIn 
                key={srv.num} 
                delay={idx * 0.15} 
                y={30} 
                className="w-full border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
                  {/* Big Number indicators */}
                  <div className="md:col-span-3 flex md:justify-start">
                    <span className="font-sans font-black leading-none text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[140px] text-[#0C0C0C] select-none tracking-tighter">
                      {srv.num}
                    </span>
                  </div>

                  {/* Name + Stack Details */}
                  <div className="md:col-span-9 flex flex-col text-left space-y-2">
                    <h3 className="font-sans font-medium uppercase text-[1.5rem] sm:text-[1.8rem] md:text-[2.1rem] leading-none text-[#0C0C0C]">
                      {srv.name}
                    </h3>
                    <p className="font-sans font-light leading-relaxed max-w-2xl text-[0.85rem] sm:text-[1rem] md:text-[1.25rem] text-[#0C0C0C]/60">
                      {srv.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section 
        id="projects" 
        className="w-full bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-24 pb-32 px-5 sm:px-8 md:px-10 relative z-30"
      >
        <div className="max-w-6xl mx-auto flex flex-col">
          
          {/* Headline heading */}
          <FadeIn delay={0.1} y={40} className="w-full flex justify-center mb-16 sm:mb-24">
            <h2 className="hero-heading font-black uppercase text-center text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[160px] tracking-tight leading-none">
              Projects
            </h2>
          </FadeIn>

          {/* Stacking Sticky Cards loop */}
          <div className="space-y-24 sm:space-y-32">
            {PROJECTS.map((proj, idx) => (
              <ProjectCardWrapper key={proj.id} index={idx} total={PROJECTS.length}>
                
                {/* Visual Glass Card Body */}
                <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-7 md:p-10 flex flex-col shadow-2xl">
                  
                  {/* Top Header Row of Project */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D7E2EA]/15 pb-6 sm:pb-8 w-full text-left">
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* Giant numerical watermark index */}
                      <span className="font-sans font-black text-4xl sm:text-6xl text-[#D7E2EA]/20 select-none">
                        {proj.id}
                      </span>
                      
                      {/* Name + Client state info */}
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-white/50 mb-1">
                          {proj.category}
                        </span>
                        <h4 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#D7E2EA]">
                          {proj.title}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Ghost pill link button */}
                    <div className="w-full sm:w-auto flex md:justify-end">
                      <LiveProjectButton href={proj.link} className="w-full sm:w-auto" />
                    </div>
                  </div>

                  {/* Bottom Visual Media Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-10 gap-5 sm:gap-6 mt-6 md:mt-10">
                    
                    {/* Left Columns (40% space -> col-span-4) - 2 Stacked Images */}
                    <div className="md:col-span-4 flex flex-col gap-5 sm:gap-6">
                      <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[45px] hover:scale-[1.02] transition-transform duration-500">
                        <img 
                          src={proj.col1Image1} 
                          alt={`${proj.title} representation`} 
                          className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[45px] brightness-[0.9] hover:brightness-100 transition-all duration-300"
                          style={{ height: "clamp(130px, 16vw, 230px)" }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[45px] hover:scale-[1.02] transition-transform duration-500">
                        <img 
                          src={proj.col1Image2} 
                          alt={`${proj.title} detail`} 
                          className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[45px] brightness-[0.9] hover:brightness-100 transition-all duration-300"
                          style={{ height: "clamp(160px, 22vw, 340px)" }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Right Hand Tall Image Column (60% space -> col-span-6) */}
                    <div className="md:col-span-6 overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[45px] hover:scale-[1.02] transition-transform duration-[0.5s]">
                      <img 
                        src={proj.col2Image} 
                        alt={`${proj.title} immersive interface`} 
                        className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[45px] brightness-[0.9] hover:brightness-100 transition-all duration-300"
                        style={{ minHeight: "clamp(300px, 40vw, 594px)" }}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                  </div>

                </div>

              </ProjectCardWrapper>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER DIRECT INQUIRY & COPYRIGHT */}
      <footer className="w-full bg-[#0C0C0C] py-16 px-6 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Column 1 Logo details */}
          <div className="flex flex-col text-center md:text-left space-y-2 font-sans">
            <span className="text-xl font-black uppercase tracking-widest text-[#D7E2EA]">RN STUDIO</span>
            <span className="text-xs text-white/40 tracking-normal">Premium Web Development & Creative Technology</span>
          </div>

          {/* Socials Link Set */}
          <div className="flex items-center gap-6">
            <Magnet padding={40} strength={2.5}>
              <a 
                href="https://github.com/raymondndungu8-blip" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#C5A059] transition-all rounded-full block"
                title="GitHub Profile"
              >
                <Github size={18} />
              </a>
            </Magnet>
            <Magnet padding={40} strength={2.5}>
              <a 
                href="https://www.linkedin.com/search/results/all/?keywords=Raymond%20Ndungu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#C5A059] transition-all rounded-full block"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            </Magnet>
            <Magnet padding={40} strength={2.5}>
              <a 
                href="https://wa.me/254745091919" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#C5A059] transition-all rounded-full block"
                title="WhatsApp Chat"
              >
                <MessageSquare size={18} />
              </a>
            </Magnet>
            <Magnet padding={40} strength={2.5}>
              <a 
                href="mailto:raymondndungu8@gmail.com" 
                className="p-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#C5A059] transition-all rounded-full block"
                title="Send Email"
              >
                <Mail size={18} />
              </a>
            </Magnet>
          </div>

          {/* Text footer trademark copy */}
          <div className="text-xs text-white/30 font-mono">
            &copy; {new Date().getFullYear()} Raymond Karanja Ndungu. All rights reserved.
          </div>

        </div>
      </footer>

      {/* --- CINEMATIC DIALOG/OVERLAY FOR CONTACT FORM --- */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-[2.5rem] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-10 text-left overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="absolute inset-0 noise opacity-[0.03] pointer-events-none" />
              
              {/* Close Button Trigger */}
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 text-white hover:text-[#C5A059] rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="mb-8 pr-6">
                <span className="text-[10px] text-[#C5A059] uppercase tracking-[0.3em] font-bold block mb-1.5">Start Collaboration</span>
                <h3 className="text-3xl font-black uppercase tracking-tight text-[#D7E2EA]">
                  Start a Project
                </h3>
                <p className="text-xs text-white/60 mt-2 font-sans">
                  Let&apos;s build something striking. Send Raymond a message about your web modernization, fitness tracking product, or custom UI goals.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full animate-bounce">
                    <Check size={32} />
                  </div>
                  <h4 className="text-xl font-bold uppercase text-white">Message Dispatched!</h4>
                  <p className="text-xs text-white/50 max-w-sm">
                    Thank you, Raymond will evaluate your project scope and contact you shortly to coordinate your system release.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {formError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-sans text-center">
                      {formError}
                    </div>
                  )}

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="formName" className="text-[9px] uppercase tracking-widest text-[#D7E2EA]/50 font-mono font-bold">Your Name</label>
                    <input 
                      id="formName"
                      type="text" 
                      required
                      disabled={formLoading}
                      placeholder="e.g. Alexis Carter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#C5A059] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="formEmail" className="text-[9px] uppercase tracking-widest text-[#D7E2EA]/50 font-mono font-bold">Email Address</label>
                    <input 
                      id="formEmail"
                      type="email" 
                      required
                      disabled={formLoading}
                      placeholder="e.g. alexis@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#C5A059] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="formMessage" className="text-[9px] uppercase tracking-widest text-[#D7E2EA]/50 font-mono font-bold">Message details</label>
                    <textarea 
                      id="formMessage"
                      rows={4}
                      required
                      disabled={formLoading}
                      placeholder="Describe your web design, retail integrations, fitness applications or custom aesthetic..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#C5A059] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formLoading}
                    className="w-full mt-4 py-4 uppercase font-sans font-bold tracking-widest text-xs text-white rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 10px rgba(181, 1, 167, 0.25)',
                    }}
                  >
                    {formLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                    ) : (
                      <Send size={14} />
                    )}
                    <span>{formLoading ? 'Dispatching...' : 'Submit Request'}</span>
                  </button>
                </form>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  </>
);
}

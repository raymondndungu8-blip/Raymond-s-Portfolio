/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValue, useMotionTemplate } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  Youtube,
  Twitch,
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Code2,
  Terminal,
  Monitor,
  Smartphone,
  Cpu,
  Server,
  Settings,
  Database,
  Unplug,
  Box,
  GitBranch,
  Palette,
  Type,
  Activity,
  Layers,
  Users,
  Target,
  PenTool,
  Clapperboard,
  Bot,
  Zap,
  Sparkles,
  Binary
} from 'lucide-react';
import { cn } from './lib/utils';
import { SplineScene } from './components/ui/splite';

// --- Types ---
interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

// --- Constants ---
const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'RN STUDIO PORTFOLIO',
    category: 'Creative Technology',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    description: 'High-quality personal brand iteration. Design aesthetic: dark/premium/editorial with rich 3D interactions.'
  },
  {
    id: '02',
    title: 'PROMPT INFRASTRUCTURE',
    category: 'AI Engineering',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    description: 'Reusable prompt infrastructure for web development assistants: MASTER_UIUX_SKILL and PORTFOLIO_PLUGIN.'
  },
  {
    id: '03',
    title: 'NOVA CORE',
    category: 'Full-Stack / FinTech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    description: 'Complex application built on Google Antigravity featuring full PayPal payment integration.'
  },
  {
    id: '04',
    title: 'AVIATOR COMPANION',
    category: 'React / Simulation',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    description: 'Strategy simulation and bankroll management app with history tracking in single-file React.'
  },
  {
    id: '05',
    title: 'STITCH 3D WORKFLOW',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    description: 'Advanced design architecture using Stitch for 3D portfolio asset generation.'
  },
  {
    id: '06',
    title: 'PREDICTION DASHBOARD',
    category: 'Next.js / AI',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    description: 'AI prediction dashboard explores deploying Next.js infrastructures to Vercel via GitHub Codespaces.'
  }
];

const SKILL_CATEGORIES = [
  {
    title: "Frontend & Mobile",
    skills: [
      { 
        name: "React", 
        icon: Cpu, 
        color: "from-cyan-400 to-blue-500", 
        desc: "Building scalable UIs",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "React Native (Expo)", 
        icon: Smartphone, 
        color: "from-blue-500 to-indigo-600", 
        desc: "Cross-platform mobile apps",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "TypeScript", 
        icon: Binary, 
        color: "from-blue-400 to-blue-600", 
        desc: "Type-safe development",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Backend",
    skills: [
      { 
        name: "Python", 
        icon: Code2, 
        color: "from-yellow-400 to-blue-500", 
        desc: "Data processing & logic",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "FastAPI", 
        icon: Zap, 
        color: "from-emerald-400 to-teal-600", 
        desc: "High-performance APIs",
        image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "PostgreSQL", 
        icon: Database, 
        color: "from-blue-600 to-indigo-800", 
        desc: "Relational data modeling",
        image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2000&auto=format&fit=crop"
      },
      { 
        name: "REST APIs", 
        icon: Unplug, 
        color: "from-orange-400 to-red-500", 
        desc: "System communication",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      },
      { 
        name: "Docker", 
        icon: Box, 
        color: "from-sky-400 to-blue-600", 
        desc: "Containerization",
        image: "https://images.unsplash.com/photo-1605745341112-85968b193ef5?q=80&w=2071&auto=format&fit=crop"
      },
      { 
        name: "CI/CD pipelines", 
        icon: GitBranch, 
        color: "from-orange-500 to-red-600", 
        desc: "Automated deployment",
        image: "https://images.unsplash.com/photo-1518433278988-d9b7b9083d1c?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Design Systems",
    skills: [
      { 
        name: "Color palettes", 
        icon: Palette, 
        color: "from-pink-400 to-rose-500", 
        desc: "Visual harmony",
        image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "Typography scales", 
        icon: Type, 
        color: "from-slate-400 to-gray-600", 
        desc: "Hierarchical clarity",
        image: "https://images.unsplash.com/photo-1517210122415-b0c70b2a09bf?q=80&w=2000&auto=format&fit=crop"
      },
      { 
        name: "Motion tokens", 
        icon: Activity, 
        color: "from-purple-400 to-fuchsia-600", 
        desc: "Interactive feedback",
        image: "https://images.unsplash.com/photo-1534131707746-25d604851a1f?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "Reusable templates", 
        icon: Layers, 
        color: "from-amber-400 to-orange-500", 
        desc: "Design consistency",
        image: "https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "Creative Integration",
    skills: [
      { 
        name: "UI/UX design", 
        icon: Target, 
        color: "from-violet-400 to-purple-600", 
        desc: "User-centric experiences",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "Branding", 
        icon: Users, 
        color: "from-blue-400 to-indigo-500", 
        desc: "Visual storytelling",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "Logo creation", 
        icon: PenTool, 
        color: "from-emerald-400 to-green-600", 
        desc: "Identity design",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
      },
      { 
        name: "Animation scripting", 
        icon: Clapperboard, 
        color: "from-red-400 to-pink-600", 
        desc: "Dynamic motion",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2200&auto=format&fit=crop"
      }
    ]
  },
  {
    title: "AI-Powered Workflow",
    skills: [
      { 
        name: "Google Antigravity IDE", 
        icon: Bot, 
        color: "from-blue-500 to-cyan-400", 
        desc: "Advanced IDE agents",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "Blackbox.ai", 
        icon: Zap, 
        color: "from-gray-800 to-black", 
        desc: "Code generation",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1965&auto=format&fit=crop"
      },
      { 
        name: "Lovable", 
        icon: Sparkles, 
        color: "from-pink-400 to-purple-500", 
        desc: "Rapid prototyping",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2070&auto=format&fit=crop"
      },
      { 
        name: "Bolt.ai", 
        icon: Binary, 
        color: "from-cyan-500 to-blue-600", 
        desc: "AI automation",
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1964&auto=format&fit=crop"
      }
    ]
  }
];

// --- Components ---

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-paper p-8 md:p-12 rounded-[2rem] max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-ink/5 transition-colors"
            >
              <X size={24} className="text-ink" />
            </button>
            
            <h2 className="text-4xl font-serif font-bold italic text-ink-dark mb-8">Privacy Policy</h2>
            
            <div className="space-y-6 font-sans text-ink/70 leading-relaxed">
              <section className="space-y-3">
                <h3 className="text-lg font-bold text-ink-dark">1. Information We Collect</h3>
                <p>We only collect information that you voluntarily provide to us via our contact form, such as your name, email address, and any message you send. This information is used solely to respond to your inquiries.</p>
              </section>
              
              <section className="space-y-3">
                <h3 className="text-lg font-bold text-ink-dark">2. How We Use Information</h3>
                <p>Your information is used to communicate with you about your inquiry or project. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
              </section>
              
              <section className="space-y-3">
                <h3 className="text-lg font-bold text-ink-dark">3. Data Security</h3>
                <p>We implement security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.</p>
              </section>
              
              <section className="space-y-3">
                <h3 className="text-lg font-bold text-ink-dark">4. Cookies</h3>
                <p>This site may use minor functional cookies for session management and performance tracking. You can choose to disable cookies through your browser settings.</p>
              </section>
              
              <footer className="pt-6 border-t border-ink/10 text-xs italic">
                Last Updated: May 2026
              </footer>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoother spring config for fluid movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], .cursor-crosshair');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? (isHovering ? 2 : 1) : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="w-10 h-10 bg-white rounded-full" />
    </motion.div>
  );
};

const SmoothLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 bg-paper z-[100] flex flex-col items-center justify-center p-12 overflow-hidden"
    >
      <div className="w-full max-w-sm">
        <div className="flex justify-between items-end mb-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-display tracking-tighter text-ink-dark"
          >
            RN STUDIO
          </motion.div>
          <div className="font-space text-[11px] tracking-widest opacity-60 uppercase">
            Initializing Studio {progress}%
          </div>
        </div>
        <div className="h-[1px] w-full bg-ink/10 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -right-24 w-64 h-64 border border-ink/5 rounded-full pointer-events-none"
      />
    </motion.div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-150, 150], [10, -10]);
  const rotateY = useTransform(springX, [-150, 150], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8,
        scale: { type: "spring", stiffness: 300, damping: 20 },
        y: { type: "spring", stiffness: 300, damping: 20 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000 rounded-[2rem] p-6 -m-6 hover:shadow-2xl hover:shadow-ink/5 transition-shadow duration-500 hover:bg-white/40"
    >
      <motion.div 
        style={{ rotateX, rotateY }}
        className="relative aspect-[4/5] overflow-hidden bg-ink/5 cursor-crosshair preserve-3d"
      >
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale transition-all duration-1000 opacity-80 group-hover:opacity-100 group-hover:grayscale-0"
        />
        <div className="absolute top-8 left-8" style={{ transform: 'translateZ(50px)' }}>
          <span className="font-serif italic text-5xl text-ink/10 select-none">{project.id}</span>
        </div>
        {index === 0 && (
          <div className="absolute -bottom-4 -left-4 liquid-glass animate-liquid-wobble p-4 shadow-xl z-20 flex flex-col gap-1" style={{ transform: 'translateZ(80px)' }}>
            <span className="text-[8px] uppercase tracking-widest text-ink/50 font-space font-bold">Category</span>
            <span className="text-sm font-serif italic text-ink-dark leading-tight">Editorial &<br/>Digital Identity</span>
          </div>
        )}
        <div className="absolute bottom-12 right-12 mix-blend-difference overflow-hidden" style={{ transform: 'translateZ(30px)' }}>
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-2"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] font-space font-bold">View Case</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowUpRight size={14} className="text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <div className="mt-10 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="max-w-xs text-balance">
          <motion.h3 
            whileHover={{ x: 5 }}
            className="text-3xl font-serif font-semibold italic text-ink-dark mb-3 group-hover:text-accent transition-all cursor-pointer"
          >
            {project.title}
          </motion.h3>
          <p className="text-sm text-ink/80 leading-relaxed font-sans">{project.description}</p>
        </div>
        <div className="h-[1px] w-full md:w-12 bg-ink/20 md:mt-4 grow md:grow-0" />
        <span className="text-[11px] uppercase tracking-widest text-accent font-space font-bold whitespace-nowrap md:mt-3 px-4 py-1 border border-accent/20 rounded-full">{project.category}</span>
      </div>
    </motion.div>
  );
};

interface SkillCardProps {
  skill: {
    name: string;
    icon: React.ElementType;
    color: string;
    desc: string;
    image: string;
  };
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);
  
  // High-intensity parallax for the background image
  const imgX = useTransform(springX, [-100, 100], [40, -40]);
  const imgY = useTransform(springY, [-100, 100], [40, -40]);
  
  // Spotlight effect background
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      400px circle at ${springMouseX}px ${springMouseY}px,
      rgba(255, 255, 255, 0.12),
      transparent 80%
    )
  `;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    
    x.set(offsetX);
    y.set(offsetY);
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const SkillIcon = skill.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.2)' }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden bg-white/[0.03] border border-white/[0.05] p-6 rounded-3xl transition-all duration-500 min-h-[220px] flex flex-col cursor-pointer"
    >
      {/* Reactive Wallpaper with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{ x: imgX, y: imgY, scale: 1.5 }}
      >
        <img 
          src={skill.image} 
          alt="" 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      {/* Mouse Following Spotlight */}
      <motion.div
        className="absolute inset-0 z-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightBackground }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${skill.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
          <div className="w-full h-full bg-[#050505] rounded-[14px] flex items-center justify-center">
            <SkillIcon size={20} className="text-white group-hover:text-accent transition-colors" />
          </div>
        </div>
        <h4 className="text-lg font-space font-bold text-white mb-2">{skill.name}</h4>
        <p className="text-xs text-white/40 group-hover:text-white/80 font-sans leading-relaxed transition-colors">{skill.desc}</p>
        
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles size={12} className="text-accent/50 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Select...',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setFormStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: 'Select...', message: '' });
      } else {
        setFormStatus('error');
        setErrorMessage(data.error || data.message || 'Failed to send message.');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div ref={containerRef} className="relative min-h-screen font-sans selection:bg-accent selection:text-white bg-paper text-ink overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <SmoothLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none noise opacity-20 z-[1]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 bg-transparent backdrop-blur-sm border-b border-white/[0.05]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display tracking-tighter text-ink-dark"
        >
          <motion.span 
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="inline-block cursor-pointer font-bold tracking-tight"
          >
            RN STUDIO
          </motion.span>
          <span className="text-accent italic font-serif"> by Raymond Ndungu</span>
        </motion.div>

        <div className="hidden md:flex gap-12 items-center">
          {['Skills', 'Works', 'About', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 1.5 }}
              whileHover={{ y: -2, color: 'var(--color-accent)' }}
              className="text-[11px] uppercase tracking-[0.2em] font-space font-semibold transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.05, backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 border border-ink/20 rounded-full text-[11px] uppercase tracking-widest transition-all font-space font-semibold shadow-sm"
          >
            Start a project
          </motion.button>
        </div>

        <button 
          className="md:hidden p-2 relative z-50 text-ink"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 liquid-glass !bg-paper/40 z-[45] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Skills', 'Works', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl font-serif italic hover:text-accent transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className={cn(isLoading && "pointer-events-none")}>
        {/* Hero Section */}
        <section className="relative min-h-[150vh] flex flex-col justify-center bg-black/[0.96] overflow-hidden py-48 lg:py-32">
          {/* Spotlight Effect */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-40 left-0 md:left-60 md:-top-20 w-[1000px] h-[1000px] bg-white/[0.05] blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10 w-full min-h-screen lg:min-h-[120vh] grid grid-cols-1 lg:grid-cols-2 mt-20 lg:mt-0">
            {/* Left Content */}
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12 lg:py-0">
              <motion.div 
                style={{ y: heroTextY }}
                className="relative z-10"
              >
                <div className="overflow-hidden mb-6">
                  <motion.h4 
                    initial={{ y: "100%" }}
                    animate={!isLoading ? { y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
                    className="text-[11px] uppercase tracking-[0.3em] text-accent font-space font-bold drop-shadow-[0_0_8px_rgba(197,160,89,0.3)]"
                  >
                    Design. Code. Intelligence.
                  </motion.h4>
                </div>

                <div className="overflow-hidden">
                  <motion.h1 
                    initial={{ y: "100%" }}
                    animate={!isLoading ? { y: 0 } : {}}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.7 }}
                    className="text-7xl md:text-[8vw] lg:text-[10vw] font-serif font-bold italic leading-[0.82] tracking-tighter text-white whitespace-pre-line mb-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    Crafting {"\n"}
                    <span className="text-accent underline decoration-1 underline-offset-[12px] md:underline-offset-[20px]">Digital</span> Future
                  </motion.h1>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="mt-12 flex flex-col gap-10"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <p className="max-w-sm text-sm text-white/90 leading-relaxed font-space lg:text-base border-l border-white/30 pl-6 shadow-sm">
                      Web developer & creative technologist based in Ongata Rongai, Kenya. Bridging the gap between design and high-level AI-assisted engineering.
                    </p>
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-[1px] bg-white/20" />
                      <motion.span 
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-[11px] uppercase tracking-widest text-white/60 font-space font-bold"
                      >
                        Scroll to explore
                      </motion.span>
                    </div>
                  </div>

                  <div className="flex flex-row flex-wrap gap-6">
                    <motion.a
                      href="#works"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-accent text-white font-space font-bold uppercase tracking-[0.2em] text-xs rounded-full flex items-center gap-3 transition-shadow hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] whitespace-nowrap"
                    >
                      Start a project
                      <ArrowUpRight size={16} />
                    </motion.a>
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/10 text-white border border-white/20 font-space font-bold uppercase tracking-[0.2em] text-xs rounded-full backdrop-blur-md hover:bg-white/20 transition-all whitespace-nowrap"
                    >
                      Get in touch
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content (Spline 3D Scene) */}
            <motion.div 
              className="relative h-full hidden lg:block overflow-visible min-h-[800px]"
              initial={{ opacity: 0, x: 50 }}
              animate={!isLoading ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1, duration: 1.5 }}
            >
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full scale-[1.3] lg:scale-[1.5] origin-center"
              />
            </motion.div>
          </div>

          {/* Background Elements - Removed in favor of Spline */}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute bottom-10 right-0 font-display text-[20vw] leading-none pointer-events-none select-none italic text-white"
            style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 200]) }}
          >
            RN STUDIO
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '80px 80px' 
            }} 
          />
          
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4 block font-space font-bold">Capabilities & Tech Stack</span>
              <h2 className="text-5xl md:text-8xl font-serif font-extralight italic text-white leading-none tracking-tighter uppercase">Expertise / Skills</h2>
            </motion.div>
          </div>

          <div className="space-y-32 relative z-10">
            {SKILL_CATEGORIES.map((category, catIndex) => (
              <div key={category.title} className="space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6"
                >
                  <div className="w-12 h-[1px] bg-accent" />
                  <h3 className="text-2xl font-serif italic text-white/90">{category.title}</h3>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard key={skill.name} skill={skill} index={skillIndex} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Works Section */}
        <section id="works" className="py-32 px-6 md:px-12 lg:px-24">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-ink/60 mb-4 block font-space font-bold">Curated Portfolio</span>
              <h2 className="text-5xl md:text-8xl font-serif font-extralight italic text-ink-dark leading-none tracking-tighter uppercase">Selected / Work</h2>
            </motion.div>
            <div className="hidden lg:block text-right pb-4">
              <p className="text-[11px] uppercase tracking-widest text-ink/50 max-w-[200px] leading-relaxed font-space font-medium">
                Design. Code. Intelligence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-white text-black min-h-screen flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
          >
            <h2 className="text-4xl font-sans font-medium tracking-tight">About Me</h2>
          </motion.div>

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Column: Image Area */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Background "Brushstroke" Shape */}
                <div className="absolute inset-0 bg-[#E5E5E5] scale-110 -rotate-3" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 70%' }} />
                <div className="absolute inset-0 bg-[#F0F0F0] rotate-6 scale-105" style={{ borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%' }} />
                
                {/* Profile Image Wrapper */}
                <div className="relative h-full w-full overflow-hidden rounded-2xl transition-all duration-700">
                  <img 
                    src="/src/assets/images/profile_raymond_strict_v2_1779117394151.png" 
                    alt="Raymond Ndungu" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Socials & Email */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-black/60 font-sans text-sm font-medium">
                <div className="flex gap-4">
                  <motion.a href="https://github.com/raymondndungu8-blip" target="_blank" whileHover={{ scale: 1.1, color: '#000' }}><Github size={20} /></motion.a>
                  <motion.a href="https://linkedin.com/in/raymond-ndungu" target="_blank" whileHover={{ scale: 1.1, color: '#0077b5' }}><Linkedin size={20} /></motion.a>
                  <motion.a href="mailto:raymondndungu8@gmail.com" whileHover={{ scale: 1.1, color: '#C5A059' }}><Mail size={20} /></motion.a>
                </div>
                <div className="h-4 w-[1px] bg-black/10 hidden sm:block" />
                <a href="mailto:raymondndungu8@gmail.com" className="hover:text-black transition-colors">raymondndungu8@gmail.com</a>
              </div>
            </motion.div>

            {/* Right Column: Bio & Skills */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h3 className="text-5xl md:text-6xl font-serif italic font-bold tracking-tight">Hi, I'm Raymond Ndungu</h3>
                <p className="text-xl text-black/80 font-sans font-medium">Web Developer & Creative Technologist based in Ongata Rongai, Kenya.</p>
              </div>

              <div className="space-y-8 font-sans">
                <p className="text-black/60 leading-relaxed max-w-lg">
                  Creative engineer specializing in high-performance digital products. Bridging the gap between design and high-level AI-assisted engineering.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-3">
                    <h5 className="font-bold uppercase tracking-widest text-[10px] text-accent">Languages:</h5>
                    <p className="text-black/70">• JavaScript • TypeScript • Python</p>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-bold uppercase tracking-widest text-[10px] text-accent">Tech:</h5>
                    <p className="text-black/70">• React.js • Next.js • Node.js • Express.js • Nest.js</p>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-bold uppercase tracking-widest text-[10px] text-accent">Databases:</h5>
                    <p className="text-black/70">• SQL • MongoDB • PostgreSQL</p>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-bold uppercase tracking-widest text-[10px] text-accent">DevOps:</h5>
                    <p className="text-black/70">• Git • AWS • Azure • Docker • Github Actions</p>
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-2 pt-10 border-t border-black/5">
                <div className="space-y-1">
                  <span className="text-4xl font-sans font-bold">+200</span>
                  <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Project Completed</p>
                </div>
                <div className="space-y-1">
                  <span className="text-4xl font-sans font-bold">+50</span>
                  <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Start up Raised</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-white/5">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none"
          />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px' 
            }} 
          />

          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
            
            {/* Left Column: Info & Logo */}
            <div className="lg:col-span-1 space-y-16">
              <div className="space-y-8">
                <h3 className="text-4xl font-sans font-bold tracking-tight">Contact Us</h3>
                <div className="flex gap-6 text-white/80">
                  <motion.a href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, color: '#C5A059' }}><Twitter size={20} /></motion.a>
                  <motion.a href="https://linkedin.com/in/raymond-ndungu" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, color: '#C5A059' }}><Linkedin size={20} /></motion.a>
                  <motion.a href="https://github.com/raymondndungu8-blip" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, color: '#C5A059' }}><Github size={20} /></motion.a>
                  <motion.a href="mailto:raymondndungu8@gmail.com" whileHover={{ scale: 1.1, color: '#C5A059' }}><Mail size={20} /></motion.a>
                </div>
              </div>

              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <div className="space-y-1 text-white/50 font-sans text-sm md:text-base">
                    <p className="text-white/80 font-bold">WhatsApp</p>
                    <p>+254 745 091 919</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div className="space-y-1 text-white/50 font-sans text-sm md:text-base leading-relaxed">
                    <p className="text-white/80 font-bold">Location</p>
                    <p>Ongata Rongai, Kajiado County,<br />Kenya</p>
                  </div>
                </div>
              </div>

              {/* RN STUDIO stylized logo box */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="group relative h-48 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 flex items-center justify-center shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <motion.div 
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 blur-[60px] rounded-full"
                />
                <h2 className="relative z-10 text-5xl font-serif font-black tracking-tighter text-white opacity-90 italic">
                  RN STUDIO
                </h2>
              </motion.div>
            </div>

            {/* Middle Column: Quick Links */}
            <div className="lg:col-span-1 space-y-10 pt-2 md:pt-0">
              <h3 className="text-3xl font-sans font-bold tracking-tight">Quick Links</h3>
              <ul className="space-y-6 text-white/40 font-sans font-medium">
                {['Home', 'Gallery', 'About', 'Terms & Conditions', 'Policies'].map((link) => (
                  <motion.li key={link} whileHover={{ x: 5, color: '#FFFFFF' }}>
                    <a href="#" className="transition-colors block py-1">{link}</a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4 text-balance">
                <h2 className="text-6xl md:text-7xl font-sans font-bold leading-[0.9] tracking-tighter">
                  Send Us<br />A Message
                </h2>
                <p className="text-white/40 font-sans font-medium">
                  Kindly fill this form. Average response is within 24hrs
                </p>
              </div>

              <form className="space-y-8" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group">
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Smith" 
                      className="w-full bg-transparent border-b border-white/10 py-4 font-sans text-lg focus:outline-none focus:border-accent transition-all placeholder:text-white/10 focus:placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@framer.com" 
                      className="w-full bg-transparent border-b border-white/10 py-4 font-sans text-lg focus:outline-none focus:border-accent transition-all placeholder:text-white/10 focus:placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/10 py-5 font-sans text-lg focus:outline-none appearance-none text-white/30 cursor-pointer"
                  >
                    <option className="bg-zinc-950">Select...</option>
                    <option className="bg-zinc-950">Business Inquiry</option>
                    <option className="bg-zinc-950">Partnership</option>
                    <option className="bg-zinc-950">Support</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/20" size={20} />
                </div>

                <div className="space-y-2 group">
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..." 
                    rows={1}
                    className="w-full bg-transparent border-b border-white/10 py-5 font-sans text-lg focus:outline-none focus:border-accent transition-all placeholder:text-white/10 focus:placeholder:text-white/40 resize-none overflow-hidden text-balance"
                  />
                </div>

                {formStatus === 'error' && (
                  <p className="text-red-500 text-sm font-sans">{errorMessage}</p>
                )}

                {formStatus === 'success' && (
                  <p className="text-green-500 text-sm font-sans">Message sent successfully!</p>
                )}

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === 'submitting'}
                  className="w-full py-6 rounded-full bg-white text-black font-sans font-bold text-xl shadow-xl hover:bg-zinc-100 transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Submit'}
                </motion.button>
              </form>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 font-sans text-[11px] uppercase tracking-[0.2em] font-bold">
            <div>&copy; 2025 RN STUDIO BY RAYMOND NDUNGU</div>
            <div className="flex gap-10">
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              Back to Top <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </div>
  );
}

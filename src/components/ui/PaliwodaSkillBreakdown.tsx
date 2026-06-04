import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Terminal, 
  Server, 
  Layers, 
  ChevronDown, 
  Sparkles, 
  Bot, 
  Cpu, 
  Play, 
  Zap, 
  CreditCard, 
  Monitor, 
  GitBranch, 
  Code2,
  Lock,
  Compass
} from 'lucide-react';

interface SubSkill {
  name: string;
  rating: number; // out of 10
  desc: string;
  icon: React.ElementType;
}

interface SkillCategory {
  id: string;
  title: string;
  rating: number; // out of 10
  icon: React.ElementType;
  color: string;
  glowColor: string;
  subSkills: SubSkill[];
}

const SKILL_DATA: SkillCategory[] = [
  {
    id: 'ui-ux',
    title: '1. UI/UX & Front-End Design',
    rating: 9,
    icon: Palette,
    color: '#C5A059',
    glowColor: 'shadow-amber-500/20',
    subSkills: [
      {
        name: 'Dark Luxury Editorial',
        rating: 10,
        desc: 'Mastery of premium visual layouts, specializing in deep charcoal palettes, gold accents, and elegant serif typography like Playfair & Cormorant Garamond.',
        icon: Compass
      },
      {
        name: 'Interactive Experiences',
        rating: 9,
        desc: 'Designing and developing high-fidelity user environments with fluid, GPU-safe custom scroll dynamics, spring physics curves, and modern micro-animations.',
        icon: Monitor
      },
      {
        name: 'Modern Frameworks',
        rating: 9,
        desc: 'Crafting responsive client architectures utilizing React 18/19, Next.js 14/15, Vite compilation structures, and advanced Tailwind CSS styling.',
        icon: Cpu
      }
    ]
  },
  {
    id: 'vibe-coding',
    title: '2. "Vibe Coding" & AI-Assisted Dev',
    rating: 10,
    icon: Terminal,
    color: '#06B6D4',
    glowColor: 'shadow-cyan-500/20',
    subSkills: [
      {
        name: 'Prompt Engineering & Prompt Infra',
        rating: 10,
        desc: 'Advanced architectural prompt layouts and reusable skill blueprints (.md rulesets) to output production-ready, structured source code in real-time.',
        icon: Code2
      },
      {
        name: 'AI Agent Workflows & Prototyping',
        rating: 10,
        desc: 'Seamless co-development loops commanding local and remote LLM stacks (Claude Code, Google Antigravity, Cursor, Windsurf) for extreme-speed feature deployment.',
        icon: Bot
      },
      {
        name: 'AI Integration & Workspaces',
        rating: 9,
        desc: 'Connecting automated code review, automated testing cycles, and continuous model generation pipes directly inside the native execution workspace.',
        icon: Sparkles
      }
    ]
  },
  {
    id: 'full-stack',
    title: '3. Full-Stack & Integration Skills',
    rating: 9,
    icon: Server,
    color: '#10B981',
    glowColor: 'shadow-emerald-500/0',
    subSkills: [
      {
        name: 'Backend Security & Proxy APIs',
        rating: 9,
        desc: 'Building isolated server infrastructure with secure client proxy endpoints, preventing key leaks and containing heavy backend logic securely inside Node/Express.',
        icon: Lock
      },
      {
        name: 'Payment Gateway Integration',
        rating: 9,
        desc: 'Assembling resilient fintech pipelines connecting international Stripe systems (with Atlas startup structures), PayPal Sandbox APIs, and African M-Pesa rails.',
        icon: CreditCard
      },
      {
        name: 'Game Logic & Simulations',
        rating: 8,
        desc: 'Formulating high-efficiency custom state machines, mathematical probability multipliers, and historic roll visualizers for custom simulator components.',
        icon: Zap
      }
    ]
  },
  {
    id: 'devops-cms',
    title: '4. DevOps, Deployment, & CMS',
    rating: 9,
    icon: Layers,
    color: '#8B5CF6',
    glowColor: 'shadow-purple-500/20',
    subSkills: [
      {
        name: 'Cloud Deployment',
        rating: 8,
        desc: 'Configuring clean automated pipelines to Vercel/Cloud Run via Git workflows, while managing resilient container networks and environment credentials.',
        icon: GitBranch
      },
      {
        name: 'Premium WordPress Customization',
        rating: 9,
        desc: 'Modifying rigid layouts into luxury boutique editorial environments with elegant custom CSS injections, as executed for African Hat Safaris.',
        icon: Layers
      }
    ]
  }
];

export const PaliwodaSkillBreakdown: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>('ui-ux');
  const [isAiMode, setIsAiMode] = useState<boolean>(false);
  const [optimizerProgress, setOptimizerProgress] = useState<number>(0);
  const [optimizationStatus, setOptimizationStatus] = useState<string>('System Idle');

  // AI optimizer loop simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAiMode) {
      setOptimizerProgress(0);
      setOptimizationStatus('Scanning local codebase...');
      
      const phrases = [
        'Ingesting prompt blueprints...',
        'Running structural linter...',
        'Optimizing GPU rendering paths...',
        'Compiling state vectors...',
        'Self-healing dependency tree...',
        'AI Automation: System optimized'
      ];
      
      let step = 0;
      interval = setInterval(() => {
        setOptimizerProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setOptimizationStatus('AI Automation: Active and Optimized.');
            return 100;
          }
          const next = prev + 1.25;
          
          const index = Math.min(Math.floor(next / 17), phrases.length - 1);
          setOptimizationStatus(phrases[index]);
          return next;
        });
      }, 50);
    } else {
      setOptimizerProgress(0);
      setOptimizationStatus('System Idle');
    }
    return () => clearInterval(interval);
  }, [isAiMode]);

  return (
    <div id="paliwoda-breakdown-widget" className="w-full bg-zinc-950/40 border border-white/5 rounded-3xl p-5 sm:p-7 backdrop-blur-3xl shadow-2xl relative overflow-hidden transition-all duration-500">
      {/* Decorative top lighting */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
      {isAiMode && (
        <motion.div 
          className="absolute -inset-0.5 bg-gradient-to-r from-[#C5A059]/5 via-cyan-500/5 to-purple-500/5 blur-xl pointer-events-none"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      {/* Controller Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-6 mb-6 border-b border-white/5 relative z-10">
        <div>
          <span className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">Dave Paliwoda Design Concept</span>
          <h4 className="text-lg font-space font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
            Skill Breakdown
            {isAiMode && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            )}
          </h4>
        </div>

        {/* AI Activation toggle */}
        <button 
          onClick={() => setIsAiMode(!isAiMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-wider font-bold uppercase transition-all duration-300 pointer-events-auto cursor-pointer ${
            isAiMode 
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
              : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
          }`}
        >
          <Bot size={11} className={isAiMode ? 'animate-bounce text-cyan-400' : 'text-white/40'} />
          <span>{isAiMode ? 'AI Optimizer: On' : 'Run AI Optimizer'}</span>
        </button>
      </div>

      {/* AI Automation Scanner Overlay effect */}
      {isAiMode && optimizerProgress < 100 && (
        <div className="mb-4 bg-zinc-900/60 border border-cyan-500/10 rounded-xl p-3 font-mono text-[9px] text-cyan-400 uppercase tracking-wider relative overflow-hidden flex flex-col gap-1.5 animate-pulse-subtle">
          <div className="flex justify-between font-bold">
            <span>{optimizationStatus}</span>
            <span>{Math.round(optimizerProgress)}%</span>
          </div>
          <div className="w-full bg-black/50 h-1 rounded-full overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-[#C5A059] to-cyan-400 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${optimizerProgress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* Table List of categories */}
      <div className="space-y-4 relative z-10">
        {SKILL_DATA.map((category) => {
          const isActive = activeId === category.id;
          const CategoryIcon = category.icon;
          
          // Enhanced rating under AI influence
          const originalRating = category.rating;
          const displayRating = isAiMode && optimizerProgress >= 100 
            ? Math.min(originalRating + 1, 10) 
            : originalRating;

          return (
            <div 
              key={category.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isActive 
                  ? 'bg-white/[0.02] border-white/10 p-4 sm:p-5' 
                  : 'bg-transparent border-transparent p-2.5 sm:p-3 hover:bg-white/[0.01]'
              }`}
            >
              {/* Category Main Row */}
              <div 
                onClick={() => setActiveId(isActive ? null : category.id)}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer group select-none"
              >
                {/* Left Side: Label & Icon */}
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2.5 rounded-xl border transition-all duration-300"
                    style={{ 
                      borderColor: isActive ? `${category.color}40` : 'rgba(255, 255, 255, 0.05)',
                      backgroundColor: isActive ? `${category.color}10` : 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    <CategoryIcon 
                      size={15} 
                      className="transition-colors duration-300"
                      style={{ color: isActive ? category.color : 'rgba(255, 255, 255, 0.4)' }} 
                    />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-sm text-white/90 group-hover:text-white transition-colors duration-200">
                      {category.title}
                    </h5>
                    <span className="text-[9px] font-mono text-white/30 tracking-wider">
                      {category.subSkills.length} Sub-competencies
                    </span>
                  </div>
                </div>

                {/* Right Side: Dave Paliwoda Segmented Rating Blocks */}
                <div className="flex items-center gap-4 self-start md:self-auto font-mono text-[10px]">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const isFilled = i < displayRating;
                      
                      // Alternate glowing style if AI mode is fully active
                      let blockBg = 'bg-neutral-800/80 border-transparent';
                      let shadowStyle = '';
                      
                      if (isFilled) {
                        if (isAiMode && optimizerProgress >= 100) {
                          blockBg = 'bg-gradient-to-t from-cyan-500 to-emerald-400';
                          shadowStyle = 'shadow-[0_0_8px_rgba(6,182,212,0.5)]';
                        } else {
                          blockBg = 'bg-white';
                          if (category.id === 'ui-ux') blockBg = 'bg-[#C5A059]';
                          else if (category.id === 'vibe-coding') blockBg = 'bg-cyan-400';
                          else if (category.id === 'full-stack') blockBg = 'bg-emerald-400';
                          else if (category.id === 'devops-cms') blockBg = 'bg-purple-500';
                          
                          shadowStyle = isActive ? `shadow-[0_0_8px_rgba(255,255,255,0.15)]` : '';
                        }
                      }

                      return (
                        <motion.div
                          key={i}
                          initial={{ scaleY: 0.8 }}
                          animate={{ 
                            scaleY: isActive ? 1.05 : 0.85,
                            opacity: isFilled ? 1 : 0.25 
                          }}
                          transition={{ 
                            duration: 0.3, 
                            delay: isActive ? i * 0.03 : 0 
                          }}
                          className={`w-1.5 sm:w-2 h-4 sm:h-5 rounded-[2px] border ${blockBg} ${shadowStyle}`}
                          title={`Rating ${displayRating}/10`}
                        />
                      );
                    })}
                  </div>

                  <span 
                    className="w-10 text-right font-bold text-xs"
                    style={{ color: isActive ? category.color : 'rgba(255, 255, 255, 0.4)' }}
                  >
                    {displayRating * 10}%
                  </span>

                  <ChevronDown 
                    size={13} 
                    className={`text-white/30 group-hover:text-white/60 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} 
                  />
                </div>
              </div>

              {/* Sub-Skills Accordion Dropdown */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-white/5 space-y-4">
                      {category.subSkills.map((sub, index) => {
                        const SubIcon = sub.icon;
                        const subRating = isAiMode && optimizerProgress >= 100 
                          ? Math.min(sub.rating + 1, 10) 
                          : sub.rating;

                        return (
                          <motion.div 
                            key={sub.name}
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-black/40 border border-white/[0.02] rounded-xl p-3 text-xs flex flex-col gap-2 hover:border-white/5 transition-all duration-300"
                          >
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                              <div className="flex items-center gap-2 font-medium text-white/95">
                                <SubIcon size={12} className="text-[#C5A059]" />
                                <span>{sub.name}</span>
                              </div>

                              {/* Mini Segmented Bar */}
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 10 }).map((_, si) => {
                                  const isSubFilled = si < subRating;
                                  let subColorClass = 'bg-neutral-800/80';
                                  
                                  if (isSubFilled) {
                                    if (isAiMode && optimizerProgress >= 100) {
                                      subColorClass = 'bg-cyan-500';
                                    } else {
                                      subColorClass = category.id === 'ui-ux' ? 'bg-[#C5A059]' : 'bg-neutral-300';
                                    }
                                  }

                                  return (
                                    <div 
                                      key={si} 
                                      className={`w-1 h-2.5 rounded-[1px] ${subColorClass}`} 
                                    />
                                  );
                                })}
                                <span className="ml-1.5 text-[9px] font-mono text-white/40">{subRating * 10}%</span>
                              </div>
                            </div>

                            <p className="text-white/50 text-[11px] leading-relaxed font-sans">{sub.desc}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Embedded footer info card minimizing space while explaining capability range */}
      <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-white/30 font-mono">
        <span className="flex items-center gap-1">
          <Sparkles size={10} className="text-[#C5A059]" /> Full-Stack Capability Index
        </span>
        <span className="text-right">
          Total: 11 Vector Dimensions
        </span>
      </div>
    </div>
  );
};

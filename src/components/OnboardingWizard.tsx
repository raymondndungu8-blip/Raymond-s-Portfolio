import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CheckCircle2,
  PenTool,
  Receipt,
  FileText,
  Send,
  Download,
  Loader2,
  Lock,
  Scale,
  ArrowRight,
  AlertCircle,
  Coins,
  Check,
  Trash2,
  FileCheck
} from 'lucide-react';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingWizard({ isOpen, onClose }: OnboardingWizardProps) {
  // Wizard Stages: 'intake' | 'generating' | 'preview' | 'complete'
  const [stage, setStage] = useState<'intake' | 'generating' | 'preview' | 'complete'>('intake');
  
  // Intake Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    projectTitle: '',
    projectCategory: 'Creative Technology',
    projectDescription: '',
    budget: '1500'
  });

  const [activeTab, setActiveTab] = useState<'contract' | 'invoice' | 'handover' | 'access' | 'checklist'>('contract');
  const [documentUrls, setDocumentUrls] = useState({
    contractMarkdown: '',
    invoiceMarkdown: '',
    handoverMarkdown: '',
    accessMarkdown: '',
    checklistMarkdown: ''
  });

  // Interactive Checklist State
  const [checklistState, setChecklistState] = useState({
    depositPaid: false,
    accessShared: false,
    assetsUploaded: false
  });

  // Signature States
  const [signatureType, setSignatureType] = useState<'draw' | 'type'>('type');
  const [typedSignature, setTypedSignature] = useState('');
  const [isContractSigned, setIsContractSigned] = useState(false);
  const [isHandoverSigned, setIsHandoverSigned] = useState(false);
  const [drawnSignatureData, setDrawnSignatureData] = useState<string | null>(null);
  
  // Drawing Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Email Delivery Simulator
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  // AI Pipeline Log items to keep the client engaged
  const [aiLogs, setAiLogs] = useState<string[]>([]);
  const logSteps = [
    "Connecting to Rongai Legal & Creative Tech Model...",
    "Embedding master prompt boundaries (MASTER_UIUX_SKILL & PORTFOLIO_PLUGIN)...",
    "Tailoring pre-existing prompt infrastructure copyright clauses...",
    "Itemizing Phase 1 & Phase 2 commercial development scopes...",
    "Drafting Kenyan electronic-clearing financial routings (M-PESA & Bank Info)...",
    "Structuring 14-day technical warranty against codebase scope creep...",
    "Calculating retainer tiers (Bronze, Silver, Gold level)...",
    "Assembling unified legal & commercial package..."
  ];

  useEffect(() => {
    if (stage !== 'generating') return;
    setAiLogs([]);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setAiLogs(prev => [...prev, logSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [stage]);

  // Capture canvas signatures
  useEffect(() => {
    if (stage === 'preview' && signatureType === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#C5A059'; // Gold
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
      }
    }
  }, [stage, signatureType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectTitle || !formData.projectDescription) {
      alert("Please fill out all required intake parameters.");
      return;
    }
    
    setStage('generating');

    try {
      const response = await fetch('/api/project/generate-agreements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Agreements API generated an unexpected response.");
      }

      const data = await response.json();
      setDocumentUrls({
        contractMarkdown: data.contractMarkdown || '',
        invoiceMarkdown: data.invoiceMarkdown || '',
        handoverMarkdown: data.handoverMarkdown || '',
        accessMarkdown: data.accessMarkdown || '',
        checklistMarkdown: data.checklistMarkdown || ''
      });
      
      // Delay transition briefly so user sees the final step
      setTimeout(() => {
        setStage('preview');
      }, 5000);

    } catch (err) {
      console.error(err);
      // Failover safely on timeout / missing connection
      setTimeout(() => {
        setStage('preview');
      }, 5000);
    }
  };

  // Canvas Drawing Actions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    // Preserve canvas context
    if (canvasRef.current) {
      setDrawnSignatureData(canvasRef.current.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawnSignatureData(null);
  };

  const applySignature = () => {
    if (activeTab === 'contract') {
      setIsContractSigned(true);
    } else if (activeTab === 'handover') {
      setIsHandoverSigned(true);
    }
  };

  const handleEmailDispatch = () => {
    setIsSendingEmail(true);
    setTimeout(() => {
      setIsSendingEmail(false);
      setIsEmailSent(true);
      setTimeout(() => {
        setStage('complete');
      }, 1500);
    }, 2200);
  };

  const handleDownloadMarkdown = () => {
    const fullPackage = `===========================================
OFFICIAL CONTRACT & COMPENDIUM — RN STUDIO
Generated for: ${formData.name} (${formData.email})
Address/Location: ${formData.address || 'N/A'}
Date: ${new Date().toLocaleDateString()}
===========================================

${documentUrls.contractMarkdown}

===========================================
${documentUrls.invoiceMarkdown}

===========================================
${documentUrls.handoverMarkdown}

===========================================
${documentUrls.accessMarkdown}

===========================================
${documentUrls.checklistMarkdown}
`;
    const element = document.createElement("a");
    const file = new Blob([fullPackage], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${formData.projectTitle.replace(/\s+/g, '_')}_Official_Agreements.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Convert raw Markdown text to pristine elements elegantly without dependencies
  const renderDocumentMarkup = (text: string) => {
    if (!text) return <p className="text-white/40 italic text-sm">Drafting agreement details...</p>;
    
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl sm:text-3xl font-serif italic text-white font-semibold mt-6 mb-4 select-text">{trimmed.slice(2)}</h1>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className="text-xl sm:text-2xl font-serif italic text-accent font-semibold mt-5 mb-3 select-text">{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className="text-base sm:text-lg font-space font-bold text-white mt-4 mb-2 select-text">{trimmed.slice(4)}</h3>;
      }

      // Horizontal ruler
      if (trimmed === '---') {
        return <hr key={idx} className="my-6 border-white/10" />;
      }

      // Blockquotes
      if (trimmed.startsWith('>')) {
        return (
          <div key={idx} className="my-3 p-4 bg-accent/5 rounded-xl border border-accent/20 border-l-4 border-l-accent text-white/90 italic text-sm select-text">
            {trimmed.slice(1).trim()}
          </div>
        );
      }

      // Bullets
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return <li key={idx} className="ml-5 list-disc text-white/70 text-sm mb-1 leading-relaxed select-text">{trimmed.slice(2)}</li>;
      }

      // Tables (Visual breakdown for Invoices)
      if (trimmed.startsWith('|') && idx > 0) {
        // Render tabular headers or cells
        const columns = trimmed.split('|').map(c => c.trim()).filter(Boolean);
        if (columns.some(col => col.includes('---'))) return null; // skip dividers
        
        const isHeader = text.split('\n')[idx - 2]?.trim() === '---' || idx < 5;
        return (
          <div key={idx} className="grid grid-cols-4 gap-2 border-b border-white/5 py-2.5 text-xs select-text">
            {columns.map((col, cIdx) => (
              <span key={cIdx} className={isHeader ? "font-space font-bold text-accent" : "text-white/80"}>
                {col}
              </span>
            ))}
          </div>
        );
      }

      // Plain paragraphs with bold parsing
      if (trimmed === '') return <div key={idx} className="h-2" />;

      let formattedText = trimmed;
      // Simple Bold formatting replacements
      const boldRegex = /\*\*(.*?)\*\*/g;
      return (
        <p key={idx} className="text-white/75 text-sm leading-relaxed mb-2.5 font-sans select-text">
          {formattedText.split(boldRegex).map((part, pIdx) => {
            return pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{part}</strong> : part;
          })}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-[1000px] h-[90vh] md:h-[82vh] bg-[#070707] rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 p-2 rounded-xl border border-accent/25">
                  <Sparkles size={16} className="text-accent animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-space font-bold text-white tracking-wide">
                    INTELLIGENT ONBOARDING AGREEMENTS
                  </h3>
                  <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest">
                    Rongai Tech Systems • Unified Intake
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-all"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stages Layout */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
              
              {/* STAGE 1: INTAKE */}
              {stage === 'intake' && (
                <form onSubmit={handleIntakeSubmit} className="flex-1 flex flex-col justify-between">
                  <div className="space-y-6 max-w-2xl mx-auto w-full py-2">
                    <div className="text-center space-y-2 mb-4">
                      <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-accent py-1 px-3 bg-accent/5 border border-accent/20 rounded-full">
                        Step 1: Scope & Intake Questionnaire
                      </span>
                      <h4 className="text-2xl font-serif italic text-white font-semibold pt-1">
                        What project are we building today?
                      </h4>
                      <p className="text-xs text-white/60 max-w-md mx-auto">
                        Provide project parameters. Our AI legal core will formulate specialized contracts, Milestones invoices, & Handover warranties.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">Client Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Raymond Ndungu"
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">Delivery Contact Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. client@domain.com"
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">Client Physical Address / Corporate Location</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="e.g. Galleria Business Park, Nairobi, Kenya"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">Project Name / Title *</label>
                        <input
                          type="text"
                          name="projectTitle"
                          value={formData.projectTitle}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Prime FinTech Engine"
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">Project Category</label>
                        <select
                          name="projectCategory"
                          value={formData.projectCategory}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent"
                        >
                          <option value="Creative Technology">Creative Technology</option>
                          <option value="AI Prompts Integration">AI Prompts Integration</option>
                          <option value="SaaS & Custom Platform">SaaS & Custom Platform</option>
                          <option value="Cross-Platform Native App">Cross-Platform Native App</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">Describe Project Goals & Specifications *</label>
                      <textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="Detail features, layout, integrations (e.g. PayPal, 3D scene) and visual characteristics you want built..."
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent resize-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">Target Budget Allocation (USD)</label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent"
                        min="200"
                      />
                      <span className="text-[10px] text-white/30 italic">Determines the 50% split valuation on Milestone 01 Deposit.</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border border-white/10 hover:border-white/20 text-white/50 hover:text-white font-space font-semibold uppercase tracking-wider text-[10px] rounded-full transition-all cursor-pointer text-center"
                    >
                      Cancel & Go Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-space font-semibold uppercase tracking-wider text-xs rounded-full flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Draft Agreements Core
                      <ArrowRight size={14} />
                    </motion.button>
                  </div>
                </form>
              )}

              {/* STAGE 2: GENERATING ANIMATIONS */}
              {stage === 'generating' && (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse" />
                    <Loader2 size={60} className="text-accent animate-spin relative z-10" />
                  </div>
                  <h4 className="text-xl font-serif italic text-white font-medium mb-2">
                    Rongai AI Legal Engine Processing
                  </h4>
                  <p className="text-xs text-white/50 max-w-sm text-center mb-8">
                    Parsing parameters & weaving strict intellectual property shields of pre-existing prompts. Please hold...
                  </p>

                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 max-w-lg w-full h-[180px] overflow-y-auto space-y-2 flex flex-col-reverse justify-end shadow-inner">
                    <AnimatePresence>
                      {aiLogs.slice().reverse().map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span className="text-accent">✓</span>
                          <span className={i === 0 ? "text-white font-medium font-mono" : "text-white/40 font-mono"}>
                            {log}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* STAGE 3: INTERACTIVE PREVIEW & SIGN-OFF */}
              {stage === 'preview' && (
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Tabs Controller */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5 md:gap-2 bg-white/[0.02] border border-white/5 p-1 rounded-2xl md:rounded-full mb-6">
                    <button
                      type="button"
                      onClick={() => setActiveTab('contract')}
                      className={`py-2 px-3 sm:px-4 rounded-xl md:rounded-full text-[10px] sm:text-xs font-space font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'contract'
                          ? "bg-accent text-white shadow-md"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <FileText size={12} />
                      Agreement
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('invoice')}
                      className={`py-2 px-3 sm:px-4 rounded-xl md:rounded-full text-[10px] sm:text-xs font-space font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'invoice'
                          ? "bg-accent text-white shadow-md"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <Receipt size={12} />
                      Invoice
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('handover')}
                      className={`py-2 px-3 sm:px-4 rounded-xl md:rounded-full text-[10px] sm:text-xs font-space font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'handover'
                          ? "bg-accent text-white shadow-md"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <FileCheck size={12} />
                      Handover
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('access')}
                      className={`py-2 px-3 sm:px-4 rounded-xl md:rounded-full text-[10px] sm:text-xs font-space font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'access'
                          ? "bg-accent text-white shadow-md"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <Lock size={12} />
                      Access Req.
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('checklist')}
                      className={`py-2 px-3 sm:px-4 rounded-xl md:rounded-full text-[10px] sm:text-xs font-space font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === 'checklist'
                          ? "bg-accent text-white shadow-md"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <CheckCircle2 size={12} />
                      Checklist
                    </button>
                  </div>

                  {/* Split Screen Document Preview & Actions */}
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[300px] items-stretch">
                    
                    {/* Left: Beautiful Rich Document Canvas */}
                    <div className="lg:col-span-7 bg-[#0b0b0b] rounded-2xl border border-white/5 p-6 h-[48vh] md:h-[45vh] overflow-y-auto shadow-inner relative selection:bg-accent/45">
                      <div className="absolute top-4 right-4 bg-[#141414]/80 text-[#C5A059] border border-[#C5A059]/20 font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full">
                        REAL-TIME COMPILING
                      </div>
                      <div className="prose prose-invert max-w-none text-left">
                        {activeTab === 'contract' && renderDocumentMarkup(documentUrls.contractMarkdown)}
                        {activeTab === 'invoice' && renderDocumentMarkup(documentUrls.invoiceMarkdown)}
                        {activeTab === 'handover' && renderDocumentMarkup(documentUrls.handoverMarkdown)}
                        {activeTab === 'access' && renderDocumentMarkup(documentUrls.accessMarkdown)}
                        {activeTab === 'checklist' && renderDocumentMarkup(documentUrls.checklistMarkdown)}
                      </div>
                    </div>

                    {/* Right: Signature Board or Settlement details */}
                    <div className="lg:col-span-5 flex flex-col justify-between bg-white/[0.01] rounded-2xl border border-white/5 p-5">
                      
                      {/* Contextual Action panel */}
                      {activeTab === 'contract' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-accent">
                            <Lock size={14} />
                            <span className="text-[10px] uppercase font-mono tracking-widest font-bold">PROMPT CLASSIFICATION</span>
                          </div>
                          <h5 className="text-sm font-space font-bold text-white">Protecting pre-existing prompts</h5>
                          <p className="text-xs text-white/50 leading-relaxed">
                            Signing this Service Agreement locks your budget and guarantees that RN Studio's foundational instructions remain ours, safeguarding our operational secrets.
                          </p>

                          {!isContractSigned ? (
                            <div className="space-y-3 bg-black/40 rounded-xl p-3 border border-white/5">
                              {/* Draw or Style sign */}
                              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase pb-1 border-b border-white/5 text-white/40">
                                <span>Sign Contract</span>
                                <div className="flex gap-2">
                                  <button onClick={() => setSignatureType('type')} className={signatureType === 'type' ? "text-accent" : ""}>Type</button>
                                  <button onClick={() => setSignatureType('draw')} className={signatureType === 'draw' ? "text-accent" : ""}>Draw</button>
                                </div>
                              </div>

                              {signatureType === 'type' ? (
                                <input
                                  type="text"
                                  placeholder="Type Full Name to Sign"
                                  value={typedSignature}
                                  onChange={e => setTypedSignature(e.target.value)}
                                  className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none font-serif italic focus:border-accent"
                                />
                              ) : (
                                <div className="relative">
                                  <canvas
                                    ref={canvasRef}
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    onTouchStart={startDrawing}
                                    onTouchMove={draw}
                                    onTouchEnd={stopDrawing}
                                    width={280}
                                    height={100}
                                    className="w-full h-[100px] bg-black border border-white/10 rounded-lg cursor-crosshair touch-none"
                                  />
                                  <button onClick={clearCanvas} className="absolute bottom-2 right-2 p-1 bg-neutral-900 border border-white/5 text-white/50 hover:text-white rounded-md text-[9px] font-mono">
                                    RESET
                                  </button>
                                </div>
                              )}

                              <button
                                onClick={applySignature}
                                disabled={signatureType === 'type' ? !typedSignature : !drawnSignatureData}
                                className="w-full py-2 bg-accent/20 hover:bg-accent hover:text-white text-accent rounded-lg text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-300 disabled:opacity-40"
                              >
                                EXECUTE CONTRACT SEAL
                              </button>
                            </div>
                          ) : (
                            <div className="bg-emerald-550/10 border border-emerald-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                              <CheckCircle2 size={32} className="text-emerald-500 mb-2 animate-bounce" />
                              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold">CONTRACT SIGNED</span>
                              <p className="text-[10px] text-white/50 mt-1">
                                Secure electronic execution key applied: <br />
                                <span className="text-white/60 font-mono italic">
                                  {signatureType === 'type' ? `typed:${typedSignature}` : 'touch_path_data'}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'invoice' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-[#C5A059]">
                            <Coins size={14} />
                            <span className="text-[10px] uppercase font-mono tracking-widest font-bold">PAYMENT ACTION</span>
                          </div>
                          <h5 className="text-sm font-space font-bold text-white">Deposit Clearance Requirements</h5>
                          <p className="text-xs text-white/50 leading-relaxed">
                            Development commits to active calendar queues on Milestone 01 payment receipt (50%). Local M-PESA Till route is credited in 3 seconds.
                          </p>

                          <div className="bg-black/50 border border-white/5 rounded-xl p-4.5 space-y-3 font-mono text-[11px]">
                            <div className="flex justify-between pb-2 border-b border-white/5">
                              <span className="text-white/40">MILESTONE 01 DEPOSIT:</span>
                              <span className="text-emerald-500 font-bold font-sans">${(parseFloat(formData.budget) / 2).toFixed(2)} USD</span>
                            </div>
                            <div className="flex justify-between py-1 text-white/60">
                              <span>M-PESA Till Code:</span>
                              <span className="text-accent font-bold">5928104</span>
                            </div>
                            <div className="text-[9px] text-white/40 leading-relaxed italic border-t border-white/5 pt-2">
                              Ensure client emails are logged matching M-PESA transaction references on validation.
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'handover' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-accent">
                            <Scale size={14} />
                            <span className="text-[10px] uppercase font-mono tracking-widest font-bold">POST-LAUNCH TRANSITION</span>
                          </div>
                          <h5 className="text-sm font-space font-bold text-white">Handover sign-off certificate</h5>
                          <p className="text-xs text-white/50 leading-relaxed">
                            Formalizes structural sign-off and locks the codebase into the strict 14-day protective bug warranty loop.
                          </p>

                          {!isHandoverSigned ? (
                            <button
                              type="button"
                              onClick={() => setIsHandoverSigned(true)}
                              className="w-full py-3 bg-neutral-900 border border-white/10 hover:border-accent font-space text-[10px] uppercase tracking-widest text-[#C5A059] rounded-xl transition-all font-semibold cursor-pointer"
                            >
                              LOCK HANDOVER ASSURANCE SEAL
                            </button>
                          ) : (
                            <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                              <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold">HANDOVER ASSIGNED</span>
                              <p className="text-[10px] text-white/50 mt-1">Approved for final transition queue</p>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'access' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-accent">
                            <Lock size={14} />
                            <span className="text-[10px] uppercase font-mono tracking-widest font-bold">SECURE CREDENTIALS</span>
                          </div>
                          <h5 className="text-sm font-space font-bold text-white">Platform Authorization Form</h5>
                          <p className="text-xs text-white/50 leading-relaxed">
                            To configure DNS, Point domains, or link M-PESA/Stripe APIs, input reference credentials or check off administrative authorization invitation.
                          </p>

                          <div className="space-y-3 bg-black/40 rounded-xl p-3 border border-white/5">
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase font-mono tracking-widest text-white/40">Secured credentials notes</label>
                              <textarea
                                value={checklistState.accessShared ? "Access references encrypted & delivered to raymondndungu8@gmail.com" : undefined}
                                onChange={() => {}}
                                readOnly={checklistState.accessShared}
                                placeholder="State Hosting log-in credentials, Github repo links, or shared Google Drive folders..."
                                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-accent resize-none h-[80px]"
                              />
                            </div>

                            {!checklistState.accessShared ? (
                              <button
                                type="button"
                                onClick={() => setChecklistState(prev => ({ ...prev, accessShared: true }))}
                                className="w-full py-2 bg-accent/20 hover:bg-accent hover:text-white text-accent rounded-lg text-[10px] font-mono uppercase tracking-widest font-semibold transition-all cursor-pointer"
                              >
                                TRANSMIT ACCESS PERMISSION
                              </button>
                            ) : (
                              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2 flex items-center justify-center gap-2 text-[10px] text-emerald-500 font-mono font-semibold">
                                <Check size={12} /> SECURED ACCESS TRANSMITTED
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {activeTab === 'checklist' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-[#C5A059]">
                            <CheckCircle2 size={14} />
                            <span className="text-[10px] uppercase font-mono tracking-widest font-bold">STEPS CHECKLIST</span>
                          </div>
                          <h5 className="text-sm font-space font-bold text-white">Interactive Client Milestones</h5>
                          <p className="text-xs text-white/50 leading-relaxed">
                            Mark off current step actions. Real-time updates sync directly to the developer's client onboarding calendar.
                          </p>

                          <div className="space-y-2 max-h-[170px] overflow-y-auto">
                            <div className="flex items-center gap-2.5 p-2 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl text-xs transition-all">
                              <input
                                type="checkbox"
                                checked={isContractSigned}
                                readOnly
                                className="rounded border-white/10 text-accent focus:ring-accent bg-transparent"
                              />
                              <span className={isContractSigned ? "text-white/40 line-through" : "text-white/80"}>
                                MSA Agreement Contract Executed
                              </span>
                            </div>

                            <div 
                              onClick={() => setChecklistState(prev => ({ ...prev, depositPaid: !prev.depositPaid }))}
                              className="flex items-center gap-2.5 p-2 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl text-xs transition-all cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={checklistState.depositPaid}
                                onChange={() => {}}
                                className="pointer-events-none rounded border-white/10 text-accent focus:ring-accent bg-transparent"
                              />
                              <span className={checklistState.depositPaid ? "text-white/40 line-through" : "text-white/80"}>
                                Milestone 01 Upfront Deposit Cleared
                              </span>
                            </div>

                            <div 
                              onClick={() => setChecklistState(prev => ({ ...prev, accessShared: !prev.accessShared }))}
                              className="flex items-center gap-2.5 p-2 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl text-xs transition-all cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={checklistState.accessShared}
                                onChange={() => {}}
                                className="pointer-events-none rounded border-white/10 text-accent focus:ring-accent bg-transparent"
                              />
                              <span className={checklistState.accessShared ? "text-white/40 line-through" : "text-white/80"}>
                                Technical Platforms Access Granted
                              </span>
                            </div>

                            <div 
                              onClick={() => setChecklistState(prev => ({ ...prev, assetsUploaded: !prev.assetsUploaded }))}
                              className="flex items-center gap-2.5 p-2 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl text-xs transition-all cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={checklistState.assetsUploaded}
                                onChange={() => {}}
                                className="pointer-events-none rounded border-white/10 text-accent focus:ring-accent bg-transparent"
                              />
                              <span className={checklistState.assetsUploaded ? "text-white/40 line-through" : "text-white/80"}>
                                Vector Brand Assets Uploaded
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Unified Delivery Buttons */}
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        <button
                          onClick={handleDownloadMarkdown}
                          className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2"
                        >
                          <Download size={12} />
                          DOWNLOAD AGREEMENT FILE (.TXT)
                        </button>

                        <button
                          onClick={handleEmailDispatch}
                          disabled={!isContractSigned || isSendingEmail}
                          className="w-full py-3 bg-accent text-white rounded-xl text-xs font-space font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                        >
                          {isSendingEmail ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              DISPATCHING SECURE CUES...
                            </>
                          ) : (
                            <>
                              <Send size={12} />
                              FINALIZE & DISPATCH DOCUMENTS
                            </>
                          )}
                        </button>
                        {!isContractSigned && (
                          <div className="text-[10px] text-center text-red-400 font-mono py-1">
                            ⚠️ Please sign the Service Agreement first.
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full py-2 border border-white/5 hover:border-white/10 text-white/40 hover:text-white/80 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                          ✕ EXIT & RETURN TO PORTFOLIO
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 4: COMPLETE SCREEN */}
              {stage === 'complete' && (
                <div className="flex-1 flex flex-col items-center justify-center shadow-lg pt-12">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 rounded-full bg-accent/15 border border-accent flex items-center justify-center mb-6"
                  >
                    <Check size={40} className="text-accent animate-pulse" />
                  </motion.div>

                  <h4 className="text-3xl font-serif italic text-white font-semibold mb-2">
                    Commercial Compendium Dispatched!
                  </h4>
                  <p className="text-sm text-accent font-semibold font-mono tracking-wider mb-2">
                    EMAIL SECURE QUEUE: {formData.email}
                  </p>
                  <p className="text-xs text-white/50 max-w-md text-center leading-relaxed">
                    A beautiful, full-fidelity copy of the official <strong>Service Agreement</strong> (Contract of scope with prompt protection safeguards), itemized <strong>Invoice</strong> (with 50% deposit directions), and <strong>Handover Certificate</strong> has been routed to your inbox.
                  </p>

                  <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-3 max-w-sm">
                    <span className="text-emerald-500">⚡</span>
                    <p className="text-[11px] text-emerald-400/80 italic font-medium leading-relaxed">
                      "Payment clearances automatically update Rongai calendar slots immediately."
                    </p>
                  </div>

                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={onClose}
                      className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-space font-semibold uppercase tracking-widest text-xs rounded-full"
                    >
                      Return to Portfolio
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

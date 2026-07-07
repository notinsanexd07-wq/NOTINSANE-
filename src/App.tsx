import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Image as ImageIcon, 
  PenTool, 
  Sparkles, 
  Play, 
  ShoppingBag, 
  Instagram, 
  X, 
  ArrowDown, 
  ExternalLink,
  ChevronRight,
  MessageCircle,
  Settings as SettingsIcon,
  ShieldAlert,
  Mail,
  MessageSquare
} from 'lucide-react';
import { DEFAULT_CONFIG } from './defaultConfig';
import { SiteConfig } from './types';
import AdminPortal from './components/AdminPortal';
import LazyImage from './components/LazyImage';
import { AmbientBackground } from './components/AmbientBackground';

function hexToRgb(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('notinsane_portfolio_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme && parsed.hero) {
          parsed.contact = { ...DEFAULT_CONFIG.contact, ...parsed.contact };
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read saved config from storage.', e);
    }
    return DEFAULT_CONFIG;
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [copiedProductIndex, setCopiedProductIndex] = useState<number | null>(null);
  const [visitorCount, setVisitorCount] = useState(() => Math.floor(Math.random() * 12) + 24);

  // Live visitor simulation fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => {
        const change = Math.random() > 0.6 ? 1 : Math.random() > 0.5 ? -1 : 0;
        const next = prev + change;
        return next > 45 ? next - 1 : next < 18 ? next + 1 : next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Sync state to local storage and update document title/metadata
  useEffect(() => {
    localStorage.setItem('notinsane_portfolio_config', JSON.stringify(config));
    
    // Update Title & Favicon
    if (config.settings.siteTitle) {
      document.title = config.settings.siteTitle;
    }
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', config.settings.seoDesc);

    // Update Favicon dynamically using custom base64 or configured url if set
    if (config.settings.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.head.appendChild(link);
      }
      link.href = config.settings.faviconUrl;
    }
  }, [config]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(config.contact.discordUsername || 'not_insane_xd');
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
  };

  const handleResetConfig = () => {
    if (window.confirm('Are you sure you want to revert all settings to factory defaults? Your custom images and texts will be reset.')) {
      setConfig(DEFAULT_CONFIG);
      localStorage.setItem('notinsane_portfolio_config', JSON.stringify(DEFAULT_CONFIG));
    }
  };

  // Sections configuration mapping for the core portfolio categories
  const portfolioCategories = [
    {
      id: 'thumbnail',
      title: 'THUMBNAIL DESIGN',
      icon: ImageIcon,
      gallery: config.thumbnails
    },
    {
      id: 'logo',
      title: 'LOGO DESIGN',
      icon: PenTool,
      gallery: config.logos
    }
  ];

  const showGallery = !!activeModal;

  // Stagger animation configurations for premium transition flow
  const homeContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.25,
        ease: "easeIn"
      }
    }
  };

  const homeItemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 18
      }
    }
  };

  const sectionContainerVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 18,
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const nestedItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 18
      }
    }
  };

  const galleryContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.25,
        ease: "easeIn"
      }
    }
  };

  const galleryItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 16
      }
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden font-sans transition-colors duration-500">
      
      {/* Dynamic Style Injection for Tailwind Variables overriding */}
      <style>{`
        :root {
          --color-purple-600: ${config.theme.primaryColor};
          --color-purple-500: ${config.theme.primaryColor};
          --color-purple-400: ${config.theme.primaryColor};
          --color-indigo-600: ${config.theme.secondaryColor};
          --color-indigo-500: ${config.theme.secondaryColor};
          --color-indigo-400: ${config.theme.secondaryColor};
          --font-sans: "${config.theme.fontFamily}", ui-sans-serif, system-ui, sans-serif;
          --font-display: "${config.theme.fontFamily}", ui-sans-serif, system-ui, sans-serif;
        }
        body {
          background-color: ${config.theme.bgGradientStart};
          background-image: linear-gradient(to bottom, ${config.theme.bgGradientStart}, ${config.theme.bgGradientEnd});
        }
      `}</style>

      {/* Ambient background with interactive animations (particles, scanner lines, grid, orbs, stars) */}
      <AmbientBackground theme={config.theme} />

      {/* Main Linktree Body Content Container */}
      <main className="relative z-10 w-full max-w-2xl mx-auto px-4 py-16 flex flex-col gap-16 min-h-screen">
        <AnimatePresence mode="wait">
          {!showGallery ? (
            <motion.div
              key="home"
              variants={homeContainerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-16 w-full"
            >
              {/* ==================== 1. HERO LANDING SECTION ==================== */}
              <motion.section variants={homeItemVariants} className="flex flex-col items-center text-center pt-8">
                {/* Profile Picture Frame (Squircle with gradient glow wrapper) */}
                <motion.div 
                  className="relative cursor-pointer mb-6"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] overflow-hidden bg-[#121216] border border-white/10 flex items-center justify-center">
                    <img 
                      src={config.hero.avatarUrl} 
                      alt={`${config.hero.title} Profile Avatar`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>

                {/* Title & Watermark Stack */}
                <div className="relative w-full flex flex-col items-center justify-center my-4 py-6 select-none overflow-hidden">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.02, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute text-5xl md:text-[5.5rem] font-black text-white/[0.02] tracking-[0.25em] uppercase pointer-events-none whitespace-nowrap font-display"
                  >
                    {config.hero.subtitle}
                  </motion.span>
                  <motion.h1 
                    initial={{ filter: "blur(4px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative text-3xl md:text-4xl font-black text-white tracking-[0.2em] uppercase font-display drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                    style={{ textShadow: `0 0 20px ${config.theme.glowColor}22` }}
                  >
                    {config.hero.title}
                  </motion.h1>
                </div>

                {/* Status Badge */}
                {config.hero.statusText && (
                  <motion.div 
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.01] border text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold shadow-lg shadow-black/40 backdrop-blur-md mb-6 cursor-default"
                    style={{ borderColor: `${config.theme.primaryColor}30`, color: `${config.theme.primaryColor}ee` }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: config.theme.primaryColor }} />
                      <span className="relative inline-flex rounded-full h-2 w-2 shadow-[0_0_8px_var(--color-purple-500)]" style={{ backgroundColor: config.theme.primaryColor }} />
                    </span>
                    <span>{config.hero.statusText}</span>
                  </motion.div>
                )}

                {/* Live Visitor Counter Badge */}
                <motion.div 
                  variants={nestedItemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.04] backdrop-blur-md shadow-lg shadow-black/20 text-[10px] md:text-xs tracking-[0.12em] font-medium text-gray-400 mb-10 select-none cursor-default"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </span>
                  <span className="flex items-center gap-1.5 font-bold uppercase">
                    LIVE: <span className="text-emerald-400 animate-pulse font-black text-xs">{visitorCount}</span> creatives exploring now
                  </span>
                </motion.div>

                {/* Scroll Hint */}
                {config.hero.showScrollHint && (
                  <div 
                    onClick={() => {
                      document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer text-gray-500 hover:text-purple-400 transition-colors duration-300 group"
                  >
                    <span className="text-[9px] tracking-[0.4em] font-bold uppercase group-hover:tracking-[0.45em] transition-all duration-300">SCROLL</span>
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </div>
                )}
              </motion.section>

              {/* ==================== 2. PORTFOLIO NAVIGATION SECTION ==================== */}
              <motion.section variants={sectionContainerVariants} id="portfolio-section" className="scroll-mt-12 flex flex-col">
                <h2 className="text-center text-[10px] md:text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-8">
                  PORTFOLIO
                </h2>

                <div className="flex flex-col gap-5">
                  {portfolioCategories.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.button 
                        key={item.id}
                        variants={nestedItemVariants}
                        onClick={() => setActiveModal(item.id)}
                        whileHover={{ 
                          y: -6, 
                          scale: 1.015, 
                          backgroundColor: "rgba(24, 24, 34, 0.8)",
                          borderColor: `${config.theme.primaryColor}40`,
                          boxShadow: "0 15px 30px -10px rgba(168,85,247,0.18)"
                        }}
                        whileTap={{ scale: 0.985, y: -2 }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        className="w-full text-left bg-[#121216]/60 border border-white/[0.04] rounded-3xl p-6 flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-2xl bg-white/[0.02] border flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                            style={{ borderColor: `${config.theme.primaryColor}25` }}
                          >
                            <IconComponent className="h-5 w-5" style={{ color: config.theme.primaryColor }} />
                          </div>
                          <span className="text-white font-extrabold tracking-wider text-sm md:text-base uppercase group-hover:text-purple-200 transition-colors font-display">
                            {item.title}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1.5 transition-all duration-300" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.section>

              {/* ==================== 3. "WHAT I DO" / ABOUT CAPABILITIES SECTION ==================== */}
              <motion.section variants={sectionContainerVariants} className="flex flex-col">
                <h2 className="text-center text-[10px] md:text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-8">
                  WHAT I DO
                </h2>

                <div className="bg-[#121216]/60 border border-white/[0.04] rounded-[2rem] p-6 md:p-8 flex flex-col gap-5 backdrop-blur-md shadow-lg shadow-black/20">
                  {config.about.text && (
                    <motion.p 
                      variants={nestedItemVariants}
                      className="text-xs text-gray-400 leading-relaxed tracking-wide font-medium pb-2 border-b border-white/[0.03]"
                    >
                      {config.about.text}
                    </motion.p>
                  )}

                  <div className="grid grid-cols-1 gap-3.5">
                    {config.about.skills.map((skill, index) => (
                      <motion.div 
                        key={index}
                        variants={nestedItemVariants}
                        whileHover={{ 
                          x: 6, 
                          backgroundColor: "rgba(255,255,255,0.02)",
                          borderColor: `${config.theme.primaryColor}30` 
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="flex items-center gap-4 py-4 px-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] transition-all duration-300 group"
                      >
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: config.theme.primaryColor }} />
                          <span className="relative inline-flex rounded-full h-3 w-3 shadow-[0_0_10px_var(--color-purple-500)]" style={{ backgroundColor: config.theme.primaryColor }} />
                        </span>
                        <span className="text-white font-extrabold tracking-wider text-sm md:text-base uppercase group-hover:text-purple-200 transition-colors">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* ==================== SERVICES & PRICING SECTION ==================== */}
              {config.contact.webstoreProducts && config.contact.webstoreProducts.length > 0 && (
                <motion.section variants={sectionContainerVariants} className="flex flex-col">
                  <h2 className="text-center text-[10px] md:text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-8">
                    SERVICES & PRICING
                  </h2>

                  <div className="flex flex-col gap-6">
                    {config.contact.webstoreProducts.map((product, idx) => (
                      <motion.div
                        key={idx}
                        variants={nestedItemVariants}
                        whileHover={{ 
                          y: -6, 
                          backgroundColor: "rgba(24, 24, 34, 0.7)",
                          borderColor: `${config.theme.primaryColor}30`,
                          boxShadow: `0 15px 35px -10px ${config.theme.primaryColor}20`
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        className="bg-[#121216]/60 border border-white/[0.04] rounded-[2rem] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-md shadow-lg shadow-black/20"
                      >
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: config.theme.primaryColor }} />
                            <h3 className="text-white font-extrabold tracking-wider text-base md:text-lg uppercase font-display">
                              {product.title}
                            </h3>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed font-medium">
                            {product.desc}
                          </p>
                        </div>

                        <div className="flex flex-col sm:items-end justify-center gap-4 border-t sm:border-t-0 sm:border-l border-white/[0.06] pt-4 sm:pt-0 sm:pl-6 min-w-[170px]">
                          <div className="flex flex-col sm:items-end">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500">STARTING AT</span>
                            <span className="text-2xl md:text-3xl font-black font-display tracking-tight text-white" style={{ textShadow: `0 0 20px ${config.theme.primaryColor}30` }}>
                              {product.price}
                            </span>
                          </div>

                          <div className="w-full">
                            <motion.a
                              href="https://discord.gg/ZwKSXUC3"
                              target="_blank"
                              rel="noopener noreferrer"
                              animate={{
                                scale: [1, 1.025, 1],
                                boxShadow: [
                                  `0 0 0 0px rgba(${hexToRgb(config.theme.primaryColor)}, 0)`,
                                  `0 0 0 6px rgba(${hexToRgb(config.theme.primaryColor)}, 0.15)`,
                                  `0 0 0 0px rgba(${hexToRgb(config.theme.primaryColor)}, 0)`
                                ]
                              }}
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: `${config.theme.primaryColor}15`,
                                boxShadow: `0 8px 20px -5px ${config.theme.primaryColor}30`,
                              }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ 
                                scale: {
                                  repeat: Infinity,
                                  duration: 2.2,
                                  ease: "easeInOut"
                                },
                                boxShadow: {
                                  repeat: Infinity,
                                  duration: 2.2,
                                  ease: "easeInOut"
                                },
                                type: "spring",
                                stiffness: 400,
                                damping: 15
                              }}
                              className="w-full py-2.5 px-5 font-black text-xs tracking-widest uppercase rounded-full text-center flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 border"
                              style={{ 
                                borderColor: config.theme.primaryColor,
                                color: config.theme.primaryColor,
                                backgroundColor: 'transparent'
                              }}
                            >
                              <span>ORDER</span>
                              <ExternalLink className="w-3.5 h-3.5" style={{ color: config.theme.primaryColor }} />
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* ==================== 4. "GET IN TOUCH" CONTACT FOOTER ==================== */}
              <motion.section variants={sectionContainerVariants} className="flex flex-col gap-8 pb-12">
                <h2 className="text-center text-[10px] md:text-xs tracking-[0.4em] text-gray-500 uppercase font-bold">
                  GET IN TOUCH
                </h2>

                 {/* High-Contrast Discord CTA Pill */}
                <div className="relative group">
                  <motion.button 
                    onClick={handleCopyDiscord}
                    variants={nestedItemVariants}
                    whileHover={{ 
                      y: -4, 
                      backgroundColor: "#4752C4",
                      boxShadow: "0 15px 30px rgba(88, 101, 242, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full flex items-center justify-between bg-[#5865F2] text-white font-black py-5 px-8 rounded-full cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor" className="text-white">
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2a75.58,75.58,0,0,0,72.76,0c.82.71,1.68,1.4,2.58,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.24,48.24,121.62,25.41,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
                      </svg>
                      <span className="tracking-[0.12em] text-xs md:text-sm uppercase font-display truncate">
                        {config.contact.discordUsername || 'not_insane_xd'}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/95 bg-white/10 px-3 py-1.5 rounded-full">
                      {copiedDiscord ? 'COPIED!' : 'COPY USERNAME'}
                    </span>
                  </motion.button>
                </div>

                {/* Social Link Stack */}
                <div className="flex flex-col gap-4">
                  
                  {/* Discord Server Button */}
                  {config.contact.discordUrl && (
                    <motion.a 
                      href={config.contact.discordUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      variants={nestedItemVariants}
                      whileHover={{ 
                        y: -3, 
                        backgroundColor: "rgba(88,101,242,0.18)",
                        borderColor: "rgba(88,101,242,0.6)"
                      }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full flex items-center justify-between py-4.5 px-7 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#b5bac1] hover:text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-[#5865F2]" />
                        <span className="font-display">DISCORD SERVER</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  )}

                  {/* Instagram Button */}
                  {config.contact.instagramUrl && (
                    <motion.a 
                      href={config.contact.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      variants={nestedItemVariants}
                      whileHover={{ 
                        y: -3, 
                        backgroundColor: "rgba(225,48,108,0.18)",
                        borderColor: "rgba(225,48,108,0.6)"
                      }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="w-full flex items-center justify-between py-4.5 px-7 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/30 text-[#f48fb1] hover:text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <Instagram className="w-5 h-5 text-[#E1306C]" />
                        <span className="font-display">INSTAGRAM</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#f48fb1]" />
                    </motion.a>
                  )}

                </div>

                {/* Dynamic Footer with Hidden subtle Owner Admin Trigger Link */}
                <motion.div variants={nestedItemVariants} className="flex flex-col items-center gap-3 mt-6">
                  <p className="text-center text-[9px] text-gray-600 tracking-widest uppercase">
                    {config.settings.copyrightText}
                  </p>
                  
                  {/* Subtle owner-only admin portal link */}
                  <motion.button 
                    onClick={() => setIsAdminOpen(true)}
                    whileHover={{ scale: 1.05, color: config.theme.primaryColor }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[10px] text-gray-700 hover:text-purple-400 uppercase font-black tracking-widest transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <SettingsIcon className="w-3 h-3 text-gray-700" />
                    <span>Admin</span>
                  </motion.button>
                </motion.div>
              </motion.section>
            </motion.div>
          ) : (() => {
            const activeCategory = portfolioCategories.find(c => c.id === activeModal);
            if (!activeCategory) return null;
            const isGrid = activeCategory.id === 'logo' || activeCategory.id === 'skins';
            
            // Format to Title Case helper
            const getTitleCase = (id: string) => {
              if (id === 'thumbnail') return 'Thumbnail Design';
              if (id === 'logo') return 'Logo Design';
              return id;
            };

            return (
              <motion.div
                key="gallery-view"
                variants={galleryContainerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-8 w-full min-h-screen pb-20"
              >
                {/* ==================== TOP MINIMAL NAVIGATION BAR ==================== */}
                <motion.div variants={galleryItemVariants} className="flex items-center justify-between border-b border-white/[0.05] pb-4">
                  <div className="flex items-center gap-3">
                    <motion.button 
                      onClick={() => setActiveModal(null)}
                      whileHover={{ x: -3 }}
                      className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest cursor-pointer flex items-center gap-1.5"
                    >
                      &larr; Back
                    </motion.button>
                    <span className="text-gray-600 font-light text-xs">|</span>
                    <span className="text-xs font-bold tracking-wider uppercase" style={{ color: config.theme.primaryColor }}>
                      {getTitleCase(activeCategory.id)}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                    {activeCategory.gallery.length} {activeCategory.gallery.length === 1 ? 'item' : 'items'}
                  </span>
                </motion.div>

                {/* ==================== TYPOGRAPHIC SECTION HEADER ==================== */}
                <motion.h2 
                  variants={galleryItemVariants}
                  className="text-3xl md:text-4xl font-black text-white tracking-[0.15em] uppercase font-display"
                >
                  {activeCategory.title}
                </motion.h2>

                {/* ==================== CLEAN CONTENT LAYOUTS (NO TEXT PARAGRAPHS) ==================== */}
                {isGrid ? (
                  /* Logo Design 2-Column Grid of squares */
                  <div className="grid grid-cols-2 gap-6">
                    {activeCategory.gallery.map((g, idx) => (
                      <motion.div 
                        key={g.id || idx} 
                        variants={galleryItemVariants}
                        whileHover="hover"
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden border border-white/5 aspect-square bg-[#121216] shadow-xl cursor-pointer"
                      >
                        <LazyImage 
                          src={g.img} 
                          alt={g.title} 
                          variants={{
                            hover: { scale: 1.05, opacity: 1 }
                          }}
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        {(g.title || g.category) && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent p-4 flex flex-col justify-end">
                            {g.category && <span className="text-[9px] font-black tracking-wider uppercase mb-0.5" style={{ color: config.theme.primaryColor }}>{g.category}</span>}
                            {g.title && <h4 className="text-xs font-black tracking-wide text-white uppercase line-clamp-1">{g.title}</h4>}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Thumbnail Design Stack of Landscape containers */
                  <div className="flex flex-col gap-6">
                    {activeCategory.gallery.map((g, idx) => (
                      <motion.div 
                        key={g.id || idx} 
                        variants={galleryItemVariants}
                        whileHover="hover"
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden border border-white/5 aspect-video bg-[#121216] shadow-xl cursor-pointer"
                      >
                        <LazyImage 
                          src={g.img} 
                          alt={g.title} 
                          variants={{
                            hover: { scale: 1.03, opacity: 1 }
                          }}
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        {(g.title || g.category) && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                            {g.category && <span className="text-[10px] font-black tracking-wider uppercase mb-1" style={{ color: config.theme.primaryColor }}>{g.category}</span>}
                            {g.title && <h4 className="text-sm md:text-base font-black tracking-wide text-white uppercase">{g.title}</h4>}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeCategory.gallery.length === 0 && (
                  <motion.div 
                    variants={galleryItemVariants}
                    className="py-20 flex flex-col items-center justify-center gap-3 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
                  >
                    <ShieldAlert className="w-10 h-10 text-gray-600" />
                    <span className="text-xs uppercase font-extrabold text-gray-500 tracking-widest">No design concepts added</span>
                  </motion.div>
                )}

                {/* Subpage Footer Actions */}
                <motion.div variants={galleryItemVariants} className="pt-8 border-t border-white/[0.03] flex justify-start items-center mt-4">
                  <motion.button 
                    onClick={() => setActiveModal(null)}
                    whileHover={{ x: -3 }}
                    className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-white transition-colors cursor-pointer"
                  >
                    &larr; Back to home
                  </motion.button>
                </motion.div>

              </motion.div>
            );
          })()}
        </AnimatePresence>
      </main>

      {/* ==================== ACTIVE ADMIN DASHBOARD PANEL OVERLAY ==================== */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPortal 
            config={config} 
            onSave={handleSaveConfig} 
            onClose={() => setIsAdminOpen(false)} 
            onReset={handleResetConfig}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

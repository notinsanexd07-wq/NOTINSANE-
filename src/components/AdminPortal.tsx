import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Home, 
  Palette, 
  Image as ImageIcon, 
  Tag, 
  User, 
  Phone, 
  Settings, 
  Save, 
  Upload, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  RefreshCw, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  FolderPlus,
  Compass,
  Layout,
  Plus,
  Sparkles,
  Search,
  Eye,
  EyeOff,
  Activity,
  Check,
  FileJson,
  Zap,
  Shield,
  HelpCircle,
  Sliders,
  Code
} from 'lucide-react';
import { SiteConfig, PortfolioItem, WebstoreProduct } from '../types';

const themePresets = [
  {
    name: "Cosmic Velvet",
    primaryColor: "#a855f7",
    secondaryColor: "#6366f1",
    glowColor: "#8b5cf6",
    bgGradientStart: "#0a0a0f",
    bgGradientEnd: "#020204",
    fontFamily: "Space Grotesk",
    darkTheme: true,
  },
  {
    name: "Neon Cyberpunk",
    primaryColor: "#ff007f",
    secondaryColor: "#00f0ff",
    glowColor: "#ff007f",
    bgGradientStart: "#08010f",
    bgGradientEnd: "#020005",
    fontFamily: "JetBrains Mono",
    darkTheme: true,
  },
  {
    name: "Gold Imperial",
    primaryColor: "#fbbf24",
    secondaryColor: "#f59e0b",
    glowColor: "#d97706",
    bgGradientStart: "#0a0702",
    bgGradientEnd: "#020100",
    fontFamily: "Montserrat",
    darkTheme: true,
  },
  {
    name: "Cyber Aurora",
    primaryColor: "#22c55e",
    secondaryColor: "#a855f7",
    glowColor: "#22c55e",
    bgGradientStart: "#03020c",
    bgGradientEnd: "#010003",
    fontFamily: "Space Grotesk",
    darkTheme: true,
  },
  {
    name: "Ember Sunset",
    primaryColor: "#ef4444",
    secondaryColor: "#f59e0b",
    glowColor: "#ef4444",
    bgGradientStart: "#0e0302",
    bgGradientEnd: "#040100",
    fontFamily: "Montserrat",
    darkTheme: true,
  },
  {
    name: "Toxic Matrix",
    primaryColor: "#39ff14",
    secondaryColor: "#00ff00",
    glowColor: "#39ff14",
    bgGradientStart: "#030a03",
    bgGradientEnd: "#010301",
    fontFamily: "JetBrains Mono",
    darkTheme: true,
  },
  {
    name: "Deep Ocean Abyss",
    primaryColor: "#06b6d4",
    secondaryColor: "#3b82f6",
    glowColor: "#06b6d4",
    bgGradientStart: "#010a15",
    bgGradientEnd: "#000205",
    fontFamily: "Inter",
    darkTheme: true,
  },
  {
    name: "Sakura Twilight",
    primaryColor: "#f472b6",
    secondaryColor: "#c084fc",
    glowColor: "#db2777",
    bgGradientStart: "#0b030c",
    bgGradientEnd: "#030005",
    fontFamily: "Space Grotesk",
    darkTheme: true,
  },
  {
    name: "Crimson Eclipse",
    primaryColor: "#dc2626",
    secondaryColor: "#ea580c",
    glowColor: "#dc2626",
    bgGradientStart: "#0d0202",
    bgGradientEnd: "#030000",
    fontFamily: "Montserrat",
    darkTheme: true,
  },
  {
    name: "Emerald Obsidian",
    primaryColor: "#10b981",
    secondaryColor: "#06b6d4",
    glowColor: "#10b981",
    bgGradientStart: "#020806",
    bgGradientEnd: "#010302",
    fontFamily: "Inter",
    darkTheme: true,
  },
  {
    name: "Glacier Ice",
    primaryColor: "#38bdf8",
    secondaryColor: "#818cf8",
    glowColor: "#0ea5e9",
    bgGradientStart: "#040d1a",
    bgGradientEnd: "#010308",
    fontFamily: "Space Grotesk",
    darkTheme: true,
  },
  {
    name: "Mystic Sage",
    primaryColor: "#34d399",
    secondaryColor: "#10b981",
    glowColor: "#059669",
    bgGradientStart: "#020704",
    bgGradientEnd: "#000201",
    fontFamily: "Inter",
    darkTheme: true,
  },
  {
    name: "Dark Amethyst",
    primaryColor: "#ec4899",
    secondaryColor: "#8b5cf6",
    glowColor: "#d946ef",
    bgGradientStart: "#0b0410",
    bgGradientEnd: "#020104",
    fontFamily: "Montserrat",
    darkTheme: true,
  },
  {
    name: "Monochrome Luxury",
    primaryColor: "#ffffff",
    secondaryColor: "#6b7280",
    glowColor: "#374151",
    bgGradientStart: "#0a0a0a",
    bgGradientEnd: "#030303",
    fontFamily: "Inter",
    darkTheme: true,
  }
];

interface AdminPortalProps {
  config: SiteConfig;
  onSave: (newConfig: SiteConfig) => void;
  onClose: () => void;
  onReset: () => void;
}

// Client-side image compressor
const compressImage = (file: File, maxWidth = 800, maxHeight = 450, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(img.src);

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function AdminPortal({ config, onSave, onClose, onReset }: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appearance' | 'hero' | 'thumbnails' | 'logos' | 'about' | 'contact' | 'settings'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Local state copy of configuration to edit before committing
  const [editedConfig, setEditedConfig] = useState<SiteConfig>(JSON.parse(JSON.stringify(config)));
  
  // UI States for actions
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [uploadingSection, setUploadingSection] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  
  // References for inputs
  const backupInputRef = useRef<HTMLInputElement>(null);

  // New thumbnail form state
  const [newThumb, setNewThumb] = useState({ title: '', category: '', img: '' });
  const [newLogo, setNewLogo] = useState({ title: '', category: 'LOGO', img: '' });

  // Upgraded Premium States
  const [searchTerm, setSearchTerm] = useState('');
  const [showPinCode, setShowPinCode] = useState(false);
  const [dragActiveSection, setDragActiveSection] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Custom Notifications / Toast triggers
  const triggerToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // Auth Handler for 4-digit PIN
  const handlePinSubmit = (enteredPin: string) => {
    if (enteredPin === '0707') {
      setIsAuthenticated(true);
      triggerToast('success', 'Logged in successfully as Owner.');
    } else {
      setLoginError('Incorrect PIN code. Access Denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPin('');
    }
  };

  // Sync keyboard events when not authenticated
  React.useEffect(() => {
    if (isAuthenticated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        setPin(prev => {
          if (prev.length < 4) {
            const newVal = prev + e.key;
            if (newVal.length === 4) {
              setTimeout(() => handlePinSubmit(newVal), 200);
            }
            return newVal;
          }
          return prev;
        });
        setLoginError('');
      } else if (e.key === 'Backspace') {
        setPin(prev => prev.slice(0, -1));
        setLoginError('');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  // Safe save handler
  const saveChanges = (newConfig = editedConfig) => {
    onSave(newConfig);
    triggerToast('success', 'All changes synchronized and saved permanently!');
  };

  // Direct Image Upload helper
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetPath: string[], isNewItem = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      triggerToast('error', 'Unsupported format! Use JPG, PNG, WEBP, or AVIF.');
      return;
    }

    try {
      setUploadingSection(targetPath.join('.'));
      setUploadProgress(10);
      
      // Simulate modern progress ticks
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + 15;
        });
      }, 100);

      // Perform fast high-quality local compression
      const compressedBase64 = await compressImage(file, 1280, 720, 0.85);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setEditedConfig(prev => {
          const copy = JSON.parse(JSON.stringify(prev));
          // Traverse path and set value
          let current = copy;
          for (let i = 0; i < targetPath.length - 1; i++) {
            current = current[targetPath[i]];
          }
          current[targetPath[targetPath.length - 1]] = compressedBase64;
          return copy;
        });

        triggerToast('success', 'Image compressed and loaded successfully.');
        setUploadingSection(null);
        setUploadProgress(0);
      }, 200);

    } catch (err) {
      triggerToast('error', 'Error optimizing or uploading image.');
      setUploadingSection(null);
      setUploadProgress(0);
    }
  };

  // Database Backup Actions
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editedConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "notinsane_website_config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('success', 'Configuration exported successfully!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.theme && parsed.hero && parsed.thumbnails) {
          setEditedConfig(parsed);
          saveChanges(parsed);
          triggerToast('success', 'Configuration restored and updated live!');
        } else {
          triggerToast('error', 'Invalid configuration backup file format.');
        }
      } catch (err) {
        triggerToast('error', 'Failed to read configuration file.');
      }
    };
    reader.readAsText(file);
  };

  // Reordering helpers (Up / Down)
  const moveItem = (section: 'thumbnails' | 'logos', index: number, direction: 'up' | 'down') => {
    setEditedConfig(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const list = copy[section] as PortfolioItem[];
      if (direction === 'up' && index > 0) {
        const temp = list[index];
        list[index] = list[index - 1];
        list[index - 1] = temp;
      } else if (direction === 'down' && index < list.length - 1) {
        const temp = list[index];
        list[index] = list[index + 1];
        list[index + 1] = temp;
      }
      return copy;
    });
  };

  // Portfolio items CRUD helpers
  const deletePortfolioItem = (section: 'thumbnails' | 'logos', id: string) => {
    setEditedConfig(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[section] = (copy[section] as PortfolioItem[]).filter(item => item.id !== id);
      return copy;
    });
    triggerToast('success', 'Item queued for deletion.');
  };

  const handleAddThumbnail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThumb.img) {
      triggerToast('error', 'Please select/upload an image.');
      return;
    }
    const newItem: PortfolioItem = {
      id: 't_' + Date.now(),
      title: '',
      category: '',
      img: newThumb.img
    };
    setEditedConfig(prev => ({
      ...prev,
      thumbnails: [newItem, ...prev.thumbnails]
    }));
    setNewThumb({ title: '', category: '', img: '' });
    triggerToast('success', 'New thumbnail added to list.');
  };

  const handleAddLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogo.img) {
      triggerToast('error', 'Please select/upload an image.');
      return;
    }
    const newItem: PortfolioItem = {
      id: 'l_' + Date.now(),
      title: '',
      category: 'LOGO',
      img: newLogo.img
    };
    setEditedConfig(prev => ({
      ...prev,
      logos: [newItem, ...prev.logos]
    }));
    setNewLogo({ title: '', category: 'LOGO', img: '' });
    triggerToast('success', 'New logo design added to list.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070709]/95 backdrop-blur-xl flex flex-col font-sans overflow-hidden text-white">
      
      {/* Background Ambient Blur */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-950/10 blur-[120px] mix-blend-screen" />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl flex items-center gap-3 backdrop-blur-md shadow-2xl border ${
              toast.type === 'success' 
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
            <span className="text-xs uppercase font-extrabold tracking-wider">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== LOGIN SCREEN ==================== */}
      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4 z-10 relative overflow-hidden bg-radial from-[#120f1e] via-[#070709] to-[#040406]">
          {/* Decorative grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={isShaking ? { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: [-10, 10, -8, 8, -5, 5, -2, 2, 0]
            } : { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: 0
            }}
            transition={{
              x: { duration: 0.4, ease: 'easeInOut' },
              default: { type: 'spring', stiffness: 120, damping: 14 }
            }}
            className="w-full max-w-md bg-black/60 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] relative z-20 flex flex-col gap-8 border-t-purple-500/20"
          >
            {/* Top Security Header */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-40 blur-lg group-hover:opacity-75 transition duration-500 animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-purple-400 shadow-inner">
                  <motion.div
                    animate={pin.length > 0 ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <Lock className={`w-6 h-6 transition-colors duration-300 ${pin.length === 4 ? 'text-emerald-400' : 'text-purple-400'}`} />
                  </motion.div>
                </div>
              </div>
              <div className="space-y-1 mt-2">
                <h2 className="font-display font-black text-2xl tracking-[0.15em] uppercase bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Owner Vault
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                  <span className="text-[10px] text-purple-300 font-bold uppercase tracking-widest font-mono">ENCRYPTED CONNECTION</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 max-w-xs font-medium leading-relaxed">
                Unlock custom layouts, live themes, image optimizing, and portfolio adjustments.
              </p>
            </div>

            {/* Visual PIN Bubbles & Toggle Visibility */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center items-center gap-3.5">
                {[0, 1, 2, 3].map((index) => {
                  const isFilled = pin.length > index;
                  const currentDigit = pin[index];
                  return (
                    <div key={index} className="relative">
                      <motion.div
                        animate={isFilled ? {
                          scale: [1, 1.2, 1],
                          borderColor: 'rgba(168,85,247,0.6)',
                          backgroundColor: 'rgba(168,85,247,0.1)'
                        } : {
                          scale: 1,
                          borderColor: 'rgba(255,255,255,0.08)',
                          backgroundColor: 'rgba(255,255,255,0.02)'
                        }}
                        transition={{ duration: 0.2 }}
                        className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-sm font-black font-mono transition-all ${
                          isFilled ? 'shadow-[0_0_20px_rgba(168,85,247,0.3)] text-purple-300' : 'text-gray-600'
                        }`}
                      >
                        {isFilled ? (
                          showPinCode ? (
                            <span className="text-base text-white animate-fade-in font-black">{currentDigit}</span>
                          ) : (
                            <span className="text-xl leading-none text-purple-400 font-bold">&bull;</span>
                          )
                        ) : (
                          <span className="text-xs text-gray-700 font-medium">-</span>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {pin.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPinCode(!showPinCode)}
                  className="flex items-center gap-1.5 text-[9px] text-gray-400 hover:text-white uppercase font-bold tracking-widest transition-colors mt-1"
                >
                  {showPinCode ? (
                    <>
                      <EyeOff className="w-3 h-3 text-purple-400" />
                      <span>Hide PIN Code</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 text-purple-400" />
                      <span>View Numbers</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Interactive Keypad */}
            <div className="grid grid-cols-3 gap-3 max-w-[260px] mx-auto w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (pin.length < 4) {
                      const newVal = pin + num;
                      setPin(newVal);
                      setLoginError('');
                      if (newVal.length === 4) {
                        setTimeout(() => handlePinSubmit(newVal), 200);
                      }
                    }
                  }}
                  className="w-16 h-16 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:bg-purple-600/10 hover:border-purple-500/30 active:scale-95 text-white font-extrabold text-lg font-display transition-all duration-200 flex items-center justify-center cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                >
                  <span className="group-hover:scale-110 transition-transform">{num}</span>
                </button>
              ))}
              
              {/* Row 4: Clear ("C"), 0, Backspace */}
              <button
                type="button"
                onClick={() => {
                  setPin('');
                  setLoginError('');
                }}
                className="w-16 h-16 rounded-2xl bg-rose-950/20 border border-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/30 active:scale-95 text-rose-400 font-extrabold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm"
              >
                CLEAR
              </button>
              
              <button
                type="button"
                onClick={() => {
                  if (pin.length < 4) {
                    const newVal = pin + '0';
                    setPin(newVal);
                    setLoginError('');
                    if (newVal.length === 4) {
                      setTimeout(() => handlePinSubmit(newVal), 200);
                    }
                  }
                }}
                className="w-16 h-16 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:bg-purple-600/10 hover:border-purple-500/30 active:scale-95 text-white font-extrabold text-lg font-display transition-all duration-200 flex items-center justify-center cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
              >
                <span className="group-hover:scale-110 transition-transform">0</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPin(prev => prev.slice(0, -1));
                  setLoginError('');
                }}
                className="w-16 h-16 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:bg-purple-600/10 hover:border-purple-500/30 active:scale-95 text-gray-400 hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></svg>
              </button>
            </div>

            {/* Error Message Space & Hint Lock */}
            <div className="flex flex-col items-center justify-center gap-2 min-h-[44px]">
              <AnimatePresence mode="wait">
                {loginError ? (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-rose-400 text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{loginError}</span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="text-[9px] text-gray-500 hover:text-purple-400 uppercase font-bold tracking-widest transition-colors flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3 text-purple-500" />
                      <span>{showHint ? "Hide Hint" : "Reveal PIN Hint"}</span>
                    </button>
                    {showHint && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-lg bg-emerald-950/20 border border-emerald-500/10"
                      >
                        KEYCODE IS 0707
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions / Cancel Footer */}
            <div className="flex flex-col items-center gap-3 border-t border-white/5 pt-5">
              <button 
                type="button"
                onClick={onClose}
                className="text-[10px] text-gray-400 hover:text-white uppercase font-black tracking-widest text-center transition-colors cursor-pointer py-2 px-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/10"
              >
                Exit Portal
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        /* ==================== MAIN DASHBOARD LAYOUT ==================== */
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden z-10">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className={`w-full md:w-64 bg-[#0d0d11]/95 border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-between flex-shrink-0 backdrop-blur-md relative transition-all duration-300 ${
            isSidebarOpen ? 'flex' : 'hidden'
          }`}>
            
            {/* Top Border Accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple-500/20 via-transparent to-transparent hidden md:block" />

            <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[50vh] md:max-h-none flex-1">
              
              {/* Brand Title with High-tech Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-black text-sm font-display shadow-[0_0_15px_rgba(147,51,234,0.35)] relative overflow-hidden group">
                    <span className="relative z-10 text-white group-hover:scale-110 transition-transform">N</span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-black text-xs tracking-wider uppercase text-white">NOTINSANE</span>
                    <span className="text-[9px] text-purple-400 font-mono font-bold uppercase tracking-widest font-black">OWNER PANEL v2.0</span>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="md:hidden text-gray-400 hover:text-white p-1.5 rounded-xl hover:bg-white/5 border border-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Stack */}
              <nav className="flex flex-col gap-1.5">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
                  { id: 'appearance', label: 'Appearance', icon: Palette, badge: <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" /> },
                  { id: 'hero', label: 'Hero Section', icon: Compass, badge: null },
                  { id: 'thumbnails', label: 'Thumbnails', icon: ImageIcon, badge: editedConfig.thumbnails.length },
                  { id: 'logos', label: 'Logos', icon: Tag, badge: editedConfig.logos.length },
                  { id: 'about', label: 'About Me', icon: User, badge: null },
                  { id: 'contact', label: 'Contact', icon: Phone, badge: null },
                  { id: 'settings', label: 'Settings', icon: Settings, badge: null },
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setSearchTerm(''); // Reset search term
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs uppercase font-bold tracking-wider transition-all duration-300 relative group cursor-pointer ${
                        isActive 
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_8px_20px_rgba(124,58,237,0.25)] border-l-4 border-purple-400' 
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-purple-400'}`} />
                        <span className="font-sans">{item.label}</span>
                      </div>
                      
                      {item.badge !== null && (
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold font-mono ${
                          isActive ? 'bg-black/30 text-white' : 'bg-white/5 text-gray-400 group-hover:bg-purple-500/10 group-hover:text-purple-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sync State & Footprint Calculator */}
            <div className="p-6 border-t border-white/[0.05] bg-[#09090c]/40 flex flex-col gap-4">
              <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 font-black">Config Size</span>
                  <span className="text-[10px] font-bold font-mono text-white">
                    {(JSON.stringify(editedConfig).length / 1024).toFixed(1)} KB
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 font-black">Sync Status</span>
                  {JSON.stringify(editedConfig) !== JSON.stringify(config) ? (
                    <span className="inline-flex items-center gap-1 text-[9px] text-amber-400 uppercase font-black tracking-widest animate-pulse">
                      <Zap className="w-2.5 h-2.5" />
                      <span>Unsaved</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 uppercase font-black tracking-widest">
                      <Check className="w-2.5 h-2.5" />
                      <span>Saved</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => saveChanges()}
                  className={`w-full py-3 rounded-xl text-xs uppercase font-black tracking-widest flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                    JSON.stringify(editedConfig) !== JSON.stringify(config)
                      ? 'bg-purple-600 hover:bg-purple-500 text-white animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'bg-white hover:bg-gray-100 text-black'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Live</span>
                </button>

                <button 
                  onClick={onClose}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/[0.05] text-gray-400 hover:text-white rounded-xl text-xs uppercase font-bold tracking-widest text-center transition-all cursor-pointer"
                >
                  Exit Portal
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONFIGURATION CONTENT WORKSPACE */}
          <main className="flex-1 flex flex-col overflow-y-auto bg-black/20">
            
            {/* Header Area with Unsaved Notification */}
            <header className="px-8 py-5 border-b border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0a0a0d]/60 backdrop-blur-md sticky top-0 z-30">
              <div className="flex items-center gap-4">
                {/* 3-line Hamburger Menu Button to toggle Options */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 rounded-xl text-purple-400 hover:text-purple-300 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  id="admin-menu-toggle"
                  title={isSidebarOpen ? "Hide Options" : "Show Options"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-90 text-purple-300' : ''}`}>
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                  <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 group-hover:text-purple-300">
                    {isSidebarOpen ? "Hide Menu" : "Show Menu"}
                  </span>
                </button>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-purple-400 tracking-widest uppercase font-black font-mono">WORKSPACE CORE</span>
                    {JSON.stringify(editedConfig) !== JSON.stringify(config) && (
                      <span className="px-2 py-0.5 rounded-full text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-300 font-black uppercase tracking-widest animate-pulse">
                        Draft mode
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-display font-black tracking-wider uppercase text-white flex items-center gap-1.5">
                    <span>{activeTab === 'dashboard' ? 'Overview' : activeTab}</span>
                    <span className="text-gray-600">/</span>
                    <span className="text-xs text-gray-400 font-medium font-sans">Modify Settings</span>
                  </h2>
                </div>
              </div>
              
              {/* Draft Status alerts & Reset Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {JSON.stringify(editedConfig) !== JSON.stringify(config) && (
                  <button
                    onClick={() => saveChanges()}
                    className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-all text-[10px] uppercase font-black tracking-widest animate-pulse"
                  >
                    <Save className="w-3 h-3" />
                    <span>Deploy modifications</span>
                  </button>
                )}

                <button 
                  onClick={onReset}
                  className="px-4 py-2 bg-rose-950/20 hover:bg-rose-900/30 border border-rose-500/15 text-rose-300 rounded-xl text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
                
                <button 
                  onClick={onClose}
                  className="hidden md:flex p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Inner Dashboard Tabs */}
            <div className="p-8 max-w-3xl flex-1 flex flex-col gap-8 pb-16">
              
              {/* ==================== TAB: DASHBOARD ==================== */}
              {activeTab === 'dashboard' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Status Banner */}
                  <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden bg-black flex-shrink-0">
                      <img src={editedConfig.hero.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 text-center sm:text-left">
                      <h3 className="font-display font-black text-lg tracking-wider">WELCOME BACK, NOT INSANE</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">Your professional linktree portfolio is active. Edit branding elements, uploads, prices, and settings below.</p>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/[0.01] border border-white/[0.04] rounded-[1.5rem] p-5 flex flex-col gap-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500">Portfolio Items</span>
                      <span className="text-2xl font-black font-display text-white">
                        {editedConfig.thumbnails.length + editedConfig.logos.length + editedConfig.skins.length + editedConfig.animations.length}
                      </span>
                      <span className="text-[10px] text-purple-400 uppercase font-semibold tracking-wider">Dynamic Modules</span>
                    </div>

                    <div className="bg-white/[0.01] border border-white/[0.04] rounded-[1.5rem] p-5 flex flex-col gap-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500">Theme Engine</span>
                      <span className="text-2xl font-black font-display text-purple-400">ACTIVE</span>
                      <span className="text-[10px] text-purple-400 uppercase font-semibold tracking-wider">Custom UI styling</span>
                    </div>

                    <div className="bg-white/[0.01] border border-white/[0.04] rounded-[1.5rem] p-5 flex flex-col gap-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500">Owner Status</span>
                      <span className="text-xs font-black font-display text-white uppercase truncate">notinsanexd07</span>
                      <span className="text-[10px] text-emerald-400 uppercase font-semibold tracking-wider">Logged In</span>
                    </div>
                  </div>

                  {/* Backup & Restore database cards */}
                  <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-4">
                    <div>
                      <h4 className="font-display font-black text-sm tracking-wider uppercase">CONFIGURATION BACKUPS</h4>
                      <p className="text-[11px] text-gray-400 leading-normal mt-1">Export your website database state to a backup JSON file or upload one to completely restore custom imagery and texts instantenously.</p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-2">
                      <button 
                        onClick={handleExportBackup}
                        className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs uppercase font-extrabold tracking-widest text-white flex items-center gap-2 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Backup File</span>
                      </button>

                      <button 
                        onClick={() => backupInputRef.current?.click()}
                        className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs uppercase font-extrabold tracking-widest text-white flex items-center gap-2 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Restore from File</span>
                      </button>
                      
                      <input 
                        type="file" 
                        ref={backupInputRef} 
                        onChange={handleImportBackup} 
                        className="hidden" 
                        accept=".json"
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* ==================== TAB: APPEARANCE ==================== */}
              {activeTab === 'appearance' && (
                <div className="flex flex-col gap-8">
                  {/* Theme Presets / Assets Manager */}
                  <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <h4 className="font-display font-black text-sm tracking-wider uppercase text-white">THEME ASSETS & PRESETS</h4>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        Select a hand-crafted visual style to instantly redesign the background gradient, button glow accents, and typography configuration.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {themePresets.map((preset) => {
                        const isSelected = 
                          editedConfig.theme.primaryColor.toLowerCase() === preset.primaryColor.toLowerCase() &&
                          editedConfig.theme.secondaryColor.toLowerCase() === preset.secondaryColor.toLowerCase() &&
                          editedConfig.theme.bgGradientStart.toLowerCase() === preset.bgGradientStart.toLowerCase() &&
                          editedConfig.theme.bgGradientEnd.toLowerCase() === preset.bgGradientEnd.toLowerCase();

                        return (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => {
                              setEditedConfig(prev => ({
                                ...prev,
                                theme: {
                                  ...prev.theme,
                                  primaryColor: preset.primaryColor,
                                  secondaryColor: preset.secondaryColor,
                                  glowColor: preset.glowColor,
                                  bgGradientStart: preset.bgGradientStart,
                                  bgGradientEnd: preset.bgGradientEnd,
                                  fontFamily: preset.fontFamily,
                                }
                              }));
                              triggerToast('success', `${preset.name} theme preset applied successfully!`);
                            }}
                            className={`flex flex-col gap-3 p-3 rounded-2xl bg-black/40 border text-left transition-all duration-300 relative group cursor-pointer ${
                              isSelected 
                                ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                                : 'border-white/5 hover:border-white/15 hover:bg-white/[0.02]'
                            }`}
                          >
                            {/* Selected Indicator Dot */}
                            {isSelected && (
                              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
                            )}

                            {/* Mini Theme Canvas Preview */}
                            <div 
                              className="w-full h-14 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/5"
                              style={{ 
                                background: `linear-gradient(135deg, ${preset.bgGradientStart}, ${preset.bgGradientEnd})` 
                              }}
                            >
                              {/* Inner Glow Circle */}
                              <div 
                                className="absolute w-10 h-10 rounded-full blur-md opacity-60" 
                                style={{ backgroundColor: preset.glowColor }}
                              />
                              {/* Inner Mini Pill representing action buttons */}
                              <div 
                                className="relative px-2 py-1 rounded-md text-[8px] font-bold tracking-widest text-white border border-white/10 flex items-center shadow-lg"
                                style={{ 
                                  background: `linear-gradient(to right, ${preset.primaryColor}, ${preset.secondaryColor})` 
                                }}
                              >
                                Preview
                              </div>
                            </div>

                            {/* Meta texts */}
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-black uppercase text-white tracking-wider truncate">
                                {preset.name}
                              </span>
                              <span className="text-[8px] text-gray-500 font-mono tracking-widest uppercase font-bold">
                                {preset.fontFamily}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Manual Controls */}
                  <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-6">
                    <div>
                      <h4 className="font-display font-black text-sm tracking-wider uppercase text-white mb-1">MANUAL CUSTOMIZATION</h4>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        Finely tune individual color codes and typography rules to achieve custom branding alignments.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Primary Color</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            value={editedConfig.theme.primaryColor}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, primaryColor: e.target.value } }))}
                            className="w-10 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={editedConfig.theme.primaryColor}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, primaryColor: e.target.value } }))}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs uppercase font-bold tracking-widest text-white"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Secondary Color</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            value={editedConfig.theme.secondaryColor}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, secondaryColor: e.target.value } }))}
                            className="w-10 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={editedConfig.theme.secondaryColor}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, secondaryColor: e.target.value } }))}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs uppercase font-bold tracking-widest text-white"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Glow Background Color</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            value={editedConfig.theme.glowColor}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, glowColor: e.target.value } }))}
                            className="w-10 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={editedConfig.theme.glowColor}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, glowColor: e.target.value } }))}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs uppercase font-bold tracking-widest text-white"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Primary Font Family</label>
                        <select 
                          value={editedConfig.theme.fontFamily}
                          onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, fontFamily: e.target.value } }))}
                          className="bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-white focus:outline-none"
                        >
                          <option value="Inter">Inter (Sans-Serif Clean)</option>
                          <option value="Montserrat">Montserrat (Geometric Display)</option>
                          <option value="Space Grotesk">Space Grotesk (Neo-Brutalist)</option>
                          <option value="JetBrains Mono">JetBrains Mono (Technical Core)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Background Color (Start)</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            value={editedConfig.theme.bgGradientStart}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, bgGradientStart: e.target.value } }))}
                            className="w-10 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={editedConfig.theme.bgGradientStart}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, bgGradientStart: e.target.value } }))}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs uppercase font-bold tracking-widest text-white"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Background Color (End)</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            value={editedConfig.theme.bgGradientEnd}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, bgGradientEnd: e.target.value } }))}
                            className="w-10 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={editedConfig.theme.bgGradientEnd}
                            onChange={(e) => setEditedConfig(prev => ({ ...prev, theme: { ...prev.theme, bgGradientEnd: e.target.value } }))}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs uppercase font-bold tracking-widest text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Background Animations Config */}
                  <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <h4 className="font-display font-black text-sm tracking-wider uppercase text-white">AMBIENT VISUAL EFFECTS</h4>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        Enable or disable individual hand-crafted background assets and animations to create a fully customized theme vibe.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Particles Toggle */}
                      <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black uppercase text-white tracking-wider">Floating Particles</span>
                          <span className="text-[9px] text-gray-500 font-medium">Render connected floating energy nodes</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditedConfig(prev => ({
                            ...prev,
                            theme: { ...prev.theme, particlesEnabled: !(prev.theme.particlesEnabled ?? true) }
                          }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all duration-300 relative cursor-pointer ${
                            (editedConfig.theme.particlesEnabled ?? true) ? 'bg-purple-600' : 'bg-white/10'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                            (editedConfig.theme.particlesEnabled ?? true) ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Moving Scanning Lines Toggle */}
                      <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black uppercase text-white tracking-wider">Moving Scanner Lines</span>
                          <span className="text-[9px] text-gray-500 font-medium">Show scrolling cyberpunk scanning lasers</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditedConfig(prev => ({
                            ...prev,
                            theme: { ...prev.theme, movingLinesEnabled: !(prev.theme.movingLinesEnabled ?? true) }
                          }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all duration-300 relative cursor-pointer ${
                            (editedConfig.theme.movingLinesEnabled ?? true) ? 'bg-purple-600' : 'bg-white/10'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                            (editedConfig.theme.movingLinesEnabled ?? true) ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Cyber Grid Toggle */}
                      <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black uppercase text-white tracking-wider">Digital Cyber Grid</span>
                          <span className="text-[9px] text-gray-500 font-medium">Draw overlay pixel-style tech alignment grids</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditedConfig(prev => ({
                            ...prev,
                            theme: { ...prev.theme, gridEnabled: !prev.theme.gridEnabled }
                          }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all duration-300 relative cursor-pointer ${
                            editedConfig.theme.gridEnabled ? 'bg-purple-600' : 'bg-white/10'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                            editedConfig.theme.gridEnabled ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Glowing Floating Orbs Toggle */}
                      <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black uppercase text-white tracking-wider">Glowing Cosmic Orbs</span>
                          <span className="text-[9px] text-gray-500 font-medium">Slowly floating large blurred color nebula bubbles</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditedConfig(prev => ({
                            ...prev,
                            theme: { ...prev.theme, glowingOrbsEnabled: !(prev.theme.glowingOrbsEnabled ?? true) }
                          }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all duration-300 relative cursor-pointer ${
                            (editedConfig.theme.glowingOrbsEnabled ?? true) ? 'bg-purple-600' : 'bg-white/10'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                            (editedConfig.theme.glowingOrbsEnabled ?? true) ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Twinkling Stars Toggle */}
                      <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black uppercase text-white tracking-wider">Twinkling Stars</span>
                          <span className="text-[9px] text-gray-500 font-medium">Ambient soft twinkling starlight background</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditedConfig(prev => ({
                            ...prev,
                            theme: { ...prev.theme, starsEnabled: !prev.theme.starsEnabled }
                          }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all duration-300 relative cursor-pointer ${
                            editedConfig.theme.starsEnabled ? 'bg-purple-600' : 'bg-white/10'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                            editedConfig.theme.starsEnabled ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Shooting Stars Toggle */}
                      <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black uppercase text-white tracking-wider">Shooting Stars</span>
                          <span className="text-[9px] text-gray-500 font-medium">Fast diagonal shooting stardust with glowing core</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditedConfig(prev => ({
                            ...prev,
                            theme: { ...prev.theme, shootingStarsEnabled: !(prev.theme.shootingStarsEnabled ?? true) }
                          }))}
                          className={`w-12 h-6 rounded-full p-1 transition-all duration-300 relative cursor-pointer ${
                            (editedConfig.theme.shootingStarsEnabled ?? true) ? 'bg-purple-600' : 'bg-white/10'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                            (editedConfig.theme.shootingStarsEnabled ?? true) ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== TAB: HERO SECTION ==================== */}
              {activeTab === 'hero' && (
                <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-6">
                  
                  {/* Hero Image / Avatar Picker */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-white/[0.05] pb-6">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-black border border-white/10 flex-shrink-0">
                      <img src={editedConfig.hero.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                      {uploadingSection === 'hero.avatarUrl' && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-1.5 p-1">
                          <span className="text-[9px] font-black text-purple-400">LOADING</span>
                          <span className="text-[10px] font-bold">{uploadProgress}%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Avatar Portrait Image</label>
                      <p className="text-[11px] text-gray-500">JPG, PNG, WEBP, or AVIF accepted. File is automatically optimized.</p>
                      
                      <div className="flex justify-center sm:justify-start">
                        <input 
                          type="file" 
                          id="hero-avatar-file-input" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, ['hero', 'avatarUrl'])}
                        />
                        <button 
                          onClick={() => document.getElementById('hero-avatar-file-input')?.click()}
                          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-xs uppercase font-extrabold tracking-widest text-white rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Replace Avatar</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Texts Configuration */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Hero Title (Uppercase)</label>
                      <input 
                        type="text" 
                        value={editedConfig.hero.title}
                        onChange={(e) => setEditedConfig(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value.toUpperCase() } }))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-black font-display tracking-wider text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Hero Subtitle Watermark</label>
                      <input 
                        type="text" 
                        value={editedConfig.hero.subtitle}
                        onChange={(e) => setEditedConfig(prev => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value.toUpperCase() } }))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-black font-display tracking-wider text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Status Badge Label</label>
                      <input 
                        type="text" 
                        value={editedConfig.hero.statusText}
                        onChange={(e) => setEditedConfig(prev => ({ ...prev, hero: { ...prev.hero, statusText: e.target.value } }))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white"
                      />
                    </div>

                    <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-2">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase font-extrabold tracking-wider text-white">Show Scroll Hint</span>
                        <span className="text-[10px] text-gray-500">Toggle bouncy scroll cue on landing</span>
                      </div>
                      <button 
                        onClick={() => setEditedConfig(prev => ({ ...prev, hero: { ...prev.hero, showScrollHint: !prev.hero.showScrollHint } }))}
                        className={`w-12 h-6.5 rounded-full p-1 transition-all ${editedConfig.hero.showScrollHint ? 'bg-purple-600' : 'bg-white/10'}`}
                      >
                        <div className={`w-4.5 h-4.5 bg-white rounded-full transition-transform ${editedConfig.hero.showScrollHint ? 'translate-x-5.5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* ==================== TAB: THUMBNAILS ==================== */}
              {activeTab === 'thumbnails' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Add New Thumbnail Drag & Drop form block */}
                  <div 
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActiveSection('thumbnails');
                    }}
                    onDragLeave={() => {
                      setDragActiveSection(null);
                    }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      setDragActiveSection(null);
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        try {
                          const base64 = await compressImage(file, 1280, 720, 0.85);
                          setEditedConfig(prev => ({
                            ...prev,
                            thumbnails: [{
                              id: 't_' + Date.now(),
                              title: '',
                              category: '',
                              img: base64
                            }, ...prev.thumbnails]
                          }));
                          triggerToast('success', 'Dropped thumbnail compiled and added instantly!');
                        } catch {
                          triggerToast('error', 'Dropped image optimization failed.');
                        }
                      }
                    }}
                    className={`bg-black/40 border-2 rounded-[2rem] p-6 backdrop-blur-md transition-all duration-300 relative overflow-hidden ${
                      dragActiveSection === 'thumbnails'
                        ? 'border-purple-500 bg-purple-500/10 scale-[1.01] shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                        : 'border-white/10 hover:border-white/15'
                    }`}
                  >
                    <form onSubmit={handleAddThumbnail} className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-black text-xs tracking-widest uppercase flex items-center gap-2 text-purple-400">
                          <FolderPlus className="w-4 h-4 animate-pulse" />
                          <span>UPLOAD NEW THUMBNAIL</span>
                        </h3>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 font-mono">DRAG & DROP SUPPORTED</span>
                      </div>

                      {/* Drop area visualizer */}
                      <div className="border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-white/[0.01] text-center group cursor-pointer relative">
                        <input 
                          type="file" 
                          id="new-thumbnail-upload" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const base64 = await compressImage(file, 1280, 720, 0.85);
                                setNewThumb(prev => ({ ...prev, img: base64 }));
                                triggerToast('success', 'Image compiled successfully.');
                              } catch {
                                triggerToast('error', 'Optimizing failed.');
                              }
                            }
                          }}
                        />
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white uppercase tracking-wider">Drag and Drop Graphic or Click to Browse</p>
                          <p className="text-[10px] text-gray-500">Auto-compressed to ultra-efficient WebP/JPEG format</p>
                        </div>
                        
                        {newThumb.img && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-12 rounded-lg overflow-hidden border border-purple-500/40 bg-black shadow-lg">
                            <img src={newThumb.img} alt="preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      {newThumb.img && (
                        <button 
                          type="submit"
                          className="py-3 bg-purple-600 hover:bg-purple-500 font-extrabold text-xs uppercase tracking-widest text-white rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/20"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add to Portfolio Collection</span>
                        </button>
                      )}
                    </form>
                  </div>

                  {/* Existing thumbnails list with search & filters */}
                  <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-5">
                    
                    {/* Filter header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
                      <div className="flex flex-col gap-1">
                        <h4 className="font-display font-black text-xs tracking-wider uppercase text-white flex items-center gap-1.5">
                          <span>ACTIVE THUMBNAILS LIST</span>
                          <span className="text-purple-400 font-mono">({editedConfig.thumbnails.length})</span>
                        </h4>
                        <p className="text-[10px] text-gray-500">Instantly drag graphics to re-sort layout rendering.</p>
                      </div>
                      
                      {/* Search Bar */}
                      <div className="relative w-full sm:w-60">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                        <input 
                          type="text" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="SEARCH THUMBNAILS..."
                          className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-[10px] uppercase font-bold tracking-widest text-white placeholder-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {editedConfig.thumbnails
                        .map((item, idx) => ({ ...item, originalIndex: idx }))
                        .filter(item => {
                          if (!searchTerm) return true;
                          return `concept #${item.originalIndex + 1}`.toLowerCase().includes(searchTerm.toLowerCase());
                        })
                        .map((item) => (
                          <div 
                            key={item.id} 
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.03] group hover:border-purple-500/20 hover:bg-white/[0.02] transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-10 rounded-lg overflow-hidden border border-white/10 bg-black flex-shrink-0 relative">
                                <img src={item.img} alt={`thumbnail ${item.originalIndex}`} className="w-full h-full object-cover" />
                                <input 
                                  type="file" 
                                  id={`replace-thumb-${item.id}`} 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        const base64 = await compressImage(file, 1280, 720, 0.85);
                                        setEditedConfig(prev => ({
                                          ...prev,
                                          thumbnails: prev.thumbnails.map(t => t.id === item.id ? { ...t, img: base64 } : t)
                                        }));
                                        triggerToast('success', 'Image replaced successfully.');
                                      } catch {
                                        triggerToast('error', 'Optimization failed.');
                                      }
                                    }
                                  }}
                                />
                                <button 
                                  type="button"
                                  onClick={() => document.getElementById(`replace-thumb-${item.id}`)?.click()}
                                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                                >
                                  <Upload className="w-4 h-4 text-white" />
                                </button>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-extrabold text-xs tracking-wider uppercase text-white font-mono">
                                  Thumbnail #{item.originalIndex + 1}
                                </span>
                                <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider">INDEX AT POSITION {item.originalIndex}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button 
                                type="button"
                                onClick={() => moveItem('thumbnails', item.originalIndex, 'up')}
                                disabled={item.originalIndex === 0}
                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all cursor-pointer"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                type="button"
                                onClick={() => moveItem('thumbnails', item.originalIndex, 'down')}
                                disabled={item.originalIndex === editedConfig.thumbnails.length - 1}
                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all cursor-pointer"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                type="button"
                                onClick={() => deletePortfolioItem('thumbnails', item.id)}
                                className="p-2 rounded-xl bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ==================== TAB: LOGOS ==================== */}
              {activeTab === 'logos' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Add New Logo Drag & Drop form block */}
                  <div 
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActiveSection('logos');
                    }}
                    onDragLeave={() => {
                      setDragActiveSection(null);
                    }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      setDragActiveSection(null);
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        try {
                          const base64 = await compressImage(file, 800, 800, 0.85);
                          setEditedConfig(prev => ({
                            ...prev,
                            logos: [{
                              id: 'l_' + Date.now(),
                              title: '',
                              category: 'LOGO',
                              img: base64
                            }, ...prev.logos]
                          }));
                          triggerToast('success', 'Dropped logo compiled and added instantly!');
                        } catch {
                          triggerToast('error', 'Dropped image optimization failed.');
                        }
                      }
                    }}
                    className={`bg-black/40 border-2 rounded-[2rem] p-6 backdrop-blur-md transition-all duration-300 relative overflow-hidden ${
                      dragActiveSection === 'logos'
                        ? 'border-purple-500 bg-purple-500/10 scale-[1.01] shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                        : 'border-white/10 hover:border-white/15'
                    }`}
                  >
                    <form onSubmit={handleAddLogo} className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-black text-xs tracking-widest uppercase flex items-center gap-2 text-purple-400">
                          <FolderPlus className="w-4 h-4 animate-pulse" />
                          <span>UPLOAD NEW LOGO CONCEPT</span>
                        </h3>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 font-mono">DRAG & DROP SUPPORTED</span>
                      </div>

                      {/* Drop area visualizer */}
                      <div className="border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-white/[0.01] text-center group cursor-pointer relative">
                        <input 
                          type="file" 
                          id="new-logo-upload" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const base64 = await compressImage(file, 800, 800, 0.85);
                                setNewLogo(prev => ({ ...prev, img: base64 }));
                                triggerToast('success', 'Logo image compiled successfully.');
                              } catch {
                                triggerToast('error', 'Optimizing failed.');
                              }
                            }
                          }}
                        />
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white uppercase tracking-wider">Drag and Drop Logo or Click to Browse</p>
                          <p className="text-[10px] text-gray-500">Auto-compressed to high fidelity logo size (800x800)</p>
                        </div>
                        
                        {newLogo.img && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl overflow-hidden border border-purple-500/40 bg-black shadow-lg flex items-center justify-center p-1">
                            <img src={newLogo.img} alt="preview" className="w-full h-full object-contain" />
                          </div>
                        )}
                      </div>

                      {newLogo.img && (
                        <button 
                          type="submit"
                          className="py-3 bg-purple-600 hover:bg-purple-500 font-extrabold text-xs uppercase tracking-widest text-white rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/20"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add to Logo Collection</span>
                        </button>
                      )}
                    </form>
                  </div>

                  {/* Active Logos list with control arrows, search & deletes */}
                  <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-5">
                    
                    {/* Filter header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
                      <div className="flex flex-col gap-1">
                        <h4 className="font-display font-black text-xs tracking-wider uppercase text-white flex items-center gap-1.5">
                          <span>ACTIVE LOGOS LIST</span>
                          <span className="text-purple-400 font-mono">({editedConfig.logos.length})</span>
                        </h4>
                        <p className="text-[10px] text-gray-500">Re-order list using action controls below.</p>
                      </div>
                      
                      {/* Search Bar */}
                      <div className="relative w-full sm:w-60">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                        <input 
                          type="text" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="SEARCH LOGOS..."
                          className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-[10px] uppercase font-bold tracking-widest text-white placeholder-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {editedConfig.logos
                        .map((item, idx) => ({ ...item, originalIndex: idx }))
                        .filter(item => {
                          if (!searchTerm) return true;
                          return `concept #${item.originalIndex + 1}`.toLowerCase().includes(searchTerm.toLowerCase());
                        })
                        .map((item) => (
                          <div 
                            key={item.id} 
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.03] group hover:border-purple-500/20 hover:bg-white/[0.02] transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-black flex-shrink-0 relative">
                                <img src={item.img} alt={`logo ${item.originalIndex}`} className="w-full h-full object-cover" />
                                <input 
                                  type="file" 
                                  id={`replace-logo-${item.id}`} 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        const base64 = await compressImage(file, 800, 800, 0.85);
                                        setEditedConfig(prev => ({
                                          ...prev,
                                          logos: prev.logos.map(t => t.id === item.id ? { ...t, img: base64 } : t)
                                        }));
                                        triggerToast('success', 'Emblem image replaced.');
                                      } catch {
                                        triggerToast('error', 'Optimization failed.');
                                      }
                                    }
                                  }}
                                />
                                <button 
                                  type="button"
                                  onClick={() => document.getElementById(`replace-logo-${item.id}`)?.click()}
                                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                                >
                                  <Upload className="w-3.5 h-3.5 text-white" />
                                </button>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-extrabold text-xs tracking-wider uppercase text-white font-mono">
                                  Logo #{item.originalIndex + 1}
                                </span>
                                <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider">INDEX AT POSITION {item.originalIndex}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button 
                                type="button"
                                onClick={() => moveItem('logos', item.originalIndex, 'up')}
                                disabled={item.originalIndex === 0}
                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all cursor-pointer"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                type="button"
                                onClick={() => moveItem('logos', item.originalIndex, 'down')}
                                disabled={item.originalIndex === editedConfig.logos.length - 1}
                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all cursor-pointer"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                type="button"
                                onClick={() => deletePortfolioItem('logos', item.id)}
                                className="p-2 rounded-xl bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ==================== TAB: ABOUT ME ==================== */}
              {activeTab === 'about' && (
                <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-6">
                  
                  {/* Bio block editing */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">About Me Description Paragraph</label>
                    <textarea 
                      value={editedConfig.about.text}
                      onChange={(e) => setEditedConfig(prev => ({ ...prev, about: { ...prev.about, text: e.target.value } }))}
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs leading-relaxed text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  {/* Dynamic Skills/Services Editing list */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Website Custom Capabilities &bull; Skills ({editedConfig.about.skills.length})</label>
                    
                    <div className="space-y-2">
                      {editedConfig.about.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input 
                            type="text" 
                            value={skill}
                            onChange={(e) => {
                              const list = [...editedConfig.about.skills];
                              list[index] = e.target.value;
                              setEditedConfig(prev => ({ ...prev, about: { ...prev.about, skills: list } }));
                            }}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white uppercase"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const list = editedConfig.about.skills.filter((_, idx) => idx !== index);
                              setEditedConfig(prev => ({ ...prev, about: { ...prev.about, skills: list } }));
                            }}
                            className="p-3.5 rounded-xl bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 transition-all flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        setEditedConfig(prev => ({
                          ...prev,
                          about: { ...prev.about, skills: [...prev.about.skills, 'NEW SERVICE CAPABILITY'] }
                        }));
                      }}
                      className="mt-2 py-3 border border-dashed border-white/10 hover:border-purple-500/30 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-purple-300 rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service Capability</span>
                    </button>
                  </div>

                </div>
              )}

              {/* ==================== TAB: CONTACT ==================== */}
              {activeTab === 'contact' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Basic emails & socials config */}
                  <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-4">
                    <h3 className="font-display font-black text-xs tracking-wider uppercase text-purple-400">BASIC CHANNELS</h3>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Direct Contact Email Address</label>
                      <input 
                        type="email" 
                        value={editedConfig.contact.email}
                        onChange={(e) => setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-wider text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Discord Username</label>
                      <input 
                        type="text" 
                        value={editedConfig.contact.discordUsername || ''}
                        onChange={(e) => setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, discordUsername: e.target.value } }))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-wider text-white"
                        placeholder="not_insane_xd"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Discord Invite Server Link</label>
                      <input 
                        type="text" 
                        value={editedConfig.contact.discordUrl}
                        onChange={(e) => setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, discordUrl: e.target.value } }))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-semibold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Instagram Handle link</label>
                      <input 
                        type="text" 
                        value={editedConfig.contact.instagramUrl}
                        onChange={(e) => setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, instagramUrl: e.target.value } }))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-semibold"
                      />
                    </div>
                  </div>

                  {/* Services & Pricing Plans list config */}
                  <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-5">
                    <div>
                      <h3 className="font-display font-black text-xs tracking-wider uppercase text-purple-400 flex items-center gap-1.5">
                        <span>SERVICES & PRICING PLANS</span>
                        <span className="text-gray-600 font-mono">({(editedConfig.contact.webstoreProducts || []).length})</span>
                      </h3>
                      <p className="text-[10px] text-gray-500 leading-normal mt-1">
                        Configure customized services, prices, and automated order email subjects that display directly on your landing page.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {((editedConfig.contact.webstoreProducts || []) as WebstoreProduct[]).map((product, index) => (
                        <div 
                          key={index} 
                          className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:border-purple-500/10 hover:bg-white/[0.02] transition-all flex flex-col gap-3 relative group"
                        >
                          <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">Service Plan #{index + 1}</span>
                            
                            <div className="flex items-center gap-1">
                              <button 
                                type="button"
                                onClick={() => {
                                  if (index === 0) return;
                                  const list = [...editedConfig.contact.webstoreProducts];
                                  const temp = list[index];
                                  list[index] = list[index - 1];
                                  list[index - 1] = temp;
                                  setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, webstoreProducts: list } }));
                                }}
                                disabled={index === 0}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all cursor-pointer"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button 
                                type="button"
                                onClick={() => {
                                  if (index === editedConfig.contact.webstoreProducts.length - 1) return;
                                  const list = [...editedConfig.contact.webstoreProducts];
                                  const temp = list[index];
                                  list[index] = list[index + 1];
                                  list[index + 1] = temp;
                                  setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, webstoreProducts: list } }));
                                }}
                                disabled={index === editedConfig.contact.webstoreProducts.length - 1}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all cursor-pointer"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                              <button 
                                type="button"
                                onClick={() => {
                                  const list = editedConfig.contact.webstoreProducts.filter((_, idx) => idx !== index);
                                  setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, webstoreProducts: list } }));
                                }}
                                className="p-1.5 rounded-lg bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] uppercase font-bold tracking-wider text-gray-500">Service Plan Name</label>
                              <input 
                                type="text" 
                                value={product.title}
                                onChange={(e) => {
                                  const list = [...editedConfig.contact.webstoreProducts];
                                  list[index] = { ...list[index], title: e.target.value.toUpperCase() };
                                  setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, webstoreProducts: list } }));
                                }}
                                placeholder="E.G. CUSTOM BANNER DESIGN"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white uppercase"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] uppercase font-bold tracking-wider text-gray-500">Starting Price Label</label>
                              <input 
                                type="text" 
                                value={product.price}
                                onChange={(e) => {
                                  const list = [...editedConfig.contact.webstoreProducts];
                                  list[index] = { ...list[index], price: e.target.value };
                                  setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, webstoreProducts: list } }));
                                }}
                                placeholder="E.G. $25"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-500">Description / Deliverable details</label>
                            <input 
                              type="text" 
                              value={product.desc}
                              onChange={(e) => {
                                  const list = [...editedConfig.contact.webstoreProducts];
                                  list[index] = { ...list[index], desc: e.target.value };
                                  setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, webstoreProducts: list } }));
                              }}
                              placeholder="E.G. Cohesive and fully responsive social banner optimized for YouTube & Twitch"
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-500">Automated Order Email Subject Line</label>
                            <input 
                              type="text" 
                              value={product.emailSubject}
                              onChange={(e) => {
                                  const list = [...editedConfig.contact.webstoreProducts];
                                  list[index] = { ...list[index], emailSubject: e.target.value };
                                  setEditedConfig(prev => ({ ...prev, contact: { ...prev.contact, webstoreProducts: list } }));
                              }}
                              placeholder="E.G. Order Request: Social Banner Set"
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-medium"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        const newProduct: WebstoreProduct = {
                          title: 'NEW GRAPHIC SERVICE',
                          desc: 'A premium-grade visual design concept tailored for professional content creators.',
                          price: '$30',
                          emailSubject: 'Order: New Graphic Service'
                        };
                        setEditedConfig(prev => ({
                          ...prev,
                          contact: {
                            ...prev.contact,
                            webstoreProducts: [...(prev.contact.webstoreProducts || []), newProduct]
                          }
                        }));
                      }}
                      className="mt-1 py-3 border border-dashed border-white/10 hover:border-purple-500/30 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-purple-300 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service Plan</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ==================== TAB: SETTINGS ==================== */}
              {activeTab === 'settings' && (
                <div className="bg-[#121216]/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-6">
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Browser Page / Web Title</label>
                    <input 
                      type="text" 
                      value={editedConfig.settings.siteTitle}
                      onChange={(e) => setEditedConfig(prev => ({ ...prev, settings: { ...prev.settings, siteTitle: e.target.value } }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">SEO Indexing Metadata Description</label>
                    <textarea 
                      value={editedConfig.settings.seoDesc}
                      onChange={(e) => setEditedConfig(prev => ({ ...prev, settings: { ...prev.settings, seoDesc: e.target.value } }))}
                      rows={3}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white leading-relaxed focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Footer Copyright Text Statement</label>
                    <input 
                      type="text" 
                      value={editedConfig.settings.copyrightText}
                      onChange={(e) => setEditedConfig(prev => ({ ...prev, settings: { ...prev.settings, copyrightText: e.target.value } }))}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-wider text-white"
                    />
                  </div>

                </div>
              )}

            </div>
          </main>

        </div>
      )}

    </div>
  );
}

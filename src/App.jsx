import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Video, Music, Users, Shield, Zap, Search, 
  Menu, X, CheckCircle, ArrowRight, Play, Download, Star, 
  Heart, Filter, Lock, User, Sparkles, MessageSquare, Flame, 
  Terminal, Globe, DollarSign, Award, ChevronRight, Volume2, 
  ExternalLink, Layers, RefreshCw, Send, Check 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [previewModalAsset, setPreviewModalAsset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    { text: 'YK.FX OS [Version 4.2.0-beta]', type: 'system' },
    { text: 'Type "help" to see available command line directives.', type: 'info' }
  ]);

  const assets = [
    { 
      id: 1, 
      title: 'Cyberpunk Glitch Engine v3', 
      category: 'Plugins', 
      price: 69, 
      rating: 4.9, 
      downloads: '1.4k',
      badge: 'Bestseller',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
      description: 'Next-gen data corruption and glitch effects with real-time audio reactivity for Premiere and After Effects.'
    },
    { 
      id: 2, 
      title: 'Neon Noir Cinematic LUTs', 
      category: 'Presets', 
      price: 34, 
      rating: 4.8, 
      downloads: '3.1k',
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop',
      description: '35 meticulously crafted color grading presets designed for dark, moody urban and futuristic cyberpunk aesthetics.'
    },
    { 
      id: 3, 
      title: 'Sci-Fi HUD Hologram Pack', 
      category: 'Templates', 
      price: 45, 
      rating: 5.0, 
      downloads: '890',
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
      description: 'Over 100 modular 4K heads-up display elements, data streams, and sci-fi interface loops with alpha channels.'
    },
    { 
      id: 4, 
      title: 'Dark Trap & Cyber Synth Kit', 
      category: 'Audio FX', 
      price: 29, 
      rating: 4.7, 
      downloads: '2.5k',
      badge: '',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop',
      description: 'Punchy cyberpunk drums, heavy sub-basses, industrial risers, and metallic impact sound effects.'
    },
    { 
      id: 5, 
      title: 'Neural AI Voice Modulation Suite', 
      category: 'Plugins', 
      price: 89, 
      rating: 4.9, 
      downloads: '620',
      badge: 'Pro',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop',
      description: 'Transform dialogue into futuristic cyborg, AI assistant, or robotic announcer voices with zero latency.'
    },
    { 
      id: 6, 
      title: 'Matrix Data Stream Overlays', 
      category: 'Templates', 
      price: 25, 
      rating: 4.6, 
      downloads: '4.2k',
      badge: '',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
      description: 'Seamlessly looping digital rain and binary code backgrounds optimized for 4K video editing timelines.'
    }
  ];

  const triggerNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3500);
  };

  const addToCart = (asset) => {
    if (cart.some(item => item.id === asset.id)) {
      triggerNotification(`"${asset.title}" is already in your cart!`);
    } else {
      setCart([...cart, asset]);
      triggerNotification(`Added "${asset.title}" to cart!`);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    triggerNotification('Item removed from cart.');
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, { text: `> ${terminalInput}`, type: 'input' }];

    if (cmd === 'help') {
      newLogs.push({ text: 'Available commands: clear, list, cart, checkout, about, matrix', type: 'info' });
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'list') {
      assets.forEach(a => newLogs.push({ text: `- [${a.category}] ${a.title} ($${a.price})`, type: 'output' }));
    } else if (cmd === 'cart') {
      newLogs.push({ text: `Items in cart: ${cart.length} total.`, type: 'output' });
    } else if (cmd === 'matrix') {
      newLogs.push({ text: 'Wake up, creator... The matrix has you.', type: 'system' });
    } else {
      newLogs.push({ text: `Command not recognized: "${cmd}". Type "help" for options.`, type: 'error' });
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Floating Notification Stack */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className="pointer-events-auto bg-neutral-900 border border-indigo-500/40 text-neutral-200 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-fade-in">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium">{n.message}</span>
          </div>
        ))}
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-neutral-200 to-indigo-400 bg-clip-text text-transparent">YK.FX</span>
              <span className="text-xs block text-indigo-400 font-mono tracking-widest uppercase">Studio Suite</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 border border-neutral-800/60 px-3 py-1.5 rounded-full">
            {[
              { id: 'home', label: 'Home', icon: Globe },
              { id: 'market', label: 'Marketplace', icon: ShoppingBag },
              { id: 'studio', label: 'Studio Live', icon: Video },
              { id: 'terminal', label: 'OS Terminal', icon: Terminal }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {cart.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm font-semibold hover:border-indigo-500/50 hover:bg-neutral-800 transition-all"
            >
              <User className="w-4 h-4 text-indigo-400" />
              Sign In
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-4 flex flex-col gap-2">
            {['home', 'market', 'studio', 'terminal'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                className={`text-left px-4 py-3 rounded-xl font-medium capitalize ${
                  activeTab === tab ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:bg-neutral-900'
                }`}
              >
                {tab} Suite
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Sections */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* --- HOME TAB --- */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-8 sm:p-16 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_70%)] pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
                  <Flame className="w-3.5 h-3.5" /> Next-Gen Creative Suite v4.2
                </div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
                  Craft Immersive Visual Worlds with <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Precision FX</span>
                </h1>
                <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
                  High-performance video plugins, cinematic presets, procedural templates, and sound design elements built for elite creators.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('market')}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
                  >
                    Explore Marketplace <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('studio')}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 font-bold text-white transition-all"
                  >
                    Launch Studio Live <Play className="w-4 h-4 text-indigo-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Real-Time GPU Acceleration', desc: 'Built from the ground up for maximum framerates in Premiere Pro, After Effects, and DaVinci Resolve.', icon: Zap },
                { title: 'Modular Asset Architecture', desc: 'Easily stackable nodes and customizable parameters give you infinite control over your final composition.', icon: Layers },
                { title: 'Cloud Project Sync', desc: 'Manage your presets and project files across multiple workstations seamlessly with our secure sync engine.', icon: Globe }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/80 hover:border-indigo-500/40 transition-all space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feat.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- MARKETPLACE TAB --- */}
        {activeTab === 'market' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800 pb-6">
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">Studio Marketplace</h2>
                <p className="text-neutral-400 text-sm mt-1">Professional plugins, cinematic presets, and procedural elements.</p>
              </div>
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Plugins', 'Presets', 'Templates', 'Audio FX'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets
                .filter(a => selectedCategory === 'All' || a.category === selectedCategory)
                .map((asset) => (
                  <div key={asset.id} className="group rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col hover:border-indigo-500/50 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden bg-neutral-950">
                      <img 
                        src={asset.image} 
                        alt={asset.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {asset.badge && (
                          <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md">
                            {asset.badge}
                          </span>
                        )}
                        <span className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-neutral-300 text-xs font-semibold border border-neutral-700">
                          {asset.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                          <span className="flex items-center gap-1 text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /> {asset.rating}</span>
                          <span>{asset.downloads} downloads</span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{asset.title}</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">{asset.description}</p>
                      </div>

                      <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-neutral-500 block uppercase font-mono">Price</span>
                          <span className="text-2xl font-black text-white">${asset.price}</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setPreviewModalAsset(asset)}
                            className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                            title="Preview details"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => addToCart(asset)}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all"
                          >
                            <ShoppingBag className="w-4 h-4" /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* --- STUDIO LIVE TAB --- */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            <div className="border-b border-neutral-800 pb-6">
              <h2 className="text-3xl font-black text-white tracking-tight">Studio Live Room</h2>
              <p className="text-neutral-400 text-sm mt-1">Real-time collaboration and audio/video monitoring canvas.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-3xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between space-y-6">
                <div className="relative aspect-video rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2)_0,transparent_70%)]" />
                  <div className="text-center space-y-3 z-10">
                    <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400 animate-pulse">
                      <Video className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Live Stream Canvas Active</h4>
                    <p className="text-neutral-400 text-xs max-w-xs mx-auto">Broadcasting timeline telemetry & preview at 60 FPS.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-sm font-mono text-neutral-300">STATUS: ENCODING 4K H.265</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => triggerNotification('Stream recording started.')} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">Record</button>
                    <button onClick={() => triggerNotification('Snapshot captured to gallery.')} className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-bold">Snapshot</button>
                  </div>
                </div>
              </div>

              {/* Chat & Telemetry Panel */}
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-neutral-800 pb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" /> Studio Feed
                </h3>
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[300px] text-xs font-mono text-neutral-400">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-indigo-400 font-bold">System:</span> Connected to YK.FX relay node US-East.
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-purple-400 font-bold">Creator_01:</span> Glitch plugin shader compilation successful.
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-emerald-400 font-bold">Director:</span> Ready for final export sequence.
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <input type="text" placeholder="Send team message..." className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                  <button onClick={() => triggerNotification('Message sent to team.')} className="p-2.5 bg-indigo-600 text-white rounded-xl"><Send className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TERMINAL TAB --- */}
        {activeTab === 'terminal' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-neutral-800 pb-6">
              <h2 className="text-3xl font-black text-white tracking-tight">YK.FX Command Terminal</h2>
              <p className="text-neutral-400 text-sm mt-1">Direct OS level interface for plugin diagnostics and asset queries.</p>
            </div>

            <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 font-mono shadow-2xl space-y-4">
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 h-80 overflow-y-auto space-y-2 text-sm">
                {terminalLogs.map((log, index) => (
                  <div key={index} className={`flex items-start gap-2 ${
                    log.type === 'error' ? 'text-rose-400' :
                    log.type === 'system' ? 'text-indigo-400 font-bold' :
                    log.type === 'info' ? 'text-amber-300' : 'text-neutral-300'
                  }`}>
                    <span>{log.text}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="flex gap-2">
                <span className="flex items-center text-indigo-400 font-bold px-2">&gt;</span>
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type command (try 'help', 'list', 'cart', 'matrix')..." 
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 transition-colors">
                  Execute
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* --- CART SLIDE-OVER MODAL --- */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 p-6 flex flex-col justify-between h-full shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">Your Cart ({cart.length})</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 text-neutral-500 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto opacity-30" />
                  <p>Your cart is currently empty.</p>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto max-h-[60vh]">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <div>
                        <h4 className="font-bold text-sm text-white">{item.title}</h4>
                        <span className="text-indigo-400 text-xs font-mono">${item.price}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-rose-400 p-2">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-neutral-800 pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-neutral-400">Total:</span>
                  <span className="text-white">${cart.reduce((sum, item) => sum + item.price, 0)}</span>
                </div>
                <button 
                  onClick={() => { triggerNotification('Checkout successful! Assets unlocked.'); setCart([]); setCartOpen(false); }}
                  className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-center shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Complete Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- AUTH MODAL --- */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6 shadow-2xl relative">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-2xl font-black text-white">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
              <p className="text-neutral-400 text-sm mt-1">Access your YK.FX plugins and cloud presets.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Email Address</label>
                <input type="email" placeholder="creator@studio.com" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
              </div>

              <button 
                onClick={() => { triggerNotification(authMode === 'login' ? 'Successfully signed in!' : 'Account created successfully!'); setAuthModalOpen(false); }}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all mt-2"
              >
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </div>

            <div className="text-center text-xs text-neutral-400 pt-2">
              {authMode === 'login' ? (
                <span>Don't have an account? <button onClick={() => setAuthMode('signup')} className="text-indigo-400 font-bold hover:underline">Sign up</button></span>
              ) : (
                <span>Already have an account? <button onClick={() => setAuthMode('login')} className="text-indigo-400 font-bold hover:underline">Sign in</button></span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- PREVIEW DETAIL MODAL --- */}
      {previewModalAsset && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
            <button onClick={() => setPreviewModalAsset(null)} className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-neutral-950/80 backdrop-blur-md text-neutral-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="h-64 relative bg-neutral-950">
              <img src={previewModalAsset.image} alt={previewModalAsset.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono uppercase text-indigo-400">{previewModalAsset.category}</span>
                  <h3 className="text-2xl font-black text-white mt-1">{previewModalAsset.title}</h3>
                </div>
                <span className="text-2xl font-black text-white">${previewModalAsset.price}</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">{previewModalAsset.description}</p>
              <div className="flex gap-4 pt-4 border-t border-neutral-800">
                <button 
                  onClick={() => { addToCart(previewModalAsset); setPreviewModalAsset(null); }}
                  className="flex-1 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-12 px-4 text-center text-xs text-neutral-500 font-mono">
        <p>© 2026 YK.FX Studio Suite. All rights reserved.</p>
      </footer>

    </div>
  );
}

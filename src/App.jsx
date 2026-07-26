import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Video, Music, Users, Shield, Zap, Search, 
  Menu, X, CheckCircle, ArrowRight, Play, Download, Star, 
  Heart, Filter, Lock, User, Sparkles, MessageSquare, Flame,
  Terminal, Globe, DollarSign, Award, ChevronRight, Volume2,
  ExternalLink, Layers, RefreshCw, Send, Check
} from 'lucide-react';

export default function App() {
  // Navigation & Modal States
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [previewModalAsset, setPreviewModalAsset] = useState(null);
  
  // Cart & User States
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userCoins, setUserCoins] = useState(150);
  
  // Marketplace Filters & Search
  const [marketFilter, setMarketFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Community Feed State
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, author: 'VFX_Wizard', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', title: 'Cyberpunk Neon Color Grade v2', category: 'Presets', likes: 245, comments: 42, time: '2 hours ago' },
    { id: 2, author: 'AudioPulse', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop', title: 'Glitch Whoosh & Impact Sound FX Pack', category: 'Audio', likes: 189, comments: 19, time: '5 hours ago' },
    { id: 3, author: 'MotionGeek', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', title: 'Seamless 4K Transition Overlays', category: 'Plugins', likes: 512, comments: 88, time: '1 day ago' },
  ]);
  const [newPostText, setNewPostText] = useState('');

  // Dummy Marketplace Data
  const assets = [
    { id: 1, title: 'Quantum Glitch Pack', category: 'Plugins', price: 49, rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop', description: 'Next-gen data corruption and glitch effects built for Premiere and After Effects.' },
    { id: 2, title: 'Cinematic LUTS Vol. 4', category: 'Presets', price: 29, rating: 4.8, reviews: 310, image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop', description: 'Hollywood grade color grading look-up tables optimized for LOG footage.' },
    { id: 3, title: 'Sci-Fi HUD Overlays 4K', category: 'Templates', price: 35, rating: 5.0, reviews: 94, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop', description: 'Fully customizable futuristic heads-up display elements with alpha channels.' },
    { id: 4, title: 'Cinematic Impact SFX', category: 'Audio', price: 19, rating: 4.7, reviews: 215, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop', description: 'Pounding sub-bass drops, risers, and metallic whooshes for trailer editors.' },
    { id: 5, title: 'Anamorphic Light Leaks', category: 'Presets', price: 24, rating: 4.9, reviews: 180, image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&h=400&fit=crop', description: 'Organic lens flares and warm analog film burns captured on 35mm stock.' },
    { id: 6, title: 'Seamless Pan Transitions', category: 'Plugins', price: 39, rating: 4.8, reviews: 260, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=400&fit=crop', description: 'Whip-pan and zoom transitions with built-in motion blur control.' },
  ];

  // Keyboard shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToCart = (asset) => {
    if (!cart.some((item) => item.id === asset.id)) {
      setCart([...cart, asset]);
    }
    setCartOpen(true);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUserEmail(e.target.email?.value || 'creator@ykfx.io');
    setAuthModalOpen(false);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const newPost = {
      id: communityPosts.length + 1,
      author: userEmail.split('@')[0] || 'ProCreator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      title: newPostText,
      category: 'Discussion',
      likes: 1,
      comments: 0,
      time: 'Just now'
    };
    setCommunityPosts([newPost, ...communityPosts]);
    setNewPostText('');
  };

  const filteredAssets = assets.filter(item => {
    const matchesFilter = marketFilter === 'all' || item.category.toLowerCase() === marketFilter.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* TOP NOTIFICATION BANNER */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-pulse" />
        <span>Yk.FX V2.4 Released: Experience lightning-fast rendering & AI asset tagging.</span>
        <button onClick={() => setActiveTab('marketplace')} className="underline hover:text-indigo-200 ml-1">Explore</button>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <span className="font-black text-xl tracking-wider bg-gradient-to-r from-white via-neutral-200 to-indigo-400 bg-clip-text text-transparent">Yk.FX</span>
              <span className="text-[10px] block text-indigo-400 font-semibold tracking-widest uppercase -mt-1">Studio Suite</span>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800">
            {[
              { id: 'home', label: 'Home' },
              { id: 'marketplace', label: 'Marketplace' },
              { id: 'academy', label: 'Academy' },
              { id: 'community', label: 'Community Hub' },
              { id: 'pricing', label: 'Pricing' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            {/* SEARCH TRIGGER */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-3 py-1.5 rounded-lg text-xs text-neutral-400 transition"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Quick Search...</span>
              <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] text-neutral-400">⌘K</kbd>
            </button>

            {/* CART BUTTON */}
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white rounded-full text-xs font-bold flex items-center justify-center animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>

            {/* USER PROFILE / AUTH BUTTON */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 pl-3 pr-2 py-1 rounded-xl">
                <div className="text-right hidden lg:block">
                  <div className="text-xs font-semibold text-white">{userEmail.split('@')[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono">{userCoins} FX Coins</div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                  {userEmail[0].toUpperCase()}
                </div>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition"
              >
                Sign In
              </button>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-b border-neutral-800 px-4 py-4 space-y-2">
            {['home', 'marketplace', 'academy', 'community', 'pricing'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium capitalize ${
                  activeTab === tab ? 'bg-indigo-600 text-white' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {tab === 'community' ? 'Community Hub' : tab}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main>
        {/* ================= HOME TAB ================= */}
        {activeTab === 'home' && (
          <div className="space-y-24 pb-20">
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-neutral-950/0 to-neutral-950 pointer-events-none" />
              <div className="max-w-6xl mx-auto px-4 text-center relative z-10 space-y-8">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Trusted by 45,000+ Professional Video Editors & Creators</span>
                </div>

                <h1 className="text-5xl sm:text-7xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
                  Unleash Cinematic Power With <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Yk.FX Suite</span>
                </h1>

                <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto font-normal">
                  Professional grade plugins, motion presets, sound FX, and community-driven masterclasses designed to take your edits to Hollywood standards.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('marketplace')}
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Explore Marketplace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setActiveTab('academy')}
                    className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition"
                  >
                    <Video className="w-5 h-5 text-indigo-400" />
                    <span>Watch Academy Masterclasses</span>
                  </button>
                </div>

                {/* HERO STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto border-t border-neutral-900">
                  {[
                    { label: 'Asset Downloads', value: '1.2M+' },
                    { label: 'Creator Community', value: '45K+' },
                    { label: 'Pro Masterclasses', value: '120+' },
                    { label: 'Satisfaction Rate', value: '99.8%' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-neutral-900/40 p-4 rounded-2xl border border-neutral-900">
                      <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                      <div className="text-xs text-neutral-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* FEATURED ASSETS PREVIEW */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase">Handcrafted Tools</span>
                  <h2 className="text-3xl font-bold tracking-tight mt-1">Trending Creator Assets</h2>
                </div>
                <button 
                  onClick={() => setActiveTab('marketplace')}
                  className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>View All Marketplace</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assets.slice(0, 3).map((asset) => (
                  <div key={asset.id} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition duration-300 flex flex-col">
                    <div className="relative aspect-video overflow-hidden bg-neutral-950">
                      <img src={asset.image} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium text-indigo-300 border border-neutral-800">
                        {asset.category}
                      </span>
                      <button 
                        onClick={() => setPreviewModalAsset(asset)}
                        className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white font-semibold text-sm backdrop-blur-xs"
                      >
                        <Play className="w-4 h-4 fill-current" /> Quick Preview
                      </button>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition">{asset.title}</h3>
                          <span className="text-lg font-mono font-bold text-indigo-400">${asset.price}</span>
                        </div>
                        <p className="text-sm text-neutral-400 mt-2 line-clamp-2">{asset.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{asset.rating}</span>
                          <span className="text-neutral-500">({asset.reviews})</span>
                        </div>
                        <button 
                          onClick={() => addToCart(asset)}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ================= MARKETPLACE TAB ================= */}
        {activeTab === 'marketplace' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight">Creator Marketplace</h1>
                <p className="text-sm text-neutral-400 mt-1">Plugins, transition packs, presets, and high-fidelity sound FX.</p>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input 
                    type="text" 
                    placeholder="Search assets..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
                  />
                </div>
              </div>
            </div>

            {/* CATEGORY TABS */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800">
              {['all', 'plugins', 'presets', 'templates', 'audio'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMarketFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                    marketFilter === cat
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ASSETS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition duration-300 flex flex-col">
                  <div className="relative aspect-video overflow-hidden bg-neutral-950">
                    <img src={asset.image} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium text-indigo-300 border border-neutral-800">
                      {asset.category}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition">{asset.title}</h3>
                        <span className="text-lg font-mono font-bold text-indigo-400">${asset.price}</span>
                      </div>
                      <p className="text-sm text-neutral-400 mt-2">{asset.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{asset.rating}</span>
                        <span className="text-neutral-500">({asset.reviews})</span>
                      </div>
                      <button 
                        onClick={() => addToCart(asset)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ACADEMY TAB ================= */}
        {activeTab === 'academy' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-indigo-400 text-xs font-semibold tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Yk.FX Masterclass</span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Learn Advanced Editing & VFX from Pros</h1>
              <p className="text-neutral-400 text-sm sm:text-base">Step-by-step masterclasses covering Premiere Pro, After Effects, DaVinci Resolve, and sound design.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Advanced Sound Design for Cinematic Trailers', level: 'Intermediate', duration: '2.5 Hours', instructor: 'Marcus Vance', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop' },
                { title: 'Mastering After Effects Expression Scripts', level: 'Advanced', duration: '4.0 Hours', instructor: 'Elena Rostova', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop' },
                { title: 'Commercial Color Grading in DaVinci Resolve', level: 'Beginner', duration: '3.0 Hours', instructor: 'David Chen', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop' },
              ].map((course, idx) => (
                <div key={idx} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50 group-hover:scale-110 transition">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 bg-neutral-950/80 px-3 py-1 rounded-lg text-xs font-medium text-indigo-300">
                      {course.level}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="text-xs text-indigo-400 font-mono">{course.duration} • Instructor: {course.instructor}</div>
                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition">{course.title}</h3>
                    <button className="w-full mt-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2">
                      <Video className="w-4 h-4 text-indigo-400" /> Start Watching Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= COMMUNITY HUB TAB ================= */}
        {activeTab === 'community' && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black tracking-tight">Creator Community Hub</h1>
              <p className="text-sm text-neutral-400">Share your presets, ask workflow questions, and connect with editors worldwide.</p>
            </div>

            {/* POST CREATION BOX */}
            <form onSubmit={handlePostSubmit} className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl space-y-3">
              <textarea 
                rows="3"
                placeholder="Share a tip, ask a question, or showcase your latest preset..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Earn FX Coins for helpful answers!</span>
                </div>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition">
                  <Send className="w-3.5 h-3.5" /> Post to Feed
                </button>
              </div>
            </form>

            {/* COMMUNITY FEED LIST */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <div key={post.id} className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-indigo-500/30" />
                      <div>
                        <div className="font-bold text-sm text-white">{post.author}</div>
                        <div className="text-xs text-neutral-500">{post.time}</div>
                      </div>
                    </div>
                    <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/20">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base text-neutral-100">{post.title}</h3>
                  <div className="flex items-center gap-6 pt-2 text-xs text-neutral-400 border-t border-neutral-800/80">
                    <button className="flex items-center gap-1.5 hover:text-indigo-400 transition">
                      <Heart className="w-4 h-4" /> {post.likes} Likes
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-indigo-400 transition">
                      <MessageSquare className="w-4 h-4" /> {post.comments} Comments
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PRICING TAB ================= */}
        {activeTab === 'pricing' && (
          <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-indigo-400 text-xs font-semibold tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Flexible Pricing</span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Unlock Unlimited Creator Power</h1>
              <p className="text-neutral-400 text-sm sm:text-base">Get instant access to every plugin, preset, sound pack, and academy course with Yk.FX VIP.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* FREE TIER */}
              <div className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Starter Creator</div>
                  <div className="text-4xl font-black text-white">$0 <span className="text-sm font-normal text-neutral-500">/ forever</span></div>
                  <p className="text-sm text-neutral-400">Great for hobbyist editors exploring free monthly assets.</p>
                  
                  <div className="space-y-3 pt-4 border-t border-neutral-800">
                    {['Access to free marketplace items', 'Community forum access', 'Basic academy previews'].map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                        <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 rounded-xl text-sm transition"
                >
                  Get Started Free
                </button>
              </div>

              {/* VIP PASS TIER */}
              <div className="bg-gradient-to-b from-indigo-950/60 via-neutral-900/80 to-neutral-900/90 border-2 border-indigo-500/60 p-8 rounded-3xl space-y-6 flex flex-col justify-between relative shadow-2xl shadow-indigo-600/20">
                <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Yk.FX VIP Pass</div>
                  <div className="text-4xl font-black text-white">$29 <span className="text-sm font-normal text-neutral-400">/ month</span></div>
                  <p className="text-sm text-neutral-400">Everything professional video editors need to dominate their workflow.</p>
                  
                  <div className="space-y-3 pt-4 border-t border-neutral-800">
                    {[
                      'Unlimited access to ALL plugins & presets',
                      'Full catalog of sound effects & templates',
                      'All Academy masterclasses included',
                      'Commercial license for all downloaded assets',
                      'Early access to new releases'
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-neutral-200">
                        <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-indigo-600/40 transition"
                >
                  Unlock VIP Pass Now
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODALS & DRAWERS ================= */}

      {/* QUICK SEARCH CMD+K MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl space-y-4 p-4">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
              <Search className="w-5 h-5 text-indigo-400" />
              <input 
                autoFocus
                type="text"
                placeholder="Type to search plugins, courses, presets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
              />
              <button onClick={() => setSearchOpen(false)} className="text-neutral-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {filteredAssets.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => { setSearchOpen(false); setActiveTab('marketplace'); }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-800/60 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-xs text-neutral-400">{item.category}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-400">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SHOPPING CART SLIDER DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col justify-between p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <ShoppingBag className="w-5 h-5 text-indigo-400" />
                  <span>Your Cart ({cart.length})</span>
                </div>
                <button onClick={() => setCartOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-sm text-neutral-500 py-12">Your cart is currently empty.</p>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <div className="text-sm font-bold text-white">{item.title}</div>
                          <div className="text-xs text-indigo-400">${item.price}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setCart(cart.filter((_, i) => i !== index))}
                        className="text-neutral-500 hover:text-red-400 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between text-base font-bold">
                  <span>Total:</span>
                  <span className="text-indigo-400 font-mono">${cart.reduce((acc, item) => acc + item.price, 0)}</span>
                </div>
                <button 
                  onClick={() => { alert('Checkout simulation successful! Assets added to your vault.'); setCart([]); setCartOpen(false); }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition"
                >
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md p-8 relative space-y-6 shadow-2xl">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/40">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black">{authMode === 'login' ? 'Welcome Back' : 'Create Creator Account'}</h2>
              <p className="text-xs text-neutral-400">Access your downloads, community access, and saved presets.</p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Email Address</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="editor@creator.io" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Password</label>
                <input 
                  required
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition">
                {authMode === 'login' ? 'Sign In' : 'Sign Up Free'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

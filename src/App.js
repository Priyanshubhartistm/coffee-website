import React, { useState, useEffect, useRef } from 'react';
import {
  Coffee, ShoppingCart, Star, Menu, X, Heart, Award, Clock,
  MapPin, Phone, Mail, ArrowRight, Instagram, Facebook, Twitter,
  ChevronUp, Sun, Moon, Leaf, Flame, CupSoda, Send, Minus, Plus,
  Trash2, Eye
} from 'lucide-react';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AnimatedCounter({ target, duration = 2000, suffix = '', inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span>{count}{suffix}</span>;
}

function FadeInSection({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('brewbean-theme');
    return saved ? saved === 'dark' : true;
  });
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [statsRef, statsInView] = useInView(0.3);

  const t = darkMode
    ? {
        bg: '#0a0a0a', bgAlt: '#0f0f0f', card: '#141414', border: '#1e1e1e',
        borderHover: 'rgba(200,169,126,0.3)', text: '#f5f0eb', textMuted: '#a09890',
        textDim: '#706860', accent: '#c8a97e', accentHover: '#d4b88e',
        accentGlow: 'rgba(200,169,126,0.15)', accentBg: 'rgba(200,169,126,0.1)',
        accentBorder: 'rgba(200,169,126,0.2)', navBg: 'rgba(10,10,10,0.95)',
        overlay: 'rgba(10,10,10,0.7)', gradient1: '#0a0a0a', gradient2: 'rgba(10,10,10,0.85)',
        gradient3: 'rgba(10,10,10,0.50)', scrollTrack: '#0a0a0a', scrollThumb: '#2a2a2a',
        btnBg: '#1e1e1e', btnBorder: '#2a2a2a', footerText: '#504840'
      }
    : {
        bg: '#faf8f5', bgAlt: '#f3efe9', card: '#ffffff', border: '#e8e2da',
        borderHover: 'rgba(139,105,20,0.3)', text: '#2c2420', textMuted: '#6b5e54',
        textDim: '#9a8d82', accent: '#8b6914', accentHover: '#a07a1a',
        accentGlow: 'rgba(139,105,20,0.1)', accentBg: 'rgba(139,105,20,0.08)',
        accentBorder: 'rgba(139,105,20,0.2)', navBg: 'rgba(250,248,245,0.95)',
        overlay: 'rgba(250,248,245,0.7)', gradient1: '#faf8f5', gradient2: 'rgba(250,248,245,0.85)',
        gradient3: 'rgba(250,248,245,0.50)', scrollTrack: '#faf8f5', scrollThumb: '#d4cdc4',
        btnBg: '#f3efe9', btnBorder: '#e0d9d0', footerText: '#b8ad9f'
      };

  useEffect(() => {
    localStorage.setItem('brewbean-theme', darkMode ? 'dark' : 'light');
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
  }, [darkMode, t.bg, t.text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setVisible(true), 100);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const products = [
    { id: 1, name: 'Espresso', price: 120, rating: 4.8, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&h=600&fit=crop', desc: 'Strong & Bold', longDesc: 'Pure Italian-style espresso from single-origin Ethiopian beans. Rich crema, bold flavor, unforgettable finish.', tag: 'Bestseller', origin: 'Ethiopia' },
    { id: 2, name: 'Cappuccino', price: 150, rating: 4.9, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&h=600&fit=crop', desc: 'Creamy & Smooth', longDesc: 'Velvety steamed milk meets our signature espresso. Topped with silky microfoam art every time.', tag: 'Popular', origin: 'Italy' },
    { id: 3, name: 'Latte', price: 140, rating: 4.7, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&h=600&fit=crop', desc: 'Mild & Sweet', longDesc: 'A gentle blend of espresso and creamy steamed milk. Perfect for those who love a smooth, mellow cup.', tag: '', origin: 'France' },
    { id: 4, name: 'Mocha', price: 160, rating: 4.8, image: 'https://images.unsplash.com/photo-1579888944880-d98341245702?w=600&h=600&fit=crop', desc: 'Chocolaty Bliss', longDesc: 'Belgian chocolate meets premium espresso in this indulgent delight. Topped with whipped cream.', tag: 'New', origin: 'Yemen' },
    { id: 5, name: 'Americano', price: 130, rating: 4.6, image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=600&h=600&fit=crop', desc: 'Classic & Rich', longDesc: 'Full-bodied espresso diluted with hot water for a clean, robust flavor that coffee purists adore.', tag: '', origin: 'America' },
    { id: 6, name: 'Cold Brew', price: 180, rating: 4.9, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop', desc: 'Cool & Refreshing', longDesc: 'Slow-steeped for 18 hours using Columbian beans. Ultra-smooth with natural sweet notes. Served over ice.', tag: 'Trending', origin: 'Colombia' }
  ];

  const features = [
    { icon: <Award className="w-7 h-7" />, title: 'Premium Quality', desc: 'Behtreen beans duniya bhar se', stat: '100+', statLabel: 'Varieties' },
    { icon: <Heart className="w-7 h-7" />, title: 'Made with Love', desc: 'Har cup dil se banaya jaata hai', stat: '50K+', statLabel: 'Happy Cups' },
    { icon: <Clock className="w-7 h-7" />, title: 'Fast Service', desc: '5 minute mein tayyar', stat: '5min', statLabel: 'Avg Time' }
  ];

  const testimonials = [
    { name: 'Aarav Sharma', text: 'Best coffee in town! Har subah yahan se coffee lena mera routine ban gaya hai. Ambiance ekdum perfect hai.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', role: 'Regular Customer' },
    { name: 'Priya Patel', text: 'Cappuccino yahan ka ekdum perfect hai. Staff bahut friendly hai aur coffee ki quality consistently amazing hai.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', role: 'Coffee Lover' },
    { name: 'Rohit Verma', text: 'Cold Brew ke liye door door se aate hain log. Sach mein amazing taste! 10/10 would recommend everyone.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', role: 'Food Blogger' }
  ];

  const brewProcess = [
    { icon: <Leaf className="w-8 h-8" />, title: 'Source', desc: 'Finest beans selected from top farms across Ethiopia, Colombia & Brazil', image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=400&h=400&fit=crop' },
    { icon: <Flame className="w-8 h-8" />, title: 'Roast', desc: 'Expertly roasted in small batches to bring out the perfect flavor profile', image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=400&h=400&fit=crop' },
    { icon: <Coffee className="w-8 h-8" />, title: 'Brew', desc: 'Precision brewing by trained baristas using state-of-the-art equipment', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=400&fit=crop' },
    { icon: <CupSoda className="w-8 h-8" />, title: 'Serve', desc: 'Served fresh with love — every cup is a masterpiece in your hands', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop' }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop'
  ];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    setActiveProduct(product.id);
    setTimeout(() => setActiveProduct(null), 600);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) { setEmailSubmitted(true); setEmail(''); }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-[999]" style={{ background: t.bg }}>
        <div className="relative">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${t.accent}, ${darkMode ? '#8b6914' : '#c8a97e'})` }}>
            <Coffee className="w-10 h-10" style={{ color: darkMode ? '#0a0a0a' : '#fff' }} />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: t.accent }}></div>
        </div>
        <div className="mt-8 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: t.text }}>
          Brew <span style={{ color: t.accent }}>&</span> Bean
        </div>
        <div className="mt-3 flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: t.accent, animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ background: t.bg, color: t.text, fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <nav
        className="fixed w-full top-0 z-50 transition-all duration-700"
        style={{
          background: scrolled ? t.navBg : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? `0 4px 30px ${darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.08)'}` : 'none',
          padding: scrolled ? '12px 0' : '20px 0'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`flex items-center gap-3 transition-all duration-700 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${t.accent}, ${darkMode ? '#8b6914' : '#c8a97e'})` }}>
              <Coffee className="w-5 h-5" style={{ color: darkMode ? '#0a0a0a' : '#fff' }} />
            </div>
            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Brew <span style={{ color: t.accent }}>&</span> Bean
            </span>
          </div>

          <div className="hidden md:flex gap-8">
            {['Home', 'Menu', 'Process', 'About', 'Gallery', 'Contact'].map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative group cursor-pointer text-sm font-medium tracking-wide uppercase"
                style={{
                  color: t.textMuted,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(-20px)',
                  transition: `all 0.5s ease ${i * 0.08}s`
                }}
                onMouseEnter={e => e.currentTarget.style.color = t.accent}
                onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full" style={{ background: t.accent }}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}` }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode
                ? <Sun className="w-4 h-4" style={{ color: t.accent }} />
                : <Moon className="w-4 h-4" style={{ color: t.accent }} />
              }
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative group cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 transition-colors duration-300" style={{ color: t.textMuted }} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold" style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: t.text }}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 mx-4 p-6 rounded-2xl animate-fadeIn" style={{ background: t.card, border: `1px solid ${t.border}` }}>
            {['Home', 'Menu', 'Process', 'About', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-3 text-sm font-medium tracking-wide uppercase cursor-pointer border-b last:border-0 transition-colors duration-300"
                style={{ color: t.textMuted, borderColor: t.border }}
              >
                {item}
              </button>
            ))}
            <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${t.border}` }}>
              <span className="text-sm" style={{ color: t.textDim }}>Theme</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}` }}
              >
                {darkMode ? <Sun className="w-4 h-4" style={{ color: t.accent }} /> : <Moon className="w-4 h-4" style={{ color: t.accent }} />}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md p-6 overflow-y-auto shadow-2xl" style={{ background: t.bg, borderLeft: `1px solid ${t.border}` }}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Your Cart</h3>
              <button onClick={() => setCartOpen(false)} className="cursor-pointer" style={{ color: t.textMuted }}><X className="w-6 h-6" /></button>
            </div>
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4" style={{ color: t.border }} />
                <p style={{ color: t.textDim }}>Cart is empty</p>
                <button onClick={() => { setCartOpen(false); scrollToSection('menu'); }} className="mt-4 px-6 py-2 rounded-full text-sm font-medium cursor-pointer" style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}>Browse Menu</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-xl" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.name}</div>
                        <div className="text-sm font-bold mt-1" style={{ color: t.accent }}>₹{item.price * item.qty}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateCartQty(item.id, -1)} className="w-6 h-6 rounded flex items-center justify-center cursor-pointer" style={{ background: t.btnBg, border: `1px solid ${t.btnBorder}` }}><Minus className="w-3 h-3" /></button>
                          <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.id, 1)} className="w-6 h-6 rounded flex items-center justify-center cursor-pointer" style={{ background: t.btnBg, border: `1px solid ${t.btnBorder}` }}><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="self-start cursor-pointer" style={{ color: t.textDim }}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 rounded-xl" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                  <div className="flex justify-between mb-2 text-sm" style={{ color: t.textMuted }}><span>Subtotal</span><span>₹{cartTotal}</span></div>
                  <div className="flex justify-between mb-2 text-sm" style={{ color: t.textMuted }}><span>Tax (5%)</span><span>₹{Math.round(cartTotal * 0.05)}</span></div>
                  <div className="flex justify-between font-bold text-lg pt-3 mt-3" style={{ borderTop: `1px solid ${t.border}` }}><span>Total</span><span style={{ color: t.accent }}>₹{cartTotal + Math.round(cartTotal * 0.05)}</span></div>
                </div>
                <button className="w-full mt-6 py-4 rounded-full font-semibold text-center cursor-pointer transition-all duration-300" style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}>
                  Checkout — ₹{cartTotal + Math.round(cartTotal * 0.05)}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickView && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setQuickView(null)}></div>
          <div className="relative max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl" style={{ background: t.card, border: `1px solid ${t.border}` }}>
            <button onClick={() => setQuickView(null)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer" style={{ background: t.bg, color: t.textMuted }}><X className="w-4 h-4" /></button>
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img src={quickView.image} alt={quickView.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                {quickView.tag && <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}>{quickView.tag}</span>}
                <h3 className="text-3xl font-bold mt-3 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{quickView.name}</h3>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className={`w-4 h-4 ${j < Math.floor(quickView.rating) ? '' : ''}`} style={{ color: j < Math.floor(quickView.rating) ? t.accent : t.border, fill: j < Math.floor(quickView.rating) ? t.accent : 'none' }} />)}
                  <span className="text-sm ml-1" style={{ color: t.textDim }}>{quickView.rating}</span>
                </div>
                <p className="leading-relaxed mb-2" style={{ color: t.textMuted }}>{quickView.longDesc}</p>
                <p className="text-sm mb-6" style={{ color: t.textDim }}>Origin: {quickView.origin}</p>
                <div className="text-3xl font-bold mb-6" style={{ color: t.accent, fontFamily: "'Playfair Display', serif" }}>₹{quickView.price}</div>
                <div className="flex gap-3">
                  <button onClick={() => { addToCart(quickView); setQuickView(null); setCartOpen(true); }} className="flex-1 py-3 rounded-full font-semibold cursor-pointer transition-all duration-300" style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}>Add to Cart</button>
                  <button onClick={() => toggleFavorite(quickView.id)} className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300" style={{ background: favorites.includes(quickView.id) ? t.accentBg : t.btnBg, border: `1px solid ${favorites.includes(quickView.id) ? t.accent : t.btnBorder}` }}>
                    <Heart className="w-5 h-5" style={{ color: t.accent, fill: favorites.includes(quickView.id) ? t.accent : 'none' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1920&h=1080&fit=crop"
            alt="Coffee beans background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${t.gradient1}, ${t.gradient2}, ${t.gradient3})` }}></div>
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${t.gradient1}, transparent, transparent)` }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: t.accent }}></span>
              <span className="text-sm font-medium" style={{ color: t.accent }}>Since 2018 — Premium Coffee</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shuruaat Karen<br />
              <span className="italic" style={{ color: t.accent }}>Perfect Coffee</span><br />
              Ke Saath
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-lg leading-relaxed" style={{ color: t.textMuted }}>
              Duniya ke behtreen beans se bana har cup ek anubhav hai. Freshly roasted, expertly brewed.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('menu')}
                className="group px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer"
                style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}
              >
                Menu Dekhein
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 rounded-full font-semibold transition-all duration-300 cursor-pointer"
                style={{ border: `1px solid ${t.border}`, color: t.text }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}
              >
                Hamare Baare Mein
              </button>
            </div>

            <div className="flex gap-10 mt-14" ref={statsRef}>
              {[{ num: 10000, label: 'Customers', suffix: '+' }, { num: 15, label: 'Varieties', suffix: '+' }, { num: 4.9, label: 'Rating', suffix: '' }].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold" style={{ color: t.accent, fontFamily: "'Playfair Display', serif" }}>
                    {stat.num < 10
                      ? <>{stat.num}{stat.suffix}</>
                      : <AnimatedCounter target={stat.num} inView={statsInView} suffix={stat.suffix} />
                    }
                  </div>
                  <div className="text-sm mt-1" style={{ color: t.textDim }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`hidden md:flex justify-center transition-all duration-1000 delay-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <div className="relative">
              <div className="w-[420px] h-[420px] rounded-full overflow-hidden shadow-2xl" style={{ border: `3px solid ${t.accentBorder}`, boxShadow: `0 0 80px ${t.accentGlow}` }}>
                <img
                  src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&h=800&fit=crop"
                  alt="Latte art"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 p-4 flex items-center gap-3 rounded-2xl shadow-xl" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: t.accentBg }}>
                  <Star className="w-6 h-6" style={{ color: t.accent, fill: t.accent }} />
                </div>
                <div>
                  <div className="text-sm font-bold">Top Rated</div>
                  <div className="text-xs" style={{ color: t.textDim }}>4.9 out of 5.0</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 p-4 rounded-2xl shadow-xl" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                <div className="text-sm font-bold" style={{ color: t.accent }}>☕ Fresh Daily</div>
                <div className="text-xs" style={{ color: t.textDim }}>100% Organic Beans</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full flex justify-center pt-2" style={{ border: `2px solid ${t.accentBorder}` }}>
            <div className="w-1 h-2 rounded-full animate-pulse" style={{ background: t.accent }}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${t.bg}, ${t.bgAlt}, ${t.bg})` }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div
                  className="group p-8 rounded-2xl transition-all duration-500 h-full"
                  style={{ background: t.card, border: `1px solid ${t.border}` }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHover; e.currentTarget.style.boxShadow = `0 0 40px ${t.accentGlow}`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300" style={{ background: t.accentBg, color: t.accent }}>
                      {feature.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold" style={{ color: t.accent, fontFamily: "'Playfair Display', serif" }}>{feature.stat}</div>
                      <div className="text-xs" style={{ color: t.textDim }}>{feature.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{feature.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: t.textDim }}>{feature.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="menu" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-sm font-medium tracking-[0.2em] uppercase" style={{ color: t.accent }}>Our Collection</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hamara <span className="italic" style={{ color: t.accent }}>Menu</span>
              </h2>
              <p className="text-lg max-w-md mx-auto" style={{ color: t.textDim }}>Apni pasand ki coffee chunein — har cup ek masterpiece</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <FadeInSection key={product.id} delay={i * 0.1}>
                <div
                  className={`group rounded-2xl overflow-hidden transition-all duration-500 ${activeProduct === product.id ? 'scale-95' : ''}`}
                  style={{ background: t.card, border: `1px solid ${t.border}` }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHover; e.currentTarget.style.boxShadow = `0 0 40px ${t.accentGlow}`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    {product.tag && (
                      <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full" style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}>{product.tag}</span>
                    )}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
                      style={{ background: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}
                    >
                      <Heart className="w-4 h-4" style={{ color: favorites.includes(product.id) ? '#e74c3c' : t.textMuted, fill: favorites.includes(product.id) ? '#e74c3c' : 'none' }} />
                    </button>
                    <button
                      onClick={() => setQuickView(product)}
                      className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                      style={{ background: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}
                    >
                      <Eye className="w-4 h-4" style={{ color: t.textMuted }} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5" style={{ color: j < Math.floor(product.rating) ? t.accent : t.border, fill: j < Math.floor(product.rating) ? t.accent : 'none' }} />
                      ))}
                      <span className="text-sm ml-1" style={{ color: t.textDim }}>{product.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
                    <p className="text-sm mb-5" style={{ color: t.textDim }}>{product.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold" style={{ color: t.accent, fontFamily: "'Playfair Display', serif" }}>₹{product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-300"
                        style={{ background: t.btnBg, color: t.accent, border: `1px solid ${t.btnBorder}` }}
                        onMouseEnter={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.color = darkMode ? '#0a0a0a' : '#fff'; e.currentTarget.style.borderColor = t.accent; }}
                        onMouseLeave={e => { e.currentTarget.style.background = t.btnBg; e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.btnBorder; }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Process Section */}
      <section id="process" className="py-24 px-6" style={{ background: t.bgAlt }}>
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-sm font-medium tracking-[0.2em] uppercase" style={{ color: t.accent }}>Our Craft</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Bean se <span className="italic" style={{ color: t.accent }}>Cup</span> Tak
              </h2>
              <p className="text-lg max-w-md mx-auto" style={{ color: t.textDim }}>Har step mein perfection — yahi hamara vaada hai</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-24 left-[12.5%] right-[12.5%] h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${t.accent}, ${t.accent}, transparent)`, opacity: 0.2 }}></div>
            {brewProcess.map((step, i) => (
              <FadeInSection key={i} delay={i * 0.2}>
                <div className="text-center relative">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-6 relative group">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${t.bg}, transparent)`, opacity: 0.6 }}></div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}>
                      {step.icon}
                    </div>
                  </div>
                  <div className="text-xs font-bold mb-2 tracking-widest" style={{ color: t.accent }}>STEP {i + 1}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed max-w-[220px] mx-auto" style={{ color: t.textDim }}>{step.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=800&fit=crop"
          alt="Coffee shop ambiance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: darkMode ? 'rgba(10,10,10,0.75)' : 'rgba(250,248,245,0.8)' }}>
          <FadeInSection>
            <div className="text-center px-6">
              <h3 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="italic" style={{ color: t.accent }}>"Coffee</span> is a hug<br />in a mug"
              </h3>
              <p style={{ color: t.textDim }}>— Har sip mein pyaar</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&h=1000&fit=crop"
                    alt="Barista preparing coffee"
                    className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl shadow-2xl hidden md:block" style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}>
                  <div className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>7+</div>
                  <div className="text-sm font-medium">Saal ka Tajurba</div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div>
                <span className="text-sm font-medium tracking-[0.2em] uppercase" style={{ color: t.accent }}>Our Story</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Hamare Baare<br /><span className="italic" style={{ color: t.accent }}>Mein</span>
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: t.textMuted }}>
                  Brew & Bean mein hum vishwas rakhte hain ki har cup coffee ek kahani kehta hai.
                  Duniya ke behtreen coffee beans se lekar aapke cup tak, hum ensure karte hain ki
                  har sip perfect ho.
                </p>
                <p className="leading-relaxed mb-10" style={{ color: t.textDim }}>
                  Hamari passionate team din bhar fresh coffee banati hai jo aapke din ko special banaye.
                  Aayiye aur experience kariye coffee ka asli maza!
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Organic Beans', value: '100%' },
                    { label: 'Handcrafted', value: 'Always' },
                    { label: 'Fresh Roast', value: 'Daily' },
                    { label: 'Satisfaction', value: '100%' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                      <div className="text-xl font-bold" style={{ color: t.accent, fontFamily: "'Playfair Display', serif" }}>{item.value}</div>
                      <div className="text-xs mt-1" style={{ color: t.textDim }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6" style={{ background: t.bgAlt }}>
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-sm font-medium tracking-[0.2em] uppercase" style={{ color: t.accent }}>Moments</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hamari <span className="italic" style={{ color: t.accent }}>Gallery</span>
              </h2>
              <p className="text-lg max-w-md mx-auto" style={{ color: t.textDim }}>Cafe ke khoobsurat lamhe</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 ? 'md:row-span-2 md:h-full' : 'h-[200px] md:h-[240px]'}`}>
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center" style={{ background: `${darkMode ? 'rgba(10,10,10,0.6)' : 'rgba(250,248,245,0.6)'}` }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}>
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-sm font-medium tracking-[0.2em] uppercase" style={{ color: t.accent }}>Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hamare <span className="italic" style={{ color: t.accent }}>Customers</span>
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div
                  className="p-8 rounded-2xl transition-all duration-500 h-full"
                  style={{ background: t.card, border: `1px solid ${t.border}` }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHover}
                  onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4" style={{ fill: t.accent, color: t.accent }} />)}
                  </div>
                  <p className="leading-relaxed mb-8 text-sm" style={{ color: t.textMuted }}>"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover" style={{ border: `2px solid ${t.accentBorder}` }} />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs" style={{ color: t.textDim }}>{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=600&fit=crop"
            alt="Coffee background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: darkMode ? 'rgba(10,10,10,0.88)' : 'rgba(250,248,245,0.92)' }}></div>
        </div>
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <FadeInSection>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}` }}>
              <Mail className="w-7 h-7" style={{ color: t.accent }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Judein Hamare <span className="italic" style={{ color: t.accent }}>Coffee Club</span> Se
            </h2>
            <p className="mb-8" style={{ color: t.textMuted }}>Subscribe karein aur paayein exclusive offers, new menu updates, aur 10% discount apne pehle order par!</p>

            {emailSubmitted ? (
              <div className="inline-flex items-center gap-2 px-6 py-4 rounded-full" style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}` }}>
                <span className="text-lg">🎉</span>
                <span className="font-medium" style={{ color: t.accent }}>Thank you! Welcome to the Coffee Club!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Apna email daalein..."
                  required
                  className="flex-1 px-6 py-4 rounded-full outline-none text-sm transition-all duration-300"
                  style={{
                    background: t.card,
                    border: `1px solid ${t.border}`,
                    color: t.text
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = t.accent}
                  onBlur={e => e.currentTarget.style.borderColor = t.border}
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                  style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff' }}
                >
                  Subscribe <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <FadeInSection>
              <div>
                <span className="text-sm font-medium tracking-[0.2em] uppercase" style={{ color: t.accent }}>Get in Touch</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Hamare Saath<br /><span className="italic" style={{ color: t.accent }}>Judein</span>
                </h2>
                <p className="mb-10 leading-relaxed" style={{ color: t.textDim }}>Koi sawaal hai? Hum yahan hain aapki madad ke liye. Visit karein ya contact karein.</p>

                <div className="space-y-6">
                  {[
                    { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: '123 Coffee Street, Mumbai, Maharashtra' },
                    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 98765 43210' },
                    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hello@brewandbean.com' },
                    { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Mon-Sun: 7:00 AM - 10:00 PM' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300" style={{ background: t.card, border: `1px solid ${t.border}`, color: t.accent }}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs mb-1 uppercase tracking-wider" style={{ color: t.textDim }}>{item.label}</div>
                        <div className="font-medium" style={{ color: t.textMuted }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=700&fit=crop"
                  alt="Cafe interior"
                  className="w-full h-full min-h-[400px] object-cover"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${t.bg}, ${darkMode ? 'rgba(10,10,10,0.3)' : 'rgba(250,248,245,0.3)'}, transparent)` }}></div>
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl" style={{ background: darkMode ? 'rgba(20,20,20,0.9)' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: `1px solid ${t.border}` }}>
                  <div className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Visit Us Today</div>
                  <p className="text-sm" style={{ color: t.textDim }}>Aaiye, ek cup coffee ke saath baatein karein ☕</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8 px-6" style={{ background: t.bgAlt, borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${t.accent}, ${darkMode ? '#8b6914' : '#c8a97e'})` }}>
                  <Coffee className="w-5 h-5" style={{ color: darkMode ? '#0a0a0a' : '#fff' }} />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Brew <span style={{ color: t.accent }}>&</span> Bean
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: t.textDim }}>Premium coffee since 2018. Har cup mein quality aur pyaar.</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: t.textMuted }}>Quick Links</h4>
              <div className="space-y-3">
                {['Home', 'Menu', 'Process', 'About', 'Gallery', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-sm cursor-pointer transition-colors duration-300"
                    style={{ color: t.textDim }}
                    onMouseEnter={e => e.currentTarget.style.color = t.accent}
                    onMouseLeave={e => e.currentTarget.style.color = t.textDim}
                  >{item}</button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: t.textMuted }}>Popular</h4>
              <div className="space-y-3">
                {['Espresso', 'Cappuccino', 'Latte', 'Cold Brew'].map((item) => (
                  <p key={item} className="text-sm" style={{ color: t.textDim }}>{item}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: t.textMuted }}>Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
                  { icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
                  { icon: <Twitter className="w-4 h-4" />, label: 'Twitter' }
                ].map((social, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{ background: t.card, border: `1px solid ${t.border}`, color: t.textDim }}
                    title={social.label}
                    onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.borderHover; }}
                    onMouseLeave={e => { e.currentTarget.style.color = t.textDim; e.currentTarget.style.borderColor = t.border; }}
                  >{social.icon}</div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: t.textMuted }}>Theme</h4>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300"
                  style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, color: t.accent }}
                >
                  {darkMode ? <><Sun className="w-4 h-4" /> Light Mode</> : <><Moon className="w-4 h-4" /> Dark Mode</>}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: `1px solid ${t.border}` }}>
            <p className="text-sm" style={{ color: t.footerText }}>Made with ❤️ aur bahut saari coffee ☕</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-50 cursor-pointer transition-all duration-300 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
        style={{ background: t.accent, color: darkMode ? '#0a0a0a' : '#fff', boxShadow: `0 0 20px ${t.accentGlow}` }}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${t.scrollTrack}; }
        ::-webkit-scrollbar-thumb { background: ${t.scrollThumb}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${t.accent}; }
        input::placeholder { color: ${t.textDim}; }
      `}</style>
    </div>
  );
}

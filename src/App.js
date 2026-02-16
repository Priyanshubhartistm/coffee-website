import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingCart, Star, Menu, X, Heart, Award, Clock, MapPin, Phone, Mail, ArrowRight, Instagram, Facebook, Twitter, ChevronUp } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const products = [
    { id: 1, name: 'Espresso', price: 120, rating: 4.8, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=600&fit=crop', desc: 'Strong & Bold', tag: 'Bestseller' },
    { id: 2, name: 'Cappuccino', price: 150, rating: 4.9, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=600&fit=crop', desc: 'Creamy & Smooth', tag: 'Popular' },
    { id: 3, name: 'Latte', price: 140, rating: 4.7, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop', desc: 'Mild & Sweet', tag: '' },
    { id: 4, name: 'Mocha', price: 160, rating: 4.8, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&h=600&fit=crop', desc: 'Chocolaty Bliss', tag: 'New' },
    { id: 5, name: 'Americano', price: 130, rating: 4.6, image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&h=600&fit=crop', desc: 'Classic & Rich', tag: '' },
    { id: 6, name: 'Cold Brew', price: 180, rating: 4.9, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&h=600&fit=crop', desc: 'Cool & Refreshing', tag: 'Trending' }
  ];

  const features = [
    { icon: <Award className="w-7 h-7" />, title: 'Premium Quality', desc: 'Behtreen beans duniya bhar se', stat: '100+', statLabel: 'Varieties' },
    { icon: <Heart className="w-7 h-7" />, title: 'Made with Love', desc: 'Har cup dil se banaya jaata hai', stat: '50K+', statLabel: 'Happy Cups' },
    { icon: <Clock className="w-7 h-7" />, title: 'Fast Service', desc: '5 minute mein tayyar', stat: '5min', statLabel: 'Avg Time' }
  ];

  const testimonials = [
    { name: 'Aarav Sharma', text: 'Best coffee in town! Har subah yahan se coffee lena mera routine ban gaya hai.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', role: 'Regular Customer' },
    { name: 'Priya Patel', text: 'Cappuccino yahan ka ekdum perfect hai. Ambiance bhi bahut achha hai.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', role: 'Coffee Lover' },
    { name: 'Rohit Verma', text: 'Cold Brew ke liye door door se aate hain log. Sach mein amazing taste!', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', role: 'Food Blogger' }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    setActiveProduct(product.id);
    setTimeout(() => setActiveProduct(null), 600);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0eb]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`flex items-center gap-3 transition-all duration-700 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#c8a97e] to-[#8b6914] rounded-xl flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#0a0a0a]" />
            </div>
            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Brew <span className="text-[#c8a97e]">&</span> Bean
            </span>
          </div>

          <div className="hidden md:flex gap-8">
            {['Home', 'Menu', 'About', 'Contact'].map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[#a09890] hover:text-[#c8a97e] transition-all duration-300 text-sm font-medium tracking-wide uppercase cursor-pointer relative group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(-20px)',
                  transition: `all 0.5s ease ${i * 0.1}s`
                }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#c8a97e] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <div className="relative group cursor-pointer">
              <ShoppingCart className="w-5 h-5 text-[#a09890] group-hover:text-[#c8a97e] transition-all duration-300" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c8a97e] text-[#0a0a0a] rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                  {cart.length}
                </span>
              )}
            </div>
            <button className="md:hidden text-[#f5f0eb]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 mx-4 p-6 bg-[#141414] border border-[#2a2a2a] rounded-2xl animate-fadeIn">
            {['Home', 'Menu', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left text-[#a09890] hover:text-[#c8a97e] transition-all duration-300 py-3 text-sm font-medium tracking-wide uppercase border-b border-[#1e1e1e] last:border-0 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop"
            alt="Coffee beans"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c8a97e]/10 border border-[#c8a97e]/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-[#c8a97e] rounded-full animate-pulse"></span>
              <span className="text-[#c8a97e] text-sm font-medium">Since 2018 — Premium Coffee</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shuruaat Karen<br />
              <span className="text-[#c8a97e] italic">Perfect Coffee</span><br />
              Ke Saath
            </h1>
            <p className="text-lg md:text-xl text-[#a09890] mb-10 max-w-lg leading-relaxed">
              Duniya ke behtreen beans se bana har cup ek anubhav hai. Freshly roasted, expertly brewed.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('menu')}
                className="group bg-[#c8a97e] text-[#0a0a0a] px-8 py-4 rounded-full font-semibold hover:bg-[#d4b88e] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                Menu Dekhein
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 rounded-full font-semibold border border-[#333] text-[#f5f0eb] hover:border-[#c8a97e] hover:text-[#c8a97e] transition-all duration-300 cursor-pointer"
              >
                Hamare Baare Mein
              </button>
            </div>

            <div className="flex gap-10 mt-14">
              {[{ num: '10K+', label: 'Customers' }, { num: '15+', label: 'Varieties' }, { num: '4.9', label: 'Rating' }].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-[#c8a97e]" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.num}</div>
                  <div className="text-sm text-[#706860] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`hidden md:flex justify-center transition-all duration-1000 delay-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <div className="relative">
              <div className="w-[420px] h-[420px] rounded-full overflow-hidden border-[3px] border-[#c8a97e]/30 shadow-[0_0_80px_rgba(200,169,126,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop"
                  alt="Coffee cup"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 flex items-center gap-3 shadow-xl">
                <div className="w-12 h-12 bg-[#c8a97e]/10 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#c8a97e] fill-[#c8a97e]" />
                </div>
                <div>
                  <div className="text-sm font-bold">Top Rated</div>
                  <div className="text-xs text-[#706860]">4.9 out of 5.0</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 shadow-xl">
                <div className="text-sm font-bold text-[#c8a97e]">☕ Fresh Daily</div>
                <div className="text-xs text-[#706860]">100% Organic Beans</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#c8a97e]/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#c8a97e] rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-[#141414] border border-[#1e1e1e] p-8 rounded-2xl hover:border-[#c8a97e]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,169,126,0.08)]"
                style={{
                  animation: 'fadeInUp 0.8s ease-out',
                  animationDelay: `${i * 0.15}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-[#c8a97e]/10 rounded-2xl flex items-center justify-center text-[#c8a97e] group-hover:bg-[#c8a97e] group-hover:text-[#0a0a0a] transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#c8a97e]" style={{ fontFamily: "'Playfair Display', serif" }}>{feature.stat}</div>
                    <div className="text-xs text-[#706860]">{feature.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{feature.title}</h3>
                <p className="text-[#706860] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="menu" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#c8a97e] text-sm font-medium tracking-[0.2em] uppercase">Our Collection</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Hamara <span className="text-[#c8a97e] italic">Menu</span>
            </h2>
            <p className="text-[#706860] text-lg max-w-md mx-auto">
              Apni pasand ki coffee chunein — har cup ek masterpiece
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                className={`group bg-[#141414] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#c8a97e]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,169,126,0.08)] ${
                  activeProduct === product.id ? 'scale-95' : ''
                }`}
                style={{
                  animation: 'fadeInUp 0.8s ease-out',
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
                  {product.tag && (
                    <span className="absolute top-4 right-4 bg-[#c8a97e] text-[#0a0a0a] text-xs font-bold px-3 py-1 rounded-full">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3.5 h-3.5 ${j < Math.floor(product.rating) ? 'fill-[#c8a97e] text-[#c8a97e]' : 'text-[#333]'}`}
                      />
                    ))}
                    <span className="text-[#706860] text-sm ml-1">{product.rating}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {product.name}
                  </h3>
                  <p className="text-[#706860] text-sm mb-5">{product.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#c8a97e]" style={{ fontFamily: "'Playfair Display', serif" }}>₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#1e1e1e] text-[#c8a97e] border border-[#2a2a2a] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#c8a97e] hover:text-[#0a0a0a] hover:border-[#c8a97e] transition-all duration-300 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Image Break */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=800&fit=crop"
          alt="Coffee shop ambiance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/70 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="text-[#c8a97e] italic">"Coffee</span> is a hug<br />in a mug"
            </h3>
            <p className="text-[#706860]">— Har sip mein pyaar</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=1000&fit=crop"
                  alt="Coffee preparation"
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#c8a97e] text-[#0a0a0a] p-6 rounded-2xl shadow-2xl hidden md:block">
                <div className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>7+</div>
                <div className="text-sm font-medium">Saal ka Tajurba</div>
              </div>
            </div>

            <div>
              <span className="text-[#c8a97e] text-sm font-medium tracking-[0.2em] uppercase">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hamare Baare<br /><span className="text-[#c8a97e] italic">Mein</span>
              </h2>
              <p className="text-[#a09890] text-lg leading-relaxed mb-6">
                Brew & Bean mein hum vishwas rakhte hain ki har cup coffee ek kahani kehta hai.
                Duniya ke behtreen coffee beans se lekar aapke cup tak, hum ensure karte hain ki
                har sip perfect ho.
              </p>
              <p className="text-[#706860] leading-relaxed mb-10">
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
                  <div key={i} className="bg-[#141414] border border-[#1e1e1e] p-4 rounded-xl">
                    <div className="text-xl font-bold text-[#c8a97e]" style={{ fontFamily: "'Playfair Display', serif" }}>{item.value}</div>
                    <div className="text-xs text-[#706860] mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#c8a97e] text-sm font-medium tracking-[0.2em] uppercase">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Hamare <span className="text-[#c8a97e] italic">Customers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-[#141414] border border-[#1e1e1e] p-8 rounded-2xl hover:border-[#c8a97e]/20 transition-all duration-500"
                style={{
                  animation: 'fadeInUp 0.8s ease-out',
                  animationDelay: `${i * 0.15}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#c8a97e] text-[#c8a97e]" />
                  ))}
                </div>
                <p className="text-[#a09890] leading-relaxed mb-8 text-sm">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#c8a97e]/20"
                  />
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-[#706860]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="text-[#c8a97e] text-sm font-medium tracking-[0.2em] uppercase">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hamare Saath<br /><span className="text-[#c8a97e] italic">Judein</span>
              </h2>
              <p className="text-[#706860] mb-10 leading-relaxed">
                Koi sawaal hai? Hum yahan hain aapki madad ke liye. Visit karein ya contact karein.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: '123 Coffee Street, Mumbai, Maharashtra' },
                  { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 98765 43210' },
                  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hello@brewandbean.com' },
                  { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Mon-Sun: 7:00 AM - 10:00 PM' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-[#141414] border border-[#1e1e1e] rounded-xl flex items-center justify-center text-[#c8a97e] shrink-0 group-hover:bg-[#c8a97e] group-hover:text-[#0a0a0a] transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-[#706860] mb-1 uppercase tracking-wider">{item.label}</div>
                      <div className="text-[#a09890] font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&h=700&fit=crop"
                alt="Cafe interior"
                className="w-full h-full min-h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-[#141414]/90 backdrop-blur-sm border border-[#2a2a2a] rounded-xl p-5">
                <div className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Visit Us Today</div>
                <p className="text-[#706860] text-sm">Aaiye, ek cup coffee ke saath baatein karein ☕</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] border-t border-[#1e1e1e] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#c8a97e] to-[#8b6914] rounded-xl flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-[#0a0a0a]" />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Brew <span className="text-[#c8a97e]">&</span> Bean
                </span>
              </div>
              <p className="text-[#706860] text-sm leading-relaxed">
                Premium coffee since 2018. Har cup mein quality aur pyaar.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#a09890]">Quick Links</h4>
              <div className="space-y-3">
                {['Home', 'Menu', 'About', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-[#706860] hover:text-[#c8a97e] transition-colors text-sm cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#a09890]">Popular</h4>
              <div className="space-y-3">
                {['Espresso', 'Cappuccino', 'Latte', 'Cold Brew'].map((item) => (
                  <p key={item} className="text-[#706860] text-sm">{item}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#a09890]">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
                  { icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
                  { icon: <Twitter className="w-4 h-4" />, label: 'Twitter' }
                ].map((social, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-[#141414] border border-[#1e1e1e] rounded-xl flex items-center justify-center text-[#706860] hover:text-[#c8a97e] hover:border-[#c8a97e]/30 transition-all duration-300 cursor-pointer"
                    title={social.label}
                  >
                    {social.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#1e1e1e] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#504840] text-sm">
              © 2026 Brew & Bean. All rights reserved.
            </p>
            <p className="text-[#504840] text-sm">
              Made with ❤️ aur bahut saari coffee ☕
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-[#c8a97e] text-[#0a0a0a] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(200,169,126,0.3)] transition-all duration-300 z-50 cursor-pointer ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #c8a97e;
        }
      `}</style>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingCart, Star, Menu, X, Heart, Award, Clock } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  const products = [
    { id: 1, name: 'Espresso', price: 120, rating: 4.8, image: '☕', desc: 'Strong & Bold' },
    { id: 2, name: 'Cappuccino', price: 150, rating: 4.9, image: '☕', desc: 'Creamy & Smooth' },
    { id: 3, name: 'Latte', price: 140, rating: 4.7, image: '☕', desc: 'Mild & Sweet' },
    { id: 4, name: 'Mocha', price: 160, rating: 4.8, image: '☕', desc: 'Chocolaty Bliss' },
    { id: 5, name: 'Americano', price: 130, rating: 4.6, image: '☕', desc: 'Classic & Rich' },
    { id: 6, name: 'Cold Brew', price: 180, rating: 4.9, image: '🧋', desc: 'Cool & Refreshing' }
  ];

  const features = [
    { icon: <Award className="w-8 h-8" />, title: 'Premium Quality', desc: 'Behtreen beans' },
    { icon: <Heart className="w-8 h-8" />, title: 'Made with Love', desc: 'Dil se banaya' },
    { icon: <Clock className="w-8 h-8" />, title: 'Fast Service', desc: 'Jaldi delivery' }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-amber-900 shadow-2xl py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className={`flex items-center gap-2 text-2xl font-bold text-white transition-all duration-500 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <Coffee className="w-8 h-8 animate-bounce" style={{animationDuration: '2s'}} />
            <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Cafe Delight</span>
          </div>
          
          <div className="hidden md:flex gap-6">
            {['Home', 'Menu', 'About', 'Contact'].map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-white hover:text-amber-300 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 cursor-pointer"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(-20px)',
                  transition: `all 0.5s ease ${i * 0.1}s`
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <ShoppingCart className="w-6 h-6 cursor-pointer text-white hover:text-amber-300 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                  {cart.length}
                </span>
              )}
            </div>
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="animate-spin" style={{animationDuration: '0.3s'}} /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 px-4 pb-4 bg-amber-900 animate-fadeIn">
            {['Home', 'Menu', 'About', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-white hover:text-amber-300 transition-all duration-300 hover:translate-x-2 text-left cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Floating Coffee Beans */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-6xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ☕
            </div>
          ))}
        </div>

        <div className={`relative max-w-6xl mx-auto text-center transition-all duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
            Shuruaat Karen Apne Din Ki<br />
            <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Behtreen Coffee Ke Saath</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-100 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Taaza pisi hui beans se bana har cup ek anubhav hai ✨
          </p>
          <a href="#menu">
            <button className="bg-white text-amber-900 px-10 py-4 rounded-full font-semibold hover:bg-amber-100 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              Menu Dekhein 🚀
            </button>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl group"
              style={{
                animation: 'fadeInUp 0.8s ease-out',
                animationDelay: `${i * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="text-amber-900 mb-4 flex justify-center transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-amber-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="menu" className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-amber-900 animate-fadeInUp">
            Hamara Menu
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            Apni pasand ki coffee chunein 💖
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:-rotate-1 transition-all duration-500 hover:shadow-2xl group"
                style={{
                  animation: 'fadeInUp 0.8s ease-out',
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 h-52 flex items-center justify-center text-9xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent"></div>
                  <span className="transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">
                    {product.image}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1 text-amber-900 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{product.desc}</p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-all duration-300 transform hover:scale-125`}
                      />
                    ))}
                    <span className="text-gray-700 ml-1 font-semibold">{product.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-amber-900">₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-amber-900 to-orange-900 text-white px-6 py-3 rounded-full hover:from-amber-800 hover:to-orange-800 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gradient-to-r from-amber-100 to-orange-100 py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8 text-amber-900 animate-fadeInUp">Hamare Baare Mein</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Cafe Delight mein hum vishwas rakhte hain ki har cup coffee ek kahani kehta hai. 
            Duniya ke behtreen coffee beans se lekar aapke cup tak, hum ensure karte hain ki 
            har sip perfect ho. ☕
          </p>
          <p className="text-lg text-gray-700 leading-relaxed animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            Hamari passionate team din bhar fresh coffee banati hai jo aapke din ko special banaye. 
            Aayiye aur experience kariye coffee ka asli maza! 🌟
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 text-amber-900 animate-fadeInUp">Hamare Saath Judein</h2>
          <div className="bg-white p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div className="space-y-4 text-lg text-gray-700">
              <p className="transform hover:translate-x-2 transition-all duration-300">📍 123 Coffee Street, Mumbai, Maharashtra</p>
              <p className="transform hover:translate-x-2 transition-all duration-300">📞 +91 98765 43210</p>
              <p className="transform hover:translate-x-2 transition-all duration-300">✉️ hello@cafedelight.com</p>
              <p className="transform hover:translate-x-2 transition-all duration-300">🕒 Mon-Sun: 7:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-10 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10">
          <div className="flex justify-center gap-2 mb-4 text-3xl">
            <Coffee className="animate-bounce" style={{animationDelay: '0s', animationDuration: '2s'}} />
            <Coffee className="animate-bounce" style={{animationDelay: '0.2s', animationDuration: '2s'}} />
            <Coffee className="animate-bounce" style={{animationDelay: '0.4s', animationDuration: '2s'}} />
          </div>
          <p className="text-xl font-semibold mb-2">© 2026 Cafe Delight</p>
          <p className="text-amber-200">Coffee ke saath bana ❤️ aur pyaar se serve kiya ☕</p>
        </div>
      </footer>

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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
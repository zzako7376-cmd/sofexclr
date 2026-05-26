import { Flame, ShoppingCart, Sparkles, MessageCircle, Instagram, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10">
      {/* Dynamic top bar with official support contacts */}
      <div className="bg-neutral-950 border-b border-white/5 py-2 text-[11px] sm:text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row-reverse justify-between items-center gap-2">
          {/* Support Phone Numbers */}
          <div className="flex items-center gap-3">
            <span className="text-gray-500 hidden md:inline">اتصل بنا للاستفسار:</span>
            <a href="tel:0655110977" className="hover:text-orange-400 font-black tracking-wider flex items-center gap-1 transition-colors">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>0655110977</span>
            </a>
            <span className="text-gray-700">|</span>
            <a href="tel:0540330093" className="hover:text-orange-400 font-black tracking-wider flex items-center gap-1 transition-colors">
              <Phone className="w-3.5 h-3.5 text-pink-500" />
              <span>0540330093</span>
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/sofex03?igsh=eHk4ZmFhN2theHd6" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-pink-400 flex items-center gap-1 transition-colors font-bold"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>انستجرام (sofex03)</span>
            </a>
            <span className="text-gray-700">|</span>
            <a 
              href="https://wa.me/213655110977" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>واتساب للاستفسار الفوري</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => scrollToSection("hero")}>
              <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 via-orange-500 to-amber-500 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
              <img
                src="https://i.postimg.cc/Y0hMc7F7/photo-2025-10-17-20-22-46.jpg"
                alt="Sofex Logo"
                className="relative w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xl font-black bg-gradient-to-r from-white via-pink-400 to-orange-400 bg-clip-text text-transparent tracking-tighter uppercase">
                SOFEX
              </span>
              <span className="text-xs font-semibold text-gray-400">
                أفراح ومناسبات 🎉
              </span>
            </div>
          </div>

          {/* Quick Info & Highlights */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-300 uppercase tracking-wider">
            <button 
              onClick={() => scrollToSection("features")} 
              className="hover:text-pink-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              المميزات
            </button>
            <button 
              onClick={() => scrollToSection("order-form")} 
              className="hover:text-orange-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-orange-500" />
              ألوان التميز
            </button>
            <button 
              onClick={() => scrollToSection("reviews")} 
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              آراء العملاء
            </button>
          </nav>

          {/* Call to action button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("order-form")}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 via-pink-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-5 py-2.5 rounded-full text-sm font-black shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
              id="nav-cta-btn"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>اطلب الآن</span>
            </motion.button>
          </div>

        </div>
      </div>
    </header>
  );
}

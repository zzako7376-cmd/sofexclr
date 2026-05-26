import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowDownCircle, Heart, Star, ShoppingBag, ShieldCheck } from "lucide-react";
import { ColorOption } from "../types";
import { COLORS_DATA, DISCOUNTED_PRICE, BASE_PRICE } from "../data";

interface HeroProps {
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
}

export default function Hero({ selectedColor, onSelectColor }: HeroProps) {
  // Simple countdown timer state for scarcity and urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 }; // resets
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToOrder = () => {
    const element = document.getElementById("order-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-[#0A0A0A] py-6 sm:py-8 lg:py-12 border-b border-white/5">
      
      {/* Absolute Decorative Background Powder Spot */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[400px] h-[400px] rounded-full filter blur-[120px] opacity-25 transition-all duration-1000"
        style={{ backgroundColor: selectedColor.accentHex }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* We use flex-col-reverse to display the image on top for mobile screens, and side-by-side on desktop */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-12 items-center">
          
          {/* Column 1: Concise Copy and Direct Order CTA */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center text-right space-y-4">
            
            {/* Super Slim Badge */}
            <div className="inline-flex items-center gap-1.5 self-start bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 rounded-full text-orange-400 text-[11px] font-black">
              <Sparkles className="w-3 h-3 text-orange-400 animate-pulse" />
              <span>المنتج الأصلي الأكثر طلباً لعام 2026 🇩🇿</span>
            </div>

            {/* Concise bold headlines preventing clutter */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter text-white leading-tight">
                طفاية ألوان الأفراح <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">سوفكس SOFEX 2kg</span>
              </h1>
            </div>

            {/* Minimal High-impact description */}
            <p className="text-xs sm:text-sm text-gray-300 font-bold leading-relaxed max-w-xl">
              اصنعوا لوحة أسطورية لا تُنسى في أعراسكم ومناسباتكم مع طفايات الألوان الأصلية. إطلاق كثيف، ألوان نابضة، صديقة تماماً للبشرة وسهلة التنظيف بنفضة خفيفة!
            </p>

            {/* Quick Price Spotlight */}
            <div className="bg-neutral-900/90 border border-white/5 p-3 rounded-xl max-w-sm flex items-center justify-between shadow-md">
              <div>
                <span className="text-[10px] text-gray-400 font-black block">السعر المخفض والتوصيل سريع ⏱️</span>
                <span className="text-xl sm:text-2xl font-black text-rose-400">2900 دج <span className="text-xs text-gray-400 font-normal">فقط</span></span>
              </div>
              <div className="text-left font-mono text-xs text-gray-500 line-through">
                4500 دج
              </div>
            </div>

            {/* Sleek Color Dot indicator just to show variety */}
            <div className="flex items-center gap-2 pt-1 text-xs text-gray-400 font-bold">
              <span>متوفر بجميع الألوان الزاهية:</span>
              <div className="flex gap-1">
                {COLORS_DATA.map((c) => (
                  <span 
                    key={c.id} 
                    className={`w-3 h-3 rounded-full ${c.colorCode} border border-white/10`}
                    title={c.name}
                  ></span>
                ))}
              </div>
            </div>

            {/* Direct Order Button leading instantly to the checkout form */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToOrder}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-pink-500 to-rose-600 text-white text-xs sm:text-sm font-black px-6 py-4 rounded-xl shadow-lg shadow-pink-500/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>اطلب مباااشرة الآن (الدفع عند الاستلام) 🛒</span>
              </motion.button>
              
              <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 mt-2">
                <span>⚡ شحن سريع لـ 58 ولاية</span>
                <span>•</span>
                <span>💵 الدفع عند استلام الطرد</span>
              </div>
            </div>

          </div>

          {/* Column 2: Large Standalone Image Showcase with Free Snow Bottle promotion */}
          <div className="w-full lg:w-5/12 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-center">
            
            {/* The main container of product visual: Elegant, standalone, 100% visible, takes peak priority */}
            <div className="relative z-10 w-full max-w-[280px] sm:max-w-xs">
              <span className="text-gray-400 text-[10px] font-black block text-center mb-1">طفاية الألوان الأصلية (2 كغ) 🌟</span>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-neutral-950"
              >
                <img
                  src="https://i.postimg.cc/PJQqLXsm/photo-2026-05-25-18-17-26.jpg"
                  alt="Sofex Celebration Extinguisher Colors"
                  className="w-full h-auto object-contain rounded-2xl block transition-transform duration-500 hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              {/* Discrete premium banner tag */}
              <div className="absolute top-7 right-3 bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 text-white px-2 py-0.5 rounded-lg text-[9px] font-black shadow-lg border border-white/10">
                2 كغ الأصلي
              </div>
            </div>

            {/* NEW Promotional Free Gift Image: Snow Bottle free when buying a 2kg color fire extinguisher */}
            <div className="relative z-10 w-full max-w-[280px] sm:max-w-xs">
              <span className="text-pink-400 text-[10px] font-black block text-center mb-1">🎁 هدية مجانية: قارورة ثلج مضافة عند شراء قارورتين 2kg أو أكثر!</span>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="overflow-hidden rounded-2xl border-2 border-pink-500/30 shadow-[0_0_20px_rgba(219,39,119,0.15)] bg-neutral-950"
              >
                <img
                  src="https://i.postimg.cc/2j2zb8VX/photo-2026-05-25-21-16-26.jpg"
                  alt="Free Snow Bottle Gift"
                  className="w-full h-auto object-contain rounded-2xl block transition-transform duration-500 hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <div className="absolute top-7 right-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-2 py-0.5 rounded-lg text-[9px] font-black shadow-lg border border-white/10 animate-bounce">
                مـجـانـاً 🎁
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}

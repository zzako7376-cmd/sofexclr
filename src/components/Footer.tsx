import { ChevronRight, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-8 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
        {/* Safety Measures */}
        <div className="py-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-950/40 text-orange-500 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-200">تعليمات التخزين الصحيحة</h4>
              <p className="text-[11px] text-gray-400 max-w-xl mt-0.5 font-medium">
                يرجى تخزين طفاية الألوان في مكان جاف وبارد بعيداً عن الرطوبة المباشرة أو مصادر الحرارة المرتفعة لضمان بقاء البودرة جافة وخفيفة قبل يوم الحفل.
              </p>
            </div>
          </div>
 
          <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-gray-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>منتج Sofex الأصلي حاصل على تراخيص الجودة والتحليل الكيميائي لغازات الدفع الآمنة.</span>
          </div>
        </div>
 
        {/* Support Grid */}
        <div className="py-8 border-b border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6 text-right text-xs">
          <div>
            <h5 className="font-black text-gray-400 mb-2">📞 أرقام دعم المبيعات والاستفسار</h5>
            <div className="space-y-1.5">
              <a href="tel:0655110977" className="block text-white hover:text-orange-400 font-black font-mono transition-colors">0655110977</a>
              <a href="tel:0540330093" className="block text-white hover:text-orange-400 font-black font-mono transition-colors">0540330093</a>
            </div>
          </div>
          <div>
            <h5 className="font-black text-gray-400 mb-2">📸 انستجرام الرسمي للشركة</h5>
            <a 
              href="https://www.instagram.com/sofex03?igsh=eHk4ZmFhN2theHd6" 
              target="_blank" 
              rel="noreferrer" 
              className="text-orange-400 hover:text-orange-300 font-black block transition-colors"
            >
              @sofex03
            </a>
          </div>
          <div>
            <h5 className="font-black text-gray-400 mb-2">💬 واتساب للاستفسار والطلب الفوري</h5>
            <a 
              href="https://wa.me/213655110977" 
              target="_blank" 
              rel="noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 font-black block transition-colors"
            >
              0655110977
            </a>
          </div>
        </div>

        {/* Brand Signoff */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-2">
            <img 
              src="https://i.postimg.cc/Y0hMc7F7/photo-2025-10-17-20-22-46.jpg" 
              alt="Sofex Logo" 
              className="w-8 h-8 rounded-full object-cover filter brightness-90 border border-white/20"
              referrerPolicy="no-referrer"
            />
            <span className="text-sm font-black tracking-wider text-gray-400">SOFEX CELEBRATIONS © 2026</span>
          </div>
          <p className="text-xs text-gray-500">
            صمم بكل الحب بالأفراح والمسرات لشركة Sofex. جميع الحقوق محفوظة. 🌟
          </p>
        </div>

      </div>
    </footer>
  );
}

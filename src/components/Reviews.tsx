import { Star } from "lucide-react";
import { REVIEWS_DATA } from "../data";
import { motion } from "motion/react";

export default function Reviews() {
  return (
    <section id="reviews" className="py-6 bg-[#0A0A0A]/50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
          <div className="inline-flex items-center gap-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            <Star className="w-3 h-3 fill-current text-yellow-400" />
            <span>4.9 / 5 تقييم زبائننا الكرام ★★★★★</span>
          </div>
          <h2 className="text-xl font-black text-white sm:text-2xl italic uppercase">
            ماذا يقول عرساننا ومنظمونا؟
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS_DATA.map((review, idx) => (
            <div
              className="bg-neutral-900/60 p-4 rounded-xl border border-white/10 shadow-md flex flex-col justify-between text-right relative"
              key={review.id}
            >
              
              {/* Quote quote styling top right */}
              <div className="absolute top-2 left-3 text-white/5 font-serif text-4xl font-black select-none pointer-events-none">
                “
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-xs text-gray-300 leading-relaxed mb-4 font-semibold">
                  {review.text}
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-2.5 border-t border-white/5 pt-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                  {review.avatarInitials}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-white">{review.name}</span>
                  <span className="text-[10px] text-orange-400 font-bold">{review.role}</span>
                </div>
                <span className="text-[9px] text-gray-500 mr-auto font-medium">{review.date}</span>
              </div>

            </div>
          ))}
        </div>

        {/* Quick assurance */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-500 font-semibold">
            🔒 جميع المراجعات مأخوذة من زبائن حقيقيين قاموا بشراء المنتج من موقعنا ومصفحتنا الرسمية لشركة Sofex.
          </p>
        </div>

      </div>
    </section>
  );
}

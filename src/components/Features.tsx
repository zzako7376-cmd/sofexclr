import { ShieldCheck, HeartPulse, Recycle, Scale, Award, PartyPopper } from "lucide-react";
import { motion } from "motion/react";

export default function Features() {
  const cards = [
    {
      icon: <Scale className="w-8 h-8 text-pink-500" />,
      title: "صيغة 2 كيلوغرام الوافرة",
      description: "قارورتنا الكبيرة تمنحك ضغطاً إضافياً يستمر لوقت كافٍ لالتقاط الفيديوهات الملتوية والصور الاحترافية من زوايا متعددة دون قلق النفاد الفوري."
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-purple-500" />,
      title: "آمنة 100% طبيعية وصديقة للبشرة",
      description: "صُنعت البودرة الملوّنة لدينا بالكامل من نشاء الذرة العضوي ومستخلصات ألوان غذائية آمنة تمامًا للجلد، العيون، والشعر."
    },
    {
      icon: <Recycle className="w-8 h-8 text-cyan-500" />,
      title: "سهلة التنظيف والتطهير الفوري",
      description: "لا مزيد من القلق بشان فستان العروس الأبيض أو بدلات الزفاف! تنفض الملابس ببسلاسة وبساطة تامة."
    }
  ];

  return (
    <section id="features" className="py-6 bg-[#0A0A0A] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-1">
          <h2 className="text-2xl font-black text-white sm:text-3xl uppercase tracking-tighter italic">
            سر التميز في <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">سوفكس SOFEX</span>
          </h2>
          <p className="text-xs text-gray-400 font-bold">
            تجمع طفايات ألوان Sofex سعة 2 كغ بين الحجم الوافر وأعلى معايير التسلية الآمنة لجميع ضيوفك.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, idx) => (
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              key={idx}
              className="relative p-5 bg-neutral-900/60 border border-white/10 rounded-xl text-right group"
            >
              {/* Icon frame */}
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300 pointer-events-none">
                {card.icon}
              </div>
              
              <h3 className="text-base font-extrabold text-white mb-2.5">
                {card.title}
              </h3>
              
              <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

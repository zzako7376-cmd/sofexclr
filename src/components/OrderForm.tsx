import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, Phone, MapPin, Truck, Gift, ShoppingCart, BadgePercent, CheckCircle2, 
  ChevronDown, HelpCircle, Sparkles, Send, X, AlertCircle, ShoppingBag 
} from "lucide-react";
import { ColorOption, OrderData, Province } from "../types";
import { COLORS_DATA, PROVINCES_DATA, DISCOUNTED_PRICE, BASE_PRICE, FREE_SHIPPING_THRESHOLD, getProductPriceForQuantity } from "../data";

interface OrderFormProps {
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
}

export default function OrderForm({ selectedColor, onSelectColor }: OrderFormProps) {
  // Input fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [provinceId, setProvinceId] = useState(PROVINCES_DATA[0].id);
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(2); // default to 2

  // Multi-color support state
  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([selectedColor.id]);

  // Sync with prop when it changes
  useEffect(() => {
    if (!selectedColorIds.includes(selectedColor.id)) {
      setSelectedColorIds([selectedColor.id]);
    }
  }, [selectedColor]);

  const handleToggleColor = (colorId: string) => {
    let nextList: string[];
    if (selectedColorIds.includes(colorId)) {
      if (selectedColorIds.length === 1) return; // Keep at least one selected
      nextList = selectedColorIds.filter(id => id !== colorId);
      // Update parent visual context with the last selected color
      const lastColor = COLORS_DATA.find(c => c.id === nextList[nextList.length - 1]);
      if (lastColor) onSelectColor(lastColor);
    } else {
      nextList = [...selectedColorIds, colorId];
      const addedColor = COLORS_DATA.find(c => c.id === colorId);
      if (addedColor) onSelectColor(addedColor);
    }
    setSelectedColorIds(nextList);
  };

  // Statuses
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<OrderData | null>(null);
  const [pastOrders, setPastOrders] = useState<OrderData[]>([]);

  // Load past orders from localStorage to simulate persistence
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sofex_orders");
      if (stored) {
        setPastOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load past orders", e);
    }
  }, []);

  const selectedProvince = PROVINCES_DATA.find(p => p.id === provinceId) || PROVINCES_DATA[0];

  // Dynamic calculations
  // Tiered Pricing:
  // - 1 unit: 2900 دج
  // - 2 units: 5500 دج (Saves 300 دج)
  // - 3 units: 7900 دج (Saves 800 دج)
  // - 3+ units: Free Shipping too!
  const unitPrice = DISCOUNTED_PRICE;
  const rawSubtotal = unitPrice * quantity;
  
  const discountedProductSubtotal = getProductPriceForQuantity(quantity);
  const discountAmount = Math.max(0, rawSubtotal - discountedProductSubtotal);
  const discountPercent = discountAmount > 0 ? Math.round((discountAmount / rawSubtotal) * 100) : 0;

  // Free shipping threshold (3 or more)
  const isFreeShipping = quantity >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : selectedProvince.shippingFee;
  const finalTotal = discountedProductSubtotal + shippingFee;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Handle Order Submit
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validations
    if (!fullName.trim() || fullName.trim().length < 4) {
      setErrorMsg("الرجاء إدخال اسمك الكامل بشكل صحيح (4 أحرف على الأقل).");
      return;
    }

    const phoneRegex = /^(05|06|07|02|03|04)[0-9]{8}$/;
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!cleanPhone.match(/^[0-9]+$/) || cleanPhone.length < 9 || cleanPhone.length > 11) {
      setErrorMsg("الرجاء إدخال رقم هاتف صحيح ومفتوح لنتمكن من الاتصال بك للتحقق.");
      return;
    }

    if (!address.trim() || address.trim().length < 8) {
      setErrorMsg("الرجاء تحديد عنوان التسليم بالتفصيل (مثل: الحي، واجهة المحل أو الشقة).");
      return;
    }

    // Real Order Submit via Backend Proxy (to Telegram)
    setIsSubmitting(true);

    const chosenColorsNames = COLORS_DATA.filter(c => selectedColorIds.includes(c.id)).map(c => c.name);
    const chosenColorsString = chosenColorsNames.join(" + ");

    const newOrder: OrderData = {
      fullName: fullName.trim(),
      phone: cleanPhone,
      province: selectedProvince.nameAr,
      address: address.trim(),
      quantity,
      selectedColor: chosenColorsString
    };

    fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newOrder,
        finalTotal
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to post order");
      }
      return res.json();
    })
    .then(() => {
      try {
        const updated = [newOrder, ...pastOrders];
        localStorage.setItem("sofex_orders", JSON.stringify(updated));
        setPastOrders(updated);
      } catch (e) {
        console.error("Failed to save order to localStorage", e);
      }

      setOrderSuccess(newOrder);
      
      // Reset Form fields for security/privacy
      setFullName("");
      setPhone("");
      setAddress("");
      setQuantity(2);
    })
    .catch((err) => {
      console.error("Error submitting order:", err);
      setErrorMsg("حدث فشل غير متوقع أثناء إرسال طلبك. يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const getTicketNum = () => {
    return `SFX-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  return (
    <section id="order-form" className="py-24 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-10 w-24 h-24 bg-pink-500/10 rounded-full mix-blend-screen opacity-30 filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full mix-blend-screen opacity-25 filter blur-xl"></div>

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 relative z-10">
          <h2 className="text-3xl font-black text-white sm:text-5xl uppercase tracking-tighter italic">
            أكّد طلبك في أقل من <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">30 ثانية ⚡</span>
          </h2>
          <p className="text-sm text-gray-400 font-bold leading-relaxed">
            الشحن سريع لباب بيتك والدفع عند الاستلام. املأ الاستمارة الآن وسنتصل بك في أقل من ساعتين لتأكيد المقاسات وتاريخ حفلتك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Right Column: Order Form Inputs */}
          <div className="lg:col-span-7 bg-neutral-900/60 p-6 sm:p-10 rounded-[32px] border border-white/10 shadow-2xl">
            
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              
              {errorMsg && (
                <div className="bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs sm:text-sm p-4 rounded-2xl flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-bold">{errorMsg}</span>
                </div>
              )}

              {/* 1. Full Name */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-extrabold text-gray-300 flex items-center gap-1.5 justify-start">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>الاسم واللقب الكامل</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: حمزة بن عيسى"
                  className="w-full text-right bg-[#141414] border border-white/10 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white focus:bg-neutral-950 focus:border-orange-500 focus:outline-none transition-all placeholder:text-gray-600"
                />
              </div>

              {/* 2. Phone Number */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-extrabold text-gray-300 flex items-center gap-1.5 justify-start">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>رقم الهاتف المفتوح</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: 0555331122 أو 0661234567"
                  className="w-full text-right bg-[#141414] border border-white/10 rounded-2xl px-4 py-3.5 text-sm font-black tracking-widest text-white focus:bg-neutral-950 focus:border-orange-500 focus:outline-none transition-all placeholder:text-gray-600 font-mono"
                />
                <p className="text-[10px] text-gray-400 text-right font-medium">
                  الرجاء تدوين رقم هاتف شغال، حيث سنتصل بك هاتفيًا لتثبيت العنوان قبل إطلاق الطرد.
                </p>
              </div>

              {/* 3. Color Sync Selection */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs sm:text-sm font-extrabold text-gray-300 flex items-center gap-1 justify-start">
                    <span>الألوان المطلوبة للقارورات (اضغط لتحديد لون أو أكثر)</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-orange-400 font-extrabold bg-orange-500/10 px-2 py-0.5 rounded-full select-none self-start">
                    💡 يمكنك تحديد عدة ألوان معاً في طلب واحد!
                  </span>
                </div>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2">
                  {COLORS_DATA.map((color) => {
                    const isSelected = selectedColorIds.includes(color.id);
                    return (
                      <button
                        type="button"
                        key={color.id}
                        onClick={() => handleToggleColor(color.id)}
                        className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-orange-500 bg-orange-500/15 text-white font-black shadow-md scale-[1.02]" 
                            : "border-white/10 bg-[#141414] text-gray-400 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full ${color.colorCode} mb-1.5 shadow-inner relative flex items-center justify-center`}>
                          {isSelected && (
                            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black flex items-center justify-center shadow-sm">
                              <span className="w-1 h-1 bg-white rounded-full"></span>
                            </span>
                          )}
                        </span>
                        <span className="text-[11px] truncate w-full text-center font-bold">{color.name}</span>
                        {isSelected && (
                          <span className="absolute top-1 left-2 text-[8px] bg-orange-500 text-white px-1.5 py-0.2 rounded-full font-black scale-90">
                            محدد ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamically display Selected Combination summary */}
                {selectedColorIds.length > 1 && (
                  <div className="bg-neutral-950/80 p-3 rounded-2xl border border-white/5 text-xs text-orange-300 font-bold text-right flex flex-col gap-1">
                    <div className="text-pink-400 font-black">🎉 تشكيلة ألوان مدمجة:</div>
                    <div className="text-white font-black leading-relaxed">
                      {COLORS_DATA.filter(c => selectedColorIds.includes(c.id)).map(c => c.name).join(" + ")}
                    </div>
                    <div className="text-[10px] text-gray-400 font-normal">سنفترض تقسيم كمية الطلب بالتساوي بين الألوان المحددة عند تأكيد المكالمة الهاتفية!</div>
                  </div>
                )}
              </div>

              {/* 4. Quantity Section */}
              <div className="bg-[#141414] rounded-2xl p-4 flex items-center justify-between border border-white/10">
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-extrabold text-white block">حدد الكمية الكافية:</span>
                  <span className="text-[10px] text-gray-400 font-medium">مثال: 2 لقوس ألوان متجانس أو 3 لمناسبات كبرى</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 hover:bg-neutral-800 flex items-center justify-center font-black text-lg text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xl font-black text-white w-8 text-center font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 hover:bg-neutral-800 flex items-center justify-center font-black text-lg text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 5. Province / State Selection */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-extrabold text-gray-300 flex items-center gap-1.5 justify-start">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>الولاية / مدينة التسليم</span>
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={provinceId}
                    onChange={(e) => setProvinceId(e.target.value)}
                    className="w-full text-right bg-[#141414] border border-white/10 text-white rounded-2xl px-4 py-3.5 text-sm font-bold focus:bg-neutral-950 focus:border-orange-500 focus:outline-none appearance-none cursor-pointer"
                  >
                    {PROVINCES_DATA.map((prov) => (
                      <option key={prov.id} value={prov.id} className="bg-neutral-900 text-white">
                        {prov.nameAr} ({prov.shippingFee === 0 ? "شحن مجاني" : `+ ${prov.shippingFee} دج`})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 6. Detail Address */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-extrabold text-gray-300 flex items-center gap-1.5 justify-start">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>العنوان المكتمل بالتفصيل</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="مثال: حي الصنوبر، عمارة 4ب، رقم الطابق الثاني"
                  className="w-full text-right bg-[#141414] border border-white/10 text-white rounded-2xl px-4 py-3.5 text-sm font-semibold focus:bg-neutral-950 focus:border-orange-500 focus:outline-none transition-all placeholder:text-gray-600"
                />
              </div>

              {/* Submit CTA button */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-pink-600 text-white font-black text-md py-4 rounded-2xl shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  id="checkout-submit-btn"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>تأكيد طلب طفايات الألوان الآن</span>
                    </>
                  )}
                </motion.button>
              </div>

            </form>

          </div>

          {/* Left Column: Live Bill calculation & Special Bundles */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Realtime invoice calculator */}
            <div className="bg-neutral-900/60 text-white p-6 sm:p-8 rounded-[32px] border border-white/10 shadow-2xl space-y-4">
              <h3 className="text-md sm:text-lg font-bold border-b border-white/5 pb-4 text-right flex items-center justify-between">
                <span className="text-xs bg-orange-500/10 border border-orange-500/20 text-orange-400 font-extrabold px-2.5 py-1 rounded-full">سعة 2 كغ للواحدة</span>
                <span>تفاصيل الفاتورة السريعة 🧾</span>
              </h3>

              <div className="space-y-3 font-medium text-sm text-gray-300 text-right">
                
                {/* Regular line item */}
                <div className="flex justify-between items-center">
                  <span className="font-mono text-white">{unitPrice} دج</span>
                  <span>سعر القارورة الممتازة</span>
                </div>

                {/* Quantitative breakdown */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono">{rawSubtotal} دج</span>
                  <span className="text-gray-400">المجموع الأساسي ({quantity} وحدات)</span>
                </div>

                {/* Bulk Percent discounts */}
                {discountPercent > 0 && (
                  <div className="flex justify-between items-center text-xs text-pink-400">
                    <span className="font-mono font-bold">-{discountAmount} دج</span>
                    <span className="flex items-center gap-1">
                      <BadgePercent className="w-4 h-4" />
                      <span>خصم الشراء المتعدد (-{discountPercent}%)</span>
                    </span>
                  </div>
                )}

                {/* Shipping Fees line */}
                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  {isFreeShipping ? (
                    <span className="text-green-400 font-bold">مـجـانـي 🎉</span>
                  ) : (
                    <span className="font-mono text-white">+{shippingFee} دج</span>
                  )}
                  <span>تكلفة الشحن لـ {selectedProvince.nameAr.split(" ").slice(1).join(" ")}</span>
                </div>

                {/* Final calculated total */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-2xl font-black text-rose-500 font-mono">{finalTotal} دج</span>
                  <span className="text-md font-bold text-white">المجموع النهائي للدفع</span>
                </div>

                {/* Direct interactive promo trigger box */}
                <div className="pt-2">
                  {quantity >= 2 ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl text-xs text-emerald-400 font-black text-center flex flex-col gap-1 items-center">
                      <span>✨ مبروك! لقد استفدت من العرض ✨</span>
                      <span>🎁 ستحصل على قارورة ثلج أصلية مجانية مضافة لطلبك!</span>
                    </div>
                  ) : (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-2.5 rounded-xl text-xs text-yellow-500 font-bold text-center flex flex-col gap-1 items-center">
                      <span>💡 وفر أكثر واحصل على هدية مجانية!</span>
                      <span>أضف قارورة ألوان أخرى (الكمية 2 أو أكثر) واكسب قارورة ثلج هدية! 🎁</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Safe Checkout Badge */}
              <div className="bg-gray-800/60 p-3 rounded-2xl flex items-center gap-2 text-right">
                <Truck className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs text-gray-300 font-medium leading-relaxed">
                  🚚 <strong>توصيل مأمون ومضمون:</strong> نقوم بالشحن في صناديق واقية محكمة الإغلاق لحمايتها أثناء الطريق.
                </span>
              </div>
            </div>

             {/* NEW Snow Bottle Free Promo Banner Card */}
             <div className="bg-neutral-900 border-2 border-pink-500/20 p-5 rounded-3xl text-white space-y-3 relative overflow-hidden shadow-lg">
               <div className="flex items-center gap-2 text-pink-400 font-bold text-xs bg-pink-500/10 w-fit px-2.5 py-1 rounded-full">
                 <Gift className="w-3.5 h-3.5" />
                 <span>عرض الهدية الخاص 🎁</span>
               </div>
               <h4 className="text-sm font-black text-right text-white">
                 قارورة الثلج الأصلية مجاناً! 🎉
               </h4>
               <p className="text-xs text-gray-300 text-right leading-relaxed font-semibold">
                 اضمن بهجة مضاعفة! <span className="text-pink-400 font-black">عند شراء قارورتين (2) أو أكثر من طفايات الألوان</span>، ستحصل تلقائياً على <span className="text-pink-400 font-black">قارورة ثلج أصلية كهدية مجانية بالكامل</span> مضافة في علبة طلبك!
               </p>
               
               {/* Standalone 100% visible image showing the free snow bottle */}
               <div className="rounded-2xl overflow-hidden border border-white/5 bg-black mt-2">
                 <img 
                   src="https://i.postimg.cc/2j2zb8VX/photo-2026-05-25-21-16-26.jpg" 
                   alt="Free Snow Bottle Gift Offer" 
                   className="w-full h-auto object-contain block hover:scale-[1.01] transition-transform duration-300"
                   referrerPolicy="no-referrer"
                 />
               </div>
             </div>

            {/* Special bulk offer badges */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-950 p-6 rounded-3xl text-white space-y-3 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 w-24 h-24 bg-purple-500 rounded-full mix-blend-screen opacity-10 filter blur-xl"></div>
              
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs bg-black/30 w-fit px-2.5 py-1 rounded-full">
                <Gift className="w-3.5 h-3.5" />
                <span>عروض التميز والأفراح الحصرية 2026</span>
              </div>

              <h4 className="text-md font-extrabold text-right">وفر أكثر عند طلب كمية أكبر! 🎁</h4>
              
              <ul className="space-y-2 text-xs text-purple-200 mt-2 text-right list-disc pl-0 pr-4">
                <li>عند طلب <strong>حبة واحدة (1)</strong>: بـ <strong>2900 دج</strong> فقط!</li>
                <li>عند طلب <strong>زوج حبات (2)</strong>: بـ <strong>5500 دج</strong> فقط في المجموع (توفير 300 دج)!</li>
                <li>عند طلب <strong>ثلاث حبات (3)</strong>: بـ <strong>7900 دج</strong> فقط في المجموع (توفير 800 دج) + <strong>شحن مجاني</strong> كامل!</li>
                <li>لكل قارورة إضافية فوق الـ 3 حبات: تحتسب بـ <strong>2500 دج</strong> فقط!</li>
              </ul>
            </div>

            {/* Past Orders History List for high fidelity mockups */}
            {pastOrders.length > 0 && (
              <div className="bg-neutral-900/60 p-4 rounded-3xl border border-white/10 shadow-lg text-right space-y-3">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center justify-between">
                  <span>طلبك مسجّل محلياً على المتصفح</span>
                  <span>تاريخ طلباتك الأخيرة ({pastOrders.length})</span>
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {pastOrders.map((ord, idx) => (
                    <div key={idx} className="bg-neutral-950/40 p-2.5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                      <span className="font-mono text-gray-400 font-bold">الكمية: {ord.quantity} ({ord.selectedColor})</span>
                      <div className="flex flex-col text-right">
                        <span className="font-extrabold text-white">{ord.fullName}</span>
                        <span className="text-[10px] text-gray-500 font-medium">{ord.province}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Modern animated Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative text-right shadow-2xl border border-gray-100"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setOrderSuccess(null)}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center space-y-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-gray-400 tracking-wider">رقم طلب المبيعات: {getTicketNum()}</span>
                  <h3 className="text-2xl font-black text-gray-900">ألف مبروك! تم تسجيل طلبك بنجاح 🎉</h3>
                  <p className="text-xs text-gray-500 font-semibold px-2">
                    شكراً لثقتك في شركة Sofex. سحابة البهجة بانتظارك لتضفي سحراً فريداً لمناسبتك السعيدة.
                  </p>
                </div>
              </div>

              {/* Receipt Breakdowns */}
              <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 text-sm space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-gray-800">{orderSuccess.fullName}</span>
                  <span className="text-gray-500">الاسم واللقب:</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-800 font-mono">{orderSuccess.phone}</span>
                  <span className="text-gray-500">رقم الهاتف:</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-800">{orderSuccess.province}</span>
                  <span className="text-gray-500">مكان التسليم:</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-800 truncate max-w-xs">{orderSuccess.address}</span>
                  <span className="text-gray-500">العنوان بالتفصيل:</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-pink-600">{orderSuccess.quantity} وحدات ({orderSuccess.selectedColor})</span>
                  <span className="text-gray-500">المنتج المحدد:</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200 font-black">
                  <span className="font-mono text-rose-600">{finalTotal} دج</span>
                  <span className="text-gray-900">القيمة الإجمالية للدفع:</span>
                </div>
              </div>

              {/* Instant WhatsApp acceleration action */}
              <div className="space-y-3">
                <a
                  href={`https://api.whatsapp.com/send?phone=213655110977&text=مرحباً%20سوفكس،%20لقد%20أرسلت%20طلباً%20لطفايات%20الألوان%20سعة%202كغ%20باسم%20${encodeURIComponent(orderSuccess.fullName)}%20الهاتف%20${orderSuccess.phone}.%20أرجو%20تأكيد%20الشحن%20الفوري!`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>أرسل لتأكيد الشحن فوراً عبر الواتساب 💬</span>
                </a>
                
                <p className="text-[10px] text-gray-400 text-center">
                  💡 إشعار: يمكنك أيضاً عدم فعل أي شيء، سنتصل بك هاتفياً في غضون ساعتين كحد أقصى لتأكيد الشحن دون أي مجهود إضافي.
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

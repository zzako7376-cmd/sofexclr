import { ColorOption, Review, Province } from "./types";

export const COLORS_DATA: ColorOption[] = [
  {
    id: "pink",
    name: "الوردي",
    colorCode: "bg-pink-500",
    bgColor: "from-pink-500 to-rose-600",
    glowClass: "glow-pink",
    textColor: "text-pink-600",
    description: "مثالي للأفراح الرومانسية، كشف جنس الجنين (بنت)، وأعياد الميلاد المبهجة.",
    accentHex: "#ec4899"
  },
  {
    id: "blue",
    name: "الأزرق",
    colorCode: "bg-blue-500",
    bgColor: "from-blue-500 to-cyan-600",
    glowClass: "glow-blue",
    textColor: "text-blue-600",
    description: "الخيار الأروع لطلبات الزواج المفاجئة، حفلات التخرج، وكشف جنس الجنين (ولد).",
    accentHex: "#2563eb"
  },
  {
    id: "purple",
    name: "البنفسجي",
    colorCode: "bg-purple-600",
    bgColor: "from-purple-600 to-violet-800",
    glowClass: "glow-purple",
    textColor: "text-purple-600",
    description: "للدخول الأسطوري للعروسين، والخطوبات التي تتطلب بريقًا من الفخامة والتميز.",
    accentHex: "#8b5cf6"
  },
  {
    id: "yellow",
    name: "الأصفر",
    colorCode: "bg-yellow-400",
    bgColor: "from-yellow-400 to-amber-500",
    glowClass: "glow-yellow",
    textColor: "text-yellow-600",
    description: "يناسب المهرجانات الاحتفالية البهيجة، تجمعات الشاطئ، وتأثيرات الصباح الفاتنة.",
    accentHex: "#eab308"
  },
  {
    id: "green",
    name: "الأخضر",
    colorCode: "bg-green-500",
    bgColor: "from-green-500 to-emerald-600",
    glowClass: "glow-green",
    textColor: "text-green-600",
    description: "اللمسة السحرية ليالي الحنّاء التقليدية، المناسبات التراثية، والأعياد المليئة بالطبيعة.",
    accentHex: "#22c55e"
  }
];

export const PROVINCES_DATA: Province[] = [
  { id: "16", nameAr: "16 - الجزائر العاصمة", shippingFee: 400 },
  { id: "31", nameAr: "31 - وهران", shippingFee: 600 },
  { id: "25", nameAr: "25 - قسنطينة", shippingFee: 600 },
  { id: "19", nameAr: "19 - سطيف", shippingFee: 500 },
  { id: "09", nameAr: "09 - البليدة", shippingFee: 400 },
  { id: "15", nameAr: "15 - تيزي وزو", shippingFee: 500 },
  { id: "13", nameAr: "13 - تلمسان", shippingFee: 700 },
  { id: "23", nameAr: "23 - عنابة", shippingFee: 600 },
  { id: "35", nameAr: "35 - بومرداس", shippingFee: 400 },
  { id: "05", nameAr: "05 - باتنة", shippingFee: 600 },
  { id: "44", nameAr: "44 - عين الدفلى", shippingFee: 550 },
  { id: "other", nameAr: "ولايات أخرى (شحن مضمون)", shippingFee: 800 }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: "rec1",
    name: "حمزة بن عيسى",
    role: "عريس - الجزائر العاصمة",
    text: "اشتريت قارورتين باللون البنفسجي للدخول الإمبراطوري لزفافنا. التأثير كان لا يصدق والجميع التقط صوراً مذهلة! البودرة خفيفة جداً وزالت من الفستان والبدلة بسهولة بالنفض فقط.",
    rating: 5,
    date: "منذ أسبوعين",
    avatarInitials: "حب"
  },
  {
    id: "rec2",
    name: "سارة لموشي",
    role: "منظمة حفلات ومناسبات",
    text: "بصفتي صانعة أفراح، طفايات الألوان بسعة 2 كغ من سوفكس هي سر التغطية المذهلة! الضغط قوي تخرج سحابة ألوان ضخمة تدوم لفترة جيدة بما يكفي للصور الاحترافية. شكرًا Sofex على الجودة.",
    rating: 5,
    date: "منذ شهر",
    avatarInitials: "سل"
  },
  {
    id: "rec3",
    name: "عبد الرحمن جودي",
    role: "حفل تخرج الدفعة الجامعية",
    text: "استخدمنا اللون الأزرق والوردي في حفل تخرجنا دفعة 2026. الميزة الرائعة هي صمام الأمان والتحكم، الحجم 2 كغ ممتاز جداً وصنع لنا بهجة حقيقية تليق بجهود السنين.",
    rating: 5,
    date: "منذ 3 أيام",
    avatarInitials: "عج"
  }
];

export const BASE_PRICE = 4500; // Original product price in local currency
export const DISCOUNTED_PRICE = 2900; // New single bottle discounted price: 2900 DA
export const FREE_SHIPPING_THRESHOLD = 3; // Free shipping if they order 3 or more!

// Tiered Prices based on user request: 1 bottle -> 2900 DA, 2 bottles -> 5500 DA, 3 bottles -> 7900 DA
export const getProductPriceForQuantity = (qty: number): number => {
  if (qty <= 1) return 2900;
  if (qty === 2) return 5500;
  if (qty === 3) return 7900;
  // If more than 3, we charge 7900 + 2500 per additional bottle
  return 7900 + (qty - 3) * 2500;
};


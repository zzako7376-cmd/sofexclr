export interface ColorOption {
  id: string;
  name: string;
  colorCode: string; // Tailwind class or hex color
  bgColor: string; // Background class
  glowClass: string; // Custom glow effect class defined in index.css
  textColor: string; // Accent text color
  description: string; // When to use this color (e.g., "مثالي لأعياد ميلاد الإناث وحفلات توديع العزوبية")
  accentHex: string; // Direct Hex for inline style clouds
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  avatarInitials: string;
}

export interface OrderData {
  fullName: string;
  phone: string;
  province: string;
  address: string;
  quantity: number;
  selectedColor: string;
}

export interface Province {
  id: string;
  nameAr: string;
  shippingFee: number;
}

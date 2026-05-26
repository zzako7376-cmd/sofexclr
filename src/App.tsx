/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Reviews from "./components/Reviews";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";
import { COLORS_DATA } from "./data";
import { ColorOption } from "./types";

export default function App() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLORS_DATA[0]);

  const handleSelectColor = (color: ColorOption) => {
    setSelectedColor(color);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between selection:bg-pink-100 selection:text-pink-900 overflow-x-hidden">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Interactive Hero with product presentation and countdown timer */}
      <Hero selectedColor={selectedColor} onSelectColor={handleSelectColor} />

      {/* 4. Customer Feedback and Trust Indicators */}
      <Reviews />

      {/* 5. Convergent Order taking Checkout with real-time discounts */}
      <OrderForm selectedColor={selectedColor} onSelectColor={handleSelectColor} />

      {/* 6. Frequently Asked Questions & Brand Rights */}
      <Footer />
    </div>
  );
}


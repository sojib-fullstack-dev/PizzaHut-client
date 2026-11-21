"use client";

import { motion } from "framer-motion";
import { Pizza } from "lucide-react";

type MenuCategoryChipsProps = {
  active: string; // Aktively selected category ("" mane shob)
  onChange: (val: string) => void;
};

// Amader categories - click korle oi category dekhabe
const CATEGORIES = [
  { value: "", label: "All" },
  // Notun category list - value = label (DB er item er sathe match kore)
  { value: "Classic Pizzas", label: "Classic Pizzas" },
  { value: "Vegetarian Pizzas", label: "Vegetarian Pizzas" },
  { value: "Meat Lovers", label: "Meat Lovers" },
  { value: "Specialty / Gourmet Pizzas", label: "Specialty / Gourmet" },
  { value: "Sides & Appetizers", label: "Sides & Appetizers" },
  { value: "Beverages & Desserts", label: "Beverages & Desserts" },
];

// Filter card er niche categories gula ekta ekta kore (line by line) dekhay
// Ekta chip e click korle shudhu oi category er item dekhabe
export function MenuCategoryChips({ active, onChange }: MenuCategoryChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-8"
    >
      <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a87b62]">
        <Pizza className="size-3.5 text-[#a4161a]" aria-hidden />
        Browse by category
      </p>

      <div className="flex flex-wrap gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.value;

          return (
            <button
              key={cat.value}
              type="button"
              // Active chip abar click korle filter clear hoy
              onClick={() => onChange(isActive ? "" : cat.value)}
              className={
                isActive
                  ? "rounded-full bg-gradient-to-r from-[#a4161a] to-[#ea580c] px-5 py-2 text-sm font-bold text-white shadow-[0_10px_22px_-12px_rgba(164,22,26,0.8)] transition-all duration-200"
                  : "rounded-full border border-[#8d1b1b]/15 bg-white px-5 py-2 text-sm font-semibold text-[#5f3b2c] transition-all duration-200 hover:border-[#a4161a]/40 hover:text-[#a4161a] hover:shadow-sm"
              }
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

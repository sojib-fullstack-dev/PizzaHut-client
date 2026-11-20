"use client";

import { useCallback, useEffect, useState } from "react";
import { Flame, LoaderCircle, Pizza } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MenuCard } from "@/app/components/MenuCard";
import type { MenuItem } from "@/app/components/MenuItemCard";
import { GetMenuItems } from "@/lib/actions/menu";


const BrowseMenuPages = () => {








  
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);


  const loadItems = useCallback(async () => {
    try {
      const data = await GetMenuItems();
      if (!Array.isArray(data)) {
        throw new Error("Menu response was not a list.");
      }
      setItems(data);
      setHasError(false);
    } catch (error) {
      console.error("Could not load menu items for browse menu.", error);
      setHasError(true);
      toast.error("Could not load menu items.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadItems();
  }, [loadItems]);

  // Retry button
  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    void loadItems();
  };

  return (
    <div className="min-h-screen bg-[#fffaf2]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a4161a]/15 bg-[#a4161a]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a4161a] shadow-xs">
            <Flame className="size-3 text-[#ea580c]" />
            Fresh from the oven
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
            Explore the{" "}
            <span className="bg-gradient-to-r from-[#8f1116] via-[#a4161a] to-[#ea580c] bg-clip-text text-transparent">
              Menu
            </span>
          </h1>

          <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#7a5645]">
            Browse the menu and save your favorite items for later.
          </p>
        </motion.div>

        {isLoading ? (
          // Loading state
          <div className="flex flex-col items-center justify-center gap-3 py-24">
            <LoaderCircle
              className="size-9 animate-spin text-[#a4161a]"
              aria-hidden
            />
            <p className="text-sm font-semibold text-[#a87b62]">
              Loading menu items...
            </p>
          </div>
        ) : hasError ? (
          // Error state - server off thakle
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="font-semibold text-red-700">Could not load menu items.</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 rounded-full bg-[#a4161a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8f1116]"
            >
              Try again
            </button>
          </div>
        ) : items.length === 0 ? (
          // Empty state - kono item nai
          <div className="rounded-3xl border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-14 text-center">
            <Pizza className="mx-auto size-10 text-[#a4161a]/50" aria-hidden />
            <h2 className="mt-3 text-lg font-bold text-[#3d211a]">
              No menu items yet
            </h2>
          </div>
        ) : (
          // Menu item cards with smooth staggered animation
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseMenuPages;

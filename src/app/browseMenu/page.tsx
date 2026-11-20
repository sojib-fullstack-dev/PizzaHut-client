"use client";

import { useCallback, useEffect, useState } from "react";
import { LoaderCircle, Pizza } from "lucide-react";
import { toast } from "react-toastify";
import { MenuCard } from "@/app/components/MenuCard";
import type { MenuItem } from "@/app/components/MenuItemCard";
import { GetMenuItems } from "@/lib/actions/menu";

// Browse Menu page - customer dashboard theke design ekhane chole elo
// (navbar er "Browse Menu" link ei page e aye)
const BrowseMenuPages = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Backend theke shob menu items load korchi
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
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#3d211a] sm:text-3xl">
          Explore the Menu
        </h1>
        <p className="mt-1 text-sm text-[#7a5645]">
          Browse the menu and save your favorite items for later.
        </p>
      </div>

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
        // Menu item cards
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseMenuPages;

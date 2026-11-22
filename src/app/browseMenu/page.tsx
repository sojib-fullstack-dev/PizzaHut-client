"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Flame, LoaderCircle, Pizza, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MenuCard } from "@/app/components/MenuCard";
import { MenuCategoryChips } from "@/app/components/MenuCategoryChips";
import { MenuFilters } from "@/app/components/MenuFilters";
import type { MenuItem } from "@/app/components/MenuItemCard";
import { GetMenuItems } from "@/lib/actions/menu";

// Client-side content where filters and searchParams work
function BrowseMenuContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Search & Filter states (initialized from URL)
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Backend theke menu items load kora queryString shoho
  const loadItems = useCallback(async (queryString = "") => {
    try {
      setIsLoading(true);
      const data = await GetMenuItems(queryString);
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

  // Filter ba search change hole URL update ebong backend theke data fetch hobe
  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    if (location.trim()) params.set("location", location.trim());
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const queryString = params.toString();

    // URL sync without full reload
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    window.history.replaceState(null, "", newUrl);

    // 300ms debounce typing er jonno
    const timer = setTimeout(() => {
      void loadItems(queryString);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category, location, minPrice, maxPrice, pathname, loadItems]);

  // Price filter client-side (server price string, tai server e price query ney na)
  const visibleItems = items.filter((item) => {
    // Browse e shudhu Active ba Approved item dekhabe
    // (vendor notun item banale status Pending hoy - admin Approve korle Approved hoy, tokhon ei page e asbe)
    // Pending / Inactive item browse e dekhabe na
    if (item.status !== "Active" && item.status !== "Approved") return false;

    const price = Number(item.price);
    if (minPrice && price < Number(minPrice)) return false;
    if (maxPrice && price > Number(maxPrice)) return false;
    return true;
  });

  // Reset filters
  const handleReset = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
  };

  // Retry button
  const handleRetry = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    if (location.trim()) params.set("location", location.trim());
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    void loadItems(params.toString());
  };

  const hasActiveFilters = Boolean(
    search || category || location || minPrice || maxPrice
  );

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

        {/* Search by name, price (low-high) & location */}
        <MenuFilters
          search={search}
          onSearchChange={setSearch}
          minPrice={minPrice}
          onMinPriceChange={setMinPrice}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          location={location}
          onLocationChange={setLocation}
          onReset={handleReset}
        />

        {/* Categories - ekta ekta kore niche dekha jay, click korle filter hoy */}
        <MenuCategoryChips active={category} onChange={setCategory} />

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
        ) : visibleItems.length === 0 ? (
          // Empty state - kono item match na korle
          <div className="rounded-3xl border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-14 text-center">
            <Pizza className="mx-auto size-10 text-[#a4161a]/50" aria-hidden />
            <h2 className="mt-3 text-lg font-bold text-[#3d211a]">
              {hasActiveFilters ? "No matching menu items found" : "No menu items yet"}
            </h2>
            <p className="mt-1 text-sm text-[#7a5645]">
              {hasActiveFilters
                ? "Try searching for a different keyword, category, or location."
                : "Please check back soon!"}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#a4161a] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#8f1116]"
              >
                <RotateCcw className="size-3.5" />
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          // Menu item cards with smooth staggered animation
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item, index) => (
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
}

// Next.js best-practice: Wrap the client searchParams reader in Suspense
const BrowseMenuPages = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fffaf2] flex items-center justify-center py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
        </div>
      }
    >
      <BrowseMenuContent />
    </Suspense>
  );
};

export default BrowseMenuPages;

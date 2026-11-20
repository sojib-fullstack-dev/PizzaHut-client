"use client";

import { ChevronDown, MapPin, Pizza, RotateCcw, Search, X } from "lucide-react";

type MenuFiltersProps = {
  search: string;
  onSearchChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  location: string;
  onLocationChange: (val: string) => void;
  onReset: () => void;
};

export function MenuFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  location,
  onLocationChange,
  onReset,
}: MenuFiltersProps) {
  const hasActiveFilters = Boolean(search || category || location);

  return (
    <div className="mb-8 rounded-3xl border border-[#8d1b1b]/15 bg-white/95 p-4 sm:p-5 shadow-[0_10px_30px_-15px_rgba(80,20,10,0.08)] backdrop-blur-sm">
      {/* 3 filter controls: Search, Category, Location */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {/* 1. Search by name */}
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#a87b62]"
            aria-hidden
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name..."
            className="h-11 w-full rounded-2xl border border-[#8d1b1b]/15 bg-[#fffaf2] pl-10 pr-9 text-sm font-medium text-[#3d211a] placeholder:text-[#a87b62]/70 outline-none transition focus:border-[#a4161a]/40 focus:bg-white focus:ring-2 focus:ring-[#a4161a]/10"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#a87b62] hover:text-[#a4161a]"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* 2. Filter by category */}
        <div className="relative">
          <Pizza
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#a87b62]"
            aria-hidden
          />
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-2xl border border-[#8d1b1b]/15 bg-[#fffaf2] pl-10 pr-9 text-sm font-medium text-[#3d211a] outline-none transition focus:border-[#a4161a]/40 focus:bg-white focus:ring-2 focus:ring-[#a4161a]/10"
          >
            <option value="">All Categories</option>
            <option value="pizza">Pizza</option>
            <option value="sides">Sides</option>
            <option value="drinks">Drinks</option>
            <option value="desserts">Desserts</option>
            <option value="offers">Offers</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#a87b62]"
            aria-hidden
          />
        </div>

        {/* 3. Filter by location */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <MapPin
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#a87b62]"
            aria-hidden
          />
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Filter by location (e.g. Uttara)..."
            className="h-11 w-full rounded-2xl border border-[#8d1b1b]/15 bg-[#fffaf2] pl-10 pr-9 text-sm font-medium text-[#3d211a] placeholder:text-[#a87b62]/70 outline-none transition focus:border-[#a4161a]/40 focus:bg-white focus:ring-2 focus:ring-[#a4161a]/10"
          />
          {location && (
            <button
              type="button"
              onClick={() => onLocationChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#a87b62] hover:text-[#a4161a]"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Reset button shown when filters are active */}
      {hasActiveFilters && (
        <div className="mt-3.5 flex items-center justify-between border-t border-[#8d1b1b]/10 pt-3 text-xs text-[#a87b62]">
          <span>Filtered results active</span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-full bg-[#a4161a]/10 px-3 py-1 font-semibold text-[#a4161a] transition hover:bg-[#a4161a]/20"
          >
            <RotateCcw className="size-3" />
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}


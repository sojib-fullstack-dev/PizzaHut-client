"use client";

import React from "react";
import { Search, X, Filter } from "lucide-react";

interface AdminMenuSearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  totalCount: number;
  filteredCount: number;
}

export function AdminMenuSearchFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
  filteredCount,
}: AdminMenuSearchFilterBarProps) {
  const isFiltered = searchQuery.trim() !== "" || statusFilter !== "All";

  const handleReset = () => {
    onSearchChange("");
    onStatusFilterChange("All");
  };

  return (
    <div className="rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#a87b62]"
            aria-hidden
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by item name, category, location, or vendor email..."
            className="w-full rounded-2xl border border-[#8d1b1b]/15 bg-[#fffaf2] py-2.5 pl-10 pr-9 text-sm font-medium text-[#3d211a] placeholder:text-[#a87b62] transition focus:border-[#a4161a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#a4161a]/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#a87b62] hover:bg-[#a4161a]/10 hover:text-[#a4161a]"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="menu-status-filter"
              className="text-xs font-bold text-[#7a5645]"
            >
              Status:
            </label>
            <select
              id="menu-status-filter"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="rounded-xl border border-[#8d1b1b]/15 bg-[#fffaf2] px-3 py-2 text-xs font-semibold text-[#3d211a] transition hover:border-[#a4161a]/30 focus:border-[#a4161a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#a4161a]/20"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#a4161a]/20 bg-[#a4161a]/5 px-3 py-2 text-xs font-bold text-[#a4161a] transition hover:bg-[#a4161a]/10"
            >
              <X className="size-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Summary status line */}
      <div className="mt-3 flex items-center justify-between border-t border-[#8d1b1b]/10 pt-3 text-xs font-medium text-[#7a5645]">
        <span>
          Showing <span className="font-bold text-[#3d211a]">{filteredCount}</span> of{" "}
          <span className="font-bold text-[#3d211a]">{totalCount}</span> menu items
        </span>
        {isFiltered && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#a4161a]">
            <Filter className="size-3" /> Filters active
          </span>
        )}
      </div>
    </div>
  );
}


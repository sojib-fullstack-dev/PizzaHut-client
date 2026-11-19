"use client";

import Link from "next/link";
import { Bookmark, Pizza } from "lucide-react";
import { MenuCard } from "@/app/components/MenuCard";
import { useSavedItems } from "@/components/saved-items/saved-items-provider";

export default function SavedItemsPage() {
  const { items, isLoaded } = useSavedItems();

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#3d211a] sm:text-3xl">
          <Bookmark className="size-7 text-[#a4161a]" aria-hidden />
          Saved Items
        </h1>
        <p className="mt-1 text-sm text-[#7a5645]">
          Your favorite menu items are saved here.
        </p>
      </div>

      {!isLoaded ? (
        <p className="py-16 text-center text-sm font-semibold text-[#a87b62]">
          Loading saved items...
        </p>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-14 text-center">
          <Pizza className="mx-auto size-10 text-[#a4161a]/50" aria-hidden />
          <h2 className="mt-3 text-lg font-bold text-[#3d211a]">
            No saved items yet
          </h2>
          <p className="mt-1 text-sm text-[#7a5645]">
            Save a menu item and it will appear here.
          </p>
          <Link
            href="/dashboard/customer"
            className="mt-5 inline-flex rounded-full bg-[#a4161a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8f1116]"
          >
            Browse the menu
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

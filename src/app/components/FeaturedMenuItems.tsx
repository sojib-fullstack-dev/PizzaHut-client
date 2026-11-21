"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Eye,
  LoaderCircle,
  MapPin,
  Pizza,
  Store,
} from "lucide-react";

import { GetFeaturedMenuItems } from "@/lib/actions/menu";
import type { MenuItem } from "./MenuItemCard";


type FeaturedItem = MenuItem & {
  vendorName?: string;
};


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Featured Menu Items

export function FeaturedMenuItems() {
  const [items, setItems] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Backend theke featured items load
  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await GetFeaturedMenuItems();
        if (!Array.isArray(data)) {
          throw new Error("Featured response was not a list.");
        }
        setItems(data);
        setHasError(false);
      } catch (error) {
        console.error("Could not load featured items.", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#fffaf2] via-[#fffdf9] to-[#fffaf2] text-[#2d1610]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header - baki home sections er moto left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="max-w-xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a4161a]">
              Customer favorites
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Featured{" "}
              <span className="bg-gradient-to-r from-[#8f1116] via-[#a4161a] to-[#ea580c] bg-clip-text text-transparent italic">
                Menu Items
              </span>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#6b4737] sm:text-base">
              Hand-picked favorites from our restaurants - freshly approved,
              ready to order.
            </p>
          </div>

          {/* Browse all link - pura menu dekhate */}
          <Link
            href="/browseMenu"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#a4161a] transition-colors hover:text-[#8f1116]"
          >
            Browse all
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </motion.div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <LoaderCircle
              className="size-9 animate-spin text-[#a4161a]"
              aria-hidden
            />
            <p className="text-sm font-semibold text-[#a87b62]">
              Loading featured items...
            </p>
          </div>
        ) : hasError ? (
          // Error state - server bondho thakle
          <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="font-semibold text-red-700">
              Could not load featured items.
            </p>
          </div>
        ) : items.length === 0 ? (
          // Empty state - kono Active item nai
          <div className="mt-10 rounded-3xl border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-14 text-center">
            <Pizza
              className="mx-auto size-10 text-[#a4161a]/50"
              aria-hidden
            />
            <h3 className="mt-3 text-lg font-bold text-[#3d211a]">
              No featured items yet
            </h3>
            <p className="mt-1 text-sm text-[#7a5645]">
              Approved and active menu items will show up here.
            </p>
          </div>
        ) : (
          // Featured cards grid - maximum 6 ta item
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item) => (
              <motion.article
                key={item._id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#8d1b1b]/10 bg-white shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)] transition-all duration-300 hover:shadow-[0_28px_60px_-35px_rgba(80,20,10,0.6)]"
              >
                {/* Item image */}
                <div className="relative h-44 w-full bg-[#fff8ee]">
                  {item.image ? (
                    <Image
                      unoptimized
                      src={item.image}
                      alt={item.name}
                      width={500}
                      height={320}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Pizza
                        className="size-10 text-[#a4161a]/30"
                        aria-hidden
                      />
                    </div>
                  )}

                  {/* Category badge - image er upor */}
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#a4161a] shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="truncate text-base font-extrabold text-[#3d211a]">
                    {item.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#7a5645]">
                    {item.description}
                  </p>

                  {/* Price + location */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-lg font-extrabold text-[#a4161a]">
                      ${item.price}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-[#a87b62]">
                      <MapPin className="size-3.5" aria-hidden />
                      {item.location}
                    </span>
                  </div>

                  {/* Vendor info - kake theke asche */}
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#7a5645]">
                    <Store className="size-3.5 text-[#ea580c]" aria-hidden />
                    {item.vendorName || "Pizza Hut Kitchen"}
                  </div>

                  {/* View Details button - details page e niye jay */}
                  <Link
                    href={`/browseMenu/${item._id}`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#a4161a]/30 bg-white px-4 py-2.5 text-sm font-semibold text-[#a4161a] transition-colors hover:bg-[#a4161a] hover:text-white"
                  >
                    <Eye className="size-4" aria-hidden />
                    View Details
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default FeaturedMenuItems;

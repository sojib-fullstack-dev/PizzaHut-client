"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LoaderCircle, MapPin, Pizza, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { GetMenuItem } from "@/lib/actions/menu";
import type { MenuItem } from "./MenuItemCard";

type Props = {
  itemId: string;
};

export function MenuDetails({ itemId }: Props) {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reload, setReload] = useState(0); 

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await GetMenuItem(itemId);
        setItem(data);
        setHasError(false);
      } catch (error) {
        console.error("Could not load item details.", error);
        setHasError(true);
        toast.error("Could not load item details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDetails();
  }, [itemId, reload]);

  // Try again button
  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setReload((count) => count + 1);
  };







  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffaf2] flex flex-col items-center justify-center gap-3 py-28">
        <LoaderCircle
          className="size-9 animate-spin text-[#a4161a]"
          aria-hidden
        />
        <p className="text-sm font-semibold text-[#a87b62]">
          Loading details...
        </p>
      </div>
    );
  }

  // Error state -
  if (hasError) {
    return (
      <div className="min-h-screen bg-[#fffaf2]">
        <div className="mx-auto w-full max-w-xl px-4 py-24">
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="font-semibold text-red-700">
              Could not load item details.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 rounded-full bg-[#a4161a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8f1116]"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!item || !item._id) {
    return (
      <div className="min-h-screen bg-[#fffaf2]">
        <div className="mx-auto w-full max-w-xl px-4 py-24 text-center">
          <div className="rounded-3xl border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-14">
            <Pizza className="mx-auto size-10 text-[#a4161a]/50" aria-hidden />
            <h1 className="mt-3 text-lg font-bold text-[#3d211a]">
              Item not found
            </h1>
            <Link
              href="/browseMenu"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#a4161a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8f1116]"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main details design
  return (
    <div className="min-h-screen bg-[#fffaf2]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Back button - browseMenu te ferot jay */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/browseMenu"
            className="inline-flex items-center gap-2 rounded-full border border-[#8d1b1b]/15 bg-white px-4 py-2 text-sm font-semibold text-[#5f3b2c] transition-colors hover:border-[#a4161a]/40 hover:text-[#a4161a]"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to Menu
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 grid gap-8 lg:grid-cols-2"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-[#8d1b1b]/10 bg-[#fff8ee] shadow-[0_25px_60px_-40px_rgba(80,20,10,0.6)]">
            {item.image ? (
              <Image
                unoptimized
                src={item.image}
                alt={item.name}
                width={800}
                height={600}
                className="h-72 w-full object-cover sm:h-[420px]"
              />
            ) : (
              <div className="flex h-72 w-full items-center justify-center sm:h-[420px]">
                <Pizza className="size-14 text-[#a4161a]/25" aria-hidden />
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#a4161a] shadow-md">
              {item.category}
            </span>
          </div>

          {/* Right: details gula */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a87b62]">
              Menu Details
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
              {item.name}
            </h1>
            <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-[#a87b62]">
              <MapPin className="size-4" aria-hidden />
              {item.location}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-[#7a5645] sm:text-base">
              {item.description}
            </p>

            {/* Price + category box */}
            <div className="mt-6 flex items-center justify-between rounded-3xl border border-[#8d1b1b]/10 bg-[#fff8ee] px-6 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#a87b62]">
                  Price
                </p>
                <p className="mt-1 text-3xl font-extrabold text-[#a4161a]">
                  ${item.price}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#a87b62]">
                  Category
                </p>
                <p className="mt-1 font-bold capitalize text-[#3d211a]">
                  {item.category}
                </p>
              </div>
            </div>

            {/* Order Now -*/}
            <button
              type="button"
              className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#a4161a] via-[#c9301f] to-[#ea580c] px-8 py-4 text-base font-bold text-white shadow-[0_18px_35px_-15px_rgba(164,22,26,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-15px_rgba(234,88,12,0.75)] active:translate-y-0"
            >
              <ShoppingBag
                className="size-5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              />
              Order Now
            </button>
            <p className="mt-3 text-center text-xs text-[#a87b62]">
              Hot &amp; fresh, delivered to your door.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

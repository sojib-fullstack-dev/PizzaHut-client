"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { LoaderCircle, MapPin, Pizza, X } from "lucide-react";

import { GetMenuItem } from "@/lib/actions/menu";
import type { MenuItem } from "./MenuItemCard";

type Props = {
  itemId: string; 
  onClose: () => void; 
};


export function MenuItemDetails({ itemId, onClose }: Props) {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await GetMenuItem(itemId);
        setItem(data);
      } catch {
        toast.error("Could not load item details");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [itemId]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >

        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-extrabold text-[#3d211a]">
            Item Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-[#a87b62] transition-colors hover:bg-[#a4161a]/10 hover:text-[#a4161a]"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-14">
            <LoaderCircle
              className="size-8 animate-spin text-[#a4161a]"
              aria-hidden
            />
            <p className="text-sm font-semibold text-[#a87b62]">
              Loading details...
            </p>
          </div>
        ) : !item || !item._id ? (
    
          <p className="py-14 text-center text-sm text-[#7a5645]">
            Item not found.
          </p>
        ) : (
          <>
            {/* Image */}
            {item.image ? (
              <Image
                unoptimized
                src={item.image}
                alt={item.name}
                width={400}
                height={220}
                className="mt-4 h-48 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="mt-4 flex h-48 w-full items-center justify-center rounded-2xl bg-[#fff8ee]">
                <Pizza className="size-10 text-[#a4161a]/30" aria-hidden />
              </div>
            )}

            {/* Naam + category */}
            <h3 className="mt-4 text-lg font-extrabold text-[#3d211a]">
              {item.name}
            </h3>

   
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-[#fff8ee] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#a87b62]">
                  Category
                </p>
                <p className="mt-1 font-bold capitalize text-[#3d211a]">
                  {item.category}
                </p>
              </div>
              <div className="rounded-xl bg-[#fff8ee] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#a87b62]">
                  Price
                </p>
                <p className="mt-1 font-bold text-[#a4161a]">${item.price}</p>
              </div>
              <div className="rounded-xl bg-[#fff8ee] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#a87b62]">
                  Status
                </p>
                <p className="mt-1 font-bold capitalize text-[#3d211a]">
                  {item.status || "Pending"}
                </p>
              </div>
              <div className="rounded-xl bg-[#fff8ee] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#a87b62]">
                  Location
                </p>
                <p className="mt-1 flex items-center gap-1 font-bold text-[#3d211a]">
                  <MapPin className="size-3.5" aria-hidden />
                  {item.location}
                </p>
              </div>
            </div>

            {/* Pura description */}
            <div className="mt-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#a87b62]">
                Description
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#7a5645]">
                {item.description}
              </p>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="mt-6 h-11 w-full rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

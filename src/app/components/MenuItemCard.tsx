"use client";

import Image from "next/image";
import { Eye, MapPin, Pencil, Pizza, Trash2 } from "lucide-react";


export type MenuItem = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  location: string;
  image: string;
  status?: string;
};


const statusColors: Record<string, string> = {
  Pending: "border-amber-300 bg-amber-100 text-amber-700",
  Approved: "border-green-300 bg-green-100 text-green-700",
  Rejected: "border-red-600 bg-red-600 text-white", // Rejected = clearly red badge
  Inactive: "border-gray-300 bg-gray-200 text-gray-600",
  Active: "border-green-300 bg-green-100 text-green-700",
};

// Chhoto button gular style
const outlineBtn =
  "inline-flex h-9 items-center gap-1.5 rounded-full border border-[#a4161a]/20 bg-white px-3.5 text-xs font-semibold text-[#a4161a] transition-all duration-200 hover:border-[#a4161a]/40 hover:bg-[#a4161a]/5";

const redBtn =
  "inline-flex h-9 items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white";

const activeBtn =
  "inline-flex h-9 items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3.5 text-xs font-semibold text-green-700 transition-all duration-200 hover:bg-green-600 hover:text-white";

const inactiveBtn =
  "inline-flex h-9 items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-3.5 text-xs font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-600 hover:text-white";

type Props = {
  item: MenuItem;
  onView: (id: string) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  onStatusChange: (id: string, newStatus: string) => void;
};

export function MenuItemCard({
  item,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {

  const status = item.status || "Pending";
  const isActive = status === "Active";

  // Active / Inactive switch
  const handleToggle = () => {
    onStatusChange(item._id, isActive ? "Inactive" : "Active");
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-[#8d1b1b]/10 bg-white shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-35px_rgba(80,20,10,0.6)]">
  
      <div className="relative h-44 w-full bg-[#fff8ee]">
        {item.image ? (
          <Image
            unoptimized
            src={item.image}
            alt={item.name}
            width={400}
            height={250}
            className="h-44 w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Pizza className="size-10 text-[#a4161a]/30" aria-hidden />
          </div>
        )}


        <span
          className={`absolute right-3 top-3 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
            statusColors[status] || statusColors.Pending
          }`}
        >
          {status}
        </span>
      </div>


      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-base font-extrabold text-[#3d211a]">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-[#a4161a]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#a4161a]">
            {item.category}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#7a5645]">
          {item.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-lg font-extrabold text-[#a4161a]">
            ${item.price}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-[#a87b62]">
            <MapPin className="size-3.5" aria-hidden />
            {item.location}
          </span>
        </div>


        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onView(item._id)}
            className={outlineBtn}
          >
            <Eye className="size-3.5" aria-hidden />
            View
          </button>

          <button
            type="button"
            onClick={() => onEdit(item)}
            className={outlineBtn}
          >
            <Pencil className="size-3.5" aria-hidden />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(item)}
            className={redBtn}
          >
            <Trash2 className="size-3.5" aria-hidden />
            Delete
          </button>

          <button
            type="button"
            onClick={handleToggle}
            className={isActive ? inactiveBtn : activeBtn}
          >
            {isActive ? "Set Inactive" : "Set Active"}
          </button>
        </div>
      </div>
    </div>
  );
}

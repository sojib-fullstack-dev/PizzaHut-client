"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  AlignLeft,
  Banknote,
  LoaderCircle,
  MapPin,
  Pizza,
  Save,
  Tag,
  X,
} from "lucide-react";

import { UpdateMenuItem, type FromData } from "@/lib/actions/menu";
import type { MenuItem } from "./MenuItemCard";

const inputClass =
  "h-11 w-full rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] pl-10 pr-4 text-sm font-medium text-[#3d211a] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#b79b8a] focus:border-[#a4161a]/40 focus:bg-white focus:ring-4 focus:ring-[#a4161a]/10";

const labelClass = "mb-1.5 block text-[13px] font-semibold text-[#3d211a]";

type Props = {
  item: MenuItem;
  onClose: () => void; 
  onSaved: (updated: MenuItem) => void; 
};


export function MenuItemEdit({ item, onClose, onSaved }: Props) {
  const [saving, setSaving] = useState(false);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const getTextValue = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value : "";
    };

    const data: FromData = {
      name: getTextValue("name"),
      category: getTextValue("category"),
      description: getTextValue("description"),
      price: getTextValue("price"),
      location: getTextValue("location"),
      image: item.image, 
    };

    setSaving(true);
    try {
      await UpdateMenuItem(item._id, data);
      toast.success("Item updated!");
      onSaved({ ...item, ...data }); 
    } catch {
      toast.error("Update failed!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >
        {/* Title + close */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-extrabold text-[#3d211a]">
            Edit Menu Item
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

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Item Name */}
          <div>
            <label htmlFor="edit-name" className={labelClass}>
              Item Name
            </label>
            <div className="relative">
              <Pizza
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#b08d79]"
                strokeWidth={2}
              />
              <input
                id="edit-name"
                name="name"
                type="text"
                defaultValue={item.name}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="edit-category" className={labelClass}>
              Category
            </label>
            <div className="relative">
              <Tag
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#b08d79]"
                strokeWidth={2}
              />
              <select
                id="edit-category"
                name="category"
                defaultValue={item.category}
                required
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="pizza">Pizza</option>
                <option value="sides">Sides</option>
                <option value="drinks">Drinks</option>
                <option value="desserts">Desserts</option>
                <option value="offers">Offers</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="edit-description" className={labelClass}>
              Description
            </label>
            <div className="relative">
              <AlignLeft
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-4 size-[17px] text-[#b08d79]"
                strokeWidth={2}
              />
              <textarea
                id="edit-description"
                name="description"
                rows={3}
                defaultValue={item.description}
                required
                className="w-full rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] py-3 pl-10 pr-4 text-sm font-medium text-[#3d211a] outline-none transition-all duration-200 focus:border-[#a4161a]/40 focus:bg-white focus:ring-4 focus:ring-[#a4161a]/10"
              />
            </div>
          </div>

          {/* Price + Location */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-price" className={labelClass}>
                Price
              </label>
              <div className="relative">
                <Banknote
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#b08d79]"
                  strokeWidth={2}
                />
                <input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={item.price}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="edit-location" className={labelClass}>
                Location
              </label>
              <div className="relative">
                <MapPin
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#b08d79]"
                  strokeWidth={2}
                />
                <input
                  id="edit-location"
                  name="location"
                  type="text"
                  defaultValue={item.location}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>


          <div>
            <p className={labelClass}>Item Image</p>
            <div className="flex items-center gap-3 rounded-2xl border border-[#8d1b1b]/10 bg-[#fff8ee] p-3">
              {item.image ? (
                <Image
                  unoptimized
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="size-16 shrink-0 rounded-xl object-cover"
                />
              ) : null}
              <p className="text-xs text-[#7a5645]">
                Image change will be added later. Current image stays the same.
              </p>
            </div>
          </div>

          {/* Save + Cancel button */}
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
              ) : (
                <Save className="size-4" aria-hidden />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-full border border-[#a4161a]/20 bg-white px-6 text-sm font-semibold text-[#a4161a] transition-all duration-200 hover:bg-[#a4161a]/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

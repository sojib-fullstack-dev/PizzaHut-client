"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  AlignLeft,
  Banknote,
  ChevronDown,
  ImagePlus,
  MapPin,
  Pizza,
  Plus,
  Tag,
} from "lucide-react";
import { CreateMenuItems, type FromData } from "@/lib/actions/menu";
import { uploadImage } from "@/lib/uploadImage";


const inputClass =
  "h-12 w-full rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] pl-11 pr-4 text-sm font-medium text-[#3d211a] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#b79b8a] focus:border-[#a4161a]/40 focus:bg-white focus:ring-4 focus:ring-[#a4161a]/10";

const labelClass =
  "mb-1.5 block text-[13px] font-semibold text-[#3d211a]";

export function AddMenuForm() {

  const [imagePreview, setImagePreview] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));


      try {
        const url = await uploadImage(file);
        setImageUrl(url);

      } catch {
        toast.error("Image upload failed!");
      }
    }
  };


  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if (!imageUrl) {
      toast.error("Please upload an item image.");
      return;
    }

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
      image: imageUrl,
    };

    const result =await CreateMenuItems(data);
      console.log(result)
    toast.success("Menu item form submitted!");
    console.log(data);
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-[30px] border border-[#8d1b1b]/10 bg-white/90 p-5 shadow-[0_32px_80px_-48px_rgba(80,20,10,0.55)] sm:p-8">
      {/* Small decorative bar */}
      <div
        aria-hidden
        className="mx-auto mb-5 h-1 w-10 rounded-full bg-gradient-to-r from-[#a4161a] to-[#f59e0b]"
      />

      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a4161a]/10 bg-[#a4161a]/[0.05] px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#a4161a]">
        <Pizza className="size-3" strokeWidth={2.4} aria-hidden />
        Vendor kitchen
      </span>

      <h1 className="mt-3 text-[1.8rem] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#3d211a]">
        Add Menu Item
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#7a5645]">
        Fill in the details below to list a new item on your menu.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Item Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Item Name <span className="text-[#a4161a]">*</span>
          </label>
          <div className="relative">
            <Pizza
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
              strokeWidth={2}
            />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Margherita Pizza"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className={labelClass}>
            Category <span className="text-[#a4161a]">*</span>
          </label>
          <div className="relative">
            <Tag
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
              strokeWidth={2}
            />
            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="pizza">Pizza</option>
              <option value="sides">Sides</option>
              <option value="drinks">Drinks</option>
              <option value="desserts">Desserts</option>
              <option value="offers">Offers</option>
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label htmlFor="description" className={labelClass}>
            Description <span className="text-[#a4161a]">*</span>
          </label>
          <div className="relative">
            <AlignLeft
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-4 size-[18px] text-[#b08d79]"
              strokeWidth={2}
            />
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Short, tasty description of your item"
              required
              className="w-full rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] py-3.5 pl-11 pr-4 text-sm font-medium text-[#3d211a] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#b79b8a] focus:border-[#a4161a]/40 focus:bg-white focus:ring-4 focus:ring-[#a4161a]/10"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className={labelClass}>
            Price <span className="text-[#a4161a]">*</span>
          </label>
          <div className="relative">
            <Banknote
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
              strokeWidth={2}
            />
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 12.99"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className={labelClass}>
            Location (Area / City) <span className="text-[#a4161a]">*</span>
          </label>
          <div className="relative">
            <MapPin
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
              strokeWidth={2}
            />
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Dhanmondi, Dhaka"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Item Image */}
        <div className="sm:col-span-2">
          <label htmlFor="image" className={labelClass}>
            Item Image <span className="text-[#a4161a]">*</span>
          </label>

          <label
            htmlFor="image"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#a4161a]/25 bg-[#fffaf2] px-4 py-7 text-center transition-all duration-200 hover:border-[#ea580c]/60 hover:bg-white"
          >
            {imagePreview ? (
              <Image
                unoptimized
                src={imagePreview}
                alt="Item preview"
                width={96}
                height={96}
                className="size-24 rounded-xl object-cover ring-2 ring-[#ea580c]/40"
              />
            ) : (
              <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)]">
                <ImagePlus className="size-5" strokeWidth={2.2} aria-hidden />
              </span>
            )}

            <span className="text-sm font-semibold text-[#3d211a]">
              {imagePreview ? "Change item image" : "Click to upload item image"}
            </span>
            <span className="text-xs text-[#a87b62]">
              {imageUrl ? "Image uploaded ✓" : "PNG or JPG · Required"}
            </span>
          </label>

          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="sr-only"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="group flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(194,42,29,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-0 sm:col-span-2"
        >
          Add Menu Item
          <Plus
            className="size-4 transition-transform duration-300 group-hover:rotate-90"
            strokeWidth={2.6}
            aria-hidden
          />
        </button>
      </form>
    </section>
  );
}

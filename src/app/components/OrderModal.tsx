"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  Calendar,
  LoaderCircle,
  MapPin,
  MessageSquare,
  Pizza,
  ShoppingBag,
  X,
} from "lucide-react";

import { createOrder, type OrderData } from "@/lib/actions/createOrder";
import type { MenuItem } from "./MenuItemCard";

const inputClass =
  "h-11 w-full rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] pl-10 pr-4 text-sm font-medium text-[#3d211a] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#b79b8a] focus:border-[#a4161a]/40 focus:bg-white focus:ring-4 focus:ring-[#a4161a]/10";

const labelClass = "mb-1.5 block text-[13px] font-semibold text-[#3d211a]";

// Menu item er shathe jodi vendor info thake (vendorId/vendorName/vendorEmail)
type OrderMenuItem = MenuItem & {
  vendorId?: string;
  vendorName?: string;
  vendorEmail?: string;
};

type Props = {
  item: OrderMenuItem;
  user: { id?: string; name: string; email: string };
  onClose: () => void;
};

// Customer "Order Now" click korle ei modal khule jay
// Ekhane form fill kore submit korte hobe (kono Stripe/payment nai)
export function OrderModal({ item, user, onClose }: Props) {
  const [submitting, setSubmitting] = useState(false);

  // Aajer chena theke ager date select kora jabe na
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const getTextValue = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value : "";
    };

    // Order data - customer, vendor (jodi item e thake) ar menu item
    // shob info auto attach hoy (form e alada kisu input kora lage na)
    const orderData: OrderData = {
      itemId: item._id,
      itemName: item.name,
      image: item.image,
      price: item.price,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      vendorId: item.vendorId,
      vendorName: item.vendorName,
      vendorEmail: item.vendorEmail,
      deliveryDate: getTextValue("deliveryDate"),
      deliveryAddress: getTextValue("deliveryAddress"),
      message: getTextValue("message"),
    };

    setSubmitting(true);
    try {
      const result = await createOrder(orderData);

      // Server jodi reject kore (nijer item ba duplicate order)
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Order placed successfully! Status: Pending");
      onClose();
    } catch {
      toast.error("Could not place your order. Please try again.");
    } finally {
      setSubmitting(false);
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
            Place Your Order
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

        {/* Item summary - jeta order korchi: image + naam + price */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#8d1b1b]/10 bg-[#fff8ee] p-3">
          {item.image ? (
            <Image
              unoptimized
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="size-16 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#a4161a]/10">
              <Pizza className="size-7 text-[#a4161a]" aria-hidden />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-extrabold text-[#3d211a]">
              {item.name}
            </h3>
            <p className="mt-0.5 truncate text-xs font-medium text-[#a87b62]">
              {item.category}
            </p>
          </div>
          <span className="shrink-0 text-lg font-extrabold text-[#a4161a]">
            ${item.price}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Delivery Date */}
          <div>
            <label htmlFor="order-date" className={labelClass}>
              Delivery Date
            </label>
            <div className="relative">
              <Calendar
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#b08d79]"
                strokeWidth={2}
              />
              <input
                id="order-date"
                name="deliveryDate"
                type="date"
                min={today}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label htmlFor="order-address" className={labelClass}>
              Delivery Address
            </label>
            <div className="relative">
              <MapPin
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#b08d79]"
                strokeWidth={2}
              />
              <input
                id="order-address"
                name="deliveryAddress"
                type="text"
                placeholder="e.g. House 12, Road 5, Dhanmondi, Dhaka"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Additional Message / Special Instructions */}
          <div>
            <label htmlFor="order-message" className={labelClass}>
              Additional Message / Special Instructions
            </label>
            <div className="relative">
              <MessageSquare
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-4 size-[17px] text-[#b08d79]"
                strokeWidth={2}
              />
              <textarea
                id="order-message"
                name="message"
                rows={3}
                placeholder="e.g. Extra spicy, no onions, please ring the bell."
                className="w-full rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] py-3 pl-10 pr-4 text-sm font-medium text-[#3d211a] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#b79b8a] focus:border-[#a4161a]/40 focus:bg-white focus:ring-4 focus:ring-[#a4161a]/10"
              />
            </div>
          </div>

          {/* Place Order + Cancel button (simple submit - kono Stripe nai) */}
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="submit"
              disabled={submitting}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
              ) : (
                <ShoppingBag className="size-4" aria-hidden />
              )}
              {submitting ? "Placing Order..." : "Place Order"}
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

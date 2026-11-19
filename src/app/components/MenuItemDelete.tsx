"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { LoaderCircle, Trash2 } from "lucide-react";

import { DeleteMenuItem } from "@/lib/actions/menu";
import type { MenuItem } from "./MenuItemCard";

type Props = {
  item: MenuItem; // Je item delete hobe
  onClose: () => void; // Modal bondho korbe
  onDeleted: (id: string) => void; // Delete er por page ke janabe
};

// Delete button e click korle ei confirm window khole
// OK press korle database theke muiye jay
export function MenuItemDelete({ item, onClose, onDeleted }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await DeleteMenuItem(item._id);
      toast.success("Item deleted!");
      onDeleted(item._id); // List theke soriye de
    } catch {
      toast.error("Delete failed!");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"
      >
        {/* Lal icon */}
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Trash2 className="size-6" aria-hidden />
        </span>

        <h2 className="mt-4 text-lg font-extrabold text-[#3d211a]">
          Delete this item?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#7a5645]">
          &quot;{item.name}&quot; will be permanently removed from your menu.
          This cannot be undone.
        </p>

        {/* Cancel + Delete button */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="h-11 flex-1 rounded-full border border-[#a4161a]/20 bg-white text-sm font-semibold text-[#a4161a] transition-all duration-200 hover:bg-[#a4161a]/5 disabled:opacity-70"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-red-600 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {deleting ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
            ) : (
              <Trash2 className="size-4" aria-hidden />
            )}
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

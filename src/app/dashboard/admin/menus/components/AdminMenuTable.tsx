"use client";

import React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  LoaderCircle,
  MapPin,
  Pizza,
  Store,
  Trash2,
  XCircle,
  Power,
} from "lucide-react";
import { type MenuItem } from "@/app/components/MenuItemCard";

const statusBadgeStyles: Record<string, string> = {
  Pending: "border-amber-300 bg-amber-100 text-amber-800",
  Approved: "border-green-300 bg-green-100 text-green-800",
  Active: "border-emerald-300 bg-emerald-100 text-emerald-800",
  Inactive: "border-stone-300 bg-stone-100 text-stone-600",
  Rejected: "border-red-300 bg-red-100 text-red-700",
};

interface AdminMenuTableProps {
  items: MenuItem[];
  onUpdateStatus: (id: string, newStatus: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  actionLoadingId: string | null;
}

export function AdminMenuTable({
  items,
  onUpdateStatus,
  onDelete,
  actionLoadingId,
}: AdminMenuTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-[#8d1b1b]/15 bg-white p-12 text-center shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
        <Pizza className="mx-auto size-12 text-[#a87b62]/60" aria-hidden />
        <h3 className="mt-3 text-lg font-bold text-[#3d211a]">
          No menu items found
        </h3>
        <p className="mt-1 text-sm text-[#7a5645]">
          Try clearing your search query or changing the status filter.
        </p>
      </div>
    );
  }

  const handleDeleteConfirm = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-[#8d1b1b]/10 bg-white shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#8d1b1b]/10 bg-[#fffaf2] text-[11px] font-extrabold uppercase tracking-wider text-[#7a5645]">
              <th className="py-4 pl-6 pr-4">Item Details</th>
              <th className="px-4 py-4">Vendor</th>
              <th className="px-4 py-4">Price</th>
              <th className="px-4 py-4">Status</th>
              <th className="py-4 pl-4 pr-6 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8d1b1b]/10">
            {items.map((item) => {
              const status = item.status || "Pending";
              const isActionLoading = actionLoadingId === item._id;
              const vendorLabel =
                item.vendorEmail || item.vendorId || "Pizza Hut Kitchen";

              return (
                <tr
                  key={item._id}
                  className="transition hover:bg-[#fffaf2]/60"
                >
                  {/* Item Image + Name + Category + Location */}
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3.5">
                      {item.image ? (
                        <Image
                          unoptimized
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="size-12 shrink-0 rounded-2xl object-cover ring-1 ring-[#8d1b1b]/10"
                        />
                      ) : (
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#a4161a]/10 text-[#a4161a]">
                          <Pizza className="size-6" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-extrabold text-[#3d211a]">
                          {item.name}
                        </p>
                        <p className="truncate text-xs font-semibold text-[#a87b62]">
                          {item.category}
                        </p>
                        {item.location && (
                          <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-[#7a5645]">
                            <MapPin className="size-3 shrink-0 text-[#ea580c]" />
                            <span className="truncate">{item.location}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Vendor Info */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3d211a]">
                      <Store className="size-3.5 shrink-0 text-[#a4161a]" />
                      <span className="max-w-[160px] truncate" title={vendorLabel}>
                        {vendorLabel}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4">
                    <span className="font-extrabold text-[#a4161a]">
                      ${item.price}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
                        statusBadgeStyles[status] || statusBadgeStyles.Pending
                      }`}
                    >
                      {status === "Pending" && <Clock className="size-3" />}
                      {status === "Approved" && <CheckCircle2 className="size-3" />}
                      {status === "Active" && <Power className="size-3" />}
                      {status === "Rejected" && <XCircle className="size-3" />}
                      {status}
                    </span>
                  </td>

                  {/* Action buttons */}
                  <td className="py-4 pl-4 pr-6 text-right">
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      {isActionLoading ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#a87b62]">
                          <LoaderCircle className="size-3.5 animate-spin" />
                          Updating...
                        </span>
                      ) : (
                        <>
                          {/* Approve button for Pending or Rejected items */}
                          {status !== "Approved" && status !== "Active" && (
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(item._id, "Approved")}
                              title="Approve this item"
                              className="inline-flex h-8 items-center gap-1 rounded-full border border-green-200 bg-green-50 px-3 text-xs font-bold text-green-700 transition hover:bg-green-600 hover:text-white"
                            >
                              <CheckCircle2 className="size-3" />
                              Approve
                            </button>
                          )}

                          {/* Reject button for Pending items */}
                          {status !== "Rejected" && (
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(item._id, "Rejected")}
                              title="Reject this item"
                              className="inline-flex h-8 items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 text-xs font-bold text-amber-800 transition hover:bg-amber-600 hover:text-white"
                            >
                              <XCircle className="size-3" />
                              Reject
                            </button>
                          )}

                          {/* Toggle Active / Inactive for Approved/Active items */}
                          {status === "Approved" || status === "Inactive" ? (
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(item._id, "Active")}
                              title="Make this item Active on Featured section"
                              className="inline-flex h-8 items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 text-xs font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                            >
                              <Power className="size-3" />
                              Activate
                            </button>
                          ) : status === "Active" ? (
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(item._id, "Inactive")}
                              title="Make this item Inactive"
                              className="inline-flex h-8 items-center gap-1 rounded-full border border-stone-300 bg-stone-100 px-3 text-xs font-bold text-stone-600 transition hover:bg-stone-600 hover:text-white"
                            >
                              <Power className="size-3" />
                              Deactivate
                            </button>
                          ) : null}

                          {/* Permanent Delete button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteConfirm(item._id, item.name)}
                            title="Delete this menu item"
                            className="inline-flex size-8 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                            aria-label={`Delete ${item.name}`}
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


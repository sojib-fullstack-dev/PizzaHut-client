"use client";

import React from "react";
import Image from "next/image";
import {
  Ban,
  CheckCircle2,
  Crown,
  LoaderCircle,
  Shield,
  Store,
  User,
  Users,
} from "lucide-react";

export interface AppUser {
  _id: string;
  id?: string;
  name?: string;
  email: string;
  role?: string;
  subscriptionPlan?: string;
  isBlocked?: boolean;
  image?: string;
  createdAt?: string;
}

interface UserTableProps {
  users: AppUser[];
  onToggleBlock: (userId: string, currentBlocked: boolean) => Promise<void>;
  actionLoadingId: string | null;
}

export function UserTable({
  users,
  onToggleBlock,
  actionLoadingId,
}: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-[#8d1b1b]/15 bg-white p-12 text-center shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
        <Users className="mx-auto size-12 text-[#a87b62]/60" aria-hidden />
        <h3 className="mt-3 text-lg font-bold text-[#3d211a]">No users found</h3>
        <p className="mt-1 text-sm text-[#7a5645]">
          Try adjusting your search query or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#8d1b1b]/10 bg-white shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
      {/* Table for Desktop / Tablet */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#8d1b1b]/10 bg-[#fffaf2] text-[11px] font-extrabold uppercase tracking-wider text-[#7a5645]">
              <th className="py-4 pl-6 pr-4">User</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Subscription</th>
              <th className="px-4 py-4">Status</th>
              <th className="py-4 pl-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8d1b1b]/10">
            {users.map((user) => {
              const userId = user._id || user.id || "";
              const userName = user.name || "Unnamed User";
              const userEmail = user.email || "No email";
              const userRole = (user.role || "customer").toLowerCase();
              const plan = user.subscriptionPlan || "Free";
              const isBlocked = Boolean(user.isBlocked);
              const isAdmin = userRole === "admin";
              const isActionLoading = actionLoadingId === userId;

              return (
                <tr
                  key={userId || userEmail}
                  className="transition hover:bg-[#fffaf2]/60"
                >
                  {/* User info (Avatar + Name + Email) */}
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <Image
                          unoptimized
                          src={user.image}
                          alt={userName}
                          width={40}
                          height={40}
                          className="size-10 shrink-0 rounded-full object-cover ring-2 ring-[#a4161a]/15"
                        />
                      ) : (
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] font-bold text-white shadow-xs">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-extrabold text-[#3d211a]">
                          {userName}
                        </p>
                        <p className="truncate text-xs font-medium text-[#7a5645]">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold capitalize ${
                        userRole === "admin"
                          ? "border-purple-200 bg-purple-50 text-purple-700"
                          : userRole === "vendor"
                          ? "border-orange-200 bg-orange-50 text-[#e05a2b]"
                          : "border-emerald-200 bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {userRole === "admin" ? (
                        <Shield className="size-3" />
                      ) : userRole === "vendor" ? (
                        <Store className="size-3" />
                      ) : (
                        <User className="size-3" />
                      )}
                      {userRole}
                    </span>
                  </td>

                  {/* Subscription Plan */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${
                        plan.toLowerCase() === "premium"
                          ? "border-amber-200 bg-amber-50 text-amber-800"
                          : "border-stone-200 bg-stone-100 text-stone-700"
                      }`}
                    >
                      {plan.toLowerCase() === "premium" && (
                        <Crown className="size-3 text-amber-600" />
                      )}
                      {plan}
                    </span>
                  </td>

                  {/* Status (Active / Blocked) */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
                        isBlocked
                          ? "border-red-200 bg-red-100 text-red-700"
                          : "border-green-200 bg-green-50 text-green-700"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          isBlocked ? "bg-red-600" : "bg-green-600"
                        }`}
                      />
                      {isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Action (Block / Unblock button) */}
                  <td className="py-4 pl-4 pr-6 text-right">
                    {isAdmin ? (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-500">
                        Admin Account
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={isActionLoading}
                        onClick={() => onToggleBlock(userId, isBlocked)}
                        className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3.5 text-xs font-bold transition-all duration-200 disabled:opacity-50 ${
                          isBlocked
                            ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white"
                            : "border-red-300 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white"
                        }`}
                      >
                        {isActionLoading ? (
                          <>
                            <LoaderCircle className="size-3.5 animate-spin" />
                            Updating...
                          </>
                        ) : isBlocked ? (
                          <>
                            <CheckCircle2 className="size-3.5" />
                            Unblock
                          </>
                        ) : (
                          <>
                            <Ban className="size-3.5" />
                            Block
                          </>
                        )}
                      </button>
                    )}
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


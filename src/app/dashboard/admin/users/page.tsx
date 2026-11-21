"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LoaderCircle, ShieldCheck, Users } from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { userBolokUnbolock } from "@/lib/actions/userBlockUnbolock";
import { UserSearchFilterBar } from "./components/UserSearchFilterBar";
import { UserTable, type AppUser } from "./components/UserTable";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function ManageUsersPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [users, setUsers] = useState<AppUser[]>([]);
  // loading is initialized to true to prevent synchronous setState inside useEffect
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch live users from backend
  useEffect(() => {
    let active = true;

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/users`);
        if (!res.ok) {
          throw new Error(`Failed to fetch users: HTTP ${res.status}`);
        }

        const data = await res.json();
        let list: AppUser[] = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data?.data)) {
          list = data.data;
        } else if (Array.isArray(data?.users)) {
          list = data.users;
        }

        if (active) {
          setUsers(list);
          setHasError(false);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        if (active) {
          setHasError(true);
          toast.error("Could not load users list.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      active = false;
    };
  }, []);

  // Handle Block / Unblock action
  const handleToggleBlock = async (userId: string, currentBlocked: boolean) => {
    const nextBlocked = !currentBlocked;
    setActionLoadingId(userId);

    try {
      await userBolokUnbolock(userId, nextBlocked);

      // Optimistically update the UI state after success
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId || user.id === userId
            ? { ...user, isBlocked: nextBlocked }
            : user
        )
      );

      toast.success(
        nextBlocked
          ? "User blocked successfully."
          : "User unblocked successfully."
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update block status.";
      toast.error(errorMessage);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filtered users calculation
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search matching name or email
      const name = (user.name || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || name.includes(query) || email.includes(query);

      // Role matching
      const userRole = (user.role || "customer").toLowerCase();
      const matchesRole =
        roleFilter === "All" || userRole === roleFilter.toLowerCase();

      // Status matching
      const isBlocked = Boolean(user.isBlocked);
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && !isBlocked) ||
        (statusFilter === "Blocked" && isBlocked);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Session check
  if (sessionLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <LoaderCircle
          className="size-9 animate-spin text-[#a4161a]"
          aria-hidden
        />
        <p className="text-sm font-semibold text-[#a87b62]">
          Checking authorization...
        </p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-[30px] border border-[#8d1b1b]/10 bg-white p-8 text-center shadow-[0_32px_80px_-48px_rgba(80,20,10,0.55)]">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] text-white">
          <ShieldCheck className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-[#3d211a]">
          Sign in required
        </h2>
        <p className="mt-2 text-sm text-[#7a5645]">
          Please sign in to access the User Management panel.
        </p>
        <Link
          href="/sign-in"
          className="mt-5 inline-flex h-11 items-center rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] px-6 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition hover:-translate-y-0.5"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-[30px] border border-[#8d1b1b]/10 bg-white p-8 text-center shadow-[0_32px_80px_-48px_rgba(80,20,10,0.55)]">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#a4161a]/10 text-[#a4161a]">
          <ShieldCheck className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-[#3d211a]">
          Admin access only
        </h2>
        <p className="mt-2 text-sm text-[#7a5645]">
          This page is only accessible by administrators.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-flex h-11 items-center rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] px-6 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition hover:-translate-y-0.5"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a4161a]">
          Admin Panel
        </span>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
          Manage Users
        </h1>
        <p className="mt-1.5 text-sm text-[#7a5645] sm:text-base">
          View all registered customers, vendors, and admins with access control.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-sm font-semibold text-[#a87b62]">
            Loading users list...
          </p>
        </div>
      ) : hasError ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-bold text-red-700">Failed to load users.</p>
          <p className="mt-1 text-xs text-red-600">
            Please make sure the backend server is running on {API_BASE}.
          </p>
        </div>
      ) : (
        <>
          {/* Search & Filter Bar */}
          <UserSearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            totalCount={users.length}
            filteredCount={filteredUsers.length}
          />

          {/* User Table */}
          <UserTable
            users={filteredUsers}
            onToggleBlock={handleToggleBlock}
            actionLoadingId={actionLoadingId}
          />
        </>
      )}
    </div>
  );
}


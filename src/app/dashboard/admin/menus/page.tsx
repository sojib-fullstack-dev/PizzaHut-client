'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { LoaderCircle, Pizza, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

import { authClient } from '@/lib/auth-client';
import {
  GetMenuItems,
  UpdateMenuStatus,
  DeleteMenuItem,
} from '@/lib/actions/menu';
import { type MenuItem } from '@/app/components/MenuItemCard';
import { AdminMenuSearchFilterBar } from './components/AdminMenuSearchFilterBar';
import { AdminMenuTable } from './components/AdminMenuTable';

export default function AdminManageMenusPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [items, setItems] = useState<MenuItem[]>([]);
  // loading is initialized to true to prevent synchronous setState inside useEffect
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Fetch live menu items
  useEffect(() => {
    let active = true;

    const loadMenus = async () => {
      try {
        const data = await GetMenuItems();
        let list: MenuItem[] = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data?.data)) {
          list = data.data;
        } else if (Array.isArray(data?.menus)) {
          list = data.menus;
        }

        if (active) {
          setItems(list);
          setHasError(false);
        }
      } catch (err) {
        console.error('Failed to load menus:', err);
        if (active) {
          setHasError(true);
          toast.error('Could not load menu items.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadMenus();

    return () => {
      active = false;
    };
  }, []);

  // Update menu item status (Approve, Reject, Active, Inactive)
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setActionLoadingId(id);
    try {
      const result = await UpdateMenuStatus(id, newStatus);
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
      toast.success(`Item status updated to ${newStatus}!`);
    } catch (err) {
      console.error(err);
      toast.error('Could not update item status.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete menu item
  const handleDeleteItem = async (id: string) => {
    setActionLoadingId(id);
    try {
      const result = await DeleteMenuItem(id);
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success('Menu item deleted successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete menu item.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filtered menu items calculation
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        (item.name || '').toLowerCase().includes(query) ||
        (item.category || '').toLowerCase().includes(query) ||
        (item.location || '').toLowerCase().includes(query) ||
        (item.vendorEmail || '').toLowerCase().includes(query) ||
        (item.vendorId || '').toLowerCase().includes(query);

      const status = item.status || 'Pending';
      const matchesStatus =
        statusFilter === 'All' ||
        status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [items, searchQuery, statusFilter]);

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
          Please sign in to access the Menu Management panel.
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

  if (session.user.role !== 'admin') {
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
      {/* Page Header */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a4161a]">
          Admin Panel
        </span>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
          Manage{' '}
          <span className="bg-gradient-to-r from-[#a4161a] to-[#e05a2b] bg-clip-text text-transparent">
            Menu
          </span>{' '}
          <span className="text-[#d97706]">Items</span>
        </h1>
        <p className="mt-1.5 text-sm text-[#7a5645] sm:text-base">
          Moderate vendor submissions, change live status, and manage the
          platform menu catalog.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-sm font-semibold text-[#a87b62]">
            Loading menu items...
          </p>
        </div>
      ) : hasError ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-bold text-red-700">Failed to load menu items.</p>
          <p className="mt-1 text-xs text-red-600">
            Please make sure the backend server is running.
          </p>
        </div>
      ) : (
        <>
          {/* Search & Filter Bar */}
          <AdminMenuSearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            totalCount={items.length}
            filteredCount={filteredItems.length}
          />

          {/* Menu Table */}
          <AdminMenuTable
            items={filteredItems}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteItem}
            actionLoadingId={actionLoadingId}
          />
        </>
      )}
    </div>
  );
}

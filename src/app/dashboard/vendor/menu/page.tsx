"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  CirclePlus,
  LoaderCircle,
  Pizza,
  UserRound,
  UtensilsCrossed,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { GetMenuItems, UpdateMenuStatus } from "@/lib/actions/menu";
import { MenuItemCard, type MenuItem } from "@/app/components/MenuItemCard";
import { MenuItemDetails } from "@/app/components/MenuItemDetails";
import { MenuItemEdit } from "@/app/components/MenuItemEdit";
import { MenuItemDelete } from "@/app/components/MenuItemDelete";

// Same button style (PizzaHut theme)
const addBtn =
  "inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] px-5 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(194,42,29,0.9)]";

const MenuItemsPages = () => {
  // Better Auth theke session
  const { data: session, isPending } = authClient.useSession();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Modal gular state - kun ta khola ache
  const [viewId, setViewId] = useState(""); // View details modal
  const [editItem, setEditItem] = useState<MenuItem | null>(null); // Edit modal
  const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null); // Delete confirm modal

  // Backend theke menu items load korchi
  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await GetMenuItems();
        setItems(data);
      } catch {
        setLoadError(true);
        toast.error("Could not load menu items");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // Edit save howar por list update
  const handleSaved = (updated: MenuItem) => {
    setItems((previous) =>
      previous.map((i) => (i._id === updated._id ? updated : i))
    );
    setEditItem(null);
  };

  // Delete howar por list update
  const handleDeleted = (id: string) => {
    setItems((previous) => previous.filter((i) => i._id !== id));
    setDeleteItem(null);
  };

  // Status badalbe (Active / Inactive) - ekhon backend PATCH API te jay
  const handleStatusChange = async (id: string, newStatus: string) => {
    const current = items.find((i) => i._id === id);

    // Rule: Active hote gele age admin "Approved" korte hobe
    // (na hole item featured section e jabe na)
    if (
      newStatus === "Active" &&
      current?.status !== "Approved" &&
      current?.status !== "Active"
    ) {
      toast.error("Admin approval pending - can't activate yet.");
      return;
    }

    try {
      const result = await UpdateMenuStatus(id, newStatus);

      // Server jodi reject kore (invalid status etc)
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // Backend e save hole local list o update
      setItems((previous) =>
        previous.map((i) => (i._id === id ? { ...i, status: newStatus } : i))
      );
      toast.success(`Item marked as ${newStatus}!`);
    } catch {
      toast.error("Could not update status.");
    }
  };

  // ========== Better Auth check ==========

  // Session load hocche
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <LoaderCircle
          className="size-9 animate-spin text-[#a4161a]"
          aria-hidden
        />
        <p className="text-sm font-semibold text-[#a87b62]">
          Checking your session...
        </p>
      </div>
    );
  }

  // Login kora nai
  if (!session?.user) {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-[30px] border border-[#8d1b1b]/10 bg-white p-8 text-center shadow-[0_32px_80px_-48px_rgba(80,20,10,0.55)]">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] text-white">
          <UserRound className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-[#3d211a]">
          Please sign in
        </h2>
        <p className="mt-2 text-sm text-[#7a5645]">
          You need to sign in to see your menu items.
        </p>
        <Link href="/sign-in" className={`${addBtn} mt-5`}>
          Sign In
        </Link>
      </div>
    );
  }

  // Vendor chara access nai
  if (session.user.role !== "vendor") {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-[30px] border border-[#8d1b1b]/10 bg-white p-8 text-center shadow-[0_32px_80px_-48px_rgba(80,20,10,0.55)]">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#a4161a]/10 text-[#a4161a]">
          <UtensilsCrossed className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-[#3d211a]">
          Vendor access only
        </h2>
        <p className="mt-2 text-sm text-[#7a5645]">
          This page is only for vendor accounts. Please sign in with a vendor
          account.
        </p>
        <Link href="/sign-in" className={`${addBtn} mt-5`}>
          Sign In as Vendor
        </Link>
      </div>
    );
  }

  // ========== Main page ==========

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#3d211a] sm:text-3xl">
            My Menu Items
          </h1>
          <p className="mt-1 text-sm text-[#7a5645]">
            See, update and manage all your menu items in one place.
          </p>
        </div>

        <Link href="/dashboard/vendor/menu/addmenu" className={addBtn}>
          <CirclePlus className="size-4" aria-hidden />
          Add Menu Item
        </Link>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-sm font-semibold text-[#a87b62]">
            Loading your menu items...
          </p>
        </div>
      ) : loadError ? (
        // Error state - server chalu naki dekhacche
        <div className="rounded-[30px] border border-red-200 bg-red-50 px-6 py-16 text-center">
          <h3 className="text-lg font-extrabold text-red-700">
            Could not load menu items
          </h3>
          <p className="mt-1 text-sm text-red-500">
            Make sure your backend server is running on http://localhost:5000
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>
      ) : items.length === 0 ? (
        // Empty state - kono item nai
        <div className="rounded-[30px] border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-16 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] text-white shadow-[0_16px_32px_-16px_rgba(164,22,26,0.8)]">
            <Pizza className="size-8" aria-hidden />
          </span>
          <h3 className="mt-4 text-lg font-extrabold text-[#3d211a]">
            No menu items yet
          </h3>
          <p className="mt-1 text-sm text-[#7a5645]">
            You haven&apos;t added any items. Add your first item to get
            started.
          </p>
          <Link
            href="/dashboard/vendor/menu/addmenu"
            className={`${addBtn} mt-5`}
          >
            Add Menu Item
          </Link>
        </div>
      ) : (
        // Menu items list
        <>
          <p className="mb-4 text-sm font-semibold text-[#a87b62]">
            {items.length} item{items.length > 1 ? "s" : ""} found
          </p>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <MenuItemCard
                key={item._id}
                item={item}
                onView={setViewId}
                onEdit={setEditItem}
                onDelete={setDeleteItem}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </>
      )}

      {/* ===== Modal gula ===== */}
      {viewId ? (
        <MenuItemDetails itemId={viewId} onClose={() => setViewId("")} />
      ) : null}

      {editItem ? (
        <MenuItemEdit
          item={editItem}
          onClose={() => setEditItem(null)}
          onSaved={handleSaved}
        />
      ) : null}

      {deleteItem ? (
        <MenuItemDelete
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
          onDeleted={handleDeleted}
        />
      ) : null}
    </div>
  );
};

export default MenuItemsPages;

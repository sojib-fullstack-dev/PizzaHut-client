"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  LoaderCircle,
  MapPin,
  MessageSquare,
  Pizza,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import {
  getOrders,
  updateOrderStatus,
  type OrderData,
} from "@/lib/actions/createOrder";
import { OrderTimeline } from "@/app/components/OrderTimeline";

// Server theke asha ekta order (_id shoho)
type Order = OrderData & { _id: string };

// Status er badge color (MenuItemCard er statusColors er sathe same)
const statusBadge: Record<string, string> = {
  Pending: "border-amber-300 bg-amber-100 text-amber-700",
  Accepted: "border-green-300 bg-green-100 text-green-700",
  Rejected: "border-red-300 bg-red-100 text-red-600",
  Cancelled: "border-gray-300 bg-gray-200 text-gray-600",
};

// Dashboard > My Orders page
// getOrders() API theke niye nijer order dekhay (kono hardcode data nai)
const MyOrdersPages = () => {
  // Better Auth theke session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as
    | { id?: string; name: string; email: string }
    | undefined;

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Orders API theke data load — shudhu nijer email er orders
  useEffect(() => {
    // Session load na hooa porjonto wait koro
    if (isPending || !user?.email) return;

    const loadOrders = async () => {
      try {
        // customerEmail query diye backend theke shudhu nijer orders ashbe
        const data = await getOrders(user.email);
        if (!Array.isArray(data)) {
          throw new Error("Orders response was not a list.");
        }
        // Client-side double-check: shudhu nijer email er orders rakhbo
        const mine = data.filter(
          (order) => order.customerEmail === user.email
        );
        setOrders(mine);
        setHasError(false);
      } catch (error) {
        console.error("Could not load orders.", error);
        setHasError(true);
        toast.error("Could not load your orders.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [isPending, user?.email]);

  // orders akhon already filtered by email from backend + client double-check
  const myOrders = orders;

  // Pending order cancel kora jay - ownership check shoho
  const handleCancel = async (orderId: string) => {
    // Ownership check: shudhu nijer order cancel korte parbe
    const target = myOrders.find((o) => o._id === orderId);
    if (!target || target.customerEmail !== user?.email) {
      toast.error("You can only cancel your own orders.");
      return;
    }

    try {
      const result = await updateOrderStatus(orderId, "Cancelled");

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      setOrders((previous) =>
        previous.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
      toast.success("Order cancelled.");
    } catch {
      toast.error("Could not cancel the order.");
    }
  };

  // ========== Session check ==========

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
          <ShoppingBag className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-[#3d211a]">
          Please sign in
        </h2>
        <p className="mt-2 text-sm text-[#7a5645]">
          You need to sign in to see your orders.
        </p>
        <Link
          href="/sign-in"
          className="mt-5 inline-flex h-11 items-center rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] px-6 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Back link - overview page te ferot jay */}
      <Link
        href="/dashboard/customer"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#a4161a] transition-colors hover:text-[#8f1116]"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Overview
      </Link>

      {/* Page heading + Browse menu button */}
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a4161a]">
            Your Pizza Nights
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
            My Orders
          </h1>
          <p className="mt-1.5 text-sm text-[#7a5645] sm:text-base">
            Review your order details and cancel any order while it is still
            pending.
          </p>
        </div>

        <Link
          href="/browseMenu"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-[#a4161a]/25 bg-white px-5 text-sm font-semibold text-[#a4161a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a4161a]/5"
        >
          Browse menu
        </Link>
      </div>

      {isLoading ? (
        // Loading state
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-sm font-semibold text-[#a87b62]">
            Loading your orders...
          </p>
        </div>
      ) : hasError ? (
        // Error state - server bondho thakle
        <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center">
          <p className="font-semibold text-red-700">
            Could not load your orders.
          </p>
        </div>
      ) : myOrders.length === 0 ? (
        // Empty state - kono order nai
        <div className="mt-6 rounded-3xl border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-14 text-center">
          <ShoppingBag
            className="mx-auto size-10 text-[#a4161a]/50"
            aria-hidden
          />
          <h2 className="mt-3 text-lg font-bold text-[#3d211a]">
            No orders yet
          </h2>
          <p className="mt-1 text-sm text-[#7a5645]">
            When you place an order, it will show up here.
          </p>
          <Link
            href="/browseMenu"
            className="mt-5 inline-flex rounded-full bg-[#a4161a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8f1116]"
          >
            Browse the menu
          </Link>
        </div>
      ) : (
        // Order cards - API theke asha nijer shob order
        <div className="mt-6 space-y-4">
          {myOrders.map((order) => {
            const status = order.status || "Pending";
            const placedAt = order.createdAt
              ? new Date(order.createdAt).toLocaleString("en-US")
              : null;

            return (
              <article
                key={order._id}
                className="rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)] sm:p-6"
              >
                {/* Item image + naam | price + status + cancel */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-4">
                    {order.image ? (
                      <Image
                        unoptimized
                        src={order.image}
                        alt={order.itemName || "Menu item"}
                        width={64}
                        height={64}
                        className="size-16 shrink-0 rounded-2xl object-cover sm:size-[72px]"
                      />
                    ) : (
                      <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#a4161a]/10 sm:size-[72px]">
                        <Pizza className="size-7 text-[#a4161a]" aria-hidden />
                      </span>
                    )}
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-extrabold text-[#3d211a]">
                        {order.itemName || "Menu item"}
                      </h2>
                      {order.vendorName ? (
                        <p className="mt-0.5 text-sm font-medium text-[#a87b62]">
                          {order.vendorName}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-lg font-extrabold text-[#a4161a]">
                      ${order.price}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        statusBadge[status] || statusBadge.Pending
                      }`}
                    >
                      {status}
                    </span>

                    {/* Pending order cancel kora jay */}
                    {status === "Pending" ? (
                      <button
                        type="button"
                        onClick={() => handleCancel(order._id)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
                      >
                        <XCircle className="size-3.5" aria-hidden />
                        Cancel order
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Order er baki details */}
                <div className="mt-4 space-y-1.5 border-t border-[#8d1b1b]/10 pt-4 text-sm text-[#7a5645]">
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <p>
                      <span className="font-bold text-[#3d211a]">
                        Delivery date:
                      </span>{" "}
                      {order.deliveryDate || "Not set"}
                    </p>
                    {placedAt ? (
                      <p>
                        <span className="font-bold text-[#3d211a]">
                          Placed:
                        </span>{" "}
                        {placedAt}
                      </p>
                    ) : null}
                  </div>

                  {order.deliveryAddress ? (
                    <p className="flex items-start gap-1.5">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0 text-[#a87b62]"
                        aria-hidden
                      />
                      <span>
                        <span className="font-bold text-[#3d211a]">
                          Delivery address:
                        </span>{" "}
                        {order.deliveryAddress}
                      </span>
                    </p>
                  ) : null}

                  {order.message ? (
                    <p className="flex items-start gap-1.5">
                      <MessageSquare
                        className="mt-0.5 size-4 shrink-0 text-[#a87b62]"
                        aria-hidden
                      />
                      <span>
                        <span className="font-bold text-[#3d211a]">
                          Instructions:
                        </span>{" "}
                        {order.message}
                      </span>
                    </p>
                  ) : null}
                </div>

                {/* Order timeline - konta active sheta highlight */}
                <div className="mt-4 border-t border-[#8d1b1b]/10 pt-4">
                  <OrderTimeline status={order.status} />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPages;

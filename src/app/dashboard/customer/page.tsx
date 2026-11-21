"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  LoaderCircle,
  MapPin,
  Pizza,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { getOrders, type OrderData } from "@/lib/actions/createOrder";

// Server theke asha ekta order (_id shoho)
type Order = OrderData & { _id: string };

// Status er badge color (MenuItemCard er statusColors er sathe same)
const statusBadge: Record<string, string> = {
  Pending: "border-amber-300 bg-amber-100 text-amber-700",
  Accepted: "border-green-300 bg-green-100 text-green-700",
  Rejected: "border-red-300 bg-red-100 text-red-600",
  Cancelled: "border-gray-300 bg-gray-200 text-gray-600",
};

// Dashboard > Customer Overview page
// getOrders() API theke niye nijer order er summary + recent order dekhay
const CustomerDashBoardPages = () => {
  // Better Auth theke session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as
    | { id?: string; name: string; email: string }
    | undefined;

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Orders API theke data load
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        if (!Array.isArray(data)) {
          throw new Error("Orders response was not a list.");
        }
        setOrders(data);
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
  }, []);

  // Shudhu nijer order (customerId match kore), notun age
  const myOrders = orders
    .filter((order) => order.customerId === user?.id)
    .reverse();

  // Status onujayi ginta (purano order e status na thakle Pending)
  const countByStatus = (status: string) =>
    myOrders.filter((order) => (order.status || "Pending") === status).length;

  const stats = [
    {
      label: "Total orders",
      count: myOrders.length,
      icon: ClipboardList,
      chip: "bg-[#a4161a]/10 text-[#a4161a]",
    },
    {
      label: "Pending",
      count: countByStatus("Pending"),
      icon: Clock,
      chip: "bg-amber-100 text-amber-600",
    },
    {
      label: "Accepted",
      count: countByStatus("Accepted"),
      icon: CheckCircle2,
      chip: "bg-green-100 text-green-600",
    },
    {
      label: "Rejected",
      count: countByStatus("Rejected"),
      icon: XCircle,
      chip: "bg-red-100 text-red-600",
    },
  ];

  // Shobcheye recent 3 ta order
  const recentOrders = myOrders.slice(0, 3);

  // Naam er first word diye greeting (e.g. "Ready to order, Test?")
  const firstName = user?.name?.split(" ")[0] || "there";

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
          <Pizza className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-[#3d211a]">
          Please sign in
        </h2>
        <p className="mt-2 text-sm text-[#7a5645]">
          Sign in to see your order overview.
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
      {/* Heading - greeting shoho */}
      <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a4161a]">
        Your Pizza Nights
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
        Ready to order, {firstName}?
      </h1>
      <p className="mt-1.5 text-sm text-[#7a5645] sm:text-base">
        Browse the menu and choose something fresh for your next meal.
      </p>

      {isLoading ? (
        // Loading state
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-sm font-semibold text-[#a87b62]">
            Loading your overview...
          </p>
        </div>
      ) : hasError ? (
        // Error state - server bondho thakle
        <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center">
          <p className="font-semibold text-red-700">
            Could not load your orders.
          </p>
        </div>
      ) : (
        <>
          {/* CTA card - notun order shuru korar jonno */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)] sm:p-6">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#a4161a]/10 text-[#a4161a]">
                <Pizza className="size-6" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold text-[#3d211a]">
                  Find your next favorite
                </h2>
                <p className="mt-0.5 text-sm text-[#7a5645]">
                  Pick a menu item, then add your delivery date and address to
                  continue.
                </p>
              </div>
            </div>

            <Link
              href="/browseMenu"
              className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] px-5 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Browse menu
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>

          {/* Stats - 4 ta card */}
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-[#8d1b1b]/10 bg-white p-4 shadow-[0_20px_50px_-38px_rgba(80,20,10,0.5)] sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${stat.chip}`}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold uppercase tracking-wide text-[#a87b62] sm:text-sm">
                        {stat.label}
                      </p>
                      <p className="mt-0.5 text-2xl font-extrabold text-[#3d211a]">
                        {stat.count}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent orders + My Orders link */}
          <div className="mt-9 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-[#3d211a] sm:text-2xl">
                Recent orders
              </h2>
              <p className="mt-1 text-sm text-[#7a5645]">
                Track responses from your restaurants.
              </p>
            </div>
            <Link
              href="/dashboard/customer/orders"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#a4161a] transition-colors hover:text-[#8f1116]"
            >
              My Orders
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            // Empty state - kono order nai
            <div className="mt-4 rounded-3xl border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-12 text-center">
              <p className="font-bold text-[#3d211a]">No orders yet</p>
              <p className="mt-1 text-sm text-[#7a5645]">
                Your recent orders will show up here.
              </p>
            </div>
          ) : (
            // Recent order cards
            <div className="mt-4 space-y-4">
              {recentOrders.map((order) => {
                const status = order.status || "Pending";

                return (
                  <article
                    key={order._id}
                    className="rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]"
                  >
                    {/* Image + naam + vendor + status | price */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-4">
                        {order.image ? (
                          <Image
                            unoptimized
                            src={order.image}
                            alt={order.itemName || "Menu item"}
                            width={56}
                            height={56}
                            className="size-14 shrink-0 rounded-2xl object-cover"
                          />
                        ) : (
                          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#a4161a]/10">
                            <Pizza
                              className="size-6 text-[#a4161a]"
                              aria-hidden
                            />
                          </span>
                        )}
                        <div className="min-w-0">
                          <h3 className="truncate font-extrabold text-[#3d211a]">
                            {order.itemName || "Menu item"}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            {order.vendorName ? (
                              <span className="text-sm text-[#a87b62]">
                                {order.vendorName}
                              </span>
                            ) : null}
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                                statusBadge[status] || statusBadge.Pending
                              }`}
                            >
                              {status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className="text-lg font-extrabold text-[#a4161a]">
                        ${order.price}
                      </span>
                    </div>

                    {/* Order er chhoto details */}
                    <div className="mt-3 space-y-1 border-t border-[#8d1b1b]/10 pt-3 text-sm text-[#7a5645]">
                      {order.deliveryDate ? (
                        <p>
                          <span className="font-bold text-[#3d211a]">
                            Delivery date:
                          </span>{" "}
                          {order.deliveryDate}
                        </p>
                      ) : null}
                      {order.deliveryAddress ? (
                        <p className="flex items-start gap-1.5">
                          <MapPin
                            className="mt-0.5 size-4 shrink-0 text-[#a87b62]"
                            aria-hidden
                          />
                          <span>
                            <span className="font-bold text-[#3d211a]">
                              Deliver to:
                            </span>{" "}
                            {order.deliveryAddress}
                          </span>
                        </p>
                      ) : null}
                      {order.message ? (
                        <p>
                          <span className="font-bold text-[#3d211a]">
                            Note:
                          </span>{" "}
                          {order.message}
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerDashBoardPages;

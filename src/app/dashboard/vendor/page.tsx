'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  Crown,
  Pizza,
  PlusCircle,
  UtensilsCrossed,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

interface MenuItem {
  _id: string;
  vendorId?: string;
  vendorEmail?: string;
  status?: string;
}

interface OrderItem {
  _id: string;
  vendorId?: string;
  vendorEmail?: string;
  status?: string;
}

export default function VendorOverviewPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  const vendorEmail = session?.user?.email;
  const vendorId = session?.user?.id;
  const userWithPlan = session?.user as
    | { subscriptionPlan?: string; name?: string }
    | undefined;
  const currentPlan =
    userWithPlan?.subscriptionPlan?.toLowerCase() === 'premium'
      ? 'Premium'
      : 'Free';

  useEffect(() => {
    if (sessionLoading) return;

    let active = true;

    const loadOverviewData = async () => {
      try {
        if (!vendorEmail && !vendorId) {
          if (active) setLoading(false);
          return;
        }

        const [menuRes, orderRes] = await Promise.all([
          fetch(
            vendorEmail
              ? `${API_BASE}/menus?vendorEmail=${encodeURIComponent(vendorEmail)}`
              : `${API_BASE}/menus?vendorId=${encodeURIComponent(vendorId || '')}`
          ),
          fetch(
            vendorEmail
              ? `${API_BASE}/orders?vendorEmail=${encodeURIComponent(vendorEmail)}`
              : `${API_BASE}/orders?vendorId=${encodeURIComponent(vendorId || '')}`
          ),
        ]);

        if (!menuRes.ok || !orderRes.ok) {
          throw new Error('Failed to load vendor overview data.');
        }

        const menuData: MenuItem[] = await menuRes.json();
        const orderData: OrderItem[] = await orderRes.json();

        const myMenus = (Array.isArray(menuData) ? menuData : []).filter(
          (item) =>
            (vendorEmail && item.vendorEmail === vendorEmail) ||
            (vendorId && item.vendorId === vendorId)
        );

        const myOrders = (Array.isArray(orderData) ? orderData : []).filter(
          (ord) =>
            (vendorEmail && ord.vendorEmail === vendorEmail) ||
            (vendorId && ord.vendorId === vendorId)
        );

        if (active) {
          setMenus(myMenus);
          setOrders(myOrders);
        }
      } catch (err) {
        if (active) {
          toast.error(
            err instanceof Error ? err.message : 'Could not load overview.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadOverviewData();

    return () => {
      active = false;
    };
  }, [sessionLoading, vendorEmail, vendorId]);

  const totalMenuItems = menus.length;
  const activeMenuItems = menus.filter((m) => m.status === 'Active').length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const acceptedOrders = orders.filter((o) => o.status === 'Accepted').length;
  const rejectedOrders = orders.filter((o) => o.status === 'Rejected').length;

  const stats = [
    {
      label: 'Total Menu Items',
      value: totalMenuItems,
      icon: UtensilsCrossed,
      accent: 'bg-orange-100 text-[#a4161a]',
    },
    {
      label: 'Active Menu Items',
      value: activeMenuItems,
      icon: Pizza,
      accent: 'bg-emerald-100 text-emerald-700',
    },
    {
      label: 'Pending Customer Orders',
      value: pendingOrders,
      icon: Clock,
      accent: 'bg-amber-100 text-amber-700',
    },
    {
      label: 'Accepted Orders',
      value: acceptedOrders,
      icon: CheckCircle2,
      accent: 'bg-sky-100 text-sky-700',
    },
    {
      label: 'Current Subscription Plan',
      value: currentPlan,
      icon: Crown,
      accent: 'bg-purple-100 text-purple-700',
    },
  ];

  const maxOrderCount = Math.max(
    pendingOrders,
    acceptedOrders,
    rejectedOrders,
    1
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#e6c8be] bg-[#faece6] px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#b53b22] uppercase">
            <UtensilsCrossed className="h-3.5 w-3.5 text-[#c94a24]" />
            <span>Vendor Dashboard</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
            Vendor{' '}
            <span className="bg-gradient-to-r from-[#9e1b1e] to-[#e05a2b] bg-clip-text text-transparent">
              Overview
            </span>
          </h1>

          <p className="mt-1.5 text-sm text-[#6f4a3a]">
            Summary of your menu items, incoming orders, and subscription plan.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/add-menu"
          className="inline-flex items-center gap-2 rounded-xl bg-[#a4161a] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#891215]"
        >
          <PlusCircle className="h-4 w-4" />
          Add Menu Item
        </Link>
      </div>

      {loading || sessionLoading ? (
        <div className="rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2] p-8 text-center text-sm text-[#6f4a3a]">
          Loading vendor overview...
        </div>
      ) : (
        <>
          {/* 5 Required Stat Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2] p-5 shadow-xs"
                >
                  <div>
                    <p className="text-xs font-medium text-[#6f4a3a]">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-2xl font-bold text-[#3d211a]">
                      {item.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simple Order & Menu Visual Summary */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2] p-6">
              <h2 className="mb-4 text-base font-bold text-[#3d211a]">
                Orders Breakdown
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <div className="mb-1 flex justify-between font-medium text-[#3d211a]">
                    <span>Pending Orders</span>
                    <span>{pendingOrders}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#f7efe4]">
                    <div
                      className="h-2.5 rounded-full bg-amber-500"
                      style={{
                        width: `${(pendingOrders / maxOrderCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between font-medium text-[#3d211a]">
                    <span>Accepted Orders</span>
                    <span>{acceptedOrders}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#f7efe4]">
                    <div
                      className="h-2.5 rounded-full bg-emerald-600"
                      style={{
                        width: `${(acceptedOrders / maxOrderCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between font-medium text-[#3d211a]">
                    <span>Rejected Orders</span>
                    <span>{rejectedOrders}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#f7efe4]">
                    <div
                      className="h-2.5 rounded-full bg-rose-500"
                      style={{
                        width: `${(rejectedOrders / maxOrderCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2] p-6">
              <div>
                <h2 className="text-base font-bold text-[#3d211a]">
                  Plan & Menu Limit ({currentPlan})
                </h2>
                <p className="mt-1 text-xs text-[#6f4a3a]">
                  {currentPlan === 'Free'
                    ? `You are using ${activeMenuItems} of 3 active menu item slots on the Free plan.`
                    : 'You have unlimited active menu items and featured placement.'}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/dashboard/vendor/customerOrders"
                  className="rounded-xl border border-[#3d211a]/15 bg-white px-4 py-2 text-xs font-semibold text-[#3d211a] hover:bg-[#f7efe4]"
                >
                  View Customer Orders
                </Link>
                {currentPlan === 'Free' && (
                  <Link
                    href="/dashboard/vendor/subscription"
                    className="rounded-xl bg-[#a4161a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#891215]"
                  >
                    Upgrade to Premium
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

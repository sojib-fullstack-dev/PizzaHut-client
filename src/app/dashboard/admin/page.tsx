'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import {
  CheckCircle2,
  Clock,
  LoaderCircle,
  Pizza,
  Receipt,
  ShieldCheck,
  Store,
  UserCheck,
  Users,
  UtensilsCrossed,
  XCircle,
} from 'lucide-react';

import { authClient } from '@/lib/auth-client';
import { GetMenuItems, UpdateMenuStatus } from '@/lib/actions/menu';
import { authFetch } from '@/lib/action/jwtAuth';
import { type MenuItem } from '@/app/components/MenuItemCard';
import { AdminStatCard } from './components/AdminStatCard';
import { AdminPlatformChart } from './components/AdminPlatformChart';

interface UserRecord {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
}

interface TransactionRecord {
  _id?: string;
  amount?: number;
  [key: string]: unknown;
}

// Status er badge color (MenuItemCard er statusColors er sathe same)
const statusBadge: Record<string, string> = {
  Pending: 'border-amber-300 bg-amber-100 text-amber-700',
  Approved: 'border-green-300 bg-green-100 text-green-700',
  Rejected: 'border-red-300 bg-red-100 text-red-600',
  Inactive: 'border-gray-300 bg-gray-200 text-gray-600',
  Active: 'border-green-300 bg-green-100 text-green-700',
};

// Dashboard > Admin Overview page
// - 6 dynamic summary cards
// - Platform activity visual chart
// - Menu Approvals management
const AdminDashBoardPages = () => {
  // Better Auth theke session
  const { data: session, isPending } = authClient.useSession();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Backend theke menus, users o transactions load
  useEffect(() => {
    let active = true;

    const loadDashboardData = async () => {
      try {
        // Parallel dynamic data fetch
        const [menuData, userData, transactionData] = await Promise.all([
          GetMenuItems().catch((err) => {
            console.error('Menus fetch error:', err);
            return [];
          }),
          authFetch('/users')
            .then((res) => (res.ok ? res.json() : []))
            .catch((err) => {
              console.error('Users fetch error:', err);
              return [];
            }),
          authFetch('/transactions')
            .then((res) => (res.ok ? res.json() : []))
            .catch((err) => {
              // safe fallback to [] if transactions endpoint is not created yet
              console.warn('Transactions endpoint fallback to []:', err);
              return [];
            }),
        ]);

        if (!active) return;

        setItems(Array.isArray(menuData) ? menuData : []);
        setUsers(Array.isArray(userData) ? userData : []);
        setTransactions(Array.isArray(transactionData) ? transactionData : []);
        setHasError(false);
      } catch (error) {
        console.error('Could not load admin dashboard data.', error);
        if (active) {
          setHasError(true);
          toast.error('Could not load admin dashboard data.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      active = false;
    };
  }, []);

  // Status update korar function (Approved / Rejected)
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const result = await UpdateMenuStatus(id, newStatus);

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
      toast.error('Could not update status.');
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
          <ShieldCheck className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-[#3d211a]">
          Please sign in
        </h2>
        <p className="mt-2 text-sm text-[#7a5645]">
          You need to sign in to access the Admin Panel.
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

  // Admin chara access nai
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
          This page is only for admin accounts.
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

  // ========== Dynamic Metrics Calculation ==========
  const totalRegisteredUsers = users.length;
  const totalVendors = users.filter((u) => u.role === 'vendor').length;
  const totalCustomers = users.filter((u) => u.role === 'customer').length;
  const totalMenuItems = items.length;
  const pendingMenuItems = items.filter(
    (i) => (i.status || 'Pending') === 'Pending'
  ).length;
  const totalTransactions = transactions.length;

  // Chart data packet
  const platformMetrics = {
    totalUsers: totalRegisteredUsers,
    totalVendors,
    totalCustomers,
    totalMenus: totalMenuItems,
    pendingMenus: pendingMenuItems,
    totalTransactions,
  };

  // Pending item gula - eguloi admin er kaj
  const pendingItems = items.filter(
    (i) => (i.status || 'Pending') === 'Pending'
  );
  // Baki item gula - status dekhay (manage na)
  const otherItems = items.filter((i) => (i.status || 'Pending') !== 'Pending');

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Page heading */}
      <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a4161a]">
        Admin Panel
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
        Platform{' '}
        <span className="bg-gradient-to-r from-[#a4161a] to-[#e05a2b] bg-clip-text text-transparent">
          Overview
        </span>{' '}
        & <span className="text-[#d97706]">Approvals</span>
      </h1>
      <p className="mt-1.5 text-sm text-[#7a5645] sm:text-base">
        Monitor real-time platform statistics, review vendors, and approve menu
        items.
      </p>

      {loading ? (
        // Loading state
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-sm font-semibold text-[#a87b62]">
            Loading platform overview...
          </p>
        </div>
      ) : hasError ? (
        // Error state - server bondho thakle
        <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center">
          <p className="font-semibold text-red-700">
            Could not load platform overview data.
          </p>
        </div>
      ) : (
        <>
          {/* 6 Required Dynamic Summary Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AdminStatCard
              title="Total Registered Users"
              value={totalRegisteredUsers}
              icon={Users}
              iconBg="bg-blue-100"
              iconColor="text-blue-700"
              subtitle="All registered accounts"
            />
            <AdminStatCard
              title="Total Vendors"
              value={totalVendors}
              icon={Store}
              iconBg="bg-orange-100"
              iconColor="text-[#ea580c]"
              subtitle="Food vendor partners"
            />
            <AdminStatCard
              title="Total Customers"
              value={totalCustomers}
              icon={UserCheck}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-700"
              subtitle="Food ordering users"
            />
            <AdminStatCard
              title="Total Menu Items"
              value={totalMenuItems}
              icon={UtensilsCrossed}
              iconBg="bg-red-100"
              iconColor="text-[#a4161a]"
              subtitle="Items catalog on platform"
            />
            <AdminStatCard
              title="Pending Menu Items"
              value={pendingMenuItems}
              icon={Clock}
              iconBg="bg-amber-100"
              iconColor="text-amber-700"
              subtitle="Awaiting admin review"
            />
            <AdminStatCard
              title="Total Transactions"
              value={totalTransactions}
              icon={Receipt}
              iconBg="bg-purple-100"
              iconColor="text-purple-700"
              subtitle="Orders & payment records"
            />
          </div>

          {/* Visual Platform Activity Chart & Composition */}
          <AdminPlatformChart metrics={platformMetrics} />

          {/* Pending approvals */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#3d211a] sm:text-2xl">
                  <span className="bg-gradient-to-r from-[#a4161a] to-[#e05a2b] bg-clip-text text-transparent">
                    Pending
                  </span>{' '}
                  <span className="text-[#d97706]">approvals</span>
                  <span className="ml-2 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                    {pendingItems.length}
                  </span>
                </h2>
                <p className="mt-1 text-xs text-[#7a5645]">
                  Review items submitted by vendors before they go live on the
                  featured menu.
                </p>
              </div>
            </div>

            {pendingItems.length === 0 ? (
              <div className="mt-4 rounded-3xl border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-10 text-center">
                <CheckCircle2
                  className="mx-auto size-9 text-green-500"
                  aria-hidden
                />
                <p className="mt-3 font-bold text-[#3d211a]">All caught up!</p>
                <p className="mt-1 text-sm text-[#7a5645]">
                  No items waiting for approval.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {pendingItems.map((item) => (
                  <ApprovalCard
                    key={item._id}
                    item={item}
                    onStatusChange={handleStatusChange}
                    showActions
                  />
                ))}
              </div>
            )}
          </div>

          {/* Baki item gula - shudhu status */}
          {otherItems.length > 0 ? (
            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-[#3d211a] sm:text-2xl">
                <span className="bg-gradient-to-r from-[#a4161a] to-[#e05a2b] bg-clip-text text-transparent">
                  Other
                </span>{' '}
                <span className="text-[#d97706]">items</span>
              </h2>
              <div className="mt-4 space-y-4">
                {otherItems.map((item) => (
                  <ApprovalCard
                    key={item._id}
                    item={item}
                    onStatusChange={handleStatusChange}
                    showActions={false}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

// Ekta menu item er approval row (image + info + status + action)
type ApprovalCardProps = {
  item: MenuItem;
  onStatusChange: (id: string, status: string) => void;
  showActions: boolean;
};

function ApprovalCard({
  item,
  onStatusChange,
  showActions,
}: ApprovalCardProps) {
  const status = item.status || 'Pending';
  // vendor info notun item e thake (purano gula te nai)
  const vendorName =
    (item as MenuItem & { vendorName?: string }).vendorName ||
    'Pizza Hut Kitchen';

  return (
    <article className="rounded-3xl border border-[#8d1b1b]/10 bg-white p-4 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)] sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Image + naam + vendor + category */}
        <div className="flex min-w-0 items-center gap-4">
          {item.image ? (
            <Image
              unoptimized
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="size-16 shrink-0 rounded-2xl object-cover"
            />
          ) : (
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#a4161a]/10">
              <Pizza className="size-7 text-[#a4161a]" aria-hidden />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="truncate text-base font-extrabold text-[#3d211a] sm:text-lg">
              {item.name}
            </h3>
            <p className="mt-0.5 truncate text-sm text-[#a87b62]">
              {vendorName} · {item.category}
            </p>
            <p className="mt-0.5 text-xs font-medium text-[#7a5645]">
              {item.location}
            </p>
          </div>
        </div>

        {/* Price + status + action */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-lg font-extrabold text-[#a4161a]">
            ${item.price}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold ${
              statusBadge[status] || statusBadge.Pending
            }`}
          >
            {status}
          </span>

          {/* Pending hole Approve / Reject button */}
          {showActions && status === 'Pending' ? (
            <>
              <button
                type="button"
                onClick={() => onStatusChange(item._id, 'Approved')}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-4 text-xs font-semibold text-green-700 transition-all duration-200 hover:bg-green-600 hover:text-white"
              >
                <CheckCircle2 className="size-3.5" aria-hidden />
                Approve
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(item._id, 'Rejected')}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
              >
                <XCircle className="size-3.5" aria-hidden />
                Reject
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* Approved hole hint - vendor ke Active korte bolte hobe */}
      {status === 'Approved' ? (
        <p className="mt-3 border-t border-[#8d1b1b]/10 pt-3 text-xs font-semibold text-green-700">
          Approved - waiting for the vendor to make it Active.
        </p>
      ) : null}
      {status === 'Active' ? (
        <p className="mt-3 border-t border-[#8d1b1b]/10 pt-3 text-xs font-semibold text-green-700">
          Live on the Featured Menu Items section.
        </p>
      ) : null}
    </article>
  );
}

export default AdminDashBoardPages;

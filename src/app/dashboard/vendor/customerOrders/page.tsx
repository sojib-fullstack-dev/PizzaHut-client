'use client';

import React, { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Pizza,
  ShoppingBag,
  User,
  XCircle,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import {
  getVendorCustomerOrders,
  updateOrderStatus,
} from '@/lib/actions/customerOrders';

interface CustomerOrder {
  _id: string;
  itemName?: string;
  name?: string;
  image?: string;
  price?: number | string;
  customerName?: string;
  customerEmail?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  address?: string;
  message?: string;
  note?: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Cancelled' | string;
  vendorId?: string;
  vendorEmail?: string;
}

const CustomerOrdersPages = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const vendorEmail = session?.user?.email;
  const vendorId = session?.user?.id;

  useEffect(() => {
    if (sessionLoading) return;

    let active = true;

    const loadOrders = async () => {
      try {
        if (!vendorEmail && !vendorId) {
          if (active) setLoading(false);
          return;
        }

        const data = await getVendorCustomerOrders({ vendorEmail, vendorId });
        const list = Array.isArray(data) ? data : data.orders || [];

        if (active) {
          setOrders(list);
        }
      } catch (err) {
        if (active) {
          toast.error(
            err instanceof Error ? err.message : 'Failed to load orders.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadOrders();

    return () => {
      active = false;
    };
  }, [sessionLoading, vendorEmail, vendorId]);

  const handleDecision = async (
    orderId: string,
    status: 'Accepted' | 'Rejected'
  ) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, {
        status,
        vendorEmail,
        vendorId,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      toast.success(`Order ${status.toLowerCase()} successfully.`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Could not update order status.'
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Rejected':
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#e6c8be] bg-[#faece6] px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#b53b22] uppercase">
          <ShoppingBag className="h-3.5 w-3.5 text-[#c94a24]" />
          <span>Order Management</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
          Customer{' '}
          <span className="bg-gradient-to-r from-[#9e1b1e] to-[#e05a2b] bg-clip-text text-transparent">
            Orders
          </span>
        </h1>

        <p className="mt-1.5 text-sm text-[#6f4a3a]">
          Review incoming PizzaHut orders and accept or reject pending requests.
        </p>
      </div>

      {loading || sessionLoading ? (
        <div className="rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2] p-8 text-center text-sm text-[#6f4a3a]">
          Loading customer orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2] p-10 text-center">
          <Pizza className="mx-auto mb-3 h-10 w-10 text-[#a4161a]" />
          <p className="text-base font-semibold text-[#3d211a]">
            No customer orders yet
          </p>
          <p className="mt-1 text-sm text-[#6f4a3a]">
            Orders placed on your menu items will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const title = order.itemName || order.name || 'Pizza Order';
            const address = order.deliveryAddress || order.address || 'N/A';
            const customerMessage = order.message || order.note;
            const isPending = order.status === 'Pending';

            return (
              <div
                key={order._id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2] p-5 shadow-xs sm:flex-row sm:items-center"
              >
                {/* বাম পাশ: আইটেম, কাস্টমার ও ডেলিভারি তথ্য */}
                <div className="flex items-start gap-4">
                  {order.image ? (
                    <img
                      src={order.image}
                      alt={title}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#f7efe4] text-[#a4161a]">
                      <Pizza className="h-8 w-8" />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-lg font-bold text-[#3d211a]">
                        {title}
                      </h2>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getBadgeStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {order.price !== undefined && (
                      <p className="text-sm font-semibold text-[#a4161a]">
                        Price: ৳{order.price}
                      </p>
                    )}

                    {/* Customer Info */}
                    <p className="flex items-center gap-1.5 text-xs text-[#3d211a]">
                      <User className="h-3.5 w-3.5 text-[#a4161a]" />
                      <span className="font-medium">
                        {order.customerName || 'Customer'}
                      </span>
                      {order.customerEmail && (
                        <span className="text-[#6f4a3a]">
                          ({order.customerEmail})
                        </span>
                      )}
                    </p>

                    {/* Delivery Date & Address */}
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#6f4a3a]">
                      {order.deliveryDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-[#a4161a]" />
                          Date: {order.deliveryDate}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-[#a4161a]" />
                        {address}
                      </span>
                    </div>

                    {/* Customer Message */}
                    {customerMessage && (
                      <p className="flex items-start gap-1.5 text-xs text-[#6f4a3a]">
                        <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#a4161a]" />
                        <span>{customerMessage}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* ডান পাশ: শুধু Pending অর্ডারের জন্য Accept / Reject বাটন */}
                <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                  {isPending ? (
                    <>
                      <button
                        type="button"
                        disabled={updatingId === order._id}
                        onClick={() => handleDecision(order._id, 'Accepted')}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Accept
                      </button>

                      <button
                        type="button"
                        disabled={updatingId === order._id}
                        onClick={() => handleDecision(order._id, 'Rejected')}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-medium text-[#6f4a3a]">
                      Decision locked ({order.status})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerOrdersPages;

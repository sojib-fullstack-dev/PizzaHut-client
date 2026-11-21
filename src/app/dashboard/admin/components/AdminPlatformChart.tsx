"use client";

import React, { useSyncExternalStore } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChart3, TrendingUp } from "lucide-react";

export interface PlatformMetrics {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalMenus: number;
  pendingMenus: number;
  totalTransactions: number;
}

interface AdminPlatformChartProps {
  metrics: PlatformMetrics;
}

const emptySubscribe = () => () => {};

export function AdminPlatformChart({ metrics }: AdminPlatformChartProps) {
  // React 19 recommended hydration-safe mount detection without cascading renders
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const chartData = [
    { name: "Users", count: metrics.totalUsers, color: "#2563eb" },
    { name: "Vendors", count: metrics.totalVendors, color: "#ea580c" },
    { name: "Customers", count: metrics.totalCustomers, color: "#16a34a" },
    { name: "Menus", count: metrics.totalMenus, color: "#a4161a" },
    { name: "Pending", count: metrics.pendingMenus, color: "#d97706" },
    { name: "Orders/Tx", count: metrics.totalTransactions, color: "#9333ea" },
  ];

  const maxVal = Math.max(
    metrics.totalUsers,
    metrics.totalMenus,
    metrics.totalTransactions,
    10
  );

  return (
    <div className="mt-8 rounded-3xl border border-[#8d1b1b]/10 bg-white p-6 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#8d1b1b]/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[#a4161a]/10 text-[#a4161a]">
            <BarChart3 className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-[#3d211a] sm:text-xl">
              Platform Activity & Metrics
            </h2>
            <p className="text-xs font-medium text-[#7a5645]">
              Real-time comparative distribution across platform entities
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          <TrendingUp className="size-3.5" aria-hidden />
          <span>Live Backend Data</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recharts Bar Chart (2 columns) */}
        <div className="lg:col-span-2">
          <h3 className="mb-3 text-sm font-bold text-[#3d211a]">
            Overview Distribution
          </h3>
          <div className="h-64 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#7a5645", fontSize: 12, fontWeight: 600 }}
                    axisLine={{ stroke: "#f1dcd4" }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "#a87b62", fontSize: 11 }}
                    axisLine={{ stroke: "#f1dcd4" }}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(164, 22, 26, 0.05)" }}
                    contentStyle={{
                      backgroundColor: "#fffaf2",
                      borderColor: "rgba(141, 27, 27, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 10px 25px -5px rgba(80, 20, 10, 0.15)",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#3d211a",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={36}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs font-semibold text-[#a87b62]">
                Loading visual chart...
              </div>
            )}
          </div>
        </div>

        {/* Visual Progress Breakdown (1 column) */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2] p-4 sm:p-5">
          <h3 className="text-sm font-bold text-[#3d211a]">
            Ratio & Composition
          </h3>

          <div className="space-y-4 py-2">
            {/* Users Breakdown */}
            <div>
              <div className="mb-1.5 flex justify-between text-xs font-bold text-[#3d211a]">
                <span>Vendors vs Customers</span>
                <span>
                  {metrics.totalVendors} / {metrics.totalCustomers}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f1dcd4]">
                <div
                  className="h-2.5 rounded-full bg-[#ea580c] transition-all duration-500"
                  style={{
                    width: `${
                      metrics.totalUsers > 0
                        ? (metrics.totalVendors / metrics.totalUsers) * 100
                        : 0
                    }%`,
                  }}
                  title={`Vendors: ${metrics.totalVendors}`}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] font-semibold text-[#7a5645]">
                <span>Vendors ({metrics.totalVendors})</span>
                <span>Customers ({metrics.totalCustomers})</span>
              </div>
            </div>

            {/* Menus Breakdown */}
            <div>
              <div className="mb-1.5 flex justify-between text-xs font-bold text-[#3d211a]">
                <span>Pending Approvals</span>
                <span className="text-amber-700">
                  {metrics.pendingMenus} / {metrics.totalMenus}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f1dcd4]">
                <div
                  className="h-2.5 rounded-full bg-amber-500 transition-all duration-500"
                  style={{
                    width: `${
                      metrics.totalMenus > 0
                        ? (metrics.pendingMenus / metrics.totalMenus) * 100
                        : 0
                    }%`,
                  }}
                  title={`Pending: ${metrics.pendingMenus}`}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] font-semibold text-[#7a5645]">
                <span>Pending ({metrics.pendingMenus})</span>
                <span>
                  Approved/Other (
                  {Math.max(0, metrics.totalMenus - metrics.pendingMenus)})
                </span>
              </div>
            </div>

            {/* Transactions Count */}
            <div>
              <div className="mb-1.5 flex justify-between text-xs font-bold text-[#3d211a]">
                <span>Transactions Activity</span>
                <span className="text-purple-700">
                  {metrics.totalTransactions}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f1dcd4]">
                <div
                  className="h-2.5 rounded-full bg-purple-600 transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (metrics.totalTransactions / maxVal) * 100
                    )}%`,
                  }}
                  title={`Transactions: ${metrics.totalTransactions}`}
                />
              </div>
              <p className="mt-1 text-[10px] font-medium text-[#a87b62]">
                {metrics.totalTransactions > 0
                  ? `${metrics.totalTransactions} transactions recorded`
                  : "No recorded transactions yet (0)"}
              </p>
            </div>
          </div>

          <div className="border-t border-[#3d211a]/10 pt-3 text-[11px] font-medium text-[#7a5645]">
            Total platform resources:{" "}
            <span className="font-bold text-[#3d211a]">
              {metrics.totalUsers + metrics.totalMenus + metrics.totalTransactions}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


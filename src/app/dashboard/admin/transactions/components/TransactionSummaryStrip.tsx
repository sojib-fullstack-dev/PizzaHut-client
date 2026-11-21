"use client";

import React from "react";
import { CheckCircle2, Crown, DollarSign, Receipt } from "lucide-react";
import { TransactionRecord } from "@/lib/action/transactionActions";

interface TransactionSummaryStripProps {
  transactions: TransactionRecord[];
}

export function TransactionSummaryStrip({
  transactions,
}: TransactionSummaryStripProps) {
  const totalRevenue = transactions.reduce(
    (acc, t) => acc + (typeof t.amount === "number" ? t.amount : 0),
    0
  );

  const successfulPayments = transactions.filter(
    (t) =>
      t.payment_status?.toLowerCase() === "paid" ||
      t.status?.toLowerCase() === "complete"
  ).length;

  const premiumUpgrades = transactions.filter(
    (t) => t.plan?.toLowerCase() === "premium"
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Revenue */}
      <div className="flex items-center justify-between rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#7a5645]">
            Total Revenue
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-[#3d211a] sm:text-3xl">
            ${totalRevenue.toFixed(2)}
          </p>
          <p className="mt-1 text-xs font-medium text-[#a87b62]">
            Lifetime platform earnings
          </p>
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <DollarSign className="size-6 stroke-[2.5]" />
        </div>
      </div>

      {/* Total Transactions */}
      <div className="flex items-center justify-between rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#7a5645]">
            Transactions
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-[#3d211a] sm:text-3xl">
            {transactions.length}
          </p>
          <p className="mt-1 text-xs font-medium text-[#a87b62]">
            Total processed orders
          </p>
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
          <Receipt className="size-6" />
        </div>
      </div>

      {/* Successful Payments */}
      <div className="flex items-center justify-between rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#7a5645]">
            Successful
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-[#3d211a] sm:text-3xl">
            {successfulPayments}
          </p>
          <p className="mt-1 text-xs font-medium text-[#a87b62]">
            Verified Stripe checkouts
          </p>
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
          <CheckCircle2 className="size-6" />
        </div>
      </div>

      {/* Premium Upgrades */}
      <div className="flex items-center justify-between rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#7a5645]">
            Vendor Upgrades
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-[#3d211a] sm:text-3xl">
            {premiumUpgrades}
          </p>
          <p className="mt-1 text-xs font-medium text-[#a87b62]">
            $20 Vendor Premium plans
          </p>
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <Crown className="size-6" />
        </div>
      </div>
    </div>
  );
}


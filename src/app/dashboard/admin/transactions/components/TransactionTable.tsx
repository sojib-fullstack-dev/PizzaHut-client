"use client";

import React, { useState } from "react";
import {
  Check,
  CheckCircle2,
  Copy,
  Crown,
  DollarSign,
  Receipt,
  User,
} from "lucide-react";
import { toast } from "react-toastify";
import { TransactionRecord } from "@/lib/action/transactionActions";

interface TransactionTableProps {
  transactions: TransactionRecord[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-[#8d1b1b]/15 bg-white p-12 text-center shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
        <Receipt className="mx-auto size-12 text-[#a87b62]/60" aria-hidden />
        <h3 className="mt-3 text-lg font-bold text-[#3d211a]">
          No transactions found
        </h3>
        <p className="mt-1 text-sm text-[#7a5645]">
          Transactions processed through Stripe checkout will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#8d1b1b]/10 bg-white shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#8d1b1b]/10 bg-[#fffaf2] text-[11px] font-extrabold uppercase tracking-wider text-[#7a5645]">
              <th className="py-4 pl-6 pr-4">User Details</th>
              <th className="px-4 py-4">Plan</th>
              <th className="px-4 py-4">Amount</th>
              <th className="px-4 py-4">Payment Status</th>
              <th className="px-4 py-4">Stripe Identifiers</th>
              <th className="py-4 pl-4 pr-6 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8d1b1b]/10">
            {transactions.map((tx) => {
              const name = tx.userName || "Vendor";
              const email = tx.customer_email || "No email";
              const dateRaw = tx.payment_date || tx.createdAt;
              const formattedDate = dateRaw
                ? new Date(dateRaw).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A";

              const isPaid =
                tx.payment_status?.toLowerCase() === "paid" ||
                tx.status?.toLowerCase() === "complete";

              return (
                <tr
                  key={tx._id || tx.sessionId}
                  className="transition hover:bg-[#fffaf2]/60"
                >
                  {/* User info */}
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] font-bold text-white shadow-xs">
                        {name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 max-w-[200px]">
                        <p className="truncate font-extrabold text-[#3d211a]">
                          {name}
                        </p>
                        <p className="truncate text-xs font-medium text-[#7a5645]">
                          {email}
                        </p>
                        {tx.userId && (
                          <p className="truncate text-[10px] text-[#a87b62]">
                            ID: {tx.userId}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Plan */}
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900">
                      <Crown className="size-3 text-amber-600" />
                      {tx.plan || "Premium"}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-4">
                    <span className="text-base font-extrabold text-[#3d211a]">
                      ${typeof tx.amount === "number" ? tx.amount.toFixed(2) : "20.00"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${
                        isPaid
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : "border-amber-300 bg-amber-50 text-amber-800"
                      }`}
                    >
                      <CheckCircle2 className="size-3 text-emerald-600" />
                      <span className="capitalize">{tx.payment_status || tx.status || "paid"}</span>
                    </span>
                  </td>

                  {/* Stripe Session & Intent */}
                  <td className="px-4 py-4">
                    <div className="space-y-1 text-xs">
                      {tx.sessionId && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold text-[#7a5645]">
                            Session:
                          </span>
                          <span className="max-w-[120px] truncate font-mono text-[11px] text-[#3d211a]">
                            {tx.sessionId}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(tx.sessionId, "Session ID")}
                            className="text-[#a87b62] hover:text-[#a4161a]"
                            title="Copy Session ID"
                          >
                            {copiedId === tx.sessionId ? (
                              <Check className="size-3 text-emerald-600" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                          </button>
                        </div>
                      )}

                      {tx.payment_intent && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold text-[#7a5645]">
                            Intent:
                          </span>
                          <span className="max-w-[120px] truncate font-mono text-[11px] text-[#3d211a]">
                            {tx.payment_intent}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(tx.payment_intent || "", "Payment Intent")
                            }
                            className="text-[#a87b62] hover:text-[#a4161a]"
                            title="Copy Payment Intent"
                          >
                            {copiedId === tx.payment_intent ? (
                              <Check className="size-3 text-emerald-600" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Date (Read-only) */}
                  <td className="py-4 pl-4 pr-6 text-right text-xs font-medium text-[#7a5645]">
                    {formattedDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import {
  getTransactions,
  TransactionRecord,
} from "@/lib/action/transactionActions";
import { TransactionSummaryStrip } from "./components/TransactionSummaryStrip";
import { TransactionSearchFilterBar } from "./components/TransactionSearchFilterBar";
import { TransactionTable } from "./components/TransactionTable";

export default function AdminTransactionsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  // loading is initialized to true to prevent synchronous setState inside useEffect
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch live transactions
  useEffect(() => {
    let active = true;

    const loadTransactions = async () => {
      try {
        const data = await getTransactions();
        if (active) {
          setTransactions(data);
          setHasError(false);
        }
      } catch (err) {
        console.error("Failed to load transactions:", err);
        if (active) {
          setHasError(true);
          toast.error("Could not load transactions list.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadTransactions();

    return () => {
      active = false;
    };
  }, []);

  // Filtered transactions calculation
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        (tx.userName || "").toLowerCase().includes(query) ||
        (tx.customer_email || "").toLowerCase().includes(query) ||
        (tx.sessionId || "").toLowerCase().includes(query) ||
        (tx.payment_intent || "").toLowerCase().includes(query) ||
        (tx.userId || "").toLowerCase().includes(query);

      const status = (tx.payment_status || tx.status || "").toLowerCase();
      const matchesStatus =
        statusFilter === "All" || status === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  // Session checks
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
          Please sign in to access the Transactions log.
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

  if (session.user.role !== "admin") {
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
          Transactions & Payments
        </h1>
        <p className="mt-1.5 text-sm text-[#7a5645] sm:text-base">
          Read-only audit log of all vendor subscription payments verified via Stripe.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-sm font-semibold text-[#a87b62]">
            Loading transaction records...
          </p>
        </div>
      ) : hasError ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-bold text-red-700">Failed to load transactions.</p>
          <p className="mt-1 text-xs text-red-600">
            Please make sure the backend server is running and database is connected.
          </p>
        </div>
      ) : (
        <>
          {/* Top KPI Summary Strip */}
          <TransactionSummaryStrip transactions={transactions} />

          {/* Search & Filter Bar */}
          <TransactionSearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            totalCount={transactions.length}
            filteredCount={filteredTransactions.length}
          />

          {/* Transactions Table */}
          <TransactionTable transactions={filteredTransactions} />
        </>
      )}
    </div>
  );
}


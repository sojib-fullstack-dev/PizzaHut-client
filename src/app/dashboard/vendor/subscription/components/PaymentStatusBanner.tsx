"use client";

import React from "react";
import { CheckCircle2, Info, LoaderCircle, Sparkles, X } from "lucide-react";

interface PaymentStatusBannerProps {
  isVerifying: boolean;
  bannerType: "success" | "canceled" | null;
  onDismiss: () => void;
}

export function PaymentStatusBanner({
  isVerifying,
  bannerType,
  onDismiss,
}: PaymentStatusBannerProps) {
  if (isVerifying) {
    return (
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900 shadow-xs">
        <LoaderCircle className="size-5 shrink-0 animate-spin text-amber-700" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">Verifying payment with Stripe...</p>
          <p className="text-xs text-amber-800">
            Please wait while we confirm your payment and upgrade your account.
          </p>
        </div>
      </div>
    );
  }

  if (bannerType === "success") {
    return (
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="text-sm font-extrabold text-emerald-950">
              Payment Successful!
            </p>
            <p className="text-xs text-emerald-800">
              Your vendor account has been upgraded to Premium ($20). You can now list unlimited menu items!
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-lg p-1 text-emerald-700 hover:bg-emerald-100"
          aria-label="Dismiss banner"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  if (bannerType === "canceled") {
    return (
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-stone-300 bg-[#fffaf2] p-4 text-[#3d211a] shadow-xs">
        <div className="flex items-center gap-3">
          <Info className="size-5 shrink-0 text-[#ea580c]" />
          <div>
            <p className="text-sm font-bold">Checkout was canceled</p>
            <p className="text-xs text-[#6f4a3a]">
              No charges were made. You can upgrade to Premium at any time.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-lg p-1 text-[#6f4a3a] hover:bg-stone-200"
          aria-label="Dismiss banner"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return null;
}


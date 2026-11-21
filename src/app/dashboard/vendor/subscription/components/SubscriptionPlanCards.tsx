"use client";

import React from "react";
import { Check, Crown, DollarSign, LoaderCircle, Sparkles } from "lucide-react";

interface SubscriptionPlanCardsProps {
  currentPlan: "Free" | "Premium";
  onSelectFree: () => Promise<void>;
  onUpgradePremium: () => Promise<void>;
  isFreeLoading: boolean;
  isUpgrading: boolean;
}

export function SubscriptionPlanCards({
  currentPlan,
  onSelectFree,
  onUpgradePremium,
  isFreeLoading,
  isUpgrading,
}: SubscriptionPlanCardsProps) {
  const isFreeActive = currentPlan === "Free";
  const isPremiumActive = currentPlan === "Premium";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Free Plan Card */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#3d211a]/15 bg-[#fffaf2] p-6 shadow-xs">
        <div>
          {/* Header Row */}
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#3d211a]">Free</h2>

            {/* Clickable button / active plan badge */}
            <button
              type="button"
              disabled={isFreeActive || isFreeLoading}
              onClick={onSelectFree}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                isFreeActive
                  ? "border border-emerald-300 bg-emerald-50 text-emerald-800 cursor-default"
                  : "border border-[#3d211a]/20 bg-[#f7efe4] text-[#3d211a] hover:bg-[#ebdccb] cursor-pointer"
              }`}
            >
              {isFreeActive ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Current Plan (Active)</span>
                </>
              ) : isFreeLoading ? (
                <>
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                  <span>Switching...</span>
                </>
              ) : (
                <span>Select Free</span>
              )}
            </button>
          </div>

          {/* Price display with clean dollar icon */}
          <div className="mb-5 flex items-baseline gap-1">
            <span className="flex items-center text-3xl font-extrabold text-[#3d211a]">
              <DollarSign className="h-7 w-7 text-[#6f4a3a]" />
              0
            </span>
            <span className="text-xs font-semibold text-[#6f4a3a]">
              / month
            </span>
          </div>

          {/* Benefits list */}
          <ul className="mb-6 space-y-2.5 text-sm text-[#6f4a3a]">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              Max 3 active menu items
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              Basic vendor dashboard
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              Order management
            </li>
          </ul>
        </div>

        {/* Bottom Action Button */}
        <button
          type="button"
          disabled={isFreeActive || isFreeLoading}
          onClick={onSelectFree}
          className="w-full rounded-xl border border-[#3d211a]/20 bg-[#f7efe4] px-4 py-2.5 text-sm font-semibold text-[#3d211a] transition hover:bg-[#ebdccb] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFreeLoading ? (
            <span className="inline-flex items-center gap-1.5">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Switching to Free...
            </span>
          ) : isFreeActive ? (
            "Current Plan (Active)"
          ) : (
            "Switch to Free Plan"
          )}
        </button>
      </div>

      {/* Premium Plan Card */}
      <div className="flex flex-col justify-between rounded-2xl border-2 border-[#a4161a] bg-[#fffaf2] p-6 shadow-xs">
        <div>
          {/* Header Row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-[#a4161a]" />
              <h2 className="text-xl font-bold text-[#3d211a]">Premium</h2>
            </div>
            {isPremiumActive && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                <Check className="h-3.5 w-3.5 text-emerald-700" />
                Active
              </span>
            )}
          </div>

          {/* Price display: $20 with clean dollar icon */}
          <div className="mb-5 flex items-baseline gap-1">
            <span className="flex items-center text-3xl font-extrabold text-[#a4161a]">
              <DollarSign className="h-7 w-7 text-[#a4161a]" />
              20
            </span>
            <span className="text-xs font-semibold text-[#6f4a3a]">
              / month
            </span>
          </div>

          {/* Benefits list */}
          <ul className="mb-6 space-y-2.5 text-sm text-[#6f4a3a]">
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#a4161a]" />
              Unlimited active items
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#a4161a]" />
              Premium vendor badge
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#a4161a]" />
              Featured menu placement
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#a4161a]" />
              All Free features
            </li>
          </ul>
        </div>

        {/* Bottom Action Button */}
        <button
          type="button"
          disabled={isUpgrading || isPremiumActive}
          onClick={onUpgradePremium}
          className="w-full rounded-xl bg-[#a4161a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#891215] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUpgrading ? (
            <span className="inline-flex items-center gap-1.5">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Redirecting to Stripe...
            </span>
          ) : isPremiumActive ? (
            "Premium Active"
          ) : (
            "Upgrade to Premium ($20)"
          )}
        </button>
      </div>
    </div>
  );
}


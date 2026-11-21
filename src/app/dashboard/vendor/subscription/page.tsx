'use client';

import React, { useState } from 'react';
import { Check, Crown, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';

interface SubscriptionProps {
  currentPlan?: 'Free' | 'Premium';
  onUpgrade?: () => Promise<void> | void;
}

const SubscriptionSection: React.FC<SubscriptionProps> = ({
  currentPlan = 'Free',
  onUpgrade,
}) => {
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgradeClick = async () => {
    try {
      setUpgrading(true);
      if (onUpgrade) {
        await onUpgrade();
      } else {
        toast.info('Upgrade to Premium flow started.');
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Could not upgrade plan.'
      );
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#e6c8be] bg-[#faece6] px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#b53b22] uppercase">
          <Crown className="h-3.5 w-3.5 text-[#c94a24]" />
          <span>Vendor Plan</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
          Subscription{' '}
          <span className="bg-gradient-to-r from-[#9e1b1e] to-[#e05a2b] bg-clip-text text-transparent">
            Plans
          </span>
        </h1>

        <p className="mt-1.5 text-sm text-[#6f4a3a]">
          Compare Free and Premium vendor plans for your PizzaHut store.
        </p>
      </div>

      {/* Plan vs What you get Table */}
      <div className="mb-6 overflow-x-auto rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#3d211a]/10 bg-[#f7efe4] text-[#3d211a]">
              <th className="px-5 py-3.5 font-bold">Plan</th>
              <th className="px-5 py-3.5 font-bold">What you get</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3d211a]/10 text-[#3d211a]">
            <tr>
              <td className="px-5 py-4 font-semibold">Free</td>
              <td className="px-5 py-4 text-[#6f4a3a]">
                Max 3 active menu items, basic vendor dashboard, order
                management
              </td>
            </tr>
            <tr>
              <td className="px-5 py-4 font-semibold text-[#a4161a]">
                Premium
              </td>
              <td className="px-5 py-4 text-[#6f4a3a]">
                Unlimited active items, Premium vendor badge, featured menu
                placement, all Free features
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Free vs Premium Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Free Plan */}
        <div className="rounded-2xl border border-[#3d211a]/15 bg-[#fffaf2] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#3d211a]">Free</h2>
            {currentPlan === 'Free' && (
              <span className="rounded-full bg-[#f7efe4] px-3 py-1 text-xs font-semibold text-[#6f4a3a]">
                Current Plan
              </span>
            )}
          </div>

          <ul className="space-y-2.5 text-sm text-[#6f4a3a]">
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

        {/* Premium Plan */}
        <div className="rounded-2xl border-2 border-[#a4161a] bg-[#fffaf2] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-[#a4161a]" />
              <h2 className="text-xl font-bold text-[#3d211a]">Premium</h2>
            </div>
            {currentPlan === 'Premium' && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Active
              </span>
            )}
          </div>

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

          <button
            type="button"
            disabled={upgrading || currentPlan === 'Premium'}
            onClick={handleUpgradeClick}
            className="w-full rounded-xl bg-[#a4161a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#891215] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentPlan === 'Premium'
              ? 'Premium Active'
              : upgrading
                ? 'Upgrading...'
                : 'Upgrade to Premium'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;

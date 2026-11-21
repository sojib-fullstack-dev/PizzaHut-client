"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Crown, LoaderCircle, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import {
  createCheckoutSession,
  getLiveVendorProfile,
  switchToFreePlan,
  verifyCheckoutSession,
} from "@/lib/action/subscriptionActions";
import { PaymentStatusBanner } from "./components/PaymentStatusBanner";
import { SubscriptionPlanCards } from "./components/SubscriptionPlanCards";

export default function VendorSubscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-sm font-semibold text-[#a87b62]">
            Loading subscription...
          </p>
        </div>
      }
    >
      <SubscriptionContent />
    </Suspense>
  );
}

function SubscriptionContent() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const searchParams = useSearchParams();

  const [currentPlan, setCurrentPlan] = useState<"Free" | "Premium">("Free");
  const [loading, setLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isFreeLoading, setIsFreeLoading] = useState(false);
  const [bannerType, setBannerType] = useState<"success" | "canceled" | null>(
    null
  );

  const sessionId = searchParams.get("session_id");
  const isCanceled = searchParams.get("canceled") === "true";

  // Load live subscription data and handle verification on return
  useEffect(() => {
    let active = true;

    const initializeSubscription = async () => {
      if (sessionLoading) return;

      const user = session?.user;
      if (!user) {
        if (active) setLoading(false);
        return;
      }

      try {
        // 1. Fetch live user profile from backend /users
        let initialPlan: "Free" | "Premium" = "Free";
        try {
          const liveUser = await getLiveVendorProfile(user.email, user.id);
          if (
            liveUser?.premium === true ||
            liveUser?.subscriptionPlan?.toLowerCase() === "premium"
          ) {
            initialPlan = "Premium";
          }
        } catch (profileErr) {
          console.warn("Could not load live vendor profile:", profileErr);
        }

        // 2. Handle Stripe Return with session_id
        if (sessionId) {
          if (active) setIsVerifying(true);

          try {
            const verifyRes = await verifyCheckoutSession({
              sessionId,
              currentUserId: user.id,
            });

            if (verifyRes.success) {
              initialPlan = "Premium";
              if (active) {
                setBannerType("success");
                toast.success(
                  "Payment verified! You are now on the Premium plan."
                );
              }
            } else {
              toast.error(
                verifyRes.message || "Payment verification incomplete."
              );
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            toast.error(
              verifyErr instanceof Error
                ? verifyErr.message
                : "Payment verification failed."
            );
          } finally {
            if (active) setIsVerifying(false);
            // Clean the URL query param so refresh won't re-verify
            window.history.replaceState(null, "", window.location.pathname);
          }
        }

        // 3. Handle canceled checkout
        if (isCanceled) {
          if (active) {
            setBannerType("canceled");
            toast.info("Checkout was canceled. You can upgrade anytime.");
          }
          // Clean the URL query param
          window.history.replaceState(null, "", window.location.pathname);
        }

        if (active) {
          setCurrentPlan(initialPlan);
        }
      } catch (err) {
        console.error("Subscription initialization error:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    initializeSubscription();

    return () => {
      active = false;
    };
  }, [sessionLoading, session?.user, sessionId, isCanceled]);

  // Handle Switch to Free Plan
  const handleSelectFree = async () => {
    if (!session?.user) return;
    if (currentPlan === "Free") {
      toast.info("You are already on the Free plan.");
      return;
    }

    setIsFreeLoading(true);
    try {
      await switchToFreePlan({
        userId: session.user.id,
        userEmail: session.user.email,
      });

      setCurrentPlan("Free");
      setBannerType(null);
      toast.success("Switched to Free plan successfully.");
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Failed to switch to Free plan."
      );
    } finally {
      setIsFreeLoading(false);
    }
  };

  // Handle Upgrade to Premium Click (Stripe Checkout redirect)
  const handleUpgradePremium = async () => {
    if (!session?.user) {
      toast.error("Please sign in to upgrade your subscription.");
      return;
    }

    setIsUpgrading(true);
    try {
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000";

      const successUrl = `${origin}/dashboard/vendor/subscription?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}/dashboard/vendor/subscription?canceled=true`;

      const checkoutData = await createCheckoutSession({
        userId: session.user.id,
        userEmail: session.user.email,
        userName: session.user.name || undefined,
        successUrl,
        cancelUrl,
      });

      if (checkoutData?.url) {
        window.location.href = checkoutData.url;
      } else {
        throw new Error("Stripe checkout URL not received.");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Failed to initiate payment."
      );
      setIsUpgrading(false);
    }
  };

  // Session check
  if (sessionLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <LoaderCircle
          className="size-9 animate-spin text-[#a4161a]"
          aria-hidden
        />
        <p className="text-sm font-semibold text-[#a87b62]">
          Checking session...
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
          Please sign in to manage your vendor subscription plans.
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#e6c8be] bg-[#faece6] px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#b53b22] uppercase">
          <Crown className="h-3.5 w-3.5 text-[#c94a24]" />
          <span>Vendor Plan</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
          Subscription{" "}
          <span className="bg-gradient-to-r from-[#9e1b1e] to-[#e05a2b] bg-clip-text text-transparent">
            Plans
          </span>
        </h1>

        <p className="mt-1.5 text-sm text-[#6f4a3a]">
          Upgrade to Premium ($20) to publish unlimited menu items and get featured on PizzaHut.
        </p>
      </div>

      {/* Payment Feedback Banner */}
      <PaymentStatusBanner
        isVerifying={isVerifying}
        bannerType={bannerType}
        onDismiss={() => setBannerType(null)}
      />

      {/* Plan vs What you get Table */}
      <div className="mb-6 overflow-x-auto rounded-2xl border border-[#3d211a]/10 bg-[#fffaf2]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#3d211a]/10 bg-[#f7efe4] text-[#3d211a]">
              <th className="px-5 py-3.5 font-bold">Plan</th>
              <th className="px-5 py-3.5 font-bold">Price</th>
              <th className="px-5 py-3.5 font-bold">What you get</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3d211a]/10 text-[#3d211a]">
            <tr>
              <td className="px-5 py-4 font-semibold">Free</td>
              <td className="px-5 py-4 font-bold text-[#6f4a3a]">$0</td>
              <td className="px-5 py-4 text-[#6f4a3a]">
                Max 3 active menu items, basic vendor dashboard, order management
              </td>
            </tr>
            <tr>
              <td className="px-5 py-4 font-semibold text-[#a4161a]">
                Premium
              </td>
              <td className="px-5 py-4 font-extrabold text-[#a4161a]">$20</td>
              <td className="px-5 py-4 text-[#6f4a3a]">
                Unlimited active items, Premium vendor badge, featured menu placement, all Free features
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Loading state or Plan Cards */}
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <LoaderCircle
            className="size-8 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-xs font-semibold text-[#a87b62]">
            Loading your subscription details...
          </p>
        </div>
      ) : (
        <SubscriptionPlanCards
          currentPlan={currentPlan}
          onSelectFree={handleSelectFree}
          onUpgradePremium={handleUpgradePremium}
          isFreeLoading={isFreeLoading}
          isUpgrading={isUpgrading}
        />
      )}
    </div>
  );
}

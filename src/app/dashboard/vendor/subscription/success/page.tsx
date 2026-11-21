"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Crown, LoaderCircle, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { verifyCheckoutSession } from "@/lib/action/subscriptionActions";

export default function SubscriptionSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <LoaderCircle
            className="size-9 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <p className="text-sm font-semibold text-[#a87b62]">Loading...</p>
        </div>
      }
    >
      <SubscriptionSuccessContent />
    </Suspense>
  );
}

function SubscriptionSuccessContent() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    const runVerify = async () => {
      if (sessionLoading) return;

      if (!sessionId) {
        if (active) {
          setVerifying(false);
          setSuccess(true);
        }
        return;
      }

      try {
        const res = await verifyCheckoutSession({
          sessionId,
          currentUserId: session?.user?.id,
        });

        if (active) {
          if (res.success) {
            setSuccess(true);
            toast.success("Payment verified! Welcome to Vendor Premium.");
          } else {
            toast.info(res.message || "Payment status checked.");
          }
        }
      } catch (err) {
        console.error("Verification error:", err);
      } finally {
        if (active) setVerifying(false);
      }
    };

    runVerify();

    return () => {
      active = false;
    };
  }, [sessionLoading, sessionId, session?.user?.id]);

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-[#8d1b1b]/10 bg-white p-8 text-center shadow-[0_32px_80px_-48px_rgba(80,20,10,0.55)]">
      {verifying ? (
        <div className="flex flex-col items-center gap-3 py-8">
          <LoaderCircle
            className="size-10 animate-spin text-[#a4161a]"
            aria-hidden
          />
          <h2 className="text-lg font-bold text-[#3d211a]">
            Confirming your payment...
          </h2>
          <p className="text-xs text-[#7a5645]">
            Please wait while we activate your Vendor Premium plan.
          </p>
        </div>
      ) : (
        <>
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] text-white shadow-md">
            <Crown className="size-8" />
          </span>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-[#3d211a]">
            Welcome to Premium!
          </h2>

          <p className="mt-2 text-sm text-[#7a5645]">
            Your payment was processed successfully. You can now publish unlimited active menu items and enjoy premium vendor benefits.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/vendor"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] px-6 text-sm font-semibold text-white shadow-xs transition hover:-translate-y-0.5"
            >
              Go to Vendor Dashboard
            </Link>
            <Link
              href="/dashboard/vendor/menu/addmenu"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#8d1b1b]/20 bg-[#fffaf2] px-6 text-sm font-semibold text-[#3d211a] transition hover:bg-[#faece6]"
            >
              Add New Menu Item
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

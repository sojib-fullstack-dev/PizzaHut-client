// Private API e token header auto attach hoy (jwtAuth helper)
import { authFetch } from "./jwtAuth";

export interface CreateCheckoutSessionParams {
  userId: string;
  userEmail: string;
  userName?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface VerifyCheckoutSessionParams {
  sessionId: string;
  currentUserId?: string;
}

export interface SwitchToFreePlanParams {
  userId: string;
  userEmail: string;
}

export interface CheckoutSessionResponse {
  success: boolean;
  url: string;
  sessionId: string;
  message?: string;
}

export interface VerifyCheckoutResponse {
  success: boolean;
  message?: string;
  payment?: unknown;
  result?: unknown;
  updateResult?: unknown;
}

// 1. Create Stripe Checkout Session ($20 for Vendor Premium Plan)
export async function createCheckoutSession(
  params: CreateCheckoutSessionParams
): Promise<CheckoutSessionResponse> {
  const res = await authFetch("/payments/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.success === false) {
    throw new Error(
      data.message || "Failed to create Stripe checkout session."
    );
  }

  return data as CheckoutSessionResponse;
}

// 2. Verify Stripe Checkout Session on return
export async function verifyCheckoutSession(
  params: VerifyCheckoutSessionParams
): Promise<VerifyCheckoutResponse> {
  const res = await authFetch("/payments/checkout-verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Payment verification failed.");
  }

  return data as VerifyCheckoutResponse;
}

// 3. Switch Vendor back to Free Plan
export async function switchToFreePlan(params: SwitchToFreePlanParams) {
  const res = await authFetch("/subscriptions/free", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Failed to switch to Free plan.");
  }

  return data;
}

// 4. Fetch dynamic live profile from Express backend /users
export async function getLiveVendorProfile(
  userEmail: string,
  userId?: string
) {
  const res = await authFetch("/users");
  if (!res.ok) {
    throw new Error("Failed to fetch live user profile.");
  }

  const data = await res.json();
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.users)
    ? data.users
    : [];

  const matched = list.find(
    (u: { email?: string; _id?: string; id?: string }) =>
      (userEmail && u.email?.toLowerCase() === userEmail.toLowerCase()) ||
      (userId && (u._id === userId || u.id === userId))
  );

  return matched || null;
}


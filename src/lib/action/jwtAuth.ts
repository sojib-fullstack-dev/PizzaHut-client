'use client';

// JWT auth helper
// - POST /jwt theke token niye localStorage e save kore
// - authFetch() private API call e "Authorization: Bearer <token>" auto attach kore
// - useJwtAuthSync() hook session er sathe token sync kore (login e naoya, logout e clear)
// - logout e clearAuthToken() call hoy

import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

const TOKEN_KEY = 'pizzahut_jwt';
const EMAIL_KEY = 'pizzahut_jwt_email';

// Module-level state - kono setState nai (shudhu side effect)
let lastEmail = ''; // logged-in user er email (memory te)
let pendingFetch: Promise<string | null> | null = null; // ekshathe onek call hole ekbar-i request jay

// SSR guard - server e localStorage nai
const hasStorage = () => typeof window !== 'undefined';

// ========== Token get / save / clear ==========

// Stored token get (na thakle null)
export function getAuthToken(): string | null {
  if (!hasStorage()) return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

// Tar token kake jonno chilo (account switch check e lage)
function getTokenEmail(): string {
  if (!hasStorage()) return '';
  return window.localStorage.getItem(EMAIL_KEY) || '';
}

// Token + email save
function saveAuthToken(token: string, email: string) {
  if (!hasStorage()) return;
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(EMAIL_KEY, email);
}

// Token clear (logout e / notun account e)
export function clearAuthToken() {
  if (!hasStorage()) return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(EMAIL_KEY);
  lastEmail = '';
}

// Logged-in user er email - useJwtAuthSync set kore
export function rememberAuthEmail(email: string) {
  lastEmail = email;
}

// Email niye kaj korbo - memory age, tahole localStorage fallback
function getStoredEmail(): string {
  if (lastEmail) return lastEmail;
  return getTokenEmail();
}

// ========== Token fetch ==========

// POST /jwt diye token nei + localStorage e save kore
// (ekhon chole thakle same promise return - duplicate request na)
export function fetchAuthToken(email: string): Promise<string | null> {
  if (!email) return Promise.resolve(null);
  if (pendingFetch) return pendingFetch;

  pendingFetch = (async () => {
    try {
      const res = await fetch(`${API_BASE}/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) return null;

      const data = await res.json();
      if (data?.token) {
        saveAuthToken(data.token, email);
        return data.token as string;
      }
      return null;
    } catch {
      return null;
    } finally {
      pendingFetch = null;
    }
  })();

  return pendingFetch;
}

// Token ensure kore - thakle seta, na thakle (force hole abar) /jwt theke notun
async function ensureToken(force = false): Promise<string | null> {
  const existing = getAuthToken();
  if (existing && !force) return existing;

  const email = getStoredEmail();
  if (email) return fetchAuthToken(email);

  // JwtAuthSync er fetch chole thakle seta wait kori
  if (pendingFetch) return pendingFetch;

  return null;
}

// ========== Header + fetch helper ==========

// Simple header helper - token thakle Bearer header, na hole empty
export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Private API helper - path (e.g. "/orders") + normal fetch options
// Token auto attach kore; 401 hole ekbar notun token diye abar try kore
export async function authFetch(path: string, options: RequestInit = {}) {
  const send = (token: string | null) =>
    fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        ...(options.headers as Record<string, string> | undefined),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

  // Token nei (login er sathe sathe / reload er pore) - nije token niye nei
  const token = await ensureToken();
  let res = await send(token);

  // 401 = token expired / galat - notun token diye ekbar retry
  if (res.status === 401) {
    const fresh = await ensureToken(true);
    if (fresh) res = await send(fresh);
  }

  return res;
}

// ========== Session <-> token sync ==========

// Root layout e thakle - session onujayi token naoya / clear
// (kono setState nai - shudhu localStorage side effect)
export function useJwtAuthSync() {
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // Session load hocche - ekhon kichu korbo na
    if (isPending) return;

    const email = session?.user?.email;

    if (email) {
      rememberAuthEmail(email);

      // Token nei, ba token onno user er - notun token niye nei
      if (!getAuthToken() || getTokenEmail() !== email) {
        void fetchAuthToken(email);
      }
    } else {
      // Actually logged out - token + email clear
      clearAuthToken();
    }
  }, [session?.user?.email, isPending]);
}

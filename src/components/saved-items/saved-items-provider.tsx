"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import type { MenuItem } from "@/app/components/MenuItemCard";
import { authClient } from "@/lib/auth-client";

// Purano key (guest login na thakle ei key e save thake)
const STORAGE_KEY = "pizzahut-saved-items";

// Per-user storage key: login thakle email diye alada key,
// mane je user save korse shudhu shei user er items dekhte parbe
function storageKeyFor(email: string) {
  return email ? `${STORAGE_KEY}:${email}` : STORAGE_KEY;
}

type SavedItemsContextValue = {
  items: MenuItem[];
  isLoaded: boolean;
  isSaved: (id: string) => boolean;
  toggleSavedItem: (item: MenuItem) => void;
};

const SavedItemsContext = createContext<SavedItemsContextValue | null>(null);

function isMenuItem(value: unknown): value is MenuItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item._id === "string" &&
    typeof item.name === "string" &&
    typeof item.category === "string" &&
    typeof item.description === "string" &&
    typeof item.price === "string" &&
    typeof item.location === "string" &&
    typeof item.image === "string"
  );
}

function parseSavedItems(value: string | null): MenuItem[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(isMenuItem) : [];
  } catch (error) {
    console.error("Could not read saved items from browser storage.", error);
    return [];
  }
}

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  // Kon key theke load hoise (null = ekhon load hoyni) - isLoaded derive korte
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  // Current logged-in user er email (per-user key banate lage)
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";
  const activeKey = storageKeyFor(email);

  useEffect(() => {
    // Session load howa porjonto wait (setState sync na - kaj korbo na)
    if (isPending) return;

    let cancelled = false;
    let storedItems: MenuItem[] = [];
    const key = storageKeyFor(email);

    try {
      let raw = window.localStorage.getItem(key);

      // Migration: notun user er key khali + purano shared key e items ache
      // → sheti ekbar notun user er kore nicche (tara age save korechilo)
      if (email && !raw) {
        const legacy = window.localStorage.getItem(STORAGE_KEY);
        if (legacy) {
          window.localStorage.setItem(key, legacy);
          window.localStorage.removeItem(STORAGE_KEY);
          raw = legacy;
        }
      }

      storedItems = parseSavedItems(raw);
    } catch (error) {
      console.error("Could not access saved items in browser storage.", error);
    }

    // Promise diye defer - useEffect er bhitore sync setState na
    void Promise.resolve().then(() => {
      if (cancelled) return;
      setItems(storedItems);
      setLoadedKey(key);
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        setItems(parseSavedItems(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", handleStorage);
    };
  }, [isPending, email]);

  // isLoaded = current user er data asche kina (account switch e purano user er items na dekhay)
  const isLoaded = loadedKey === activeKey;

  const isSaved = useCallback(
    (id: string) => items.some((item) => item._id === id),
    [items]
  );

  const toggleSavedItem = useCallback(
    (item: MenuItem) => {
      if (!isLoaded) return;

      const nextItems = isSaved(item._id)
        ? items.filter((savedItem) => savedItem._id !== item._id)
        : [...items, item];

      try {
        // Current user er key e save (per-user)
        window.localStorage.setItem(activeKey, JSON.stringify(nextItems));
        setItems(nextItems);
      } catch (error) {
        console.error("Could not update saved items in browser storage.", error);
        toast.error("Could not update your saved items.");
      }
    },
    [activeKey, isLoaded, isSaved, items]
  );

  const value = useMemo(
    () => ({ items, isLoaded, isSaved, toggleSavedItem }),
    [items, isLoaded, isSaved, toggleSavedItem]
  );

  return (
    <SavedItemsContext.Provider value={value}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error("useSavedItems must be used within SavedItemsProvider.");
  }
  return context;
}

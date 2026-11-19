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

const STORAGE_KEY = "pizzahut-saved-items";

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let storedItems: MenuItem[] = [];

    try {
      storedItems = parseSavedItems(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      console.error("Could not access saved items in browser storage.", error);
    }

    void Promise.resolve().then(() => {
      if (cancelled) return;
      setItems(storedItems);
      setIsLoaded(true);
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setItems(parseSavedItems(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

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
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
        setItems(nextItems);
      } catch (error) {
        console.error("Could not update saved items in browser storage.", error);
        toast.error("Could not update your saved items.");
      }
    },
    [isLoaded, isSaved, items]
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

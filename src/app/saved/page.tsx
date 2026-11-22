"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bookmark, Pizza } from "lucide-react";
import { MenuCard } from "@/app/components/MenuCard";
import { useSavedItems } from "@/components/saved-items/saved-items-provider";
import { authClient } from "@/lib/auth-client";

export default function SavedItemsPage() {
  const { items, isLoaded } = useSavedItems();
  const router = useRouter();

  // Login check - session load howa porjonto obak
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // Login nai hole sign-in e pathay (setState na - router navigation)
    if (!isPending && !session?.user) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  // Session check / redirect chole jachhe - tokhon loading dekhao
  if (isPending || !session?.user) {
    return (
      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <p className="py-16 text-center text-sm font-semibold text-[#a87b62]">
          Checking your session...
        </p>
      </section>
    );
  }

  // Logged-in = shudhu nijer save items (provider email diye filter kore)

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#8f1116] via-[#a4161a] to-[#ea580c] bg-clip-text text-transparent sm:text-3xl">
          <Bookmark className="size-7 text-[#a4161a]" aria-hidden />
          Saved Items
        </h1>
        <p className="mt-1 text-sm text-[#7a5645]">
          Your favorite menu items are saved here.
        </p>
                    <Link
              href="/browseMenu"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#a4161a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8f1116]"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to Menu
            </Link>
      </div>

      {!isLoaded ? (
        <p className="py-16 text-center text-sm font-semibold text-[#a87b62]">
          Loading saved items...
        </p>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-[#a4161a]/20 bg-white px-6 py-14 text-center">
          <Pizza className="mx-auto size-10 text-[#a4161a]/50" aria-hidden />
          <h2 className="mt-3 text-lg font-bold text-[#3d211a]">
            No saved items yet
          </h2>
          <p className="mt-1 text-sm text-[#7a5645]">
            Save a menu item and it will appear here.
          </p>
          <Link
            href="/dashboard/customer"
            className="mt-5 inline-flex rounded-full bg-[#a4161a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8f1116]"
          >
            Browse the menu
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

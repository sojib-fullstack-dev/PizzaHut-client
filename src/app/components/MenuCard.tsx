"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck, Eye, MapPin, Pizza } from "lucide-react";
import { toast } from "react-toastify";
import { useSavedItems } from "@/components/saved-items/saved-items-provider";
import { authClient } from "@/lib/auth-client";
import type { MenuItem } from "./MenuItemCard";

export function MenuCard({ item }: { item: MenuItem }) {
  const { isSaved, isLoaded, toggleSavedItem } = useSavedItems();
  const saved = isSaved(item._id);
  const router = useRouter();

  // Login check - jodi user login na thake tokhon save korte parbe na
  const { data: session, isPending } = authClient.useSession();

  // Save button click - login nai hole sign-in page e niye jabe
  const handleSaveClick = () => {
    if (!isPending && !session?.user) {
      toast.info("Save korte gele prothome login korte hobe!");
      router.push("/sign-in");
      return;
    }
    toggleSavedItem(item);
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-[#8d1b1b]/10 bg-white shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-35px_rgba(80,20,10,0.6)]">
      <div className="relative h-48 w-full bg-[#fff8ee]">
        {item.image ? (
          <Image
            unoptimized
            src={item.image}
            alt={item.name}
            width={500}
            height={320}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Pizza className="size-10 text-[#a4161a]/30" aria-hidden />
          </div>
        )}
        <button
          type="button"
          onClick={handleSaveClick}
          disabled={!isLoaded || isPending}
          aria-label={saved ? `Remove ${item.name} from saved items` : `Save ${item.name}`}
          aria-pressed={saved}
          title={saved ? "Remove from saved items" : "Save item"}
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-white/95 text-[#a4161a] shadow-md transition hover:scale-105 hover:bg-white disabled:cursor-wait disabled:opacity-70"
        >
          {saved ? (
            <BookmarkCheck className="size-5" aria-hidden />
          ) : (
            <Bookmark className="size-5" aria-hidden />
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="truncate text-base font-extrabold text-[#3d211a]">
            {item.name}
          </h2>
          <span className="shrink-0 rounded-full bg-[#a4161a]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#a4161a]">
            {item.category}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-[#7a5645]">
          {item.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-lg font-extrabold text-[#a4161a]">
            ${item.price}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-[#a87b62]">
            <MapPin className="size-3.5" aria-hidden />
            {item.location}
          </span>
        </div>

        {/* View Details button - click korle dynamic details page e jay */}
        <Link
          href={`/browseMenu/${item._id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#a4161a]/30 bg-white px-4 py-2.5 text-sm font-semibold text-[#a4161a] transition-colors hover:bg-[#a4161a] hover:text-white"
        >
          <Eye className="size-4" aria-hidden />
          View Details
        </Link>
      </div>
    </article>
  );
}

import Link from "next/link"
import { ArrowUpRight, LogIn, Search, ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"

const iconButtonStyles =
  "group relative inline-flex size-10 items-center justify-center rounded-full border border-transparent text-[#5f3b2c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8d1b1b]/10 hover:bg-white/75 hover:text-[#a4161a] hover:shadow-[0_10px_20px_-14px_rgba(120,53,15,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee]"

type SearchButtonProps = {
  className?: string
  onNavigate?: () => void
}

export function SearchButton({ className, onNavigate }: SearchButtonProps) {
  return (
    <Link
      href="/search"
      onClick={onNavigate}
      aria-label="Search the menu"
      title="Search the menu"
      className={cn(iconButtonStyles, className)}
    >
      <Search
        className="size-[18px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
        strokeWidth={2}
        aria-hidden
      />
    </Link>
  )
}

type CartButtonProps = {
  cartItemCount: number
  className?: string
  onNavigate?: () => void
}

export function CartButton({
  cartItemCount,
  className,
  onNavigate,
}: CartButtonProps) {
  const displayCount = cartItemCount > 9 ? "9+" : cartItemCount

  return (
    <Link
      href="/cart"
      onClick={onNavigate}
      aria-label={`Shopping cart, ${cartItemCount} ${
        cartItemCount === 1 ? "item" : "items"
      }`}
      title="View your cart"
      className={cn(iconButtonStyles, className)}
    >
      <ShoppingCart
        className="size-[18px] transition-transform duration-300 group-hover:-rotate-6"
        strokeWidth={2}
        aria-hidden
      />
      {cartItemCount > 0 ? (
        <span
          aria-hidden
          className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gradient-to-br from-[#a4161a] to-[#f97316] px-1 text-[9.5px] font-bold leading-none text-white shadow-[0_4px_10px_-2px_rgba(164,22,26,0.65)] ring-2 ring-[#fff8ee] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
        >
          {displayCount}
        </span>
      ) : null}
    </Link>
  )
}

type AuthButtonsProps = {
  variant?: "desktop" | "mobile"
  onNavigate?: () => void
}

export function AuthButtons({
  variant = "desktop",
  onNavigate,
}: AuthButtonsProps) {
  const isMobile = variant === "mobile"

  return (
    <div
      className={cn(
        "flex",
        isMobile ? "flex-col items-stretch gap-2.5" : "items-center gap-1"
      )}
    >
      <Link
        href="/signin"
        onClick={onNavigate}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[#5f3b2c] transition-all duration-300 hover:bg-white/65 hover:text-[#a4161a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee]",
          isMobile
            ? "border border-[#a4161a]/15 bg-white/60 px-5 py-3 text-sm shadow-[0_8px_20px_-18px_rgba(120,25,20,0.5)] hover:border-[#a4161a]/25 hover:bg-white hover:shadow-[0_10px_24px_-18px_rgba(120,25,20,0.5)]"
            : "px-3.5 py-2 text-[13px]"
        )}
      >
        {isMobile ? <LogIn className="size-4" strokeWidth={2} aria-hidden /> : null}
        Sign In
      </Link>

      <Link
        href="/signup"
        onClick={onNavigate}
        className={cn(
          "group relative isolate overflow-hidden rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(194,42,29,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee] active:translate-y-0",
          isMobile ? "px-5 py-3 text-sm" : "px-5 py-2.5 text-[13px]"
        )}
      >
        <span
          aria-hidden
          className="absolute inset-x-3 top-0 h-px bg-white/40"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="absolute -left-12 top-0 h-full w-10 rotate-12 bg-white/25 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[420px]"
        />
        <span className="relative z-10 flex items-center justify-center gap-1.5">
          Sign Up
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.4}
            aria-hidden
          />
        </span>
      </Link>
    </div>
  )
}

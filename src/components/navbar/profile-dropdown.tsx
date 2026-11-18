"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, LogOut } from "lucide-react"
import { toast } from "react-toastify"

import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const profileLinks = [
  { label: "Browse Menu", href: "/browseMenu" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile Setting", href: "/profile" },
]

type ProfileDropdownProps = {
  userName: string
  mobile?: boolean
  onNavigate: () => void
}

export function ProfileDropdown({
  userName,
  mobile = false,
  onNavigate,
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    const { error } = await authClient.signOut()

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Signed out successfully")
    setIsOpen(false)
    onNavigate()
    router.replace("/")
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative min-w-0">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => setIsOpen((open) => !open)}
          className={cn(
            "flex items-center justify-between gap-2 rounded-full border border-[#a4161a]/15 bg-white/70 font-semibold text-[#5f3b2c] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40",
            mobile
              ? "max-w-32 px-3 py-2.5 text-xs"
              : "max-w-56 px-3.5 py-2.5 text-[13px]"
          )}
        >
          <span className="truncate">{userName}</span>
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 shrink-0 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen ? (
          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-[#8d1b1b]/10 bg-[#fffaf2] p-2 shadow-[0_18px_40px_-18px_rgba(80,20,10,0.45)]"
          >
            {profileLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => {
                  setIsOpen(false)
                  onNavigate()
                }}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#5f3b2c] transition-colors hover:bg-[#a4161a]/[0.06] hover:text-[#a4161a]"
              >
                {item.label}
              </Link>
            ))}
            {mobile ? (
              <>
                <div className="my-1 h-px bg-[#8d1b1b]/10" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#a4161a] transition-colors hover:bg-[#a4161a]/[0.06]"
                >
                  <LogOut className="size-4" aria-hidden />
                  Sign Out
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      {!mobile ? (
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(194,42,29,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee]"
        >
          <LogOut className="size-4" aria-hidden />
          Sign Out
        </button>
      ) : null}
    </div>
  )
}

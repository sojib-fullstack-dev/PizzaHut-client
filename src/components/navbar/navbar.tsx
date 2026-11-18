"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { BrandLogo } from "./brand-logo"
import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"
import { AuthButtons, CartButton} from "./nav-actions"

export type NavbarProps = {
  cartItemCount?: number
}

export function Navbar({ cartItemCount = 3 }: NavbarProps) {
  const pathname = usePathname() ?? ""
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)")
    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false)
    }

    desktopQuery.addEventListener("change", handleResize)

    return () => desktopQuery.removeEventListener("change", handleResize)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300",
        isScrolled
          ? "bg-[#fff8ee]/95 shadow-[0_20px_45px_-34px_rgba(80,20,10,0.6)] backdrop-blur-xl"
          : "bg-[#fff8ee]/90 shadow-[0_1px_0_rgba(141,27,27,0.04)] backdrop-blur-lg"
      )}
    >
      <div
        aria-hidden
        className="h-[3px] w-full bg-gradient-to-r from-[#8f1116] via-[#e2501f] to-[#f59e0b]"
      />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-24 -top-20 size-56 rounded-full bg-[#f59e0b]/10 blur-3xl" />
          <div className="absolute -top-24 right-1/4 size-52 rounded-full bg-[#a4161a]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[76px] sm:gap-4 sm:px-6 lg:px-8">
          <BrandLogo onNavigate={closeMenu} />

          <DesktopNav pathname={pathname} />

          <div className="flex items-center gap-0.5 sm:gap-1">
            {/* <SearchButton
              className="hidden sm:inline-flex"
              onNavigate={closeMenu}
            /> */}
            <CartButton
              cartItemCount={cartItemCount}
              onNavigate={closeMenu}
            />

            <span
              aria-hidden
              className="mx-1 hidden h-6 w-px bg-gradient-to-b from-transparent via-[#8d1b1b]/20 to-transparent md:block"
            />

            <div className="hidden md:block">
              <AuthButtons onNavigate={closeMenu} />
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className={cn(
                "group relative ml-0.5 inline-flex size-10 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee] lg:hidden",
                isMenuOpen
                  ? "border-[#a4161a]/15 bg-[#a4161a]/[0.07] text-[#a4161a]"
                  : "border-[#8d1b1b]/10 bg-white/50 text-[#5f3b2c] hover:border-[#a4161a]/20 hover:bg-white/80 hover:text-[#a4161a] hover:shadow-[0_8px_18px_-14px_rgba(120,53,15,0.7)]"
              )}
            >
              <span className="relative size-5">
                <Menu
                  className={cn(
                    "absolute inset-0 size-5 transition-all duration-300",
                    isMenuOpen
                      ? "rotate-90 scale-75 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
                <X
                  className={cn(
                    "absolute inset-0 size-5 transition-all duration-300",
                    isMenuOpen
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-75 opacity-0"
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#a4161a]/20 to-transparent"
      />

      <MobileNav
        open={isMenuOpen}
        pathname={pathname}
        onClose={closeMenu}
      />
    </header>
  )
}

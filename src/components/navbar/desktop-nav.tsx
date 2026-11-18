import Link from "next/link"

import { cn } from "@/lib/utils"

import { isActivePath, navItems } from "./nav-links"

type DesktopNavProps = {
  pathname: string
}

export function DesktopNav({ pathname }: DesktopNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-0.5 rounded-full border border-[#8d1b1b]/10 bg-white/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_14px_30px_-26px_rgba(80,20,10,0.55)] backdrop-blur-sm lg:flex xl:gap-1"
    >
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative inline-flex items-center justify-center rounded-full px-3 py-2 text-[12.5px] font-semibold tracking-[0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee] xl:px-4 xl:text-[13px]",
              active
                ? "bg-white/80 text-[#8f151b] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_18px_-14px_rgba(120,25,20,0.6)] ring-1 ring-[#a4161a]/10"
                : "text-[#6b4635] hover:bg-white/55 hover:text-[#a4161a]"
            )}
          >
            {item.label}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute bottom-[3px] left-1/2 h-[2.5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#a4161a] via-[#e2501f] to-[#f59e0b] transition-all duration-300",
                active
                  ? "w-6 opacity-100 shadow-[0_0_10px_rgba(226,80,31,0.55)]"
                  : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-50"
              )}
            />
          </Link>
        )
      })}
    </nav>
  )
}

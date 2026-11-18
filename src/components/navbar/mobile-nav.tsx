import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { AuthButtons } from "./nav-actions"
import { isActivePath, navItems } from "./nav-links"

type MobileNavProps = {
  open: boolean
  pathname: string
  onClose: () => void
}

export function MobileNav({ open, pathname, onClose }: MobileNavProps) {
  return (
    <div
      id="mobile-navigation"
      aria-hidden={!open}
      className="absolute inset-x-0 top-full z-40 lg:hidden"
    >
      <div
        inert={!open}
        className={cn(
          "grid overflow-hidden px-3 pt-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-4",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <div className="mb-3 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain rounded-[26px] border border-[#8d1b1b]/10 bg-[#fffaf2]/95 p-3 shadow-[0_30px_70px_-32px_rgba(80,20,10,0.55)] backdrop-blur-2xl [scrollbar-color:rgba(164,22,26,0.25)_transparent] [scrollbar-width:thin]">
            <div
              aria-hidden
              className="mx-auto mb-2.5 h-1 w-9 rounded-full bg-[#a4161a]/10"
            />

            <nav
              aria-label="Mobile primary"
              className="flex flex-col gap-0.5"
            >
              {navItems.map((item, index) => {
                const active = isActivePath(pathname, item.href)
                const Icon = item.icon

                return (
                  <div
                    key={item.href}
                    style={{
                      transitionDelay: open ? `${80 + index * 45}ms` : "0ms",
                    }}
                    className={cn(
                      "transition-all duration-300 ease-out",
                      open
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-1 opacity-0"
                    )}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-inset",
                        active
                          ? "bg-gradient-to-r from-[#a4161a]/10 to-[#f59e0b]/10 text-[#8f151b] ring-1 ring-[#a4161a]/10 ring-inset"
                          : "text-[#5a3a2c] hover:bg-[#a4161a]/[0.05] hover:text-[#a4161a]"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-[14px] transition-colors duration-300",
                          active
                            ? "bg-gradient-to-br from-[#a4161a] to-[#ea580c] text-white shadow-[0_8px_18px_-10px_rgba(164,22,26,0.8)]"
                            : "bg-[#a4161a]/[0.06] text-[#a4161a] group-hover:bg-[#a4161a]/10"
                        )}
                      >
                        <Icon
                          className="size-[18px]"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </span>

                      <span className="flex-1">{item.label}</span>

                      {active ? (
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-gradient-to-br from-[#a4161a] to-[#f59e0b] shadow-[0_0_8px_rgba(234,88,12,0.5)]"
                        />
                      ) : null}

                      <ChevronRight
                        className={cn(
                          "size-4 text-[#b08d79] transition-transform duration-300 group-hover:translate-x-0.5",
                          active && "text-[#a4161a]"
                        )}
                        strokeWidth={2}
                        aria-hidden
                      />
                    </Link>
                  </div>
                )
              })}
            </nav>

            <div
              aria-hidden
              className="my-3 h-px bg-gradient-to-r from-transparent via-[#a4161a]/15 to-transparent"
            />

            <div className="px-0.5">
              <AuthButtons variant="mobile" onNavigate={onClose} />
            </div>

            <p className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b08d79]">
              Fresh · Handcrafted · Delivered
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

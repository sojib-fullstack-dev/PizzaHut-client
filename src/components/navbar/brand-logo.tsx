import Link from "next/link"
import { Pizza, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  onNavigate?: () => void
}

export function BrandLogo({ className, onNavigate }: BrandLogoProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="PizzaHut — Home"
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fff8ee] sm:gap-3",
        className
      )}
    >
      <span className="relative flex size-10 items-center justify-center sm:size-11">
        <span
          aria-hidden
          className="absolute -inset-[3px] rounded-[18px] border border-dashed border-[#a4161a]/25 transition-transform duration-700 ease-out group-hover:rotate-45"
        />
        <span className="relative flex size-full items-center justify-center overflow-hidden rounded-[15px] bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] text-[#fff8ee] shadow-[0_10px_22px_-10px_rgba(143,17,22,0.8)] ring-1 ring-white/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-[4deg]">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 bg-white/10"
          />
          <Pizza className="relative size-[22px]" strokeWidth={2.1} />
        </span>
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#fff8ee] shadow-[0_3px_8px_-2px_rgba(120,53,15,0.4)] ring-1 ring-[#a4161a]/10">
          <Sparkles
            className="size-2.5 text-[#ea580c]"
            strokeWidth={2.5}
            aria-hidden
          />
        </span>
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-[1.3rem] font-extrabold tracking-[-0.045em] text-[#3d211a] sm:text-[1.45rem]">
          Pizza
          <span className="bg-gradient-to-r from-[#a4161a] to-[#ea580c] bg-clip-text text-transparent">
            Hut
          </span>
        </span>
        <span className="mt-1 hidden text-[8.5px] font-semibold uppercase tracking-[0.27em] text-[#a87b62] sm:block">
          Wood-fired kitchen
        </span>
      </span>
    </Link>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Mail, MapPin, Phone, Pizza, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Menu", href: "/menu" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
]

export function Footer() {
  // Start with this year, then update in the browser so it always stays current.
  const [currentYear, setCurrentYear] = useState(2026)

  useEffect(() => {
    const updateYear = () => setCurrentYear(new Date().getFullYear())
    updateYear()
  }, [])

  // Dashboard pages e footer dekhabe na
  const pathname = usePathname() ?? ""
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  return (
    <footer className="relative overflow-hidden bg-[#2b100d] text-[#fff8ee]">
      {/* Same warm accent line as the Navbar */}
      <div
        aria-hidden
        className="h-1 w-full bg-gradient-to-r from-[#8f1116] via-[#e2501f] to-[#f59e0b]"
      />

      {/* Soft background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-[#ea580c]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 size-80 rounded-full bg-[#a4161a]/20 blur-3xl"
      />
      <Pizza
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-16 -right-12 size-72 rotate-12 text-[#fff8ee]/[0.03]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.2fr] lg:gap-14">
          {/* Brand and description */}
          <div className="max-w-sm md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="PizzaHub — Home"
              className="group inline-flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb923c]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#2b100d]"
            >
              <span className="relative flex size-12 shrink-0 items-center justify-center">
                <span
                  aria-hidden
                  className="absolute -inset-[3px] rounded-[18px] border border-dashed border-[#fb923c]/25 transition-transform duration-700 ease-out group-hover:rotate-45"
                />
                <span className="relative flex size-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#b3202a] via-[#d13a1e] to-[#f97316] text-white shadow-[0_12px_24px_-10px_rgba(0,0,0,0.7)] ring-1 ring-[#fff8ee]/20 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-[4deg]">
                  <Pizza className="size-6" strokeWidth={2.1} aria-hidden />
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#fff8ee] ring-1 ring-[#a4161a]/10">
                    <Sparkles
                      className="size-2.5 text-[#ea580c]"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </span>
                </span>
              </span>

              <span className="leading-none">
                <span className="block text-2xl font-extrabold tracking-[-0.045em] text-[#fff8ee]">
                  Pizza
                  <span className="bg-gradient-to-r from-[#fbbf24] to-[#fb923c] bg-clip-text text-transparent">
                    Hub
                  </span>
                </span>
                <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.27em] text-[#d8ad96]">
                  Wood-fired kitchen
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#e8cbb8]/70">
              Handcrafted pizza, wood-fired flavour, and fast delivery. Browse
              the menu, build your perfect pie, and enjoy every hot slice at
              home.
            </p>

            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c9a38e]">
                Follow us
              </p>

              {/* Replace href="#" with your real social media profile links. */}
              <div className="mt-3 flex items-center gap-2.5">
                <a
                  href="#"
                  aria-label="PizzaHub on Facebook"
                  className="flex size-10 items-center justify-center rounded-full border border-[#fff8ee]/10 bg-[#fff8ee]/[0.06] text-[#f3d9c6]/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#ea580c]/40 hover:bg-[#ea580c] hover:text-white hover:shadow-[0_10px_20px_-10px_rgba(234,88,12,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb923c]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b100d]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[18px]"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M16 8.5h3V5.4c-.5 0-2.1-.1-3.4-.1-3.4 0-5.6 2-5.6 5.6v2.6H6.5v3.4H10V22h3.5v-5.1h3.4l.5-3.4h-3.9v-2.3c0-1 .3-1.7 1.5-1.7Z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="PizzaHub on Instagram"
                  className="flex size-10 items-center justify-center rounded-full border border-[#fff8ee]/10 bg-[#fff8ee]/[0.06] text-[#f3d9c6]/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#ea580c]/40 hover:bg-[#ea580c] hover:text-white hover:shadow-[0_10px_20px_-10px_rgba(234,88,12,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb923c]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b100d]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="PizzaHub on YouTube"
                  className="flex size-10 items-center justify-center rounded-full border border-[#fff8ee]/10 bg-[#fff8ee]/[0.06] text-[#f3d9c6]/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#ea580c]/40 hover:bg-[#ea580c] hover:text-white hover:shadow-[0_10px_20px_-10px_rgba(234,88,12,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb923c]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b100d]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[18px]"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    aria-hidden
                  >
                    <path d="M21.6 7.2a2.8 2.8 0 0 0-1.98-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.62.4A2.8 2.8 0 0 0 2.4 7.2 29.4 29.4 0 0 0 2 12a29.4 29.4 0 0 0 .4 4.8 2.8 2.8 0 0 0 1.98 2c1.72.4 7.62.4 7.62.4s5.9 0 7.62-.4a2.8 2.8 0 0 0 1.98-2A29.4 29.4 0 0 0 22 12a29.4 29.4 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="PizzaHub on X"
                  className="flex size-10 items-center justify-center rounded-full border border-[#fff8ee]/10 bg-[#fff8ee]/[0.06] text-[#f3d9c6]/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#ea580c]/40 hover:bg-[#ea580c] hover:text-white hover:shadow-[0_10px_20px_-10px_rgba(234,88,12,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb923c]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b100d]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[16px]"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#fb923c]">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-[#f1d6c4]/70 transition-all duration-300 hover:translate-x-0.5 hover:text-[#fb923c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb923c]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#2b100d]"
                  >
                    <span className="size-1 rounded-full bg-[#e2501f]/80 transition-colors duration-300 group-hover:bg-[#fb923c]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#fb923c]">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#fff8ee]/10 bg-[#fff8ee]/[0.06] text-[#fb923c]">
                  <Mail className="size-4" strokeWidth={2} aria-hidden />
                </span>
                <a
                  href="mailto:hello@pizzahub.com"
                  className="text-sm text-[#f1d6c4]/70 transition-colors duration-300 hover:text-[#fb923c]"
                >
                  hello@pizzahub.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#fff8ee]/10 bg-[#fff8ee]/[0.06] text-[#fb923c]">
                  <Phone className="size-4" strokeWidth={2} aria-hidden />
                </span>
                <a
                  href="tel:+15551234567"
                  className="text-sm text-[#f1d6c4]/70 transition-colors duration-300 hover:text-[#fb923c]"
                >
                  +88 (018) 580-22790
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#fff8ee]/10 bg-[#fff8ee]/[0.06] text-[#fb923c]">
                  <MapPin className="size-4" strokeWidth={2} aria-hidden />
                </span>
                <span className="text-sm leading-6 text-[#f1d6c4]/70">
                  Sherpur, Bogura, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and developer credit */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-[#fff8ee]/10 pt-6 text-center sm:mt-12">
          <p className="text-xs text-[#e8cbb8]/60">
            © {currentYear} PizzaHut. All rights reserved.
          </p>
          <p className="text-xs text-[#e8cbb8]/60">
            Built with <span className="text-[#fb923c]">❤️</span> by{" "}
            <a
              href="https://sojib-fullstack-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#f5ddce] underline decoration-[#fb923c]/30 underline-offset-4 transition-colors duration-300 hover:text-[#fb923c] hover:decoration-[#fb923c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb923c]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#2b100d]"
            >
              Samiul Hasan Sojib
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

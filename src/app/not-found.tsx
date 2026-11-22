import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Pizza, UtensilsCrossed } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center overflow-hidden bg-[#fff8ee] px-4 py-16">
      {/* Background warm glowing circles */}
      <div className="pointer-events-none absolute -top-32 -left-32 size-[420px] rounded-full bg-[#ea580c]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-[420px] rounded-full bg-[#a4161a]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-xl text-center">
        {/* Giant 404 with Missing Pizza Slice in place of the 0 */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <span className="text-7xl font-black tracking-tight text-[#3d211a] sm:text-9xl drop-shadow-sm">
            4
          </span>

          {/* Pizza with one slice pulled out */}
          <div className="relative size-24 sm:size-36">
            <svg
              viewBox="0 0 160 160"
              className="size-full drop-shadow-[0_16px_28px_rgba(164,22,26,0.3)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pizza Crust with missing slice gap (slice from 0 to 60 deg is out) */}
              <path
                d="M 80 80 L 152 80 A 72 72 0 1 1 116 17.8 L 80 80 Z"
                fill="#d97706"
                stroke="#b45309"
                strokeWidth="4"
              />
              {/* Sauce Layer */}
              <path
                d="M 80 80 L 142 80 A 62 62 0 1 1 111 26.3 L 80 80 Z"
                fill="#a4161a"
              />
              {/* Cheese Layer */}
              <path
                d="M 80 80 L 136 80 A 56 56 0 1 1 108 31.4 L 80 80 Z"
                fill="#fef08a"
              />

              {/* Melted Cheese Patches */}
              <circle cx="68" cy="72" r="14" fill="#fde047" opacity="0.9" />
              <circle cx="65" cy="115" r="14" fill="#fde047" opacity="0.9" />
              <circle cx="105" cy="105" r="12" fill="#fde047" opacity="0.9" />

              {/* Pepperoni Slices */}
              <circle cx="58" cy="62" r="8.5" fill="#8f1116" stroke="#630d10" strokeWidth="1.5" />
              <circle cx="60" cy="108" r="8.5" fill="#8f1116" stroke="#630d10" strokeWidth="1.5" />
              <circle cx="102" cy="102" r="8.5" fill="#8f1116" stroke="#630d10" strokeWidth="1.5" />
              <circle cx="82" cy="85" r="9.5" fill="#8f1116" stroke="#630d10" strokeWidth="1.5" />

              {/* Basil Leaf Toppings */}
              <ellipse cx="50" cy="85" rx="3.5" ry="6" transform="rotate(45 50 85)" fill="#15803d" />
              <ellipse cx="85" cy="118" rx="3.5" ry="6" transform="rotate(-20 85 118)" fill="#15803d" />

              {/* The Missing Slice Floating Away with Cheese Stretch */}
              <g transform="translate(18, -16) rotate(15 80 80)">
                <path
                  d="M 80 80 L 152 80 A 72 72 0 0 0 116 17.8 Z"
                  fill="#d97706"
                  stroke="#b45309"
                  strokeWidth="3.5"
                />
                <path
                  d="M 80 80 L 142 80 A 62 62 0 0 0 111 26.3 Z"
                  fill="#a4161a"
                />
                <path
                  d="M 80 80 L 136 80 A 56 56 0 0 0 108 31.4 Z"
                  fill="#fef08a"
                />
                <circle cx="115" cy="52" r="7.5" fill="#8f1116" stroke="#630d10" strokeWidth="1.5" />
                <ellipse cx="102" cy="66" rx="3" ry="5" transform="rotate(30 102 66)" fill="#15803d" />
              </g>

              {/* Stretchy Melted Cheese Strings */}
              <path
                d="M 88 78 Q 98 72 106 68"
                stroke="#fef08a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 82 72 Q 95 62 100 52"
                stroke="#fde047"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="text-7xl font-black tracking-tight text-[#3d211a] sm:text-9xl drop-shadow-sm">
            4
          </span>
        </div>

        {/* Badge */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#a4161a]/20 bg-white px-4 py-1.5 text-xs font-bold text-[#a4161a] shadow-xs">
          <Pizza className="size-4 text-[#ea580c]" />
          <span>The Last Slice Is Missing!</span>
        </div>

        {/* Heading */}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#3d211a] sm:text-4xl">
          Oops! Someone Ate This Page
        </h1>

        {/* Body Text */}
        <p className="mt-3 text-sm leading-relaxed text-[#7a5645] sm:text-base">
          We checked the oven, searched the kitchen counter, and asked our delivery riders — but the page you are looking for has been devoured or moved to another table.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] px-7 text-sm font-bold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-12px_rgba(164,22,26,0.9)] sm:w-auto"
          >
            <Home className="size-4" />
            Back to Fresh Slices (Home)
          </Link>

          <Link
            href="/browseMenu"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#8d1b1b]/20 bg-white px-7 text-sm font-bold text-[#3d211a] shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a4161a]/40 hover:bg-[#fffaf2] sm:w-auto"
          >
            <UtensilsCrossed className="size-4 text-[#a4161a]" />
            Browse Full Menu
          </Link>
        </div>

        {/* Quick Menu Suggestions */}
        <div className="mt-12 rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#a87b62]">
            Hungry for something else?
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <Link
              href="/browseMenu?category=Pizza"
              className="rounded-xl border border-[#8d1b1b]/15 bg-[#fffaf2] px-3.5 py-1.5 text-[#3d211a] transition hover:border-[#a4161a] hover:bg-white hover:text-[#a4161a]"
            >
              🍕 Hot Pizzas
            </Link>
            <Link
              href="/browseMenu?category=Drinks"
              className="rounded-xl border border-[#8d1b1b]/15 bg-[#fffaf2] px-3.5 py-1.5 text-[#3d211a] transition hover:border-[#a4161a] hover:bg-white hover:text-[#a4161a]"
            >
              🥤 Cold Drinks
            </Link>
            <Link
              href="/browseMenu?category=Sides"
              className="rounded-xl border border-[#8d1b1b]/15 bg-[#fffaf2] px-3.5 py-1.5 text-[#3d211a] transition hover:border-[#a4161a] hover:bg-white hover:text-[#a4161a]"
            >
              🍗 Garlic Bread & Sides
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-[#8d1b1b]/15 bg-[#fffaf2] px-3.5 py-1.5 text-[#3d211a] transition hover:border-[#a4161a] hover:bg-white hover:text-[#a4161a]"
            >
              📦 My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


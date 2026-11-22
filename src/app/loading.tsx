import React from "react";
import { Flame, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center overflow-hidden bg-[#fff8ee] px-4 py-12">
      {/* Warm background ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-[#ea580c]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-[#a4161a]/10 blur-3xl" />

      {/* Main Container Card */}
      <div className="relative flex max-w-md flex-col items-center text-center">
        {/* Animated Pizza Illustration with Rising Steam */}
        <div className="relative mb-8 flex size-44 items-center justify-center">
          {/* Steam wisps rising */}
          <div className="pointer-events-none absolute -top-8 flex gap-4">
            <span className="inline-block h-8 w-1.5 animate-bounce rounded-full bg-gradient-to-t from-[#ea580c]/40 to-transparent [animation-delay:0ms] [animation-duration:1.4s]" />
            <span className="inline-block h-10 w-1.5 animate-bounce rounded-full bg-gradient-to-t from-[#a4161a]/40 to-transparent [animation-delay:200ms] [animation-duration:1.6s]" />
            <span className="inline-block h-7 w-1.5 animate-bounce rounded-full bg-gradient-to-t from-[#d97706]/40 to-transparent [animation-delay:400ms] [animation-duration:1.3s]" />
          </div>

          {/* Oven Glow Ring */}
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-[#a4161a]/20 via-[#ea580c]/25 to-[#d97706]/20 blur-xl" />

          {/* Golden Rotating Pizza Pan & Slices */}
          <div className="relative size-36 animate-[spin_10s_linear_infinite] drop-shadow-[0_16px_28px_rgba(164,22,26,0.28)]">
            <svg
              viewBox="0 0 160 160"
              className="size-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pizza Crust */}
              <circle
                cx="80"
                cy="80"
                r="72"
                fill="#d97706"
                stroke="#b45309"
                strokeWidth="4"
              />
              {/* Tomato Sauce Base */}
              <circle cx="80" cy="80" r="62" fill="#a4161a" />
              {/* Melted Cheese Layer */}
              <circle cx="80" cy="80" r="56" fill="#fef08a" />
              {/* Melted Cheese Patches */}
              <circle cx="68" cy="68" r="14" fill="#fde047" opacity="0.9" />
              <circle cx="95" cy="72" r="12" fill="#fde047" opacity="0.9" />
              <circle cx="76" cy="95" r="15" fill="#fde047" opacity="0.9" />

              {/* Pizza Slice Cut Lines */}
              <line
                x1="80"
                y1="8"
                x2="80"
                y2="152"
                stroke="#b45309"
                strokeWidth="2.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />
              <line
                x1="8"
                y1="80"
                x2="152"
                y2="80"
                stroke="#b45309"
                strokeWidth="2.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />
              <line
                x1="29"
                y1="29"
                x2="131"
                y2="131"
                stroke="#b45309"
                strokeWidth="2.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />
              <line
                x1="131"
                y1="29"
                x2="29"
                y2="131"
                stroke="#b45309"
                strokeWidth="2.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />

              {/* Pepperoni Slices */}
              <circle
                cx="58"
                cy="52"
                r="8.5"
                fill="#8f1116"
                stroke="#630d10"
                strokeWidth="1.5"
              />
              <circle
                cx="102"
                cy="56"
                r="8.5"
                fill="#8f1116"
                stroke="#630d10"
                strokeWidth="1.5"
              />
              <circle
                cx="60"
                cy="104"
                r="8.5"
                fill="#8f1116"
                stroke="#630d10"
                strokeWidth="1.5"
              />
              <circle
                cx="105"
                cy="100"
                r="8.5"
                fill="#8f1116"
                stroke="#630d10"
                strokeWidth="1.5"
              />
              <circle
                cx="80"
                cy="76"
                r="9.5"
                fill="#8f1116"
                stroke="#630d10"
                strokeWidth="1.5"
              />

              {/* Basil Leaf Toppings */}
              <ellipse
                cx="74"
                cy="48"
                rx="3.5"
                ry="6"
                transform="rotate(25 74 48)"
                fill="#15803d"
              />
              <ellipse
                cx="110"
                cy="80"
                rx="3.5"
                ry="6"
                transform="rotate(-40 110 80)"
                fill="#15803d"
              />
              <ellipse
                cx="50"
                cy="78"
                rx="3.5"
                ry="6"
                transform="rotate(60 50 78)"
                fill="#15803d"
              />
              <ellipse
                cx="88"
                cy="110"
                rx="3.5"
                ry="6"
                transform="rotate(-15 88 110)"
                fill="#15803d"
              />
            </svg>
          </div>

          {/* Center glowing badge */}
          <div className="absolute flex size-12 items-center justify-center rounded-full bg-white/95 p-1.5 shadow-[0_8px_16px_-6px_rgba(164,22,26,0.4)] backdrop-blur-xs">
            <Flame className="size-6 animate-pulse text-[#ea580c]" />
          </div>
        </div>

        {/* Brand Tag */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#a4161a]/15 bg-white px-3.5 py-1 text-xs font-bold text-[#a4161a] shadow-xs">
          <Sparkles className="size-3.5 text-[#ea580c]" />
          <span>PizzaHut Kitchen</span>
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#3d211a] sm:text-3xl">
          Baking Something{" "}
          <span className="bg-gradient-to-r from-[#a4161a] via-[#c02a1d] to-[#ea580c] bg-clip-text text-transparent">
            Delicious...
          </span>
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-[#7a5645] sm:text-base">
          Preparing your fresh slices straight from the wood-fired oven. Just a quick moment!
        </p>

        {/* Animated Progress Bar */}
        <div className="mt-6 w-64 overflow-hidden rounded-full bg-[#f1dcd4] p-0.5 shadow-inner">
          <div className="h-2 w-full animate-[indeterminate_1.5s_infinite_linear] rounded-full bg-gradient-to-r from-[#8f1116] via-[#ea580c] to-[#d97706]" />
        </div>

        {/* Step Indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold text-[#a87b62]">
          <span className="rounded-full bg-[#fffaf2] px-2.5 py-1 border border-[#8d1b1b]/10">
            Kneading Dough
          </span>
          <span>•</span>
          <span className="rounded-full bg-[#fffaf2] px-2.5 py-1 border border-[#8d1b1b]/10">
            Fresh Toppings
          </span>
          <span>•</span>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900 border border-amber-300">
            Oven 450°F
          </span>
        </div>
      </div>
    </div>
  );
}


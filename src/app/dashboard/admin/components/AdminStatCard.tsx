"use client";

import React from "react";
import { type LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  subtitle?: string;
}

export function AdminStatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  subtitle,
}: AdminStatCardProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-[#8d1b1b]/10 bg-white p-5 shadow-[0_20px_50px_-35px_rgba(80,20,10,0.5)] transition-all duration-300 hover:-translate-y-0.5">
      <div className="min-w-0 pr-3">
        <p className="text-xs font-bold uppercase tracking-wider text-[#7a5645]">
          {title}
        </p>
        <p className="mt-1.5 text-2xl font-extrabold text-[#3d211a] sm:text-3xl">
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 truncate text-xs font-medium text-[#a87b62]">
            {subtitle}
          </p>
        )}
      </div>
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
      >
        <Icon className="size-6" aria-hidden />
      </div>
    </div>
  );
}


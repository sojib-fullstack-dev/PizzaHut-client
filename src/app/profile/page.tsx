"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Flame, Mail, Pizza, Sparkles, UserRound } from "lucide-react"
import { toast } from "react-toastify"

import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const inputClass =
  "h-12 w-full rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] pl-11 pr-4 text-sm font-medium text-[#3d211a] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#b79b8a] focus:border-[#a4161a]/40 focus:bg-white focus:ring-4 focus:ring-[#a4161a]/10"

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession()
  const [isSaving, setIsSaving] = useState(false)

  const handleUpdateName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()

    if (!name) {
      toast.error("Please enter your name.")
      return
    }

    setIsSaving(true)
    try {
      const { error } = await authClient.updateUser({ name })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success("Your name has been updated.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="relative flex min-h-[calc(100dvh-71px)] items-center justify-center overflow-hidden bg-[#fff8ee] px-4 py-10 sm:min-h-[calc(100dvh-79px)] sm:px-6 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-20 size-80 rounded-full bg-[#f59e0b]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-32 size-96 rounded-full bg-[#a4161a]/10 blur-3xl"
      />
      <Pizza
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute -right-16 top-24 size-72 rotate-12 text-[#a4161a]/[0.04]"
      />

      <div className="relative flex w-full max-w-md flex-col items-center">
        <Link
          href="/"
          className="group mb-6 inline-flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fff8ee]"
        >
          <span className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8f1116] via-[#b3202a] to-[#ea580c] text-white shadow-[0_12px_24px_-10px_rgba(143,17,22,0.8)] ring-1 ring-white/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-[4deg]">
            <Pizza className="size-6" strokeWidth={2.1} />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#fff8ee] ring-1 ring-[#a4161a]/10">
              <Sparkles
                className="size-2.5 text-[#ea580c]"
                strokeWidth={2.5}
                aria-hidden
              />
            </span>
          </span>
          <span className="text-[1.55rem] font-extrabold tracking-[-0.045em] text-[#3d211a]">
            Pizza
            <span className="bg-gradient-to-r from-[#a4161a] to-[#ea580c] bg-clip-text text-transparent">
              Hut
            </span>
          </span>
        </Link>

        <section className="w-full rounded-[30px] border border-[#8d1b1b]/10 bg-white/85 p-5 shadow-[0_32px_80px_-48px_rgba(80,20,10,0.55)] backdrop-blur-md sm:p-8">
          <div
            aria-hidden
            className="mx-auto mb-5 h-1 w-10 rounded-full bg-gradient-to-r from-[#a4161a] to-[#f59e0b]"
          />

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a4161a]/10 bg-[#a4161a]/[0.05] px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#a4161a]">
            <UserRound className="size-3" aria-hidden />
            Your account
          </span>

          <h1 className="mt-3 text-[1.8rem] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#3d211a]">
            Profile Settings
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#7a5645]">
            View your account and update your name.
          </p>

          {isPending ? (
            <p className="mt-6 text-sm text-[#7a5645]">Loading your profile...</p>
          ) : !session?.user ? (
            <div className="mt-6">
              <p className="text-sm text-[#7a5645]">
                Please sign in to view your profile.
              </p>
              <Link
                href="/sign-in"
                className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] px-5 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)]"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[#a4161a]/10 bg-[#fffaf2] p-3">
                <Avatar className="size-12 shrink-0 ring-2 ring-[#ea580c]/40">
                  {session.user.image ? (
                    <AvatarImage src={session.user.image} alt={session.user.name} />
                  ) : null}
                  <AvatarFallback className="bg-[#a4161a] text-sm font-bold text-white">
                    {(session.user.name || session.user.email)
                      .split(" ")[0]
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#3d211a]">
                    {session.user.name}
                  </p>
                  <p className="truncate text-xs text-[#7a5645]">
                    {session.user.email}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[13px] font-semibold text-[#3d211a]"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    aria-hidden
                    className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
                  />
                  <input
                    id="email"
                    type="email"
                    value={session.user.email}
                    readOnly
                    className={`${inputClass} cursor-not-allowed opacity-70`}
                  />
                </div>
              </div>

              <form onSubmit={handleUpdateName} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[13px] font-semibold text-[#3d211a]"
                  >
                    Name <span className="text-[#a4161a]">*</span>
                  </label>
                  <div className="relative">
                    <UserRound
                      aria-hidden
                      className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
                    />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      defaultValue={session.user.name}
                      required
                      maxLength={100}
                      className={inputClass}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(194,42,29,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? "Updating..." : "Update Name"}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={2.4}
                    aria-hidden
                  />
                </button>
              </form>
            </div>
          )}
        </section>

        <p className="mt-5 flex items-center gap-1.5 text-xs text-[#a87b62]">
          <Flame
            className="size-3.5 text-[#ea580c]"
            strokeWidth={2.2}
            aria-hidden
          />
          Hot, fresh &amp; delivered with a smile.
        </p>
      </div>
    </main>
  )
}

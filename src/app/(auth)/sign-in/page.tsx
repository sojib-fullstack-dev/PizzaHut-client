'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Flame, Lock, Mail, Pizza, Sparkles } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const inputClass =
  'h-12 w-full rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] pl-11 pr-4 text-sm font-medium text-[#3d211a] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#b79b8a] focus:border-[#a4161a]/40 focus:bg-white focus:ring-4 focus:ring-[#a4161a]/10';

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const { error } = await authClient.signIn.email({
      email: data.email as string,
      password: data.password as string,
      callbackURL: '/',
    });
        if (error) {
           toast.error(error.message);
          return;
        }
        toast.success("Sign In Successful!");
        router.replace('/');


  };


   const handleGoogleSign=async()=>{
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if(data.error){
      toast.error('Google SignIn Failed')
    }
    toast.success('Google SignIn Success')
  }

  return (
    <main className="relative flex min-h-[calc(100dvh-71px)] items-center justify-center overflow-hidden bg-[#fff8ee] px-4 py-10 sm:min-h-[calc(100dvh-79px)] sm:px-6 sm:py-14">
      {/* Soft background decoration */}
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
        {/* Brand */}
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

          <span className="text-left leading-none">
            <span className="block text-[1.55rem] font-extrabold tracking-[-0.045em] text-[#3d211a]">
              Pizza
              <span className="bg-gradient-to-r from-[#a4161a] to-[#ea580c] bg-clip-text text-transparent">
                Hut
              </span>
            </span>
            <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.27em] text-[#a87b62]">
              Wood-fired kitchen
            </span>
          </span>
        </Link>

        {/* Card */}
        <section className="w-full rounded-[30px] border border-[#8d1b1b]/10 bg-white/85 p-5 shadow-[0_32px_80px_-48px_rgba(80,20,10,0.55)] backdrop-blur-md sm:p-8">
          <div
            aria-hidden
            className="mx-auto mb-5 h-1 w-10 rounded-full bg-gradient-to-r from-[#a4161a] to-[#f59e0b]"
          />

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a4161a]/10 bg-[#a4161a]/[0.05] px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#a4161a]">
            <Flame className="size-3" strokeWidth={2.4} aria-hidden />
            Good to see you
          </span>

          <h1 className="mt-3 text-[1.8rem] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#3d211a]">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#7a5645]">
            Sign in to track orders and reorder your favourite slices.
          </p>

          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[13px] font-semibold text-[#3d211a]"
              >
                Email <span className="text-[#a4161a]">*</span>
              </label>
              <div className="relative">
                <Mail
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
                  strokeWidth={2}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[13px] font-semibold text-[#3d211a]"
              >
                Password <span className="text-[#a4161a]">*</span>
              </label>
              <div className="relative">
                <Lock
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
                  strokeWidth={2}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(194,42,29,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-0"
            >
              Sign In
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.4}
                aria-hidden
              />
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#8d1b1b]/10" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a87b62]">
              or continue with
            </span>
            <span className="h-px flex-1 bg-[#8d1b1b]/10" />
          </div>

          {/* Google button (UI only) */}
          <button
          onClick={handleGoogleSign}
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-[#8d1b1b]/12 bg-white/80 text-sm font-semibold text-[#3d211a] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a4161a]/25 hover:bg-white hover:shadow-[0_10px_24px_-16px_rgba(120,53,15,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-[18px] shrink-0"
              aria-hidden
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.1c-.22-.66-.35-1.37-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            Sign In with Google
          </button>

          <p className="mt-6 text-center text-sm text-[#7a5645]">
            New to PizzaHut?{' '}
            <Link
              href="/sign-up"
              className="font-semibold text-[#a4161a] underline-offset-4 transition-colors hover:text-[#ea580c] hover:underline"
            >
              Sign Up
            </Link>
          </p>
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
  );
}

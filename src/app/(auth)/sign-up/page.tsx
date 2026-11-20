'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Check,
  Flame,
  ImagePlus,
  Lock,
  Mail,
  Pizza,
  Sparkles,
  Store,
  UserRound,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const inputClass =
  'h-12 w-full rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] pl-11 pr-4 text-sm font-medium text-[#3d211a] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#b79b8a] focus:border-[#a4161a]/40 focus:bg-white focus:ring-4 focus:ring-[#a4161a]/10';

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const { error } = await authClient.signUp.email({
      name: data.fullName as string,
      email: data.email as string,
      password: data.password as string,
      image: data.profileImage as string,
      role: data.role as 'customer' | 'vendor' | 'admin',
      callbackURL: '/',
    });

    if (error) {
       toast.error(error.message);
      return;
    }
    toast.success("Sign Up Successful!");
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
            Join the table
          </span>

          <h1 className="mt-3 text-[1.8rem] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#3d211a]">
            Create your account
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#7a5645]">
            Fresh slices, faster checkout, and offers made just for you.
          </p>

          <form onSubmit={handleSignUp} className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-[13px] font-semibold text-[#3d211a]"
              >
                Full Name <span className="text-[#a4161a]">*</span>
              </label>
              <div className="relative">
                <UserRound
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
                  strokeWidth={2}
                />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  className={inputClass}
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  placeholder="Create a password"
                  aria-describedby="password-requirements"
                  required
                  pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Use at least 6 characters, including an uppercase and a lowercase letter."
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password requirements */}
            <div
              id="password-requirements"
              className="rounded-2xl border border-[#a4161a]/10 bg-[#fff8ee] p-3.5"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#a4161a]">
                Password must include
              </p>
              <ul className="mt-2 space-y-1.5">
                <li className="flex items-center gap-2 text-xs text-[#7a5645]">
                  <span className="size-1.5 rounded-full bg-gradient-to-br from-[#a4161a] to-[#f59e0b]" />
                  At least 6 characters
                </li>
                <li className="flex items-center gap-2 text-xs text-[#7a5645]">
                  <span className="size-1.5 rounded-full bg-gradient-to-br from-[#a4161a] to-[#f59e0b]" />
                  At least one uppercase letter
                </li>
                <li className="flex items-center gap-2 text-xs text-[#7a5645]">
                  <span className="size-1.5 rounded-full bg-gradient-to-br from-[#a4161a] to-[#f59e0b]" />
                  At least one lowercase letter
                </li>
              </ul>
            </div>

            {/* Profile image (optional) */}
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="text-[13px] font-semibold text-[#3d211a]">
                  Profile Image
                </span>
                <span className="rounded-full bg-[#ea580c]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#c2410c]">
                  Optional
                </span>
              </div>

              <div className="relative">
                <ImagePlus
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#b08d79]"
                  strokeWidth={2}
                />
                <input
                  id="profileImage"
                  name="profileImage"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Account role */}
            <fieldset>
              <legend className="mb-1.5 text-[13px] font-semibold text-[#3d211a]">
                Account Role <span className="text-[#a4161a]">*</span>
              </legend>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <div className="relative">
                  <input
                    id="role-customer"
                    name="role"
                    type="radio"
                    value="customer"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="role-customer"
                    className="flex h-full cursor-pointer flex-col gap-2 rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] p-3.5 pr-8 transition-all duration-200 hover:border-[#a4161a]/25 peer-checked:border-[#a4161a]/60 peer-checked:bg-[#fff1e6] peer-focus-visible:ring-4 peer-focus-visible:ring-[#a4161a]/15"
                  >
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[#a4161a]/10 text-[#a4161a]">
                      <UserRound
                        className="size-[18px]"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[#3d211a]">
                        Customer
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-[#8a6553]">
                        Order your favourites
                      </span>
                    </span>
                  </label>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-3 top-3 flex size-4 items-center justify-center rounded-full bg-[#a4161a] text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                  >
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="role-vendor"
                    name="role"
                    type="radio"
                    value="vendor"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="role-vendor"
                    className="flex h-full cursor-pointer flex-col gap-2 rounded-2xl border border-[#8d1b1b]/12 bg-[#fffaf2] p-3.5 pr-8 transition-all duration-200 hover:border-[#a4161a]/25 peer-checked:border-[#a4161a]/60 peer-checked:bg-[#fff1e6] peer-focus-visible:ring-4 peer-focus-visible:ring-[#a4161a]/15"
                  >
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[#a4161a]/10 text-[#a4161a]">
                      <Store
                        className="size-[18px]"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[#3d211a]">
                        Vendor
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-[#8a6553]">
                        Restaurant Owner
                      </span>
                    </span>
                  </label>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-3 top-3 flex size-4 items-center justify-center rounded-full bg-[#a4161a] text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                  >
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                </div>
              </div>
            </fieldset>

            {/* Sign up button */}
            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(194,42,29,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-0"
            >
              Sign Up
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
            Sign Up with Google
          </button>

          <p className="mt-6 text-center text-sm text-[#7a5645]">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-semibold text-[#a4161a] underline-offset-4 transition-colors hover:text-[#ea580c] hover:underline"
            >
              Sign In
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

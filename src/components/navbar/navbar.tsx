'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  Bookmark,
  BookOpen,
  ChevronRight,
  Home,
  Loader2,
  LogIn,
  Menu,
  Pizza,
  Sparkles,
  X,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import { useSavedItems } from '@/components/saved-items/saved-items-provider';
import { ProfileDropdown } from './profile-dropdown';

function getDashboardHref(role: string | null | undefined) {
  const dashboardRole =
    role === 'vendor' || role === 'admin' ? role : 'customer';
  return `/dashboard/${dashboardRole}`;
}

function getNavItems(dashboardHref: string, isLoggedIn: boolean = false) {
  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Browse Menu', href: '/browseMenu', icon: BookOpen },
  ];

  // User login thakle shudhu Dashboard link add hobe
  if (isLoggedIn) {
    items.push({ label: 'Dashboard', href: dashboardHref, icon: BookOpen });
  }

  return items;
}

const iconButtonStyles =
  'group relative inline-flex size-10 items-center justify-center rounded-full border border-transparent text-[#5f3b2c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8d1b1b]/10 hover:bg-white/75 hover:text-[#a4161a] hover:shadow-[0_10px_20px_-14px_rgba(120,53,15,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee]';

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandLogo({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="PizzaHut — Home"
      className="group inline-flex shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fff8ee] sm:gap-3"
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

      <span className="flex flex-col leading-none max-[374px]:hidden">
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
  );
}

function SavedItemsButton({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const { items } = useSavedItems();
  const savedCount = items.length;
  const displayCount = savedCount > 9 ? '9+' : savedCount;

  return (
    <Link
      href="/saved"
      onClick={onNavigate}
      aria-label={`Saved items, ${savedCount} ${
        savedCount === 1 ? 'item' : 'items'
      }`}
      title="View saved items"
      className={cn(iconButtonStyles)}
    >
      <Bookmark
        className="size-[18px] transition-transform duration-300 group-hover:-rotate-6"
        strokeWidth={2}
        aria-hidden
      />
      {savedCount > 0 ? (
        <span
          aria-hidden
          className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gradient-to-br from-[#a4161a] to-[#f97316] px-1 text-[9.5px] font-bold leading-none text-white shadow-[0_4px_10px_-2px_rgba(164,22,26,0.65)] ring-2 ring-[#fff8ee] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
        >
          {displayCount}
        </span>
      ) : null}
    </Link>
  );
}

function AuthButtons({
  mobile = false,
  onNavigate,
  userName,
  isPending,
  dashboardHref,
  role,
}: {
  mobile?: boolean;
  onNavigate: () => void;
  userName?: string;
  isPending: boolean;
  dashboardHref: string;
  role?: string;
}) {
  if (isPending) {
    return (
      <div
        className={cn(
          'flex items-center justify-center',
          mobile ? 'py-3' : 'h-9 w-20'
        )}
      >
        <Loader2 className="size-4 animate-spin text-[#ea580c]" />
      </div>
    );
  }

  if (userName) {
    return (
      <ProfileDropdown
        userName={userName}
        role={role}
        mobile={mobile}
        onNavigate={onNavigate}
        dashboardHref={dashboardHref}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex',
        mobile ? 'flex-col items-stretch gap-2.5' : 'items-center gap-1'
      )}
    >
      <Link
        href="/sign-in"
        onClick={onNavigate}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[#5f3b2c] transition-all duration-300 hover:bg-white/65 hover:text-[#a4161a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee]',
          mobile
            ? 'border border-[#a4161a]/15 bg-white/60 px-5 py-3 text-sm shadow-[0_8px_20px_-18px_rgba(120,25,20,0.5)] hover:border-[#a4161a]/25 hover:bg-white hover:shadow-[0_10px_24px_-18px_rgba(120,25,20,0.5)]'
            : 'px-3.5 py-2 text-[13px]'
        )}
      >
        {mobile ? (
          <LogIn className="size-4" strokeWidth={2} aria-hidden />
        ) : null}
        Sign In
      </Link>

      <Link
        href="/sign-up"
        onClick={onNavigate}
        className={cn(
          'group relative isolate overflow-hidden rounded-full bg-gradient-to-r from-[#8f1116] via-[#c02a1d] to-[#f2761b] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(164,22,26,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(194,42,29,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee] active:translate-y-0',
          mobile ? 'px-5 py-3 text-sm' : 'px-5 py-2.5 text-[13px]'
        )}
      >
        <span
          aria-hidden
          className="absolute inset-x-3 top-0 h-px bg-white/40"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="absolute -left-12 top-0 h-full w-10 rotate-12 bg-white/25 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[420px]"
        />
        <span className="relative z-10 flex items-center justify-center gap-1.5">
          Sign Up
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.4}
            aria-hidden
          />
        </span>
      </Link>
    </div>
  );
}

function DesktopNav({
  pathname,
  dashboardHref,
  isLoggedIn,
}: {
  pathname: string;
  dashboardHref: string;
  isLoggedIn: boolean;
}) {
  const navItems = getNavItems(dashboardHref, isLoggedIn);

  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-0.5 rounded-full border border-[#8d1b1b]/10 bg-white/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_14px_30px_-26px_rgba(80,20,10,0.55)] backdrop-blur-sm lg:flex xl:gap-1"
    >
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group relative inline-flex items-center justify-center rounded-full px-3 py-2 text-[12.5px] font-semibold tracking-[0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee] xl:px-4 xl:text-[13px]',
              active
                ? 'bg-white/80 text-[#8f151b] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_18px_-14px_rgba(120,25,20,0.6)] ring-1 ring-[#a4161a]/10'
                : 'text-[#6b4635] hover:bg-white/55 hover:text-[#a4161a]'
            )}
          >
            {item.label}
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute bottom-[3px] left-1/2 h-[2.5px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#a4161a] via-[#e2501f] to-[#f59e0b] transition-all duration-300',
                active
                  ? 'w-6 opacity-100 shadow-[0_0_10px_rgba(226,80,31,0.55)]'
                  : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-50'
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav({
  open,
  pathname,
  onClose,
  userName,
  isPending,
  dashboardHref,
  isLoggedIn,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
  userName?: string;
  isPending: boolean;
  dashboardHref: string;
  isLoggedIn: boolean;
}) {
  const navItems = getNavItems(dashboardHref, isLoggedIn);

  return (
    <div
      id="mobile-navigation"
      aria-hidden={!open}
      className="absolute inset-x-0 top-full z-40 lg:hidden"
    >
      <div
        inert={!open}
        className={cn(
          'grid overflow-hidden px-3 pt-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-4',
          open
            ? 'grid-rows-[1fr] opacity-100'
            : 'pointer-events-none grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="min-h-0">
          <div className="mb-3 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain rounded-[26px] border border-[#8d1b1b]/10 bg-[#fffaf2]/95 p-3 shadow-[0_30px_70px_-32px_rgba(80,20,10,0.55)] backdrop-blur-2xl [scrollbar-color:rgba(164,22,26,0.25)_transparent] [scrollbar-width:thin]">
            <div
              aria-hidden
              className="mx-auto mb-2.5 h-1 w-9 rounded-full bg-[#a4161a]/10"
            />

            <nav aria-label="Mobile primary" className="flex flex-col gap-0.5">
              {navItems.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                const Icon = item.icon;

                return (
                  <div
                    key={item.href}
                    style={{
                      transitionDelay: open ? `${80 + index * 45}ms` : '0ms',
                    }}
                    className={cn(
                      'transition-all duration-300 ease-out',
                      open
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-1 opacity-0'
                    )}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-inset',
                        active
                          ? 'bg-gradient-to-r from-[#a4161a]/10 to-[#f59e0b]/10 text-[#8f151b] ring-1 ring-[#a4161a]/10 ring-inset'
                          : 'text-[#5a3a2c] hover:bg-[#a4161a]/[0.05] hover:text-[#a4161a]'
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-10 shrink-0 items-center justify-center rounded-[14px] transition-colors duration-300',
                          active
                            ? 'bg-gradient-to-br from-[#a4161a] to-[#ea580c] text-white shadow-[0_8px_18px_-10px_rgba(164,22,26,0.8)]'
                            : 'bg-[#a4161a]/[0.06] text-[#a4161a] group-hover:bg-[#a4161a]/10'
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
                          'size-4 text-[#b08d79] transition-transform duration-300 group-hover:translate-x-0.5',
                          active && 'text-[#a4161a]'
                        )}
                        strokeWidth={2}
                        aria-hidden
                      />
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div
              aria-hidden
              className="my-3 h-px bg-gradient-to-r from-transparent via-[#a4161a]/15 to-transparent"
            />

            {!isPending && !userName ? (
              <div className="px-0.5">
                <AuthButtons
                  mobile
                  onNavigate={onClose}
                  userName={userName}
                  isPending={isPending}
                  dashboardHref={dashboardHref}
                />
              </div>
            ) : null}

            <p className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b08d79]">
              Fresh · Handcrafted · Delivered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname() ?? '';
  const { data: session, isPending } = authClient.useSession();
  const userName = session?.user.name || session?.user.email;
  const userRole = session?.user.role as string | undefined;
  const dashboardHref = getDashboardHref(userRole);
  const isLoggedIn = Boolean(!isPending && session?.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    desktopQuery.addEventListener('change', handleResize);
    return () => desktopQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300',
        isScrolled
          ? 'bg-[#fff8ee]/95 shadow-[0_20px_45px_-34px_rgba(80,20,10,0.6)] backdrop-blur-xl'
          : 'bg-[#fff8ee]/90 shadow-[0_1px_0_rgba(141,27,27,0.04)] backdrop-blur-lg'
      )}
    >
      <div
        aria-hidden
        className="h-[3px] w-full bg-gradient-to-r from-[#8f1116] via-[#e2501f] to-[#f59e0b]"
      />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-24 -top-20 size-56 rounded-full bg-[#f59e0b]/10 blur-3xl" />
          <div className="absolute -top-24 right-1/4 size-52 rounded-full bg-[#a4161a]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[76px] sm:gap-4 sm:px-6 lg:px-8">
          <BrandLogo onNavigate={closeMenu} />

          <DesktopNav
            pathname={pathname}
            dashboardHref={dashboardHref}
            isLoggedIn={isLoggedIn}
          />

          <div className="flex items-center gap-0.5 sm:gap-1">
            <SavedItemsButton onNavigate={closeMenu} />

            <span
              aria-hidden
              className="mx-1 hidden h-6 w-px bg-gradient-to-b from-transparent via-[#8d1b1b]/20 to-transparent lg:block"
            />

            <div className="hidden lg:block">
              <AuthButtons
                onNavigate={closeMenu}
                userName={userName}
                isPending={isPending}
                dashboardHref={dashboardHref}
                role={userRole}
              />
            </div>

            {userName && !isPending ? (
              <div className="lg:hidden">
                <ProfileDropdown
                  userName={userName}
                  role={userRole}
                  mobile
                  onNavigate={closeMenu}
                  dashboardHref={dashboardHref}
                />
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={
                isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className={cn(
                'group relative ml-0.5 inline-flex size-10 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee] lg:hidden',
                isMenuOpen
                  ? 'border-[#a4161a]/15 bg-[#a4161a]/[0.07] text-[#a4161a]'
                  : 'border-[#8d1b1b]/10 bg-white/50 text-[#5f3b2c] hover:border-[#a4161a]/20 hover:bg-white/80 hover:text-[#a4161a] hover:shadow-[0_8px_18px_-14px_rgba(120,53,15,0.7)]'
              )}
            >
              <span className="relative size-5">
                <Menu
                  className={cn(
                    'absolute inset-0 size-5 transition-all duration-300',
                    isMenuOpen
                      ? 'rotate-90 scale-75 opacity-0'
                      : 'rotate-0 scale-100 opacity-100'
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
                <X
                  className={cn(
                    'absolute inset-0 size-5 transition-all duration-300',
                    isMenuOpen
                      ? 'rotate-0 scale-100 opacity-100'
                      : '-rotate-90 scale-75 opacity-0'
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#a4161a]/20 to-transparent"
      />

      <MobileNav
        open={isMenuOpen}
        pathname={pathname}
        onClose={closeMenu}
        userName={userName}
        isPending={isPending}
        dashboardHref={dashboardHref}
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}

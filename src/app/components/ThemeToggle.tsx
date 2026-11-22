'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

// ========== Dark / Light theme toggle ==========
// - Theme save hoy localStorage e ('theme' key)
// - Apply hoy <html> tag e 'dark' class diye
// - useSyncExternalStore use korlam:
//     * hydration mismatch hoy na (server e shobshomoy 'light')
//     * useEffect er bhitore setState o lage na (kono useState nai)
// - Root layout er pre-hydration script purano theme apply kore (flash na)

const THEME_KEY = 'theme';
type Theme = 'light' | 'dark';

// Theme change hole ei listener gulo call hoy (component re-render)
const listeners = new Set<() => void>();

// Client side: localStorage theke current theme pora
function readTheme(): Theme {
  return window.localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

// Server side: shobshomoy 'light' (SSR e localStorage thake na)
function serverTheme(): Theme {
  return 'light';
}

// React store subscribe - onno tab e change holeo (storage event) update hoy
function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_KEY) onStoreChange();
  };
  window.addEventListener('storage', handleStorage);

  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener('storage', handleStorage);
  };
}

// Theme set/save/apply - ektai jaigai
function setTheme(theme: Theme) {
  window.localStorage.setItem(THEME_KEY, theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  listeners.forEach((notify) => notify());
}

// Navbar e button ta - current theme onujayi Sun/Moon icon
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      // Navbar er onno icon button er sathe same style (clutter na)
      className="group relative inline-flex size-10 items-center justify-center rounded-full border border-transparent text-[#5f3b2c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8d1b1b]/10 hover:bg-white/75 hover:text-[#a4161a] hover:shadow-[0_10px_20px_-14px_rgba(120,53,15,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4161a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8ee]"
    >
      {isDark ? (
        <Moon
          className="size-[18px] transition-transform duration-300 group-hover:-rotate-12"
          strokeWidth={2}
          aria-hidden
        />
      ) : (
        <Sun
          className="size-[18px] transition-transform duration-300 group-hover:rotate-45"
          strokeWidth={2}
          aria-hidden
        />
      )}
    </button>
  );
}

export default ThemeToggle;
